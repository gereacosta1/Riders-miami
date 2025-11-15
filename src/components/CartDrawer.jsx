// src/components/CartDrawer.jsx
import React, { useState, memo } from 'react'
import { useCart } from '../context/CartContext'
import { usd } from '../utils/currency'
import { buildAffirmCheckout, openAffirmCheckout } from '../utils/affirm'

export default function CartDrawer({ open, onClose }) {
  const { items, totals, updateQty, removeItem, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCheckout = async () => {
  setError('');
  setLoading(true);

  try {
    const checkout = buildAffirmCheckout(items, totals);
    const res = await openAffirmCheckout(checkout);

    // Si el usuario cerró sin completar, openAffirmCheckout lanza un error.
    // No llegamos a esta línea en ese caso.

    const okAuth = await fetch('/.netlify/functions/affirm-authorize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ checkout_token: res.checkout_token }),
    });

    const authData = await okAuth.json();

    if (!okAuth.ok) {
      // mapear mensaje amigable
      const msgFromAffirm = authData?.affirm_message;
      throw new Error(
        msgFromAffirm ||
        'Affirm couldn’t authorize this purchase. It may be a credit decision or an issue with the account.'
      );
    }

    const cap = await fetch('/.netlify/functions/affirm-capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ charge_id: authData.charge_id }),
    });

    const capData = await cap.json();

    if (!cap.ok) {
      const msgFromAffirm = capData?.affirm_message;
      throw new Error(
        msgFromAffirm ||
        'Affirm authorized the payment but we couldn’t complete the charge. Please contact us to verify your order.'
      );
    }

    clearCart();
    window.location.href = '/order-confirmed';
  } catch (e) {
    console.error(e);

    const msg = e?.message || '';

    // casos especiales de cierre del modal
    if (msg === 'User closed' || msg === 'User aborted') {
      // Si querés no mostrar nada, simplemente return sin setError.
      setError('You closed the Affirm window before completing the payment.');
      return;
    }

    // mensaje genérico
    setError(
      msg ||
      'We couldn’t complete the payment with Affirm. Please try again or contact us if the problem continues.'
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <div
      className="rm-drawer"
      style={{
        transform: open ? 'translate3d(0,0,0)' : 'translate3d(110%,0,0)', // GPU-friendly
        pointerEvents: open ? 'auto' : 'none',
      }}
      aria-hidden={!open}
      aria-label="Cart drawer"
    >
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between p-3 border-bottom border-secondary">
        <h5 className="m-0">Your Cart</h5>
        <button className="btn btn-sm btn-outline-light" onClick={onClose}>Close</button>
      </div>

      {/* Body */}
      <div className="p-3 d-flex flex-column gap-3 flex-grow-1 overflow-auto" style={{ minHeight: 0 }}>
        {items.length === 0 && <div className="text-white-50">Your cart is empty.</div>}
        {items.map(it => (
          <CartItem key={it.id} it={it} updateQty={updateQty} removeItem={removeItem} />
        ))}
      </div>

      {/* Footer */}
      <div
        className="border-top border-secondary p-3"
        style={{
          background: '#111722',
          borderBottomLeftRadius: '14px',
          borderBottomRightRadius: '14px',
          paddingBottom: '60px', // 🔥 espacio extra inferior
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span>Subtotal</span>
          <strong>{usd(totals.subtotal)}</strong>
        </div>

        {error && <div className="text-danger small mt-2">{error}</div>}

        <button
          className="btn btn-accent w-100"
          onClick={handleCheckout}
          disabled={items.length === 0 || loading}
          style={{
            borderRadius: '12px',
            paddingBlock: '14px',
            fontWeight: 600,
            boxShadow: '0 6px 20px rgba(111, 78, 255, 0.35)',
            transition: 'transform .15s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          {loading ? 'Processing…' : 'Checkout with Affirm'}
        </button>
      </div>
    </div>
  )
}

/* ---------------------- Cart Item Row ---------------------- */
const CartItem = memo(function CartItem({ it, updateQty, removeItem }) {
  return (
    <div className="d-flex gap-3 align-items-center">
      <img
        src={it.image || '/img/placeholder.png'}
        width="64"
        height="64"
        style={{ objectFit: 'cover', borderRadius: 12 }}
        alt={it.title}
        onError={(e) => { e.currentTarget.src = '/img/placeholder.png' }}
        loading="lazy"
      />
      <div className="flex-grow-1">
        <div className="fw-semibold">{it.title}</div>
        <div className="small text-white-50">{usd(it.price)}</div>
        <div className="d-flex align-items-center gap-2 mt-1">
          <button className="btn btn-sm btn-outline-light" onClick={() => updateQty(it.id, it.qty - 1)}>-</button>
          <span className="small">{it.qty}</span>
          <button className="btn btn-sm btn-outline-light" onClick={() => updateQty(it.id, it.qty + 1)}>+</button>
          <button className="btn btn-sm btn-outline-danger ms-2" onClick={() => removeItem(it.id)}>Remove</button>
        </div>
      </div>
    </div>
  )
})
