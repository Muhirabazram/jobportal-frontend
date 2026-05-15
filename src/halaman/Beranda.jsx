import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Search, MapPin, Code2, Palette, Megaphone, Package, BarChart2, TrendingUp } from 'lucide-react'
import Footer from '../komponen/Footer'
import Navigasi from '../komponen/Navigasi'

const kategoriPekerjaan = [
  { ikon: <Code2 size={20} className="text-blue-500" />, nama: 'Engineering', jumlah: '320 Lowongan' },
  { ikon: <Palette size={20} className="text-purple-500" />, nama: 'Design', jumlah: '150 Lowongan' },
  { ikon: <Megaphone size={20} className="text-orange-500" />, nama: 'Marketing', jumlah: '210 Lowongan' },
  { ikon: <Package size={20} className="text-teal-500" />, nama: 'Product', jumlah: '80 Lowongan' },
  { ikon: <BarChart2 size={20} className="text-indigo-500" />, nama: 'Data Science', jumlah: '300 Lowongan' },
  { ikon: <TrendingUp size={20} className="text-green-500" />, nama: 'Sales', jumlah: '260 Lowongan' },
]

const langkahCaraKerja = [
  {
    nomor: '1',
    judul: 'Buat Akun',
    deskripsi: 'Daftar secara gratis dan lengkapi profil Anda dengan pengalaman, keahlian, dan portofolio.',
  },
  {
    nomor: '2',
    judul: 'Cari Kerja',
    deskripsi: 'Gunakan fitur pencarian cerdas kami untuk menemukan lowongan yang paling relevan.',
  },
  {
    nomor: '3',
    judul: 'Lamar & Diterima',
    deskripsi: 'Kirimkan lamaran Anda dengan satu klik. Lacak status dan bersiaplah untuk wawancara.',
  },
]

export default function Beranda() {
  const navigate = useNavigate();

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

  // State untuk input pencarian
  const [searchInput, setSearchInput] = useState('');
  const [locationInput, setLocationInput] = useState('');

  const [stats, setStats] = useState({
    job_count: 1850,
    company_count: 350,
    candidate_count: 12000,
  });

  useEffect(() => {
    fetch('https://jobportal-api-zebb.onrender.com/api/home-stats')
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error('Gagal fetch statistik:', err));
  }, []);

  // Fungsi untuk navigasi ke halaman CariKerja sambil membawa parameter
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchInput.trim()) params.append('search', searchInput.trim());
    if (locationInput.trim()) params.append('location', locationInput.trim());
    navigate(`/cari-kerja?${params.toString()}`);
  };

  // Fungsi untuk menangani tombol Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigasi />

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Temukan Pekerjaan Impian Anda<br />Hari Ini
          </h1>
          <p className="text-blue-100 text-base md:text-lg mb-8 max-w-xl mx-auto">
            Temukan ribuan peluang kerja dengan semua informasi yang Anda butuhkan. Ini adalah masa depan Anda.
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-xl p-2 flex flex-col md:flex-row gap-2 max-w-2xl mx-auto shadow-lg">
            <div className="flex items-center gap-2 flex-1 px-3">
              <Search size={18} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Posisi, kata kunci, atau perusahaan"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 text-gray-700 text-sm outline-none py-2 bg-transparent"
              />
            </div>
            <div className="w-px bg-gray-200 hidden md:block" />
            <div className="flex items-center gap-2 flex-1 px-3">
              <MapPin size={18} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Kota atau provinsi"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 text-gray-700 text-sm outline-none py-2 bg-transparent"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
            >
              Cari Kerja
            </button>
          </div>
        </div>

        {/* Statistik */}
        <div className="max-w-3xl mx-auto mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              className="bg-blue-500/40 backdrop-blur-sm rounded-xl py-5 text-center border border-blue-400/30">
              <div className="text-2xl font-bold text-white">{stats.job_count.toLocaleString('id-ID')}+</div>
              <div className="text-blue-200 text-sm mt-1">Lowongan Kerja</div>
            </div>

            <div
              className="bg-blue-500/40 backdrop-blur-sm rounded-xl py-5 text-center border border-blue-400/30">
              <div className="text-2xl font-bold text-white">{stats.company_count.toLocaleString('id-ID')}+</div>
              <div className="text-blue-200 text-sm mt-1">Perusahaan</div>
            </div>

            <div
              className="bg-blue-500/40 backdrop-blur-sm rounded-xl py-5 text-center border border-blue-400/30">
              <div className="text-2xl font-bold text-white">{stats.candidate_count.toLocaleString('id-ID')}+</div>
              <div className="text-blue-200 text-sm mt-1">Kandidat</div>
            </div>
          </div>
        </div>
      </section>

      {/* Kategori Pekerjaan */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Cari Pekerjaan Berdasarkan Kategori
            </h2>
            <p className="text-gray-500 text-sm">
              Temukan pekerjaan yang sesuai dengan keahlian dan minat Anda.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {kategoriPekerjaan.map((kat) => (
              <Link
                key={kat.nama}
                to={`/cari-kerja?category=${kat.nama.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center gap-3 border border-gray-200 rounded-xl p-4 hover:border-blue-400 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                  {kat.ikon}
                </div>
                <div>
                  <div className="font-semibold text-gray-800 text-sm">{kat.nama}</div>
                  <div className="text-gray-400 text-xs">{kat.jumlah}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cara Kerja */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Cara Kerja</h2>
            <p className="text-gray-500 text-sm">Dapatkan pekerjaan dalam 3 langkah mudah.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {langkahCaraKerja.map((langkah) => (
              <div key={langkah.nomor} className="text-center">
                <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {langkah.nomor}
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">{langkah.judul}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{langkah.deskripsi}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16 px-4 text-center text-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Siap untuk Memulai Perjalanan Anda?
          </h2>
          <p className="text-blue-100 text-sm mb-8">
            Bergabunglah dengan platform kami hari ini dan ambil langkah pertama menuju karir yang Anda impikan.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button onClick={() => navigate('/daftar')} className="border border-white text-white font-semibold text-sm px-6 py-2.5 rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
              Mulai Sekarang
            </button>
            <Link
              to="/cari-kerja"
              className="bg-white text-blue-600 font-semibold text-sm px-6 py-2.5 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Cari Kerja
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
