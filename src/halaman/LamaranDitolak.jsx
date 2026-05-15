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

const stepLabels = ['Lamaran Dikirim', 'Tinjauan CV', 'Wawancara', 'Penawaran']

export default function LamaranDitolak() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [applications, setApplications] = useState([])
  const [savedJobs, setSavedJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [detailLoading, setDetailLoading] = useState(false)
  const token = localStorage.getItem('token')

  const [showPreview, setShowPreview] = useState(false)
  const [selectedAppInfo, setSelectedAppInfo] = useState(null)

  const [modal, setModal] = useState({ show: false, title: '', message: '', type: 'alert', onConfirm: null })
  const showModal = (title, message, type = 'alert', onConfirm = null) => setModal({ show: true, title, message, type, onConfirm })
  const closeModal = () => setModal(prev => ({ ...prev, show: false }))

  const navigate = useNavigate()

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appRes, savedRes] = await Promise.all([
          fetch('https://jobportal-api-zebb.onrender.com/api/my-applications', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch('https://jobportal-api-zebb.onrender.com/api/saved-jobs', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ])
        const appData = await appRes.json()
        const savedData = await savedRes.json()
        setApplications(appData.data || [])
        setSavedJobs(savedData.data || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const pendingApps = applications.filter(app => app.status === 'pending')
  const rejectedApps = applications.filter(app => app.status === 'rejected')

  const totalApps = applications.length + savedJobs.length
  const pendingCount = pendingApps.length
  const reviewedCount = applications.filter(a => a.status === 'reviewed').length
  const acceptedCount = applications.filter(a => a.status === 'accepted').length
  const rejectedCount = rejectedApps.length
  const savedCount = savedJobs.length

  const TABS = [
    { id: 'semua', label: `Semua (${totalApps})`, to: '/lowongan-saya' },
    { id: 'disimpan', label: 'Lowongan Disimpan', count: savedCount, to: '/lowongan-disimpan' },
    { id: 'terkirim', label: 'Lamaran Terkirim', count: pendingCount, to: '/lamaran-terkirim' },
    { id: 'review', label: 'Menunggu Review', count: reviewedCount, to: '/menunggu-review' },
    { id: 'wawancara', label: 'Wawancara', count: acceptedCount, to: '/wawancara', countBlue: true },
    { id: 'ditolak', label: 'Ditolak', count: rejectedCount, to: '/lamaran-ditolak', countRed: true },
  ]

  const handleTarikLamaran = (appId) => {
    showModal('Konfirmasi Penghapusan', 'Apakah Anda yakin ingin menghapus riwayat lamaran ini?', 'confirm', async () => {
      try {
        const res = await fetch(`https://jobportal-api-zebb.onrender.com/api/applications/${appId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (!res.ok) throw new Error('Gagal menghapus lamaran')

        setApplications(prev => prev.filter(app => app.id !== appId))
        closeModal()
      } catch (err) {
        showModal('Kesalahan', err.message, 'alert')
      }
    })
  }

  const handleDetailClick = async (app) => {
    setDetailLoading(true)
    try {
      const res = await fetch('https://jobportal-api-zebb.onrender.com/api/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const profileData = await res.json()
      setSelectedAppInfo({ app, profile: profileData })
      setShowPreview(true)
    } catch (err) {
      showModal('Kesalahan', 'Gagal memuat detail lamaran', 'alert')
    } finally {
      setDetailLoading(false)
    }
  }

  return (
    <div className="ls-root">
      {/* ══ NAVBAR ══ */}
      <nav className="ls-navbar">
        <button
          className="mobile-menu-btn"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <Link to="/dashboard" className="ls-logo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          </svg>
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

        {isSidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}
        <aside className={`ls-sidebar ${isSidebarOpen ? "sidebar-open" : ""}`}>
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
                className={`ls-tab ${tab.id === 'ditolak' ? 'ls-tab-aktif' : ''}`}
                style={{ textDecoration: 'none' }}
              >
                {tab.id === 'semua' ? tab.label : (
                  <>{tab.label}<span className={`ls-tab-count ${tab.countBlue ? 'ls-tab-count-blue' : ''} ${tab.countRed ? 'ls-tab-count-red' : ''}`}>{tab.count}</span></>
                )}
              </Link>
            ))}
          </div>

          <div className="ds-info-bar">
            <span className="ds-total"><strong>{rejectedCount}</strong> lamaran ditolak</span>
          </div>

          {loading ? (
            <div className="text-center py-10 text-gray-500">Memuat data...</div>
          ) : rejectedApps.length === 0 ? (
            <div className="text-center py-10 text-gray-500">Tidak ada lamaran yang ditolak. Tetap semangat!</div>
          ) : (
            <div className="lt-list">
              {rejectedApps.map(app => (
                <div key={app.id} className="lt-card" style={{ borderLeft: '4px solid #ef4444' }}>
                  <div className="lt-card-left">
                    {app.job_listing?.company?.logo ? (
                      <img
                        src={`https://jobportal-api-zebb.onrender.com/storage/${app.job_listing.company.logo}`}
                        alt={app.job_listing.company.company_name}
                        className="ls-company-avatar"
                        style={{ width: 52, height: 52, borderRadius: 14, objectFit: 'cover', background: 'white', padding: '2px', flexShrink: 0 }}
                      />
                    ) : (
                      <div className="ls-company-avatar" style={{ background: '#3b5bdb', width: 52, height: 52, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                        </svg>
                      </div>
                    )}
                    <div className="lt-info">
                      <h3 className="lt-title">{app.job_listing?.title}</h3>
                      <p className="lt-company">{app.job_listing?.company?.company_name}</p>
                      <div className="lt-meta">
                        <IkonLokasi /><span>{app.job_listing?.location}</span>
                        <span className="ls-separator">·</span>
                        <IkonKerja /><span>{app.job_listing?.job_type?.name}</span>
                      </div>
                      <p className="lt-tanggal">Dilamar pada {new Date(app.created_at).toLocaleDateString('id-ID')}</p>
                    </div>
                  </div>

                  <div className="lt-progress" style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', background: '#fef2f2', padding: '12px 16px', borderRadius: '8px', minWidth: '200px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#dc2626', fontWeight: '600', fontSize: '13px', marginBottom: '4px' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                      Lamaran Ditolak
                    </div>
                    {app.rejection_reason && (
                      <p style={{ margin: 0, fontSize: '12px', color: '#7f1d1d', lineHeight: '1.4' }}>
                        "{app.rejection_reason}"
                      </p>
                    )}
                  </div>

                  <div className="lt-card-right">
                    <button className="lt-btn-tarik" onClick={() => handleTarikLamaran(app.id)} style={{ color: '#64748b', borderColor: '#cbd5e1' }}>
                      Hapus Riwayat
                    </button>
                    <button className="ls-link-btn" onClick={() => handleDetailClick(app)} disabled={detailLoading}>
                      {detailLoading ? 'Memuat...' : 'Lihat Detail'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <ModalPreviewLamaran
        show={showPreview}
        onClose={() => setShowPreview(false)}
        profile={selectedAppInfo?.profile}
        jobTitle={selectedAppInfo?.app?.job_listing?.title}
        readOnly={true}
        initialExperience={selectedAppInfo?.app?.experience}
      />

      <ModalAlert {...modal} onClose={closeModal} />
    </div>
  )
}