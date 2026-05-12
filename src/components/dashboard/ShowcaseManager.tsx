'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { createClient } from '@/lib/supabase/client'
import type { ShowcaseItem } from '@/types'
import {
  Plus, Trash2, Eye, EyeOff, ChevronDown, GripVertical,
  ImagePlus, Loader2, X,
} from 'lucide-react'

interface Props { initialItems: ShowcaseItem[]; profileId: string }

const COMMON_SPEC_PRESETS = ['Karat', 'Ağırlık', 'Taş', 'Sertifika No', 'Renk', 'Berraklık', 'Kesim', 'Model Kodu']

export function ShowcaseManager({ initialItems, profileId }: Props) {
  const [items, setItems] = useState<ShowcaseItem[]>(initialItems)
  const [editingId, setEditingId] = useState<string | null>(null)
  const supabase = createClient()

  async function addItem() {
    const position = items.length
    const { data, error } = await supabase
      .from('showcase_items')
      .insert({
        profile_id: profileId,
        position,
        title: 'Yeni Ürün',
        is_visible: true,
        gallery: [],
        specs: {},
      })
      .select()
      .single()
    if (!error && data) {
      const item = data as ShowcaseItem
      setItems(prev => [...prev, item])
      setEditingId(item.id)
    }
  }

  async function deleteItem(id: string) {
    if (!confirm('Bu ürünü silmek istediğine emin misin?')) return
    await supabase.from('showcase_items').delete().eq('id', id)
    setItems(prev => prev.filter(i => i.id !== id))
    if (editingId === id) setEditingId(null)
  }

  async function toggleVisibility(item: ShowcaseItem) {
    await supabase.from('showcase_items').update({ is_visible: !item.is_visible }).eq('id', item.id)
    setItems(prev => prev.map(i => i.id === item.id ? { ...i, is_visible: !i.is_visible } : i))
  }

  async function updateItem(id: string, patch: Partial<ShowcaseItem>) {
    await supabase.from('showcase_items').update(patch).eq('id', id)
    setItems(prev => prev.map(i => i.id === id ? { ...i, ...patch } : i))
  }

  async function onDragEnd(result: DropResult) {
    if (!result.destination) return
    const reordered = [...items]
    const [moved] = reordered.splice(result.source.index, 1)
    reordered.splice(result.destination.index, 0, moved)
    setItems(reordered)
    await Promise.all(reordered.map((i, idx) =>
      supabase.from('showcase_items').update({ position: idx }).eq('id', i.id)
    ))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="items">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {items.map((item, idx) => {
                const isEditing = editingId === item.id
                return (
                  <Draggable key={item.id} draggableId={item.id} index={idx}>
                    {(prov, snap) => (
                      <div ref={prov.innerRef} {...prov.draggableProps}
                        style={{
                          ...prov.draggableProps.style,
                          backgroundColor: snap.isDragging ? 'rgba(139,92,246,0.05)' : 'rgba(255,255,255,0.03)',
                          border: `1px solid ${snap.isDragging ? 'rgba(139,92,246,0.3)' : 'rgba(255,255,255,0.08)'}`,
                          borderRadius: 14,
                          overflow: 'hidden',
                        }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px' }}>
                          <div {...prov.dragHandleProps} style={{ cursor: 'grab', display: 'flex', color: 'rgba(255,255,255,0.3)' }}>
                            <GripVertical size={16} />
                          </div>
                          {item.primary_image_url ? (
                            <Image src={item.primary_image_url} alt={item.title} width={44} height={44}
                              style={{ width: 44, height: 44, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
                          ) : (
                            <div style={{ width: 44, height: 44, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', flexShrink: 0 }}>
                              <ImagePlus size={16} />
                            </div>
                          )}
                          <button onClick={() => setEditingId(isEditing ? null : item.id)}
                            style={{ flex: 1, textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0, minWidth: 0 }}>
                            <p style={{ fontSize: 14, fontWeight: 600, color: '#fff', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</p>
                            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: '2px 0 0' }}>
                              {Object.keys(item.specs ?? {}).length > 0 ? `${Object.keys(item.specs).length} özellik` : 'Henüz özellik yok'}
                              {item.acquired_at && ` · ${new Date(item.acquired_at).toLocaleDateString('tr-TR')}`}
                            </p>
                          </button>
                          <button onClick={() => toggleVisibility(item)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: item.is_visible ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.25)', display: 'flex', padding: 4 }}>
                            {item.is_visible ? <Eye size={15} /> : <EyeOff size={15} />}
                          </button>
                          <button onClick={() => deleteItem(item.id)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(239,68,68,0.5)', display: 'flex', padding: 4 }}>
                            <Trash2 size={15} />
                          </button>
                          <button onClick={() => setEditingId(isEditing ? null : item.id)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', display: 'flex', padding: 4, transform: isEditing ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
                            <ChevronDown size={16} />
                          </button>
                        </div>
                        {isEditing && (
                          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                            <ItemEditor item={item} onChange={patch => updateItem(item.id, patch)} />
                          </div>
                        )}
                      </div>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <button onClick={addItem}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px', borderRadius: 14, border: '1px dashed rgba(255,255,255,0.12)', backgroundColor: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
        <Plus size={15} /> Ürün Ekle
      </button>
    </div>
  )
}

/* ─── Item Editor ─── */

function ItemEditor({ item, onChange }: { item: ShowcaseItem; onChange: (patch: Partial<ShowcaseItem>) => void }) {
  const [title, setTitle] = useState(item.title)
  const [description, setDescription] = useState(item.description ?? '')
  const [acquiredAt, setAcquiredAt] = useState(item.acquired_at ?? '')
  const [primaryImage, setPrimaryImage] = useState(item.primary_image_url)
  const [gallery, setGallery] = useState<string[]>(item.gallery ?? [])
  const [specs, setSpecs] = useState<Record<string, string>>(item.specs ?? {})
  const [uploading, setUploading] = useState(false)
  const primaryRef = useRef<HTMLInputElement>(null)
  const galleryRef = useRef<HTMLInputElement>(null)

  async function uploadImage(file: File): Promise<string | null> {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null
    const ext = file.name.split('.').pop()
    const path = `${user.id}/${item.profile_id}/${item.id}/${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('showcase').upload(path, file, { upsert: false })
    if (error) { alert('Yükleme hatası: ' + error.message); return null }
    const { data: { publicUrl } } = supabase.storage.from('showcase').getPublicUrl(path)
    return publicUrl
  }

  async function handlePrimaryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return
    setUploading(true)
    const url = await uploadImage(file)
    setUploading(false)
    if (url) { setPrimaryImage(url); onChange({ primary_image_url: url }) }
  }

  async function handleGalleryAdd(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files; if (!files || files.length === 0) return
    setUploading(true)
    const urls: string[] = []
    for (const file of Array.from(files)) {
      const url = await uploadImage(file)
      if (url) urls.push(url)
    }
    setUploading(false)
    const newGallery = [...gallery, ...urls]
    setGallery(newGallery)
    onChange({ gallery: newGallery })
  }

  function removeGalleryItem(idx: number) {
    const newGallery = gallery.filter((_, i) => i !== idx)
    setGallery(newGallery)
    onChange({ gallery: newGallery })
  }

  function updateSpec(key: string, value: string) {
    const newSpecs = { ...specs, [key]: value }
    setSpecs(newSpecs); onChange({ specs: newSpecs })
  }
  function removeSpec(key: string) {
    const newSpecs = { ...specs }
    delete newSpecs[key]
    setSpecs(newSpecs); onChange({ specs: newSpecs })
  }
  function addSpec(key: string) {
    if (!key.trim() || key in specs) return
    updateSpec(key, '')
  }

  const fieldStyle = {
    width: '100%', backgroundColor: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8,
    padding: '9px 12px', color: '#fff', fontSize: 13, outline: 'none',
    boxSizing: 'border-box' as const,
  }
  const labelStyle: React.CSSProperties = { display: 'block', fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 5, fontWeight: 500 }

  return (
    <div style={{ padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Primary image */}
      <div>
        <label style={labelStyle}>Ana Görsel</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {primaryImage ? (
            <Image src={primaryImage} alt={title} width={80} height={80}
              style={{ width: 80, height: 80, borderRadius: 12, objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }} />
          ) : (
            <div style={{ width: 80, height: 80, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.05)', border: '1px dashed rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)' }}>
              <ImagePlus size={20} />
            </div>
          )}
          <button onClick={() => primaryRef.current?.click()} disabled={uploading}
            style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 12px', color: '#fff', fontSize: 12, cursor: 'pointer' }}>
            {uploading ? <Loader2 size={12} style={{ animation: 'spin 1s linear infinite' }} /> : <ImagePlus size={12} />}
            {primaryImage ? 'Değiştir' : 'Görsel Yükle'}
          </button>
          <input ref={primaryRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePrimaryChange} />
        </div>
      </div>

      {/* Title */}
      <div>
        <label style={labelStyle}>Ürün Adı</label>
        <input value={title} onChange={e => setTitle(e.target.value)} onBlur={() => onChange({ title })}
          placeholder="örn. Pırlanta Tek Taş Yüzük" style={fieldStyle}
          onFocus={e => (e.target.style.borderColor = 'rgba(139,92,246,0.5)')} />
      </div>

      {/* Description */}
      <div>
        <label style={labelStyle}>Açıklama (isteğe bağlı)</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} onBlur={() => onChange({ description })}
          rows={2} placeholder="Ürün hakkında kısa açıklama..."
          style={{ ...fieldStyle, resize: 'none', lineHeight: 1.5 }}
          onFocus={e => (e.target.style.borderColor = 'rgba(139,92,246,0.5)')} />
      </div>

      {/* Acquired date */}
      <div>
        <label style={labelStyle}>Satın Alma Tarihi</label>
        <input type="date" value={acquiredAt} onChange={e => { setAcquiredAt(e.target.value); onChange({ acquired_at: e.target.value || null }) }}
          style={{ ...fieldStyle, colorScheme: 'dark' }} />
      </div>

      {/* Specs */}
      <div>
        <label style={labelStyle}>Özellikler</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {Object.entries(specs).map(([key, value]) => (
            <div key={key} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <div style={{ flex: '0 0 130px', fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: 500, padding: '8px 12px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 6, border: '1px solid rgba(255,255,255,0.05)' }}>{key}</div>
              <input
                defaultValue={value}
                onBlur={e => updateSpec(key, e.target.value)}
                placeholder="değer"
                style={{ ...fieldStyle, flex: 1 }}
                onFocus={e => (e.target.style.borderColor = 'rgba(139,92,246,0.5)')}
              />
              <button onClick={() => removeSpec(key)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(239,68,68,0.5)', padding: 4, display: 'flex' }}>
                <X size={13} />
              </button>
            </div>
          ))}
        </div>
        <AddSpecRow existing={specs} onAdd={addSpec} />
      </div>

      {/* Gallery */}
      <div>
        <label style={labelStyle}>Galeri (ek görseller)</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))', gap: 6 }}>
          {gallery.map((url, i) => (
            <div key={i} style={{ position: 'relative', aspectRatio: '1', borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Image src={url} alt="" fill style={{ objectFit: 'cover' }} sizes="80px" />
              <button onClick={() => removeGalleryItem(i)}
                style={{ position: 'absolute', top: 3, right: 3, width: 20, height: 20, borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.7)', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={11} />
              </button>
            </div>
          ))}
          <button onClick={() => galleryRef.current?.click()} disabled={uploading}
            style={{ aspectRatio: '1', borderRadius: 8, border: '1px dashed rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.02)', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {uploading ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Plus size={16} />}
          </button>
          <input ref={galleryRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleGalleryAdd} />
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

function AddSpecRow({ existing, onAdd }: { existing: Record<string, string>; onAdd: (key: string) => void }) {
  const [keyInput, setKeyInput] = useState('')
  const unusedPresets = COMMON_SPEC_PRESETS.filter(p => !(p in existing))

  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
        <input value={keyInput} onChange={e => setKeyInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); onAdd(keyInput); setKeyInput('') } }}
          placeholder="Özellik adı (örn. Karat)"
          style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, padding: '7px 10px', color: '#fff', fontSize: 12, outline: 'none' }} />
        <button onClick={() => { onAdd(keyInput); setKeyInput('') }} disabled={!keyInput.trim()}
          style={{ backgroundColor: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', color: '#a78bfa', borderRadius: 6, padding: '7px 12px', fontSize: 12, fontWeight: 600, cursor: keyInput.trim() ? 'pointer' : 'not-allowed', opacity: keyInput.trim() ? 1 : 0.4 }}>
          Ekle
        </button>
      </div>
      {unusedPresets.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {unusedPresets.map(p => (
            <button key={p} onClick={() => onAdd(p)}
              style={{ fontSize: 11, padding: '4px 9px', borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>
              + {p}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
