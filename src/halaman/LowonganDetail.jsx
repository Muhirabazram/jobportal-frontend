import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { MapPin, Briefcase, CircleDollarSign, Building, Globe, X, LogIn, UserPlus } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navigasi from '../komponen/Navigasi'
import Footer from '../komponen/Footer'
import ModalAlert from '../komponen/ModalAlert'
import './dashboard.css' // gunakan styling yang sama dengan dashboard

export default function LowonganDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [lamarLoading, setLamarLoading] = useState(false)

  const [modal, setModal] = useState({ show: false, title: '', message: '', type: 'alert', onConfirm: null })
  const showModal = (title, message, type = 'alert', onConfirm = null) => setModal({ show: true, title, message, type, onConfirm })
  const closeModal = () => setModal(prev => ({ ...prev, show: false }))

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`https://jobportal-api-zebb.onrender.com/api/jobs/${slug}`)
        if (!res.ok) throw new Error('Lowongan tidak ditemukan')
        const data = await res.json()
        setJob(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchDetail()
  }, [slug])

  const handleLamar = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setShowLoginModal(true)
      return
    }

    setLamarLoading(true)
    try {
      const res = await fetch(`https://jobportal-api-zebb.onrender.com/api/jobs/${slug}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Gagal melamar')
      showModal('Sukses', 'Lamaran berhasil dikirim!', 'alert')
    } catch (err) {
      showModal('Kesalahan', err.message, 'alert')
    } finally {
      setLamarLoading(false)
    }
  }

  const formatGaji = (min, max) => {
    if (!min && !max) return 'Dirahasiakan'
    const fmt = (val) => val?.toLocaleString('id-ID')
    return min && max ? `Rp ${fmt(min)} – ${fmt(max)}` : `Rp ${fmt(min || max)}`
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Memuat...</div>
  if (error || !job) return <div className="min-h-screen flex items-center justify-center text-red-500">{error || 'Lowongan tidak ditemukan'}</div>

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigasi />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline mb-4">← Kembali</button>

        {/* Header Card */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{job.title}</h1>
              <p className="text-blue-600 font-medium mt-1">{job.company?.company_name}</p>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                <span className="flex items-center gap-1"><Briefcase size={14} /> {job.job_type?.name}</span>
                <span className="flex items-center gap-1"><CircleDollarSign size={14} /> {formatGaji(job.salary_min, job.salary_max)}</span>
              </div>
            </div>
            <button
              onClick={handleLamar}
              disabled={lamarLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition disabled:opacity-50"
            >
              {lamarLoading ? 'Mengirim...' : 'Lamar Sekarang'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Kolom Kiri - Deskripsi & Persyaratan */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Deskripsi Pekerjaan</h2>
              <p className="text-gray-600 whitespace-pre-wrap">{job.description}</p>
            </div>
            {job.requirements && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Persyaratan</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {job.requirements.split(/[,\n]+/).filter(Boolean).map((item, idx) => (
                    <li key={idx}>{item.trim()}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Kolom Kanan - Info Perusahaan */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Tentang Perusahaan</h2>
              <div className="flex items-center gap-2 mb-2">
                <Building size={16} className="text-gray-400" />
                <span className="text-gray-600">{job.company?.company_name}</span>
              </div>
              {job.company?.website && (
                <div className="flex items-center gap-2 mb-2">
                  <Globe size={16} className="text-gray-400" />
                  <a href={`https://${job.company.website}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{job.company.website}</a>
                </div>
              )}
              {job.company?.address && (
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={16} className="text-gray-400" />
                  <span className="text-gray-600">{job.company.address}</span>
                </div>
              )}
            </div>

            {/* Statistik perusahaan (dummy) */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Statistik Perusahaan</h2>
              <div className="flex justify-around text-center">
                <div>
                  <p className="text-xl font-bold text-gray-800">50-100</p>
                  <p className="text-sm text-gray-500">Karyawan</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-800">2010</p>
                  <p className="text-sm text-gray-500">Berdiri</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-800">15</p>
                  <p className="text-sm text-gray-500">Lowongan Aktif</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Modal Login (muncul jika belum login) */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowLoginModal(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-sm mx-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4">Login Diperlukan</h3>
            <p className="text-gray-500 text-sm mb-6">Silakan login atau daftar untuk melamar pekerjaan ini.</p>
            <div className="flex gap-3">
              <Link to="/login" className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg">Login</Link>
              <Link to="/daftar" className="flex-1 border border-blue-600 text-blue-600 text-center py-2 rounded-lg">Daftar</Link>
            </div>
          </div>
        </div>
      )}

      <ModalAlert {...modal} onClose={closeModal} />
    </div>
  )
}