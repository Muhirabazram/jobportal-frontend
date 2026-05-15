import React, { useState } from 'react';

export default function ModalPreviewLamaran({ show, onClose, onConfirm, profile, jobTitle, isLoading, readOnly = false, initialExperience = '', isAlreadyApplied = false }) {
  const [experience, setExperience] = useState(initialExperience);

  if (!show) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
      <div style={{ background: 'white', padding: '28px', borderRadius: '12px', width: '90%', maxWidth: '500px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', maxHeight: '90vh', overflowY: 'auto' }}>
        <h3 style={{ marginTop: 0, fontSize: '20px', color: '#1e293b', marginBottom: '8px' }}>{readOnly ? 'Detail Lamaran' : 'Preview Lamaran'}</h3>
        <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 24px 0' }}>
          {readOnly 
            ? <>Anda telah melamar untuk posisi <strong>{jobTitle}</strong>. Berikut adalah data yang dikirimkan.</>
            : <>Anda akan melamar untuk posisi <strong>{jobTitle}</strong>. Berikut adalah data yang akan dikirimkan ke HRD.</>
          }
        </p>

        <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#334155', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>Informasi Pribadi</h4>
          <div style={{ display: 'grid', gap: '10px', fontSize: '14px' }}>
            <div style={{ display: 'flex' }}><span style={{ color: '#64748b', width: '100px' }}>Nama:</span><span style={{ color: '#1e293b', fontWeight: 500 }}>{profile?.name}</span></div>
            <div style={{ display: 'flex' }}><span style={{ color: '#64748b', width: '100px' }}>Email:</span><span style={{ color: '#1e293b', fontWeight: 500 }}>{profile?.email}</span></div>
            <div style={{ display: 'flex' }}><span style={{ color: '#64748b', width: '100px' }}>No. HP:</span><span style={{ color: '#1e293b', fontWeight: 500 }}>{profile?.phone || '-'}</span></div>
            <div style={{ display: 'flex' }}><span style={{ color: '#64748b', width: '100px' }}>Lokasi:</span><span style={{ color: '#1e293b', fontWeight: 500 }}>{profile?.location || '-'}</span></div>
          </div>
        </div>

        <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#334155', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>Dokumen CV</h4>
          {profile?.cv_url ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              <a href={profile.cv_url} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 500, fontSize: '14px' }}>Lihat CV Anda</a>
            </div>
          ) : (
            <span style={{ color: '#ef4444', fontSize: '14px' }}>Belum ada CV yang diunggah.</span>
          )}
        </div>

        <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#334155', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>{readOnly ? 'Pengalaman' : 'Pengalaman (Wajib)'}</h4>
          {readOnly ? (
            <p style={{ fontSize: '14px', margin: 0, color: '#475569', whiteSpace: 'pre-wrap' }}>
              {initialExperience || 'Tidak ada pengalaman yang dicantumkan.'}
            </p>
          ) : (
            <textarea
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', minHeight: '80px', boxSizing: 'border-box' }}
              placeholder="Ceritakan pengalaman kerja atau keahlian Anda yang relevan dengan posisi ini..."
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              disabled={isAlreadyApplied}
            />
          )}
        </div>

        {!readOnly && isAlreadyApplied && (
          <div style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', padding: '12px 16px', borderRadius: '4px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
            <span style={{ color: '#991b1b', fontSize: '13px', fontWeight: 500 }}>
              Anda sudah melamar lowongan ini sebelumnya.
            </span>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          {readOnly ? (
            <button onClick={onClose} style={{ padding: '10px 18px', borderRadius: '6px', border: '1px solid #cbd5e1', background: 'white', color: '#475569', cursor: 'pointer', fontWeight: '500' }}>
              Tutup
            </button>
          ) : (
            <>
              <button onClick={onClose} disabled={isLoading} style={{ padding: '10px 18px', borderRadius: '6px', border: '1px solid #cbd5e1', background: 'white', color: '#475569', cursor: isLoading ? 'not-allowed' : 'pointer', fontWeight: '500' }}>
                Batal
              </button>
              <button
                onClick={() => onConfirm(experience)}
                disabled={isLoading || !experience.trim() || isAlreadyApplied}
                style={{ padding: '10px 18px', borderRadius: '6px', border: 'none', background: '#2563eb', color: 'white', cursor: (isLoading || !experience.trim() || isAlreadyApplied) ? 'not-allowed' : 'pointer', fontWeight: '600', opacity: (isLoading || !experience.trim() || isAlreadyApplied) ? 0.7 : 1 }}
              >
                {isLoading ? 'Mengirim Lamaran...' : 'Kirim Lamaran'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
