const PATTERNS = {
  js: [
    [/\/\/[^\n]*/g, 'cmt'],
    [/\/\*[\s\S]*?\*\//g, 'cmt'],
    [/`[^`]*`/g, 'str'],
    [/"(?:[^"\\]|\\.)*"/g, 'str'],
    [/'(?:[^'\\]|\\.)*'/g, 'str'],
    [/\b(function|return|const|let|var|if|else|for|while|class|new|this|import|export|default|async|await|try|catch|throw|typeof|instanceof|in|of|do|switch|case|break|continue|extends|super|static|from|null|undefined)\b/g, 'kw'],
    [/\b(true|false|NaN|Infinity)\b/g, 'num'],
    [/\b\d+\.?\d*\b/g, 'num'],
    [/\b([A-Z][a-zA-Z0-9]*)\b/g, 'type'],
    [/\b([a-z_$][a-zA-Z0-9_$]*)\s*(?=\()/g, 'fn'],
    [/[{}[\]();,.:]/g, 'punc'],
    [/[+\-*/%=<>!&|^~?]/g, 'op'],
  ],
  py: [
    [/#[^\n]*/g, 'cmt'],
    [/"""[\s\S]*?"""/g, 'str'],
    [/"[^"]*"/g, 'str'],
    [/'[^']*'/g, 'str'],
    [/@[a-zA-Z_][a-zA-Z0-9_]*/g, 'type'],
    [/\b(def|class|return|if|elif|else|for|while|import|from|as|with|try|except|finally|raise|pass|break|continue|lambda|yield|global|nonlocal|and|or|not|in|is|async|await)\b/g, 'kw'],
    [/\b(True|False|None)\b/g, 'num'],
    [/\b\d+\.?\d*\b/g, 'num'],
    [/\b([A-Z][a-zA-Z0-9]*)\b/g, 'type'],
    [/\b([a-z_][a-zA-Z0-9_]*)\s*(?=\()/g, 'fn'],
  ],
  java: [
    [/\/\/[^\n]*/g, 'cmt'],
    [/\/\*[\s\S]*?\*\//g, 'cmt'],
    [/"[^"]*"/g, 'str'],
    [/\b(public|private|protected|class|interface|extends|implements|return|if|else|for|while|new|this|static|void|import|package|try|catch|throw|finally|abstract|final|super|enum)\b/g, 'kw'],
    [/\b(true|false|null)\b/g, 'num'],
    [/\b\d+\.?\d*[fFlLdD]?\b/g, 'num'],
    [/\b([A-Z][a-zA-Z0-9]*)\b/g, 'type'],
    [/\b([a-z_][a-zA-Z0-9_]*)\s*(?=\()/g, 'fn'],
  ],
  css: [
    [/\/\*[\s\S]*?\*\//g, 'cmt'],
    [/"[^"]*"|'[^']*'/g, 'str'],
    [/#[0-9a-fA-F]{3,8}\b/g, 'num'],
    [/\b\d+\.?\d*(px|em|rem|%|vh|vw|deg|s|ms|fr)?\b/g, 'num'],
    [/:[a-zA-Z-]+/g, 'kw'],
    [/@[a-zA-Z-]+/g, 'type'],
    [/[.#][a-zA-Z][\w-]*/g, 'fn'],
    [/[a-zA-Z-]+\s*(?=:)/g, 'op'],
  ],
  html: [
    [/<!--[\s\S]*?-->/g, 'cmt'],
    [/"[^"]*"/g, 'str'],
    [/'[^']*'/g, 'str'],
    [/&[a-z]+;/g, 'type'],
    [/<\/?[a-zA-Z][a-zA-Z0-9-]*/g, 'kw'],
    [/\b[a-zA-Z-]+=(?=")/g, 'fn'],
  ],
}
PATTERNS.ts = PATTERNS.js

export function tokenize(code, lang) {
  const rules = PATTERNS[lang] || PATTERNS.js
  const len = code.length
  const cls = new Array(len).fill('')
  for (const [regex, c] of rules) {
    regex.lastIndex = 0
    let m
    while ((m = regex.exec(code)) !== null) {
      for (let i = m.index; i < m.index + m[0].length && i < len; i++) {
        if (!cls[i]) cls[i] = c
      }
    }
  }
  const lines = []
  let line = []
  let i = 0
  while (i < len) {
    if (code[i] === '\n') { lines.push(line); line = []; i++; continue }
    const c = cls[i]
    let j = i
    while (j < len && cls[j] === c && code[j] !== '\n') j++
    line.push({ cls: c, text: code.slice(i, j) })
    i = j
  }
  lines.push(line)
  return lines
}
