import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(' ')
}

export function formatDistance(km: number): string {
  return `${km} km`
}

export function formatElevation(m: number): string {
  return `${m.toLocaleString('fr-FR')} m D+`
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  return h > 0 ? `${h}h${m.toString().padStart(2, '0')}` : `${m}min`
}

export function daysUntil(dateStr: string): number {
  const now = new Date()
  const target = new Date(dateStr)
  const diff = target.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatMonth(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('fr-FR', { month: 'short' })
}

export function getMonthIndex(dateStr: string): number {
  return new Date(dateStr).getMonth()
}

export function countryFlag(country: string): string {
  const flags: Record<string, string> = {
    'France': '🇫🇷',
    'Espagne': '🇪🇸',
    'Italie': '🇮🇹',
    'Suisse': '🇨🇭',
    'Autriche': '🇦🇹',
    'Portugal': '🇵🇹',
    'Allemagne': '🇩🇪',
    'États-Unis': '🇺🇸',
    'Afrique du Sud': '🇿🇦',
  }
  return flags[country] ?? '🏳️'
}

// notes field encodes priority + optional result as "A|{ft:45000,or:12,tf:245}"
import type { RaceResult } from './types'
type Priority = 'A' | 'B' | 'C' | null

export function parseNotes(notes: string | null): { priority: Priority; result: RaceResult | null } {
  if (!notes) return { priority: null, result: null }
  if (notes === 'A' || notes === 'B' || notes === 'C') return { priority: notes, result: null }
  const pipe = notes.indexOf('|')
  if (pipe === -1) return { priority: null, result: null }
  const p = notes.slice(0, pipe)
  try {
    return {
      priority: (p === 'A' || p === 'B' || p === 'C') ? p as Priority : null,
      result: JSON.parse(notes.slice(pipe + 1)),
    }
  } catch { return { priority: null, result: null } }
}

export function encodeNotes(priority: Priority, result: RaceResult | null): string | null {
  if (!result && !priority) return null
  if (!result) return priority
  return `${priority ?? ''}|${JSON.stringify(result)}`
}

export function formatFinishTime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return `${h}h${m.toString().padStart(2, '0')}'${s.toString().padStart(2, '0')}"`
}

export function parseTimeInput(val: string): number | null {
  const clean = val.trim()
  const colon = clean.match(/^(\d+):(\d+):(\d+)$/)
  if (colon) return parseInt(colon[1]) * 3600 + parseInt(colon[2]) * 60 + parseInt(colon[3])
  const hms = clean.match(/^(\d+)h(\d+)[m']?(\d*)/)
  if (hms) return parseInt(hms[1]) * 3600 + parseInt(hms[2]) * 60 + (hms[3] ? parseInt(hms[3]) : 0)
  return null
}

export function itraColor(points: number | null): string {
  if (!points) return '#9e9e9e'
  if (points >= 5) return '#f2c94c'
  if (points >= 3) return '#6fcf97'
  return '#4a9d8f'
}
