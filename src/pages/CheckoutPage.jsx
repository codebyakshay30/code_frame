import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import './CheckoutPage.css'

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart, user, showToast, addOrder } = useApp()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: '', upi: '', method: 'upi' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [lastOrderId, setLastOrderId] = useState('')

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  if (cart.length === 0 && !done) {
    return (
      <div className="checkout-empty">
        <div className="ce-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add some themes or a plan before checking out.</p>
        <Link to="/pricing" className="ce-btn">Browse Pricing →</Link>
      </div>
    )
  }

  async function handlePay(e) {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 2000))
    
    const orderId = `CF-${Date.now().toString().slice(-8)}`
    setLastOrderId(orderId)
    
    addOrder({
      id: orderId,
      date: new Date().toLocaleDateString(),
      items: [...cart],
      total: cartTotal,
      method: form.method
    })

    setLoading(false)
    setDone(true)
    clearCart()
    showToast('Payment successful! 🎉')
  }

  if (done) return (
    <div className="checkout-success animate-scaleIn">
      <div className="cs-icon">🎉</div>
      <h2>Payment Successful!</h2>
      <p>Your themes and plan have been unlocked. Enjoy creating beautiful code screenshots!</p>
      <div className="cs-order-id">Order ID: {lastOrderId}</div>
      <div className="cs-btns">
        <Link to="/orders" className="cs-primary-btn">View My Orders →</Link>
        <Link to="/editor" className="cs-ghost-btn">Open Editor</Link>
      </div>
    </div>
  )

  return (
    <div className="checkout-page">
      <div className="checkout-inner">

        {/* Steps */}
        <div className="checkout-steps">
          {[1,2,3].map(s => (
            <div key={s} className={`cstep ${step >= s ? 'active' : ''} ${step > s ? 'done' : ''}`}>
              <div className="cstep-num">{step > s ? '✓' : s}</div>
              <span>{['Review','Details','Payment'][s-1]}</span>
            </div>
          ))}
        </div>

        <div className="checkout-layout">

          {/* Left - form */}
          <div className="checkout-form-col">

            {step === 1 && (
              <div className="checkout-card animate-fadeInUp">
                <h2>Review Your Order</h2>
                <div className="review-items">
                  {cart.map(item => (
                    <div key={item.id} className="review-item">
                      <div className="ri-preview" style={{ background: item.preview }} />
                      <div className="ri-info">
                        <div className="ri-name">{item.name}</div>
                        <div className="ri-type">{item.type}</div>
                      </div>
                      <div className="ri-price">₹{item.price}</div>
                    </div>
                  ))}
                </div>
                <button className="co-next-btn" onClick={() => setStep(2)}>Continue to Details →</button>
              </div>
            )}

            {step === 2 && (
              <div className="checkout-card animate-fadeInUp">
                <h2>Your Details</h2>
                <div className="co-form">
                  <div className="co-field">
                    <label>Full Name</label>
                    <input type="text" value={form.name} onChange={e => set('name', e.target.value)} placeholder="John Doe" required />
                  </div>
                  <div className="co-field">
                    <label>Email Address</label>
                    <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" required />
                  </div>
                  <div className="co-field">
                    <label>Phone Number</label>
                    <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 98765 43210" required />
                  </div>
                </div>
                <div className="co-btns">
                  <button className="co-back-btn" onClick={() => setStep(1)}>← Back</button>
                  <button className="co-next-btn" onClick={() => setStep(3)} disabled={!form.name || !form.email}>Continue to Payment →</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <form className="checkout-card animate-fadeInUp" onSubmit={handlePay}>
                <h2>Payment</h2>
                <div className="payment-methods">
                  {[['upi','📱 UPI'], ['card','💳 Card'], ['netbanking','🏦 Net Banking']].map(([v, l]) => (
                    <label key={v} className={`pm-option ${form.method === v ? 'selected' : ''}`}>
                      <input type="radio" name="method" value={v} checked={form.method === v} onChange={() => set('method', v)} />
                      {l}
                    </label>
                  ))}
                </div>

                {form.method === 'upi' && (
                  <div className="co-field animate-fadeInUp">
                    <label>UPI ID</label>
                    <input type="text" value={form.upi} onChange={e => set('upi', e.target.value)} placeholder="yourname@upi" required />
                  </div>
                )}
                {form.method === 'card' && (
                  <div className="animate-fadeInUp">
                    <div className="co-field"><label>Card Number</label><input type="text" placeholder="1234 5678 9012 3456" maxLength="19" /></div>
                    <div className="co-row">
                      <div className="co-field"><label>Expiry</label><input type="text" placeholder="MM/YY" maxLength="5" /></div>
                      <div className="co-field"><label>CVV</label><input type="text" placeholder="123" maxLength="3" /></div>
                    </div>
                  </div>
                )}
                {form.method === 'netbanking' && (
                  <div className="co-field animate-fadeInUp">
                    <label>Select Bank</label>
                    <select><option>SBI</option><option>HDFC</option><option>ICICI</option><option>Axis</option><option>Kotak</option></select>
                  </div>
                )}

                <div className="co-btns" style={{ marginTop: 24 }}>
                  <button type="button" className="co-back-btn" onClick={() => setStep(2)}>← Back</button>
                  <button type="submit" className="co-pay-btn" disabled={loading}>
                    {loading ? <><span className="pay-spinner" /> Processing…</> : `Pay ₹${cartTotal} Now →`}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right - summary */}
          <div className="checkout-summary">
            <div className="cs-card">
              <div className="cs-title">Order Summary</div>
              {cart.map(item => (
                <div key={item.id} className="cs-row">
                  <span>{item.name}</span>
                  <span>₹{item.price}</span>
                </div>
              ))}
              <div className="cs-divider" />
              <div className="cs-total-row">
                <span>Total</span>
                <span className="cs-total-val">₹{cartTotal}</span>
              </div>
              <div className="cs-tax">Inclusive of all taxes (GST 18%)</div>
              <div className="cs-secure">
                <span>🔒</span> Secured by Razorpay
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
