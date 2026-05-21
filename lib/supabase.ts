import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      races: {
        Row: {
          id: string
          name: string
          slug: string
          distance_km: number
          elevation_m: number
          date: string
          location: string
          country: string
          region: string
          itra_points: number | null
          registration_url: string | null
          latitude: number
          longitude: number
          source: string
          description: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['races']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['races']['Insert']>
      }
      user_races: {
        Row: {
          id: string
          user_id: string
          race_id: string
          status: 'interested' | 'registered' | 'completed'
          notes: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['user_races']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['user_races']['Insert']>
      }
      activities: {
        Row: {
          id: string
          user_id: string
          source: 'strava' | 'garmin'
          external_id: string
          name: string
          distance_m: number
          elevation_m: number
          duration_s: number
          started_at: string
          raw_data: Record<string, unknown> | null
        }
        Insert: Omit<Database['public']['Tables']['activities']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['activities']['Insert']>
      }
      integrations: {
        Row: {
          id: string
          user_id: string
          provider: 'strava' | 'garmin'
          access_token: string
          refresh_token: string
          expires_at: string
        }
        Insert: Omit<Database['public']['Tables']['integrations']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['integrations']['Insert']>
      }
    }
  }
}
