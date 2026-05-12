import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getActiveProfile } from '@/lib/active-profile'
import { ShowcaseManager } from '@/components/dashboard/ShowcaseManager'
import type { ShowcaseItem } from '@/types'

export default async function UrunlerPage() {
  const data = await getActiveProfile()
  if (!data) redirect('/giris')

  if (data.activeProfile.profile_type !== 'showcase') {
    redirect('/dashboard/bloklar')
  }

  const supabase = await createClient()
  const { data: items } = await supabase
    .from('showcase_items')
    .select('*')
    .eq('profile_id', data.activeProfile.id)
    .order('position', { ascending: true })

  return (
    <div style={{ maxWidth: 760 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#fff', margin: '0 0 6px', letterSpacing: '-0.5px' }}>Ürünler</h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: 0 }}>
          <strong style={{ color: 'rgba(255,255,255,0.7)' }}>{data.activeProfile.display_name}</strong> profilinde sergilenen satın alınan ürünleri yönet.
        </p>
      </div>
      <ShowcaseManager initialItems={(items ?? []) as ShowcaseItem[]} profileId={data.activeProfile.id} />
    </div>
  )
}
