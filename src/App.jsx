import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Beranda from './halaman/Beranda'
import CariKerja from './halaman/CariKerja'
import Login from './halaman/Login'
import Daftar from './halaman/Daftar'
import DashboardPencari from './halaman/DashboardPencari'
import LowonganSaya from './halaman/LowonganSaya'
import LowonganDetail from './halaman/LowonganDetail'
import LowonganDisimpan from './halaman/LowonganDisimpan'
import LamaranTerkirim from './halaman/LamaranTerkirim'
import MenungguReview from './halaman/MenungguReview'
import Wawancara from './halaman/Wawancara'
import LamaranDiterima from './halaman/LamaranDiterima'
import LamaranDitolak from './halaman/LamaranDitolak'
import Pengaturan from './halaman/Pengaturan'
import DashboardHRD from './halaman/DashboardHRD'
import KelolaLowongan from './halaman/KelolaLowongan'
import BukaLowongan from './halaman/BukaLowongan'
import DataPelamar from './halaman/DataPelamar'
import PengaturanPencari from './halaman/PengaturanPencari'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute Publik */}
        <Route path="/" element={<Beranda />} />
        <Route path="/cari-kerja" element={<CariKerja />} />
        <Route path="/login" element={<Login />} />
        <Route path="/daftar" element={<Daftar />} />

        {/* Rute Terproteksi */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPencari /></ProtectedRoute>} />
        <Route path="/lowongan-saya" element={<ProtectedRoute><LowonganSaya /></ProtectedRoute>} />
        <Route path="/lowongan/:slug" element={<ProtectedRoute><LowonganDetail /></ProtectedRoute>} />
        <Route path="/lowongan-disimpan" element={<ProtectedRoute><LowonganDisimpan /></ProtectedRoute>} />
        <Route path="/lamaran-terkirim" element={<ProtectedRoute><LamaranTerkirim /></ProtectedRoute>} />
        <Route path="/menunggu-review" element={<ProtectedRoute><MenungguReview /></ProtectedRoute>} />
        <Route path="/wawancara" element={<ProtectedRoute><Wawancara /></ProtectedRoute>} />
        <Route path="/lamaran-diterima" element={<ProtectedRoute><LamaranDiterima /></ProtectedRoute>} />
        <Route path="/lamaran-ditolak" element={<ProtectedRoute><LamaranDitolak /></ProtectedRoute>} />
        <Route path="/pengaturan" element={<ProtectedRoute><Pengaturan /></ProtectedRoute>} />
        <Route path="/dashboard-hrd" element={<ProtectedRoute><DashboardHRD /></ProtectedRoute>} />
        <Route path="/kelola-lowongan" element={<ProtectedRoute><KelolaLowongan /></ProtectedRoute>} />
        <Route path="/buka-lowongan" element={<ProtectedRoute><BukaLowongan /></ProtectedRoute>} />
        <Route path="/data-pelamar" element={<ProtectedRoute><DataPelamar /></ProtectedRoute>} />
        <Route path="/pengaturan-pencari" element={<ProtectedRoute><PengaturanPencari /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
