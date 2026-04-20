import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getActiveProfile } from '@/lib/active-profile'
import { DashboardOverview } from '@/components/dashboard/DashboardOverview'

export default async function DashboardPage() {
  const data = await getActiveProfile()
  if (!data) redirect('/giris')

  const supabase = await createClient()
  const profileId = data.activeProfile.id

  const [viewsRes, clicksRes, blocksRes] = await Promise.all([
    supabase.from('page_views').select('id', { count: 'exact', head: true }).eq('profile_id', profileId),
    supabase.from('link_clicks').select('id', { count: 'exact', head: true }).eq('profile_id', profileId),
    supabase.from('blocks').select('id', { count: 'exact', head: true }).eq('profile_id', profileId),
  ])

  return (
    <DashboardOverview
      username={data.activeProfile.username}
      displayName={data.activeProfile.display_name}
      totalViews={viewsRes.count ?? 0}
      totalClicks={clicksRes.count ?? 0}
      totalBlocks={blocksRes.count ?? 0}
    />
  )
}
