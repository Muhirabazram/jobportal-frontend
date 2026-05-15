import { Link } from 'react-router-dom'
import { Briefcase, Share2, Link2 } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Kolom Brand */}
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
              <Briefcase size={20} className="text-white" />
              <span>JobPortal</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Menghubungkan talenta terbaik dengan peluang tak terbatas di seluruh Indonesia.
            </p>
            <div className="flex items-center gap-3">
              <button className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:border-gray-400 transition-colors">
                <Share2 size={14} />
              </button>
              <button className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:border-gray-400 transition-colors">
                <Link2 size={14} />
              </button>
            </div>
          </div>

          {/* Kolom Pencari Kerja */}
          <div>
            <h4 className="text-white font-semibold mb-4">Pencari Kerja</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/cari-kerja" className="hover:text-white transition-colors">Cari Pekerjaan</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Buat Resume</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tips Karir</a></li>
            </ul>
          </div>

          {/* Kolom Perusahaan */}
          <div>
            <h4 className="text-white font-semibold mb-4">Perusahaan</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Pasang Lowongan</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cari Kandidat</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Harga Paket</a></li>
            </ul>
          </div>

          {/* Kolom Tautan Berguna */}
          <div>
            <h4 className="text-white font-semibold mb-4">Tautan Berguna</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pusat Bantuan</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Syarat &amp; Ketentuan</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kontak</a></li>
            </ul>
          </div>
        </div>

        {/* Garis Bawah */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-sm text-gray-500">
          © 2024 JobPortal Indonesia. Semua Hak Dilindungi.
        </div>
      </div>
    </footer>
  )
}
