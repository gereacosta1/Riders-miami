// src/components/Hero.jsx
import React from 'react'

export default function Hero() {
  return (
    <section className="container-narrow mt-4">
      <div
        className="hero shadow-soft d-flex flex-column justify-content-end p-4 p-md-5"
        style={{
          background: `linear-gradient(to bottom, rgba(11,15,20,.6), rgba(11,15,20,.85)), url('/logo-riders.png') center/cover no-repeat`
        }}
      >
        <div style={{maxWidth: 760}}>
          <span className="rm-badge">Dark • Minimal • Modern</span>
          <h1 className="fw-bold mt-3">Riders Miami</h1>
          <p>Premium motorcycles, e-bikes, wheels and speakers. Finance with Affirm.</p>
          <div className="d-flex gap-3 mt-2">
            <a href="#catalog" className="btn btn-accent">Shop Now</a>
            <a href="#affirm" className="btn btn-outline-light">Explore Financing</a>
          </div>
        </div>
      </div>
    </section>
  )
}
