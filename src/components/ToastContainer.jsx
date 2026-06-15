import React from 'react'
import { useApp } from '../context/AppContext'
import './ToastContainer.css'

export default function ToastContainer() {
  const { toasts } = useApp()
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          <span className="toast-icon">
            {t.type === 'success' ? '✓' : t.type === 'error' ? '✕' : 'ℹ'}
          </span>
          {t.msg}
        </div>
      ))}
    </div>
  )
}
