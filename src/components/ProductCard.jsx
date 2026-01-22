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
    // Si te pasan handler desde afuera, úsalo; si no, usa cart context
    if (typeof onAddToCart === 'function') onAddToCart(product);
    else addItem(product, 1);
  };

  const handleAddClick = (e) => {
    // ✅ clave: evita que el click lo “robe” el contenedor padre (card clickeable / overlay)
    e.preventDefault();
    e.stopPropagation();
    handleAdd();
  };

  const handleViewClick = (e) => {
    // ✅ evita que el padre capture y haga otra cosa rara
    e.preventDefault();
    e.stopPropagation();
    onView?.(product);
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

        {/* ✅ TILA + Disclosure microcopy */}
        <div className="rm-affirm-inline">
          <span>
            Example: $800 = 12 payments of $72.21 at 15% APR, or 4 payments of $200 every 2 weeks. Terms:{' '}
            <a
              href="https://www.affirm.com/disclosures"
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()} // por si el card padre abre modal al click
            >
              affirm.com/disclosures
            </a>
            .
          </span>
        </div>
      </div>

      {/* ✅ z-index para ganar a cualquier overlay/link por arriba */}
      <div className="mt-3 d-flex gap-2" style={{ position: 'relative', zIndex: 5 }}>
        <button
          className="btn btn-accent flex-grow-1"
          type="button"
          onClick={handleAddClick}
        >
          Add to Cart
        </button>

        <button
          className="btn btn-outline-light"
          type="button"
          onClick={handleViewClick}
        >
          View
        </button>
      </div>
    </div>
  );
}
