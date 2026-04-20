import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { THEMES } from '@/types'
import { ProfileView } from '@/components/blocks/ProfileView'

interface Props {
  params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: Props) {
  const { username } = await params
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name, bio')
    .eq('username', username)
    .eq('is_active', true)
    .single()

  if (!profile) return { title: 'Profil bulunamadı' }

  return {
    title: `${profile.display_name} — Visitly`,
    description: profile.bio ?? `${profile.display_name} profil sayfası`,
  }
}

export default async function ProfilePage({ params }: Props) {
  const { username } = await params
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .eq('is_active', true)
    .single()

  if (!profile) notFound()

  const { data: blocks } = await supabase
    .from('blocks')
    .select('*')
    .eq('profile_id', profile.id)
    .eq('is_visible', true)
    .order('position', { ascending: true })

  const theme = THEMES.find((t) => t.id === profile.theme) ?? THEMES[0]

  return (
    <ProfileView
      profile={profile}
      blocks={blocks ?? []}
      theme={theme}
    />
  )
}
