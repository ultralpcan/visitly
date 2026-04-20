import { redirect } from 'next/navigation'
import { getActiveProfile } from '@/lib/active-profile'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const data = await getActiveProfile()
  if (!data) redirect('/giris')

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', display: 'flex', fontFamily: 'inherit' }}>
      <DashboardSidebar activeProfile={data.activeProfile} profiles={data.profiles} />
      <main style={{ flex: 1, minWidth: 0, padding: '36px 32px', paddingTop: 'max(36px, 52px)' }}>
        {children}
      </main>
    </div>
  )
}
