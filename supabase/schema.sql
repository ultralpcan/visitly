-- Visitly Veritabanı Şeması (YENİ — multi profile)
-- Temiz kurulum için Supabase SQL Editor'de bu dosyayı çalıştır.
-- Mevcut veritabanı varsa migration_multi_profile.sql kullan.

-- Profiller tablosu (her kullanıcı birden çok profil sahibi olabilir)
CREATE TABLE public.profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  theme TEXT NOT NULL DEFAULT 'default',
  button_style TEXT NOT NULL DEFAULT 'rounded',
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Bloklar tablosu
CREATE TABLE public.blocks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Sayfa görüntülemeleri
CREATE TABLE public.page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  referrer TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Link tıklamaları
CREATE TABLE public.link_clicks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  block_id UUID REFERENCES public.blocks(id) ON DELETE CASCADE NOT NULL,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- İndeksler
CREATE INDEX idx_profiles_username ON public.profiles(username);
CREATE INDEX idx_profiles_owner_id ON public.profiles(owner_id);
CREATE UNIQUE INDEX idx_profiles_one_default_per_owner ON public.profiles(owner_id) WHERE is_default = true;
CREATE INDEX idx_blocks_profile_id ON public.blocks(profile_id);
CREATE INDEX idx_blocks_position ON public.blocks(profile_id, position);
CREATE INDEX idx_page_views_profile_id ON public.page_views(profile_id);
CREATE INDEX idx_page_views_created_at ON public.page_views(profile_id, created_at);
CREATE INDEX idx_link_clicks_profile_id ON public.link_clicks(profile_id);
CREATE INDEX idx_link_clicks_block_id ON public.link_clicks(block_id);

-- Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.link_clicks ENABLE ROW LEVEL SECURITY;

-- Profiles politikaları
CREATE POLICY "Herkes aktif profilleri görebilir"
  ON public.profiles FOR SELECT
  USING (is_active = true);

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

-- Blocks politikaları (profiles.owner_id üzerinden)
CREATE POLICY "Herkes görünür blokları görebilir"
  ON public.blocks FOR SELECT
  USING (is_visible = true);

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

-- Page views politikaları
CREATE POLICY "Herkes görüntüleme kaydı oluşturabilir"
  ON public.page_views FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Kullanıcı kendi görüntüleme verilerini görebilir"
  ON public.page_views FOR SELECT
  USING (profile_id IN (SELECT id FROM public.profiles WHERE owner_id = auth.uid()));

-- Link clicks politikaları
CREATE POLICY "Herkes tıklama kaydı oluşturabilir"
  ON public.link_clicks FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Kullanıcı kendi tıklama verilerini görebilir"
  ON public.link_clicks FOR SELECT
  USING (profile_id IN (SELECT id FROM public.profiles WHERE owner_id = auth.uid()));

-- Storage bucket (avatarlar için)
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

CREATE POLICY "Herkes avatarları görebilir"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Kullanıcı kendi avatarını yükleyebilir"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Kullanıcı kendi avatarını güncelleyebilir"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Kullanıcı kendi avatarını silebilir"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
