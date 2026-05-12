-- Migration: Showcase profile type (kuyumcu → müşteri kartı)
-- Supabase SQL Editor'de çalıştır

-- 1. profiles tablosuna tip ve issuer (kart düzenleyen) bilgisi ekle
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS profile_type TEXT NOT NULL DEFAULT 'personal',
  ADD COLUMN IF NOT EXISTS company_info JSONB NOT NULL DEFAULT '{}'::jsonb;

-- Geçerli tipler: 'personal', 'showcase'
ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profile_type_check;
ALTER TABLE public.profiles
  ADD CONSTRAINT profile_type_check CHECK (profile_type IN ('personal', 'showcase'));

-- 2. Showcase ürünleri tablosu (müşterinin satın aldıkları)
CREATE TABLE IF NOT EXISTS public.showcase_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  title TEXT NOT NULL,
  description TEXT,
  primary_image_url TEXT,
  gallery JSONB NOT NULL DEFAULT '[]'::jsonb,         -- ek görseller [url1, url2, ...]
  specs JSONB NOT NULL DEFAULT '{}'::jsonb,           -- esnek alanlar (karat, ağırlık, sertifika no, vs.)
  acquired_at DATE,                                    -- satın alma tarihi
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_showcase_items_profile_id ON public.showcase_items(profile_id);
CREATE INDEX IF NOT EXISTS idx_showcase_items_position ON public.showcase_items(profile_id, position);

ALTER TABLE public.showcase_items ENABLE ROW LEVEL SECURITY;

-- 3. RLS politikaları
CREATE POLICY "Herkes görünür showcase ürünlerini görebilir"
  ON public.showcase_items FOR SELECT
  USING (is_visible = true);

CREATE POLICY "Kullanıcı kendi showcase ürünlerini görebilir"
  ON public.showcase_items FOR SELECT
  USING (profile_id IN (SELECT id FROM public.profiles WHERE owner_id = auth.uid()));

CREATE POLICY "Kullanıcı kendi showcase ürünlerini oluşturabilir"
  ON public.showcase_items FOR INSERT
  WITH CHECK (profile_id IN (SELECT id FROM public.profiles WHERE owner_id = auth.uid()));

CREATE POLICY "Kullanıcı kendi showcase ürünlerini güncelleyebilir"
  ON public.showcase_items FOR UPDATE
  USING (profile_id IN (SELECT id FROM public.profiles WHERE owner_id = auth.uid()));

CREATE POLICY "Kullanıcı kendi showcase ürünlerini silebilir"
  ON public.showcase_items FOR DELETE
  USING (profile_id IN (SELECT id FROM public.profiles WHERE owner_id = auth.uid()));

-- 4. Showcase görselleri için ayrı storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('showcase', 'showcase', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Herkes showcase görsellerini görebilir"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'showcase');

CREATE POLICY "Kullanıcı kendi showcase görsellerini yükleyebilir"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'showcase' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Kullanıcı kendi showcase görsellerini güncelleyebilir"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'showcase' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Kullanıcı kendi showcase görsellerini silebilir"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'showcase' AND auth.uid()::text = (storage.foldername(name))[1]);
