import { createClient } from '@/lib/supabase/server'
import { DashboardOverview } from '@/components/dashboard/DashboardOverview'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const [profileRes, viewsRes, clicksRes, blocksRes] = await Promise.all([
    supabase.from('profiles').select('username, display_name').eq('id', user.id).single(),
    supabase.from('page_views').select('id', { count: 'exact', head: true }).eq('profile_id', user.id),
    supabase.from('link_clicks').select('id', { count: 'exact', head: true }).eq('profile_id', user.id),
    supabase.from('blocks').select('id', { count: 'exact', head: true }).eq('profile_id', user.id),
  ])

  return (
    <DashboardOverview
      username={profileRes.data?.username ?? ''}
      displayName={profileRes.data?.display_name ?? ''}
      totalViews={viewsRes.count ?? 0}
      totalClicks={clicksRes.count ?? 0}
      totalBlocks={blocksRes.count ?? 0}
    />
  )
}
