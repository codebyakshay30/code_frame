export function beautifyCode(code, lang) {
  try {
    if (lang === 'js' || lang === 'ts') return beautifyJS(code)
    if (lang === 'css') return beautifyCSS(code)
    if (lang === 'html') return beautifyHTML(code)
    return code
  } catch { return code }
}

function beautifyJS(code) {
  let result = '', indent = 0
  const lines = code.split('\n').map(l => l.trim()).filter(l => l !== '')
  for (let line of lines) {
    if (line.startsWith('}') || line.startsWith(')') || line.startsWith(']')) indent = Math.max(0, indent - 1)
    result += '  '.repeat(indent) + line + '\n'
    const opens = (line.match(/[{([]/g) || []).length
    const closes = (line.match(/[})\]]/g) || []).length
    indent = Math.max(0, indent + opens - closes)
  }
  return result.trim()
}

function beautifyCSS(code) {
  return code.replace(/\s*{\s*/g, ' {\n  ').replace(/;\s*/g, ';\n  ').replace(/\s*}\s*/g, '\n}\n')
    .split('\n').map(l => l.trimEnd()).filter(l => l.trim() !== '').join('\n').trim()
}

function beautifyHTML(code) {
  let result = '', indent = 0
  const voids = ['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']
  const tokens = code.match(/<[^>]+>|[^<]+/g) || []
  for (let t of tokens) {
    const s = t.trim(); if (!s) continue
    if (s.startsWith('</')) { indent = Math.max(0, indent - 1); result += '  '.repeat(indent) + s + '\n' }
    else if (s.startsWith('<') && !s.startsWith('<!') && !s.endsWith('/>')) {
      const tag = (s.match(/<([a-zA-Z0-9]+)/) || [])[1] || ''
      result += '  '.repeat(indent) + s + '\n'
      if (!voids.includes(tag.toLowerCase())) indent++
    } else { result += '  '.repeat(indent) + s + '\n' }
  }
  return result.trim()
}
