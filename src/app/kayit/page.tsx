'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { validateUsername, usernameErrorMessage } from '@/lib/username'
import { Loader2 } from 'lucide-react'

export default function KayitPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const form = e.currentTarget
    const rawUsername = form.username.value as string
    const email = form.email.value as string
    const password = form.password.value as string
    const displayName = form.display_name.value as string

    const result = validateUsername(rawUsername)
    if (!result.valid) { setError(usernameErrorMessage(result.error)); setLoading(false); return }
    const username = result.username

    const supabase = createClient()
    const { data: existing } = await supabase.from('profiles').select('username').eq('username', username).maybeSingle()
    if (existing) { setError('Bu kullanıcı adı zaten alınmış.'); setLoading(false); return }

    const { data: authData, error: authError } = await supabase.auth.signUp({ email, password, options: { data: { display_name: displayName, username } } })
    if (authError) { setError(authError.message); setLoading(false); return }
    if (!authData.user) { setError('Kayıt başarısız.'); setLoading(false); return }

    const { error: profileError } = await supabase.from('profiles').insert({
      owner_id: authData.user.id,
      username,
      display_name: displayName,
      theme: 'dark',
      button_style: 'rounded',
      is_active: true,
      is_default: true,
    })
    if (profileError) { setError(profileError.message); setLoading(false); return }

    router.push('/dashboard')
    router.refresh()
  }

  const inputStyle = {
    width: '100%', backgroundColor: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10,
    padding: '11px 14px', color: '#fff', fontSize: 14, outline: 'none',
    boxSizing: 'border-box' as const,
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', marginBottom: 8 }}>
            <Image src="/logo-full.svg" alt="Visitly" width={120} height={30} style={{ height: 30, width: 'auto' }} />
          </Link>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>Ücretsiz profil sayfanı oluştur</p>
        </div>

        <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '32px' }}>
          {error && (
            <div style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5', fontSize: 13, padding: '12px 16px', borderRadius: 10, marginBottom: 20 }}>{error}</div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Kullanıcı Adı</label>
              <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, overflow: 'hidden' }}>
                <span style={{ padding: '11px 0 11px 14px', fontSize: 14, color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap', flexShrink: 0 }}>visitly.tr/</span>
                <input name="username" type="text" required minLength={4} maxLength={30} placeholder="kullanici"
                  style={{ flex: 1, backgroundColor: 'transparent', border: 'none', padding: '11px 14px 11px 0', color: '#fff', fontSize: 14, outline: 'none' }} />
              </div>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 6 }}>En az 4 karakter · Sadece küçük harf, rakam, _ ve -</p>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Ad Soyad</label>
              <input name="display_name" type="text" required placeholder="Adın Soyadın" style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'rgba(139,92,246,0.5)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>E-posta</label>
              <input name="email" type="email" required placeholder="ornek@email.com" style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'rgba(139,92,246,0.5)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Şifre</label>
              <input name="password" type="password" required minLength={6} placeholder="En az 6 karakter" style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'rgba(139,92,246,0.5)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
            </div>

            <button type="submit" disabled={loading}
              style={{ marginTop: 4, backgroundColor: '#fff', color: '#080808', border: 'none', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              {loading ? <><Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} />Oluşturuluyor...</> : 'Kayıt Ol'}
            </button>
          </form>

          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', textAlign: 'center', marginTop: 16, lineHeight: 1.5 }}>
            Kayıt olarak <Link href="/kullanim-kosullari" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'underline' }}>Kullanım Koşulları</Link>&apos;nı kabul etmiş olursun.
          </p>
        </div>

        <p style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 24 }}>
          Zaten hesabın var mı?{' '}
          <Link href="/giris" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontWeight: 500 }}>Giriş Yap</Link>
        </p>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
