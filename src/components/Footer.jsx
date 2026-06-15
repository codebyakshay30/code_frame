import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <img src="/favicon.svg" alt="CodeFrame Logo" width="18" height="18" />
          CodeFrame
        </div>
        <p className="footer-copy">© 2025 CodeFrame · ITM Skills University · B.Tech CSE 2025-29</p>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/editor">Editor</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/about">About</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </footer>
  )
}
