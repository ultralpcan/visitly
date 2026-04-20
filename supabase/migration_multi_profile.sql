-- Migration: Single profile → Multi profile per user
-- Mevcut veritabanında çalıştırılacak güncelleme scripti
-- Supabase SQL Editor'de sırayla çalıştır

-- 1. owner_id kolonu ekle (auth.users'a FK)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- 2. Mevcut kayıtlar için owner_id = id (eski 1:1 ilişki korunuyor)
UPDATE public.profiles SET owner_id = id WHERE owner_id IS NULL;

-- 3. owner_id NOT NULL yap
ALTER TABLE public.profiles ALTER COLUMN owner_id SET NOT NULL;

-- 4. id kolonundaki auth.users FK kısıtını kaldır, artık sadece rastgele UUID
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;
ALTER TABLE public.profiles ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- 5. Varsayılan profil flag'i
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS is_default BOOLEAN NOT NULL DEFAULT false;

-- Mevcut profilleri varsayılan olarak işaretle
UPDATE public.profiles SET is_default = true WHERE is_default = false;

-- Her kullanıcı için en fazla 1 varsayılan profil
CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_one_default_per_owner
  ON public.profiles(owner_id) WHERE is_default = true;

-- 6. Performans indeksi
CREATE INDEX IF NOT EXISTS idx_profiles_owner_id ON public.profiles(owner_id);

-- 7. RLS politikalarını owner_id'ye göre güncelle
DROP POLICY IF EXISTS "Kullanıcı kendi profilini görebilir" ON public.profiles;
DROP POLICY IF EXISTS "Kullanıcı kendi profilini oluşturabilir" ON public.profiles;
DROP POLICY IF EXISTS "Kullanıcı kendi profilini güncelleyebilir" ON public.profiles;
DROP POLICY IF EXISTS "Kullanıcı kendi profilini silebilir" ON public.profiles;

CREATE POLICY "Kullanıcı kendi profillerini görebilir"
  ON public.profiles FOR SELECT
  USING (auth.uid() = owner_id);

CREATE POLICY "Kullanıcı kendi profillerini oluşturabilir"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Kullanıcı kendi profillerini güncelleyebilir"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = owner_id);

CREATE POLICY "Kullanıcı kendi profillerini silebilir"
  ON public.profiles FOR DELETE
  USING (auth.uid() = owner_id);

-- 8. Blocks RLS'i profiles.owner_id üzerinden kontrol et
DROP POLICY IF EXISTS "Kullanıcı kendi bloklarını görebilir" ON public.blocks;
DROP POLICY IF EXISTS "Kullanıcı kendi bloklarını oluşturabilir" ON public.blocks;
DROP POLICY IF EXISTS "Kullanıcı kendi bloklarını güncelleyebilir" ON public.blocks;
DROP POLICY IF EXISTS "Kullanıcı kendi bloklarını silebilir" ON public.blocks;

CREATE POLICY "Kullanıcı kendi bloklarını görebilir"
  ON public.blocks FOR SELECT
  USING (profile_id IN (SELECT id FROM public.profiles WHERE owner_id = auth.uid()));

CREATE POLICY "Kullanıcı kendi bloklarını oluşturabilir"
  ON public.blocks FOR INSERT
  WITH CHECK (profile_id IN (SELECT id FROM public.profiles WHERE owner_id = auth.uid()));

CREATE POLICY "Kullanıcı kendi bloklarını güncelleyebilir"
  ON public.blocks FOR UPDATE
  USING (profile_id IN (SELECT id FROM public.profiles WHERE owner_id = auth.uid()));

CREATE POLICY "Kullanıcı kendi bloklarını silebilir"
  ON public.blocks FOR DELETE
  USING (profile_id IN (SELECT id FROM public.profiles WHERE owner_id = auth.uid()));

-- 9. Page views ve link clicks politikalarını da güncelle
DROP POLICY IF EXISTS "Kullanıcı kendi görüntüleme verilerini görebilir" ON public.page_views;
DROP POLICY IF EXISTS "Kullanıcı kendi tıklama verilerini görebilir" ON public.link_clicks;

CREATE POLICY "Kullanıcı kendi görüntüleme verilerini görebilir"
  ON public.page_views FOR SELECT
  USING (profile_id IN (SELECT id FROM public.profiles WHERE owner_id = auth.uid()));

CREATE POLICY "Kullanıcı kendi tıklama verilerini görebilir"
  ON public.link_clicks FOR SELECT
  USING (profile_id IN (SELECT id FROM public.profiles WHERE owner_id = auth.uid()));
