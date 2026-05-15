import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './lowongan-saya.css'
import './disimpan.css'
import ModalAlert from '../komponen/ModalAlert'
import ModalPreviewLamaran from '../komponen/ModalPreviewLamaran'

const IkonDashboard = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>)
const IkonBriefcase = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></svg>)
const IkonSettings = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>)
const IkonLokasi = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>)
const IkonKerja = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></svg>)
const IkonBookmark = ({ filled }) => (<svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? '#2563eb' : 'none'} stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>)

export default function LowonganDisimpan() {
  const [savedJobs, setSavedJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  const navigate = useNavigate()
  const [modal, setModal] = useState({ show: false, title: '', message: '', type: 'alert', onConfirm: null, confirmText: '' })
  const showModal = (title, message, type = 'alert', onConfirm = null, confirmText = '') => setModal({ show: true, title, message, type, onConfirm, confirmText })
  const closeModal = () => setModal(prev => ({ ...prev, show: false }))

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    navigate('/login')
  }

  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const userName = user?.name || 'Akun Pelamar'
  const userInitials = userName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
  const [userAvatar, setUserAvatar] = useState(localStorage.getItem('user_avatar') || null)

  useEffect(() => {
    const handleAvatarUpdate = () => {
      setUserAvatar(localStorage.getItem('user_avatar'))
    }
    window.addEventListener('avatarUpdated', handleAvatarUpdate)
    return () => window.removeEventListener('avatarUpdated', handleAvatarUpdate)
  }, [])

  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [userProfile, setUserProfile] = useState(null)
  const [selectedJob, setSelectedJob] = useState(null)
  const [lamarLoading, setLamarLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [savedRes, appRes] = await Promise.all([
          fetch('http://localhost:8000/api/saved-jobs', { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch('http://localhost:8000/api/my-applications', { headers: { 'Authorization': `Bearer ${token}` } })
        ])
        const savedData = await savedRes.json()
        const appData = await appRes.json()
        setSavedJobs(savedData.data || [])
        setApplications(appData.data || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleUnsave = async (slug) => {
    await fetch(`http://localhost:8000/api/jobs/${slug}/unsave`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    setSavedJobs(prev => prev.filter(item => item.job_listing?.slug !== slug))
  }

  const handleLamarClick = async (job) => {
    if (!token) {
      showModal('Kesalahan', 'Anda harus login untuk melamar.', 'alert')
      return
    }

    setLamarLoading(true)
    try {
      const res = await fetch('http://localhost:8000/api/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const profileData = await res.json()

      if (!profileData.name || !profileData.phone || !profileData.location || !profileData.bio || !profileData.cv_url) {
        showModal(
          'Profil Belum Lengkap',
          'Mohon lengkapi informasi pribadi dan upload CV Anda terlebih dahulu pada halaman Pengaturan.',
          'confirm',
          () => navigate('/pengaturan-pencari'),
          'Pergi ke Pengaturan'
        )
      } else {
        setUserProfile(profileData)
        setSelectedJob(job)
        setShowPreviewModal(true)
      }
    } catch (err) {
      showModal('Kesalahan', 'Gagal memuat profil', 'alert')
    } finally {
      setLamarLoading(false)
    }
  }

  const handleKirimLamaran = async (experience) => {
    if (!selectedJob) return
    setLamarLoading(true)
    try {
      const res = await fetch(`http://localhost:8000/api/jobs/${selectedJob.slug}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ experience })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Gagal melamar')

      setShowPreviewModal(false)
      showModal('Sukses', 'Lamaran berhasil dikirim!', 'alert')

      // Update saved jobs state (lamaran sent, usually removed from saved or updated)
      // fetch data again or remove from list? Usually we keep it but it's fine.
    } catch (err) {
      showModal('Kesalahan', err.message, 'alert')
    } finally {
      setLamarLoading(false)
    }
  }

  // Hitung jumlah untuk tab
  const totalApps = applications.length
  const pendingCount = applications.filter(a => a.status === 'pending').length
  const reviewedCount = applications.filter(a => a.status === 'reviewed').length
  const acceptedCount = applications.filter(a => a.status === 'accepted').length
  const rejectedCount = applications.filter(a => a.status === 'rejected').length
  const savedCount = savedJobs.length

  const TABS = [
    { id: 'semua', label: `Semua (${totalApps})`, to: '/lowongan-saya' },
    { id: 'disimpan', label: 'Lowongan Disimpan', count: savedCount, to: '/lowongan-disimpan' },
    { id: 'terkirim', label: 'Lamaran Terkirim', count: pendingCount, to: '/lamaran-terkirim' },
    { id: 'review', label: 'Menunggu Review', count: reviewedCount, to: '/menunggu-review' },
    { id: 'wawancara', label: 'Wawancara', count: acceptedCount, to: '/wawancara', countBlue: true },
    { id: 'ditolak', label: 'Ditolak', count: rejectedCount, to: '/lamaran-ditolak', countRed: true },
  ]

  return (
    <div className="ls-root">
      {/* ══ NAVBAR ══ */}
      <nav className="ls-navbar">
        <Link to="/dashboard" className="ls-logo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></svg>
          <span>JobPortal</span>
        </Link>
        <div className="ls-navbar-right">
          <div className="ls-user" onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} style={{ position: 'relative', cursor: 'pointer' }}>
            <span className="ls-username">{userName}</span>
            {userAvatar ? (
              <img src={userAvatar} alt={userName} className="ls-avatar" style={{ objectFit: 'cover' }} />
            ) : (
              <div className="ls-avatar">{userInitials}</div>
            )}
            {isProfileMenuOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: 8,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                minWidth: 200,
                zIndex: 50,
                padding: '4px 0',
                marginTop: 4
              }}>
                <div
                  style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 500 }}
                  onClick={() => navigate('/pengaturan-pencari')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                  Pengaturan Akun
                </div>
                <div
                  style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 500, color: '#dc2626' }}
                  onClick={handleLogout}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="ls-body">
        {/* ══ SIDEBAR ══ */}
        <aside className="ls-sidebar">
          <div className="ls-sidebar-header">
            <p className="ls-panel-label">PANEL KARIR</p>
            <p className="ls-panel-sub">Kurasi Karir Anda</p>
          </div>
          <nav className="ls-sidenav">
            <Link to="/dashboard" className="ls-nav-item"><IkonDashboard /><span>Dashboard</span></Link>
            <Link to="/lowongan-saya" className="ls-nav-item ls-nav-aktif"><IkonBriefcase /><span>Lowongan Saya</span></Link>
            <Link to="/pengaturan-pencari" className="ls-nav-item"><IkonSettings /><span>Pengaturan</span></Link>
          </nav>
        </aside>

        {/* ══ MAIN ══ */}
        <main className="ls-main">
          <div className="ls-page-header">
            <h1 className="ls-page-title">Lowongan Saya</h1>
            <Link to="/dashboard" className="ls-btn-cari">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              Cari Lowongan Baru
            </Link>
          </div>

          {/* Tabs */}
          <div className="ls-tabs">
            {TABS.map(tab => (
              <Link key={tab.id} to={tab.to}
                className={`ls-tab ${tab.id === 'disimpan' ? 'ls-tab-aktif' : ''}`}
                style={{ textDecoration: 'none' }}
              >
                {tab.id === 'semua' ? tab.label : (
                  <>{tab.label}<span className={`ls-tab-count ${tab.countBlue ? 'ls-tab-count-blue' : ''}`}>{tab.count}</span></>
                )}
              </Link>
            ))}
          </div>

          {loading && <div style={{ textAlign: 'center', padding: 40, color: '#64748b' }}>Memuat data...</div>}
          {!loading && savedJobs.length === 0 && (
            <div style={{ textAlign: 'center', padding: 40, color: '#64748b' }}>Belum ada lowongan yang disimpan.</div>
          )}
          {!loading && savedJobs.length > 0 && (
            <>
              <div className="ds-info-bar">
                <span className="ds-total"><strong>{savedCount}</strong> lowongan tersimpan</span>
              </div>
              <div className="ds-grid">
                {savedJobs.map(item => {
                  const job = item.job_listing
                  return (
                    <div key={item.id} className="ds-card">
                      <div className="ds-card-header">
                        <span className="ls-badge ls-badge-disimpan">DISIMPAN</span>
                        <button className="ls-bookmark-btn" onClick={() => handleUnsave(job?.slug)}>
                          <IkonBookmark filled={true} />
                        </button>
                      </div>
                      <div className="ds-card-body">
                        {job?.company?.logo ? (
                          <img
                            src={`http://localhost:8000/storage/${job?.company.logo}`}
                            alt={job?.company?.company_name}
                            className="ls-company-avatar"
                            style={{ width: 44, height: 44, borderRadius: 10, objectFit: 'cover', background: 'white', padding: '2px', marginBottom: 12 }}
                          />
                        ) : (
                          <div className="ls-company-avatar" style={{ background: '#3b5bdb', width: 44, height: 44, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                            </svg>
                          </div>
                        )}
                        <h3 className="ds-title">{job?.title}</h3>
                        <p className="ds-company">{job?.company?.company_name}</p>
                        <div className="ds-meta">
                          <span className="ls-meta-item-sm"><IkonLokasi /> {job?.location}</span>
                          <span className="ls-separator">·</span>
                          <span className="ls-meta-item-sm"><IkonKerja /> {job?.job_type?.name}</span>
                        </div>
                      </div>
                      <div className="ds-card-footer">
                        <button className="ls-btn-lamar" onClick={() => handleLamarClick(job)}>Lamar Sekarang</button>
                        <button className="ds-btn-hapus" onClick={() => handleUnsave(job?.slug)}>Hapus</button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </main>
      </div>

      <ModalAlert {...modal} onClose={closeModal} />

      <ModalPreviewLamaran
        show={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        profile={userProfile}
        jobTitle={selectedJob?.title}
        onConfirm={handleKirimLamaran}
        isLoading={lamarLoading}
        isAlreadyApplied={applications.some(app => app.job_listing_id === selectedJob?.id)}
      />
    </div>
  )
}