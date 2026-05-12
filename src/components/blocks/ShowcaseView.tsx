'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ChevronDown, MapPin, Phone, Mail, Globe, Calendar } from 'lucide-react'
import type { Profile, Theme, ShowcaseItem } from '@/types'
import { createClient } from '@/lib/supabase/client'

interface Props {
  profile: Profile
  items: ShowcaseItem[]
  theme: Theme
}

export function ShowcaseView({ profile, items, theme }: Props) {
  useEffect(() => {
    const supabase = createClient()
    supabase.from('page_views').insert({
      profile_id: profile.id,
      referrer: document.referrer || null,
    })
  }, [profile.id])

  const info = profile.company_info ?? {}

  return (
    <div className={`min-h-screen ${theme.bg} py-10 px-4`}>
      <div className="max-w-md mx-auto">
        {/* Header: customer info */}
        <div className="flex flex-col items-center text-center mb-8">
          {profile.avatar_url ? (
            <Image src={profile.avatar_url} alt={profile.display_name} width={88} height={88}
              className="w-22 h-22 rounded-full object-cover mb-4 ring-4 ring-white/10"
              style={{ width: 88, height: 88 }} />
          ) : (
            <div
              className={`w-22 h-22 rounded-full mb-4 flex items-center justify-center text-3xl font-bold ${theme.button} ${theme.buttonText}`}
              style={{ width: 88, height: 88 }}
            >
              {profile.display_name[0]?.toUpperCase()}
            </div>
          )}
          <h1 className={`text-2xl font-bold ${theme.text} mb-1`}>{profile.display_name}</h1>
          {profile.bio && (
            <p className={`text-sm leading-relaxed ${theme.subtext} max-w-xs`}>{profile.bio}</p>
          )}

          {info.issuer_name && (
            <div className={`mt-4 text-xs ${theme.subtext}`}>
              Bu kart <strong className={theme.text}>{info.issuer_name}</strong> tarafından düzenlenmiştir
            </div>
          )}
        </div>

        {/* Items */}
        {items.length > 0 ? (
          <div className="space-y-3 mb-10">
            <div className={`text-xs font-semibold uppercase tracking-wider ${theme.subtext} mb-3 px-1`}>
              Satın Alınan Ürünler ({items.length})
            </div>
            {items.map(item => (
              <ShowcaseItemCard key={item.id} item={item} theme={theme} />
            ))}
          </div>
        ) : (
          <div className={`text-center text-sm ${theme.subtext} py-10`}>Henüz ürün eklenmemiş.</div>
        )}

        {/* Issuer info */}
        {(info.issuer_name || info.issuer_about || info.issuer_phone || info.issuer_email) && (
          <div className={`mt-10 p-5 ${theme.card} rounded-2xl`}>
            <div className={`text-xs font-semibold uppercase tracking-wider ${theme.subtext} mb-3`}>
              Düzenleyen Firma
            </div>
            {info.issuer_name && <h3 className={`text-base font-bold ${theme.text} mb-2`}>{info.issuer_name}</h3>}
            {info.issuer_about && <p className={`text-xs leading-relaxed ${theme.subtext} mb-3`}>{info.issuer_about}</p>}

            <div className="flex flex-col gap-1.5 text-xs">
              {info.issuer_phone && (
                <a href={`tel:${info.issuer_phone}`} className={`flex items-center gap-2 ${theme.text} hover:opacity-70`}>
                  <Phone size={11} /> {info.issuer_phone}
                </a>
              )}
              {info.issuer_email && (
                <a href={`mailto:${info.issuer_email}`} className={`flex items-center gap-2 ${theme.text} hover:opacity-70`}>
                  <Mail size={11} /> {info.issuer_email}
                </a>
              )}
              {info.issuer_address && (
                <div className={`flex items-start gap-2 ${theme.text}`}>
                  <MapPin size={11} style={{ marginTop: 3 }} /> <span>{info.issuer_address}</span>
                </div>
              )}
              {info.issuer_website && (
                <a href={info.issuer_website} target="_blank" rel="noopener noreferrer"
                  className={`flex items-center gap-2 ${theme.text} hover:opacity-70`}>
                  <Globe size={11} /> {info.issuer_website.replace(/^https?:\/\//, '')}
                </a>
              )}
              {info.issued_at && (
                <div className={`flex items-center gap-2 ${theme.subtext} mt-1`}>
                  <Calendar size={11} /> Düzenleme: {new Date(info.issued_at).toLocaleDateString('tr-TR')}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-10 text-center">
          <Link href="/" className={`text-xs ${theme.subtext} hover:opacity-100 opacity-50 transition-opacity`}>
            visitly ile oluşturuldu
          </Link>
        </div>
      </div>
    </div>
  )
}

function ShowcaseItemCard({ item, theme }: { item: ShowcaseItem; theme: Theme }) {
  const [open, setOpen] = useState(false)
  const specs = Object.entries(item.specs ?? {})
  const hasDetails = specs.length > 0 || item.description || item.gallery.length > 0 || item.acquired_at

  return (
    <div className={`${theme.card} rounded-2xl overflow-hidden`}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 p-3 text-left"
        style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
      >
        {item.primary_image_url ? (
          <Image src={item.primary_image_url} alt={item.title} width={64} height={64}
            className="rounded-xl object-cover flex-shrink-0"
            style={{ width: 64, height: 64 }} />
        ) : (
          <div className="rounded-xl flex-shrink-0 flex items-center justify-center"
            style={{ width: 64, height: 64, backgroundColor: 'rgba(255,255,255,0.05)' }}>
            <span className={`text-xs ${theme.subtext}`}>Görsel</span>
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p className={`text-sm font-semibold ${theme.text}`} style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</p>
          {item.acquired_at && (
            <p className={`text-xs ${theme.subtext} mt-1`}>
              {new Date(item.acquired_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          )}
        </div>
        {hasDetails && (
          <ChevronDown
            size={18}
            className={theme.subtext}
            style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}
          />
        )}
      </button>

      {open && hasDetails && (
        <div className="px-3 pb-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {item.description && (
            <p className={`text-xs leading-relaxed ${theme.text} mt-3 mb-3`}>{item.description}</p>
          )}

          {specs.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mt-3">
              {specs.map(([key, value]) => (
                <div key={key} className="text-xs">
                  <div className={`${theme.subtext} mb-0.5`} style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>{key}</div>
                  <div className={theme.text} style={{ fontWeight: 500 }}>{value}</div>
                </div>
              ))}
            </div>
          )}

          {item.gallery.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-4">
              {item.gallery.map((url, i) => (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="block aspect-square rounded-lg overflow-hidden">
                  <Image src={url} alt="" width={120} height={120} className="w-full h-full object-cover hover:opacity-80 transition-opacity" />
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
