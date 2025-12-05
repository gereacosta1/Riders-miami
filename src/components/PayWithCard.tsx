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
      // La redirección a Stripe la hace startCardCheckout
    } catch (e: any) {
      console.error('[PayWithCard] error', e);
      setError(e?.message || 'An error occurred while starting the payment.');
      setLoading(false);
    }
  };

  const disabled = loading || !items || !items.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        style={{
          width: '100%',
          padding: '0.75rem 1rem',
          borderRadius: '0.5rem',
          border: 'none',
          fontWeight: 700,
          fontSize: '0.9rem',
          backgroundColor: '#111827', // gris oscuro
          color: '#ffffff',
          opacity: disabled ? 0.6 : 1,
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Redirecting to payment…' : 'Pay with card (credit / debit)'}
      </button>

      <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
        Total{' '}
        <span style={{ fontWeight: 600 }}>
          ${Number(totalUSD || 0).toFixed(2)} USD
        </span>
      </p>

      {error && (
        <p style={{ fontSize: '0.75rem', color: '#ef4444' }}>{error}</p>
      )}
    </div>
  );
};

export default PayWithCard;
