import { createClient } from '@/lib/supabase/server'
import { BlockManager } from '@/components/dashboard/BlockManager'

export default async function BloklarPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: blocks } = await supabase.from('blocks').select('*').eq('profile_id', user.id).order('position', { ascending: true })

  return (
    <div style={{ maxWidth: 640 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#fff', margin: '0 0 6px', letterSpacing: '-0.5px' }}>Bloklar</h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: 0 }}>Profilinde görünecek içerikleri ekle ve düzenle.</p>
      </div>
      <BlockManager initialBlocks={blocks ?? []} profileId={user.id} />
    </div>
  )
}
