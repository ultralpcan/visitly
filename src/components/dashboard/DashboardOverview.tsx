'use client'

import Link from 'next/link'
import { Eye, MousePointer, Blocks, User, ArrowRight, ExternalLink } from 'lucide-react'

interface Props {
  username: string
  displayName: string
  totalViews: number
  totalClicks: number
  totalBlocks: number
}

export function DashboardOverview({ username, displayName, totalViews, totalClicks, totalBlocks }: Props) {
  return (
    <div style={{ maxWidth: 900 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#fff', margin: '0 0 6px', letterSpacing: '-0.5px' }}>
          Merhaba, {displayName.split(' ')[0] || 'tekrar'} 👋
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,0.4)', flexWrap: 'wrap' }}>
          Profilin:{' '}
          <a href={`/${username}`} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontWeight: 500 }}>
            visitly.tr/{username}
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Toplam Görüntülenme', value: totalViews, Icon: Eye, color: '#60a5fa', bg: 'rgba(96,165,250,0.1)' },
          { label: 'Toplam Tıklama', value: totalClicks, Icon: MousePointer, color: '#34d399', bg: 'rgba(52,211,153,0.1)' },
          { label: 'Aktif Blok', value: totalBlocks, Icon: Blocks, color: '#a78bfa', bg: 'rgba(167,139,250,0.1)' },
        ].map(({ label, value, Icon, color, bg }) => (
          <div key={label} style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '24px' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <Icon size={18} color={color} />
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#fff', letterSpacing: '-1px', marginBottom: 4 }}>{value.toLocaleString('tr-TR')}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <QuickCard href="/dashboard/profil" Icon={User} title="Profili Düzenle" desc="Ad, bio, fotoğraf ve tema ayarları" />
        <QuickCard href="/dashboard/bloklar" Icon={Blocks} title="Blokları Yönet" desc="Link, IBAN ve sosyal medya bloğu ekle" />
      </div>
    </div>
  )
}

function QuickCard({ href, Icon, title, desc }: { href: string; Icon: React.ElementType; title: string; desc: string }) {
  return (
    <Link href={href}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '24px', textDecoration: 'none' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(139,92,246,0.3)'; e.currentTarget.style.backgroundColor = 'rgba(139,92,246,0.05)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={18} color="rgba(255,255,255,0.6)" />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 3 }}>{title}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{desc}</div>
        </div>
      </div>
      <ArrowRight size={16} color="rgba(255,255,255,0.2)" />
    </Link>
  )
}
