'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { ACTIVE_PROFILE_COOKIE } from '@/lib/active-profile'

export async function switchActiveProfile(profileId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Yetkisiz')

  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', profileId)
    .eq('owner_id', user.id)
    .single()

  if (!profile) throw new Error('Profil bulunamadı')

  const cookieStore = await cookies()
  cookieStore.set(ACTIVE_PROFILE_COOKIE, profileId, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    httpOnly: false,
  })

  revalidatePath('/dashboard', 'layout')
}
