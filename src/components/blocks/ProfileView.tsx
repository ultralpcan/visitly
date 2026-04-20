'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { Block, Profile, Theme } from '@/types'
import { BlockRenderer } from './BlockRenderer'
import { createClient } from '@/lib/supabase/client'

interface Props {
  profile: Profile
  blocks: Block[]
  theme: Theme
}

export function ProfileView({ profile, blocks, theme }: Props) {
  useEffect(() => {
    // Sayfa görüntülemesini kaydet
    const supabase = createClient()
    supabase.from('page_views').insert({
      profile_id: profile.id,
      referrer: document.referrer || null,
    })
  }, [profile.id])

  function handleLinkClick(blockId: string) {
    const supabase = createClient()
    supabase.from('link_clicks').insert({
      block_id: blockId,
      profile_id: profile.id,
    })
  }

  return (
    <div className={`min-h-screen ${theme.bg} py-12 px-4`}>
      <div className="max-w-sm mx-auto">
        {/* Profil başlığı */}
        <div className="flex flex-col items-center mb-8">
          {profile.avatar_url ? (
            <Image
              src={profile.avatar_url}
              alt={profile.display_name}
              width={96}
              height={96}
              className="w-24 h-24 rounded-full object-cover mb-4 ring-4 ring-white/20"
            />
          ) : (
            <div className={`w-24 h-24 rounded-full mb-4 flex items-center justify-center text-3xl font-bold ${theme.button} ${theme.buttonText}`}>
              {profile.display_name[0]?.toUpperCase()}
            </div>
          )}
          <h1 className={`text-2xl font-bold ${theme.text} mb-2`}>
            {profile.display_name}
          </h1>
          {profile.bio && (
            <p className={`text-sm text-center leading-relaxed ${theme.subtext}`}>
              {profile.bio}
            </p>
          )}
        </div>

        {/* Bloklar */}
        <div className="space-y-4">
          {blocks.map((block) => (
            <BlockRenderer
              key={block.id}
              block={block}
              theme={theme}
              buttonStyle={profile.button_style}
              onLinkClick={handleLinkClick}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className={`text-xs ${theme.subtext} hover:opacity-100 opacity-50 transition-opacity`}
          >
            visitly ile oluşturuldu
          </Link>
        </div>
      </div>
    </div>
  )
}
