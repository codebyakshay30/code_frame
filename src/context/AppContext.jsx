import React, { createContext, useContext, useState, useCallback } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  // Auth
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cf_user') || 'null') } catch { return null }
  })

  // Orders
  const [orders, setOrders] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cf_orders') || '[]') } catch { return [] }
  })

  // Cart
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  // Toast
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((msg, type = 'success') => {
    const id = Date.now()
    setToasts(p => [...p, { id, msg, type }])
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500)
  }, [])

  const login = useCallback((email, password) => {
    // Simulated login — in real app this would call an API
    if (!email || !password) return { ok: false, error: 'Please fill all fields' }
    if (password.length < 6) return { ok: false, error: 'Password must be at least 6 characters' }
    const u = { email, name: email.split('@')[0], plan: 'free', avatar: email[0].toUpperCase() }
    setUser(u)
    localStorage.setItem('cf_user', JSON.stringify(u))
    showToast(`Welcome back, ${u.name}! 🎉`)
    return { ok: true }
  }, [showToast])

  const signup = useCallback((name, email, password) => {
    if (!name || !email || !password) return { ok: false, error: 'Please fill all fields' }
    if (password.length < 6) return { ok: false, error: 'Password must be at least 6 characters' }
    const u = { email, name, plan: 'free', avatar: name[0].toUpperCase() }
    setUser(u)
    localStorage.setItem('cf_user', JSON.stringify(u))
    showToast(`Account created! Welcome, ${name}! 🎉`)
    return { ok: true }
  }, [showToast])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('cf_user')
    showToast('Logged out successfully')
  }, [showToast])

  const addOrder = useCallback((order) => {
    setOrders(p => {
      const newOrders = [order, ...p]
      localStorage.setItem('cf_orders', JSON.stringify(newOrders))
      return newOrders
    })
  }, [])

  const addToCart = useCallback((item) => {
    setCart(p => {
      if (p.find(i => i.id === item.id)) {
        showToast(`${item.name} is already in cart`, 'info')
        return p
      }
      showToast(`${item.name} added to cart! 🛒`)
      return [...p, item]
    })
    setCartOpen(true)
  }, [showToast])

  const removeFromCart = useCallback((id) => {
    setCart(p => p.filter(i => i.id !== id))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const cartTotal = cart.reduce((sum, i) => sum + i.price, 0)

  return (
    <AppContext.Provider value={{
      user, login, signup, logout,
      orders, addOrder,
      cart, addToCart, removeFromCart, clearCart, cartTotal,
      cartOpen, setCartOpen,
      toasts, showToast,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
