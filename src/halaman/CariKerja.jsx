import { useState, useEffect } from 'react'
import { Search, MapPin, MapPinned, Briefcase, CircleDollarSign, ChevronDown, X, LogIn, UserPlus } from 'lucide-react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Navigasi from '../komponen/Navigasi'
import Footer from '../komponen/Footer'

const kategoriFilter = ['Engineering', 'Design', 'Marketing', 'Product', 'Data Science', 'Sales'] // untuk fallback nama
const tipeFilter = ['Full-time', 'Part-time', 'Remote', 'Kontrak']

export default function CariKerja() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams(); // ambil parameter URL

  // Redirect jika sudah login
  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    if (token) {
      if (role === 'employer') {
        navigate('/dashboard-hrd')
      } else {
        navigate('/dashboard')
      }
    }
  }, [navigate])

  // Inisialisasi dari parameter URL (jika ada)
  const initialSearch = searchParams.get('search') || '';
  const initialLocation = searchParams.get('location') || '';
  const initialCategory = searchParams.get('category');

  const [kategoriDipilih, setKategoriDipilih] = useState(initialCategory ? [initialCategory] : []) // simpan slug
  const [tipeDipilih, setTipeDipilih] = useState([])       // simpan slug
  const [kataCari, setKataCari] = useState(initialSearch)               // dari parameter
  const [lokasiCari, setLokasiCari] = useState(initialLocation)         // dari parameter
  const [kataCariAktif, setKataCariAktif] = useState(initialSearch)     // langsung aktif
  const [lokasiCariAktif, setLokasiCariAktif] = useState(initialLocation) // langsung aktif
  const [urutkan, setUrutkan] = useState('Semua')
  const [showModalLogin, setShowModalLogin] = useState(false)

  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [kategoriList, setKategoriList] = useState([]) // [{name, slug}]
  const [tipeList, setTipeList] = useState([])         // [{name, slug}]

  // Ambil daftar kategori & tipe dari backend
  useEffect(() => {
    fetch('https://jobportal-api-zebb.onrender.com/api/categories')
      .then(res => res.json())
      .then(data => setKategoriList(data))
      .catch(err => console.error('Gagal fetch kategori', err))
    fetch('https://jobportal-api-zebb.onrender.com/api/job-types')
      .then(res => res.json())
      .then(data => setTipeList(data))
      .catch(err => console.error('Gagal fetch job-types', err))
  }, [])

  // Fungsi fetch lowongan
  const fetchJobs = async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (kataCariAktif) params.append('search', kataCariAktif)
    if (lokasiCariAktif) params.append('location', lokasiCariAktif)
    kategoriDipilih.forEach(slug => params.append('categories[]', slug))
    tipeDipilih.forEach(slug => params.append('job_types[]', slug))

    try {
      const res = await fetch(`https://jobportal-api-zebb.onrender.com/api/jobs?${params.toString()}`)
      const data = await res.json()
      setJobs(data.data) // Laravel paginate: { data: [...], ... }
    } catch (err) {
      console.error('Gagal fetch jobs', err)
    } finally {
      setLoading(false)
    }
  }

  // Panggil fetchJobs saat komponen mount, dan setiap kali filter berubah
  useEffect(() => {
    fetchJobs()
  }, [kataCariAktif, lokasiCariAktif, kategoriDipilih, tipeDipilih])

  const toggleKategori = (slug) => {
    setKategoriDipilih(prev =>
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    )
  }

  const toggleTipe = (slug) => {
    setTipeDipilih(prev =>
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    )
  }

  const handleCari = () => {
    setKataCariAktif(kataCari)
    setLokasiCariAktif(lokasiCari)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleCari()
  }

  // Helper: dapatkan warna latar & ikon berdasarkan kategori
  const getWarnaKategori = (namaKategori) => {
    const map = {
      Engineering: { bg: 'bg-blue-100', ikon: 'text-blue-500' },
      Design: { bg: 'bg-pink-100', ikon: 'text-pink-500' },
      Marketing: { bg: 'bg-orange-100', ikon: 'text-orange-500' },
      Product: { bg: 'bg-purple-100', ikon: 'text-purple-500' },
      'Data Science': { bg: 'bg-yellow-100', ikon: 'text-yellow-600' },
      Sales: { bg: 'bg-teal-100', ikon: 'text-teal-600' },
    }
    return map[namaKategori] || { bg: 'bg-gray-100', ikon: 'text-gray-500' }
  }

  // Helper: format gaji
  const formatGaji = (min, max, isHidden) => {
    if (isHidden || (!min && !max)) return 'Dirahasiakan'
    const fmt = (val) => val?.toLocaleString('id-ID')
    if (min && max) return `Rp ${fmt(min)} - ${fmt(max)}`
    if (min) return `Mulai Rp ${fmt(min)}`
    return `Hingga Rp ${fmt(max)}`
  }

  // Menentukan urutan dan filter berdasarkan state 'urutkan'
  let displayedJobs = [...jobs]

  if (urutkan === 'Terbaru') {
    const batasWaktu = new Date()
    batasWaktu.setDate(batasWaktu.getDate() - 7)

    displayedJobs = displayedJobs.filter(job => new Date(job.created_at) >= batasWaktu)
    displayedJobs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  } else if (urutkan === 'Gaji Tertinggi') {
    displayedJobs = displayedJobs.filter(job => (job.salary_min && job.salary_min > 2000000) || (job.salary_max && job.salary_max > 2000000))
    displayedJobs.sort((a, b) => {
      const gajiA = Math.max(a.salary_max || 0, a.salary_min || 0)
      const gajiB = Math.max(b.salary_max || 0, b.salary_min || 0)
      return gajiB - gajiA
    })
  } else if (urutkan === 'Relevan') {
    // Mengurutkan berdasarkan rekomendasi/relevansi (menggunakan applicants_count jika ada, atau id sebagai simulasi relevansi)
    displayedJobs.sort((a, b) => {
      const scoreA = a.applicants_count || a.id || 0
      const scoreB = b.applicants_count || b.id || 0
      return scoreB - scoreA
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigasi />

      {/* Modal Harus Login */}
      {showModalLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowModalLogin(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-8 animate-bounce-in">
            <button
              onClick={() => setShowModalLogin(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogIn size={28} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Login Diperlukan</h3>
              <p className="text-gray-500 text-sm">
                Silakan login atau daftar untuk melihat detail lowongan dan melamar pekerjaan.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3 rounded-xl text-center transition-colors flex items-center justify-center gap-2"
              >
                <LogIn size={16} />
                Login Sekarang
              </Link>
              <Link
                to="/daftar"
                className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold text-sm py-3 rounded-xl text-center transition-colors flex items-center justify-center gap-2"
              >
                <UserPlus size={16} />
                Daftar Akun Baru
              </Link>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filter */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm sticky top-20">
              <h2 className="font-bold text-gray-800 text-base mb-5">Filter Pencarian</h2>

              {/* Filter Kategori */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Kategori</p>
                <div className="space-y-2.5">
                  {/* Gunakan data dari API, fallback ke array statis jika kosong */}
                  {(kategoriList.length > 0 ? kategoriList : kategoriFilter.map(k => ({ name: k, slug: k.toLowerCase().replace(/\s+/g, '-') }))).map((kat) => (
                    <label key={kat.slug} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={kategoriDipilih.includes(kat.slug)}
                        onChange={() => toggleKategori(kat.slug)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 accent-blue-600 cursor-pointer"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">{kat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter Tipe Pekerjaan */}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Tipe Pekerjaan</p>
                <div className="space-y-2.5">
                  {(tipeList.length > 0 ? tipeList : tipeFilter.map(t => ({ name: t, slug: t.toLowerCase().replace(/\s+/g, '-') }))).map((tipe) => (
                    <label key={tipe.slug} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={tipeDipilih.includes(tipe.slug)}
                        onChange={() => toggleTipe(tipe.slug)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 accent-blue-600 cursor-pointer"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">{tipe.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Reset Filter */}
              {(kategoriDipilih.length > 0 || tipeDipilih.length > 0) && (
                <button
                  onClick={() => { setKategoriDipilih([]); setTipeDipilih([]) }}
                  className="mt-5 w-full text-xs text-red-500 hover:text-red-700 font-medium py-2 border border-red-200 hover:border-red-400 rounded-lg transition-colors"
                >
                  Reset Filter
                </button>
              )}
            </div>
          </aside>

          {/* Konten Utama */}
          <div className="flex-1 min-w-0">
            {/* Search Bar */}
            <div className="bg-white rounded-xl border border-gray-200 p-2 flex flex-col md:flex-row gap-2 shadow-sm mb-5">
              <div className="flex items-center gap-2 flex-1 px-3 py-1 border-b md:border-b-0 md:border-r border-gray-200">
                <Search size={18} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Posisi, kata kunci, atau perusahaan"
                  value={kataCari}
                  onChange={(e) => setKataCari(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 text-gray-700 text-sm outline-none py-2 bg-transparent"
                />
              </div>
              <div className="flex items-center gap-2 flex-1 px-3">
                <MapPin size={18} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Kota atau lokasi (contoh: Jakarta)"
                  value={lokasiCari}
                  onChange={(e) => setLokasiCari(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 text-gray-700 text-sm outline-none py-2 bg-transparent"
                />
              </div>
              <button
                onClick={handleCari}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors"
              >
                Cari
              </button>
            </div>

            {/* Info Hasil + Urutkan */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <p className="font-bold text-gray-800 text-lg">
                {displayedJobs.length} lowongan ditemukan
                {(kataCariAktif || lokasiCariAktif) && (
                  <span className="text-sm font-normal text-gray-400 ml-2">
                    untuk "{[kataCariAktif, lokasiCariAktif].filter(Boolean).join(' · ')}"
                  </span>
                )}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Urutkan:</span>
                <div className="relative">
                  <select
                    value={urutkan}
                    onChange={(e) => setUrutkan(e.target.value)}
                    className="appearance-none bg-transparent text-blue-600 font-semibold pr-5 cursor-pointer outline-none"
                  >
                    <option>Semua</option>
                    <option>Terbaru</option>
                    <option>Relevan</option>
                    <option>Gaji Tertinggi</option>
                  </select>
                  <ChevronDown size={14} className="text-blue-600 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Daftar Lowongan */}
            {loading && (
              <div className="text-center py-16">
                <p className="text-gray-400">Memuat lowongan...</p>
              </div>
            )}
            {!loading && displayedJobs.length === 0 && !(kataCariAktif || lokasiCariAktif || kategoriDipilih.length > 0 || tipeDipilih.length > 0) ? (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-16 text-center">
                <Search size={40} className="text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">Belum ada lowongan tersedia</p>
                <p className="text-gray-400 text-sm mt-1">Silakan cek kembali nanti.</p>
              </div>
            ) : !loading && displayedJobs.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-16 text-center">
                <Search size={40} className="text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">Tidak ada lowongan yang cocok</p>
                <p className="text-gray-400 text-sm mt-1">Coba ubah kata kunci atau filter pencarian Anda.</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm divide-y divide-gray-100">
                {displayedJobs.map((job) => {
                  const namaKategori = job.category?.name || 'Lainnya'
                  const warna = getWarnaKategori(namaKategori)

                  // Parsing Tanggung Jawab dan Persyaratan jika tergabung dalam satu string requirements
                  let tanggungJawabArr = job.responsibilities
                    ? job.responsibilities.split(/[\n]+/).map(s => s.replace(/^[-•*]\s*/, '').trim()).filter(Boolean)
                    : [];
                  let persyaratanArr = [];
                  let reqText = job.requirements || '';

                  const isHidden = reqText.includes('[HIDE_SALARY]');
                  reqText = reqText.replace(/\[HIDE_SALARY\]/g, '').trim();

                  if (!job.responsibilities && reqText) {
                    const tjMatch = reqText.match(/tanggung\s*jawab\s*:?/i);
                    const pMatch = reqText.match(/persyaratan\s*:?/i);

                    if (tjMatch && pMatch) {
                      const tjIdx = tjMatch.index;
                      const pIdx = pMatch.index;
                      if (tjIdx < pIdx) {
                        const tjStr = reqText.substring(tjIdx + tjMatch[0].length, pIdx);
                        const pStr = reqText.substring(pIdx + pMatch[0].length);
                        tanggungJawabArr = tjStr.split(/[\n]+/).map(s => s.replace(/^[-•*]\s*/, '').trim()).filter(Boolean);
                        persyaratanArr = pStr.split(/[\n]+/).map(s => s.replace(/^[-•*]\s*/, '').trim()).filter(Boolean);
                      } else {
                        const pStr = reqText.substring(pIdx + pMatch[0].length, tjIdx);
                        const tjStr = reqText.substring(tjIdx + tjMatch[0].length);
                        persyaratanArr = pStr.split(/[\n]+/).map(s => s.replace(/^[-•*]\s*/, '').trim()).filter(Boolean);
                        tanggungJawabArr = tjStr.split(/[\n]+/).map(s => s.replace(/^[-•*]\s*/, '').trim()).filter(Boolean);
                      }
                    } else {
                      // Fallback: Jika tidak ada kata kunci, anggap semua sebagai persyaratan (dipisah pakai koma/titik/newline)
                      persyaratanArr = reqText.split(/[,.\n]+/).map(s => s.replace(/^[-•*]\s*/, '').trim()).filter(Boolean);
                    }
                  } else if (reqText) {
                    persyaratanArr = reqText.split(/[,.\n]+/).map(s => s.replace(/^[-•*]\s*/, '').trim()).filter(Boolean);
                  }

                  // Batasi tampilan maksimal 3 item
                  tanggungJawabArr = tanggungJawabArr.slice(0, 3);
                  persyaratanArr = persyaratanArr.slice(0, 3);

                  return (
                    <div key={job.id} className="p-5 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-4">
                        {/* Logo Perusahaan */}
                        {job.company?.logo ? (
                          <img
                            src={`https://jobportal-api-zebb.onrender.com/storage/${job.company.logo}`}
                            alt={job.company?.company_name || 'Logo'}
                            className="w-14 h-14 rounded-xl object-cover shrink-0 border border-gray-100"
                          />
                        ) : (
                          <div className={`w-14 h-14 rounded-xl ${warna.bg} flex items-center justify-center shrink-0`}>
                            <Briefcase size={24} className={warna.ikon} />
                          </div>
                        )}

                        {/* Info Lowongan */}
                        <div className="flex-1 min-w-0 w-full">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                            <div>
                              <h3 className="font-bold text-gray-800 text-base">{job.title}</h3>
                              <p className="text-gray-500 text-sm mt-0.5">{job.company?.company_name || 'Perusahaan'}</p>

                              <div className="flex flex-wrap gap-2 mt-2">
                                {job.category?.name && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                    {job.category.name}
                                  </span>
                                )}
                                {job.job_type?.name && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                    {job.job_type.name}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-left sm:text-right shrink-0">
                              <p className="text-xs text-gray-400 mb-2 sm:mb-3">{job.created_at ? new Date(job.created_at).toLocaleDateString('id-ID') : ''}</p>
                              <button
                                onClick={() => {
                                  const token = localStorage.getItem('token')
                                  if (token) {
                                    navigate(`/lowongan/${job.slug}`)
                                  } else {
                                    setShowModalLogin(true)
                                  }
                                }}
                                className="bg-indigo-100 hover:bg-indigo-200 text-indigo-600 font-semibold text-sm px-4 py-2 rounded-lg transition-colors cursor-pointer"
                              >
                                Lihat Detail
                              </button>
                            </div>
                          </div>

                          {/* Tanggung Jawab & Persyaratan */}
                          <div className="mt-4 mb-4 text-sm text-gray-700">
                            {tanggungJawabArr.length > 0 && (
                              <div className="mb-3">
                                <p className="text-gray-800 mb-1">Tanggung Jawab :</p>
                                <ul className="list-disc list-inside space-y-0.5 text-gray-600 ml-1">
                                  {tanggungJawabArr.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {persyaratanArr.length > 0 && (
                              <div>
                                <p className="text-gray-800 mb-1">Persyaratan :</p>
                                <ul className="list-disc list-inside space-y-0.5 text-gray-600 ml-1">
                                  {persyaratanArr.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>

                          {/* Detail Lokasi, Tipe, Gaji */}
                          <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <MapPinned size={14} />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Briefcase size={14} />
                              <span>{job.job_type?.name || 'Tidak diketahui'}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <CircleDollarSign size={14} />
                              <span>{formatGaji(job.salary_min, job.salary_max, isHidden)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}