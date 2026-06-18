import React, { useState, useRef, useCallback } from 'react'
import { toPng } from 'html-to-image'
import { THEMES, BACKGROUNDS, FONTS, LANGUAGES, ASPECT_RATIOS, DEFAULT_CODE, FILE_EXT } from '../data/constants'
import { tokenize } from '../utils/tokenizer'
import { beautifyCode } from '../utils/beautify'
import { useApp } from '../context/AppContext'
import './EditorPage.css'

const INIT = { lang:'js', theme:'one-dark', font:"'JetBrains Mono', monospace", bgIndex:0, padding:72, radius:14, shadow:100, fontSize:13, lineHeight:1.7, showLines:true, showDots:true, showTitle:true, aspectRatio:'free' }

export default function EditorPage() {
  const [code, setCode] = useState(DEFAULT_CODE.js)
  const [cfg, setCfg]   = useState(INIT)
  const [tab, setTab]   = useState('Editor')
  const [exporting, setEx] = useState(false)
  const stageRef = useRef(null)
  const { showToast } = useApp()
  const presets = JSON.parse(localStorage.getItem('cf_presets_v2') || '[]')

  const set = useCallback((k, v) => setCfg(p => ({ ...p, [k]: v })), [])

  function handleLang(lang) { set('lang', lang); setCode(DEFAULT_CODE[lang] || DEFAULT_CODE.js) }
  function handleBeautify() { setCode(beautifyCode(code, cfg.lang)); showToast('Code beautified ✨') }

  async function handleExport() {
    if (!stageRef.current || exporting) return
    setEx(true)
    showToast('Rendering…', 'info')
    try {
      const url = await toPng(stageRef.current, { pixelRatio: 3, cacheBust: true })
      const a = document.createElement('a'); a.download = `codeframe-${Date.now()}.png`; a.href = url; a.click()
      showToast('PNG downloaded! ✓')
    } catch { showToast('Export failed. Try again.', 'error') }
    finally { setEx(false) }
  }

  async function handleCopy() {
    if (!stageRef.current) return
    showToast('Copying…', 'info')
    try {
      const url = await toPng(stageRef.current, { pixelRatio: 2 })
      const blob = await (await fetch(url)).blob()
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      showToast('Copied to clipboard! ✓')
    } catch { showToast('Copy failed.', 'error') }
  }

  function handleSavePreset() {
    const name = prompt('Name this preset:')
    if (!name?.trim()) return
    const list = JSON.parse(localStorage.getItem('cf_presets_v2') || '[]')
    list.unshift({ id: Date.now(), name: name.trim(), date: new Date().toLocaleDateString(), ...cfg })
    localStorage.setItem('cf_presets_v2', JSON.stringify(list))
    showToast(`"${name.trim()}" saved!`)
  }

  const t = THEMES[cfg.theme] || THEMES['one-dark']
  const bg = BACKGROUNDS[cfg.bgIndex]?.bg || BACKGROUNDS[0].bg
  const lines = tokenize(code, cfg.lang)

  return (
    <div className="editor-page">
      {/* Top bar */}
      <div className="ed-topbar">
        <div className="ed-tl">
          <span className="ed-label">Editor</span>
          <span className="ed-sep">/</span>
          <span className="ed-file">{FILE_EXT[cfg.lang] || 'code.js'}</span>
          <span className="ed-stat">{lines.length} lines</span>
        </div>
        <div className="ed-tr">
          <button className="ed-ghost-btn" onClick={handleCopy} disabled={exporting}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
            Copy Image
          </button>
          <button className="ed-primary-btn" onClick={handleExport} disabled={exporting}>
            {exporting ? <span className="ed-spin" /> : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>}
            {exporting ? 'Exporting…' : 'Export PNG'}
          </button>
        </div>
      </div>

      <div className="ed-body">
        {/* Sidebar */}
        <aside className="ed-sidebar">
          <div className="ed-tabs">
            {['Editor','Style','Canvas','Presets'].map(t2 => (
              <button key={t2} className={`ed-tab ${tab === t2 ? 'active' : ''}`} onClick={() => setTab(t2)}>{t2}</button>
            ))}
          </div>
          <div className="ed-panel">

            {tab === 'Editor' && <>
              <SLabel>Language</SLabel>
              <div className="lang-pills">
                {LANGUAGES.map(l => <button key={l.value} className={`lpill ${cfg.lang === l.value ? 'active' : ''}`} onClick={() => handleLang(l.value)}>{l.label}</button>)}
              </div>
              <Div />
              <div className="code-hdr">
                <SLabel>Code Snippet</SLabel>
                <button className="beau-btn" onClick={handleBeautify}>✦ Beautify</button>
              </div>
              <textarea className="code-ta" value={code} onChange={e => setCode(e.target.value)} spellCheck={false} />
              <Div />
              <SLabel>Font Family</SLabel>
              <select className="s-sel" value={cfg.font} onChange={e => set('font', e.target.value)}>
                {FONTS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
              </select>
              <div className="two-sl">
                <div><SLabel>Font Size</SLabel><Slider min={10} max={20} v={cfg.fontSize} onChange={v => set('fontSize', v)} u="px" /></div>
                <div><SLabel>Line Height</SLabel><Slider min={1.2} max={2.2} step={0.1} v={cfg.lineHeight} onChange={v => set('lineHeight', v)} /></div>
              </div>
            </>}

            {tab === 'Style' && <>
              <SLabel>Editor Theme</SLabel>
              <div className="theme-grid">
                {Object.entries(THEMES).map(([key, th]) => (
                  <button key={key} className={`tc ${cfg.theme === key ? 'active' : ''}`} onClick={() => set('theme', key)} style={{ background: th.win }}>
                    <div className="tc-b" style={{ background: th.bar }}>
                      <span className="tc-d" style={{ background:'#ff5f57' }} /><span className="tc-d" style={{ background:'#febc2e' }} /><span className="tc-d" style={{ background:'#28c940' }} />
                    </div>
                    <div className="tc-ls">
                      {[th.colors.kw,th.colors.fn,th.colors.str,th.colors.cmt].map((c,i)=>(<span key={i} className="tc-l" style={{background:c,width:['55%','42%','68%','38%'][i]}} />))}
                    </div>
                    <div className="tc-name" style={{ color: th.text }}>{th.label}</div>
                    {th.free ? <div className="tc-free">Free</div> : <div className="tc-paid">₹{th.price}</div>}
                  </button>
                ))}
              </div>
              <Div />
              <SLabel>Background</SLabel>
              <div className="bg-grid">
                {BACKGROUNDS.map((b,i) => (
                  <button key={b.id} className={`bg-sw ${cfg.bgIndex === i ? 'active' : ''}`} style={{ background: b.bg }} onClick={() => set('bgIndex', i)} title={b.label} />
                ))}
              </div>
              <Div />
              <SLabel>Window Options</SLabel>
              <Toggle label="macOS Traffic Lights" v={cfg.showDots}  onChange={v => set('showDots', v)} />
              <Toggle label="Window Title Bar"     v={cfg.showTitle} onChange={v => set('showTitle', v)} />
              <Toggle label="Line Numbers"         v={cfg.showLines} onChange={v => set('showLines', v)} />
            </>}

            {tab === 'Canvas' && <>
              <SLabel>Aspect Ratio</SLabel>
              <div className="ratio-pills">
                {ASPECT_RATIOS.map(r => <button key={r.value} className={`rpill ${cfg.aspectRatio === r.value ? 'active' : ''}`} onClick={() => set('aspectRatio', r.value)}>{r.label}</button>)}
              </div>
              <Div />
              <SLabel>Canvas Padding</SLabel><Slider min={24} max={120} v={cfg.padding} onChange={v => set('padding', v)} u="px" />
              <SLabel>Window Radius</SLabel><Slider min={0} max={24} v={cfg.radius} onChange={v => set('radius', v)} u="px" />
              <SLabel>Shadow Depth</SLabel><Slider min={0} max={120} v={cfg.shadow} onChange={v => set('shadow', v)} u="px" />
              <Div />
              <SLabel>Quick Styles</SLabel>
              <div className="quick-grid">
                {[{l:'Minimal',p:48,s:40,r:8,b:13},{l:'Bold',p:80,s:120,r:16,b:0},{l:'Clean',p:64,s:80,r:12,b:5},{l:'Neon',p:96,s:100,r:20,b:8}].map(q=>(
                  <button key={q.l} className="qbtn" onClick={() => {set('padding',q.p);set('shadow',q.s);set('radius',q.r);set('bgIndex',q.b)}}>{q.l}</button>
                ))}
              </div>
            </>}

            {tab === 'Presets' && <>
              <button className="save-preset-btn" onClick={handleSavePreset}>💾 Save Current Settings</button>
              {presets.length === 0 ? (
                <div className="no-presets"><div>📁</div><p>No saved presets</p><span>Save your favourite styles to reuse</span></div>
              ) : (
                <div className="preset-list">
                  {presets.map(p => (
                    <div key={p.id} className="preset-item">
                      <div className="pi-preview" style={{ background: BACKGROUNDS[p.bgIndex]?.bg || '#333' }}>
                        <div className="pi-win" style={{ background: THEMES[p.theme]?.win || '#1e1e1e' }}>
                          {['#ff5f57','#febc2e','#28c940'].map(c => <span key={c} className="pi-dot" style={{background:c}} />)}
                        </div>
                      </div>
                      <div className="pi-info">
                        <div className="pi-name">{p.name}</div>
                        <div className="pi-meta">{p.date} · {THEMES[p.theme]?.label}</div>
                      </div>
                      <button className="pi-load" onClick={() => setCfg({ ...INIT, ...p })}>Load</button>
                    </div>
                  ))}
                </div>
              )}
            </>}
          </div>
        </aside>

        <main className="ed-canvas">
          <div className="canvas-bg">
            <div ref={stageRef} className="mockup-stage" style={{
              background: bg, 
              padding: `${cfg.padding}px`,
              aspectRatio: cfg.aspectRatio !== 'free' ? cfg.aspectRatio : undefined,
              width: cfg.aspectRatio === 'free' ? 'auto' : undefined,
              minWidth: '480px',
            }}>
              <div className="win" style={{
                background: t.win, borderRadius: cfg.radius,
                boxShadow: cfg.shadow > 0 ? `0 ${cfg.shadow/2}px ${cfg.shadow}px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.05)` : 'none',
              }}>
                {(cfg.showDots || cfg.showTitle) && (
                  <div className="win-bar" style={{ background: t.bar }}>
                    {cfg.showDots && <div className="win-dots"><span className="wd" style={{background:'#ff5f57'}} /><span className="wd" style={{background:'#febc2e'}} /><span className="wd" style={{background:'#28c940'}} /></div>}
                    {cfg.showTitle && (
                      <div style={{ display: 'flex', alignItems: 'center', marginLeft: 9 }}>
                        <img src="/favicon.svg" width="12" height="12" style={{ opacity: 0.4, marginRight: 6 }} alt="" />
                        <span className="win-fn" style={{ marginLeft: 0 }}>{FILE_EXT[cfg.lang]}</span>
                      </div>
                    )}
                  </div>
                )}
                <div className="win-code" style={{ background: t.win, fontFamily: cfg.font, fontSize: cfg.fontSize, lineHeight: cfg.lineHeight }}>
                  <table className="code-table"><tbody>
                    {lines.map((toks, i) => (
                      <tr key={i}>
                        {cfg.showLines && <td className="ln">{i + 1}</td>}
                        <td className="lc">
                          {toks.length === 0 ? <span>&nbsp;</span> : toks.map((tok, j) => (
                            <span key={j} style={{ color: tok.cls ? t.colors[tok.cls] : t.colors.def, fontStyle: tok.cls === 'cmt' ? 'italic' : 'normal' }}>{tok.text}</span>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody></table>
                </div>
              </div>
            </div>
          </div>
          <div className="canvas-status">
            <span>{THEMES[cfg.theme]?.label} · {BACKGROUNDS[cfg.bgIndex]?.label}</span>
            <span>{lines.length} lines · {code.length} chars</span>
          </div>
        </main>
      </div>
    </div>
  )
}

function SLabel({ children }) { return <div className="s-lbl">{children}</div> }
function Div() { return <div className="s-div" /> }
function Slider({ min, max, step = 1, v, onChange, u = '' }) {
  return (
    <div className="sl-row">
      <input type="range" className="sl" min={min} max={max} step={step} value={v} onChange={e => onChange(parseFloat(e.target.value))} />
      <span className="sl-v">{v}{u}</span>
    </div>
  )
}
function Toggle({ label, v, onChange }) {
  return (
    <div className="tog-row">
      <span className="tog-lbl">{label}</span>
      <div className={`tog ${v ? 'on' : ''}`} onClick={() => onChange(!v)}><div className="tog-thumb" /></div>
    </div>
  )
}
