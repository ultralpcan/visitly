import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Check, BarChart3, Palette, QrCode, Zap, Link as LinkIcon, CreditCard, FileText, Eye, MapPin, Download } from 'lucide-react'
import { FaInstagram, FaLinkedinIn, FaBehance, FaXTwitter } from 'react-icons/fa6'

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
          <Link href="#ozellikler" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)',
            textDecoration: 'none', fontSize: 15, padding: '14px 28px', borderRadius: 12,
          }}>
            Özellikleri Keşfet
          </Link>
        </div>

        {/* Mock profile card */}
        <div style={{ marginTop: 72, display: 'flex', justifyContent: 'center', perspective: 1000 }}>
          <div style={{
            position: 'relative',
            width: 320,
            borderRadius: 28,
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)',
            backdropFilter: 'blur(24px)',
            padding: '28px 22px 22px',
            textAlign: 'center',
            boxShadow: '0 0 120px rgba(139,92,246,0.2), 0 0 60px rgba(96,165,250,0.1)',
          }}>
            {/* Views badge */}
            <div style={{
              position: 'absolute', top: 16, right: 16,
              display: 'inline-flex', alignItems: 'center', gap: 5,
              fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.5)',
              backgroundColor: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)',
              padding: '4px 9px', borderRadius: 999,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#34d399', boxShadow: '0 0 8px #34d399' }} />
              1,284 görüntülenme
            </div>

            {/* Avatar */}
            <div style={{
              width: 80, height: 80, borderRadius: '50%', margin: '8px auto 14px',
              background: 'linear-gradient(135deg, #ec4899, #8b5cf6, #3b82f6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 30, fontWeight: 700, color: '#fff',
              boxShadow: '0 8px 32px rgba(139,92,246,0.4)',
            }}>E</div>

            <div style={{ fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 4 }}>Elif Kaya</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 10 }}>Ürün Tasarımcısı · Freelance</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 20 }}>
              <MapPin size={11} /> İstanbul, Türkiye
            </div>

            {/* Social icons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 9, marginBottom: 14 }}>
              {[
                { Icon: FaInstagram, color: '#E1306C' },
                { Icon: FaLinkedinIn, color: '#0A66C2' },
                { Icon: FaBehance, color: '#1769FF' },
                { Icon: FaXTwitter, color: '#fff' },
              ].map(({ Icon, color }, i) => (
                <div key={i} style={{
                  width: 42, height: 42, borderRadius: 12,
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color, fontSize: 16,
                }}><Icon /></div>
              ))}
            </div>

            {/* CV link card */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              backgroundColor: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(10px)',
              borderRadius: 14, padding: '11px 12px', marginBottom: 9,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                backgroundColor: 'rgba(96,165,250,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#60a5fa', flexShrink: 0,
              }}><FileText size={16} /></div>
              <div style={{ flex: 1, textAlign: 'left', minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>CV&apos;mi İndir</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>PDF · 2 sayfa</div>
              </div>
              <Download size={14} color="rgba(255,255,255,0.4)" />
            </div>

            {/* Portfolio link card */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              backgroundColor: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(10px)',
              borderRadius: 14, padding: '11px 12px', marginBottom: 9,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                backgroundColor: 'rgba(167,139,250,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#a78bfa', flexShrink: 0,
              }}><Palette size={16} /></div>
              <div style={{ flex: 1, textAlign: 'left', minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>Portfolyom</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>elifkaya.design</div>
              </div>
              <ArrowRight size={14} color="rgba(255,255,255,0.4)" />
            </div>

            {/* IBAN card */}
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(10px)',
              borderRadius: 14, padding: '12px 14px', textAlign: 'left',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>IBAN · Ziraat</span>
                <span style={{ fontSize: 9, color: '#34d399', fontWeight: 600 }}>Tıkla, kopyala</span>
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', fontFamily: 'ui-monospace, SFMono-Regular, monospace', letterSpacing: 0.5 }}>
                TR47 0001 0023 4567 8901 2345 67
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="ozellikler" style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '80px 24px', scrollMarginTop: 80 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 36, fontWeight: 700, letterSpacing: '-1px', marginBottom: 12, color: '#fff' }}>
            İhtiyacın olan her şey
          </h2>
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 16, marginBottom: 56 }}>
            Karmaşık araçlara gerek yok.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {[
              { icon: <LinkIcon size={20} />, title: 'Sınırsız Link', desc: '18+ platformu tek sayfada topla. Instagram, LinkedIn, GitHub, TikTok ve dahası.' },
              { icon: <FileText size={20} />, title: 'CV Bağlantısı', desc: 'PDF özgeçmişini Google Drive&apos;dan bağla, ziyaretçiler tek tıkla indirsin.' },
              { icon: <CreditCard size={20} />, title: 'IBAN Bloğu', desc: 'Banka bilgilerini tek tıkla kopyalanabilir şekilde paylaş.' },
              { icon: <Palette size={20} />, title: '8 Tema · Cam Efekti', desc: 'Glassmorphism butonlar, gradyanlar. Profilin seni yansıtsın.' },
              { icon: <BarChart3 size={20} />, title: 'Gerçek Zamanlı Analitik', desc: 'Kim bakıyor, nereden geliyor, hangi linke tıklıyor — hepsi panelde.' },
              { icon: <QrCode size={20} />, title: 'QR Kod', desc: 'Otomatik QR kod üret. Kartvizite bas, masaya koy, ekrana göster.' },
              { icon: <Eye size={20} />, title: 'Çoklu Profil', desc: 'İş ve kişisel profil ayrı ayrı. Tek hesaptan birden fazla profil yönet.' },
              { icon: <Zap size={20} />, title: 'Anlık Yayın', desc: 'Düzenle ve kaydet. Değişiklikler saniyeler içinde canlıya alınır.' },
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
                'Tek hesapta birden fazla profil',
                'Sınırsız link ekleme',
                'CV / Özgeçmiş bağlantısı',
                'IBAN bloğu',
                '8 farklı tema · Cam efektli butonlar',
                'QR kod oluşturma',
                'Gerçek zamanlı analitik',
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
