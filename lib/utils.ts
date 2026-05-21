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

export function itraColor(points: number | null): string {
  if (!points) return '#9e9e9e'
  if (points >= 5) return '#f2c94c'
  if (points >= 3) return '#6fcf97'
  return '#4a9d8f'
}
