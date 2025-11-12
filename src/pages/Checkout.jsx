// src/pages/Checkout.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { usd } from '../utils/currency';
import { startAffirm } from '../utils/affirm';

export default function Checkout() {
  const { items, totals } = useCart();

  const handlePayWithAffirm = async () => {
    try {
      await startAffirm(items, {
        // si tu contexto ya trae shipping/tax, pásalos aquí:
        shipping: totals?.shipping || 0,
        tax: totals?.tax || 0,
        // opcional: si querés forzar el total exacto:
        // total: totals?.total
      });
    } catch (e) {
      console.error(e);
      alert(e.message || 'Unable to start Affirm checkout.');
    }
  };

  return (
    <section className="container-narrow my-5">
      <h1>Checkout</h1>
      <p className="text-white-50">Review your order before paying with Affirm.</p>

      <div className="card-dark p-3">
        {items.length === 0 ? (
          <div>Your cart is empty.</div>
        ) : (
          <>
            {items.map((it) => (
              <div
                key={it.id}
                className="d-flex justify-content-between py-2 border-bottom border-secondary"
              >
                <div>
                  {it.title} × {it.qty}
                </div>
                <div>{usd(it.price * it.qty)}</div>
              </div>
            ))}

            <div className="d-flex justify-content-between mt-3">
              <strong>Total</strong>
              <strong>{usd(totals.total)}</strong>
            </div>

            <div className="mt-3 d-flex gap-2">
              <button className="btn btn-accent" onClick={handlePayWithAffirm}>
                Pay with Affirm
              </button>
              {/* botón alternativo para volver al carrito */}
              <a className="btn btn-outline-light" href="/">
                Back to Cart
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
