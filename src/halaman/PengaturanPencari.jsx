import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../utils/axios'
import './pengaturan-pencari.css'

/* ── Ikon ── */
const IkonDashboard = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
  </svg>
)
const IkonBriefcase = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
)
const IkonSettings = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
)
const IkonLock = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)
const IkonLogout = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

const UserAvatarImage = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M85 100v-5c0-11.046-8.954-20-20-20H35c-11.046 0-20 8.954-20 20v5h70z" fill="#1e293b" />
    <circle cx="50" cy="40" r="25" fill="#fcd34d" />
    <circle cx="38" cy="38" r="3" fill="#1e293b" />
    <circle cx="62" cy="38" r="3" fill="#1e293b" />
    <path d="M38 50c4 4 12 4 16 0" stroke="#1e293b" strokeWidth="3" fill="none" />
  </svg>
)

export default function PengaturanPencari() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  // State profil
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [bio, setBio] = useState('')
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [cvUrl, setCvUrl] = useState(null)
  const cvInputRef = useRef(null)

  // State password
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [changingPassword, setChangingPassword] = useState(false)
  const [passwordError, setPasswordError] = useState('')

  // State alert umum & toast
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [toast, setToast] = useState({ show: false, type: '', message: '' })

  // State modal
  const [modal, setModal] = useState({ show: false, title: '', message: '', type: 'alert', onConfirm: null });
  const showModal = (title, message, type = 'alert', onConfirm = null) => setModal({ show: true, title, message, type, onConfirm });
  const closeModal = () => setModal({ show: false, title: '', message: '', type: 'alert', onConfirm: null });

  // Ambil data profil
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          navigate('/login')
          return
        }

        const response = await axios.get('/profile')
        const user = response.data

        // Proteksi role
        if (user.role !== 'job_seeker') {
          navigate('/pengaturan') // atau dashboard hrd
          return
        }

        setName(user.name || '')
        setEmail(user.email || '')
        setPhone(user.phone || '')
        setLocation(user.location || '')
        setBio(user.bio || '')
        setAvatarUrl(user.avatar_url || null)
        setCvUrl(user.cv_url || null)

        if (user.avatar_url) {
          localStorage.setItem('user_avatar', user.avatar_url)
        }
      } catch (err) {
        setError('Gagal memuat data profil.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [navigate])

  // Helper toast
  const showToast = (type, message) => {
    setToast({ show: true, type, message })
    setTimeout(() => setToast({ show: false, type: '', message: '' }), 4000)
  }

  // Upload avatar
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      showModal('Ukuran Terlalu Besar', 'Ukuran foto maksimal 2MB! Silakan pilih foto dengan ukuran yang lebih kecil.', 'alert');
      e.target.value = '';
      return;
    }

    const formData = new FormData()
    formData.append('avatar', file)

    try {
      const res = await axios.post('/profile/avatar', formData)
      const newAvatarUrl = res.data.avatar_url
      setAvatarUrl(newAvatarUrl)
      localStorage.setItem('user_avatar', newAvatarUrl)
      window.dispatchEvent(new Event('avatarUpdated'))
      showToast('success', 'Foto profil berhasil diunggah.')
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal mengunggah foto.'
      showToast('error', msg)
    }
  }

  const handleDeleteAvatar = () => {
    showModal('Konfirmasi Hapus', 'Apakah Anda yakin ingin menghapus foto profil ini?', 'confirm', async () => {
      try {
        await axios.delete('/profile/avatar');
        setAvatarUrl(null);
        localStorage.removeItem('user_avatar');
        window.dispatchEvent(new Event('avatarUpdated'));
        showToast('success', 'Foto profil berhasil dihapus.');
        closeModal();
      } catch (err) {
        showToast('error', 'Gagal menghapus foto profil.');
      }
    });
  };

  // Upload CV
  const handleCvChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      showModal('Ukuran Terlalu Besar', 'Ukuran CV maksimal 5MB!', 'alert');
      e.target.value = '';
      return;
    }

    const formData = new FormData()
    formData.append('cv', file)

    try {
      const res = await axios.post('/profile/cv', formData)
      const newCvUrl = res.data.cv_url
      setCvUrl(newCvUrl)
      showToast('success', 'CV berhasil diunggah.')
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal mengunggah CV.'
      showToast('error', msg)
    }
  }

  const handleDeleteCv = () => {
    showModal('Konfirmasi Hapus', 'Apakah Anda yakin ingin menghapus CV ini?', 'confirm', async () => {
      try {
        await axios.delete('/profile/cv');
        setCvUrl(null);
        showToast('success', 'CV berhasil dihapus.');
        closeModal();
      } catch (err) {
        showToast('error', 'Gagal menghapus CV.');
        closeModal();
      }
    });
  };

  // Simpan perubahan profil
  const handleSave = async () => {
    setSaving(true)
    setError('')
    setSuccessMsg('')
    try {
      await axios.put('/profile', {
        name,
        email,
        phone,
        location,
        bio,
      })

      // Update localStorage
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
      storedUser.name = name
      storedUser.phone = phone;
      storedUser.location = location;
      storedUser.bio = bio;
      // Bisa tambahkan field lain jika perlu
      localStorage.setItem('user', JSON.stringify(storedUser))

      showToast('success', 'Profil berhasil diperbarui.')
    } catch (err) {
      const msg = err.response?.data?.message || 'Terjadi kesalahan.'
      showToast('error', msg)
    } finally {
      setSaving(false)
    }
  }

  // Ubah password
  const handleChangePassword = async () => {
    setPasswordError('')
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('Semua field kata sandi harus diisi.')
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Kata sandi baru tidak cocok.')
      return
    }
    if (newPassword.length < 8) {
      setPasswordError('Kata sandi baru minimal 8 karakter.')
      return
    }

    setChangingPassword(true)
    try {
      await axios.post('/change-password', {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword
      })
      // Reset
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      showToast('success', 'Kata sandi berhasil diubah.')
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setPasswordError('Fitur ubah kata sandi belum tersedia.')
      } else {
        const msg = err.response?.data?.message || 'Gagal mengubah kata sandi.'
        setPasswordError(msg)
      }
    } finally {
      setChangingPassword(false)
    }
  }

  const handleLogout = async () => {
    try {
      await axios.post('/logout')
    } catch (e) {
      console.error('Logout error', e)
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('user_avatar')
      navigate('/login')
    }
  }

  if (loading) {
    return (
      <div className="pp-root">
        <div className="pp-main" style={{ padding: '2rem' }}>
          <p>Memuat data profil...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pp-root">
      {/* Toast Notifikasi */}
      {toast.show && (
        <div className={`pp-toast pp-toast-${toast.type}`}>
          <span>{toast.message}</span>
          <button className="pp-toast-close" onClick={() => setToast({ show: false })}>✕</button>
        </div>
      )}

      {/* Modal Kustom */}
      {modal.show && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', width: '90%', maxWidth: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginTop: 0, fontSize: '18px', color: '#1e293b' }}>{modal.title}</h3>
            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.5', margin: '16px 0' }}>{modal.message}</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
              {modal.type === 'confirm' && (
                <button onClick={closeModal} style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', background: 'white', color: '#475569', cursor: 'pointer', fontWeight: '500' }}>
                  Batal
                </button>
              )}
              <button
                onClick={() => {
                  if (modal.onConfirm) modal.onConfirm();
                  closeModal();
                }}
                style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: modal.type === 'confirm' ? '#ef4444' : '#2563eb', color: 'white', cursor: 'pointer', fontWeight: '500' }}
              >
                {modal.type === 'confirm' ? 'Ya, Hapus' : 'Mengerti'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pp-body">
        <aside className="pp-sidebar">
          <Link to="/dashboard" className="pp-logo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
            </svg>
            <span>JobPortal</span>
          </Link>
          <div className="pp-sidebar-header">
            <p className="pp-panel-label">PANEL KARIR</p>
            <p className="pp-panel-sub">Kurasi Karir Anda</p>
          </div>
          <nav className="pp-sidenav">
            <Link to="/dashboard" className="pp-nav-item">
              <IkonDashboard /><span>Dashboard</span>
            </Link>
            <Link to="/lowongan-saya" className="pp-nav-item">
              <IkonBriefcase /><span>Lowongan Saya</span>
            </Link>
            <Link to="/pengaturan-pencari" className="pp-nav-item pp-nav-aktif">
              <IkonSettings /><span>Pengaturan</span>
            </Link>
          </nav>
        </aside>

        <main className="pp-main">
          <div className="pp-page-header">
            <h1 className="pp-page-title">Pengaturan Profil</h1>
            <p className="pp-page-subtitle">Kelola informasi pribadi dan keamanan akun Anda.</p>
          </div>

          {error && <div className="pp-alert pp-alert-error">{error}</div>}
          {successMsg && <div className="pp-alert pp-alert-success">{successMsg}</div>}

          <div className="pp-grid">
            <div className="pp-col-left">
              <div className="pp-section">
                <h2 className="pp-section-title">Foto Profil</h2>
                <div className="pp-avatar-row">
                  <div className="pp-avatar-circle">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Avatar" className="pp-avatar-img" />
                    ) : (
                      <UserAvatarImage />
                    )}
                  </div>
                  <div className="pp-avatar-info">
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button className="pp-btn-unggah" onClick={() => fileInputRef.current.click()}>
                        Unggah Foto Baru
                      </button>
                      {avatarUrl && (
                        <button
                          onClick={handleDeleteAvatar}
                          style={{ background: 'transparent', border: '1.5px solid #ef4444', color: '#ef4444', padding: '8px 16px', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}
                        >
                          Hapus Foto
                        </button>
                      )}
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                    <span className="pp-avatar-hint">Format JPG, PNG. Ukuran maksimal 2MB.</span>
                  </div>
                </div>
              </div>

              <div className="pp-section">
                <h2 className="pp-section-title">Informasi Pribadi</h2>

                <div className="pp-form-group pp-mb-20">
                  <label className="pp-label">NAMA LENGKAP</label>
                  <input
                    type="text"
                    className="pp-input"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>

                <div className="pp-form-group pp-mb-20">
                  <label className="pp-label">EMAIL</label>
                  <input type="email" className="pp-input" value={email} readOnly />
                  <span className="pp-input-hint">Email digunakan untuk login dan tidak dapat diubah.</span>
                </div>

                <div className="pp-form-group pp-mb-20">
                  <label className="pp-label">NOMOR TELEPON</label>
                  <input
                    type="tel"
                    className="pp-input"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </div>

                <div className="pp-form-group pp-mb-20">
                  <label className="pp-label">LOKASI</label>
                  <input
                    type="text"
                    className="pp-input"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                  />
                </div>

                <div className="pp-form-group">
                  <label className="pp-label">RINGKASAN PROFIL</label>
                  <textarea
                    className="pp-textarea"
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                  />
                </div>

                {/* --- BAGIAN UPLOAD CV --- */}
                <div className="pp-form-group" style={{ marginTop: '20px' }}>
                  <label className="pp-label">UPLOAD CV ANDA</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <button
                        className="pp-btn-unggah"
                        onClick={() => cvInputRef.current.click()}
                      >
                        Unggah File CV
                      </button>
                      {cvUrl && (
                        <>
                          <a href={cvUrl} target="_blank" rel="noreferrer" style={{ fontSize: '14px', color: '#2563eb', textDecoration: 'none', fontWeight: '500' }}>Lihat CV Tersimpan</a>
                          <button
                            onClick={handleDeleteCv}
                            style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: '500', fontSize: '14px', textDecoration: 'underline' }}
                          >
                            Hapus
                          </button>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      ref={cvInputRef}
                      style={{ display: 'none' }}
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleCvChange}
                    />
                    <span className="pp-input-hint">Format yang didukung: PDF, JPG, PNG. Ukuran maksimal 5MB.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pp-col-right">
              <div className="pp-card-keamanan">
                <h2 className="pp-keamanan-title">
                  <IkonLock /> Keamanan
                </h2>

                <div className="pp-form-group">
                  <label className="pp-label">KATA SANDI SAAT INI</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      className="pp-input"
                      placeholder="Masukkan kata sandi saat ini"
                      value={currentPassword}
                      onChange={e => setCurrentPassword(e.target.value)}
                      style={{ width: '100%', boxSizing: 'border-box', paddingRight: '40px' }}
                    />
                    <button
                      type="button"
                      style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', alignItems: 'center' }}
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div className="pp-form-group">
                  <label className="pp-label">KATA SANDI BARU</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      className="pp-input"
                      placeholder="Minimal 8 karakter"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      style={{ width: '100%', boxSizing: 'border-box', paddingRight: '40px' }}
                    />
                    <button
                      type="button"
                      style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', alignItems: 'center' }}
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div className="pp-form-group">
                  <label className="pp-label">KONFIRMASI KATA SANDI BARU</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="pp-input"
                      placeholder="Ulangi kata sandi baru"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      style={{ width: '100%', boxSizing: 'border-box', paddingRight: '40px' }}
                    />
                    <button
                      type="button"
                      style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', alignItems: 'center' }}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {passwordError && <p className="pp-error-text">{passwordError}</p>}

                <button
                  className="pp-btn-perbarui"
                  onClick={handleChangePassword}
                  disabled={changingPassword}
                >
                  {changingPassword ? 'Menyimpan...' : 'Perbarui Kata Sandi'}
                </button>
              </div>

              <button className="pp-btn-keluar" onClick={handleLogout}>
                <IkonLogout /> Keluar dari Akun
              </button>

              <button
                className="pp-btn-hapus-akun"
                onClick={() => {
                  showModal('Hapus Akun Permanen', 'Apakah Anda yakin ingin menghapus akun ini secara permanen? Semua data profil dan lamaran akan hilang selamanya.', 'confirm', async () => {
                    try {
                      await axios.delete('/profile/delete-account')
                      localStorage.removeItem('token')
                      localStorage.removeItem('user')
                      localStorage.removeItem('user_avatar')
                      navigate('/login')
                      closeModal()
                    } catch (err) {
                      showToast('error', 'Gagal menghapus akun.')
                      closeModal()
                    }
                  })
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
                Hapus Akun Permanen
              </button>
            </div>
          </div>

          <div className="pp-actions">
            <button className="pp-btn-batal" onClick={() => navigate('/dashboard')}>Batal</button>
            <button className="pp-btn-simpan" onClick={handleSave} disabled={saving}>
              {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </main>
      </div>
    </div>
  )
} 