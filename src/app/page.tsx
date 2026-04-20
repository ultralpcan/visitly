import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Check, BarChart3, Palette, QrCode, Zap, Link as LinkIcon, CreditCard } from 'lucide-react'

export default function Home() {
  return (
    <div style={{ backgroundColor: '#080808', color: '#f5f5f5', minHeight: '100vh' }}>

      {/* Nav */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(20px)',
        backgroundColor: 'rgba(8,8,8,0.8)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Image src="/logo-full.svg" alt="Visitly" width={120} height={30} style={{ height: 30, width: 'auto' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link href="/giris" style={{
              color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 14, padding: '8px 16px',
              borderRadius: 8, transition: 'color 0.2s',
            }}>
              Giriş Yap
            </Link>
            <Link href="/kayit" style={{
              backgroundColor: '#fff', color: '#080808', textDecoration: 'none', fontSize: 14,
              fontWeight: 600, padding: '8px 18px', borderRadius: 8,
            }}>
              Başla
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 24px 80px', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          backgroundColor: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)',
          color: '#a78bfa', fontSize: 13, padding: '6px 14px', borderRadius: 20, marginBottom: 32,
        }}>
          <Zap size={13} />
          Ücretsiz dijital kartvizit
        </div>

        <h1 style={{
          fontSize: 'clamp(40px, 7vw, 72px)', fontWeight: 800, lineHeight: 1.08,
          letterSpacing: '-2px', marginBottom: 24, color: '#fff',
        }}>
          Tek link ile<br />
          <span style={{
            background: 'linear-gradient(135deg, #a78bfa 0%, #60a5fa 50%, #34d399 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            her şeyini paylaş
          </span>
        </h1>

        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.7 }}>
          Sosyal medya, IBAN, web siten — hepsi tek profesyonel sayfada.
          Saniyeler içinde oluştur, QR kodla paylaş.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/kayit" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            backgroundColor: '#fff', color: '#080808', textDecoration: 'none',
            fontSize: 15, fontWeight: 600, padding: '14px 28px', borderRadius: 12,
          }}>
            Ücretsiz Başla <ArrowRight size={16} />
          </Link>
          <Link href="/ultralpcan" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)',
            textDecoration: 'none', fontSize: 15, padding: '14px 28px', borderRadius: 12,
          }}>
            Örnek Profil
          </Link>
        </div>

        {/* Mock profile card */}
        <div style={{ marginTop: 64, display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: 280, borderRadius: 24,
            border: '1px solid rgba(255,255,255,0.08)',
            backgroundColor: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(20px)',
            padding: '32px 24px', textAlign: 'center',
            boxShadow: '0 0 80px rgba(139,92,246,0.15)',
          }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%', margin: '0 auto 16px',
              background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, fontWeight: 700, color: '#fff',
            }}>A</div>
            <div style={{ fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 6 }}>Alpcan M.</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 24 }}>Full Stack Developer</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 16 }}>
              {['in', 'gh', 'tw', 'ig'].map(s => (
                <div key={s} style={{
                  width: 40, height: 40, borderRadius: 10,
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)',
                }}>{s}</div>
              ))}
            </div>
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12, padding: '12px 16px', textAlign: 'left',
            }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>IBAN</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace' }}>TR12 3456 7890 1234</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 36, fontWeight: 700, letterSpacing: '-1px', marginBottom: 12, color: '#fff' }}>
            İhtiyacın olan her şey
          </h2>
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 16, marginBottom: 56 }}>
            Karmaşık araçlara gerek yok.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {[
              { icon: <LinkIcon size={20} />, title: 'Sınırsız Link', desc: '18+ platformu tek sayfada topla. Instagram, LinkedIn, GitHub...' },
              { icon: <Palette size={20} />, title: '8 Tema', desc: 'Koyu, açık, gradyan. Profilin seni tam olarak yansıtsın.' },
              { icon: <BarChart3 size={20} />, title: 'Gerçek Zamanlı Analitik', desc: 'Kim bakıyor, nereden geliyor, hangi linke tıklıyor.' },
              { icon: <QrCode size={20} />, title: 'QR Kod', desc: 'Otomatik QR kod üret. Kartvizite bas, ekrana göster.' },
              { icon: <CreditCard size={20} />, title: 'IBAN Bloğu', desc: 'Banka bilgilerini tek tıkla kopyalanabilir şekilde paylaş.' },
              { icon: <Zap size={20} />, title: 'Anlık Yayın', desc: 'Düzenle ve kaydet. Değişiklikler anında canlıya alınır.' },
            ].map((f, i) => (
              <div key={i} style={{
                padding: '28px 24px', borderRadius: 16,
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  backgroundColor: 'rgba(139,92,246,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#a78bfa', marginBottom: 16,
                }}>
                  {f.icon}
                </div>
                <div style={{ fontWeight: 600, fontSize: 15, color: '#fff', marginBottom: 8 }}>{f.title}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 440, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-1px', marginBottom: 12, color: '#fff' }}>Tamamen Ücretsiz</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 40 }}>Tüm özellikler, sınırsız kullanım.</p>
          <div style={{
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '36px 32px',
            backgroundColor: 'rgba(255,255,255,0.02)',
          }}>
            <div style={{ fontSize: 52, fontWeight: 800, color: '#fff', letterSpacing: '-2px' }}>₺0</div>
            <div style={{ color: 'rgba(255,255,255,0.3)', marginBottom: 32, fontSize: 14 }}>Sonsuza kadar ücretsiz</div>
            <div style={{ textAlign: 'left', marginBottom: 32 }}>
              {[
                'Özel kullanıcı adı (visitly.tr/siz)',
                'Sınırsız link ekleme',
                'IBAN bloğu',
                '8 farklı tema',
                'QR kod oluşturma',
                'Analitik dashboard',
                'Profil fotoğrafı yükleme',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.75)', fontSize: 14 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: 'rgba(52,211,153,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={12} color="#34d399" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
            <Link href="/kayit" style={{
              display: 'block', backgroundColor: '#fff', color: '#080808',
              textDecoration: 'none', fontSize: 15, fontWeight: 600,
              padding: '14px', borderRadius: 12, textAlign: 'center',
            }}>
              Hemen Oluştur
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
            <Image src="/logo-full.svg" alt="Visitly" width={90} height={22} style={{ height: 22, width: 'auto' }} />
          </Link>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link href="/gizlilik" style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none', fontSize: 13 }}>Gizlilik</Link>
            <Link href="/kullanim-kosullari" style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none', fontSize: 13 }}>Kullanım Koşulları</Link>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 13 }}>© 2026 Visitly</span>
        </div>
      </footer>
    </div>
  )
}
