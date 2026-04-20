'use client'

import { Block, Theme } from '@/types'
import { SocialIcon } from './SocialIcon'
import { Copy, Check, ExternalLink } from 'lucide-react'
import { useState } from 'react'

interface BlockRendererProps {
  block: Block
  theme: Theme
  onLinkClick?: (blockId: string) => void
}

export function BlockRenderer({ block, theme, onLinkClick }: BlockRendererProps) {
  if (!block.is_visible) return null

  switch (block.type) {
    case 'social_links':
      return <SocialLinksBlock block={block} theme={theme} onLinkClick={onLinkClick} />
    case 'iban':
      return <IbanBlock block={block} theme={theme} />
    case 'heading':
      return <HeadingBlock block={block} theme={theme} />
    case 'text':
      return <TextBlock block={block} theme={theme} />
    case 'link':
      return <LinkBlock block={block} theme={theme} onLinkClick={onLinkClick} />
    case 'divider':
      return <DividerBlock theme={theme} />
    default:
      return null
  }
}

function SocialLinksBlock({ block, theme, onLinkClick }: BlockRendererProps) {
  const links = block.data.links ?? []
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {links.map((link, i) => (
        <a
          key={i}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onLinkClick?.(block.id)}
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${theme.button} ${theme.buttonText} hover:opacity-80 transition-opacity`}
          title={link.label || link.platform}
        >
          <SocialIcon platform={link.platform} />
        </a>
      ))}
    </div>
  )
}

function IbanBlock({ block, theme }: { block: Block; theme: Theme }) {
  const [copied, setCopied] = useState(false)
  const info = block.data.iban_info
  if (!info) return null

  function handleCopy() {
    navigator.clipboard.writeText(info!.iban)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`rounded-2xl p-4 ${theme.card}`}>
      <p className={`text-xs font-medium uppercase tracking-wider mb-3 ${theme.subtext}`}>IBAN</p>
      {info.bank_name && (
        <p className={`text-sm font-medium mb-1 ${theme.text}`}>{info.bank_name}</p>
      )}
      <p className={`text-sm mb-1 ${theme.text}`}>{info.account_holder}</p>
      <div className="flex items-center justify-between gap-2">
        <p className={`text-sm font-mono break-all ${theme.subtext}`}>{info.iban}</p>
        <button
          onClick={handleCopy}
          className={`shrink-0 p-2 rounded-lg ${theme.button} ${theme.buttonText} hover:opacity-80 transition-opacity`}
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

function LinkBlock({ block, theme, onLinkClick }: BlockRendererProps) {
  return (
    <a
      href={block.data.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => onLinkClick?.(block.id)}
      className={`flex items-center justify-between p-4 rounded-2xl ${theme.card} hover:opacity-80 transition-opacity group`}
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

function DividerBlock({ theme }: { theme: Theme }) {
  return <hr className={`border-t ${theme.border}`} />
}
