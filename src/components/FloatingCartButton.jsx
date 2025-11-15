// src/components/FloatingCartButton.jsx
import React from 'react';
import { useCart } from '../context/CartContext';

export default function FloatingCartButton({ onClick }) {
  const { items } = useCart();
  const count = items.reduce((sum, it) => sum + (it.qty || 1), 0);

  return (
    <button
      type="button"
      className="cart-fab"
      onClick={onClick}
      aria-label="Open cart"
    >
      <span className="cart-fab-icon">🛒</span>
      <span>Cart</span>
      {count > 0 && <span className="cart-fab-badge">{count}</span>}
    </button>
  );
}
