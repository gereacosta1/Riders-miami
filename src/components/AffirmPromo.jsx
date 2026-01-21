// src/components/AffirmPromo.jsx
import React, { useEffect, useRef } from 'react'

// Lightweight proxy for Affirm promo messaging; also renders a compliant static fallback.
// NOTE: When showing a payment amount (e.g. "$40/mo"), include term + APR context (TILA).
export default function AffirmPromo({ price }) {
  const ref = useRef(null)

  useEffect(() => {
    if (window.affirm && window.affirm.ui && ref.current) {
      try {
        window.affirm.ui.ready(() => {
          // Optional: render Affirm promo placement here if you later add a placement.
          // Keeping this no-op preserves current functionality.
        })
      } catch {
        // no-op
      }
    }
  }, [])

  // Defensive formatting
  const p = Number(price || 0)
  const est = p > 0 ? (p / 12).toFixed(2) : '0.00'

  return (
    <div ref={ref} className="text-white-50 small">
      As low as ${est}/mo with Affirm (12 mo, 0–36% APR).
    </div>
  )
}
