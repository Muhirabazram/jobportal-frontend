import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ModalAlert from '../komponen/ModalAlert'
import './dashboard-hrd.css'

/* ── Ikon (sama persis) ── */
const IkonGrid = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>)
const IkonBriefcase = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>)
const IkonUsers = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>)
const IkonSettings = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>)

const IkonPeopleSolid = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14 14.07a5 5 0 1 0-4-8.07M20 20v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>)
const IkonBagSolid = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-2.21 0-4 1.79-4 4v9c0 2.21 1.79 4 4 4h12c2.21 0 4-1.79 4-4v-9c0-2.21-1.79-4-4-4zm-6-2c1.1 0 2 .9 2 2H10c0-1.1.9-2 2-2z"/></svg>)
const IkonCheckSolid = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><path fill="white" d="M10 15.17L6.83 12l-.71.71L10 16.58l7.59-7.59-.71-.71z"/></svg>)
const IkonCalSolid = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM5 20V9h14v11H5zm3-9h2v2H8v-2z"/></svg>)

const IkonVideo = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>)
const IkonBuilding = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2zm0 3.8l5.2 10.2H6.8L12 5.8z"/></svg>)

const IkonChevronDown = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>)
const IkonCalendarInput = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>)
const IkonClockInside = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>)
const IkonLink = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>)

export default function DashboardHRD() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const userName = user?.name || 'Budi Santoso'
  
  // Ambil jabatan dari user (jika ada), fallback ke 'HR Manager'
  const userRole = user?.jabatan || 'HR Manager'

  const [stats, setStats] = useState({ active_jobs: 0, total_applicants: 0, accepted_count: 0, interview_count: 0 })
  const [interviews, setInterviews] = useState([])
  const [acceptedApplicants, setAcceptedApplicants] = useState([])
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [format, setFormat] = useState('online')
  const [openActionId, setOpenActionId] = useState(null)

  // State avatar
  const [userAvatar, setUserAvatar] = useState(localStorage.getItem('user_avatar') || null)

  const [modal, setModal] = useState({ show: false, title: '', message: '', type: 'alert', onConfirm: null })
  const showModal = (title, message, type = 'alert', onConfirm = null) => setModal({ show: true, title, message, type, onConfirm })
  const closeModal = () => setModal(prev => ({ ...prev, show: false }))

  // Modal form state
  const [namaPelamar, setNamaPelamar] = useState('')
  const [posisiDilamar, setPosisiDilamar] = useState('')
  const [tanggalWawancara, setTanggalWawancara] = useState('')
  const [waktuWawancara, setWaktuWawancara] = useState('')
  const [tautanLokasi, setTautanLokasi] = useState('')

  useEffect(() => {
    // Fetch stats, interviews, accepted applicant
    fetch('http://localhost:8000/api/dashboard/stats', { headers: { 'Authorization': `Bearer ${token}` } })
      .then(r => r.json()).then(setStats).catch(console.error)

    fetch('http://localhost:8000/api/my-interviews', { headers: { 'Authorization': `Bearer ${token}` } })
      .then(r => r.json()).then(setInterviews).catch(console.error)

    fetch('http://localhost:8000/api/my-jobs', { headers: { 'Authorization': `Bearer ${token}` } })
      .then(r => r.json()).then(data => {
        const jobs = data.data || []
        const acc = []
        jobs.forEach(job => {
          (job.applications || []).forEach(app => {
            if (app.status === 'accepted') acc.push({ ...app, jobTitle: job.title })
          })
        })
        setAcceptedApplicants(acc)
      }).catch(console.error)

    // Dengarkan perubahan avatar
    const handleAvatarUpdate = () => {
      setUserAvatar(localStorage.getItem('user_avatar'))
    }
    window.addEventListener('avatarUpdated', handleAvatarUpdate)
    return () => window.removeEventListener('avatarUpdated', handleAvatarUpdate)
  }, [token])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 11) return 'Selamat Pagi'
    if (hour < 15) return 'Selamat Siang'
    if (hour < 19) return 'Selamat Sore'
    return 'Selamat Malam'
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('user_avatar')
    navigate('/login')
  }

  const cancelInterview = async (appId) => {
    await fetch(`http://localhost:8000/api/applications/${appId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ status: 'reviewed' })
    })
    setInterviews(prev => prev.filter(i => i.id !== appId))
    setOpenActionId(null)
  }

  const handleSimpanJadwal = () => {
    if (!namaPelamar || !tanggalWawancara || !waktuWawancara) {
      showModal('Peringatan', 'Lengkapi data', 'alert')
      return
    }
    const newInterview = {
      id: Date.now(),
      user: { name: namaPelamar },
      job_listing: { title: posisiDilamar || 'Posisi tidak ditentukan' },
      created_at: `${tanggalWawancara}T${waktuWawancara}:00`,
    }
    setInterviews(prev => [newInterview, ...prev])
    setIsModalOpen(false)
    setNamaPelamar(''); setPosisiDilamar(''); setTanggalWawancara(''); setWaktuWawancara(''); setTautanLokasi('')
  }

  return (
    <>
      <div className="hrd-root">
        {/* SIDEBAR */}
        <aside className="hrd-sidebar">
          <div className="hrd-logo-area">
            <div className="hrd-logo-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></svg>
            </div>
            <div className="hrd-logo-text"><span className="hrd-logo-title">JobPortal</span><span className="hrd-logo-subtitle">HR Dashboard</span></div>
          </div>
          <nav className="hrd-nav">
            <Link to="/dashboard-hrd" className="hrd-nav-item hrd-nav-aktif"><IkonGrid /><span>Dasbor</span></Link>
            <Link to="/kelola-lowongan" className="hrd-nav-item"><IkonBriefcase /><span>Kelola Lowongan</span></Link>
            <Link to="/data-pelamar" className="hrd-nav-item"><IkonUsers /><span>Data Pelamar</span></Link>
            <Link to="/pengaturan" className="hrd-nav-item"><IkonSettings /><span>Pengaturan</span></Link>
          </nav>
        </aside>

        {/* MAIN */}
        <main className="hrd-main">
          <header className="hrd-navbar">
            <div className="hrd-nav-right">
              {/* Notifikasi lonceng dihapus */}
              <div className="hrd-user-profile" onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
                {userAvatar ? (
                  <img src={userAvatar} alt={userName} className="hrd-user-avatar" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm text-white font-semibold">
                    {userName.charAt(0)}
                  </div>
                )}
                <div className="hrd-user-info">
                  <span className="hrd-user-name">{userName}</span>
                  <span className="hrd-user-role">{userRole}</span>
                </div>
                {isProfileMenuOpen && (
                  <div className="hrd-profile-dropdown">
                    <div className="hrd-dropdown-item" onClick={() => navigate('/pengaturan')}><IkonSettings /><span>Pengaturan Akun</span></div>
                    <div className="hrd-dropdown-item" onClick={handleLogout}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg><span>Logout</span></div>
                  </div>
                )}
              </div>
            </div>
          </header>

          <div className="hrd-content">
            <div className="hrd-greeting">
              <h1 className="hrd-greeting-title">{getGreeting()}, {userName.split(' ')[0]}.</h1>
              <p className="hrd-greeting-sub">Berikut adalah ringkasan aktivitas rekrutmen Anda hari ini.</p>
            </div>

            <div className="hrd-stats-grid">
              <div className="hrd-stat-card"><div className="hrd-stat-icon-wrap hrd-stat-icon-bg-1"><IkonPeopleSolid /></div><span className="hrd-stat-label">TOTAL PELAMAR</span><div className="hrd-stat-value-wrap"><span className="hrd-stat-value">{stats.total_applicants}</span></div></div>
              <div className="hrd-stat-card"><div className="hrd-stat-icon-wrap hrd-stat-icon-bg-2"><IkonBagSolid /></div><span className="hrd-stat-label">LOWONGAN AKTIF</span><div className="hrd-stat-value-wrap"><span className="hrd-stat-value">{stats.active_jobs}</span></div></div>
              <div className="hrd-stat-card"><div className="hrd-stat-icon-wrap hrd-stat-icon-bg-3"><IkonCheckSolid /></div><span className="hrd-stat-label">KANDIDAT DITERIMA</span><div className="hrd-stat-value-wrap"><span className="hrd-stat-value">{stats.accepted_count}</span></div></div>
              <div className="hrd-stat-card"><div className="hrd-stat-icon-wrap hrd-stat-icon-bg-4"><IkonCalSolid /></div><span className="hrd-stat-label">JADWAL WAWANCARA</span><div className="hrd-stat-value-wrap"><span className="hrd-stat-value">{stats.interview_count}</span></div></div>
            </div>

            <div className="hrd-kalender-section">
              <div className="hrd-kalender-header">
                <div><h2 className="hrd-kh-title">Kalender Wawancara</h2><p className="hrd-kh-sub">Jadwal wawancara kandidat terdekat</p></div>
                <button className="hrd-btn-tambah" onClick={() => setIsModalOpen(true)}>+ Tambah Jadwal</button>
              </div>
              <div className="hrd-kalender-list">
                {interviews.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#6b7280', padding: 20 }}>Belum ada jadwal wawancara.</p>
                ) : (
                  interviews.map(iv => (
                    <div key={iv.id} className="hrd-interview-item">
                      <div className="hrd-ii-time bg-blue"><strong>{new Date(iv.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</strong><span>WIB</span></div>
                      <div className="hrd-ii-content">
                        <h3 className="hrd-ii-title">Wawancara - {iv.job_listing?.title}</h3>
                        <div className="hrd-ii-kandidat"><span className="hrd-ii-kandidat-name">{iv.user?.name}</span></div>
                        <span className="hrd-ii-badge"><IkonVideo /> Google Meet</span>
                      </div>
                      <div style={{ position: 'relative' }}>
                        <button className="hrd-ii-action" onClick={() => setOpenActionId(openActionId === iv.id ? null : iv.id)}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="12" cy="19" r="2"/></svg>
                        </button>
                        {openActionId === iv.id && (
                          <div className="hrd-action-dropdown"><button onClick={() => cancelInterview(iv.id)}>Batalkan Wawancara</button></div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* MODAL TAMBAH JADWAL */}
      {isModalOpen && (
        <div className="hrd-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="hrd-modal-content" onClick={e => e.stopPropagation()}>
            <div className="hrd-modal-header">
              <div className="hrd-mh-left">
                <button className="hrd-btn-back" onClick={() => setIsModalOpen(false)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                </button>
                <div className="hrd-mh-title">JobPortal <span className="hrd-mh-subtitle">• Jadwalkan Wawancara</span></div>
              </div>
              <button className="hrd-btn-close" onClick={() => setIsModalOpen(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <div className="hrd-modal-body">
              <h2 className="hrd-mb-title">Detail Wawancara Baru</h2>
              <p className="hrd-mb-desc">Lengkapi informasi di bawah ini untuk mengundang pelamar ke sesi wawancara.</p>

              <div className="hrd-form-card">
                <div className="hrd-fc-header"><IkonUsers /> Informasi Pelamar</div>
                <div className="hrd-form-row">
                  <div className="hrd-form-group">
                    <label className="hrd-form-label">NAMA PELAMAR</label>
                    <div className="hrd-input-wrap">
                      <select className="hrd-input" value={namaPelamar} onChange={e => {
                        setNamaPelamar(e.target.value)
                        const app = acceptedApplicants.find(a => a.user?.name === e.target.value || a.id == e.target.value)
                        if (app) setPosisiDilamar(app.jobTitle || '')
                      }}>
                        <option value="">Pilih atau ketik nama</option>
                        {acceptedApplicants.map(app => (
                          <option key={app.id} value={app.user?.name}>{app.user?.name} - {app.jobTitle}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="hrd-form-group">
                    <label className="hrd-form-label">POSISI DILAMAR</label>
                    <div className="hrd-input-wrap">
                      <input type="text" className="hrd-input with-icon-right" placeholder="Pilih posisi..." readOnly value={posisiDilamar} />
                      <div className="hrd-input-icon right"><IkonChevronDown /></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hrd-form-card">
                <div className="hrd-fc-header"><IkonCalSolid /> Jadwal & Format</div>
                <div className="hrd-form-row">
                  <div className="hrd-form-group">
                    <label className="hrd-form-label">TANGGAL WAWANCARA</label>
                    <div className="hrd-input-wrap">
                      <input type="date" className="hrd-input with-icon-right" value={tanggalWawancara} onChange={e => setTanggalWawancara(e.target.value)} />
                      <div className="hrd-input-icon right"><IkonCalendarInput /></div>
                    </div>
                  </div>
                  <div className="hrd-form-group">
                    <label className="hrd-form-label">WAKTU (WIB)</label>
                    <div className="hrd-input-wrap">
                      <input type="time" className="hrd-input with-icon-right" value={waktuWawancara} onChange={e => setWaktuWawancara(e.target.value)} />
                      <div className="hrd-input-icon right"><IkonClockInside /></div>
                    </div>
                  </div>
                </div>

                <div className="hrd-form-group" style={{ marginTop: '20px' }}>
                  <label className="hrd-form-label">FORMAT WAWANCARA</label>
                  <div className="hrd-format-toggles">
                    <div className={`hrd-format-btn ${format === 'online' ? 'active' : ''}`} onClick={() => setFormat('online')}><IkonVideo />Online (Virtual)</div>
                    <div className={`hrd-format-btn ${format === 'offline' ? 'active' : ''}`} onClick={() => setFormat('offline')}><IkonBuilding />Offline (Di Kantor)</div>
                  </div>
                </div>

                <div className="hrd-form-group" style={{ marginTop: '20px' }}>
                  <label className="hrd-form-label">TAUTAN PERTEMUAN / LOKASI</label>
                  <div className="hrd-input-wrap">
                    <div className="hrd-input-icon left"><IkonLink /></div>
                    <input type="text" className="hrd-input with-icon-left" placeholder="Masukkan link Google Meet / Zoom atau alamat kantor" value={tautanLokasi} onChange={e => setTautanLokasi(e.target.value)} />
                  </div>
                  <span className="hrd-input-hint">Pastikan tautan atau alamat jelas bagi pelamar.</span>
                </div>
              </div>
            </div>

            <div className="hrd-modal-footer">
              <button className="hrd-btn-cancel" onClick={() => setIsModalOpen(false)}>Batal</button>
              <button className="hrd-btn-submit" onClick={handleSimpanJadwal}>
                Simpan Jadwal
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <ModalAlert {...modal} onClose={closeModal} />
    </>
  )
}