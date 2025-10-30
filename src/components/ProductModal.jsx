// src/components/ProductModal.jsx
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useCart } from "../context/CartContext";
import { normalizeProduct } from "../utils/normalizeProduct"; // si no lo tenés, cambia por la normalización inline

export default function ProductModal({ open, product, onClose }) {
  const overlayRef = useRef(null);
  const dialogRef  = useRef(null);
  const { addItem } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setTimeout(() => dialogRef.current?.focus(), 0);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open || !product) return null;

  const onOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose?.();
  };

  const handleAdd = () => {
    // normaliza y agrega
    const p = normalizeProduct ? normalizeProduct(product) : {
      id: product.id ?? product.sku ?? product.slug ?? String(product.title || 'item').toLowerCase().replace(/\s+/g,'-'),
      title: product.title ?? product.name ?? 'Product',
      price: Number(product.price ?? product.amount ?? 0),
      image: product.image || product.img || product.thumbnail || product.picture || product.photo || product.imageUrl || '/img/placeholder.png',
      ...product
    };
    addItem(p, 1);
    onClose?.();
  };

  return createPortal(
    <div
      ref={overlayRef}
      className="modal-overlay"
      onClick={onOverlayClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby="quickview-title"
    >
      <div className="modal-card" tabIndex={-1} ref={dialogRef}>
        {/* Header */}
        <div className="modal-header">
          <h2 id="quickview-title" className="m-0">
            {product.title || product.name || 'Product'}
          </h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="modal-media">
            <img
              src={
                product.image ||
                product.img ||
                product.thumbnail ||
                product.picture ||
                product.photo ||
                product.imageUrl ||
                '/img/placeholder.png'
              }
              alt={product.title || product.name || 'Product image'}
            />
          </div>

          <div className="modal-info">
            {product.category && (
              <div className="modal-category">{product.category}</div>
            )}

            <div className="modal-price">
              ${Number(product.price ?? 0).toLocaleString()}
            </div>

            <p className="modal-desc">
              {product.description || 'High-quality product. Finance with Affirm.'}
            </p>

            {/* Tags opcionales */}
            {Array.isArray(product.tags) && product.tags.length > 0 && (
              <div className="modal-tags">
                {product.tags.map((t, i) => (
                  <span key={i} className="modal-tag">{t}</span>
                ))}
              </div>
            )}

            <div className="modal-actions">
                <button className="btn btn-accent flex-1" onClick={handleAdd}>
                    Add to Cart
                </button>
                <button className="btn btn-outline-light" onClick={onClose}>
                    Close
                </button>
                </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
