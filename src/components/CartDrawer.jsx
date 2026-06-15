import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import './CartDrawer.css'

export default function CartDrawer() {
  const { cart, removeFromCart, clearCart, cartTotal, cartOpen, setCartOpen, user } = useApp()
  const navigate = useNavigate()

  if (!cartOpen) return null

  function handleCheckout() {
    if (!user) {
      setCartOpen(false)
      navigate('/login?redirect=checkout')
      return
    }
    setCartOpen(false)
    navigate('/checkout')
  }

  return (
    <>
      <div className="cart-overlay" onClick={() => setCartOpen(false)} />
      <div className="cart-drawer animate-slideIn">
        <div className="cart-header">
          <div className="cart-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 001.98 1.61h9.72a2 2 0 001.98-1.61L23 6H6"/>
            </svg>
            Cart {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
          </div>
          <button className="cart-close" onClick={() => setCartOpen(false)}>✕</button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <p>Your cart is empty</p>
            <span>Add themes or backgrounds to get started</span>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item animate-fadeInUp">
                  <div className="ci-preview" style={{ background: item.preview || '#333' }} />
                  <div className="ci-info">
                    <div className="ci-name">{item.name}</div>
                    <div className="ci-type">{item.type}</div>
                  </div>
                  <div className="ci-price">₹{item.price}</div>
                  <button className="ci-remove" onClick={() => removeFromCart(item.id)}>✕</button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total-row">
                <span className="ct-label">Total</span>
                <span className="ct-value">₹{cartTotal}</span>
              </div>
              <div className="cart-tax">Inclusive of all taxes</div>
              <button className="cart-checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout →
              </button>
              <button className="cart-clear-btn" onClick={clearCart}>Clear Cart</button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
