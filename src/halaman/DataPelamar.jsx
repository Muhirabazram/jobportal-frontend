import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./data-pelamar.css";

/* ── Icons ── */
const IkonGrid = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>);
const IkonBriefcase = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>);
const IkonUsers = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>);
const IkonSettings = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>);
const IkonFilter = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>);
const IkonChevron = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>);
const IkonCalendar = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>);
const IkonDoc = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM18 20H6V4h5v7h7v9z"/></svg>);
const IkonMic = () => (<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>);
const IkonClose = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>);
const IkonCheck = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>);

/* ── Konstanta & Helper ── */
const SEMUA = 'Semua Posisi';

const BADGE_MAP = {
  pending:   { label: 'LAMARAN BARU', cls: 'baru' },
  reviewed:  { label: 'DITINJAU',     cls: 'review' },
  accepted:  { label: 'WAWANCARA',    cls: 'wawancara', ikon: true },
  rejected:  { label: 'DITOLAK',      cls: 'ditolak' },
  hired:     { label: 'DIREKRUT',     cls: 'diterima', ikon: true },
};

const STATUS_CARD = {
  pending: 'status-baru', reviewed: 'status-review', accepted: 'status-wawancara', rejected: 'status-ditolak', hired: 'status-diterima'
};

function getInisial(nama) {
  if (!nama) return '?';
  return nama.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function getWarnaInisial(nama) {
  const colors = [
    { bg: '#93c5fd', color: '#1e3a8a' }, { bg: '#7e22ce', color: '#fff' },
    { bg: '#dbeafe', color: '#1e3a8a' }, { bg: '#334155', color: '#f8fafc' },
    { bg: '#d1fae5', color: '#065f46' }, { bg: '#fef3c7', color: '#92400e' },
    { bg: '#e0e7ff', color: '#3730a3' }
  ];
  let hash = 0;
  for (let i = 0; i < (nama || '?').length; i++) {
    hash = nama.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

/* ── Dropdown Filter (ASLI) ── */
function FilterDropdown({ value, onChange, list }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="dpl-filter-wrap" ref={ref}>
      <button className="dpl-btn-filter" onClick={() => setOpen(o => !o)}>
        <IkonFilter />
        <span>{value}</span>
        <span className={`dpl-chevron ${open ? 'open' : ''}`}><IkonChevron /></span>
      </button>
      {open && (
        <div className="dpl-filter-dropdown">
          {list.map(job => (
            <button
              key={job}
              className={`dpl-filter-option ${value === job ? 'active' : ''}`}
              onClick={() => { onChange(job); setOpen(false); }}
            >
              <span>{job}</span>
              {value === job && <IkonCheck />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Kartu Pelamar ── */
function KartuPelamar({ app, onAksi }) {
  const badge = BADGE_MAP[app.status] || { label: 'BARU', cls: 'baru' };
  const isFullWidth = app.status === 'accepted' || app.status === 'rejected' || app.status === 'hired';
  const cardCls = `dpl-card ${STATUS_CARD[app.status] || 'status-baru'}${isFullWidth ? ' full-width' : ''}`;
  const warna = getWarnaInisial(app.user?.name);
  const inisial = getInisial(app.user?.name);
  const tanggal = new Date(app.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

  const AksiBtn = () => {
    if (app.status === 'pending')   return <button className="dpl-btn-primary" onClick={() => onAksi('profil', app)}>Lihat CV & Profil</button>;
    if (app.status === 'reviewed')  return <button className="dpl-btn-primary" onClick={() => onAksi('proses', app)}>Proses Kandidat</button>;
    if (app.status === 'accepted')  return <button className="dpl-btn-solid"  onClick={() => onAksi('penilaian', app)}>Beri Keputusan</button>;
    if (app.status === 'rejected')  return <button className="dpl-btn-link"   onClick={() => onAksi('histori', app)}>Riwayat Seleksi</button>;
    if (app.status === 'hired')     return <button className="dpl-btn-link"   onClick={() => onAksi('histori', app)}>Riwayat Seleksi</button>;
    return null;
  };

  return (
    <div className={cardCls}>
      <div className="dpl-card-header" style={{ flex: isFullWidth ? 1 : undefined }}>
        {app.user?.avatar ? (
          <img src={`http://localhost:8000/storage/${app.user.avatar}`} alt={app.user?.name} className="dpl-avatar" style={{ objectFit: 'cover' }} />
        ) : (
          <div className="dpl-avatar" style={{ background: warna.bg, color: warna.color }}>{inisial}</div>
        )}
        <div className="dpl-info-group">
          <div className="dpl-info-top" style={isFullWidth ? { gap: 12 } : {}}>
            <span className="dpl-name" style={isFullWidth ? { fontSize: 18 } : {}}>{app.user?.name || 'Tanpa Nama'}</span>
            <span className={`dpl-badge ${badge.cls}`}>
              {badge.ikon && <IkonMic />} {badge.label}
            </span>
          </div>
          <span className="dpl-job">{app.job_listing?.title || 'Posisi'}</span>
          {app.status === 'accepted' && <p className="dpl-subtext">Jadwal: {tanggal}, 10:00 WIB (Online)</p>}
          {app.status === 'rejected' && <p className="dpl-subtext">Melamar pada: {tanggal}</p>}
          {app.status !== 'accepted' && app.status !== 'rejected' && (
            <div className="dpl-meta">
              <div className="dpl-meta-item"><IkonCalendar /> {tanggal}</div>
            </div>
          )}
        </div>
      </div>
      <div className="dpl-actions">
        <AksiBtn />
        {(app.status === 'pending' || app.status === 'reviewed') && (
          <button className="dpl-btn-icon" onClick={() => onAksi('dokumen', app)}><IkonDoc /></button>
        )}
      </div>
    </div>
  );
}

/* ── Ikon Tahapan ── */
const IkonWawancaraHR = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IkonWawancaraUser = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const IkonAssessment = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
  </svg>
);

const TAHAPAN = [
  { id: 'interview-hrd',  label: 'Interview HRD',   deskripsi: 'Jadwalkan sesi interview langsung dengan tim HRD', ikon: IkonWawancaraHR, warna: '#2563eb', bg: '#eff6ff' },
  { id: 'interview-user', label: 'Interview User',  deskripsi: 'Interview teknis dengan hiring manager atau tim terkait', ikon: IkonWawancaraUser, warna: '#7c3aed', bg: '#f5f3ff' },
  { id: 'psikotes',       label: 'Tes & Psikotes',  deskripsi: 'Kirim link tes kemampuan atau psikotes online kepada kandidat', ikon: IkonAssessment, warna: '#0891b2', bg: '#ecfeff' },
];

/* ── Proses Modal ── */
function ProsesModal({ candidate, onClose, onSave }) {
  const [pilihan, setPilihan] = useState(null);
  const [berhasil, setBerhasil] = useState(false);

  const handleSimpan = async () => {
    if (!pilihan) return;
    const token = localStorage.getItem('token');
    let newStatus = 'accepted'; // Pindah ke fase Wawancara/Assesment
    await fetch(`http://localhost:8000/api/applications/${candidate.id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ status: newStatus })
    });
    if (onSave) onSave();
    setBerhasil(true);
    setTimeout(onClose, 1400);
  };

  if (berhasil) {
    const terpilih = TAHAPAN.find(t => t.id === pilihan);
    return (
      <div className="dpl-modal-content dpl-proses-sukses">
        <div className="dpl-sukses-ikon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h3 className="dpl-modal-title" style={{ textAlign: 'center', marginTop: 16 }}>Berhasil!</h3>
        <p className="dpl-modal-text" style={{ textAlign: 'center' }}>
          <strong>{candidate.user?.name}</strong> telah dipindahkan ke tahap <strong>{terpilih?.label || 'berikutnya'}</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="dpl-modal-content">
      <h3 className="dpl-modal-title">Lanjutkan Proses</h3>
      <div className="dpl-proses-kandidat">
        {candidate.user?.avatar ? (
          <img src={`http://localhost:8000/storage/${candidate.user.avatar}`} alt={candidate.user?.name} className="dpl-modal-avatar big" style={{ objectFit: 'cover', width: 40, height: 40 }} />
        ) : (
          <div className="dpl-modal-avatar big" style={{ background: getWarnaInisial(candidate.user?.name).bg, color: getWarnaInisial(candidate.user?.name).color, width: 40, height: 40, fontSize: 14 }}>
            {getInisial(candidate.user?.name)}
          </div>
        )}
        <div>
          <p className="dpl-proses-nama">{candidate.user?.name}</p>
          <p className="dpl-proses-posisi">{candidate.job_listing?.title}</p>
        </div>
      </div>

      <p className="dpl-proses-label">Pilih Tahapan Berikutnya:</p>
      <div className="dpl-tahapan-list">
        {TAHAPAN.map(t => {
          const aktif = pilihan === t.id;
          return (
            <button
              key={t.id}
              className={`dpl-tahapan-card ${aktif ? 'aktif' : ''}`}
              style={aktif ? { borderColor: t.warna, background: t.bg } : {}}
              onClick={() => setPilihan(t.id)}
            >
              <div className="dpl-tahapan-ikon" style={{ background: aktif ? t.warna : '#f1f5f9', color: aktif ? 'white' : '#64748b' }}><t.ikon /></div>
              <div className="dpl-tahapan-info">
                <span className="dpl-tahapan-nama" style={aktif ? { color: t.warna } : {}}>{t.label}</span>
                <span className="dpl-tahapan-desc">{t.deskripsi}</span>
              </div>
              {aktif && <div className="dpl-tahapan-check" style={{ background: t.warna }}><IkonCheck /></div>}
            </button>
          );
        })}
      </div>

      <div className="dpl-modal-actions right">
        <button className="dpl-btn-line" onClick={onClose}>Batal</button>
        <button className="dpl-btn-solid" style={{ opacity: pilihan ? 1 : 0.4 }} onClick={handleSimpan}>Simpan Perubahan</button>
      </div>
    </div>
  );
}

/* ── Modal ── */
function Modal({ type, candidate, onClose, onSave }) {
  const [rejectMode, setRejectMode] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [isRejecting, setIsRejecting] = useState(false);

  if (!type) return null;

  const handleReject = async () => {
    setIsRejecting(true);
    try {
      await fetch(`http://localhost:8000/api/applications/${candidate.id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ status: 'rejected', rejection_reason: rejectReason })
      });
      if (onSave) onSave();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsRejecting(false);
    }
  };

  return (
    <div className="dpl-modal-overlay" onClick={onClose}>
      <div className="dpl-modal-box" onClick={e => e.stopPropagation()}>
        <button className="dpl-modal-close" onClick={onClose}><IkonClose /></button>

        {type === 'profil' && candidate && (
          <div className="dpl-modal-content">
            <h3 className="dpl-modal-title">Profil Kandidat</h3>
            <div className="dpl-modal-profile-header">
              {candidate.user?.avatar ? (
                <img src={`http://localhost:8000/storage/${candidate.user.avatar}`} alt={candidate.user?.name} className="dpl-modal-avatar big" style={{ objectFit: 'cover' }} />
              ) : (
                <div className="dpl-modal-avatar big" style={{ background: getWarnaInisial(candidate.user?.name).bg, color: getWarnaInisial(candidate.user?.name).color }}>{getInisial(candidate.user?.name)}</div>
              )}
              <div>
                <div className="dpl-modal-pro-name">{candidate.user?.name}</div>
                <div className="dpl-modal-pro-job">Melamar: {candidate.job_listing?.title}</div>
              </div>
            </div>
            <div className="dpl-modal-divider" />
            <p className="dpl-modal-text" style={{ fontSize: '13px', margin: '4px 0' }}><strong>Email:</strong> {candidate.user?.email || 'email@example.com'}</p>
            <p className="dpl-modal-text" style={{ fontSize: '13px', margin: '4px 0' }}><strong>Telepon:</strong> {candidate.user?.phone || '+62 812 3456 7890'}</p>
            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', margin: '12px 0' }}>
              <p className="dpl-modal-text" style={{ fontSize: '13px', margin: '0 0 4px 0', color: '#334155' }}><strong>Pengalaman:</strong></p>
              <p className="dpl-modal-text" style={{ fontSize: '13px', margin: '0', color: '#475569', whiteSpace: 'pre-wrap' }}>
                {candidate.experience || 'Tidak ada pengalaman yang dicantumkan.'}
              </p>
            </div>
            <p className="dpl-modal-text" style={{ fontSize: '13px', margin: '4px 0' }}><strong>Status:</strong> {candidate.status === 'pending' ? 'Sedang dalam proses seleksi awal.' : candidate.status === 'reviewed' ? 'Sedang ditinjau oleh HRD.' : candidate.status === 'accepted' ? 'Dijadwalkan wawancara.' : 'Tidak lolos seleksi.'}</p>
            
            {rejectMode ? (
              <div style={{ marginTop: '16px', background: '#fef2f2', padding: '12px', borderRadius: '8px', border: '1px solid #fca5a5' }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#991b1b', fontWeight: '600' }}>Alasan Penolakan (Opsional)</p>
                <textarea 
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Berikan alasan mengapa kandidat ditolak..."
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #fca5a5', fontSize: '13px', minHeight: '60px', boxSizing: 'border-box', marginBottom: '12px' }}
                />
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                  <button className="dpl-btn-line" onClick={() => setRejectMode(false)} style={{ padding: '6px 12px', fontSize: '13px' }}>Batal</button>
                  <button className="dpl-btn-solid" onClick={handleReject} disabled={isRejecting} style={{ background: '#ef4444', padding: '6px 12px', fontSize: '13px' }}>
                    {isRejecting ? 'Memproses...' : 'Konfirmasi Tolak'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="dpl-modal-actions right" style={{ marginTop: '16px' }}>
                <button className="dpl-btn-line" onClick={onClose}>Tutup</button>
                {candidate.status === 'pending' && (
                  <>
                    <button className="dpl-btn-line" onClick={() => setRejectMode(true)} style={{ color: '#ef4444', borderColor: '#fca5a5' }}>Tolak Lamaran</button>
                    <button className="dpl-btn-solid" onClick={() => {
                      fetch(`http://localhost:8000/api/applications/${candidate.id}/status`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                        body: JSON.stringify({ status: 'reviewed' })
                      }).then(() => { onClose(); if(onSave) onSave(); });
                    }}>Terima Lamaran</button>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {type === 'dokumen' && candidate && (
          <div className="dpl-modal-content">
            <h3 className="dpl-modal-title">Dokumen Lamaran</h3>
            {candidate.user?.cv_url ? (
              <>
                <div className="dpl-modal-doc-preview"><IkonDoc /><span>CV_{candidate.user?.name?.replace(/\s+/g, '_') || 'Kandidat'}</span></div>
                <div className="dpl-modal-actions right">
                  <button className="dpl-btn-line" onClick={onClose}>Tutup</button>
                  <a href={candidate.user.cv_url} target="_blank" rel="noreferrer" className="dpl-btn-solid" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}>Lihat CV</a>
                </div>
              </>
            ) : (
              <>
                <p className="dpl-modal-text" style={{ textAlign: 'center', margin: '20px 0' }}>Kandidat ini belum mengunggah CV.</p>
                <div className="dpl-modal-actions right">
                  <button className="dpl-btn-line" onClick={onClose}>Tutup</button>
                </div>
              </>
            )}
          </div>
        )}

        {type === 'proses' && candidate && (
          <ProsesModal candidate={candidate} onClose={onClose} onSave={onSave} />
        )}

        {type === 'penilaian' && candidate && (
          <div className="dpl-modal-content">
            <h3 className="dpl-modal-title">Keputusan Seleksi</h3>
            <p className="dpl-modal-text">Tentukan hasil akhir wawancara untuk <strong>{candidate.user?.name}</strong> — posisi <strong>{candidate.job_listing?.title}</strong>.</p>
            <div className="dpl-form-group">
              <label>Catatan HR:</label>
              <textarea className="dpl-textarea" rows="4" placeholder="Tuliskan catatan evaluasi atau alasan keputusan..." />
            </div>
            <div className="dpl-modal-actions-split">
              <button className="dpl-btn-reject" onClick={() => {
                fetch(`http://localhost:8000/api/applications/${candidate.id}/status`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                  body: JSON.stringify({ status: 'rejected' })
                }).then(() => { onClose(); if(onSave) onSave(); });
              }}>Tidak Lolos</button>
              <button className="dpl-btn-accept" onClick={() => {
                fetch(`http://localhost:8000/api/applications/${candidate.id}/status`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                  body: JSON.stringify({ status: 'hired' })
                }).then(() => { onClose(); if(onSave) onSave(); });
              }}>Terima & Rekrut</button>
            </div>
          </div>
        )}

        {type === 'histori' && candidate && (
          <div className="dpl-modal-content">
            <h3 className="dpl-modal-title">Riwayat Seleksi</h3>
            <p className="dpl-modal-text">Rekam jejak proses seleksi untuk <strong>{candidate.user?.name}</strong> — posisi <strong>{candidate.job_listing?.title}</strong>.</p>
            <div className="dpl-timeline">
              {[
                { label: 'Lamaran Diterima',     sub: `${new Date(candidate.created_at).toLocaleDateString('id-ID')} – CV dan portofolio diterima`, done: true },
                { label: 'Penyaringan Awal',     sub: 'Lolos seleksi administrasi',             done: candidate.status !== 'pending' },
                { label: 'Wawancara HR',         sub: candidate.status === 'accepted' || candidate.status === 'hired' ? 'Selesai' : 'Belum terjadwal', done: candidate.status === 'accepted' || candidate.status === 'hired' },
                ...(candidate.status === 'rejected' ? [
                  { label: 'Tidak Lolos',        sub: 'Kualifikasi belum sesuai kriteria',      done: false, reject: true }
                ] : candidate.status === 'hired' ? [
                  { label: 'Diterima & Direkrut',sub: 'Selamat bergabung dengan tim kami!',     done: true }
                ] : [])
              ].map((t, i) => (
                <div key={i} className="dpl-tl-item">
                  <div className={`dpl-tl-dot ${t.done ? 'done' : ''} ${t.reject ? 'reject' : ''}`} />
                  <div className="dpl-tl-content"><strong>{t.label}</strong><span>{t.sub}</span></div>
                </div>
              ))}
            </div>
            <div className="dpl-modal-actions right">
              <button className="dpl-btn-primary" onClick={onClose}>Tutup Riwayat</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════
   HALAMAN UTAMA
══════════════════════════════ */
export default function DataPelamar() {
  const [jobs, setJobs] = useState([]);
  const [allApplications, setAllApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterLowongan, setFilterLowongan] = useState(SEMUA);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const token = localStorage.getItem('token');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchData = () => {
    setLoading(true);
    fetch('http://localhost:8000/api/my-jobs', { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => {
        const jobsData = data.data || [];
        setJobs(jobsData);
        const apps = [];
        jobsData.forEach(job => {
          (job.applications || []).forEach(app => {
            apps.push({ ...app, job_listing: { id: job.id, title: job.title } });
          });
        });
        setAllApplications(apps);
        setLoading(false);
      })
      .catch(err => { console.error(err); setLoading(false); });
  };

  useEffect(() => { fetchData(); }, []);

  const LOWONGAN_LIST = [SEMUA, ...jobs.map(j => j.title)];

  const filtered = filterLowongan === SEMUA
    ? allApplications
    : allApplications.filter(app => app.job_listing?.title === filterLowongan);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getAppCount = (jobTitle) => {
    if (jobTitle === SEMUA) return allApplications.length;
    return allApplications.filter(app => app.job_listing?.title === jobTitle).length;
  };

  const handleAksi = (type, candidate) => {
    setActiveModal(type);
    setSelectedCandidate(candidate);
  };
  const closeModal = () => { setActiveModal(null); setSelectedCandidate(null); };

  return (
    <div className="dpl-root">
      <aside className="dpl-sidebar">
        <div className="kl-logo-area">
          <div className="kl-logo-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
            </svg>
          </div>
          <div className="kl-logo-text">
            <span className="kl-logo-title">JobPortal</span>
            <span className="kl-logo-subtitle">HR Dashboard</span>
          </div>
        </div>
        <nav className="kl-nav">
          <Link to="/dashboard-hrd"   className="kl-nav-item"><IkonGrid /><span>Dasbor</span></Link>
          <Link to="/kelola-lowongan" className="kl-nav-item"><IkonBriefcase /><span>Kelola Lowongan</span></Link>
          <Link to="/data-pelamar"    className="kl-nav-item kl-nav-aktif"><IkonUsers /><span>Data Pelamar</span></Link>
          <Link to="/pengaturan"      className="kl-nav-item"><IkonSettings /><span>Pengaturan</span></Link>
        </nav>
      </aside>

      <main className="dpl-main">
        <div className="dpl-header-section">
          <div className="dpl-header-left">
            <h1 className="dpl-page-title">Data Pelamar</h1>
            <p className="dpl-page-subtitle">
              Tinjau dan proses kandidat berdasarkan posisi yang dibuka.
            </p>
          </div>
          <FilterDropdown value={filterLowongan} onChange={(val) => { setFilterLowongan(val); setCurrentPage(1); }} list={LOWONGAN_LIST} />
        </div>

        <div className="dpl-filter-pills">
          {LOWONGAN_LIST.map(job => (
            <button
              key={job}
              className={`dpl-pill ${filterLowongan === job ? 'active' : ''}`}
              onClick={() => { setFilterLowongan(job); setCurrentPage(1); }}
            >
              <span className="dpl-pill-text">{job}</span>
              <span className="dpl-pill-count">{getAppCount(job)}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="dpl-empty-state"><p>Memuat data pelamar...</p></div>
        ) : paginated.length === 0 ? (
          <div className="dpl-empty-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <p>Tidak ada pelamar untuk lowongan ini.</p>
          </div>
        ) : (
          <div className="dpl-card-grid">
            {paginated.map(app => <KartuPelamar key={app.id} app={app} onAksi={handleAksi} />)}
          </div>
        )}

        {totalPages > 1 && (
          <div className="dpl-pagination">
            <button className="dpl-page-nav" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button key={n} className={`dpl-page-num ${currentPage === n ? 'active' : ''}`} onClick={() => setCurrentPage(n)}>{n}</button>
            ))}
            <button className="dpl-page-nav" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        )}
      </main>

      <Modal type={activeModal} candidate={selectedCandidate} onClose={closeModal} onSave={fetchData} />
    </div>
  );
}