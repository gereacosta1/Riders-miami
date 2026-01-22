// src/components/ProductModal.jsx
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useCart } from "../context/CartContext";
import { normalizeProduct } from "../utils/normalizeProduct";
import AffirmPromo from "./AffirmPromo"; // ✅ opcional pero recomendable

export default function ProductModal({ open, product, onClose, onAdd }) {
  const overlayRef = useRef(null);
  const dialogRef = useRef(null);
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

  const normalized =
    normalizeProduct?.(product) ??
    {
      id:
        product.id ??
        product.sku ??
        product.slug ??
        String(product.title || "item").toLowerCase().replace(/\s+/g, "-"),
      title: product.title ?? product.name ?? "Product",
      price: Number(product.price ?? product.amount ?? 0),
      image:
        product.image ||
        product.img ||
        product.thumbnail ||
        product.picture ||
        product.photo ||
        product.imageUrl ||
        "/img/placeholder.png",
      ...product,
    };

  const priceNumber = Number(normalized.price ?? 0);

  const handleAdd = (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();

    // ✅ Primero: si te pasan handler, usalo (controlado desde afuera)
    if (typeof onAdd === "function") {
      onAdd(normalized);
      return;
    }

    // ✅ Fallback: si no hay handler, usa el CartContext
    addItem(normalized, 1);
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
        <div className="modal-header">
          <h2 id="quickview-title" className="m-0">
            {normalized.title}
          </h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-media">
            <img src={normalized.image} alt={normalized.title} />
          </div>

          <div className="modal-info">
            {normalized.category && (
              <div className="modal-category">{normalized.category}</div>
            )}

            <div className="modal-price">
              ${priceNumber.toLocaleString()}
            </div>

            {/* ✅ (Recomendado) Promo + disclosures en el modal */}
            <AffirmPromo price={priceNumber} />
            <div className="rm-affirm-inline" style={{ marginTop: 6 }}>
              <span>
                Example: $800 = 12 payments of $72.21 at 15% APR, or 4 payments of
                $200 every 2 weeks. Terms{" "}
                <a
                  href="https://www.affirm.com/disclosures"
                  target="_blank"
                  rel="noreferrer"
                >
                  affirm.com/disclosures
                </a>
                .
              </span>
            </div>

            <p className="modal-desc">
              {normalized.description || "High-quality product."}
            </p>

            {Array.isArray(normalized.tags) && normalized.tags.length > 0 && (
              <div className="modal-tags">
                {normalized.tags.map((t, i) => (
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
