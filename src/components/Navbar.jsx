import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import './Navbar.css'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout, cart, setCartOpen } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const isEditor = location.pathname === '/editor'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isEditor ? 'editor-mode' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <div className="nav-logo-icon">
            <img src="/favicon.svg" alt="CodeFrame Logo" width="28" height="28" />
          </div>
          <span>CodeFrame</span>
        </Link>

        <div className="nav-links">
          {[['/', 'Home'], ['/editor', 'Editor'], ['/pricing', 'Pricing'], ['/about', 'About']].map(([to, label]) => (
            <Link key={to} to={to} className={`nav-link ${location.pathname === to ? 'active' : ''}`}>{label}</Link>
          ))}
        </div>

        <div className="nav-right">
          {/* Cart Button */}
          <button className="nav-cart-btn" onClick={() => setCartOpen(true)} aria-label="Cart">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 001.98 1.61h9.72a2 2 0 001.98-1.61L23 6H6"/>
            </svg>
            {cart.length > 0 && <span className="nav-cart-badge">{cart.length}</span>}
          </button>

          {user ? (
            <div className="nav-user">
              <Link to="/orders" className="nav-orders-link" style={{ marginRight: '16px', fontSize: '14px', fontWeight: '500', color: 'var(--text2)' }}>My Orders</Link>
              <div className="nav-avatar">{user.avatar}</div>
              <span className="nav-username">{user.name}</span>
              <button className="nav-logout" onClick={() => { logout(); navigate('/') }}>Logout</button>
            </div>
          ) : (
            <div className="nav-auth-btns">
              <Link to="/login" className="nav-login-btn">Log In</Link>
              <Link to="/login?mode=signup" className="nav-signup-btn">Sign Up</Link>
            </div>
          )}

          <Link to="/editor" className="nav-cta">Open Editor →</Link>
        </div>
      </div>
    </nav>
  )
}
