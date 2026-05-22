'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, useMemo } from 'react'
import {
  ComposedChart, Bar, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
  LineChart,
} from 'recharts'
import { TrendingUp, Mountain, Heart, Zap } from 'lucide-react'
import { getSupabaseBrowser } from '@/lib/supabase-browser'
import { Activity } from '@/lib/types'

const RANGES = [
  { label: '7j', days: 7 },
  { label: '30j', days: 30 },
  { label: '90j', days: 90 },
  { label: '12 mois', days: 365 },
]

function startOfWeekMonday(d: Date): Date {
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  const monday = new Date(d)
  monday.setDate(d.getDate() + diff)
  monday.setHours(0, 0, 0, 0)
  return monday
}

function groupByWeek(activities: Activity[], from: Date) {
  const map = new Map<string, { km: number; elev: number; hrs: number[] }>()

  for (const a of activities) {
    const d = new Date(a.started_at)
    if (d < from) continue
    const monday = startOfWeekMonday(d)
    const key = monday.toISOString().slice(0, 10)
    const slot = map.get(key) ?? { km: 0, elev: 0, hrs: [] }
    slot.km += a.distance_m / 1000
    slot.elev += a.elevation_m
    if (a.avg_hr) slot.hrs.push(a.avg_hr)
    map.set(key, slot)
  }

  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([week, { km, elev, hrs }]) => ({
      week: new Date(week).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
      km: Math.round(km * 10) / 10,
      elev: Math.round(elev),
      avgHr: hrs.length > 0 ? Math.round(hrs.reduce((s, h) => s + h, 0) / hrs.length) : null,
    }))
}

function generateInsights(activities: Activity[], weeks: ReturnType<typeof groupByWeek>) {
  const insights: { icon: React.ElementType; label: string; value: string; color: string }[] = []
  if (weeks.length === 0) return insights

  const bestKm = weeks.reduce((a, b) => (a.km > b.km ? a : b))
  if (bestKm.km > 0)
    insights.push({ icon: TrendingUp, label: 'Meilleure semaine distance', value: `${bestKm.km} km · sem. du ${bestKm.week}`, color: 'var(--accent-green)' })

  const bestElev = weeks.reduce((a, b) => (a.elev > b.elev ? a : b))
  if (bestElev.elev > 0)
    insights.push({ icon: Mountain, label: 'Semaine record D+', value: `${bestElev.elev.toLocaleString('fr-FR')} m · sem. du ${bestElev.week}`, color: 'var(--accent-gold)' })

  const hrsWeeks = weeks.filter(w => w.avgHr !== null)
  if (hrsWeeks.length >= 4) {
    const mid = Math.floor(hrsWeeks.length / 2)
    const avg = (arr: number[]) => arr.reduce((s, h) => s + h, 0) / arr.length
    const diff = Math.round(avg(hrsWeeks.slice(mid).map(w => w.avgHr!)) - avg(hrsWeeks.slice(0, mid).map(w => w.avgHr!)))
    if (diff !== 0)
      insights.push({ icon: Heart, label: 'Tendance FC moyenne', value: `${diff > 0 ? '+' : ''}${diff} bpm vs début de période`, color: diff < 0 ? 'var(--accent-green)' : '#eb5757' })
  }

  insights.push({ icon: Zap, label: 'Total sorties', value: `${activities.length} sorties sur la période`, color: 'var(--accent-teal, #4a9d8f)' })

  return insights
}

const customTooltipStyle = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: 8,
  fontSize: '0.75rem',
  color: 'var(--text-primary)',
  padding: '8px 12px',
}

export default function PerformancePage() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [rangeIdx, setRangeIdx] = useState(2) // default 90j

  useEffect(() => {
    const load = async () => {
      const supabase = getSupabaseBrowser()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }
      const { data } = await supabase
        .from('activities')
        .select('*')
        .eq('user_id', user.id)
        .order('started_at', { ascending: false })
        .limit(500)
      setActivities((data ?? []) as Activity[])
      setLoading(false)
    }
    load()
  }, [])

  const { fromDate, weeks, insights, filtered } = useMemo(() => {
    const days = RANGES[rangeIdx].days
    const fromDate = new Date()
    fromDate.setDate(fromDate.getDate() - days)
    const filtered = activities.filter(a => new Date(a.started_at) >= fromDate)
    const weeks = groupByWeek(activities, fromDate)
    const insights = generateInsights(filtered, weeks)
    return { fromDate, weeks, insights, filtered }
  }, [activities, rangeIdx])

  const hasHr = weeks.some(w => w.avgHr !== null)

  return (
    <div style={{ padding: '28px 32px', maxWidth: 900, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 28 }}>
        <h1 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>Performance</h1>
        <div style={{ display: 'flex', gap: 4 }}>
          {RANGES.map((r, i) => (
            <button
              key={r.label}
              onClick={() => setRangeIdx(i)}
              style={{
                background: rangeIdx === i ? 'var(--bg-elevated)' : 'transparent',
                border: rangeIdx === i ? '1px solid var(--accent-green)' : '1px solid var(--border)',
                borderRadius: 6,
                padding: '5px 12px',
                color: rangeIdx === i ? 'var(--accent-green)' : 'var(--text-muted)',
                fontSize: '0.78rem',
                cursor: 'pointer',
                fontWeight: rangeIdx === i ? 600 : 400,
                transition: 'all 0.15s',
              }}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: 64, color: 'var(--text-muted)' }}>Chargement...</div>
      )}

      {!loading && activities.length === 0 && (
        <div style={{ textAlign: 'center', padding: 64, color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>📊</div>
          <p style={{ marginBottom: 4 }}>Aucune activité importée</p>
          <p style={{ fontSize: '0.8rem' }}>Connecte Strava dans les <a href="/settings" style={{ color: 'var(--accent-green)' }}>paramètres</a></p>
        </div>
      )}

      {!loading && activities.length > 0 && (
        <>
          {/* Charts */}
          <div style={{ display: 'grid', gridTemplateColumns: hasHr ? '1fr 1fr' : '1fr', gap: 16, marginBottom: 24 }}>
            {/* Volume chart */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 16px 12px' }}>
              <div style={{ color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 600, marginBottom: 16, paddingLeft: 4 }}>
                Volume hebdomadaire
              </div>
              {weeks.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  Aucune sortie sur cette période
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={200}>
                  <ComposedChart data={weeks} margin={{ top: 0, right: 8, bottom: 0, left: -16 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="week" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis yAxisId="km" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} unit=" km" />
                    <YAxis yAxisId="elev" orientation="right" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} unit=" m" />
                    <Tooltip
                      contentStyle={customTooltipStyle}
                      formatter={(value: number, name: string) =>
                        name === 'km' ? [`${value} km`, 'Distance'] : [`${value.toLocaleString('fr-FR')} m`, 'D+']
                      }
                    />
                    <Bar yAxisId="km" dataKey="km" fill="var(--accent-green)" radius={[3, 3, 0, 0]} maxBarSize={32} />
                    <Bar yAxisId="elev" dataKey="elev" fill="var(--accent-gold)" radius={[3, 3, 0, 0]} maxBarSize={32} opacity={0.75} />
                  </ComposedChart>
                </ResponsiveContainer>
              )}
              <div style={{ display: 'flex', gap: 16, marginTop: 10, paddingLeft: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--accent-green)' }} />
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>Distance (km)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--accent-gold)', opacity: 0.75 }} />
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>D+ (m)</span>
                </div>
              </div>
            </div>

            {/* HR chart */}
            {hasHr && (
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 16px 12px' }}>
                <div style={{ color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 600, marginBottom: 16, paddingLeft: 4 }}>
                  FC moyenne par semaine
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={weeks.filter(w => w.avgHr !== null)} margin={{ top: 0, right: 8, bottom: 0, left: -16 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="week" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis domain={['auto', 'auto']} tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} unit=" bpm" />
                    <Tooltip
                      contentStyle={customTooltipStyle}
                      formatter={(value: number) => [`${value} bpm`, 'FC moyenne']}
                    />
                    <Line
                      type="monotone"
                      dataKey="avgHr"
                      stroke="#eb5757"
                      strokeWidth={2}
                      dot={{ fill: '#eb5757', r: 3, strokeWidth: 0 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 10, paddingLeft: 4 }}>
                  <div style={{ width: 10, height: 2, background: '#eb5757', borderRadius: 1 }} />
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>FC moyenne (bpm)</span>
                </div>
              </div>
            )}
          </div>

          {/* Insights */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
            {insights.map(({ icon: Icon, label, value, color }) => (
              <div
                key={label}
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 16px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <Icon size={13} color={color} />
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{label}</span>
                </div>
                <div style={{ color, fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.35 }}>{value}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
