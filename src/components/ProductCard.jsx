// src/components/ProductCard.jsx
import React from 'react';
import { usd } from '../utils/currency';
import AffirmPromo from './AffirmPromo';
import { useCart } from '../context/CartContext';

const startCase = (s) =>
  String(s || '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

export default function ProductCard({ product, onView }) {
  const { addItem } = useCart();

  const categoryLabel = product.categoryLabel || startCase(product.category);

  return (
    <div className="card-dark p-3 hover-raise">
      {/* CONTENEDOR CONTROLADO */}
      <div className="prod-media rounded">
        <img src={product.image} alt={product.title} />
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          <div className="small text-white-50">{categoryLabel}</div>
          <div className="fw-semibold">{product.title}</div>
        </div>
        {product.badge && <span className="rm-badge">{product.badge}</span>}
      </div>

      <div className="mt-2 d-flex flex-column gap-1">
        <div className="fw-bold">{usd(product.price)}</div>
        <AffirmPromo price={product.price} />
      </div>

      <div className="mt-3 d-flex gap-2">
        <button
          className="btn btn-accent flex-grow-1"
          onClick={() => addItem(product, 1)}
        >
          Add to Cart
        </button>
        <button
          className="btn btn-outline-light"
          type="button"
          onClick={() => onView?.(product)}
        >
          View
        </button>
      </div>
    </div>
  );
}
