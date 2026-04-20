import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Gizlilik Politikası — Visitly',
  description: 'Visitly gizlilik politikası ve kişisel verilerin korunması hakkında bilgi.',
}

export default function GizlilikPage() {
  return (
    <div style={{ backgroundColor: '#080808', color: '#f5f5f5', minHeight: '100vh' }}>

      {/* Nav */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(20px)',
        backgroundColor: 'rgba(8,8,8,0.85)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
            <Image src="/logo-full.svg" alt="Visitly" width={110} height={28} style={{ height: 28, width: 'auto' }} />
          </Link>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: 13 }}>← Ana Sayfa</Link>
        </div>
      </nav>

      {/* Content */}
      <main style={{ maxWidth: 760, margin: '0 auto', padding: '64px 24px 96px' }}>

        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 12, color: '#60a5fa', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Yasal</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#fff', margin: '0 0 12px', letterSpacing: '-1px' }}>Gizlilik Politikası</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, margin: 0 }}>Son güncelleme: 19 Nisan 2026</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

          <Section title="1. Genel Bakış">
            <p>Visitly olarak kişisel verilerinizin güvenliğini ciddiye alıyoruz. Bu Gizlilik Politikası, visitly.tr web sitesini ve hizmetlerini kullandığınızda hangi verileri topladığımızı, bu verileri nasıl işlediğimizi ve haklarınızın neler olduğunu açıklamaktadır.</p>
            <p>Bu politika; <strong>6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK)</strong> ve Avrupa Birliği <strong>Genel Veri Koruma Yönetmeliği (GDPR)</strong> kapsamında hazırlanmıştır.</p>
          </Section>

          <Section title="2. Veri Sorumlusu">
            <p>Kişisel verileriniz bakımından veri sorumlusu <strong>Visitly</strong>'dir. Gizlilik konusundaki tüm sorularınız için <strong>privacy@visitly.tr</strong> adresine yazabilirsiniz.</p>
          </Section>

          <Section title="3. Topladığımız Veriler">
            <Subsection title="3.1 Hesap Verileri">
              <p>Kayıt olduğunuzda adınızı, e-posta adresinizi ve seçtiğiniz kullanıcı adını alıyoruz. Bu veriler hesabınızı oluşturmak ve yönetmek için zorunludur.</p>
            </Subsection>
            <Subsection title="3.2 Profil İçeriği">
              <p>Profilinize eklediğiniz bilgiler (bio, bağlantılar, IBAN bilgisi, profil fotoğrafı, tema tercihleri) sistemimizde saklanır. Bu içerikler tercihlerinize göre herkese açık olabilir.</p>
            </Subsection>
            <Subsection title="3.3 Kullanım Verileri">
              <p>Profilinizin kaç kez görüntülendiğini ve hangi bağlantılara tıklandığını anonim olarak kaydediyoruz. Bu veriler yalnızca size analitik bilgi sunmak amacıyla toplanır; üçüncü taraflarla paylaşılmaz.</p>
            </Subsection>
            <Subsection title="3.4 Teknik Veriler">
              <p>Hizmetin sağlanması ve güvenliğin korunması amacıyla IP adresi, tarayıcı türü ve oturum bilgileri gibi teknik veriler geçici olarak işlenebilir. Bu veriler kullanıcı profilleriyle ilişkilendirilmez.</p>
            </Subsection>
          </Section>

          <Section title="4. Verileri Nasıl Kullanıyoruz">
            <ul>
              <li>Hesabınızı oluşturmak ve doğrulamak</li>
              <li>Profil sayfanızı ziyaretçilere göstermek</li>
              <li>Analitik verilerini (görüntülenme, tıklama sayısı) size sunmak</li>
              <li>Hizmetle ilgili önemli bildirimler göndermek (güvenlik uyarıları, hizmet değişiklikleri)</li>
              <li>Teknik sorunları tespit etmek ve çözmek</li>
              <li>Yasal yükümlülükleri yerine getirmek</li>
            </ul>
            <p>Verilerinizi reklam amaçlı kullanmıyor, üçüncü taraf reklam ağlarıyla paylaşmıyoruz.</p>
          </Section>

          <Section title="5. Verilerin Saklanması">
            <p>Hesap verileriniz hesabınız aktif olduğu sürece tutulur. Hesabınızı sildiğinizde kişisel verileriniz 30 gün içinde sistemlerimizden kalıcı olarak silinir. Anonim analitik veriler bu kapsam dışındadır.</p>
            <p>Profil fotoğrafları Supabase Storage altyapısında, diğer veriler PostgreSQL veritabanında güvenli biçimde saklanmaktadır. Verileriniz yurt içi ve AB uyumlu sunucularda barındırılabilir.</p>
          </Section>

          <Section title="6. Çerezler">
            <p>Visitly, oturum yönetimi için yalnızca zorunlu çerezler kullanır. Analitik veya reklam amaçlı üçüncü taraf çerez kullanımı yoktur. Tarayıcınızın ayarlarından çerezleri devre dışı bırakabilirsiniz; ancak bu durumda oturum açma işlevleri çalışmayabilir.</p>
          </Section>

          <Section title="7. Üçüncü Taraf Hizmetleri">
            <p>Hizmetlerimiz aşağıdaki altyapı sağlayıcılarından yararlanmaktadır:</p>
            <ul>
              <li><strong>Supabase</strong> — veritabanı ve kimlik doğrulama altyapısı</li>
              <li><strong>Vercel</strong> — uygulama barındırma</li>
            </ul>
            <p>Bu sağlayıcılar yalnızca hizmetin işletilmesi için gerekli düzeyde veriye erişebilir ve kendi gizlilik politikalarına tabidir.</p>
          </Section>

          <Section title="8. KVKK Kapsamındaki Haklarınız">
            <p>6698 sayılı KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:</p>
            <ul>
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenmişse buna ilişkin bilgi talep etme</li>
              <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
              <li>Eksik veya yanlış işlenmiş verilerin düzeltilmesini isteme</li>
              <li>Verilerin silinmesini veya yok edilmesini isteme</li>
              <li>İşlemenin otomatik sistemler vasıtasıyla gerçekleştirilmesi halinde ortaya çıkan sonuca itiraz etme</li>
              <li>Kanuna aykırı işleme nedeniyle zarara uğramanız halinde zararın giderilmesini talep etme</li>
            </ul>
            <p>Bu haklarınızı kullanmak için <strong>privacy@visitly.tr</strong> adresine yazabilirsiniz.</p>
          </Section>

          <Section title="9. Çocukların Gizliliği">
            <p>Visitly hizmetleri 13 yaşın altındaki kişilere yönelik değildir. 13 yaşından küçük bir kullanıcıya ait veri topladığımızı fark ettiğimizde bu verileri derhal sileriz. Bu konuda bilgi vermek için <strong>privacy@visitly.tr</strong> adresiyle iletişime geçebilirsiniz.</p>
          </Section>

          <Section title="10. Politika Değişiklikleri">
            <p>Bu politikayı zaman zaman güncelleyebiliriz. Önemli değişiklikler yapıldığında kayıtlı e-posta adresinize bildirim göndeririz. Değişiklikler yayınlandıktan sonra hizmeti kullanmaya devam etmeniz, güncel politikayı kabul ettiğiniz anlamına gelir.</p>
          </Section>

          <Section title="11. İletişim">
            <p>Gizlilikle ilgili her türlü soru, talep veya şikayetiniz için:</p>
            <ul>
              <li>E-posta: <strong>privacy@visitly.tr</strong></li>
              <li>Web: <strong>visitly.tr</strong></li>
            </ul>
          </Section>

        </div>
      </main>

      <Footer />
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', margin: '0 0 16px', paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>{title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, color: 'rgba(255,255,255,0.65)', fontSize: 15, lineHeight: 1.75 }}>
        {children}
      </div>
    </section>
  )
}

function Subsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.85)', margin: '0 0 8px' }}>{title}</h3>
      <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15, lineHeight: 1.75 }}>{children}</div>
    </div>
  )
}

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
          <Image src="/logo-full.svg" alt="Visitly" width={90} height={22} style={{ height: 22, width: 'auto' }} />
        </Link>
        <div style={{ display: 'flex', gap: 24 }}>
          <Link href="/gizlilik" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: 13 }}>Gizlilik</Link>
          <Link href="/kullanim-kosullari" style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none', fontSize: 13 }}>Kullanım Koşulları</Link>
        </div>
        <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 13 }}>© 2026 Visitly</span>
      </div>
    </footer>
  )
}
