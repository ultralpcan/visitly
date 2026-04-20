import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getActiveProfile } from '@/lib/active-profile'
import { ProfileEditor } from '@/components/dashboard/ProfileEditor'

export default async function ProfilPage() {
  const data = await getActiveProfile()
  if (!data) redirect('/giris')

  const supabase = await createClient()
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.activeProfile.id).single()
  if (!profile) return null

  return (
    <div style={{ maxWidth: 560 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#fff', margin: '0 0 6px', letterSpacing: '-0.5px' }}>Profil</h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: 0 }}>
          <strong style={{ color: 'rgba(255,255,255,0.7)' }}>{profile.display_name}</strong> profilinin görünen bilgilerini düzenle.
        </p>
      </div>
      <ProfileEditor profile={profile} canDelete={data.profiles.length > 1} />
    </div>
  )
}
