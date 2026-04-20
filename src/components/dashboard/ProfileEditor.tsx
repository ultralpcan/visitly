'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Profile, THEMES } from '@/types'
import { createClient } from '@/lib/supabase/client'
import { Camera, Check, Loader2 } from 'lucide-react'

export function ProfileEditor({ profile }: { profile: Profile }) {
  const [displayName, setDisplayName] = useState(profile.display_name)
  const [bio, setBio] = useState(profile.bio ?? '')
  const [theme, setTheme] = useState(profile.theme)
  const [buttonStyle, setButtonStyle] = useState(profile.button_style)
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleSave() {
    setSaving(true); setError('')
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { error } = await supabase.from('profiles').update({ display_name: displayName, bio, theme, button_style: buttonStyle, updated_at: new Date().toISOString() }).eq('id', user.id)
    setSaving(false)
    if (error) { setError(error.message) } else { setSaved(true); setTimeout(() => setSaved(false), 2000) }
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return
    setUploading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser(); if (!user) return
    const ext = file.name.split('.').pop()
    const path = `${user.id}/avatar.${ext}`
    const { error: uploadError } = await supabase.storage.from('avatars').upload(path, file, { upsert: true })
    if (!uploadError) {
      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(path)
      await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', user.id)
      setAvatarUrl(publicUrl + '?t=' + Date.now())
    }
    setUploading(false)
  }

  const cardStyle = { backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '24px', marginBottom: 16 }
  const labelStyle = { display: 'block' as const, fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 10, textTransform: 'uppercase' as const, letterSpacing: '0.5px' }
  const inputStyle = { width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '11px 14px', color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box' as const }

  return (
    <div>
      {/* Avatar */}
      <div style={cardStyle}>
        <label style={labelStyle}>Profil Fotoğrafı</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            {avatarUrl ? (
              <Image src={avatarUrl} alt={displayName} width={72} height={72}
                style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 700, color: '#fff' }}>
                {displayName[0]?.toUpperCase()}
              </div>
            )}
            {uploading && (
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loader2 size={20} color="#fff" style={{ animation: 'spin 1s linear infinite' }} />
              </div>
            )}
          </div>
          <div>
            <button onClick={() => fileRef.current?.click()} disabled={uploading}
              style={{ display: 'flex', alignItems: 'center', gap: 8, backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 14px', color: '#fff', fontSize: 13, cursor: 'pointer' }}>
              <Camera size={14} /> Fotoğraf Değiştir
            </button>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 8 }}>JPG, PNG, WebP · Max 5MB</p>
          </div>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
        </div>
      </div>

      {/* Info */}
      <div style={cardStyle}>
        <label style={labelStyle}>Bilgiler</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>Ad Soyad</label>
            <input value={displayName} onChange={e => setDisplayName(e.target.value)} style={inputStyle}
              onFocus={e => (e.target.style.borderColor = 'rgba(139,92,246,0.5)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>Bio <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11 }}>{bio.length}/160</span></label>
            <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} maxLength={160}
              placeholder="Kendinden kısaca bahset..."
              style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }}
              onFocus={e => (e.target.style.borderColor = 'rgba(139,92,246,0.5)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
          </div>
        </div>
      </div>

      {/* Theme */}
      <div style={cardStyle}>
        <label style={labelStyle}>Tema</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {THEMES.map((t) => (
            <button key={t.id} onClick={() => setTheme(t.id)}
              style={{ height: 56, borderRadius: 12, border: theme === t.id ? '2px solid #a78bfa' : '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', position: 'relative', overflow: 'hidden', background: t.id.includes('gradient') ? t.bg.replace('bg-gradient-to-br from-', 'linear-gradient(135deg, #').replace(' via-', ', #').replace(' to-', ', #').replace(/-\d+/g, '') : 'none', backgroundColor: t.id === 'default' ? '#fff' : t.id === 'dark' ? '#0a0a0a' : t.id === 'purple' ? '#2d1b69' : t.id === 'blue' ? '#1e3a5f' : t.id === 'green' ? '#064e3b' : '#4c0519' }}>
              <span style={{ position: 'absolute', bottom: 4, left: 0, right: 0, textAlign: 'center', fontSize: 10, fontWeight: 600, color: t.id === 'default' ? '#000' : '#fff' }}>
                {t.name}
              </span>
              {theme === t.id && (
                <div style={{ position: 'absolute', top: 4, right: 4, width: 16, height: 16, borderRadius: '50%', backgroundColor: '#a78bfa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={9} color="#fff" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Button Style */}
      <div style={cardStyle}>
        <label style={labelStyle}>Buton Stili</label>
        <div style={{ display: 'flex', gap: 12 }}>
          {[
            { id: 'rounded', label: 'Yuvarlak Köşe', r: 12 },
            { id: 'pill', label: 'Hap Şekli', r: 99 },
            { id: 'square', label: 'Kare', r: 6 },
          ].map(s => (
            <button key={s.id} onClick={() => setButtonStyle(s.id)}
              style={{ flex: 1, padding: '10px', backgroundColor: buttonStyle === s.id ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.05)', border: buttonStyle === s.id ? '1px solid rgba(139,92,246,0.4)' : '1px solid rgba(255,255,255,0.1)', borderRadius: s.r, color: buttonStyle === s.id ? '#a78bfa' : 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {error && <div style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5', fontSize: 13, padding: '12px 16px', borderRadius: 10, marginBottom: 16 }}>{error}</div>}

      <button onClick={handleSave} disabled={saving}
        style={{ width: '100%', backgroundColor: saving ? 'rgba(255,255,255,0.1)' : saved ? 'rgba(52,211,153,0.2)' : '#fff', color: saved ? '#34d399' : '#080808', border: saved ? '1px solid rgba(52,211,153,0.4)' : 'none', borderRadius: 12, padding: '13px', fontSize: 14, fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s' }}>
        {saving ? <><Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} />Kaydediliyor...</>
          : saved ? <><Check size={15} />Kaydedildi!</>
          : 'Değişiklikleri Kaydet'}
      </button>
      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
