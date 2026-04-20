# Supabase Kurulum Rehberi

Supabase'i kurmak için 10 dakika yeterli. Adım adım takip et.

---

## 1. Hesap Oluştur

1. https://supabase.com adresine git
2. "Start your project" butonuna tıkla
3. GitHub hesabınla giriş yap (en kolay yol)

---

## 2. Yeni Proje Oluştur

1. Giriş yaptıktan sonra "New project" butonuna tıkla
2. Organization seç (kişisel hesabın olacak)
3. Şu bilgileri doldur:
   - **Project name:** `visitly`
   - **Database Password:** Güçlü bir şifre yaz ve **kaydet** (sonra lazım olur)
   - **Region:** `West EU (Ireland)` — Türkiye'ye en yakın
4. "Create new project" butonuna tıkla
5. **2-3 dakika bekle** — proje hazırlanıyor

---

## 3. Veritabanı Şemasını Kur

1. Sol menüden **SQL Editor**'e tıkla
2. "New query" butonuna tıkla
3. `visitly/supabase/schema.sql` dosyasının içeriğini kopyala
4. SQL Editor'e yapıştır
5. **"Run"** butonuna tıkla (sağ üst)
6. Hata mesajı görünmüyorsa başarılı!

---

## 4. API Anahtarlarını Al

1. Sol menüden **Project Settings** → **API**'ye git
2. Şu değerleri kopyala ve `.env.local` dosyasına yapıştır:

```
NEXT_PUBLIC_SUPABASE_URL=https://XXXXX.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

`.env.local` dosyası `visitly/` klasöründe — şu an placeholder değerler var, gerçek değerleri yaz.

---

## 5. Email Ayarı (Auth)

1. Sol menüden **Authentication** → **Providers** → **Email**
2. "Confirm email" seçeneğini **kapalı** yap (geliştirme aşamasında pratik)
3. Canlıya alırken tekrar açabilirsin

---

## 6. Uygulamayı Başlat

```bash
cd visitly
npm run dev
```

Tarayıcıda http://localhost:3000 adresini aç.

---

## Kontrol Listesi

- [ ] Supabase hesabı oluşturuldu
- [ ] Yeni proje oluşturuldu
- [ ] schema.sql çalıştırıldı (hata yok)
- [ ] `.env.local` dosyasına gerçek değerler yazıldı
- [ ] Email onayı kapatıldı (opsiyonel)
- [ ] `npm run dev` çalışıyor

---

## Sorun Giderme

**"relation profiles does not exist" hatası:**
→ schema.sql düzgün çalışmamış. SQL Editor'de tekrar çalıştır.

**"Invalid API key" hatası:**
→ `.env.local` dosyasındaki değerleri kontrol et. Boşluk kalmış olabilir.

**Kayıt olunca profil oluşmuyor:**
→ Supabase'de Authentication → Providers → Email → "Confirm email"ı kapat.

---

## Üretim (Vercel) Deploy

1. https://vercel.com'da GitHub repo bağla
2. Environment Variables'a `.env.local` içindeki değerleri ekle
3. Deploy et — otomatik olarak yayına girer
