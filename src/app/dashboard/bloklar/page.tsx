import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getActiveProfile } from '@/lib/active-profile'
import { BlockManager } from '@/components/dashboard/BlockManager'

export default async function BloklarPage() {
  const data = await getActiveProfile()
  if (!data) redirect('/giris')

  const supabase = await createClient()
  const { data: blocks } = await supabase.from('blocks').select('*').eq('profile_id', data.activeProfile.id).order('position', { ascending: true })

  return (
    <div style={{ maxWidth: 640 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#fff', margin: '0 0 6px', letterSpacing: '-0.5px' }}>Bloklar</h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: 0 }}>
          <strong style={{ color: 'rgba(255,255,255,0.7)' }}>{data.activeProfile.display_name}</strong> profilinde görünecek içerikleri ekle ve düzenle.
        </p>
      </div>
      <BlockManager initialBlocks={blocks ?? []} profileId={data.activeProfile.id} />
    </div>
  )
}
