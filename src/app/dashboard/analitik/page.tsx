import { createClient } from '@/lib/supabase/server'
import { Eye, MousePointer, TrendingUp } from 'lucide-react'

export default async function AnalitikPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const iso = thirtyDaysAgo.toISOString()

  const [viewsRes, clicksRes, recentViewsRes] = await Promise.all([
    supabase.from('page_views').select('id', { count: 'exact' }).eq('profile_id', user.id),
    supabase.from('link_clicks').select('id', { count: 'exact' }).eq('profile_id', user.id),
    supabase.from('page_views').select('created_at, referrer').eq('profile_id', user.id).gte('created_at', iso).order('created_at', { ascending: false }).limit(100),
  ])

  const totalViews = viewsRes.count ?? 0
  const totalClicks = clicksRes.count ?? 0
  const recentViews = recentViewsRes.data ?? []

  const dailyCounts: Record<string, number> = {}
  recentViews.forEach(v => {
    const day = v.created_at.slice(0, 10)
    dailyCounts[day] = (dailyCounts[day] ?? 0) + 1
  })
  const dailyData = Object.entries(dailyCounts).sort(([a], [b]) => a.localeCompare(b)).slice(-14)
  const maxDaily = Math.max(...dailyData.map(([, v]) => v), 1)

  const referrerCounts: Record<string, number> = {}
  recentViews.forEach(v => {
    try {
      const ref = v.referrer ? new URL(v.referrer).hostname : 'Direkt'
      referrerCounts[ref] = (referrerCounts[ref] ?? 0) + 1
    } catch { referrerCounts['Direkt'] = (referrerCounts['Direkt'] ?? 0) + 1 }
  })
  const topReferrers = Object.entries(referrerCounts).sort(([, a], [, b]) => b - a).slice(0, 5)

  const cardStyle = { backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '24px', marginBottom: 16 }

  return (
    <div style={{ maxWidth: 900 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#fff', margin: '0 0 6px', letterSpacing: '-0.5px' }}>Analitik</h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: 0 }}>Son 30 günün verileri</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }}>
        {[
          { label: 'Toplam Görüntülenme', value: totalViews, icon: Eye, color: '#60a5fa', bg: 'rgba(96,165,250,0.1)' },
          { label: 'Toplam Tıklama', value: totalClicks, icon: MousePointer, color: '#34d399', bg: 'rgba(52,211,153,0.1)' },
          { label: 'Son 30 Gün', value: recentViews.length, icon: TrendingUp, color: '#a78bfa', bg: 'rgba(167,139,250,0.1)' },
        ].map(stat => (
          <div key={stat.label} style={cardStyle}>
            <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <stat.icon size={18} color={stat.color} />
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#fff', letterSpacing: '-1px', marginBottom: 4 }}>
              {stat.value.toLocaleString('tr-TR')}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      {dailyData.length > 0 ? (
        <div style={cardStyle}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 24, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Son 14 Günlük Görüntülenme
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 120 }}>
            {dailyData.map(([day, count]) => (
              <div key={day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>{count > 0 ? count : ''}</div>
                <div style={{ width: '100%', background: 'linear-gradient(to top, #7c3aed, #a78bfa)', borderRadius: 4, transition: 'height 0.3s', minHeight: 4, height: `${Math.max((count / maxDaily) * 90, 4)}px` }}
                  title={`${day}: ${count} görüntülenme`} />
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', transform: 'rotate(-45deg)', transformOrigin: 'center', whiteSpace: 'nowrap' }}>
                  {day.slice(5)}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Referrers */}
      {topReferrers.length > 0 && (
        <div style={cardStyle}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Trafik Kaynakları
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {topReferrers.map(([ref, count]) => (
              <div key={ref} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ flex: 1, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{ref}</span>
                <div style={{ width: 120, height: 4, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: 'linear-gradient(to right, #7c3aed, #a78bfa)', borderRadius: 2, width: `${(count / recentViews.length) * 100}%` }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#fff', minWidth: 24, textAlign: 'right' }}>{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {totalViews === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 24px', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: 16 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📊</div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, marginBottom: 4 }}>Henüz veri yok</p>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 13 }}>Profil sayfan ziyaret edilince burada görünecek</p>
        </div>
      )}
    </div>
  )
}
