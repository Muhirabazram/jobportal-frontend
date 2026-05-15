import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './auth.css'

/* ── SVG ILUSTRASI PENCARI KERJA (workspace) ── */
function IlustrasiPencariKerja() {
  return (
    <svg viewBox="0 0 520 380" xmlns="http://www.w3.org/2000/svg" className="ilustrasi-svg">
      {/* Lantai & dinding */}
      <line x1="30" y1="280" x2="490" y2="280" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
      <line x1="30" y1="50" x2="30" y2="280" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <line x1="490" y1="50" x2="490" y2="280" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <line x1="30" y1="50" x2="490" y2="50" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />

      {/* Jendela kiri */}
      <rect x="45" y="65" width="155" height="160" rx="4" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2" />
      <line x1="122" y1="65" x2="122" y2="225" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <line x1="45" y1="145" x2="200" y2="145" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      {/* Tirai jendela */}
      {[80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190].map((y, i) => (
        <line key={i} x1="46" y1={y} x2="199" y2={y} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      ))}

      {/* Rak dinding kanan */}
      <rect x="230" y="58" width="250" height="12" rx="3" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2" />
      {/* Item di rak atas */}
      <rect x="245" y="30" width="22" height="28" rx="2" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" />
      <rect x="272" y="35" width="18" height="23" rx="2" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" />
      <rect x="295" y="38" width="20" height="20" rx="2" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" />
      <rect x="320" y="32" width="25" height="26" rx="2" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" />
      <rect x="350" y="36" width="18" height="22" rx="2" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" />
      <rect x="374" y="30" width="30" height="28" rx="2" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" />
      <rect x="410" y="38" width="55" height="20" rx="3" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" />

      {/* Rak kedua */}
      <rect x="230" y="118" width="250" height="12" rx="3" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2" />
      <rect x="245" y="90" width="35" height="28" rx="2" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" />
      <rect x="285" y="94" width="28" height="24" rx="2" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" />
      <rect x="318" y="90" width="40" height="28" rx="2" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" />
      <rect x="365" y="96" width="22" height="22" rx="11" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" />
      <rect x="395" y="92" width="30" height="26" rx="2" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" />
      <rect x="430" y="96" width="40" height="22" rx="2" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" />

      {/* Meja */}
      <rect x="50" y="238" width="420" height="20" rx="4" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" />
      {/* Kaki meja kiri */}
      <rect x="60" y="258" width="14" height="22" rx="2" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
      {/* Kaki meja kanan */}
      <rect x="446" y="258" width="14" height="22" rx="2" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />

      {/* Monitor */}
      <rect x="185" y="160" width="165" height="76" rx="6" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="2.5" />
      {/* Layar dalam */}
      <rect x="192" y="167" width="151" height="62" rx="3" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
      {/* Kursor monitor */}
      <line x1="220" y1="190" x2="285" y2="190" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      <line x1="220" y1="200" x2="310" y2="200" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <line x1="220" y1="210" x2="270" y2="210" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      {/* Leher monitor */}
      <line x1="267" y1="236" x2="267" y2="244" stroke="rgba(255,255,255,0.6)" strokeWidth="3" />
      <rect x="242" y="243" width="50" height="6" rx="3" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />

      {/* Keyboard */}
      <rect x="195" y="230" width="130" height="10" rx="3" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" />
      {[0, 1, 2, 3, 4, 5].map(i => (
        <line key={i} x1={208 + i * 19} y1="230" x2={208 + i * 19} y2="240" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      ))}

      {/* Lampu meja */}
      <line x1="410" y1="238" x2="410" y2="205" stroke="rgba(255,255,255,0.65)" strokeWidth="2.5" />
      <line x1="410" y1="205" x2="435" y2="185" stroke="rgba(255,255,255,0.65)" strokeWidth="2.5" />
      <ellipse cx="442" cy="180" rx="16" ry="10" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
      <line x1="430" y1="188" x2="454" y2="188" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />

      {/* Kursi kantor */}
      {/* Sandaran */}
      <rect x="65" y="170" width="76" height="60" rx="10" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2.5" />
      <line x1="75" y1="185" x2="131" y2="185" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
      <line x1="75" y1="195" x2="131" y2="195" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
      {/* Dudukan */}
      <rect x="55" y="228" width="96" height="14" rx="7" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2.2" />
      {/* Tiang */}
      <line x1="103" y1="242" x2="103" y2="262" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" />
      {/* Roda */}
      <line x1="75" y1="262" x2="131" y2="262" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
      <circle cx="75" cy="265" r="4" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
      <circle cx="103" cy="267" r="4" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
      <circle cx="131" cy="265" r="4" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
      {/* Armrest */}
      <line x1="65" y1="210" x2="47" y2="218" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
      <rect x="40" y="216" width="14" height="5" rx="2.5" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
      <line x1="141" y1="210" x2="159" y2="218" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
      <rect x="152" y="216" width="14" height="5" rx="2.5" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
    </svg>
  )
}

/* ── SVG ILUSTRASI HRD (meeting room) ── */
function IlustrasiHRD() {
  return (
    <svg viewBox="0 0 520 380" xmlns="http://www.w3.org/2000/svg" className="ilustrasi-svg">
      {/* Dinding & lantai */}
      <line x1="30" y1="270" x2="490" y2="270" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
      <line x1="30" y1="45" x2="30" y2="270" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <line x1="490" y1="45" x2="490" y2="270" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <line x1="30" y1="45" x2="490" y2="45" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />

      {/* Whiteboard kiri */}
      <rect x="45" y="60" width="130" height="95" rx="4" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.65)" strokeWidth="2" />
      <line x1="65" y1="82" x2="155" y2="82" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      <line x1="65" y1="96" x2="140" y2="96" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
      <line x1="65" y1="110" x2="148" y2="110" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
      <line x1="65" y1="124" x2="130" y2="124" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      {/* Kaki whiteboard */}
      <line x1="80" y1="155" x2="80" y2="170" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
      <line x1="145" y1="155" x2="145" y2="170" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
      <line x1="68" y1="170" x2="157" y2="170" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />

      {/* Layar proyektor kanan */}
      <rect x="290" y="55" width="185" height="115" rx="5" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.65)" strokeWidth="2" />
      {/* Konten layar */}
      <rect x="305" y="68" width="80" height="50" rx="3" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      <line x1="305" y1="80" x2="385" y2="80" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
      <line x1="305" y1="92" x2="375" y2="92" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
      <line x1="305" y1="104" x2="380" y2="104" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
      {/* Grafik bar di layar */}
      <rect x="400" y="100" width="15" height="35" rx="2" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
      <rect x="420" y="85" width="15" height="50" rx="2" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
      <rect x="440" y="92" width="15" height="43" rx="2" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
      <line x1="396" y1="135" x2="460" y2="135" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />

      {/* Meja rapat */}
      <ellipse cx="260" cy="248" rx="210" ry="28" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" />
      <rect x="50" y="247" width="420" height="15" rx="2" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      {/* Kaki meja */}
      <line x1="145" y1="262" x2="130" y2="285" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
      <line x1="375" y1="262" x2="390" y2="285" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
      <line x1="115" y1="285" x2="160" y2="285" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
      <line x1="375" y1="285" x2="405" y2="285" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />

      {/* Kursi-kursi peserta */}
      {/* Kursi atas-kiri */}
      <rect x="65" y="195" width="48" height="32" rx="8" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
      <rect x="60" y="225" width="58" height="10" rx="5" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" />
      {/* Kursi atas-tengah */}
      <rect x="148" y="185" width="48" height="32" rx="8" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
      <rect x="143" y="215" width="58" height="10" rx="5" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" />
      {/* Kursi atas-tengah2 */}
      <rect x="232" y="180" width="48" height="32" rx="8" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2" />
      <rect x="227" y="210" width="58" height="10" rx="5" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" />
      {/* Kursi atas-kanan */}
      <rect x="316" y="185" width="48" height="32" rx="8" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
      <rect x="311" y="215" width="58" height="10" rx="5" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" />
      {/* Kursi atas-kanan2 */}
      <rect x="400" y="195" width="48" height="32" rx="8" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
      <rect x="395" y="225" width="58" height="10" rx="5" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" />

      {/* Laptop di meja */}
      <rect x="180" y="235" width="40" height="8" rx="2" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
      <rect x="185" y="225" width="30" height="10" rx="2" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />

      {/* Tanaman pojok */}
      <line x1="470" y1="270" x2="470" y2="230" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
      <ellipse cx="470" cy="215" rx="18" ry="22" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
      <line x1="470" y1="215" x2="458" y2="200" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
      <line x1="470" y1="215" x2="482" y2="202" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
      <rect x="460" y="268" width="20" height="15" rx="3" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" />
    </svg>
  )
}

export default function Login() {
  const navigate = useNavigate()
  const [peran, setPeran] = useState('pencari')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // State Lupa Password
  const [showForgotModal, setShowForgotModal] = useState(false)
  const [forgotStep, setForgotStep] = useState(1) // 1: input email, 2: input new password, 3: success
  const [forgotEmail, setForgotEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [forgotLoading, setForgotLoading] = useState(false)
  const [forgotError, setForgotError] = useState('')
  const [captchaVerified, setCaptchaVerified] = useState(false)
  const [captchaLoading, setCaptchaLoading] = useState(false)

  const isHRD = peran === 'hrd'

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('https://jobportal-api-zebb.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Login gagal')

      // Simpan token & user ke localStorage
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('role', data.user.role)
      if (data.user.avatar_url) {
        localStorage.setItem('user_avatar', data.user.avatar_url)
      } else {
        localStorage.removeItem('user_avatar')
      }

      // Arahkan sesuai role
      if (data.user.role === 'employer') navigate('/dashboard-hrd')
      else navigate('/dashboard')
    } catch (err) {
      setErrorMessage(err.message)
    }
  }

  const handleLupaPasswordSubmit = async (e) => {
    e.preventDefault()
    setForgotError('')

    if (forgotStep === 1) {
      if (!forgotEmail) {
        setForgotError('Masukkan email Anda terlebih dahulu.')
        return
      }
      if (!captchaVerified) {
        setForgotError('Harap selesaikan verifikasi CAPTCHA.')
        return
      }
      setForgotLoading(true)

      try {
        const res = await fetch('https://jobportal-api-zebb.onrender.com/api/check-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: forgotEmail })
        })
        const data = await res.json()

        // Tangkap pesan error dari validasi Laravel
        if (!res.ok) {
          const errorMsg = data.errors?.email?.[0] || data.message || 'Email tidak terdaftar.'
          throw new Error(errorMsg)
        }

        setForgotLoading(false)
        setForgotStep(2)
      } catch (err) {
        setForgotLoading(false)
        setForgotError(err.message)
      }
    } else if (forgotStep === 2) {
      if (!newPassword || newPassword.length < 8) {
        setForgotError('Password baru minimal 8 karakter.')
        return
      }
      setForgotLoading(true)

      try {
        const res = await fetch('https://jobportal-api-zebb.onrender.com/api/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: forgotEmail, new_password: newPassword })
        })
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.message || 'Gagal mereset password.')
        }

        setForgotLoading(false)
        setForgotStep(3)
      } catch (err) {
        setForgotLoading(false)
        setForgotError(err.message)
      }
    }
  }

  const closeForgotModal = () => {
    setShowForgotModal(false)
    setForgotStep(1)
    setForgotEmail('')
    setNewPassword('')
    setForgotError('')
    setCaptchaVerified(false)
    setCaptchaLoading(false)
  }

  const handleCaptchaClick = () => {
    if (captchaVerified || captchaLoading) return
    setCaptchaLoading(true)
    setTimeout(() => {
      setCaptchaLoading(false)
      setCaptchaVerified(true)
      setForgotError('')
    }, 1200)
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
              <h2 className="auth-kiri-judul">Rekrut Talenta<br />Terbaik.</h2>
              <p className="auth-kiri-desk">
                Temukan kandidat terbaik yang siap berkontribusi untuk perusahaan Anda. Masuk untuk melanjutkan.
              </p>
            </>
          ) : (
            <>
              <h2 className="auth-kiri-judul">Kurasi Karir<br />Terpercaya.</h2>
              <p className="auth-kiri-desk">
                Temukan peluang terbaik yang dirancang khusus untuk perjalanan profesional Anda. Masuk untuk melanjutkan.
              </p>
            </>
          )}
        </div>
      </div>

      {/* ═══════ PANEL KANAN ═══════ */}
      <div className="auth-right">
        <div className="auth-form-box">
          <div className="auth-heading">
            <h1 className="auth-judul">Selamat Datang Kembali</h1>
            <p className="auth-subjudul">Silakan masuk ke akun Anda untuk melanjutkan.</p>
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
          <form onSubmit={handleLogin}>
            <div className="auth-fields">
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
                <div className="field-label-row">
                  <label className="field-label">Password</label>
                  <button type="button" onClick={() => setShowForgotModal(true)} className="lupa-password bg-transparent border-none cursor-pointer">Lupa Password?</button>
                </div>
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
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn-submit">Masuk</button>
            </div>
          </form>


          <p className="auth-link-bawah">
            Belum punya akun?{' '}
            <Link to="/daftar" className="link-blue">Daftar Sekarang</Link>
          </p>
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
            <h3 className="text-xl font-bold text-gray-800 mb-2">Login Gagal</h3>
            <p className="text-gray-500 text-sm mb-6">
              {errorMessage}
            </p>
            <button
              onClick={() => setErrorMessage('')}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg transition-colors cursor-pointer"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      )}

      {/* Modal Lupa Password */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeForgotModal} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-8" style={{ animation: 'bounce-in 0.3s ease' }}>
            <button
              onClick={closeForgotModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {forgotStep === 1 && (
              <form onSubmit={handleLupaPasswordSubmit}>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 text-center mb-2">Lupa Password</h3>
                <p className="text-gray-500 text-sm text-center mb-6">
                  Masukkan email yang terdaftar untuk mengatur ulang password Anda.
                </p>
                {forgotError && <p className="text-red-500 text-xs text-center mb-3">{forgotError}</p>}
                <input
                  type="email"
                  placeholder="nama@email.com"
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 mb-4"
                  autoFocus
                />

                {/* Fake reCAPTCHA */}
                <div className="flex items-center justify-between border border-gray-300 rounded bg-gray-50 p-3 mb-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    {captchaVerified ? (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    ) : captchaLoading ? (
                      <svg className="animate-spin text-blue-600" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
                    ) : (
                      <div onClick={handleCaptchaClick} className="w-7 h-7 border-2 border-gray-400 rounded-sm cursor-pointer hover:border-gray-600 bg-white transition-colors"></div>
                    )}
                    <span className="text-sm font-medium text-gray-700">I'm not a robot</span>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    <span className="text-[9px] text-gray-500 mt-0.5 tracking-wide">reCAPTCHA</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={forgotLoading || !captchaVerified}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  {forgotLoading ? 'Memproses...' : 'Lanjutkan'}
                </button>
              </form>
            )}

            {forgotStep === 2 && (
              <form onSubmit={handleLupaPasswordSubmit}>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 text-center mb-2">Password Baru</h3>
                <p className="text-gray-500 text-sm text-center mb-6">
                  Silakan buat password baru untuk akun <strong>{forgotEmail}</strong>.
                </p>
                {forgotError && <p className="text-red-500 text-xs text-center mb-3">{forgotError}</p>}
                <input
                  type="password"
                  placeholder="Password Baru (min. 8 karakter)"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 mb-4"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  {forgotLoading ? 'Menyimpan...' : 'Simpan Password'}
                </button>
              </form>
            )}

            {forgotStep === 3 && (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Berhasil!</h3>
                <p className="text-gray-500 text-sm mb-6">
                  Password Anda telah berhasil diubah. Silakan masuk menggunakan password baru Anda.
                </p>
                <button
                  onClick={closeForgotModal}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  Masuk Sekarang
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
