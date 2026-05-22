'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { UserRace, RaceStatus } from '@/lib/types'
import { formatDistance, formatElevation, formatDate, countryFlag, daysUntil, itraColor, parseNotes, encodeNotes, formatFinishTime, parseTimeInput } from '@/lib/utils'
import { MapPin, ExternalLink, Trash2, Plus, Pencil, Search } from 'lucide-react'
import { getSupabaseBrowser } from '@/lib/supabase-browser'
import Link from 'next/link'
import RaceFormModal from '@/components/races/RaceFormModal'

const STATUS_LABEL: Record<RaceStatus, string> = {
  interested: 'Intéressé',
  registered: 'Inscrit',
  completed: 'Terminée',
}

const STATUS_COLOR: Record<RaceStatus, string> = {
  interested: 'var(--text-muted)',
  registered: 'var(--accent-green)',
  completed: 'var(--accent-gold)',
}

interface ResultForm {
  timeInput: string
  rank: string
  total: string
}

async function findActivityOnDate(date: string): Promise<number | null> {
  const supabase = getSupabaseBrowser()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data } = await supabase
    .from('activities')
    .select('duration_s, distance_m')
    .eq('user_id', user.id)
    .gte('started_at', `${date}T00:00:00Z`)
    .lte('started_at', `${date}T23:59:59Z`)
    .order('distance_m', { ascending: false })
    .limit(1)
  if (data && data.length > 0 && data[0].duration_s > 0) return data[0].duration_s as number
  return null
}

export default function RacesPage() {
  const [userRaces, setUserRaces] = useState<UserRace[]>([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [editingRace, setEditingRace] = useState<UserRace | null>(null)
  const [addSuccess, setAddSuccess] = useState('')
  const [fetchingResult, setFetchingResult] = useState<string | null>(null)
  const [showResultForm, setShowResultForm] = useState<Set<string>>(new Set())
  const [resultForms, setResultForms] = useState<Record<string, ResultForm>>({})
  const [runnerName, setRunnerName] = useState<{ first: string; last: string } | null>(null)

  useEffect(() => {
    const load = async () => {
      const supabase = getSupabaseBrowser()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase
        .from('user_races')
        .select('*, race:races(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      setUserRaces((data ?? []) as UserRace[])
      if (user.user_metadata?.runner_first_name) {
        setRunnerName({ first: user.user_metadata.runner_first_name, last: user.user_metadata.runner_last_name ?? '' })
      }
      setLoading(false)
    }
    load()
  }, [])

  const updateStatus = async (id: string, status: RaceStatus) => {
    const ur = userRaces.find(r => r.id === id)
    setUserRaces(prev => prev.map(r => r.id === id ? { ...r, status } : r))
    await getSupabaseBrowser().from('user_races').update({ status }).eq('id', id)

    if (status === 'completed' && ur) {
      setFetchingResult(id)
      const duration = await findActivityOnDate(ur.race.date)
      setFetchingResult(null)
      setResultForms(prev => ({
        ...prev,
        [id]: {
          timeInput: duration ? formatFinishTime(duration) : '',
          rank: '',
          total: '',
        },
      }))
      setShowResultForm(prev => new Set([...prev, id]))
    }
  }

  const saveResult = async (ur: UserRace) => {
    const form = resultForms[ur.id]
    if (!form) return
    const ft = parseTimeInput(form.timeInput) ?? undefined
    const or = form.rank ? parseInt(form.rank) : undefined
    const tf = form.total ? parseInt(form.total) : undefined
    if (!ft && !or) return
    const { priority } = parseNotes(ur.notes)
    const newNotes = encodeNotes(priority, { ft, or, tf })
    await getSupabaseBrowser().from('user_races').update({ notes: newNotes }).eq('id', ur.id)
    setUserRaces(prev => prev.map(r => r.id === ur.id ? { ...r, notes: newNotes } : r))
    setShowResultForm(prev => { const s = new Set(prev); s.delete(ur.id); return s })
  }

  const remove = async (id: string) => {
    setUserRaces(prev => prev.filter(ur => ur.id !== id))
    await getSupabaseBrowser().from('user_races').delete().eq('id', id)
  }

  const reload = async () => {
    setLoading(true)
    const supabase = getSupabaseBrowser()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data } = await supabase.from('user_races').select('*, race:races(*)').eq('user_id', user.id).order('created_at', { ascending: false })
    setUserRaces((data ?? []) as UserRace[])
    setLoading(false)
  }

  const groups: Record<RaceStatus, UserRace[]> = {
    registered: userRaces.filter(ur => ur.status === 'registered').sort((a, b) => new Date(a.race.date).getTime() - new Date(b.race.date).getTime()),
    interested: userRaces.filter(ur => ur.status === 'interested').sort((a, b) => new Date(a.race.date).getTime() - new Date(b.race.date).getTime()),
    completed: userRaces.filter(ur => ur.status === 'completed').sort((a, b) => new Date(b.race.date).getTime() - new Date(a.race.date).getTime()),
  }

  const livetrailUrl = (name: string) =>
    `https://livetrail.net/page/coureur_bdd.php?act=coureur&coureur=${encodeURIComponent(name)}`
  const itraUrl = (first: string, last: string) =>
    `https://itra.run/en/Search?query=${encodeURIComponent(`${first} ${last}`)}`

  return (
    <div style={{ padding: '28px 32px', maxWidth: 800, margin: '0 auto' }}>
      {showAdd && (
        <RaceFormModal
          onClose={() => setShowAdd(false)}
          onAdded={(name) => { setShowAdd(false); setAddSuccess(`"${name}" ajoutée !`); setTimeout(() => setAddSuccess(''), 4000); reload() }}
        />
      )}
      {editingRace && (
        <RaceFormModal
          editRace={editingRace.race}
          onClose={() => setEditingRace(null)}
          onUpdated={(updatedRace) => {
            setUserRaces(prev => prev.map(ur => ur.id === editingRace.id ? { ...ur, race: updatedRace } : ur))
            setEditingRace(null)
            setAddSuccess(`"${updatedRace.name}" modifiée !`)
            setTimeout(() => setAddSuccess(''), 4000)
          }}
        />
      )}

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>Mes courses</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setShowAdd(true)} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 14px', color: 'var(--text-muted)', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
            <Plus size={13} /> Saisir manuellement
          </button>
          <Link href="/explorer" style={{ background: 'var(--bg-surface)', border: '1px solid var(--accent-green)', borderRadius: 8, padding: '8px 16px', color: 'var(--accent-green)', fontSize: '0.8rem', textDecoration: 'none' }}>
            + Explorer
          </Link>
        </div>
      </div>

      {addSuccess && (
        <div style={{ background: '#0f2a1a', border: '1px solid var(--accent-green)', borderRadius: 8, padding: '10px 16px', marginBottom: 16, color: 'var(--accent-green)', fontSize: '0.85rem' }}>
          ✓ {addSuccess}
        </div>
      )}

      {loading && <div style={{ textAlign: 'center', padding: 48, color: 'var(--text-muted)' }}>Chargement...</div>}

      {!loading && (['registered', 'interested', 'completed'] as RaceStatus[]).map(status => {
        const races = groups[status]
        if (races.length === 0) return null
        return (
          <div key={status} style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: STATUS_COLOR[status] }} />
              <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {STATUS_LABEL[status]} · {races.length}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {races.map(ur => {
                const days = daysUntil(ur.race.date)
                const { result } = parseNotes(ur.notes)
                const isFetching = fetchingResult === ur.id
                const showForm = showResultForm.has(ur.id)
                const form = resultForms[ur.id] ?? { timeInput: '', rank: '', total: '' }

                return (
                  <div key={ur.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <h3 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>{ur.race.name}</h3>
                          {ur.race.itra_points && <span style={{ color: itraColor(ur.race.itra_points), fontSize: '0.65rem', fontWeight: 700 }}>ITRA {ur.race.itra_points}</span>}
                        </div>
                        <div style={{ display: 'flex', gap: 12, marginTop: 6, flexWrap: 'wrap' }}>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <MapPin size={11} /> {countryFlag(ur.race.country)} {ur.race.location}
                          </span>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{formatDistance(ur.race.distance_km)} · {formatElevation(ur.race.elevation_m)}</span>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{formatDate(ur.race.date)}</span>
                        </div>

                        {/* Result badge */}
                        {status === 'completed' && result && !showForm && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                            {result.ft && (
                              <span style={{ background: '#1a3a1a', border: '1px solid var(--accent-green)', borderRadius: 6, padding: '3px 10px', color: 'var(--accent-green)', fontSize: '0.75rem', fontWeight: 700 }}>
                                ✓ {formatFinishTime(result.ft)}
                              </span>
                            )}
                            {result.or && (
                              <span style={{ background: '#2a2800', border: '1px solid var(--accent-gold)', borderRadius: 6, padding: '3px 10px', color: 'var(--accent-gold)', fontSize: '0.75rem', fontWeight: 700 }}>
                                {result.or}e{result.tf ? ` / ${result.tf}` : ''}
                              </span>
                            )}
                            <button
                              onClick={() => {
                                setResultForms(prev => ({ ...prev, [ur.id]: { timeInput: result.ft ? formatFinishTime(result.ft!) : '', rank: result.or?.toString() ?? '', total: result.tf?.toString() ?? '' } }))
                                setShowResultForm(prev => new Set([...prev, ur.id]))
                              }}
                              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.65rem', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
                            >
                              Modifier
                            </button>
                          </div>
                        )}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {days > 0 && <span style={{ color: 'var(--accent-gold)', fontSize: '0.8rem', fontWeight: 700 }}>J−{days}</span>}
                        {ur.race.registration_url && (
                          <a href={ur.race.registration_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', display: 'flex' }}>
                            <ExternalLink size={14} />
                          </a>
                        )}
                        <button onClick={() => setEditingRace(ur)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', padding: 0 }}>
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => remove(ur.id)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', padding: 0 }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Status buttons */}
                    <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
                      {(['interested', 'registered', 'completed'] as RaceStatus[]).map(s => (
                        <button
                          key={s}
                          onClick={() => updateStatus(ur.id, s)}
                          style={{
                            background: ur.status === s ? STATUS_COLOR[s] : 'var(--bg-surface)',
                            border: `1px solid ${ur.status === s ? STATUS_COLOR[s] : 'var(--border)'}`,
                            borderRadius: 5, padding: '3px 10px',
                            color: ur.status === s ? 'var(--bg-primary)' : 'var(--text-muted)',
                            fontSize: '0.68rem', cursor: 'pointer',
                            fontWeight: ur.status === s ? 600 : 400,
                          }}
                        >
                          {STATUS_LABEL[s]}
                        </button>
                      ))}
                    </div>

                    {/* Fetching spinner */}
                    {isFetching && (
                      <div style={{ marginTop: 12, color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                        ⏳ Recherche d'une activité Strava/Garmin le {formatDate(ur.race.date)}…
                      </div>
                    )}

                    {/* Result entry form */}
                    {showForm && !isFetching && (
                      <div style={{ marginTop: 12, background: 'var(--bg-surface)', borderRadius: 8, padding: '12px 14px', border: '1px solid var(--border)' }}>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                          Résultat officiel
                          {form.timeInput && <span style={{ color: 'var(--accent-green)', marginLeft: 8, textTransform: 'none' }}>· chrono pré-rempli depuis ta montre</span>}
                        </div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                          <input
                            value={form.timeInput}
                            onChange={e => setResultForms(prev => ({ ...prev, [ur.id]: { ...form, timeInput: e.target.value } }))}
                            placeholder="12h34'56&quot;"
                            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 6, padding: '6px 10px', color: 'var(--text-primary)', fontSize: '0.82rem', width: 110 }}
                          />
                          <input
                            value={form.rank}
                            onChange={e => setResultForms(prev => ({ ...prev, [ur.id]: { ...form, rank: e.target.value } }))}
                            placeholder="45"
                            type="number"
                            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 6, padding: '6px 10px', color: 'var(--text-primary)', fontSize: '0.82rem', width: 70 }}
                          />
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>/</span>
                          <input
                            value={form.total}
                            onChange={e => setResultForms(prev => ({ ...prev, [ur.id]: { ...form, total: e.target.value } }))}
                            placeholder="312"
                            type="number"
                            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 6, padding: '6px 10px', color: 'var(--text-primary)', fontSize: '0.82rem', width: 80 }}
                          />

                          {/* Quick links */}
                          {runnerName && (
                            <>
                              <a href={livetrailUrl(`${runnerName.last} ${runnerName.first}`)} target="_blank" rel="noopener noreferrer"
                                style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)', fontSize: '0.72rem', textDecoration: 'none', border: '1px solid var(--border)', borderRadius: 5, padding: '5px 8px' }}>
                                <Search size={10} /> LiveTrail
                              </a>
                              <a href={itraUrl(runnerName.first, runnerName.last)} target="_blank" rel="noopener noreferrer"
                                style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)', fontSize: '0.72rem', textDecoration: 'none', border: '1px solid var(--border)', borderRadius: 5, padding: '5px 8px' }}>
                                <Search size={10} /> ITRA
                              </a>
                            </>
                          )}
                          {!runnerName && (
                            <Link href="/settings" style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textDecoration: 'underline' }}>
                              Ajouter ton nom → liens auto
                            </Link>
                          )}

                          <button
                            onClick={() => saveResult(ur)}
                            style={{ background: 'var(--accent-green)', border: 'none', borderRadius: 6, padding: '6px 14px', color: 'var(--bg-primary)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', marginLeft: 'auto' }}
                          >
                            Sauvegarder
                          </button>
                          <button
                            onClick={() => setShowResultForm(prev => { const s = new Set(prev); s.delete(ur.id); return s })}
                            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.7rem', cursor: 'pointer' }}
                          >
                            Ignorer
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Show form button for completed without result */}
                    {status === 'completed' && !result && !showForm && !isFetching && (
                      <button
                        onClick={() => {
                          setResultForms(prev => ({ ...prev, [ur.id]: { timeInput: '', rank: '', total: '' } }))
                          setShowResultForm(prev => new Set([...prev, ur.id]))
                        }}
                        style={{ marginTop: 10, background: 'none', border: '1px dashed var(--border)', borderRadius: 6, padding: '4px 12px', color: 'var(--text-muted)', fontSize: '0.7rem', cursor: 'pointer', width: '100%' }}
                      >
                        + Ajouter le résultat
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}

      {!loading && userRaces.length === 0 && (
        <div style={{ textAlign: 'center', padding: 64, color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '2rem', marginBottom: 8 }}>🏁</div>
          <p>Aucune course planifiée</p>
          <Link href="/explorer" style={{ color: 'var(--accent-green)', textDecoration: 'none', fontSize: '0.85rem' }}>Explorer les courses →</Link>
        </div>
      )}
    </div>
  )
}
