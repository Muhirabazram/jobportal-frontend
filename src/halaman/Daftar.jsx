import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './auth.css'

/* ── SVG ILUSTRASI PENCARI KERJA ── */
function IlustrasiPencariKerja() {
  return (
    <svg viewBox="0 0 520 380" xmlns="http://www.w3.org/2000/svg" className="ilustrasi-svg">
      <line x1="30" y1="280" x2="490" y2="280" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
      <line x1="30" y1="50" x2="30" y2="280" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <line x1="490" y1="50" x2="490" y2="280" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <line x1="30" y1="50" x2="490" y2="50" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />

      <rect x="45" y="65" width="155" height="160" rx="4" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2" />
      <line x1="122" y1="65" x2="122" y2="225" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <line x1="45" y1="145" x2="200" y2="145" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      {[80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190].map((y, i) => (
        <line key={i} x1="46" y1={y} x2="199" y2={y} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      ))}

      <rect x="230" y="58" width="250" height="12" rx="3" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2" />
      <rect x="245" y="30" width="22" height="28" rx="2" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" />
      <rect x="272" y="35" width="18" height="23" rx="2" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" />
      <rect x="295" y="38" width="20" height="20" rx="2" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" />
      <rect x="320" y="32" width="25" height="26" rx="2" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" />
      <rect x="350" y="36" width="18" height="22" rx="2" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" />
      <rect x="374" y="30" width="30" height="28" rx="2" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" />
      <rect x="410" y="38" width="55" height="20" rx="3" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" />

      <rect x="230" y="118" width="250" height="12" rx="3" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2" />
      <rect x="245" y="90" width="35" height="28" rx="2" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" />
      <rect x="285" y="94" width="28" height="24" rx="2" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" />
      <rect x="318" y="90" width="40" height="28" rx="2" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" />
      <circle cx="376" cy="107" r="11" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" />
      <rect x="395" y="92" width="30" height="26" rx="2" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" />
      <rect x="430" y="96" width="40" height="22" rx="2" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" />

      <rect x="50" y="238" width="420" height="20" rx="4" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" />
      <rect x="60" y="258" width="14" height="22" rx="2" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
      <rect x="446" y="258" width="14" height="22" rx="2" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />

      <rect x="185" y="160" width="165" height="76" rx="6" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="2.5" />
      <rect x="192" y="167" width="151" height="62" rx="3" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
      <line x1="220" y1="190" x2="285" y2="190" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      <line x1="220" y1="200" x2="310" y2="200" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <line x1="220" y1="210" x2="270" y2="210" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <line x1="267" y1="236" x2="267" y2="244" stroke="rgba(255,255,255,0.6)" strokeWidth="3" />
      <rect x="242" y="243" width="50" height="6" rx="3" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />

      <rect x="195" y="230" width="130" height="10" rx="3" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" />
      {[0, 1, 2, 3, 4, 5].map(i => (
        <line key={i} x1={208 + i * 19} y1="230" x2={208 + i * 19} y2="240" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      ))}

      <line x1="410" y1="238" x2="410" y2="205" stroke="rgba(255,255,255,0.65)" strokeWidth="2.5" />
      <line x1="410" y1="205" x2="435" y2="185" stroke="rgba(255,255,255,0.65)" strokeWidth="2.5" />
      <ellipse cx="442" cy="180" rx="16" ry="10" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
      <line x1="430" y1="188" x2="454" y2="188" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />

      <rect x="65" y="170" width="76" height="60" rx="10" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2.5" />
      <line x1="75" y1="185" x2="131" y2="185" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
      <line x1="75" y1="195" x2="131" y2="195" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
      <rect x="55" y="228" width="96" height="14" rx="7" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2.2" />
      <line x1="103" y1="242" x2="103" y2="262" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" />
      <line x1="75" y1="262" x2="131" y2="262" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
      <circle cx="75" cy="265" r="4" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
      <circle cx="103" cy="267" r="4" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
      <circle cx="131" cy="265" r="4" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
      <line x1="65" y1="210" x2="47" y2="218" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
      <rect x="40" y="216" width="14" height="5" rx="2.5" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
      <line x1="141" y1="210" x2="159" y2="218" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
      <rect x="152" y="216" width="14" height="5" rx="2.5" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
    </svg>
  )
}

/* ── SVG ILUSTRASI HRD ── */
function IlustrasiHRD() {
  return (
    <svg viewBox="0 0 520 380" xmlns="http://www.w3.org/2000/svg" className="ilustrasi-svg">
      <line x1="30" y1="270" x2="490" y2="270" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
      <line x1="30" y1="45" x2="30" y2="270" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <line x1="490" y1="45" x2="490" y2="270" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <line x1="30" y1="45" x2="490" y2="45" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />

      <rect x="45" y="60" width="130" height="95" rx="4" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.65)" strokeWidth="2" />
      <line x1="65" y1="82" x2="155" y2="82" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      <line x1="65" y1="96" x2="140" y2="96" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
      <line x1="65" y1="110" x2="148" y2="110" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
      <line x1="65" y1="124" x2="130" y2="124" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <line x1="80" y1="155" x2="80" y2="170" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
      <line x1="145" y1="155" x2="145" y2="170" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
      <line x1="68" y1="170" x2="157" y2="170" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />

      <rect x="290" y="55" width="185" height="115" rx="5" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.65)" strokeWidth="2" />
      <rect x="305" y="68" width="80" height="50" rx="3" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      <line x1="305" y1="80" x2="385" y2="80" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
      <line x1="305" y1="92" x2="375" y2="92" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
      <line x1="305" y1="104" x2="380" y2="104" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
      <rect x="400" y="100" width="15" height="35" rx="2" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
      <rect x="420" y="85" width="15" height="50" rx="2" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
      <rect x="440" y="92" width="15" height="43" rx="2" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
      <line x1="396" y1="135" x2="460" y2="135" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />

      <ellipse cx="260" cy="248" rx="210" ry="28" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" />
      <rect x="50" y="247" width="420" height="15" rx="2" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <line x1="145" y1="262" x2="130" y2="285" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
      <line x1="375" y1="262" x2="390" y2="285" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
      <line x1="115" y1="285" x2="160" y2="285" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
      <line x1="375" y1="285" x2="405" y2="285" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />

      <rect x="65" y="195" width="48" height="32" rx="8" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
      <rect x="60" y="225" width="58" height="10" rx="5" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" />
      <rect x="148" y="185" width="48" height="32" rx="8" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
      <rect x="143" y="215" width="58" height="10" rx="5" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" />
      <rect x="232" y="180" width="48" height="32" rx="8" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2" />
      <rect x="227" y="210" width="58" height="10" rx="5" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" />
      <rect x="316" y="185" width="48" height="32" rx="8" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
      <rect x="311" y="215" width="58" height="10" rx="5" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" />
      <rect x="400" y="195" width="48" height="32" rx="8" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
      <rect x="395" y="225" width="58" height="10" rx="5" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" />

      <rect x="180" y="235" width="40" height="8" rx="2" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
      <rect x="185" y="225" width="30" height="10" rx="2" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />

      <line x1="470" y1="270" x2="470" y2="230" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
      <ellipse cx="470" cy="215" rx="18" ry="22" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
      <line x1="470" y1="215" x2="458" y2="200" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
      <line x1="470" y1="215" x2="482" y2="202" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
      <rect x="460" y="268" width="20" height="15" rx="3" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" />
    </svg>
  )
}

export default function Daftar() {
  const navigate = useNavigate()
  const [peran, setPeran] = useState('pencari')
  const [nama, setNama] = useState('')
  const [namaPerusahaan, setNamaPerusahaan] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const isHRD = peran === 'hrd'

  const handleDaftar = async (e) => {
    e.preventDefault()
    const endpoint = isHRD ? '/api/register/employer' : '/api/register/job-seeker'
    const payload = {
      name: nama,
      email,
      password,
      password_confirmation: passwordConfirmation,
      company_name: isHRD ? namaPerusahaan : undefined, // Laravel butuh confirmation
    }
    if (isHRD) payload.company_name = namaPerusahaan

    try {
      const res = await fetch(`http://localhost:8000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Daftar gagal')

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('role', data.user.role)

      if (data.user.role === 'employer') navigate('/dashboard-hrd')
      else navigate('/dashboard')
    } catch (err) {
      setErrorMessage(err.message)
    }
  }

  return (
    <div className="auth-wrapper">
      {/* ═══════ PANEL KIRI ═══════ */}
      <div className="auth-left">
        <div className="auth-logo">
          <Link to="/" className="logo-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
            </svg>
            <span>JobPortal</span>
          </Link>
        </div>

        <div className="auth-ilustrasi">
          {isHRD ? <IlustrasiHRD /> : <IlustrasiPencariKerja />}
        </div>

        <div className="auth-kiri-teks">
          {isHRD ? (
            <>
              <h2 className="auth-kiri-judul">Bangun Tim<br />Terbaik Anda.</h2>
              <p className="auth-kiri-desk">
                Bergabunglah dan mulai temukan kandidat terbaik untuk memperkuat tim perusahaan Anda.
              </p>
            </>
          ) : (
            <>
              <h2 className="auth-kiri-judul">Mulai Karir<br />Cemerlangmu.</h2>
              <p className="auth-kiri-desk">
                Bergabunglah dengan ribuan profesional lainnya dan temukan pekerjaan impian Anda bersama kami.
              </p>
            </>
          )}
        </div>
      </div>

      {/* ═══════ PANEL KANAN ═══════ */}
      <div className="auth-right">
        <div className="auth-form-box">
          <div className="auth-heading">
            <h1 className="auth-judul">Buat Akun Baru</h1>
            <p className="auth-subjudul">Bergabunglah dan mulai perjalanan karir Anda.</p>
          </div>

          {/* Toggle */}
          <div className="auth-toggle">
            <button
              className={`toggle-btn ${peran === 'pencari' ? 'toggle-aktif' : ''}`}
              onClick={() => setPeran('pencari')}
            >
              Pencari Kerja
            </button>
            <button
              className={`toggle-btn ${peran === 'hrd' ? 'toggle-aktif' : ''}`}
              onClick={() => setPeran('hrd')}
            >
              HRD
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleDaftar}>
            <div className="auth-fields">
              {/* Nama Lengkap */}
              <div className="field-group">
                <label className="field-label">Nama Lengkap</label>
                <div className="field-input-wrap">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={nama}
                    onChange={e => setNama(e.target.value)}
                    className="field-input"
                  />
                </div>
              </div>

              {/* Nama Perusahaan – hanya HRD */}
              {isHRD && (
                <div className="field-group field-animate">
                  <label className="field-label">Nama Perusahaan</label>
                  <div className="field-input-wrap">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9,22 9,12 15,12 15,22" />
                    </svg>
                    <input
                      type="text"
                      placeholder="PT. Nama Perusahaan"
                      value={namaPerusahaan}
                      onChange={e => setNamaPerusahaan(e.target.value)}
                      className="field-input"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="field-group">
                <label className="field-label">Email</label>
                <div className="field-input-wrap">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <input
                    type="email"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="field-input"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="field-group">
                <label className="field-label">Password</label>
                <div className="field-input-wrap" style={{ position: 'relative' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="field-input"
                  />
                  <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                          <line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      )}
                    </button>
                </div>
              </div>
              
              {/* Konfirmasi Password */}
              <div className="field-group">
                <label className="field-label">Konfirmasi Password</label>
                <div className="field-input-wrap" style={{ position: 'relative' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    type={showPasswordConfirmation ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={passwordConfirmation}
                    onChange={e => setPasswordConfirmation(e.target.value)}
                    className="field-input"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                  >
                    {showPasswordConfirmation ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>


              <button className="btn-submit">
                {isHRD ? 'Daftar Sebagai HRD' : 'Daftar Sekarang'}
              </button>
            </div>

            <p className="auth-link-bawah">
              Sudah punya akun?{' '}
              <Link to="/login" className="link-blue">Masuk Sekarang</Link>
            </p>
          </form>
        </div>
      </div>

      {/* Modal Error */}
      {errorMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setErrorMessage('')} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-8 text-center" style={{ animation: 'bounce-in 0.3s ease' }}>
            <button
              onClick={() => setErrorMessage('')}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Pendaftaran Gagal</h3>
            <p className="text-gray-500 text-sm mb-6">
              {errorMessage}
            </p>
            <button
              onClick={() => setErrorMessage('')}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg transition-colors cursor-pointer"
            >
              Periksa Kembali
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
