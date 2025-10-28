
import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { usd } from '../utils/currency'
import { buildAffirmCheckout, openAffirmCheckout } from '../utils/affirm'

export default function CartDrawer({ open, onClose }) {
  const { items, totals, updateQty, removeItem, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCheckout = async () => {
    setError(''); setLoading(true)
    try {
      const checkout = buildAffirmCheckout(items, totals)
      const res = await openAffirmCheckout(checkout) // returns { checkout_token }
      const okAuth = await fetch('/.netlify/functions/affirm-authorize', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ checkout_token: res.checkout_token })
      })
      const authData = await okAuth.json()
      if (!okAuth.ok) throw new Error(authData?.error || 'authorize_failed')
      const cap = await fetch('/.netlify/functions/affirm-capture', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ charge_id: authData.charge_id })
      })
      const capData = await cap.json()
      if (!cap.ok) throw new Error(capData?.error || 'capture_failed')
      clearCart()
      window.location.href = '/order-confirmed'
    } catch (e) {
      setError(e.message || 'Checkout error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="position-fixed top-0 end-0 h-100"
      style={{ width: open ? 380 : 0, transition: 'width .2s ease', background:'#111722', borderLeft:'1px solid rgba(255,255,255,.08)', overflow:'hidden', zIndex: 1050 }}
      aria-hidden={!open}
      aria-label="Cart drawer"
    >
      <div className="d-flex align-items-center justify-content-between p-3 border-bottom border-secondary">
        <h5 className="m-0">Your Cart</h5>
        <button className="btn btn-sm btn-outline-light" onClick={onClose}>Close</button>
      </div>
      <div className="p-3 d-flex flex-column gap-3" style={{height:'calc(100% - 160px)', overflow:'auto'}}>
        {items.length === 0 && <div className="text-white-50">Your cart is empty.</div>}
        {items.map(it => (
          <div key={it.id} className="d-flex gap-3 align-items-center">
            <img src={it.image} width="64" height="64" style={{objectFit:'cover', borderRadius:12}} alt={it.title} />
            <div className="flex-grow-1">
              <div className="fw-semibold">{it.title}</div>
              <div className="small text-white-50">{usd(it.price)}</div>
              <div className="d-flex align-items-center gap-2 mt-1">
                <button className="btn btn-sm btn-outline-light" onClick={()=>updateQty(it.id, it.qty-1)}>-</button>
                <span className="small">{it.qty}</span>
                <button className="btn btn-sm btn-outline-light" onClick={()=>updateQty(it.id, it.qty+1)}>+</button>
                <button className="btn btn-sm btn-outline-danger ms-2" onClick={()=>removeItem(it.id)}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-top border-secondary">
        <div className="d-flex justify-content-between"><span>Subtotal</span><strong>{usd(totals.subtotal)}</strong></div>
        {error && <div className="text-danger small mt-2">{error}</div>}
        <button className="btn btn-accent w-100 mt-3" disabled={items.length===0 || loading} onClick={handleCheckout}>
          {loading ? 'Processing…' : 'Checkout with Affirm'}
        </button>
      </div>
    </div>
  )
}
