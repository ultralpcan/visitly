'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { validateUsername, usernameErrorMessage } from '@/lib/username'
import { switchActiveProfile } from '@/app/dashboard/actions'
import { Loader2 } from 'lucide-react'

export function NewProfileForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [, startTransition] = useTransition()
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true); setError('')

    const form = e.currentTarget
    const result = validateUsername(form.username.value as string)
    if (!result.valid) { setError(usernameErrorMessage(result.error)); setLoading(false); return }
    const username = result.username
    const displayName = (form.display_name.value as string).trim()

    if (!displayName) { setError('Ad soyad zorunludur.'); setLoading(false); return }

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setError('Oturum süresi dolmuş.'); setLoading(false); return }

    const { data: existing } = await supabase.from('profiles').select('username').eq('username', username).maybeSingle()
    if (existing) { setError('Bu kullanıcı adı zaten alınmış.'); setLoading(false); return }

    const { data: inserted, error: insertError } = await supabase
      .from('profiles')
      .insert({
        owner_id: user.id,
        username,
        display_name: displayName,
        theme: 'dark',
        button_style: 'rounded',
        is_active: true,
        is_default: false,
      })
      .select('id')
      .single()

    if (insertError || !inserted) { setError(insertError?.message ?? 'Oluşturulamadı.'); setLoading(false); return }

    startTransition(async () => {
      await switchActiveProfile(inserted.id)
      router.push('/dashboard/profil')
      router.refresh()
    })
  }

  const inputStyle = {
    width: '100%', backgroundColor: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10,
    padding: '11px 14px', color: '#fff', fontSize: 14, outline: 'none',
    boxSizing: 'border-box' as const,
  }

  return (
    <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '24px' }}>
      {error && (
        <div style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5', fontSize: 13, padding: '12px 16px', borderRadius: 10, marginBottom: 20 }}>{error}</div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Kullanıcı Adı</label>
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, overflow: 'hidden' }}>
            <span style={{ padding: '11px 0 11px 14px', fontSize: 14, color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap', flexShrink: 0 }}>visitly.tr/</span>
            <input name="username" type="text" required minLength={4} maxLength={30} placeholder="yeni-profil"
              style={{ flex: 1, backgroundColor: 'transparent', border: 'none', padding: '11px 14px 11px 0', color: '#fff', fontSize: 14, outline: 'none' }} />
          </div>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 6 }}>En az 4 karakter · Sadece küçük harf, rakam, _ ve -</p>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Görünen Ad</label>
          <input name="display_name" type="text" required placeholder="Örn. İş Profilim" style={inputStyle}
            onFocus={e => (e.target.style.borderColor = 'rgba(139,92,246,0.5)')}
            onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
        </div>

        <button type="submit" disabled={loading}
          style={{ marginTop: 4, backgroundColor: '#fff', color: '#080808', border: 'none', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          {loading ? <><Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} />Oluşturuluyor...</> : 'Profili Oluştur'}
        </button>
      </form>
      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
