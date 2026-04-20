import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Kullanım Koşulları — Visitly',
  description: 'Visitly hizmet kullanım koşulları ve kabul edilebilir kullanım politikası.',
}

export default function KullanimKosullariPage() {
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
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#fff', margin: '0 0 12px', letterSpacing: '-1px' }}>Kullanım Koşulları</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, margin: 0 }}>Son güncelleme: 19 Nisan 2026</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

          <Section title="1. Kabul ve Kapsam">
            <p>visitly.tr adresine erişerek veya Visitly hizmetlerini kullanarak bu Kullanım Koşullarını kabul etmiş sayılırsınız. Bu koşulları kabul etmiyorsanız hizmeti kullanmayınız.</p>
            <p>Visitly, dijital kartvizit oluşturma ve paylaşma hizmeti sunan bir platformdur. Bu koşullar, hizmete erişen tüm kullanıcıları kapsar.</p>
          </Section>

          <Section title="2. Hesap Oluşturma">
            <p>Hizmeti kullanmak için bir hesap oluşturmanız gerekmektedir. Hesap oluştururken:</p>
            <ul>
              <li>Doğru ve güncel bilgiler sağlamakla yükümlüsünüz.</li>
              <li>Hesap güvenliğinizden (şifre, oturum) siz sorumlusunuz.</li>
              <li>Başka bir kişiyi veya markayı taklit eden hesap oluşturamazsınız.</li>
              <li>Bir kişinin yalnızca bir aktif hesabı olabilir.</li>
              <li>13 yaşın altındaysanız hesap oluşturamazsınız.</li>
            </ul>
          </Section>

          <Section title="3. Kabul Edilebilir Kullanım">
            <p>Visitly'yi yalnızca yasal amaçlar için kullanabilirsiniz. Aşağıdakiler kesinlikle yasaktır:</p>
            <ul>
              <li>Yasadışı, zararlı, tehdit edici, taciz edici veya iftira niteliğinde içerik yayınlamak</li>
              <li>Başkalarının fikri mülkiyet haklarını ihlal eden içerik paylaşmak</li>
              <li>Spam, kimlik avı veya dolandırıcılık amaçlı kullanım</li>
              <li>Kötü amaçlı yazılım, virüs veya zararlı kod dağıtmak</li>
              <li>Hizmetin altyapısına aşırı yük bindirmek veya sistemi bozmaya çalışmak</li>
              <li>Diğer kullanıcıların verilerine izinsiz erişmeye çalışmak</li>
              <li>Otomatik araçlarla sisteme toplu kayıt veya erişim sağlamak (scraping, botlar)</li>
              <li>Reşit olmayanlara yönelik zararlı içerik yayınlamak</li>
              <li>Türkiye Cumhuriyeti kanunlarına veya uluslararası hukuka aykırı faaliyetler yürütmek</li>
            </ul>
          </Section>

          <Section title="4. İçerik Sahipliği ve Lisans">
            <p>Profilinize yüklediğiniz tüm içeriklerin (metin, fotoğraf, bağlantılar) fikri mülkiyet hakkı size aittir. Ancak bu içerikleri platforma yükleyerek Visitly'ye söz konusu içerikleri hizmetin işletilmesi amacıyla (profil sayfanızın gösterilmesi, önbelleğe alınması vb.) kullanma hakkı tanırsınız. Bu lisans hesabınız silindiğinde sona erer.</p>
            <p>Visitly'nin kendi markası, logosu, tasarımı ve yazılımı üzerindeki tüm fikri mülkiyet hakları Visitly'ye aittir. Bu içerikler izin alınmadan kopyalanamaz veya kullanılamaz.</p>
          </Section>

          <Section title="5. Ücretsiz Hizmet ve Gelecekteki Değişiklikler">
            <p>Visitly şu anda tamamen ücretsizdir. İleride ücretli planlar veya ek özellikler sunulabilir; ancak mevcut temel özellikler ücretsiz olmaya devam edecektir. Fiyatlandırmada önemli değişiklikler yapılmadan en az 30 gün önce kullanıcılar bilgilendirilecektir.</p>
          </Section>

          <Section title="6. Hizmetin Askıya Alınması ve Hesap Kapatma">
            <p>Visitly, aşağıdaki durumlarda önceden bildirim yapmaksızın hesabınızı askıya alabilir veya silebilir:</p>
            <ul>
              <li>Bu koşulların ihlal edilmesi</li>
              <li>Hizmetin kötüye kullanımı</li>
              <li>Başka kullanıcılara veya üçüncü taraflara zarar verilmesi</li>
              <li>Yasadışı faaliyetler</li>
            </ul>
            <p>Hesabınızı istediğiniz zaman kapatabilirsiniz. Hesap kapatma işlemi sonrasında verileriniz 30 gün içinde silinir.</p>
          </Section>

          <Section title="7. Sorumluluk Sınırlaması">
            <p>Visitly, hizmetin kesintisiz veya hatasız çalışacağını garanti etmez. Teknik arızalar, bakım çalışmaları veya beklenmedik durumlar nedeniyle hizmet geçici olarak kullanılamayabilir.</p>
            <p>Visitly; kullanıcıların profilleri aracılığıyla yaptığı paylaşımlardan, IBAN bilgilerinin üçüncü kişilerle paylaşılmasından veya bağlantıların yönlendirdiği harici sitelerden kaynaklanan zararlardan sorumlu tutulamaz.</p>
            <p>Visitly'nin sorumluluğu, yürürlükteki kanunların izin verdiği azami ölçüde sınırlandırılmıştır.</p>
          </Section>

          <Section title="8. Üçüncü Taraf Bağlantıları">
            <p>Kullanıcı profillerinde yer alan bağlantılar üçüncü taraf web sitelerine yönlendirebilir. Visitly, bu sitelerin içeriğinden veya gizlilik uygulamalarından sorumlu değildir. Üçüncü taraf siteleri kendi koşul ve politikaları kapsamında değerlendirmenizi tavsiye ederiz.</p>
          </Section>

          <Section title="9. IBAN ve Finansal Bilgiler">
            <p>Visitly, IBAN bilgilerini kullanıcıların tercihine göre profillerinde görüntüleme imkânı sunar. Bu bilgiler yalnızca kolayca paylaşım amacı taşır; Visitly herhangi bir ödeme işlemi gerçekleştirmez ve finansal bir aracı değildir.</p>
            <p>IBAN bilgilerinizi profilinizde paylaşmayı tercih etmeniz tamamen sizin sorumluluğunuzdadır. Üçüncü kişilerle gerçekleştirilen finansal işlemler Visitly'nin denetimi dışındadır.</p>
          </Section>

          <Section title="10. Uygulanacak Hukuk ve Uyuşmazlık Çözümü">
            <p>Bu koşullar Türkiye Cumhuriyeti hukukuna tabidir. Bu koşullardan doğan uyuşmazlıklarda İstanbul mahkemeleri ve icra daireleri yetkilidir.</p>
          </Section>

          <Section title="11. Koşullarda Değişiklik">
            <p>Kullanım koşullarını zaman zaman güncelleyebiliriz. Önemli değişiklikler yapıldığında kayıtlı e-posta adresinize bildirim göndeririz. Değişikliklerin yayınlanmasından sonra hizmeti kullanmaya devam etmeniz, güncel koşulları kabul ettiğiniz anlamına gelir.</p>
          </Section>

          <Section title="12. İletişim">
            <p>Kullanım koşullarına ilişkin sorularınız için:</p>
            <ul>
              <li>E-posta: <strong>destek@visitly.tr</strong></li>
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

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
          <Image src="/logo-full.svg" alt="Visitly" width={90} height={22} style={{ height: 22, width: 'auto' }} />
        </Link>
        <div style={{ display: 'flex', gap: 24 }}>
          <Link href="/gizlilik" style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none', fontSize: 13 }}>Gizlilik</Link>
          <Link href="/kullanim-kosullari" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: 13 }}>Kullanım Koşulları</Link>
        </div>
        <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 13 }}>© 2026 Visitly</span>
      </div>
    </footer>
  )
}
