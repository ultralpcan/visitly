import { NewProfileForm } from '@/components/dashboard/NewProfileForm'

export default function YeniProfilPage() {
  return (
    <div style={{ maxWidth: 520 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#fff', margin: '0 0 6px', letterSpacing: '-0.5px' }}>Yeni Profil</h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: 0 }}>Bu hesap altında ek bir profil oluştur. Her profilin ayrı kullanıcı adı, blokları ve analitikleri olur.</p>
      </div>
      <NewProfileForm />
    </div>
  )
}
