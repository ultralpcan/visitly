import {
  FaInstagram, FaXTwitter, FaLinkedinIn, FaGithub, FaYoutube,
  FaFacebookF, FaWhatsapp, FaTelegram, FaTiktok,
  FaSpotify, FaTwitch, FaDiscord, FaBehance, FaDribbble, FaMedium
} from 'react-icons/fa6'
import { Globe, Mail, Phone } from 'lucide-react'

const brandIcons: Record<string, React.ReactNode> = {
  instagram: <FaInstagram size={18} />,
  twitter: <FaXTwitter size={18} />,
  linkedin: <FaLinkedinIn size={18} />,
  github: <FaGithub size={18} />,
  youtube: <FaYoutube size={18} />,
  facebook: <FaFacebookF size={18} />,
  whatsapp: <FaWhatsapp size={18} />,
  telegram: <FaTelegram size={18} />,
  tiktok: <FaTiktok size={18} />,
  spotify: <FaSpotify size={18} />,
  twitch: <FaTwitch size={18} />,
  discord: <FaDiscord size={18} />,
  behance: <FaBehance size={18} />,
  dribbble: <FaDribbble size={18} />,
  medium: <FaMedium size={18} />,
  email: <Mail size={18} />,
  phone: <Phone size={18} />,
  website: <Globe size={18} />,
}

export function SocialIcon({ platform }: { platform: string }) {
  return <>{brandIcons[platform] ?? <Globe size={18} />}</>
}
