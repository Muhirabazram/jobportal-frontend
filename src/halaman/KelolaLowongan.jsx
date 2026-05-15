import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ModalAlert from '../komponen/ModalAlert'
import './kelola-lowongan.css'

/* ---------- IKON (sama persis) ---------- */
const IkonGrid = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>)
const IkonBriefcase = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>)
const IkonUsers = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>)
const IkonSettings = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>)

const IkonBagSolid = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-2.21 0-4 1.79-4 4v9c0 2.21 1.79 4 4 4h12c2.21 0 4-1.79 4-4v-9c0-2.21-1.79-4-4-4zm-6-2c1.1 0 2 .9 2 2H10c0-1.1.9-2 2-2z"/></svg>)
const IkonCheckSolid = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><path fill="white" d="M10 15.17L6.83 12l-.71.71L10 16.58l7.59-7.59-.71-.71z"/></svg>)
const IkonXSolid = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><path fill="white" d="M15 9l-6 6M9 9l6 6" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>)

const IkonPencil = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>)
const IkonStop = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>)
const IkonEye = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>)
const IkonEyeOff = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>)

const IkonTrash = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>)
const IkonRefresh = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>)

export default function KelolaLowongan() {
  const [activeTab, setActiveTab] = useState('semua')
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  // ── Data User ──
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const userName = user?.name || 'Admin HR'
  const userRole = user?.jabatan || 'HR' // <-- dinamis, fallback ke "HR"
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase()

  // Avatar state
  const [userAvatar, setUserAvatar] = useState(localStorage.getItem('user_avatar') || null)

  // ── Dropdown Profile ──
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  const [modal, setModal] = useState({ show: false, title: '', message: '', type: 'alert', onConfirm: null })
  const showModal = (title, message, type = 'alert', onConfirm = null) => setModal({ show: true, title, message, type, onConfirm })
  const closeModal = () => setModal(prev => ({ ...prev, show: false }))

  // Listener perubahan avatar
  useEffect(() => {
    const handleAvatarUpdate = () => {
      setUserAvatar(localStorage.getItem('user_avatar'))
    }
    window.addEventListener('avatarUpdated', handleAvatarUpdate)
    return () => window.removeEventListener('avatarUpdated', handleAvatarUpdate)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('user_avatar')
    localStorage.removeItem('role')
    navigate('/login')
  }

  // Fetch lowongan
  const fetchJobs = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:8000/api/my-jobs', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      setJobs(data.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  // Statistik
  const totalLowongan = jobs.length
  const totalAktif = jobs.filter(j => j.is_active).length
  const totalDitutup = jobs.filter(j => !j.is_active).length

  const filteredJobs = activeTab === 'aktif' ? jobs.filter(j => j.is_active) : jobs

  // ── Actions ──
  const openCreateForm = () => {
    navigate('/buka-lowongan')
  }

  const openEditForm = (e, job) => {
    e.stopPropagation()
    navigate('/buka-lowongan', { state: { job } })
  }

  const handleCloseJob = (id) => {
    showModal('Konfirmasi', 'Tutup lowongan ini?', 'confirm', async () => {
      await fetch(`http://localhost:8000/api/jobs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ is_active: false })
      })
      fetchJobs()
      closeModal()
    })
  }

  const handleReopenJob = (id) => {
    showModal('Konfirmasi', 'Buka kembali lowongan ini?', 'confirm', async () => {
      await fetch(`http://localhost:8000/api/jobs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ is_active: true })
      })
      fetchJobs()
      closeModal()
    })
  }

  const handleDeleteJob = (id) => {
    showModal('Konfirmasi', 'Hapus permanen?', 'confirm', async () => {
      await fetch(`http://localhost:8000/api/jobs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      setJobs(prev => prev.filter(j => j.id !== id))
      closeModal()
    })
  }

  const handleToggleGaji = async (job) => {
    const isHidden = job.requirements?.includes('[HIDE_SALARY]')
    const newHidden = !isHidden
    
    let newReq = job.requirements || ''
    if (newHidden) {
      if (!newReq.includes('[HIDE_SALARY]')) newReq += '\n\n[HIDE_SALARY]'
    } else {
      newReq = newReq.replace(/\[HIDE_SALARY\]/g, '').trim()
    }

    try {
      await fetch(`http://localhost:8000/api/jobs/${job.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ requirements: newReq })
      })
      fetchJobs()
    } catch (err) {
      console.error(err)
    }
  }

  // ── UI ──
  return (
    <div className="kl-root">
      {/* SIDEBAR */}
      <aside className="kl-sidebar">
        <div className="kl-logo-area">
          <div className="kl-logo-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
            </svg>
          </div>
          <div className="kl-logo-text">
            <span className="kl-logo-title">JobPortal</span>
            <span className="kl-logo-subtitle">HR Dashboard</span>
          </div>
        </div>
        <nav className="kl-nav">
          <Link to="/dashboard-hrd" className="kl-nav-item"><IkonGrid /><span>Dasbor</span></Link>
          <Link to="/kelola-lowongan" className="kl-nav-item kl-nav-aktif"><IkonBriefcase /><span>Kelola Lowongan</span></Link>
          <Link to="/data-pelamar" className="kl-nav-item"><IkonUsers /><span>Data Pelamar</span></Link>
          <Link to="/pengaturan" className="kl-nav-item"><IkonSettings /><span>Pengaturan</span></Link>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="kl-main">
        <div className="kl-header-section">
          <div className="kl-header-left">
            <h1 className="kl-page-title">Kelola Lowongan</h1>
            <p className="kl-page-subtitle">Pantau dan kelola semua posisi pekerjaan yang sedang berjalan atau ditutup.</p>
          </div>
          <div className="kl-header-right">
            <button className="kl-btn-tambah" onClick={openCreateForm}>+ Buka Lowongan Baru</button>
            <div className="kl-profile-area">
              {/* Notifikasi lonceng dihapus */}

              <div className="kl-user-profile" onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
                {userAvatar ? (
                  <img src={userAvatar} alt={userName} className="kl-user-avatar" />
                ) : (
                  <div className="kl-user-avatar">{userInitials}</div>
                )}
                <div className="kl-user-info">
                  <span className="kl-user-name" title={userName}>{userName}</span>
                  <span className="kl-user-role">{userRole}</span>
                </div>
                {isProfileMenuOpen && (
                  <div className="kl-profile-dropdown">
                    <div className="kl-dropdown-item" onClick={() => navigate('/pengaturan')}>
                      <IkonSettings /><span>Pengaturan Akun</span>
                    </div>
                    <div className="kl-dropdown-item" onClick={handleLogout}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                      </svg>
                      <span>Logout</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="kl-stats-grid">
          <div className="kl-stat-card">
            <div className="kl-stat-header">
              <div className="kl-stat-icon kl-ic-blue"><IkonBagSolid /></div>
              <span className="kl-stat-label">TOTAL LOWONGAN</span>
            </div>
            <span className="kl-stat-value">{totalLowongan}</span>
          </div>
          <div className="kl-stat-card">
            <div className="kl-stat-header">
              <div className="kl-stat-icon kl-ic-indigo"><IkonCheckSolid /></div>
              <span className="kl-stat-label">AKTIF</span>
            </div>
            <span className="kl-stat-value">{totalAktif}</span>
          </div>
          <div className="kl-stat-card">
            <div className="kl-stat-header">
              <div className="kl-stat-icon kl-ic-gray"><IkonXSolid /></div>
              <span className="kl-stat-label">DITUTUP</span>
            </div>
            <span className="kl-stat-value">{totalDitutup}</span>
          </div>
        </div>

        {/* Jobs List */}
        <div className="kl-list-container">
          <div className="kl-list-header">
            <h2 className="kl-lh-title">Daftar Lowongan</h2>
            <div className="kl-lh-tabs">
              <button className={`kl-lh-tab ${activeTab === 'semua' ? 'active' : ''}`} onClick={() => setActiveTab('semua')}>Semua</button>
              <button className={`kl-lh-tab ${activeTab === 'aktif' ? 'active' : ''}`} onClick={() => setActiveTab('aktif')}>Aktif</button>
            </div>
          </div>

          <div className="kl-job-list">
            {loading && <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Memuat data...</div>}
            {!loading && filteredJobs.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Belum ada data lowongan {activeTab === 'aktif' ? 'aktif' : ''}.</div>
            )}
            {filteredJobs.map(job => (
              <div key={job.id} className={`kl-job-card ${!job.is_active ? 'closed' : ''}`}>
                <div className="kl-jc-main">
                  <div className="kl-jc-top">
                    {job.is_active ? (
                      <span className="kl-badge kl-badge-aktif">AKTIF</span>
                    ) : (
                      <span className="kl-badge kl-badge-ditutup">DITUTUP</span>
                    )}
                    <span className="kl-jc-date">{new Date(job.created_at).toLocaleDateString('id-ID')}</span>
                  </div>
                  <h3 className="kl-jc-title">{job.title}</h3>
                  <span className="kl-jc-dept">{job.category?.name} • {job.location}</span>
                </div>

                <div className="kl-jc-right">
                  <div className="kl-pelamar-info">
                    <span className="kl-pelamar-count">{job.applications?.length || 0}</span>
                    <span className="kl-pelamar-label">PELAMAR</span>
                  </div>
                  <div className="kl-jc-actions">
                    <button 
                      className="kl-btn-action" 
                      title={job.requirements?.includes('[HIDE_SALARY]') ? "Tampilkan Gaji" : "Sembunyikan Gaji"} 
                      onClick={() => handleToggleGaji(job)}
                    >
                      {job.requirements?.includes('[HIDE_SALARY]') ? <IkonEyeOff /> : <IkonEye />}
                    </button>
                    {job.is_active ? (
                      <>
                        <button className="kl-btn-action" title="Edit Lowongan" onClick={(e) => openEditForm(e, job)}>
                          <IkonPencil />
                        </button>
                        <button className="kl-btn-action" title="Tutup Lowongan" onClick={() => handleCloseJob(job.id)}>
                          <IkonStop />
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="kl-btn-action" title="Aktifkan Ulang" onClick={() => handleReopenJob(job.id)}>
                          <IkonRefresh />
                        </button>
                        <button className="kl-btn-action" title="Lihat Arsip">
                          <IkonEye />
                        </button>
                      </>
                    )}
                    <button className="kl-btn-action kl-btn-delete" title="Hapus" onClick={() => handleDeleteJob(job.id)}>
                      <IkonTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <ModalAlert {...modal} onClose={closeModal} />
    </div>
  )
}