import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import './LoginPage.css'

export default function LoginPage() {
  const [params] = useSearchParams()
  const [mode, setMode] = useState(params.get('mode') === 'signup' ? 'signup' : 'login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const { login, signup, user } = useApp()
  const navigate = useNavigate()
  const redirect = params.get('redirect') || '/'

  useEffect(() => { if (user) navigate(redirect) }, [user])

  function set(k, v) { setForm(p => ({ ...p, [k]: v })); setError('') }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 800)) // simulate network
    const result = mode === 'login'
      ? login(form.email, form.password)
      : signup(form.name, form.email, form.password)
    setLoading(false)
    if (!result.ok) { setError(result.error); return }
    navigate(redirect)
  }

  return (
    <div className="login-page">
      <div className="login-glow" />

      <div className="login-card animate-scaleIn">
        {/* Logo */}
        <Link to="/" className="login-logo">
          <div className="login-logo-icon">⌨</div>
          <span>CodeFrame</span>
        </Link>

        <h1 className="login-title">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>
        <p className="login-sub">{mode === 'login' ? 'Sign in to access your saved presets and themes.' : 'Join thousands of developers using CodeFrame.'}</p>

        <form className="login-form" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="form-field">
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" value={form.name} onChange={e => set('name', e.target.value)} required />
            </div>
          )}
          <div className="form-field">
            <label>Email Address</label>
            <input type="email" placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} required />
          </div>
          <div className="form-field">
            <label>Password</label>
            <div className="pass-wrap">
              <input type={showPass ? 'text' : 'password'} placeholder="Min. 6 characters" value={form.password} onChange={e => set('password', e.target.value)} required />
              <button type="button" className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                {showPass ? '👁' : '🙈'}
              </button>
            </div>
          </div>

          {error && <div className="form-error">{error}</div>}

          {mode === 'login' && (
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" /> Remember me
              </label>
              <button type="button" className="forgot-btn">Forgot password?</button>
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? <span className="btn-spinner" /> : null}
            {loading ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="login-switch">
          {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError('') }}>
            {mode === 'login' ? 'Sign up free' : 'Sign in'}
          </button>
        </p>

        {mode === 'signup' && (
          <p className="login-terms">By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</p>
        )}
      </div>
    </div>
  )
}
