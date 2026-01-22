// src/pages/Checkout.jsx
import React, { useMemo, useState } from 'react'
import { useCart } from '../context/CartContext'
import { usd } from '../utils/currency'
import { startAffirm } from '../utils/affirm'

export default function Checkout() {
  const { items, totals } = useCart()

  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: 'FL',
    zip: '',
    country: 'US'
  })

  const [loading, setLoading] = useState(false)

  const hasItems = items.length > 0

  const orderLines = useMemo(() => {
    return items.map((it) => ({
      id: it.id,
      title: it.title,
      qty: it.qty,
      lineTotal: it.price * it.qty
    }))
  }, [items])

  const handleChange = (e) => {
    const { name, value } = e.target
    setCustomer((prev) => ({ ...prev, [name]: value }))
  }

  const validateCustomer = () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'address1', 'city', 'state', 'zip']
    for (const field of required) {
      if (!customer[field] || String(customer[field]).trim() === '') {
        alert('Por favor completá todos los datos de facturación y envío.')
        return false
      }
    }
    return true
  }

  const handlePayWithAffirm = async () => {
    if (!hasItems) {
      alert('Tu carrito está vacío.')
      return
    }

    if (!validateCustomer()) return

    try {
      setLoading(true)

      const res = await startAffirm(
        items,
        {
          shipping: totals?.shipping || 0,
          tax: totals?.tax || 0
        },
        customer
      )

      alert('Pago completado con Affirm. Estado: ' + res.status)
    } catch (e) {
      console.error('[Affirm] Error in flow:', e)
      alert(e.message || 'No se pudo completar el pago con Affirm.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="container-narrow my-5">
      <div className="d-flex flex-column flex-md-row align-items-start align-items-md-end justify-content-between gap-3 mb-3">
        <div>
          <h1 className="mb-2">Checkout</h1>
          <p className="text-white-50 mb-0">
            Completá tus datos y revisá tu pedido antes de pagar con Affirm.
          </p>
        </div>
        {hasItems && (
          <div className="text-white-50 small">
            Items: {totals?.count || items.reduce((a, i) => a + i.qty, 0)}
          </div>
        )}
      </div>

      <div className="card-dark p-4 p-md-5 checkout-card">
        {!hasItems ? (
          <div className="text-white-50">Tu carrito está vacío.</div>
        ) : (
          <>
            {/* Resumen */}
            <div className="mb-3">
              {orderLines.map((it) => (
                <div
                  key={it.id}
                  className="d-flex justify-content-between py-2 border-bottom border-secondary"
                >
                  <div style={{ minWidth: 0 }}>
                    <div className="fw-semibold" style={{ lineHeight: 1.2 }}>
                      {it.title} × {it.qty}
                    </div>
                  </div>
                  <div className="text-white-50">{usd(it.lineTotal)}</div>
                </div>
              ))}

              <div className="d-flex justify-content-between mt-3">
                <div className="text-white-50">Total</div>
                <div className="fw-semibold">{usd(totals.total)}</div>
              </div>
            </div>

            <hr className="my-4" />

            {/* Datos */}
            <h2 className="h5 mb-3">Datos de facturación y envío</h2>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label text-white-50">Nombre</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control checkout-input"
                  value={customer.firstName}
                  onChange={handleChange}
                  placeholder="Juan"
                  autoComplete="given-name"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label text-white-50">Apellido</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control checkout-input"
                  value={customer.lastName}
                  onChange={handleChange}
                  placeholder="Pérez"
                  autoComplete="family-name"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label text-white-50">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control checkout-input"
                  value={customer.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                  autoComplete="email"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label text-white-50">Teléfono (solo números)</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control checkout-input"
                  value={customer.phone}
                  onChange={handleChange}
                  placeholder="3050000000"
                  autoComplete="tel"
                />
              </div>

              <div className="col-12">
                <label className="form-label text-white-50">Dirección (línea 1)</label>
                <input
                  type="text"
                  name="address1"
                  className="form-control checkout-input"
                  value={customer.address1}
                  onChange={handleChange}
                  placeholder="Street address"
                  autoComplete="address-line1"
                />
              </div>

              <div className="col-12">
                <label className="form-label text-white-50">Dirección (línea 2, opcional)</label>
                <input
                  type="text"
                  name="address2"
                  className="form-control checkout-input"
                  value={customer.address2}
                  onChange={handleChange}
                  placeholder="Apt, unit, etc."
                  autoComplete="address-line2"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label text-white-50">Ciudad</label>
                <input
                  type="text"
                  name="city"
                  className="form-control checkout-input"
                  value={customer.city}
                  onChange={handleChange}
                  placeholder="Miami"
                  autoComplete="address-level2"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label text-white-50">Estado</label>
                <input
                  type="text"
                  name="state"
                  className="form-control checkout-input"
                  value={customer.state}
                  onChange={handleChange}
                  placeholder="FL"
                  autoComplete="address-level1"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label text-white-50">ZIP</label>
                <input
                  type="text"
                  name="zip"
                  className="form-control checkout-input"
                  value={customer.zip}
                  onChange={handleChange}
                  placeholder="33101"
                  autoComplete="postal-code"
                />
              </div>
            </div>

            {/* Botones */}
            <div className="mt-4 d-flex gap-2 flex-wrap align-items-center">
              <button
                className="btn btn-accent"
                onClick={handlePayWithAffirm}
                disabled={loading}
                style={{ paddingInline: 18, paddingBlock: 12, fontWeight: 600 }}
              >
                {loading ? 'Procesando...' : 'Pagar con Affirm'}
              </button>

              <button
                type="button"
                className="btn btn-outline-light"
                onClick={() => window.history.back()}
                style={{ paddingInline: 18, paddingBlock: 12 }}
              >
                Volver al carrito
              </button>
            </div>

            {/* Compliance corto debajo del CTA */}
            <div className="rm-affirm mt-3">
              <p className="rm-affirm-text">
                Rates from 0–36% APR. Payment options through Affirm are subject to an eligibility check. For licenses and disclosures:{' '}
                <a href="https://www.affirm.com/licenses" target="_blank" rel="noreferrer">affirm.com/licenses</a>
                . Full terms:{' '}
                <a href="https://www.affirm.com/disclosures" target="_blank" rel="noreferrer">affirm.com/disclosures</a>
                .
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
