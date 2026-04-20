'use client'

import { useState } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { Block, SOCIAL_PLATFORMS } from '@/types'
import { createClient } from '@/lib/supabase/client'
import {
  Plus, Trash2, Eye, EyeOff, ChevronUp, ChevronDown,
  Link as LinkIcon, Share2, CreditCard, Type, Minus, GripVertical,
} from 'lucide-react'

interface Props { initialBlocks: Block[]; profileId: string }

const BLOCK_TYPES = [
  { type: 'social_links', label: 'Sosyal Medya', icon: Share2, desc: '18 platform — Instagram, LinkedIn...' },
  { type: 'link', label: 'Link Butonu', icon: LinkIcon, desc: 'Tek bir bağlantı' },
  { type: 'iban', label: 'IBAN', icon: CreditCard, desc: 'Banka bilgileri' },
  { type: 'heading', label: 'Başlık', icon: Type, desc: 'Bölüm başlığı' },
  { type: 'text', label: 'Metin', icon: Type, desc: 'Açıklama paragrafı' },
  { type: 'divider', label: 'Çizgi', icon: Minus, desc: 'Bölüm ayırıcı' },
]

function getDefaultData(type: string): Record<string, unknown> {
  switch (type) {
    case 'social_links': return { links: [] }
    case 'iban': return { iban_info: { account_holder: '', iban: '', bank_name: '' } }
    case 'heading': return { text: 'Başlık', align: 'center' }
    case 'text': return { text: 'Açıklama metni...', align: 'center' }
    case 'link': return { title: 'Link Başlığı', url: 'https://', description: '' }
    default: return {}
  }
}

export function BlockManager({ initialBlocks, profileId }: Props) {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks)
  const [showAddMenu, setShowAddMenu] = useState(false)
  const [editingBlock, setEditingBlock] = useState<string | null>(null)
  const supabase = createClient()

  async function addBlock(type: string) {
    setShowAddMenu(false)
    const position = blocks.length
    const { data, error } = await supabase
      .from('blocks')
      .insert({ profile_id: profileId, type, data: getDefaultData(type), position, is_visible: true })
      .select()
      .single()
    if (!error && data) {
      setBlocks(prev => [...prev, data as Block])
      setEditingBlock(data.id)
    }
  }

  async function deleteBlock(id: string) {
    await supabase.from('blocks').delete().eq('id', id)
    setBlocks(prev => prev.filter(b => b.id !== id))
    if (editingBlock === id) setEditingBlock(null)
  }

  async function toggleVisibility(block: Block) {
    await supabase.from('blocks').update({ is_visible: !block.is_visible }).eq('id', block.id)
    setBlocks(prev => prev.map(b => b.id === block.id ? { ...b, is_visible: !b.is_visible } : b))
  }

  async function moveBlock(index: number, direction: 'up' | 'down') {
    const nb = [...blocks]
    const swap = direction === 'up' ? index - 1 : index + 1
    if (swap < 0 || swap >= nb.length) return
    ;[nb[index], nb[swap]] = [nb[swap], nb[index]]
    await Promise.all(nb.map((b, i) => supabase.from('blocks').update({ position: i }).eq('id', b.id)))
    setBlocks(nb)
  }

  async function updateBlockData(id: string, data: Record<string, unknown>) {
    await supabase.from('blocks').update({ data }).eq('id', id)
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, data: data as Block['data'] } : b))
  }

  async function onDragEnd(result: DropResult) {
    if (!result.destination) return
    const src = result.source.index
    const dst = result.destination.index
    if (src === dst) return

    const nb = [...blocks]
    const [moved] = nb.splice(src, 1)
    nb.splice(dst, 0, moved)

    setBlocks(nb)
    await Promise.all(nb.map((b, i) => supabase.from('blocks').update({ position: i }).eq('id', b.id)))
  }

  const blockLabel = (type: string) => BLOCK_TYPES.find(t => t.type === type)?.label ?? type
  const BlockIcon = (type: string) => BLOCK_TYPES.find(t => t.type === type)?.icon ?? Type

  return (
    <div>
      {blocks.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 24px', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📭</div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, margin: '0 0 4px' }}>Henüz blok yok</p>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 13, margin: 0 }}>Aşağıdaki butona tıklayarak başla</p>
        </div>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="blocks">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}
            >
              {blocks.map((block, index) => {
                const Icon = BlockIcon(block.type)
                const isEditing = editingBlock === block.id

                return (
                  <Draggable key={block.id} draggableId={block.id} index={index}>
                    {(drag, snapshot) => (
                      <div
                        ref={drag.innerRef}
                        {...drag.draggableProps}
                        style={{
                          backgroundColor: snapshot.isDragging ? 'rgba(139,92,246,0.12)' : 'rgba(255,255,255,0.03)',
                          border: `1px solid ${snapshot.isDragging ? 'rgba(139,92,246,0.4)' : isEditing ? 'rgba(139,92,246,0.3)' : 'rgba(255,255,255,0.07)'}`,
                          borderRadius: 14,
                          overflow: 'hidden',
                          opacity: block.is_visible ? 1 : 0.5,
                          boxShadow: snapshot.isDragging ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
                          ...drag.draggableProps.style,
                        }}
                      >
                        {/* Header */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 14px' }}>
                          {/* Drag handle */}
                          <div
                            {...drag.dragHandleProps}
                            style={{ display: 'flex', alignItems: 'center', cursor: 'grab', padding: '2px 4px', borderRadius: 6, color: 'rgba(255,255,255,0.2)', flexShrink: 0 }}
                            title="Sürükle"
                          >
                            <GripVertical size={14} />
                          </div>

                          <div style={{ width: 26, height: 26, borderRadius: 7, backgroundColor: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Icon size={12} color="rgba(255,255,255,0.5)" />
                          </div>

                          <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>
                            {blockLabel(block.type)}
                          </span>

                          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <button onClick={() => moveBlock(index, 'up')} disabled={index === 0}
                              style={{ background: 'none', border: 'none', padding: '4px', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', opacity: index === 0 ? 0.25 : 1, display: 'flex' }}>
                              <ChevronUp size={14} />
                            </button>
                            <button onClick={() => moveBlock(index, 'down')} disabled={index === blocks.length - 1}
                              style={{ background: 'none', border: 'none', padding: '4px', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', opacity: index === blocks.length - 1 ? 0.25 : 1, display: 'flex' }}>
                              <ChevronDown size={14} />
                            </button>
                            <button onClick={() => toggleVisibility(block)}
                              style={{ background: 'none', border: 'none', padding: '4px', cursor: 'pointer', color: block.is_visible ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.15)', display: 'flex' }}>
                              {block.is_visible ? <Eye size={14} /> : <EyeOff size={14} />}
                            </button>
                            <button
                              onClick={() => setEditingBlock(isEditing ? null : block.id)}
                              style={{ padding: '4px 10px', borderRadius: 7, backgroundColor: isEditing ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.06)', border: isEditing ? '1px solid rgba(139,92,246,0.3)' : '1px solid transparent', color: isEditing ? '#a78bfa' : 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                              {isEditing ? 'Kapat' : 'Düzenle'}
                              <ChevronDown size={10} style={{ transform: isEditing ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
                            </button>
                            <button onClick={() => deleteBlock(block.id)}
                              style={{ background: 'none', border: 'none', padding: '4px', cursor: 'pointer', color: 'rgba(239,68,68,0.4)', display: 'flex' }}
                              onMouseEnter={e => (e.currentTarget.style.color = '#f87171')}
                              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(239,68,68,0.4)')}>
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Editor */}
                        {isEditing && (
                          <div style={{ padding: '0 14px 14px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ paddingTop: 14 }}>
                              <BlockEditor block={block} onUpdate={data => updateBlockData(block.id, data)} />
                            </div>
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

      {/* Add Block */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setShowAddMenu(!showAddMenu)}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px', borderRadius: 14, border: `1px dashed ${showAddMenu ? 'rgba(139,92,246,0.4)' : 'rgba(255,255,255,0.12)'}`, backgroundColor: showAddMenu ? 'rgba(139,92,246,0.08)' : 'transparent', color: showAddMenu ? '#a78bfa' : 'rgba(255,255,255,0.4)', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
        >
          <Plus size={15} /> Blok Ekle
        </button>

        {showAddMenu && (
          <div style={{ position: 'absolute', bottom: 'calc(100% + 8px)', left: 0, right: 0, backgroundColor: '#161616', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, overflow: 'hidden', boxShadow: '0 16px 40px rgba(0,0,0,0.6)', zIndex: 20 }}>
            {BLOCK_TYPES.map((bt, i) => (
              <button key={bt.type} onClick={() => addBlock(bt.type)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', backgroundColor: 'transparent', border: 'none', borderBottom: i < BLOCK_TYPES.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', cursor: 'pointer', textAlign: 'left' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
                <div style={{ width: 32, height: 32, borderRadius: 9, backgroundColor: 'rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <bt.icon size={14} color="rgba(255,255,255,0.6)" />
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: '0 0 2px' }}>{bt.label}</p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', margin: 0 }}>{bt.desc}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Block Editors ─── */

function BlockEditor({ block, onUpdate }: { block: Block; onUpdate: (data: Record<string, unknown>) => void }) {
  switch (block.type) {
    case 'social_links': return <SocialLinksEditor block={block} onUpdate={onUpdate} />
    case 'iban': return <IbanEditor block={block} onUpdate={onUpdate} />
    case 'heading':
    case 'text': return <TextEditor block={block} onUpdate={onUpdate} />
    case 'link': return <LinkEditor block={block} onUpdate={onUpdate} />
    default: return null
  }
}

const fieldStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 8,
  padding: '9px 12px',
  color: '#fff',
  fontSize: 13,
  outline: 'none',
  boxSizing: 'border-box',
}

/* Platform Select — custom styling to avoid white native dropdown */
function PlatformSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          appearance: 'none',
          WebkitAppearance: 'none',
          MozAppearance: 'none',
          backgroundColor: '#1a1a1a',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 8,
          padding: '9px 32px 9px 10px',
          color: '#e5e5e5',
          fontSize: 12,
          fontWeight: 500,
          outline: 'none',
          cursor: 'pointer',
          minWidth: 110,
        }}
      >
        {SOCIAL_PLATFORMS.map(p => (
          <option key={p.id} value={p.id} style={{ backgroundColor: '#1a1a1a', color: '#e5e5e5' }}>
            {p.label}
          </option>
        ))}
      </select>
      {/* custom arrow */}
      <div style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'rgba(255,255,255,0.4)' }}>
        <ChevronDown size={12} />
      </div>
    </div>
  )
}

function SocialLinksEditor({ block, onUpdate }: { block: Block; onUpdate: (d: Record<string, unknown>) => void }) {
  const [links, setLinks] = useState(block.data.links ?? [])

  function addLink() {
    const updated = [...links, { platform: 'instagram', url: '', label: '' }]
    setLinks(updated); onUpdate({ links: updated })
  }
  function updateLink(i: number, field: string, value: string) {
    const updated = links.map((l, idx) => idx === i ? { ...l, [field]: value } : l)
    setLinks(updated); onUpdate({ links: updated })
  }
  function removeLink(i: number) {
    const updated = links.filter((_, idx) => idx !== i)
    setLinks(updated); onUpdate({ links: updated })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {links.map((link, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <PlatformSelect value={link.platform} onChange={v => updateLink(i, 'platform', v)} />
          <input
            value={link.url}
            onChange={e => updateLink(i, 'url', e.target.value)}
            placeholder={SOCIAL_PLATFORMS.find(p => p.id === link.platform)?.placeholder ?? 'URL'}
            style={{ ...fieldStyle, flex: 1 }}
            onFocus={e => (e.target.style.borderColor = 'rgba(139,92,246,0.5)')}
            onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
          />
          <button onClick={() => removeLink(i)}
            style={{ background: 'none', border: 'none', padding: '4px 6px', cursor: 'pointer', color: 'rgba(239,68,68,0.4)', flexShrink: 0, display: 'flex' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#f87171')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(239,68,68,0.4)')}>
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <button onClick={addLink}
        style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: 'rgba(139,92,246,0.7)', fontSize: 13, cursor: 'pointer', padding: '2px 0', fontWeight: 500 }}>
        <Plus size={14} /> Platform Ekle
      </button>
    </div>
  )
}

function IbanEditor({ block, onUpdate }: { block: Block; onUpdate: (d: Record<string, unknown>) => void }) {
  const info = block.data.iban_info ?? { account_holder: '', iban: '', bank_name: '' }
  const update = (field: string, value: string) => onUpdate({ iban_info: { ...info, [field]: value } })
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {[
        { field: 'account_holder', label: 'Ad Soyad', placeholder: 'Ahmet Yılmaz' },
        { field: 'bank_name', label: 'Banka Adı', placeholder: 'Ziraat Bankası' },
        { field: 'iban', label: 'IBAN', placeholder: 'TR00 0000 0000 0000 0000 0000 00' },
        { field: 'branch_code', label: 'Şube Kodu (isteğe bağlı)', placeholder: '0001' },
        { field: 'account_no', label: 'Hesap No (isteğe bağlı)', placeholder: '123456' },
      ].map(f => (
        <div key={f.field}>
          <label style={{ display: 'block', fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 5 }}>{f.label}</label>
          <input
            defaultValue={((info as unknown) as Record<string, string>)[f.field] ?? ''}
            onBlur={e => update(f.field, e.target.value)}
            placeholder={f.placeholder}
            style={fieldStyle}
            onFocus={e => (e.target.style.borderColor = 'rgba(139,92,246,0.5)')}
          />
        </div>
      ))}
    </div>
  )
}

function TextEditor({ block, onUpdate }: { block: Block; onUpdate: (d: Record<string, unknown>) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div>
        <label style={{ display: 'block', fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 5 }}>Metin</label>
        <textarea
          defaultValue={block.data.text ?? ''}
          onBlur={e => onUpdate({ ...block.data, text: e.target.value })}
          rows={3}
          style={{ ...fieldStyle, resize: 'none', lineHeight: 1.5 }}
          onFocus={e => (e.target.style.borderColor = 'rgba(139,92,246,0.5)')}
        />
      </div>
      <div>
        <label style={{ display: 'block', fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 5 }}>Hizalama</label>
        <div style={{ display: 'flex', gap: 6 }}>
          {(['left', 'center', 'right'] as const).map(align => (
            <button key={align} onClick={() => onUpdate({ ...block.data, align })}
              style={{ flex: 1, padding: '7px', borderRadius: 7, border: '1px solid', borderColor: block.data.align === align ? 'rgba(139,92,246,0.5)' : 'rgba(255,255,255,0.1)', backgroundColor: block.data.align === align ? 'rgba(139,92,246,0.15)' : 'transparent', color: block.data.align === align ? '#a78bfa' : 'rgba(255,255,255,0.4)', fontSize: 12, cursor: 'pointer' }}>
              {align === 'left' ? 'Sol' : align === 'center' ? 'Orta' : 'Sağ'}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function LinkEditor({ block, onUpdate }: { block: Block; onUpdate: (d: Record<string, unknown>) => void }) {
  const [data, setData] = useState(block.data)
  const update = (field: string, value: string) => { const u = { ...data, [field]: value }; setData(u); onUpdate(u) }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {[
        { field: 'title', label: 'Başlık', placeholder: 'Portfolyom' },
        { field: 'url', label: 'URL', placeholder: 'https://ornek.com' },
        { field: 'description', label: 'Açıklama (isteğe bağlı)', placeholder: 'Kısa açıklama' },
      ].map(f => (
        <div key={f.field}>
          <label style={{ display: 'block', fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 5 }}>{f.label}</label>
          <input
            defaultValue={((data as unknown) as Record<string, string>)[f.field] ?? ''}
            onBlur={e => update(f.field, e.target.value)}
            placeholder={f.placeholder}
            style={fieldStyle}
            onFocus={e => (e.target.style.borderColor = 'rgba(139,92,246,0.5)')}
          />
        </div>
      ))}
    </div>
  )
}
