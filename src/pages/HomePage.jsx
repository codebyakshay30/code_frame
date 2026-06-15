import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css'

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

const FEATURES = [
  { icon: '🎨', title: '8 Editor Themes', desc: 'Dracula, One Dark, Monokai, Nord, GitHub Dark, Night Owl, Tokyo Night & Solarized.' },
  { icon: '⚡', title: 'One-Click Export', desc: 'Export as high-res 3x PNG or copy directly to clipboard instantly.' },
  { icon: '🌈', title: '15 Backgrounds', desc: '6 free gorgeous gradients plus 9 premium ones starting at just ₹29.' },
  { icon: '✨', title: 'Syntax Highlighting', desc: 'JS, TypeScript, Python, Java, CSS & HTML with full colour token support.' },
  { icon: '📐', title: 'Canvas Controls', desc: 'Padding, radius, shadow, font size, line height, and aspect ratio sliders.' },
  { icon: '💾', title: 'Save Presets', desc: 'Save favourite settings with localStorage and reload them instantly.' },
]

const STEPS = [
  { num: '01', title: 'Paste Your Code', desc: 'Paste any code snippet into the editor textarea.' },
  { num: '02', title: 'Customise the Look', desc: 'Pick a theme, background, font, and adjust canvas settings.' },
  { num: '03', title: 'Export & Share', desc: 'Download as PNG or copy to clipboard and share anywhere.' },
]

export default function HomePage() {
  const [heroRef, heroIn] = useInView(0.05)
  const [stepsRef, stepsIn] = useInView(0.1)
  const [featRef, featIn] = useInView(0.05)
  const [ctaRef, ctaIn] = useInView(0.2)

  return (
    <div className="home-page">

      {/* HERO */}
      <section className="hero" ref={heroRef}>
        <div className="hero-glow" />
        <div className={`hero-content ${heroIn ? 'visible' : ''}`}>
          <div className="hero-badge">✦ Free to use — No signup needed</div>
          <h1 className="hero-title">
            Turn Your Code Into<br />
            <span className="hero-gradient">Beautiful Screenshots</span>
          </h1>
          <p className="hero-sub">
            CodeFrame transforms plain code snippets into stunning, share-worthy images.
            Perfect for developers who want to impress on Twitter, LinkedIn, or anywhere.
          </p>
          <div className="hero-actions">
            <Link to="/editor" className="btn-primary-hero">Start Creating Free →</Link>
            <Link to="/pricing" className="btn-ghost-hero">View Pricing</Link>
          </div>
          <p className="hero-note">No account needed · Export in seconds · 3 free themes included</p>
        </div>

        <div className={`hero-demo ${heroIn ? 'visible' : ''}`}>
          <div className="demo-outer">
            <div className="demo-win">
              <div className="demo-bar">
                <span className="dd" style={{background:'#ff5f57'}} />
                <span className="dd" style={{background:'#febc2e'}} />
                <span className="dd" style={{background:'#28c940'}} />
                <span className="demo-fn">app.js</span>
              </div>
              <div className="demo-code">
                {[
                  [['cmt','// Async fetch with error handling']],
                  [['kw','const '],['fn','fetchUser'],['def',' = '],['kw','async'],['def',' ({ id }) => {']],
                  [['def','  '],['kw','try '],['def','{']],
                  [['def','    '],['kw','const '],['def','res = '],['kw','await '],['fn','fetch'],['def','(`/api/'],['str','${id}'],['def','`)']],
                  [['def','    '],['kw','return await '],['def','res.'],['fn','json'],['def','()']],
                  [['def','  } '],['kw','catch'],['def',' (err) {']],
                  [['def','    '],['fn','console'],['def','.'],['fn','error'],['def','(err)']],
                  [['def','  }']],
                  [['def','}']],
                ].map((tokens, i) => (
                  <div key={i} className="demo-line">
                    <span className="demo-ln">{i + 1}</span>
                    {tokens.map((t, j) => <span key={j} className={`dc dc-${t[0]}`}>{t[1]}</span>)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="steps-section" ref={stepsRef}>
        <div className="section-inner">
          <div className={`section-heading ${stepsIn ? 'visible' : ''}`}>
            <div className="section-tag">How it works</div>
            <h2>Three steps to stunning code images</h2>
          </div>
          <div className="steps-grid">
            {STEPS.map((s, i) => (
              <div key={s.num} className={`step-card ${stepsIn ? 'visible' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="step-num">{s.num}</div>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section" ref={featRef}>
        <div className="section-inner">
          <div className={`section-heading ${featIn ? 'visible' : ''}`}>
            <div className="section-tag">Features</div>
            <h2>Everything you need to share code beautifully</h2>
          </div>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div key={f.title} className={`feature-card ${featIn ? 'visible' : ''}`} style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="feat-icon">{f.icon}</div>
                <h3 className="feat-title">{f.title}</h3>
                <p className="feat-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" ref={ctaRef}>
        <div className="cta-glow" />
        <div className={`cta-inner ${ctaIn ? 'visible' : ''}`}>
          <h2 className="cta-title">Ready to create stunning code screenshots?</h2>
          <p className="cta-sub">Join thousands of developers who use CodeFrame to share their work beautifully.</p>
          <Link to="/editor" className="btn-primary-hero">Open the Editor — It's Free →</Link>
          </div>
          </section>
          </div>
          )
          }
