import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import type { ProfileSummary } from '@/types'

const COOKIE_NAME = 'visitly_active_profile'

export async function getActiveProfile(): Promise<{
  userId: string
  activeProfile: ProfileSummary
  profiles: ProfileSummary[]
} | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, username, display_name, avatar_url, is_default')
    .eq('owner_id', user.id)
    .order('is_default', { ascending: false })
    .order('created_at', { ascending: true })

  if (!profiles || profiles.length === 0) return null

  const cookieStore = await cookies()
  const activeId = cookieStore.get(COOKIE_NAME)?.value

  const active: ProfileSummary =
    (activeId ? profiles.find(p => p.id === activeId) : undefined)
    ?? profiles.find(p => p.is_default)
    ?? profiles[0]

  return { userId: user.id, activeProfile: active, profiles }
}

export const ACTIVE_PROFILE_COOKIE = COOKIE_NAME
