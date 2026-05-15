import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Briefcase } from 'lucide-react'

export default function Navigasi() {
  const lokasi = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  // Cek localStorage setiap kali komponen dimount
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        setUser(null)
      }
    }
  }, [])

  const isAktif = (path) => lokasi.pathname === path

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    setUser(null)
    navigate('/')
  }

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between h-auto py-3 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl">
            <Briefcase size={22} className="text-blue-600" />
            <span>JobPortal</span>
          </Link>

          {/* Menu Tengah */}
          <div className="flex items-center gap-6 md:gap-8 order-last w-full md:w-auto md:order-none justify-center">
            <Link
              to="/"
              className={`text-sm font-medium pb-1 transition-colors ${
                isAktif('/')
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              BERANDA
            </Link>
            <Link
              to="/cari-kerja"
              className={`text-sm font-medium pb-1 transition-colors ${
                isAktif('/cari-kerja')
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              CARI KERJA
            </Link>
          </div>

          {/* Tombol Auth / User Menu */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link
                  to={user.role === 'employer' ? '/dashboard-hrd' : '/dashboard'}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors px-2"
                >
                  {user.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors px-3 py-1 border border-red-200 rounded-lg"
                >
                  Keluar
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors px-4 py-2">
                  Login
                </Link>
                <Link to="/daftar" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors">
                  Daftar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}