// Visitly kullanıcı adı doğrulama + yasaklı kelime filtresi
// Sunucu ve istemci tarafında kullanılabilir.

export const RESERVED_USERNAMES = [
  'dashboard', 'giris', 'kayit', 'admin', 'api', 'profil', 'ayarlar',
  'proxy', 'auth', 'signup', 'signin', 'login', 'logout', 'register',
  'settings', 'help', 'support', 'about', 'blog', 'docs', 'pricing',
  'privacy', 'terms', 'legal', 'contact', 'visitly', 'www', 'mail',
  'email', 'root', 'system', 'public', 'static', 'assets', 'cdn',
  'kullanim-kosullari', 'gizlilik', 'sss', 'faq', 'ornek', 'test',
  'demo', 'null', 'undefined', 'ben', 'biz', 'siz',
]

// Türkçe küfür ve yasaklı kelime listesi.
// Leetspeak ve harf değişimleri (ş→s, ç→c, i→1, a→4, vb.) için normalize edilir.
const BANNED_WORDS = [
  // Argo / küfür
  'amk', 'amq', 'amck', 'amcik', 'amkk', 'aq', 'mk', 'sik', 'sok',
  'pic', 'piç', 'orospu', 'orusbu', 'kahpe', 'kahbe', 'kevase',
  'gavat', 'gavad', 'pezevenk', 'pezo', 'yarrak', 'yarak', 'yarrrak',
  'tasak', 'taşak', 'dalyarak', 'dalyarrak', 'dalyaraq', 'dallama',
  'ibne', 'ipne', 'ipni', 'gay', 'top', 'puşt', 'pust', 'pusht',
  'gotveren', 'gotlek', 'gotverek', 'gotmk', 'gotveren',
  'sikik', 'siktir', 'siktirgit', 'sikis', 'sikisme', 'sikime',
  'mal', 'salak', 'aptal', 'gerizekali', 'gerzek', 'kafasiz',
  'sürtük', 'surtuk', 'sürtük',
  // Irkçı/ayrımcı terimler (yaygın)
  'zenci', 'kiro', 'cingene',
  // Cinsel içerik
  'porno', 'sex', 'seks', 'xxx', 'nsfw', 'adult', 'erotic',
  'escort', 'fuhus', 'fuhuş', 'gizli-kamera',
  // Sahtekarlık / dolandırıcılık
  'dolandirici', 'fake', 'hack', 'scam', 'phishing',
  // Hakaret genel
  'dangalak', 'bok', 'boktan', 'kaltak', 'fahise', 'fahişe',
]

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/ş/g, 's')
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ö/g, 'o')
    .replace(/ı/g, 'i')
    .replace(/0/g, 'o')
    .replace(/1/g, 'i')
    .replace(/3/g, 'e')
    .replace(/4/g, 'a')
    .replace(/5/g, 's')
    .replace(/7/g, 't')
    .replace(/[_\-\.]/g, '')
}

export function containsBannedWord(username: string): string | null {
  const norm = normalize(username)
  for (const word of BANNED_WORDS) {
    if (norm.includes(normalize(word))) return word
  }
  return null
}

export type UsernameError =
  | { kind: 'empty' }
  | { kind: 'too-short'; min: number }
  | { kind: 'too-long'; max: number }
  | { kind: 'invalid-chars' }
  | { kind: 'reserved' }
  | { kind: 'banned'; word: string }

export function validateUsername(raw: string): { valid: true; username: string } | { valid: false; error: UsernameError } {
  const username = raw.toLowerCase().trim()

  if (!username) return { valid: false, error: { kind: 'empty' } }
  if (username.length < 4) return { valid: false, error: { kind: 'too-short', min: 4 } }
  if (username.length > 30) return { valid: false, error: { kind: 'too-long', max: 30 } }
  if (!/^[a-z0-9_-]+$/.test(username)) return { valid: false, error: { kind: 'invalid-chars' } }
  if (RESERVED_USERNAMES.includes(username)) return { valid: false, error: { kind: 'reserved' } }

  const banned = containsBannedWord(username)
  if (banned) return { valid: false, error: { kind: 'banned', word: banned } }

  return { valid: true, username }
}

export function usernameErrorMessage(error: UsernameError): string {
  switch (error.kind) {
    case 'empty': return 'Kullanıcı adı zorunludur.'
    case 'too-short': return `Kullanıcı adı en az ${error.min} karakter olmalı.`
    case 'too-long': return `Kullanıcı adı en fazla ${error.max} karakter olabilir.`
    case 'invalid-chars': return 'Sadece küçük harf, rakam, alt çizgi ve tire kullanabilirsin.'
    case 'reserved': return 'Bu kullanıcı adı sistem tarafından ayrılmıştır.'
    case 'banned': return 'Bu kullanıcı adı uygunsuz içerik barındırıyor.'
  }
}
