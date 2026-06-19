<div align="center">

# ⌨️ CodeFrame
### Beautiful Code Screenshot Designer

*Transform your code into stunning, shareable screenshots in seconds.*

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-code--frame--lemon.vercel.app-7c3aed?style=for-the-badge)](https://code-frame-lemon.vercel.app)
[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)](https://reactjs.org)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

## 🎯 What is CodeFrame?

**CodeFrame** is a frontend-only React.js web application that lets developers paste any code snippet and instantly generate a **beautiful, professional-looking screenshot** — perfect for sharing on LinkedIn, Twitter, GitHub, or presentations.

No backend. No server. Everything runs in the browser.

> 📚 Built as **Case Study #120** — *Code Snippet Beautiful Mockup Designer*
> React JS | Semester II | ITM Skills University, Kharghar

---

## 📸 Screenshots

### 🏠 Home Page — Landing & Hero Section
<img src="screenshots/home.png" alt="CodeFrame Home Page" width="100%"/>

> Hero section with animated headline, live code preview window, CTA buttons, and features grid.

---

### ⌨️ Editor Page — Main Code Mockup Designer
<img src="screenshots/editor.png" alt="CodeFrame Editor Page" width="100%"/>

> Paste your code → choose theme & background → adjust canvas → export as PNG in one click.

---

### 💰 Pricing Page — Plans & Individual Purchases
<img src="screenshots/pricing.png" alt="CodeFrame Pricing Page" width="100%"/>

> Three equal plan cards — Free (₹0), Pro (₹199/mo), Team (₹499/mo) — with Add to Cart functionality and individual theme/background pricing.

---

### ℹ️ About Page — Team & Mission
<img src="screenshots/about.png" alt="CodeFrame About Page" width="100%"/>

> Stats (10,000+ screenshots, 3,500+ users), mission, tech stack, development timeline, and team section.

---

## ✨ Features

<table>
<tr>
<td>

**🔐 Authentication**
- Email + Password Login & Signup
- All routes protected
- Persists via localStorage

**🎨 Editor Themes (8)**
- Dracula, One Dark, Monokai *(Free)*
- Nord, GitHub Dark *(₹49)*
- Night Owl, Tokyo Night *(₹79)*
- Solarized *(₹99)*

**🌈 Backgrounds (15)**
- 6 Free gradient backgrounds
- 9 Premium backgrounds (₹29–₹99)

</td>
<td>

**📸 Export & Share**
- Export PNG at 3x resolution
- Copy image to clipboard
- Works 100% client-side

**🛒 Cart & Checkout**
- Add themes & plans to cart
- 3-step checkout flow
- UPI / Card / Net Banking

**💰 Pricing Plans**
- Free — ₹0/month
- Pro — ₹199/month
- Team — ₹499/month

</td>
<td>

**✦ Code Features**
- Syntax highlighting (6 languages)
- 6 code fonts to choose from
- One-click code beautifier
- Line numbers toggle
- macOS window frame

**🎬 UI & Experience**
- Scroll-triggered animations
- Save & load presets
- Canvas controls (padding, shadow, radius)
- Aspect ratio presets (1:1, 16:9, 4:3)
- Toast notifications

</td>
</tr>
</table>

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.x | UI library, hooks, component architecture |
| **Vite** | 8.x | Build tool — runs with `npm run dev` |
| **React Router** | v7 | 6-page routing + protected routes |
| **Context API** | Built-in | Global state — auth, cart, toasts |
| **html-to-image** | 1.11.x | DOM → PNG export at 3x resolution |
| **CSS Variables** | — | Dynamic theming, dark mode |
| **LocalStorage** | — | Auth persistence + preset saving |
| **IntersectionObserver** | — | Scroll-triggered entrance animations |
| **Regex** | — | Custom-built syntax highlighting tokenizer |

---

## 📄 Pages (6 Total)

```
🔐  /login     → Login & Signup         (shown first — all routes protected)
🏠  /          → Home                   (landing page, features, hero)
⌨️  /editor    → Editor                 (main code mockup designer)
💰  /pricing   → Pricing                (plans + theme/bg pricing with cart)
ℹ️  /about     → About                  (team, tech stack, timeline)
🛒  /checkout  → Checkout               (3-step payment flow)
```

---

## 📁 Project Structure

```
codeframe/
├── index.html                     ← Entry HTML, loads 7 Google Fonts
├── vite.config.js                 ← Vite + React plugin config
├── package.json                   ← Project dependencies
└── src/
    ├── main.jsx                   ← App entry — BrowserRouter wrapper
    ├── App.jsx                    ← All routes + ProtectedRoute logic
    ├── index.css                  ← Global styles + CSS variables
    ├── context/
    │   └── AppContext.jsx         ← Global state (auth, cart, toasts)
    ├── data/
    │   └── constants.js           ← All themes, backgrounds, plans, fonts
    ├── utils/
    │   ├── tokenizer.js           ← Custom syntax highlighting engine
    │   └── beautify.js            ← Client-side code formatter
    ├── components/
    │   ├── Navbar.jsx             ← Navigation + cart badge + auth buttons
    │   ├── CartDrawer.jsx         ← Slide-in cart sidebar
    │   └── ToastContainer.jsx     ← Popup notification system
    └── pages/
        ├── LoginPage.jsx          ← Login + Signup form
        ├── HomePage.jsx           ← Landing page
        ├── EditorPage.jsx         ← Code mockup designer
        ├── PricingPage.jsx        ← Pricing + cart
        ├── AboutPage.jsx          ← About page
        └── CheckoutPage.jsx       ← 3-step payment checkout
```

---

## ⚙️ Getting Started

```bash
# 1 — Clone the repository
git clone https://github.com/codebyakshay30/code_frame.git
cd code_frame

# 2 — Install dependencies
npm install

# 3 — Start development server
npm run dev
# ✅ Opens at → http://localhost:5173

# 4 — Build for production
npm run build
```

> 💡 **Demo Login:** Use any email + any password (minimum 6 characters)

---

## 🚀 Deployment

This project is deployed on **Vercel**.

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repo → Click **Deploy**
4. Live in 60 seconds ✅

---

## 🧠 Key React Concepts Used

**1. Protected Routes** — Redirects unauthenticated users to `/login`
```jsx
function ProtectedRoute({ children }) {
  const { user } = useApp()
  if (!user) return <Navigate to="/login" replace />
  return children
}
```

**2. Context API** — Share auth, cart, and toast state globally without prop drilling
```jsx
const { user, cart, addToCart, showToast } = useApp()
```

**3. Custom Hook — useInView** — Scroll animations using IntersectionObserver
```jsx
function useInView(threshold = 0.1) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, inView]
}
```

**4. PNG Export** — Captures DOM element as high-res image
```jsx
const url = await toPng(stageRef.current, { pixelRatio: 3 })
const a = document.createElement('a')
a.download = 'codeframe.png'
a.href = url
a.click()
```

---

## 👨‍💻 Developer

<div align="center">

| | |
|--|--|
| **Name** | Akshay Sharma |
| **Roll No** | 150096725107 |
| **Branch** | B.Tech Computer Science Engineering |
| **Batch** | 2025 – 2029 |
| **Semester** | II |
| **Subject** | React JS |
| **Case Study** | #120 — Code Snippet Beautiful Mockup Designer |
| **University** | ITM Skills University, Kharghar |
| **Professor** | Prasad Shridhar Junghare |

</div>

---

<div align="center">

**⭐ If you found this helpful, give it a star on GitHub!**

*Built with ❤️ using React + Vite | ITM Skills University 2025*

[![Live](https://img.shields.io/badge/Visit_Live_Site-7c3aed?style=for-the-badge)](https://code-frame-lemon.vercel.app)

</div>
