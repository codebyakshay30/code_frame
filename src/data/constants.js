export const THEMES = {
  dracula: {
    label: 'Dracula', win: '#1e1f29', bar: '#16171f', text: '#f8f8f2', free: true, price: 0,
    colors: { kw:'#ff79c6', fn:'#50fa7b', str:'#f1fa8c', num:'#bd93f9', cmt:'#6272a4', op:'#ff79c6', type:'#8be9fd', punc:'#f8f8f2', def:'#f8f8f2' },
  },
  'one-dark': {
    label: 'One Dark', win: '#282c34', bar: '#21252b', text: '#abb2bf', free: true, price: 0,
    colors: { kw:'#c678dd', fn:'#61afef', str:'#98c379', num:'#d19a66', cmt:'#5c6370', op:'#56b6c2', type:'#e06c75', punc:'#abb2bf', def:'#abb2bf' },
  },
  monokai: {
    label: 'Monokai', win: '#272822', bar: '#1e1f1c', text: '#f8f8f2', free: true, price: 0,
    colors: { kw:'#f92672', fn:'#a6e22e', str:'#e6db74', num:'#ae81ff', cmt:'#75715e', op:'#f92672', type:'#66d9ef', punc:'#f8f8f2', def:'#f8f8f2' },
  },
  nord: {
    label: 'Nord', win: '#2e3440', bar: '#242932', text: '#d8dee9', free: false, price: 49,
    colors: { kw:'#81a1c1', fn:'#88c0d0', str:'#a3be8c', num:'#b48ead', cmt:'#616e88', op:'#81a1c1', type:'#8fbcbb', punc:'#eceff4', def:'#d8dee9' },
  },
  'github-dark': {
    label: 'GitHub Dark', win: '#0d1117', bar: '#090d14', text: '#c9d1d9', free: false, price: 49,
    colors: { kw:'#ff7b72', fn:'#d2a8ff', str:'#a5d6ff', num:'#79c0ff', cmt:'#8b949e', op:'#ff7b72', type:'#ffa657', punc:'#c9d1d9', def:'#c9d1d9' },
  },
  'night-owl': {
    label: 'Night Owl', win: '#011627', bar: '#010e1a', text: '#d6deeb', free: false, price: 79,
    colors: { kw:'#c792ea', fn:'#82aaff', str:'#ecc48d', num:'#f78c6c', cmt:'#637777', op:'#c792ea', type:'#ffcb8b', punc:'#d6deeb', def:'#d6deeb' },
  },
  'tokyo-night': {
    label: 'Tokyo Night', win: '#1a1b2e', bar: '#13141f', text: '#a9b1d6', free: false, price: 79,
    colors: { kw:'#bb9af7', fn:'#7aa2f7', str:'#9ece6a', num:'#ff9e64', cmt:'#565f89', op:'#89ddff', type:'#e0af68', punc:'#a9b1d6', def:'#a9b1d6' },
  },
  solarized: {
    label: 'Solarized', win: '#002b36', bar: '#00212b', text: '#839496', free: false, price: 99,
    colors: { kw:'#859900', fn:'#268bd2', str:'#2aa198', num:'#d33682', cmt:'#586e75', op:'#859900', type:'#b58900', punc:'#839496', def:'#839496' },
  },
}

export const BACKGROUNDS = [
  { id:'bg-aurora',    label: 'Aurora',    bg: 'linear-gradient(135deg,#667eea,#764ba2)', free: true,  price: 0  },
  { id:'bg-flamingo',  label: 'Flamingo',  bg: 'linear-gradient(135deg,#f093fb,#f5576c)', free: true,  price: 0  },
  { id:'bg-ocean',     label: 'Ocean',     bg: 'linear-gradient(135deg,#4facfe,#00f2fe)', free: true,  price: 0  },
  { id:'bg-emerald',   label: 'Emerald',   bg: 'linear-gradient(135deg,#43e97b,#38f9d7)', free: true,  price: 0  },
  { id:'bg-sunset',    label: 'Sunset',    bg: 'linear-gradient(135deg,#fa709a,#fee140)', free: true,  price: 0  },
  { id:'bg-void',      label: 'Void',      bg: '#09090b',                                 free: true,  price: 0  },
  { id:'bg-lavender',  label: 'Lavender',  bg: 'linear-gradient(135deg,#a18cd1,#fbc2eb)', free: false, price: 29 },
  { id:'bg-peach',     label: 'Peach',     bg: 'linear-gradient(135deg,#ffecd2,#fcb69f)', free: false, price: 29 },
  { id:'bg-mint',      label: 'Mint',      bg: 'linear-gradient(135deg,#2af598,#009efd)', free: false, price: 29 },
  { id:'bg-twilight',  label: 'Twilight',  bg: 'linear-gradient(135deg,#30cfd0,#330867)', free: false, price: 49 },
  { id:'bg-midnight',  label: 'Midnight',  bg: 'linear-gradient(135deg,#0f0c29,#302b63,#24243e)', free: false, price: 49 },
  { id:'bg-rosegold',  label: 'Rose Gold', bg: 'linear-gradient(135deg,#f4c4c4,#c4a0c4)', free: false, price: 49 },
  { id:'bg-deepsea',   label: 'Deep Sea',  bg: 'linear-gradient(135deg,#0f2027,#203a43,#2c5364)', free: false, price: 69 },
  { id:'bg-ember',     label: 'Ember',     bg: 'linear-gradient(135deg,#fd7043,#ff8a65)', free: false, price: 69 },
  { id:'bg-neon',      label: 'Neon City', bg: 'linear-gradient(135deg,#0d0d0d,#1a0533,#0d0d0d)', free: false, price: 99 },
]

export const PLANS = [
  {
    id: 'free', name: 'Free', tag: 'Forever free', price: 0,
    desc: 'Perfect for casual use and personal projects.',
    features: ['3 editor themes (Dracula, One Dark, Monokai)', '6 background gradients', 'Export PNG at 2x resolution', 'All 6 programming languages', 'Canvas controls (padding, radius, shadow)', 'Line numbers & window frame', 'Save up to 3 presets'],
    missing: ['Premium themes', 'Premium backgrounds', 'Watermark-free export', '3x resolution export'],
    cta: 'Get Started Free', highlight: false,
  },
  {
    id: 'pro', name: 'Pro', tag: 'For pros', price: 199,
    desc: 'For developers who share code regularly.',
    features: ['Everything in Free', 'All 8 editor themes unlocked', 'All 15 premium backgrounds', 'Export PNG at 3x resolution', 'Watermark-free export', 'Unlimited preset saving', 'Copy image to clipboard', 'Priority support'],
    missing: [],
    cta: 'Get Pro', highlight: false,
  },
  {
    id: 'team', name: 'Team', tag: 'For teams', price: 499,
    desc: 'Consistent branding for your whole team.',
    features: ['Everything in Pro', 'Up to 5 team members', 'Shared preset library', 'Custom watermark / logo', 'Bulk export', 'Dedicated support', 'Early access to new features'],
    missing: [],
    cta: 'Get Team', highlight: false,
  },
]

export const FONTS = [
  { label: 'JetBrains Mono', value: "'JetBrains Mono', monospace" },
  { label: 'Fira Code',      value: "'Fira Code', monospace" },
  { label: 'Space Mono',     value: "'Space Mono', monospace" },
  { label: 'Inconsolata',    value: "'Inconsolata', monospace" },
  { label: 'Source Code Pro',value: "'Source Code Pro', monospace" },
  { label: 'Ubuntu Mono',    value: "'Ubuntu Mono', monospace" },
]

export const LANGUAGES = [
  { label: 'JavaScript', value: 'js'   },
  { label: 'TypeScript', value: 'ts'   },
  { label: 'Python',     value: 'py'   },
  { label: 'Java',       value: 'java' },
  { label: 'CSS',        value: 'css'  },
  { label: 'HTML',       value: 'html' },
]

export const FILE_EXT = { js:'code.js', ts:'code.ts', py:'main.py', java:'Main.java', css:'styles.css', html:'index.html' }

export const ASPECT_RATIOS = [
  { label: 'Free', value: 'free' },
  { label: '1:1',  value: '1/1'  },
  { label: '16:9', value: '16/9' },
  { label: '4:3',  value: '4/3'  },
]

export const DEFAULT_CODE = {
  js: `// Fetch user data with async/await\nconst fetchUser = async ({ id, fields = ['name', 'email'] }) => {\n  try {\n    const res = await fetch(\`/api/users/\${id}\`)\n    const data = await res.json()\n    return fields.reduce((acc, key) => {\n      acc[key] = data[key]\n      return acc\n    }, {})\n  } catch (error) {\n    console.error('Failed:', error.message)\n    throw error\n  }\n}`,
  ts: `interface ApiResponse<T> {\n  data: T\n  status: number\n  message: string\n}\n\nasync function fetchData<T>(\n  endpoint: string\n): Promise<ApiResponse<T>> {\n  const res = await fetch(endpoint)\n  if (!res.ok) throw new Error(\`HTTP \${res.status}\`)\n  return res.json() as Promise<ApiResponse<T>>\n}`,
  py: `from functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef fibonacci(n: int) -> int:\n    """Return the nth Fibonacci number."""\n    if n < 2:\n        return n\n    return fibonacci(n - 1) + fibonacci(n - 2)\n\nsequence = [fibonacci(i) for i in range(10)]\nprint(f"Result: {sequence}")`,
  java: `public class BinarySearch {\n    public static int search(int[] nums, int target) {\n        int left = 0, right = nums.length - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[mid] < target) left = mid + 1;\n            else right = mid - 1;\n        }\n        return -1;\n    }\n}`,
  css: `.card {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  padding: 1.5rem;\n  background: linear-gradient(135deg, #667eea, #764ba2);\n  border-radius: 16px;\n  box-shadow: 0 20px 60px rgba(0,0,0,0.3);\n  transition: transform 0.3s ease;\n}\n.card:hover { transform: translateY(-4px); }`,
  html: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8" />\n  <title>My App</title>\n  <link rel="stylesheet" href="styles.css" />\n</head>\n<body>\n  <main class="container">\n    <h1>Hello, World!</h1>\n    <button class="btn">Get Started</button>\n  </main>\n</body>\n</html>`,
}
