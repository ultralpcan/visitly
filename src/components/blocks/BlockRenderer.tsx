'use client'

import { Block, Theme } from '@/types'
import { SocialIcon } from './SocialIcon'
import { Copy, Check, ExternalLink, FileText, Download } from 'lucide-react'
import { useState } from 'react'

export function buttonRadius(style: string): { icon: number; card: number } {
  switch (style) {
    case 'pill': return { icon: 9999, card: 24 }
    case 'square': return { icon: 4, card: 6 }
    default: return { icon: 12, card: 16 } // rounded
  }
}

interface BlockRendererProps {
  block: Block
  theme: Theme
  buttonStyle: string
  onLinkClick?: (blockId: string) => void
}

export function BlockRenderer({ block, theme, buttonStyle, onLinkClick }: BlockRendererProps) {
  if (!block.is_visible) return null

  switch (block.type) {
    case 'social_links':
      return <SocialLinksBlock block={block} theme={theme} buttonStyle={buttonStyle} onLinkClick={onLinkClick} />
    case 'iban':
      return <IbanBlock block={block} theme={theme} buttonStyle={buttonStyle} />
    case 'heading':
      return <HeadingBlock block={block} theme={theme} />
    case 'text':
      return <TextBlock block={block} theme={theme} />
    case 'link':
      return <LinkBlock block={block} theme={theme} buttonStyle={buttonStyle} onLinkClick={onLinkClick} />
    case 'cv':
      return <CvBlock block={block} theme={theme} buttonStyle={buttonStyle} onLinkClick={onLinkClick} />
    case 'divider':
      return <DividerBlock theme={theme} />
    default:
      return null
  }
}

function SocialLinksBlock({ block, theme, buttonStyle, onLinkClick }: BlockRendererProps) {
  const links = block.data.links ?? []
  const r = buttonRadius(buttonStyle)
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {links.map((link, i) => (
        <a
          key={i}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onLinkClick?.(block.id)}
          className={`w-12 h-12 flex items-center justify-center ${theme.button} ${theme.buttonText} hover:opacity-80 transition-opacity`}
          style={{ borderRadius: r.icon }}
          title={link.label || link.platform}
        >
          <SocialIcon platform={link.platform} />
        </a>
      ))}
    </div>
  )
}

function IbanBlock({ block, theme, buttonStyle }: { block: Block; theme: Theme; buttonStyle: string }) {
  const [copied, setCopied] = useState(false)
  const info = block.data.iban_info
  const r = buttonRadius(buttonStyle)
  if (!info) return null

  function handleCopy() {
    navigator.clipboard.writeText(info!.iban)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`p-4 ${theme.card}`} style={{ borderRadius: r.card }}>
      <p className={`text-xs font-medium uppercase tracking-wider mb-3 ${theme.subtext}`}>IBAN</p>
      {info.bank_name && (
        <p className={`text-sm font-medium mb-1 ${theme.text}`}>{info.bank_name}</p>
      )}
      <p className={`text-sm mb-1 ${theme.text}`}>{info.account_holder}</p>
      <div className="flex items-center justify-between gap-2">
        <p className={`text-sm font-mono break-all ${theme.subtext}`}>{info.iban}</p>
        <button
          onClick={handleCopy}
          className={`shrink-0 p-2 ${theme.button} ${theme.buttonText} hover:opacity-80 transition-opacity`}
          style={{ borderRadius: r.icon }}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
      {(info.branch_code || info.account_no) && (
        <div className={`flex gap-4 mt-2 text-xs ${theme.subtext}`}>
          {info.branch_code && <span>Şube: {info.branch_code}</span>}
          {info.account_no && <span>Hesap: {info.account_no}</span>}
        </div>
      )}
    </div>
  )
}

function HeadingBlock({ block, theme }: { block: Block; theme: Theme }) {
  const align = block.data.align ?? 'center'
  return (
    <h2
      className={`text-xl font-bold ${theme.text}`}
      style={{ textAlign: align }}
    >
      {block.data.text}
    </h2>
  )
}

function TextBlock({ block, theme }: { block: Block; theme: Theme }) {
  const align = block.data.align ?? 'center'
  return (
    <p
      className={`text-sm leading-relaxed ${theme.subtext}`}
      style={{ textAlign: align }}
    >
      {block.data.text}
    </p>
  )
}

function LinkBlock({ block, theme, buttonStyle, onLinkClick }: BlockRendererProps) {
  const r = buttonRadius(buttonStyle)
  return (
    <a
      href={block.data.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => onLinkClick?.(block.id)}
      className={`flex items-center justify-between p-4 ${theme.card} hover:opacity-80 transition-opacity group`}
      style={{ borderRadius: r.card }}
    >
      <div>
        <p className={`text-sm font-medium ${theme.text}`}>{block.data.title}</p>
        {block.data.description && (
          <p className={`text-xs mt-0.5 ${theme.subtext}`}>{block.data.description}</p>
        )}
      </div>
      <ExternalLink size={16} className={`${theme.subtext} group-hover:opacity-100`} />
    </a>
  )
}

function CvBlock({ block, theme, buttonStyle, onLinkClick }: BlockRendererProps) {
  const r = buttonRadius(buttonStyle)
  const url = block.data.cv_url
  const label = block.data.cv_label || "CV'mi İndir"
  if (!url) return null

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => onLinkClick?.(block.id)}
      className={`flex items-center gap-3 p-4 ${theme.card} hover:opacity-80 transition-opacity group`}
      style={{ borderRadius: r.card }}
    >
      <div
        className={`flex items-center justify-center ${theme.button} ${theme.buttonText}`}
        style={{ width: 44, height: 44, borderRadius: r.icon, flexShrink: 0 }}
      >
        <FileText size={20} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p className={`text-sm font-semibold ${theme.text}`}>{label}</p>
        <p className={`text-xs mt-0.5 ${theme.subtext}`}>PDF · Yeni sekmede açılır</p>
      </div>
      <Download size={16} className={`${theme.subtext} group-hover:opacity-100`} style={{ flexShrink: 0 }} />
    </a>
  )
}

function DividerBlock({ theme }: { theme: Theme }) {
  return <hr className={`border-t ${theme.border}`} />
}
