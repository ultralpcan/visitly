'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from './server'

export async function login(formData: FormData) {
  const supabase = await createClient()
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  const { error } = await supabase.auth.signInWithPassword(data)
  if (error) return { error: error.message }
  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function register(formData: FormData) {
  const supabase = await createClient()
  const username = (formData.get('username') as string).toLowerCase().trim()
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const displayName = formData.get('display_name') as string

  // Kullanıcı adı kontrolü
  const { data: existing } = await supabase
    .from('profiles')
    .select('username')
    .eq('username', username)
    .single()

  if (existing) return { error: 'Bu kullanıcı adı zaten alınmış.' }

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { display_name: displayName, username } },
  })

  if (authError) return { error: authError.message }
  if (!authData.user) return { error: 'Kayıt başarısız.' }

  // Profil oluştur
  const { error: profileError } = await supabase.from('profiles').insert({
    id: authData.user.id,
    username,
    display_name: displayName,
    theme: 'default',
    button_style: 'rounded',
    is_active: true,
  })

  if (profileError) return { error: profileError.message }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/giris')
}

export async function updateProfile(data: {
  display_name: string
  bio: string
  theme: string
  button_style: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Oturum bulunamadı.' }

  const { error } = await supabase
    .from('profiles')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', user.id)

  if (error) return { error: error.message }
  revalidatePath('/dashboard')
  return { success: true }
}

export async function uploadAvatar(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Oturum bulunamadı.' }

  const file = formData.get('avatar') as File
  if (!file) return { error: 'Dosya seçilmedi.' }

  const ext = file.name.split('.').pop()
  const path = `${user.id}/avatar.${ext}`

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(path, file, { upsert: true })

  if (uploadError) return { error: uploadError.message }

  const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(path)

  const { error } = await supabase
    .from('profiles')
    .update({ avatar_url: publicUrl, updated_at: new Date().toISOString() })
    .eq('id', user.id)

  if (error) return { error: error.message }
  revalidatePath('/dashboard')
  return { success: true, url: publicUrl }
}

export async function createBlock(data: {
  type: string
  data: Record<string, unknown>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Oturum bulunamadı.' }

  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.id)
    .single()

  if (!profile) return { error: 'Profil bulunamadı.' }

  const { data: blocks } = await supabase
    .from('blocks')
    .select('position')
    .eq('profile_id', user.id)
    .order('position', { ascending: false })
    .limit(1)

  const nextPosition = blocks && blocks.length > 0 ? blocks[0].position + 1 : 0

  const { error } = await supabase.from('blocks').insert({
    profile_id: user.id,
    type: data.type,
    data: data.data,
    position: nextPosition,
    is_visible: true,
  })

  if (error) return { error: error.message }
  revalidatePath('/dashboard/bloklar')
  return { success: true }
}

export async function updateBlock(id: string, data: Record<string, unknown>) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Oturum bulunamadı.' }

  const { error } = await supabase
    .from('blocks')
    .update({ data })
    .eq('id', id)
    .eq('profile_id', user.id)

  if (error) return { error: error.message }
  revalidatePath('/dashboard/bloklar')
  return { success: true }
}

export async function deleteBlock(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Oturum bulunamadı.' }

  const { error } = await supabase
    .from('blocks')
    .delete()
    .eq('id', id)
    .eq('profile_id', user.id)

  if (error) return { error: error.message }
  revalidatePath('/dashboard/bloklar')
  return { success: true }
}

export async function toggleBlockVisibility(id: string, is_visible: boolean) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Oturum bulunamadı.' }

  const { error } = await supabase
    .from('blocks')
    .update({ is_visible })
    .eq('id', id)
    .eq('profile_id', user.id)

  if (error) return { error: error.message }
  revalidatePath('/dashboard/bloklar')
  return { success: true }
}

export async function reorderBlocks(blocks: { id: string; position: number }[]) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Oturum bulunamadı.' }

  const updates = blocks.map(({ id, position }) =>
    supabase.from('blocks').update({ position }).eq('id', id).eq('profile_id', user.id)
  )

  await Promise.all(updates)
  revalidatePath('/dashboard/bloklar')
  return { success: true }
}

export async function trackPageView(profileId: string, referrer: string | null) {
  const supabase = await createClient()
  await supabase.from('page_views').insert({
    profile_id: profileId,
    referrer: referrer || null,
  })
}

export async function trackLinkClick(blockId: string, profileId: string) {
  const supabase = await createClient()
  await supabase.from('link_clicks').insert({
    block_id: blockId,
    profile_id: profileId,
  })
}
