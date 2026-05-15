import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import ModalAlert from '../komponen/ModalAlert'
import './buka-lowongan.css'

/* ── Ikon (sama persis) ── */
const IkonGrid = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>)
const IkonBriefcase = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></svg>)
const IkonUsers = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>)
const IkonSettings = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>)
const IkonArrowLeft = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>)
const IkonMapPin = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>)

export default function BukaLowongan() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate()

  const location = useLocation()
  const token = localStorage.getItem('token')

  const jobToEdit = location.state?.job
  const isEditMode = !!jobToEdit

  const [modal, setModal] = useState({ show: false, title: '', message: '', type: 'alert', onConfirm: null })
  const showModal = (title, message, type = 'alert', onConfirm = null) => setModal({ show: true, title, message, type, onConfirm })
  const closeModal = () => setModal(prev => ({ ...prev, show: false }))

  // State form
  const [title, setTitle] = useState(jobToEdit?.title || '')
  const [categoryId, setCategoryId] = useState(jobToEdit?.category_id || '')
  const [jobTypeId, setJobTypeId] = useState(jobToEdit?.job_type_id || '')
  const [locationInput, setLocationInput] = useState(jobToEdit?.location || '')
  const [salaryRange, setSalaryRange] = useState(
    jobToEdit?.salary_min && jobToEdit?.salary_max
      ? `${jobToEdit.salary_min} - ${jobToEdit.salary_max}`
      : ''
  )
  const [description, setDescription] = useState(jobToEdit?.description || '')
  const [responsibilities, setResponsibilities] = useState('')
  const [requirements, setRequirements] = useState('')
  const [categories, setCategories] = useState([])
  const [jobTypes, setJobTypes] = useState([])
  const [saving, setSaving] = useState(false)
  const [hideSalary, setHideSalary] = useState(jobToEdit?.requirements?.includes('[HIDE_SALARY]') || false)

  // Ambil kategori & tipe pekerjaan
  useEffect(() => {
    fetch('https://jobportal-api-zebb.onrender.com/api/categories')
      .then(res => res.json())
      .then(setCategories)
      .catch(console.error)

    fetch('https://jobportal-api-zebb.onrender.com/api/job-types')
      .then(res => res.json())
      .then(setJobTypes)
      .catch(console.error)

    // Jika mode edit, pecah requirements menjadi tanggung jawab dan persyaratan
    if (isEditMode && jobToEdit?.requirements) {
      let req = jobToEdit.requirements;
      if (req.includes('[HIDE_SALARY]')) {
        req = req.replace(/\[HIDE_SALARY\]/g, '').trim();
      }
      const parts = req.split(/\n(?=Persyaratan:)/i) // sederhana
      if (parts.length > 1) {
        setResponsibilities(parts[0].replace(/^Tanggung Jawab:\s*/i, '').trim())
        setRequirements(parts[1].replace(/^Persyaratan:\s*/i, '').trim())
      } else {
        setResponsibilities(req)
      }
    }
  }, [isEditMode, jobToEdit])

  const parseSalary = (range) => {
    const parts = range.split('-').map(s => s.trim().replace(/[^0-9]/g, ''))
    if (parts.length === 2 && parts[0] && parts[1]) {
      return { min: Number(parts[0]), max: Number(parts[1]) }
    }
    return { min: null, max: null }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !categoryId || !jobTypeId || !locationInput || !description) {
      showModal('Peringatan', 'Mohon lengkapi semua field wajib.', 'alert')
      return
    }

    setSaving(true)
    const { min, max } = parseSalary(salaryRange)
    let finalReq = `Tanggung Jawab:\n${responsibilities}\n\nPersyaratan:\n${requirements}`;
    if (hideSalary) {
      finalReq += '\n\n[HIDE_SALARY]';
    }

    const payload = {
      title,
      category_id: categoryId,
      job_type_id: jobTypeId,
      location: locationInput,
      salary_min: min,
      salary_max: max,
      description,
      requirements: finalReq,
    }

    const url = isEditMode
      ? `https://jobportal-api-zebb.onrender.com/api/jobs/${jobToEdit.id}`
      : 'https://jobportal-api-zebb.onrender.com/api/jobs'
    const method = isEditMode ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })
      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.message || 'Gagal menyimpan')
      }
      navigate('/kelola-lowongan')
    } catch (err) {
      showModal('Kesalahan', err.message, 'alert')
    } finally {
      setSaving(false)
    }
  }

  const handleBatal = () => {
    navigate('/kelola-lowongan')
  }

  return (
    <div className="bl-root">
      {/* SIDEBAR */}

      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      <aside className={`kl-sidebar ${isSidebarOpen ? "sidebar-open" : ""}`}>
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
      <main className="bl-main">
        <Link to="/kelola-lowongan" className="bl-back-link">
          <IkonArrowLeft /> Kembali ke Kelola Lowongan
        </Link>

        <h1 className="bl-page-title">{isEditMode ? 'Edit Lowongan' : 'Buka Lowongan Baru'}</h1>
        <p className="bl-page-subtitle">
          {isEditMode ? 'Perbarui detail posisi pekerjaan ini.' : 'Buat draf posisi baru untuk menjangkau kandidat terbaik di seluruh Indonesia.'}
        </p>

        <form className="bl-form-card" onSubmit={handleSubmit}>
          <div className="bl-form-group">
            <label className="bl-form-label">JUDUL PEKERJAAN</label>
            <input type="text" className="bl-input" placeholder="Contoh: Senior UI/UX Designer" required
              value={title} onChange={e => setTitle(e.target.value)} />
          </div>

          <div className="bl-form-row">
            <div className="bl-form-group">
              <label className="bl-form-label">KATEGORI</label>
              <div className="bl-select-wrap">
                <select className="bl-select" required value={categoryId} onChange={e => setCategoryId(e.target.value)}>
                  <option value="" disabled>Pilih Kategori</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bl-form-group">
              <label className="bl-form-label">TIPE PEKERJAAN</label>
              <div className="bl-select-wrap">
                <select className="bl-select" required value={jobTypeId} onChange={e => setJobTypeId(e.target.value)}>
                  <option value="" disabled>Pilih Tipe</option>
                  {jobTypes.map(tp => (
                    <option key={tp.id} value={tp.id}>{tp.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bl-form-row">
            <div className="bl-form-group">
              <label className="bl-form-label">LOKASI</label>
              <div className="bl-input-wrap">
                <div className="bl-input-icon left"><IkonMapPin /></div>
                <input type="text" className="bl-input with-icon-left" placeholder="Contoh: Jakarta Selatan / Remote" required
                  value={locationInput} onChange={e => setLocationInput(e.target.value)} />
              </div>
            </div>

            <div className="bl-form-group">
              <label className="bl-form-label">RENTANG GAJI (OPSIONAL)</label>
              <div className="bl-input-wrap">
                <span className="bl-input-text-icon">Rp</span>
                <input type="text" className="bl-input with-icon-left" placeholder="10.000.000 - 15.000.000"
                  value={salaryRange} onChange={e => setSalaryRange(e.target.value)} />
              </div>
              <label style={{ display: 'flex', alignItems: 'center', marginTop: '8px', cursor: 'pointer', fontSize: '14px', color: '#64748b' }}>
                <input type="checkbox" checked={hideSalary} onChange={e => setHideSalary(e.target.checked)} style={{ marginRight: '8px' }} />
                Sembunyikan Gaji dari Publik
              </label>
            </div>
          </div>

          <div className="bl-form-group" style={{ marginTop: '12px' }}>
            <label className="bl-form-label">DESKRIPSI PEKERJAAN</label>
            <span className="bl-form-hint">Berikan gambaran umum yang menarik tentang peran dan perusahaan Anda.</span>
            <textarea className="bl-textarea" placeholder="Tuliskan deskripsi pekerjaan di sini..." required
              value={description} onChange={e => setDescription(e.target.value)}></textarea>
          </div>

          <div className="bl-form-group">
            <label className="bl-form-label">TANGGUNG JAWAB UTAMA</label>
            <span className="bl-form-hint">Daftar tugas harian yang diharapkan dari kandidat.</span>
            <textarea className="bl-textarea" placeholder="- Merancang antarmuka pengguna...&#10;- Melakukan riset pengguna..."
              value={responsibilities} onChange={e => setResponsibilities(e.target.value)}></textarea>
          </div>

          <div className="bl-form-group">
            <label className="bl-form-label">PERSYARATAN</label>
            <span className="bl-form-hint">Kualifikasi teknis dan non-teknis yang dibutuhkan.</span>
            <textarea className="bl-textarea" placeholder="- Minimal 3 tahun pengalaman...&#10;- Menguasai Figma..."
              value={requirements} onChange={e => setRequirements(e.target.value)}></textarea>
          </div>

          <div className="bl-form-actions">
            <button type="button" className="bl-btn-draft" onClick={handleBatal}>
              Batal
            </button>
            <button type="submit" className="bl-btn-submit" disabled={saving}>
              {saving ? 'Menyimpan...' : 'Simpan Data'}
            </button>
          </div>
        </form>
      </main>

      <ModalAlert {...modal} onClose={closeModal} />
    </div>
  )
}