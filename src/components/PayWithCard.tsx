// src/components/PayWithCard.tsx
// @ts-nocheck
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { startCardCheckout } from '../lib/cardCheckout';

const PayWithCard: React.FC = () => {
  const { items, totalUSD } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    try {
      setError(null);

      if (!items || !items.length) {
        setError('Your cart is empty.');
        return;
      }

      setLoading(true);
      await startCardCheckout(items);
      // Redirección la hace startCardCheckout
    } catch (e: any) {
      console.error('[PayWithCard] error', e);
      setError(e?.message || 'An error occurred while starting the payment.');
      setLoading(false);
    }
  };

  const disabled = loading || !items || !items.length;

  return (
    <div className="d-flex flex-column gap-1">
      
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className="btn btn-accent w-100"
        style={{
          borderRadius: '12px',
          paddingBlock: '14px',
          fontWeight: 600,
          boxShadow: '0 6px 20px rgba(111, 78, 255, 0.35)',
          transition: 'transform .15s ease',
          opacity: disabled ? 0.6 : 1,
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
        onMouseEnter={(e) => {
          if (!disabled) e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        {loading ? 'Redirecting…' : 'Pay with card (credit / debit)'}
      </button>

      <p className="small text-white-50 mb-0">
        Total <span className="fw-semibold">${Number(totalUSD || 0).toFixed(2)} USD</span>
      </p>

      {error && <p className="small text-danger mb-0">{error}</p>}
    </div>
  );
};

export default PayWithCard;
