'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { LayoutDashboard, User, Blocks, BarChart3, ExternalLink, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'

interface Props {
  profile: { username: string; display_name: string; avatar_url: string | null }
}

const navItems = [
  { href: '/dashboard', label: 'Genel Bakış', icon: LayoutDashboard },
  { href: '/dashboard/profil', label: 'Profil', icon: User },
  { href: '/dashboard/bloklar', label: 'Bloklar', icon: Blocks },
  { href: '/dashboard/analitik', label: 'Analitik', icon: BarChart3 },
]

export function DashboardSidebar({ profile }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/giris')
    router.refresh()
  }

  const sidebarContent = (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Logo */}
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
          <Image src="/logo-full.svg" alt="Visitly" width={110} height={28} style={{ height: 28, width: 'auto' }} />
        </Link>
      </div>

      {/* Profil özeti */}
      <div style={{ padding: '16px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px', borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.04)' }}>
          {profile.avatar_url ? (
            <Image src={profile.avatar_url} alt={profile.display_name} width={34} height={34}
              style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
          ) : (
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
              {profile.display_name[0]?.toUpperCase()}
            </div>
          )}
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{profile.display_name}</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', margin: 0 }}>/{profile.username}</p>
          </div>
        </div>
        <a href={`/${profile.username}`} target="_blank"
          style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, padding: '6px 8px', fontSize: 12, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', borderRadius: 8, transition: 'color 0.15s' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>
          <ExternalLink size={12} /> Profilimi Gör
        </a>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                borderRadius: 10, fontSize: 13, fontWeight: 500, textDecoration: 'none',
                transition: 'all 0.15s',
                backgroundColor: isActive ? 'rgba(139,92,246,0.15)' : 'transparent',
                color: isActive ? '#a78bfa' : 'rgba(255,255,255,0.5)',
                border: isActive ? '1px solid rgba(139,92,246,0.2)' : '1px solid transparent',
              }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)' } }}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' } }}>
              <item.icon size={15} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: '10px' }}>
        <button onClick={handleLogout}
          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', width: '100%', transition: 'all 0.15s' }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.1)'; e.currentTarget.style.color = '#fca5a5' }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}>
          <LogOut size={15} /> Çıkış Yap
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside style={{ width: 220, backgroundColor: '#0d0d0d', borderRight: '1px solid rgba(255,255,255,0.06)', flexShrink: 0, display: 'none' }}
        className="md-sidebar">
        {sidebarContent}
      </aside>

      {/* Mobile top bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 40, backgroundColor: '#0d0d0d', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', height: 52 }}
        className="mobile-topbar">
        <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
            <Image src="/logo-icon.svg" alt="Visitly" width={28} height={28} style={{ height: 28, width: 'auto' }} />
          </Link>
        <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', padding: 4 }}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 30, backgroundColor: 'rgba(0,0,0,0.7)' }} onClick={() => setOpen(false)} className="mobile-topbar">
          <aside style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 260, backgroundColor: '#0d0d0d', borderRight: '1px solid rgba(255,255,255,0.06)' }}
            onClick={e => e.stopPropagation()}>
            {sidebarContent}
          </aside>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .md-sidebar { display: flex !important; flex-direction: column; }
          .mobile-topbar { display: none !important; }
        }
      `}</style>
    </>
  )
}
