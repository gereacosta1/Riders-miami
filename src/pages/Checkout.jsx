
import React from 'react'
import { useCart } from '../context/CartContext'
import { usd } from '../utils/currency'

export default function Checkout() {
  const { items, totals } = useCart()
  return (
    <section className="container-narrow my-5">
      <h1>Checkout</h1>
      <p className="text-white-50">Review your order before paying with Affirm.</p>
      <div className="card-dark p-3">
        {items.length===0 ? <div>Your cart is empty.</div> : (
          <>
            {items.map(it => (
              <div key={it.id} className="d-flex justify-content-between py-2 border-bottom border-secondary">
                <div>{it.title} × {it.qty}</div>
                <div>{usd(it.price * it.qty)}</div>
              </div>
            ))}
            <div className="d-flex justify-content-between mt-3">
              <strong>Total</strong>
              <strong>{usd(totals.total)}</strong>
            </div>
            <div className="mt-3">
              <a className="btn btn-accent" href="/">Open Cart to Pay with Affirm</a>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
