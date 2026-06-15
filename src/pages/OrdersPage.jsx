import React from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import './OrdersPage.css'

export default function OrdersPage() {
  const { orders } = useApp()

  return (
    <div className="orders-page">
      <div className="orders-inner animate-fadeInUp">
        <div className="section-tag">History</div>
        <h1 className="orders-title">My Orders</h1>
        <p className="orders-sub">View your past purchases, plans, and unlocked items.</p>

        {orders.length === 0 ? (
          <div className="orders-empty">
            <div className="oe-icon">📦</div>
            <h2>No orders yet</h2>
            <p>You haven't made any purchases. Explore our pricing page to find premium themes and plans.</p>
            <Link to="/pricing" className="oe-btn">Explore Pricing →</Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order, i) => (
              <div key={order.id} className="order-card" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="order-header">
                  <div className="order-meta">
                    <span className="order-id">Order {order.id}</span>
                    <span className="order-date">{order.date}</span>
                  </div>
                  <div className="order-total">
                    <span className="total-lbl">Total</span>
                    <span className="total-val">₹{order.total}</span>
                  </div>
                </div>
                
                <div className="order-items">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="o-item">
                      <div className="oi-preview" style={{ background: item.preview }} />
                      <div className="oi-info">
                        <span className="oi-name">{item.name}</span>
                        <span className="oi-type">{item.type}</span>
                      </div>
                      <div className="oi-price">₹{item.price}</div>
                    </div>
                  ))}
                </div>
                
                <div className="order-footer">
                  <span className="order-method">
                    Paid via {order.method === 'upi' ? 'UPI' : order.method === 'card' ? 'Card' : 'Net Banking'}
                  </span>
                  <button className="order-receipt-btn" onClick={() => alert('Receipt downloaded!')}>Download Receipt</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
