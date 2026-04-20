import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/giris')

  const { data: profile } = await supabase
    .from('profiles').select('username, display_name, avatar_url').eq('id', user.id).single()
  if (!profile) redirect('/giris')

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', display: 'flex', fontFamily: 'inherit' }}>
      <DashboardSidebar profile={profile} />
      <main style={{ flex: 1, minWidth: 0, padding: '36px 32px', paddingTop: 'max(36px, 52px)' }}>
        {children}
      </main>
    </div>
  )
}
