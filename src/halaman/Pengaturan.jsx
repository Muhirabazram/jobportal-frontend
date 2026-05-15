import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import './pengaturan.css';

// ---------- Ikon-ikon SVG ----------
const IkonGrid = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);
const IkonBriefcase = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
);
const IkonUsers = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IkonSettings = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
const IkonLock = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const IkonLogout = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const UserAvatarImage = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M85 100v-5c0-11.046-8.954-20-20-20H35c-11.046 0-20 8.954-20 20v5h70z" fill="#1e293b" />
    <path d="M50 75C36 75 35 55 35 45c0-15 8-25 15-25s15 10 15 25c0 10-1 30-15 30z" fill="#fcd34d" />
    <path d="M35 75l15 25 15-25-15 10-15-10z" fill="#e2e8f0" />
    <path d="M85 100L50 85 15 100h70z" fill="#0f172a" />
    <path d="M34 40c0-15 10-25 16-25s16 10 16 25c0 4-4 0-4 0s0-5-5-5-5 5-5 5-4-1-4-1 0 5-6 5c-4 0-2-4-2-4z" fill="#1e293b" />
    <path d="M30 45C30 30 40 18 50 18c10 0 20 12 20 27 0 2-2 1-2 1v-5c0-10-8-18-18-18s-18 8-18 18v5s-2 1-2-1z" fill="#0f172a" />
  </svg>
);

// ---------- Komponen Utama ----------
export default function Pengaturan() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  
  const fileInputRef = useRef(null);

  // State profil
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [employeeCount, setEmployeeCount] = useState('');
  const [website, setWebsite] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(null);

  // State password & notifikasi
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // State alert umum
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // State toast
  const [toast, setToast] = useState({ show: false, type: '', message: '' });

  // State modal
  const [modal, setModal] = useState({ show: false, title: '', message: '', type: 'alert', onConfirm: null });
  const showModal = (title, message, type = 'alert', onConfirm = null) => setModal({ show: true, title, message, type, onConfirm });
  const closeModal = () => setModal({ show: false, title: '', message: '', type: 'alert', onConfirm: null });

  // Ambil data profil saat mount
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('/profile');
        const user = response.data;

        // Proteksi role
        if (user.role !== 'employer') {
          navigate('/pengaturan-pencari');
          return;
        }

        setName(user.name || '');
        setEmail(user.email || '');
        setJabatan(user.jabatan || '');

        if (user.company) {
          setCompanyName(user.company.company_name || '');
          setDescription(user.company.description || '');
          setIndustry(user.company.industry || '');
          setLocation(user.company.location || '');
          setEmployeeCount(user.company.employee_count || '');
          setWebsite(user.company.website || '');
        }

        setAvatarUrl(user.avatar_url || null);
        if (user.avatar_url) {
          localStorage.setItem('user_avatar', user.avatar_url);
        }
      } catch (err) {
        setError('Gagal memuat data profil. Silakan coba lagi.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Helper toast
  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: '', message: '' }), 4000);
  };

  // Upload avatar
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showModal('Ukuran Terlalu Besar', 'Ukuran foto maksimal 2MB! Silakan pilih foto dengan ukuran yang lebih kecil.', 'alert');
      e.target.value = '';
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const res = await axios.post('/profile/avatar', formData);
      const newAvatarUrl = res.data.avatar_url;
      setAvatarUrl(newAvatarUrl);
      localStorage.setItem('user_avatar', newAvatarUrl);
      window.dispatchEvent(new Event('avatarUpdated'));
      showToast('success', 'Foto profil berhasil diunggah.');
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal mengunggah foto.';
      showToast('error', msg);
    }
  };

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
        closeModal();
      }
    });
  };

  // Simpan perubahan profil
  const handleSaveProfile = async () => {
    setSaving(true);
    setError('');
    setSuccessMsg('');
    try {
      await axios.put('/profile', {
        name,
        email,
        jabatan,
        company_name: companyName,
        description,
        industry,
        company_location: location,
        employee_count: employeeCount,
        website
      });

      // Update localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      user.name = name;
      user.email = email;
      user.jabatan = jabatan;
      localStorage.setItem('user', JSON.stringify(user));

      showToast('success', 'Profil berhasil diperbarui.');
    } catch (err) {
      const msg = err.response?.data?.message || 'Terjadi kesalahan.';
      showToast('error', msg);
    } finally {
      setSaving(false);
    }
  };

  // Ubah password
  const handleChangePassword = async () => {
    setPasswordError('');
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('Semua field kata sandi harus diisi.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Kata sandi baru tidak cocok.');
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError('Kata sandi baru minimal 8 karakter.');
      return;
    }

    setChangingPassword(true);
    try {
      await axios.post('/change-password', {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showToast('success', 'Kata sandi berhasil diubah.');
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setPasswordError('Fitur ubah kata sandi belum tersedia. Hubungi admin.');
      } else {
        const msg = err.response?.data?.message || 'Gagal mengubah kata sandi.';
        setPasswordError(msg);
      }
    } finally {
      setChangingPassword(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await axios.post('/logout');
    } catch (e) {
      console.error('Logout API error', e);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('user_avatar');
      navigate('/login');
    }
  };

  // Tampilan loading
  if (loading) {
    return (
      <div className="hrset-root">
        <div className="hrset-main" style={{ padding: '2rem' }}>
          <p>Memuat data profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hrset-root">
      {/* SIDEBAR */}
      
        {isSidebarOpen && (
          <div 
            className="sidebar-overlay" 
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}
        <aside className={`hrset-sidebar ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <Link to="/" className="hrset-logo-area">
          <div className="hrset-logo-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
            </svg>
          </div>
          <div className="hrset-logo-text">
            <span className="hrset-logo-title">JobPortal</span>
            <span className="hrset-logo-subtitle">HR Dashboard</span>
          </div>
        </Link>
        <nav className="hrset-nav">
          <Link to="/dashboard-hrd" className="hrset-nav-item">
            <IkonGrid /><span>Dasbor</span>
          </Link>
          <Link to="/kelola-lowongan" className="hrset-nav-item">
            <IkonBriefcase /><span>Kelola Lowongan</span>
          </Link>
          <Link to="/data-pelamar" className="hrset-nav-item">
            <IkonUsers /><span>Data Pelamar</span>
          </Link>
          <Link to="/pengaturan" className="hrset-nav-item hrset-nav-aktif">
            <IkonSettings /><span>Pengaturan</span>
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="hrset-main">
        {/* Toast Notifikasi */}
        {toast.show && (
          <div className={`hrset-toast hrset-toast-${toast.type}`}>
            <span>{toast.message}</span>
            <button className="hrset-toast-close" onClick={() => setToast({ show: false })}>✕</button>
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

        <div className="hrset-header">
          <h1 className="hrset-page-title">Pengaturan Akun HRD</h1>
          <p className="hrset-page-subtitle">Kelola profil perusahaan, keamanan, dan preferensi notifikasi Anda.</p>
        </div>

        {error && <div className="hrset-alert hrset-alert-error">{error}</div>}
        {successMsg && <div className="hrset-alert hrset-alert-success">{successMsg}</div>}

        <div className="hrset-grid">
          {/* Kolom Kiri */}
          <div className="hrset-col-left">
            {/* Profil Pengelola */}
            <div className="hrset-section">
              <h2 className="hrset-section-title">Profil Pengelola (HR)</h2>

              <div className="hrset-avatar-row">
                <div className="hrset-avatar-circle">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar" className="hrset-avatar-img" />
                  ) : (
                    <UserAvatarImage />
                  )}
                </div>
                <div className="hrset-avatar-info">
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="hrset-btn-unggah" onClick={() => fileInputRef.current.click()}>
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
                  <span className="hrset-avatar-hint">Format JPG, GIF atau PNG. Maksimal 2MB.</span>
                </div>
              </div>

              <div className="hrset-form-row">
                <div className="hrset-form-group">
                  <label className="hrset-label">NAMA LENGKAP</label>
                  <input
                    type="text"
                    className="hrset-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="hrset-form-group">
                  <label className="hrset-label">JABATAN</label>
                  <input
                    type="text"
                    className="hrset-input"
                    value={jabatan}
                    onChange={(e) => setJabatan(e.target.value)}
                    placeholder="HR Manager"
                  />
                </div>
              </div>

              <div className="hrset-form-group">
                <label className="hrset-label">EMAIL PERUSAHAAN</label>
                <input
                  type="email"
                  className="hrset-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  readOnly
                />
                <span className="hrset-input-hint">Hubungi administrator sistem untuk mengubah email utama.</span>
              </div>
            </div>

            {/* Profil Perusahaan */}
            <div className="hrset-section">
              <h2 className="hrset-section-title">Profil Perusahaan</h2>

              <div className="hrset-form-group" style={{ marginBottom: '20px' }}>
                <label className="hrset-label">NAMA PERUSAHAAN</label>
                <input
                  type="text"
                  className="hrset-input"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>

              <div className="hrset-form-group" style={{ marginBottom: '20px' }}>
                <label className="hrset-label">DESKRIPSI SINGKAT</label>
                <textarea
                  className="hrset-textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="hrset-form-row">
                <div className="hrset-form-group">
                  <label className="hrset-label">INDUSTRI</label>
                  <select
                    className="hrset-select"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                  >
                    <option value="">Pilih Industri</option>
                    <option value="Teknologi Informasi">Teknologi Informasi</option>
                    <option value="Kesehatan">Kesehatan</option>
                    <option value="Keuangan">Keuangan</option>
                  </select>
                </div>
                <div className="hrset-form-group">
                  <label className="hrset-label">LOKASI UTAMA</label>
                  <input
                    type="text"
                    className="hrset-input"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              <div className="hrset-form-row">
                <div className="hrset-form-group">
                  <label className="hrset-label">JUMLAH KARYAWAN</label>
                  <select
                    className="hrset-select"
                    value={employeeCount}
                    onChange={(e) => setEmployeeCount(e.target.value)}
                  >
                    <option value="">Pilih Skala</option>
                    <option value="1-50 Karyawan">1-50 Karyawan</option>
                    <option value="51-200 Karyawan">51-200 Karyawan</option>
                    <option value="201-500 Karyawan">201-500 Karyawan</option>
                    <option value="500+ Karyawan">500+ Karyawan</option>
                  </select>
                </div>
                <div className="hrset-form-group">
                  <label className="hrset-label">SITUS WEB</label>
                  <input
                    type="url"
                    className="hrset-input"
                    placeholder="https://www.perusahaan.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan */}
          <div className="hrset-col-right">
            <div className="hrset-card-keamanan">
              <h2 className="hrset-keamanan-title"><IkonLock /> Keamanan</h2>

              <div className="hrset-form-group">
                <label className="hrset-label">KATA SANDI SAAT INI</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    className="hrset-input"
                    placeholder="Masukkan kata sandi saat ini"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
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

              <div className="hrset-form-group">
                <label className="hrset-label">KATA SANDI BARU</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    className="hrset-input"
                    placeholder="Minimal 8 karakter"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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

              <div className="hrset-form-group">
                <label className="hrset-label">KONFIRMASI KATA SANDI BARU</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="hrset-input"
                    placeholder="Ulangi kata sandi baru"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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

              {passwordError && <p className="hrset-error-text">{passwordError}</p>}

              <button
                className="hrset-btn-perbarui"
                onClick={handleChangePassword}
                disabled={changingPassword}
              >
                {changingPassword ? 'Menyimpan...' : 'Perbarui Kata Sandi'}
              </button>
            </div>

            <button className="hrset-btn-keluar" onClick={handleLogout}>
              <IkonLogout /> Keluar dari Akun
            </button>
            <button
              className="hrset-btn-hapus-akun"
              onClick={() => {
                showModal('Hapus Akun Permanen', 'Apakah Anda yakin ingin menghapus akun ini secara permanen? Semua data perusahaan, lowongan, dan pelamar terkait akan hilang selamanya.', 'confirm', async () => {
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

        <div className="hrset-actions">
          <button className="hrset-btn-batal" onClick={() => navigate(-1)}>Batal</button>
          <button className="hrset-btn-simpan" onClick={handleSaveProfile} disabled={saving}>
            {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </main>
    </div>
  );
}