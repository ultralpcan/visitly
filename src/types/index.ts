export type BlockType =
  | 'social_links'
  | 'iban'
  | 'heading'
  | 'text'
  | 'link'
  | 'divider'
  | 'contact_form'
  | 'cv'

export interface SocialLink {
  platform: string
  url: string
  label?: string
}

export interface IbanData {
  account_holder: string
  iban: string
  bank_name?: string
  branch_code?: string
  account_no?: string
}

export interface Block {
  id: string
  profile_id: string
  type: BlockType
  position: number
  is_visible: boolean
  created_at: string
  data: {
    // social_links
    links?: SocialLink[]
    // iban
    iban_info?: IbanData
    // heading / text
    text?: string
    align?: 'left' | 'center' | 'right'
    // link
    title?: string
    url?: string
    description?: string
    icon?: string
    // contact_form
    email_to?: string
    button_label?: string
    // cv
    cv_url?: string
    cv_label?: string
  }
}

export interface Profile {
  id: string
  owner_id: string
  username: string
  display_name: string
  bio: string | null
  avatar_url: string | null
  theme: string
  button_style: string
  is_active: boolean
  is_default: boolean
  created_at: string
  updated_at: string
}

export interface ProfileSummary {
  id: string
  username: string
  display_name: string
  avatar_url: string | null
  is_default: boolean
}

export type Theme = {
  id: string
  name: string
  bg: string
  text: string
  subtext: string
  card: string
  border: string
  button: string
  buttonText: string
}

export const THEMES: Theme[] = [
  {
    id: 'default',
    name: 'Beyaz',
    bg: 'bg-white',
    text: 'text-gray-900',
    subtext: 'text-gray-500',
    card: 'bg-black/5 border border-black/10 backdrop-blur-sm',
    border: 'border-black/10',
    button: 'bg-black/10 backdrop-blur-sm border border-black/5',
    buttonText: 'text-gray-900',
  },
  {
    id: 'dark',
    name: 'Koyu',
    bg: 'bg-gray-950',
    text: 'text-white',
    subtext: 'text-gray-400',
    card: 'bg-white/5 border border-white/10 backdrop-blur-sm',
    border: 'border-white/10',
    button: 'bg-white/10 backdrop-blur-sm border border-white/10',
    buttonText: 'text-white',
  },
  {
    id: 'purple',
    name: 'Mor',
    bg: 'bg-purple-950',
    text: 'text-white',
    subtext: 'text-purple-300',
    card: 'bg-white/5 border border-purple-400/20 backdrop-blur-sm',
    border: 'border-purple-400/20',
    button: 'bg-purple-400/15 backdrop-blur-sm border border-purple-300/20',
    buttonText: 'text-white',
  },
  {
    id: 'blue',
    name: 'Mavi',
    bg: 'bg-blue-950',
    text: 'text-white',
    subtext: 'text-blue-300',
    card: 'bg-white/5 border border-blue-400/20 backdrop-blur-sm',
    border: 'border-blue-400/20',
    button: 'bg-blue-400/15 backdrop-blur-sm border border-blue-300/20',
    buttonText: 'text-white',
  },
  {
    id: 'green',
    name: 'Yeşil',
    bg: 'bg-emerald-950',
    text: 'text-white',
    subtext: 'text-emerald-300',
    card: 'bg-white/5 border border-emerald-400/20 backdrop-blur-sm',
    border: 'border-emerald-400/20',
    button: 'bg-emerald-400/15 backdrop-blur-sm border border-emerald-300/20',
    buttonText: 'text-white',
  },
  {
    id: 'rose',
    name: 'Pembe',
    bg: 'bg-rose-950',
    text: 'text-white',
    subtext: 'text-rose-300',
    card: 'bg-white/5 border border-rose-400/20 backdrop-blur-sm',
    border: 'border-rose-400/20',
    button: 'bg-rose-400/15 backdrop-blur-sm border border-rose-300/20',
    buttonText: 'text-white',
  },
  {
    id: 'gradient-purple',
    name: 'Gradyan Mor',
    bg: 'bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900',
    text: 'text-white',
    subtext: 'text-purple-200',
    card: 'bg-white/10 border border-white/20 backdrop-blur-md',
    border: 'border-white/20',
    button: 'bg-white/15 backdrop-blur-md border border-white/20',
    buttonText: 'text-white',
  },
  {
    id: 'gradient-sunset',
    name: 'Gradyan Gün Batımı',
    bg: 'bg-gradient-to-br from-orange-900 via-rose-900 to-pink-900',
    text: 'text-white',
    subtext: 'text-orange-200',
    card: 'bg-white/10 border border-white/20 backdrop-blur-md',
    border: 'border-white/20',
    button: 'bg-white/15 backdrop-blur-md border border-white/20',
    buttonText: 'text-white',
  },
]

export const SOCIAL_PLATFORMS = [
  { id: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/kullanici' },
  { id: 'twitter', label: 'X (Twitter)', placeholder: 'https://x.com/kullanici' },
  { id: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/kullanici' },
  { id: 'github', label: 'GitHub', placeholder: 'https://github.com/kullanici' },
  { id: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/@kanal' },
  { id: 'tiktok', label: 'TikTok', placeholder: 'https://tiktok.com/@kullanici' },
  { id: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/kullanici' },
  { id: 'whatsapp', label: 'WhatsApp', placeholder: 'https://wa.me/905XXXXXXXXX' },
  { id: 'telegram', label: 'Telegram', placeholder: 'https://t.me/kullanici' },
  { id: 'website', label: 'Web Sitesi', placeholder: 'https://siten.com' },
  { id: 'email', label: 'E-posta', placeholder: 'mailto:email@adres.com' },
  { id: 'phone', label: 'Telefon', placeholder: 'tel:+905XXXXXXXXX' },
  { id: 'spotify', label: 'Spotify', placeholder: 'https://open.spotify.com/user/kullanici' },
  { id: 'twitch', label: 'Twitch', placeholder: 'https://twitch.tv/kullanici' },
  { id: 'discord', label: 'Discord', placeholder: 'https://discord.gg/davet' },
  { id: 'behance', label: 'Behance', placeholder: 'https://behance.net/kullanici' },
  { id: 'dribbble', label: 'Dribbble', placeholder: 'https://dribbble.com/kullanici' },
  { id: 'medium', label: 'Medium', placeholder: 'https://medium.com/@kullanici' },
]
