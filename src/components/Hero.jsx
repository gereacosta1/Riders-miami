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
        <div style={{ maxWidth: 760 }}>
          <span className="rm-badge">Dark • Minimal • Modern</span>
          <h1 className="fw-bold mt-3">Riders Miami</h1>
          <p>Premium motorcycles, e-bikes, wheels and speakers. Finance with Affirm.</p>

          <div className="d-flex gap-3 mt-2">
            <a href="#catalog" className="btn btn-accent">Shop Now</a>
            <a href="#affirm" className="btn btn-outline-light">Explore Financing</a>
          </div>

          {/* ✅ Affirm Compliance (same URL where Affirm is advertised) */}
          <div id="affirm" className="rm-affirm mt-3">
            <p className="rm-affirm-text">
              Rates from 0–36% APR. Payment options through Affirm are subject to an eligibility check and are provided by these lending partners:{' '}
              <a href="https://www.affirm.com/lenders" target="_blank" rel="noreferrer">affirm.com/lenders</a>
              . Options depend on your purchase amount, and a down payment may be required. CA residents: Loans by Affirm Loan Services, LLC are made or arranged pursuant to a California Financing Law license. For licenses and disclosures, see{' '}
              <a href="https://www.affirm.com/licenses" target="_blank" rel="noreferrer">affirm.com/licenses</a>
              .
            </p>

            <p className="rm-affirm-text">
              For example, a $800 purchase could be split into 12 monthly payments of $72.21 at 15% APR, or 4 interest-free payments of $200 every 2 weeks. Full terms:{' '}
              <a href="https://www.affirm.com/disclosures" target="_blank" rel="noreferrer">affirm.com/disclosures</a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
