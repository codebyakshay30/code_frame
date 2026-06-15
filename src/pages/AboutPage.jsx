import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './AboutPage.css'

function useInView(t = 0.1) {
  const ref = useRef(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true) }, { threshold: t })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [t])
  return [ref, v]
}

const STATS = [{ v: '10,000+', l: 'Screenshots Created' }, { v: '3,500+', l: 'Active Users' }, { v: '8', l: 'Editor Themes' }, { v: '15', l: 'Backgrounds' }]
const TECH = [
  { name: 'React 18 + Vite', desc: 'Fast modern build tool with HMR' },
  { name: 'React Router v6', desc: 'Client-side routing for 5 pages' },
  { name: 'Context API', desc: 'Global state for auth, cart, toasts' },
  { name: 'html-to-image', desc: 'DOM-to-PNG export at 3x resolution' },
  { name: 'CSS Variables', desc: 'Dynamic theming with zero runtime' },
  { name: 'LocalStorage API', desc: 'Preset saving, auth persistence' },
]
const TIMELINE = [
  { date: 'Jan 2025', event: 'Project conception & research phase' },
  { date: 'Feb 2025', event: 'UI/UX wireframing and design system' },
  { date: 'Mar 2025', event: 'Core editor and syntax highlighter built' },
  { date: 'Apr 2025', event: 'Theme system and PNG export pipeline' },
  { date: 'May 2025', event: 'Pricing, cart, login, checkout added' },
  { date: 'Jun 2025', event: 'Version 1.0 deployed on Vercel ✓' },
]
const TEAM = [
  { name: 'Arjun Sharma', role: 'Frontend Developer', av: 'AS', color: '#7c3aed' },
  { name: 'Priya Mehta', role: 'UI/UX Designer', av: 'PM', color: '#0ea5e9' },
  { name: 'Rahul Verma', role: 'Full Stack Developer', av: 'RV', color: '#10b981' },
  { name: 'Sneha Patil', role: 'Product Manager', av: 'SP', color: '#f59e0b' },
]

export default function AboutPage() {
  const [heroRef, heroIn] = useInView(0.05)
  const [statsRef, statsIn] = useInView(0.1)
  const [missionRef, missionIn] = useInView(0.05)
  const [techRef, techIn] = useInView(0.05)
  const [timelineRef, timelineIn] = useInView(0.05)
  const [teamRef, teamIn] = useInView(0.05)

  return (
    <div className="about-page">

      <section className="about-hero" ref={heroRef}>
        <div className="about-glow" />
        <div className={`about-hero-inner ${heroIn ? 'visible' : ''}`}>
          <div className="section-tag">About CodeFrame</div>
          <h1 className="about-title">Built by developers,<br /><span className="about-grad">for developers</span></h1>
          <p className="about-sub">CodeFrame started as a simple idea — make code look beautiful when you share it. We built the tool we always wished existed.</p>
        </div>
      </section>

      <section className="stats-section" ref={statsRef}>
        <div className={`stats-grid ${statsIn ? 'visible' : ''}`}>
          {STATS.map((s, i) => (
            <div key={s.l} className={`stat-card ${statsIn ? 'card-visible' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="stat-val">{s.v}</div>
              <div className="stat-lbl">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section" ref={missionRef}>
        <div className={`about-two-col ${missionIn ? 'visible' : ''}`}>
          <div>
            <div className="section-tag">Our Mission</div>
            <h2 className="about-h2">Making code sharing beautiful and effortless</h2>
            <p className="about-p">Every day, developers share code on Twitter, LinkedIn, Stack Overflow, and team presentations. Plain screenshots look unprofessional. Pasting raw code loses all formatting.</p>
            <p className="about-p">CodeFrame solves this — turning any snippet into a stunning, customisable image in seconds. No backend, no sign-up, no complexity.</p>
            <p className="about-p">Built as the <strong>React JS Case Study</strong> for B.Tech CSE Semester II at <strong>ITM Skills University, Kharghar.</strong></p>
          </div>
          <div className="mission-card">
            <div style={{color:'#c678dd'}}>Problem</div>
            <div style={{color:'#98c379'}}>Code shared as plain text</div>
            <div style={{color:'#98c379'}}>lacks colour & formatting</div>
            <div style={{height:10}} />
            <div style={{color:'#61afef'}}>Solution</div>
            <div style={{color:'#5c6370',fontStyle:'italic'}}>// CodeFrame renders</div>
            <div style={{color:'#5c6370',fontStyle:'italic'}}>// beautiful code images</div>
            <div style={{color:'#d19a66'}}>instantly ✦</div>
          </div>
        </div>
      </section>

      <section className="about-section alt-bg" ref={techRef}>
        <div className="about-section-inner">
          <div className="section-tag">Tech Stack</div>
          <h2 className="about-h2">Built with modern React + Vite</h2>
          <div className="tech-grid">
            {TECH.map((t, i) => (
              <div key={t.name} className={`tech-card ${techIn ? 'card-visible' : ''}`} style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="tech-name">{t.name}</div>
                <div className="tech-desc">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section" ref={timelineRef}>
        <div className="about-section-inner">
          <div className="section-tag">Development Timeline</div>
          <h2 className="about-h2">How we built it</h2>
          <div className={`timeline ${timelineIn ? 'visible' : ''}`}>
            {TIMELINE.map((item, i) => (
              <div key={i} className={`tl-item ${timelineIn ? 'card-visible' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}>
                <div className="tl-dot" />
                <div className="tl-date">{item.date}</div>
                <div className="tl-event">{item.event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section alt-bg" ref={teamRef}>
        <div className="about-section-inner">
          <div className="section-tag">The Team</div>
          <h2 className="about-h2">Meet the people behind CodeFrame</h2>
          <div className="team-grid">
            {TEAM.map((m, i) => (
              <div key={m.name} className={`team-card ${teamIn ? 'card-visible' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}>
                <div className="team-avatar" style={{ background: m.color }}>{m.av}</div>
                <div className="team-name">{m.name}</div>
                <div className="team-role">{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="about-cta-inner">
          <h2>Try CodeFrame today</h2>
          <p>It's free to start — no account required.</p>
          <div className="about-cta-btns">
            <Link to="/editor" className="btn-primary-a">Open the Editor →</Link>
            <Link to="/pricing" className="btn-ghost-a">View Pricing</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
