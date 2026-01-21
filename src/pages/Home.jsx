// src/pages/Home.jsx
import React from 'react'
import Hero from '../components/Hero'
import ProductGrid from '../components/ProductGrid'
import products from '../data/products.json'

export default function Home() {
  return (
    <>
      <Hero />

      {/* Benefits row */}
      <section className="container-narrow my-5">
        <div className="row g-3">
          {[
            ['Flexible financing with Affirm', '/logo-affirm.png'],
            ['Fast shipping', '/fast.jpg'],
            ['12-month warranty', '/12meses.png'],
            ['Premium support', '/logo-suport.jpg'],
          ].map(([t, icon], i) => (
            <div className="col-12 col-md-6 col-lg-3" key={i}>
              <div className="card-dark p-3 h-100 hover-raise d-flex flex-row gap-3 align-items-center">
                <img
                  src={icon}
                  width="28"
                  height="28"
                  alt=""
                  style={{ borderRadius: 6, objectFit: 'cover' }}
                />
                <div className="fw-semibold">{t}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Extra sections (fill the page, still minimal) */}
      <section className="container-narrow mb-5">
        <div className="row g-3">
          {/* How financing works */}
          <div className="col-12 col-lg-6">
            <div className="card-dark p-4 h-100">
              <div className="d-flex align-items-center justify-content-between">
                <div className="fw-bold" style={{ letterSpacing: 0.2 }}>
                  Financing with Affirm
                </div>
                <span className="rm-badge" style={{ opacity: 0.9 }}>
                  3 steps
                </span>
              </div>

              <div className="mt-3" style={{ opacity: 0.9 }}>
                Choose Affirm at checkout to see payment options. Terms depend on eligibility and purchase amount.
              </div>

              <div className="mt-3 d-grid gap-2">
                <div className="card-dark p-3" style={{ background: 'rgba(255,255,255,.03)' }}>
                  <div className="fw-semibold">1) Add items to cart</div>
                  <div style={{ opacity: 0.85, fontSize: 13 }}>
                    Pick your ride or gear and proceed to checkout.
                  </div>
                </div>

                <div className="card-dark p-3" style={{ background: 'rgba(255,255,255,.03)' }}>
                  <div className="fw-semibold">2) Select Affirm at checkout</div>
                  <div style={{ opacity: 0.85, fontSize: 13 }}>
                    View available payment plans before you confirm.
                  </div>
                </div>

                <div className="card-dark p-3" style={{ background: 'rgba(255,255,255,.03)' }}>
                  <div className="fw-semibold">3) Complete purchase</div>
                  <div style={{ opacity: 0.85, fontSize: 13 }}>
                    Finalize your order and get ready to ride.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why Riders Miami */}
          <div className="col-12 col-lg-6">
            <div className="card-dark p-4 h-100">
              <div className="fw-bold" style={{ letterSpacing: 0.2 }}>
                Why Riders Miami
              </div>

              <div className="mt-3" style={{ opacity: 0.9 }}>
                A curated catalog focused on reliable rides and accessories, with straightforward support.
              </div>

              <div className="mt-3 d-grid gap-2">
                <div className="d-flex gap-3 align-items-start">
                  <div style={{ width: 10, height: 10, borderRadius: 999, background: 'rgba(255,255,255,.25)', marginTop: 7 }} />
                  <div>
                    <div className="fw-semibold">Curated selection</div>
                    <div style={{ opacity: 0.85, fontSize: 13 }}>
                      Products picked for value, usability, and everyday riding.
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-3 align-items-start">
                  <div style={{ width: 10, height: 10, borderRadius: 999, background: 'rgba(255,255,255,.25)', marginTop: 7 }} />
                  <div>
                    <div className="fw-semibold">Clear checkout</div>
                    <div style={{ opacity: 0.85, fontSize: 13 }}>
                      Transparent pricing and a smooth cart flow.
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-3 align-items-start">
                  <div style={{ width: 10, height: 10, borderRadius: 999, background: 'rgba(255,255,255,.25)', marginTop: 7 }} />
                  <div>
                    <div className="fw-semibold">Support that answers</div>
                    <div style={{ opacity: 0.85, fontSize: 13 }}>
                      We help you pick the right option and handle issues quickly.
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4" style={{ opacity: 0.85, fontSize: 13 }}>
                Prefer full terms?{' '}
                <a href="https://www.affirm.com/disclosures" target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>
                  View Affirm disclosures
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog anchor for Hero button */}
      <div id="catalog" />

      <ProductGrid products={products} />
    </>
  )
}
