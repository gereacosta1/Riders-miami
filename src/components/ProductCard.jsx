// src/components/ProductCard.jsx
import React from 'react';
import { usd } from '../utils/currency';
import AffirmPromo from './AffirmPromo';
import { useCart } from '../context/CartContext';

const startCase = (s) =>
  String(s || '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

export default function ProductCard({ product, onView, onAddToCart }) {
  const { addItem } = useCart();

  const categoryLabel = product.categoryLabel || startCase(product.category);

  const handleAdd = () => {
    // ✅ si te pasan handler real desde afuera, úsalo; si no, usa cart context
    if (typeof onAddToCart === 'function') onAddToCart(product);
    else addItem(product, 1);
  };

  return (
    <div className="card-dark p-3 hover-raise">
      {/* CONTENEDOR CONTROLADO */}
      <div className="prod-media rounded">
        <img src={product.image} alt={product.title} loading="lazy" />
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <div style={{ minWidth: 0 }}>
          <div className="small text-white-50">{categoryLabel}</div>
          <div className="fw-semibold" style={{ lineHeight: 1.2 }}>
            {product.title}
          </div>
        </div>
        {product.badge && <span className="rm-badge">{product.badge}</span>}
      </div>

      <div className="mt-2 d-flex flex-column gap-1">
        <div className="fw-bold">{usd(product.price)}</div>

        {/* Promo (as-low-as X/mo) */}
        <AffirmPromo price={product.price} />

        {/* ✅ TILA + Disclosure microcopy (compact, same design) */}
        <div className="rm-affirm-inline">
          <span>
            Example: $800 = 12 payments of $72.21 at 15% APR, or 4 payments of $200 every 2 weeks. Terms:{' '}
            <a href="https://www.affirm.com/disclosures" target="_blank" rel="noreferrer">
              affirm.com/disclosures
            </a>
            .
          </span>
        </div>
      </div>

      <div className="mt-3 d-flex gap-2">
        <button
          className="btn btn-accent flex-grow-1"
          type="button"
          onClick={handleAdd}
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
