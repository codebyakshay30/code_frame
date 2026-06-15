import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import ToastContainer from './components/ToastContainer'
import HomePage from './pages/HomePage'
import EditorPage from './pages/EditorPage'
import PricingPage from './pages/PricingPage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'
import CheckoutPage from './pages/CheckoutPage'
import OrdersPage from './pages/OrdersPage'

function ProtectedRoute({ children }) {
  const { user } = useApp()
  if (!user) return <Navigate to="/login" replace />
  return children
}

function MainLayout() {
  const { user } = useApp()
  const location = useLocation()
  const hideNav = location.pathname === '/login'
  const showFooter = !['/login', '/editor'].includes(location.pathname)
  
  return (
    <>
      {!hideNav && <Navbar />}
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/editor" element={<ProtectedRoute><EditorPage /></ProtectedRoute>} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
      </Routes>
      {!hideNav && <CartDrawer />}
      {showFooter && <Footer />}
      <ToastContainer />
    </>
  )
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  )
}
