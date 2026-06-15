import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { PLANS, THEMES, BACKGROUNDS } from '../data/constants'
import { useApp } from '../context/AppContext'
import './PricingPage.css'

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

export default function PricingPage() {
  const [tab, setTab] = useState('plans')
  const [heroRef, heroIn] = useInView(0.1)
  const [plansRef, plansIn] = useInView(0.1)
  const [faqRef, faqIn] = useInView(0.1)

  return (
    <div className="pricing-page">

      {/* HERO */}
      <section className="pricing-hero" ref={heroRef}>
        <div className="pricing-glow" />
        <div className={`ph-inner ${heroIn ? 'visible' : ''}`}>
          <div className="section-tag">Pricing</div>
          <h1 className="ph-title">Simple, transparent pricing</h1>
          <p className="ph-sub">Start free forever. Upgrade only when you need more.<br />All prices in Indian Rupees (₹).</p>

          <div className="pricing-tabs">
            {[['plans','🗂 Plans'], ['themes','🎨 Theme Pricing'], ['bgs','🌈 Background Pricing']].map(([v, l]) => (
              <button key={v} className={`ptab ${tab === v ? 'active' : ''}`} onClick={() => setTab(v)}>{l}</button>
            ))}
          </div>
        </div>
      </section>

      {/* PLANS */}
      {tab === 'plans' && (
        <section className="plans-section" ref={plansRef}>
          <div className={`plans-grid ${plansIn ? 'visible' : ''}`}>
            {PLANS.map((plan, i) => (
              <PlanCard key={plan.id} plan={plan} delay={i * 120} visible={plansIn} />
            ))}
          </div>
          <div className="plans-note">
            All plans include a 7-day free trial. No credit card required to start.
          </div>
        </section>
      )}

      {/* THEME PRICING */}
      {tab === 'themes' && <ThemeGrid />}

      {/* BACKGROUND PRICING */}
      {tab === 'bgs' && <BgGrid />}

      {/* FAQ */}
      <section className="faq-section" ref={faqRef}>
        <div className={`faq-inner ${faqIn ? 'visible' : ''}`}>
          <div className="section-tag">FAQ</div>
          <h2 className="faq-title">Frequently Asked Questions</h2>
          {[
            { q: 'Is CodeFrame really free?', a: 'Yes! The Free plan gives you 3 editor themes, 6 backgrounds, and full PNG export — forever free, no credit card needed.' },
            { q: 'What currency are the prices in?', a: 'All prices are in Indian Rupees (₹). Pro is ₹199/month and Team is ₹499/month. Individual themes and backgrounds can also be purchased separately.' },
            { q: 'Can I buy individual themes?', a: 'Yes! Add individual themes or backgrounds to your cart from the Theme Pricing or Background Pricing tabs and purchase them as one-time unlocks.' },
            { q: 'What payment methods are accepted?', a: 'We accept UPI, Debit/Credit Cards, Net Banking, and all major Indian payment methods.' },
            { q: 'Can I cancel anytime?', a: 'Absolutely. Cancel at any time from your account settings. Your access continues till the end of the billing period.' },
          ].map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
        </div>
      </section>
    </div>
  )
}

/* ── Plan Card ───────────────────────────────────────────── */
function PlanCard({ plan, delay, visible }) {
  const { addToCart, cart, showToast } = useApp()
  const inCart = cart.find(i => i.id === `plan-${plan.id}`)

  function handleBuy() {
    if (plan.price === 0) {
      showToast('You are already on the Free plan! 🎉', 'info')
      return
    }
    addToCart({
      id: `plan-${plan.id}`,
      name: `CodeFrame ${plan.name} Plan`,
      type: 'Subscription · Monthly',
      price: plan.price,
      preview: 'linear-gradient(135deg,#7c3aed,#9333ea)',
    })
  }

  return (
    <div
      className={`plan-card ${visible ? 'card-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="plan-header">
        <div className="plan-name-row">
          <span className="plan-name">{plan.name}</span>
          <span className="plan-tag">{plan.tag}</span>
        </div>

        <div className="plan-price-block">
          {plan.price === 0 ? (
            <span className="price-free">Free</span>
          ) : (
            <div className="price-paid">
              <span className="price-cur">₹</span>
              <span className="price-num">{plan.price}</span>
              <span className="price-per">/month</span>
            </div>
          )}
        </div>
        <p className="plan-desc">{plan.desc}</p>
      </div>

      <button
        className={`plan-cta-btn primary ${inCart ? 'in-cart' : ''}`}
        onClick={handleBuy}
      >
        {inCart ? '✓ Added to Cart' : plan.price === 0 ? plan.cta : `${plan.cta} — ₹${plan.price}/mo`}
      </button>

      <ul className="plan-feats">
        {plan.features.map(f => (
          <li key={f} className="pf-yes">
            <span className="pf-icon-yes">✓</span> {f}
          </li>
        ))}
        {plan.missing.map(f => (
          <li key={f} className="pf-no">
            <span className="pf-icon-no">✗</span> {f}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ── Theme Grid ──────────────────────────────────────────── */
function ThemeGrid() {
  const [ref, inView] = useInView(0.05)
  const { addToCart, cart } = useApp()

  return (
    <section className="item-section" ref={ref}>
      <div className="item-section-header">
        <h2>Theme Pricing</h2>
        <p>3 themes are free forever. Premium themes can be added to cart and purchased individually.</p>
      </div>
      <div className={`item-grid ${inView ? 'visible' : ''}`}>
        {Object.entries(THEMES).map(([key, t], i) => {
          const inCart = cart.find(c => c.id === `theme-${key}`)
          return (
            <div
              key={key}
              className={`item-card ${inView ? 'card-visible' : ''}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="item-preview" style={{ background: t.win }}>
                <div className="item-bar" style={{ background: t.bar }}>
                  <span className="ip-dot" style={{ background: '#ff5f57' }} />
                  <span className="ip-dot" style={{ background: '#febc2e' }} />
                  <span className="ip-dot" style={{ background: '#28c940' }} />
                </div>
                <div className="item-code" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  <span style={{ color: t.colors.kw }}>const </span>
                  <span style={{ color: t.colors.fn }}>hello</span>
                  <span style={{ color: t.colors.def }}> = </span>
                  <span style={{ color: t.colors.str }}>"world"</span>
                  <br />
                  <span style={{ color: t.colors.cmt }}>// {t.label}</span>
                </div>
              </div>
              <div className="item-footer">
                <div className="item-info">
                  <span className="item-name">{t.label}</span>
                  {t.free
                    ? <span className="badge-free">Free</span>
                    : <span className="badge-paid">₹{t.price}</span>
                  }
                </div>
                {!t.free && (
                  <button
                    className={`item-cart-btn ${inCart ? 'added' : ''}`}
                    onClick={() => addToCart({ id: `theme-${key}`, name: `${t.label} Theme`, type: 'Editor Theme · One-time', price: t.price, preview: t.win })}
                  >
                    {inCart ? '✓ Added' : '+ Add to Cart'}
                  </button>
                )}
                {t.free && <span className="item-free-label">Included free</span>}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ── Background Grid ─────────────────────────────────────── */
function BgGrid() {
  const [ref, inView] = useInView(0.05)
  const { addToCart, cart } = useApp()

  return (
    <section className="item-section" ref={ref}>
      <div className="item-section-header">
        <h2>Background Pricing</h2>
        <p>6 backgrounds are free. Premium gradients can be purchased individually or get all with Pro.</p>
      </div>
      <div className={`item-grid bg-item-grid ${inView ? 'visible' : ''}`}>
        {BACKGROUNDS.map((bg, i) => {
          const inCart = cart.find(c => c.id === bg.id)
          return (
            <div
              key={bg.id}
              className={`item-card ${inView ? 'card-visible' : ''}`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className="item-preview-bg" style={{ background: bg.bg }} />
              <div className="item-footer">
                <div className="item-info">
                  <span className="item-name">{bg.label}</span>
                  {bg.free
                    ? <span className="badge-free">Free</span>
                    : <span className="badge-paid">₹{bg.price}</span>
                  }
                </div>
                {!bg.free && (
                  <button
                    className={`item-cart-btn ${inCart ? 'added' : ''}`}
                    onClick={() => addToCart({ id: bg.id, name: `${bg.label} Background`, type: 'Background · One-time', price: bg.price, preview: bg.bg })}
                  >
                    {inCart ? '✓ Added' : '+ Add to Cart'}
                  </button>
                )}
                {bg.free && <span className="item-free-label">Included free</span>}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ── FAQ Item ────────────────────────────────────────────── */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
      <div className="faq-q">
        <span>{q}</span>
        <span className="faq-arrow">{open ? '−' : '+'}</span>
      </div>
      <div className={`faq-a ${open ? 'open' : ''}`}><p>{a}</p></div>
    </div>
  )
}
