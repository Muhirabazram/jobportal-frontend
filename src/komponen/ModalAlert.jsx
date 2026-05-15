import React from 'react';

export default function ModalAlert({ show, title, message, type = 'alert', onConfirm, onClose, confirmText, cancelText }) {
  if (!show) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
      <div style={{ background: 'white', padding: '24px', borderRadius: '12px', width: '90%', maxWidth: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginTop: 0, fontSize: '18px', color: '#1e293b' }}>{title}</h3>
        <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.5', margin: '16px 0' }}>{message}</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
          {type === 'confirm' && (
            <button onClick={onClose} style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', background: 'white', color: '#475569', cursor: 'pointer', fontWeight: '500' }}>
              {cancelText || 'Batal'}
            </button>
          )}
          <button
            onClick={() => {
              if (onConfirm) onConfirm();
              else onClose();
            }}
            style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: type === 'confirm' ? '#ef4444' : '#2563eb', color: 'white', cursor: 'pointer', fontWeight: '500' }}
          >
            {confirmText || (type === 'confirm' ? 'Ya, Lanjutkan' : 'Mengerti')}
          </button>
        </div>
      </div>
    </div>
  );
}
