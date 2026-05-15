import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ModalAlert from '../komponen/ModalAlert'
import ModalPreviewLamaran from '../komponen/ModalPreviewLamaran'
import './dashboard.css'

const KATEGORI_LIST = ['Engineering', 'Design', 'Marketing', 'Product', 'Data Science', 'Sales']
const TIPE_LIST = ['Full-time', 'Part-time', 'Remote', 'Kontrak']

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

/* ── KOMPONEN DETAIL LOWONGAN ── */
function DetailLowongan({ job, onKembali, showModal }) {
  const navigate = useNavigate()
  const [disimpan, setDisimpan] = useState(job.is_saved || false)
  const [lamarLoading, setLamarLoading] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [userProfile, setUserProfile] = useState(null)
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false)

  useEffect(() => {
    const checkApplied = async () => {
      const token = localStorage.getItem('token')
      if(!token) return
      try {
        const res = await fetch('http://localhost:8000/api/my-applications', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if(res.ok) {
          const data = await res.json()
          const applied = (data.data || []).some(app => app.job_listing_id === job.id)
          setIsAlreadyApplied(applied)
        }
      } catch(e) {}
    }
    checkApplied()
  }, [job])

  const formatGaji = (min, max, isHidden) => {
    if (isHidden || (!min && !max)) return 'Dirahasiakan'
    const fmt = (v) => v?.toLocaleString('id-ID')
    return min && max ? `Rp ${fmt(min)} – ${fmt(max)}` : `Rp ${fmt(min || max)}`
  }

  const handleLamarClick = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setShowLoginModal(true)
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
        setShowPreviewModal(true)
      }
    } catch (err) {
      showModal('Kesalahan', 'Gagal memuat profil', 'alert')
    } finally {
      setLamarLoading(false)
    }
  }

  const handleKirimLamaran = async (experience) => {
    const token = localStorage.getItem('token')
    setLamarLoading(true)
    try {
      const res = await fetch(`http://localhost:8000/api/jobs/${job.slug}/apply`, {
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
    } catch (err) {
      showModal('Kesalahan', err.message, 'alert')
    } finally {
      setLamarLoading(false)
    }
  }

  const handleSimpan = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setShowLoginModal(true)
      return
    }

    try {
      const endpoint = disimpan ? 'unsave' : 'save'
      const method = disimpan ? 'DELETE' : 'POST'
      
      const res = await fetch(`http://localhost:8000/api/jobs/${job.slug}/${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (!res.ok) throw new Error('Gagal menyimpan lowongan')
      setDisimpan(!disimpan)
    } catch (err) {
      showModal('Kesalahan', err.message, 'alert')
    }
  }

  let reqText = job.requirements || '';
  const isHidden = reqText.includes('[HIDE_SALARY]');
  reqText = reqText.replace(/\[HIDE_SALARY\]/g, '').trim();

  let tanggungJawab = job.responsibilities
    ? job.responsibilities.split(/[\n]+/).map(s => s.replace(/^[-•*]\s*/, '').trim()).filter(Boolean)
    : [];
  let persyaratanArr = [];

  if (!job.responsibilities && reqText) {
    const tjMatch = reqText.match(/tanggung\s*jawab\s*:?/i);
    const pMatch = reqText.match(/persyaratan\s*:?/i);
    if (tjMatch && pMatch) {
      const tjIdx = tjMatch.index;
      const pIdx = pMatch.index;
      if (tjIdx < pIdx) {
        const tjStr = reqText.substring(tjIdx + tjMatch[0].length, pIdx);
        const pStr = reqText.substring(pIdx + pMatch[0].length);
        tanggungJawab = tjStr.split(/[\n]+/).map(s => s.replace(/^[-•*]\s*/, '').trim()).filter(Boolean);
        persyaratanArr = pStr.split(/[\n]+/).map(s => s.replace(/^[-•*]\s*/, '').trim()).filter(Boolean);
      } else {
        const pStr = reqText.substring(pIdx + pMatch[0].length, tjIdx);
        const tjStr = reqText.substring(tjIdx + tjMatch[0].length);
        persyaratanArr = pStr.split(/[\n]+/).map(s => s.replace(/^[-•*]\s*/, '').trim()).filter(Boolean);
        tanggungJawab = tjStr.split(/[\n]+/).map(s => s.replace(/^[-•*]\s*/, '').trim()).filter(Boolean);
      }
    } else {
      persyaratanArr = reqText.split(/[,.\n]+/).map(s => s.replace(/^[-•*]\s*/, '').trim()).filter(Boolean);
    }
  } else if (reqText) {
    persyaratanArr = reqText.split(/[,.\n]+/).map(s => s.replace(/^[-•*]\s*/, '').trim()).filter(Boolean);
  }

  return (
    <main className="dp-main">
      <button className="dp-kembali-btn" onClick={onKembali}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
        </svg>
        Kembali ke Pencarian
      </button>

      <div className="detail-header-card">
        <div className="detail-header-left">
          {job.company?.logo ? (
            <img 
              src={`http://localhost:8000/storage/${job.company.logo}`} 
              alt={job.company.company_name} 
              className="detail-job-icon" 
              style={{ objectFit: 'cover', background: 'white', padding: '2px' }} 
            />
          ) : (
            <div className="detail-job-icon" style={{ background: '#3b5bdb' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
              </svg>
            </div>
          )}
          <div>
            <h1 className="detail-judul">{job.title}</h1>
            <div className="detail-meta-row">
              <span className="detail-perusahaan">{job.company?.company_name}</span>
              <span className="detail-meta-sep">·</span>
              <span className="detail-meta-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                {job.location}
              </span>
              <span className="detail-meta-sep">·</span>
              <span className="detail-meta-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
                {job.job_type?.name}
              </span>
              <span className="detail-meta-sep">·</span>
              <span className="detail-meta-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                {formatGaji(job.salary_min, job.salary_max, isHidden)}
              </span>
            </div>
          </div>
        </div>
        <div className="detail-header-right">
          <button
            className={`detail-simpan-btn ${disimpan ? 'detail-simpan-aktif' : ''}`}
            onClick={handleSimpan}
            title={disimpan ? 'Hapus dari simpanan' : 'Simpan lowongan'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={disimpan ? '#2563eb' : 'none'} stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
          <button
            onClick={handleLamarClick}
            disabled={lamarLoading}
            style={{ background: '#2563eb', color: 'white', fontWeight: 600, padding: '8px 20px', borderRadius: 8, opacity: lamarLoading ? 0.7 : 1 }}
          >
            {lamarLoading ? 'Memproses...' : 'Lamar Sekarang'}
          </button>
        </div>
      </div>

      <div className="detail-content-row">
        <div className="detail-col-left" style={{ width: '65%' }}>
          <div className="detail-card">
            <h2 className="detail-section-title">Deskripsi Pekerjaan</h2>
            <p className="detail-paragraph">{job.description || 'Deskripsi tidak tersedia.'}</p>
          </div>

          {tanggungJawab.length > 0 && (
            <div className="detail-card">
              <h2 className="detail-section-title">Tanggung Jawab Utama</h2>
              <ul className="detail-checklist">
                {tanggungJawab.map((item, i) => (
                  <li key={i} className="detail-check-item">
                    <div className="detail-check-icon">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {persyaratanArr.length > 0 && (
            <div className="detail-card">
              <h2 className="detail-section-title">Persyaratan</h2>
              <ul className="detail-bullet-list">
                {persyaratanArr.map((item, i) => (
                  <li key={i} className="detail-bullet-item">
                    <span className="detail-bullet-dot" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="detail-col-right" style={{ width: '35%' }}>
          <div className="detail-card detail-company-card">
            <h3 className="detail-company-heading">Tentang Perusahaan</h3>

            <div className="detail-company-header">
              {job.company?.logo ? (
                <img 
                  src={`http://localhost:8000/storage/${job.company.logo}`} 
                  alt="Logo Perusahaan" 
                  className="detail-company-icon" 
                  style={{ width: 44, height: 44, borderRadius: 10, objectFit: 'cover', background: 'transparent' }} 
                />
              ) : (
                <div className="detail-company-icon" style={{ background: '#3b5bdb', width: 44, height: 44, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                  </svg>
                </div>
              )}
              <div>
                <p className="detail-company-name">{job.company?.company_name || 'Perusahaan'}</p>
                {job.company?.industry && (
                  <span className="detail-company-badge">{job.company.industry}</span>
                )}
              </div>
            </div>

            <p className="detail-company-desc">
              {job.company?.description || 'Deskripsi perusahaan tidak tersedia.'}
            </p>

            <div className="detail-company-info-list">
              <div className="detail-company-info-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span>{job.company?.employee_count || 'Jumlah karyawan tidak diketahui'}</span>
              </div>
              <div className="detail-company-info-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                {job.company?.website ? (
                  <a href={job.company.website.startsWith('http') ? job.company.website : `https://${job.company.website}`} target="_blank" rel="noopener noreferrer" style={{ color: '#6b7280', textDecoration: 'none' }}>
                    {job.company.website.replace(/^https?:\/\//, '')}
                  </a>
                ) : (
                  <span>Website tidak tersedia</span>
                )}
              </div>
              <div className="detail-company-info-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9,22 9,12 15,12 15,22" />
                </svg>
                <span>{job.company?.address || job.location || 'Alamat tidak tersedia'}</span>
              </div>
            </div>

            {job.company?.website && (
              <a href={job.company.website.startsWith('http') ? job.company.website : `https://${job.company.website}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <button className="detail-kunjungi-btn" style={{ width: '100%', marginTop: '16px' }}>Kunjungi Situs Perusahaan</button>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Modal Login */}
      {showLoginModal && (
        <div className="dpl-modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="dpl-modal-box" onClick={e => e.stopPropagation()}>
            <h3>Login Diperlukan</h3>
            <p>Silakan login atau daftar untuk melamar pekerjaan ini.</p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <Link to="/login" className="dpl-btn-solid" style={{ flex: 1, textAlign: 'center' }}>Login</Link>
              <Link to="/daftar" className="dpl-btn-line" style={{ flex: 1, textAlign: 'center' }}>Daftar</Link>
            </div>
          </div>
        </div>
      )}

      <ModalPreviewLamaran
        show={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        onConfirm={handleKirimLamaran}
        profile={userProfile}
        jobTitle={job.title}
        isLoading={lamarLoading}
        isAlreadyApplied={isAlreadyApplied}
      />
    </main>
  )
}

/* ═══════════════════════ HALAMAN UTAMA ═══════════════════════ */
export default function DashboardPencari() {
  const navigate = useNavigate()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [lokasi, setLokasi] = useState('')
  const [kategoriFilter, setKategoriFilter] = useState([])
  const [tipeFilter, setTipeFilter] = useState([])
  const [urutan, setUrutan] = useState('Semua')
  const [selectedJob, setSelectedJob] = useState(null)

  const [modal, setModal] = useState({ show: false, title: '', message: '', type: 'alert', onConfirm: null, confirmText: '' })
  const showModal = (title, message, type = 'alert', onConfirm = null, confirmText = '') => setModal({ show: true, title, message, type, onConfirm, confirmText })
  const closeModal = () => setModal(prev => ({ ...prev, show: false }))

  // -- State untuk user dropdown --
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
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

  const token = localStorage.getItem('token')

  const fetchJobs = async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (keyword) params.append('search', keyword)
    if (lokasi) params.append('location', lokasi)
    kategoriFilter.forEach(s => params.append('categories[]', s))
    tipeFilter.forEach(s => params.append('job_types[]', s))

    try {
      const res = await fetch(`http://localhost:8000/api/jobs?${params.toString()}`)
      const data = await res.json()
      setJobs(data.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [keyword, lokasi, kategoriFilter, tipeFilter])

  const toggleFilter = (arr, setArr, val) =>
    setArr(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val])

  const formatGaji = (min, max, isHidden) => {
    if (isHidden || (!min && !max)) return 'Dirahasiakan'
    const fmt = (v) => v?.toLocaleString('id-ID')
    return min && max ? `Rp ${fmt(min)} - ${fmt(max)}` : `Rp ${fmt(min || max)}`
  }

  const handleLihatDetail = (job) => {
    setSelectedJob(job)
  }

  const handleKembali = () => {
    setSelectedJob(null)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    navigate('/login')
  }

  let displayedJobs = [...jobs]

  if (urutan === 'Terbaru') {
    const batasWaktu = new Date()
    batasWaktu.setDate(batasWaktu.getDate() - 7)
    displayedJobs = displayedJobs.filter(job => new Date(job.created_at) >= batasWaktu)
    displayedJobs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  } else if (urutan === 'Gaji Tertinggi') {
    displayedJobs = displayedJobs.filter(job => (job.salary_min && job.salary_min > 2000000) || (job.salary_max && job.salary_max > 2000000))
    displayedJobs.sort((a, b) => {
      const gajiA = Math.max(a.salary_max || 0, a.salary_min || 0)
      const gajiB = Math.max(b.salary_max || 0, b.salary_min || 0)
      return gajiB - gajiA
    })
  } else if (urutan === 'Relevan') {
    displayedJobs.sort((a, b) => {
      const scoreA = a.applicants_count || a.id || 0
      const scoreB = b.applicants_count || b.id || 0
      return scoreB - scoreA
    })
  }

  return (
    <div className="dp-root">
      {/* NAVBAR */}
      <nav className="dp-navbar">
        <Link to="/dashboard" className="dp-logo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          </svg>
          <span>JobPortal</span>
        </Link>
        <div className="dp-navbar-right">
          <div className="dp-user" onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} style={{ position: 'relative', cursor: 'pointer' }}>
            <span className="dp-username">{userName}</span>
            {userAvatar ? (
              <img src={userAvatar} alt={userName} className="dp-avatar" style={{ objectFit: 'cover' }} />
            ) : (
              <div className="dp-avatar">{userInitials}</div>
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

      <div className="dp-body">
        <aside className="dp-sidebar">
          <div className="dp-sidebar-header">
            <p className="dp-panel-label">PANEL KARIR</p>
            <p className="dp-panel-sub">Kurasi Karir Anda</p>
          </div>
          <nav className="dp-sidenav">
            <button
              className={`dp-nav-item ${!selectedJob ? 'dp-nav-aktif' : ''}`}
              onClick={() => setSelectedJob(null)}
            >
              <IkonDashboard /><span>Dashboard</span>
            </button>
            <Link to="/lowongan-saya" className="dp-nav-item" style={{ textDecoration: 'none' }}>
              <IkonBriefcase /><span>Lowongan Saya</span>
            </Link>
            <Link to="/pengaturan-pencari" className="dp-nav-item" style={{ textDecoration: 'none' }}>
              <IkonSettings /><span>Pengaturan</span>
            </Link>
          </nav>
        </aside>

        {selectedJob ? (
          <DetailLowongan job={selectedJob} onKembali={handleKembali} showModal={showModal} />
        ) : (
          <main className="dp-main">
            {/* Search bar */}
            <div className="dp-searchbar">
              <div className="dp-search-input-wrap">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input type="text" placeholder="Posisi, kata kunci, atau perusahaan" value={keyword} onChange={e => setKeyword(e.target.value)} className="dp-search-input" />
              </div>
              <div className="dp-search-divider" />
              <div className="dp-search-input-wrap">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                <input type="text" placeholder="Lokasi" value={lokasi} onChange={e => setLokasi(e.target.value)} className="dp-search-input" />
              </div>
              <button className="dp-btn-cari" onClick={fetchJobs}>Cari</button>
            </div>

            <div className="dp-results-header">
              <span className="dp-results-count"><strong>{displayedJobs.length}</strong> lowongan ditemukan</span>
              <div className="dp-urutan">
                <span className="dp-urutan-label">Urutkan:</span>
                <select className="dp-urutan-select" value={urutan} onChange={e => setUrutan(e.target.value)}>
                  <option>Semua</option>
                  <option>Terbaru</option>
                  <option>Relevan</option>
                  <option>Gaji Tertinggi</option>
                </select>
              </div>
            </div>

            <div className="dp-content-row">
              <div className="dp-filter-panel">
                <h3 className="dp-filter-title">Filter Pencarian</h3>
                <div className="dp-filter-section">
                  <p className="dp-filter-section-label">KATEGORI</p>
                  {KATEGORI_LIST.map(k => (
                    <label key={k} className="dp-checkbox-label">
                      <input type="checkbox" className="dp-checkbox" checked={kategoriFilter.includes(k.toLowerCase().replace(/\s/g, '-'))} onChange={() => toggleFilter(kategoriFilter, setKategoriFilter, k.toLowerCase().replace(/\s/g, '-'))} />
                      <span className="dp-checkbox-custom" /><span className="dp-checkbox-text">{k}</span>
                    </label>
                  ))}
                </div>
                <div className="dp-filter-section">
                  <p className="dp-filter-section-label">TIPE PEKERJAAN</p>
                  {TIPE_LIST.map(t => (
                    <label key={t} className="dp-checkbox-label">
                      <input type="checkbox" className="dp-checkbox" checked={tipeFilter.includes(t.toLowerCase().replace(/\s/g, '-'))} onChange={() => toggleFilter(tipeFilter, setTipeFilter, t.toLowerCase().replace(/\s/g, '-'))} />
                      <span className="dp-checkbox-custom" /><span className="dp-checkbox-text">{t}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="dp-job-list">
                {loading && <div className="dp-empty"><p>Memuat...</p></div>}
                {!loading && displayedJobs.length === 0 && <div className="dp-empty"><p>Tidak ada lowongan yang ditemukan.</p></div>}
                {!loading && displayedJobs.map(job => (
                  <div key={job.id} className="dp-job-card">
                    <div className="dp-job-card-left">
                      {job.company?.logo ? (
                        <img 
                          src={`http://localhost:8000/storage/${job.company.logo}`} 
                          alt={job.company?.company_name} 
                          className="dp-job-icon" 
                          style={{ objectFit: 'cover', background: 'white', padding: '2px' }} 
                        />
                      ) : (
                        <div className="dp-job-icon" style={{ background: '#3b5bdb' }}>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                          </svg>
                        </div>
                      )}
                      <div className="dp-job-info">
                        <h3 className="dp-job-judul">{job.title}</h3>
                        <p className="dp-job-perusahaan">{job.company?.company_name}</p>
                        <div className="dp-job-meta">
                          <span className="dp-meta-item"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>{job.location}</span>
                          <span className="dp-meta-item"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></svg>{job.job_type?.name}</span>
                          <span className="dp-meta-item"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>{formatGaji(job.salary_min, job.salary_max, job.requirements?.includes('[HIDE_SALARY]'))}</span>
                        </div>
                        <div className="dp-job-tags">
                          {job.category?.name && <span className="dp-tag">{job.category.name}</span>}
                          {job.job_type?.name && <span className="dp-tag">{job.job_type.name}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="dp-job-card-right">
                      <span className="dp-job-waktu">{new Date(job.created_at).toLocaleDateString('id-ID')}</span>
                      <button className="dp-btn-detail" onClick={() => handleLihatDetail(job)}>Lihat Detail</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        )}
      </div>

      <ModalAlert {...modal} onClose={closeModal} />
    </div>
  )
}