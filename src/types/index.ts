export type BlockType =
  | 'social_links'
  | 'iban'
  | 'heading'
  | 'text'
  | 'link'
  | 'divider'
  | 'contact_form'

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
  }
}

export interface Profile {
  id: string
  username: string
  display_name: string
  bio: string | null
  avatar_url: string | null
  theme: string
  button_style: string
  is_active: boolean
  created_at: string
  updated_at: string
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
    card: 'bg-gray-50 border border-gray-200',
    border: 'border-gray-200',
    button: 'bg-gray-900',
    buttonText: 'text-white',
  },
  {
    id: 'dark',
    name: 'Koyu',
    bg: 'bg-gray-950',
    text: 'text-white',
    subtext: 'text-gray-400',
    card: 'bg-gray-900 border border-gray-800',
    border: 'border-gray-800',
    button: 'bg-white',
    buttonText: 'text-gray-900',
  },
  {
    id: 'purple',
    name: 'Mor',
    bg: 'bg-purple-950',
    text: 'text-white',
    subtext: 'text-purple-300',
    card: 'bg-purple-900/50 border border-purple-800',
    border: 'border-purple-800',
    button: 'bg-purple-500',
    buttonText: 'text-white',
  },
  {
    id: 'blue',
    name: 'Mavi',
    bg: 'bg-blue-950',
    text: 'text-white',
    subtext: 'text-blue-300',
    card: 'bg-blue-900/50 border border-blue-800',
    border: 'border-blue-800',
    button: 'bg-blue-500',
    buttonText: 'text-white',
  },
  {
    id: 'green',
    name: 'Yeşil',
    bg: 'bg-emerald-950',
    text: 'text-white',
    subtext: 'text-emerald-300',
    card: 'bg-emerald-900/50 border border-emerald-800',
    border: 'border-emerald-800',
    button: 'bg-emerald-500',
    buttonText: 'text-white',
  },
  {
    id: 'rose',
    name: 'Pembe',
    bg: 'bg-rose-950',
    text: 'text-white',
    subtext: 'text-rose-300',
    card: 'bg-rose-900/50 border border-rose-800',
    border: 'border-rose-800',
    button: 'bg-rose-500',
    buttonText: 'text-white',
  },
  {
    id: 'gradient-purple',
    name: 'Gradyan Mor',
    bg: 'bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900',
    text: 'text-white',
    subtext: 'text-purple-300',
    card: 'bg-white/10 border border-white/20 backdrop-blur-sm',
    border: 'border-white/20',
    button: 'bg-white',
    buttonText: 'text-purple-900',
  },
  {
    id: 'gradient-sunset',
    name: 'Gradyan Gün Batımı',
    bg: 'bg-gradient-to-br from-orange-900 via-rose-900 to-pink-900',
    text: 'text-white',
    subtext: 'text-orange-300',
    card: 'bg-white/10 border border-white/20 backdrop-blur-sm',
    border: 'border-white/20',
    button: 'bg-white',
    buttonText: 'text-rose-900',
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
