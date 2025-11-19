// src/components/AffirmPromo.jsx
import React, { useEffect, useRef } from 'react'

// Lightweight proxy for Affirm promo messaging; also renders static fallback text.
export default function AffirmPromo({ price }) {
  const ref = useRef(null)
  useEffect(() => {
    if (window.affirm && window.affirm.ui && ref.current) {
      try {
        window.affirm.ui.ready(() => {
          // If you have promo placement, you could render it here.
        })
      } catch {}
    }
  }, [])
  const est = (price/12).toFixed(2)
  return <div ref={ref} className="text-white-50 small">as low as ${est}/mo with Affirm</div>
}
