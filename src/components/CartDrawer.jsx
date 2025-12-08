// src/components/CartDrawer.jsx
import React, { memo } from "react";
import { useCart } from "../context/CartContext";
import { usd } from "../utils/currency";

export default function CartDrawer({ open, onClose }) {
  const { items, totals, updateQty, removeItem } = useCart();

  const handleGoToCheckout = () => {
    if (!items.length) return;

    // Cerramos el drawer (si se pasó la prop)
    if (onClose) onClose();

    // Navegamos a la página de checkout con el formulario
    window.location.href = "/checkout";
  };

  return (
    <div
      className="rm-drawer"
      style={{
        transform: open ? "translate3d(0,0,0)" : "translate3d(110%,0,0)",
        pointerEvents: open ? "auto" : "none",
      }}
      aria-hidden={!open}
      aria-label="Cart drawer"
    >
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between p-3 border-bottom border-secondary">
        <h5 className="m-0">Your Cart</h5>
        <button className="btn btn-sm btn-outline-light" onClick={onClose}>
          Close
        </button>
      </div>

      {/* Body */}
      <div
        className="p-3 d-flex flex-column gap-3 flex-grow-1 overflow-auto"
        style={{ minHeight: 0 }}
      >
        {items.length === 0 && (
          <div className="text-white-50">Your cart is empty.</div>
        )}

        {items.map((it) => (
          <CartItem
            key={it.id}
            it={it}
            updateQty={updateQty}
            removeItem={removeItem}
          />
        ))}
      </div>

      {/* Footer */}
      <div
        className="border-top border-secondary p-3"
        style={{
          background: "#111722",
          borderBottomLeftRadius: "14px",
          borderBottomRightRadius: "14px",
          paddingBottom: "60px",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span>Subtotal</span>
          <strong>{usd(totals.subtotal)}</strong>
        </div>

        {/* Botón para ir al checkout (ya no abre Affirm directo) */}
        <button
          className="btn btn-accent w-100"
          onClick={handleGoToCheckout}
          disabled={items.length === 0}
          style={{
            borderRadius: "12px",
            paddingBlock: "14px",
            fontWeight: 600,
            boxShadow: "0 6px 20px rgba(111, 78, 255, 0.35)",
            transition: "transform .15s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-2px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
        >
          Continue to checkout
        </button>
      </div>
    </div>
  );
}

/* ---------------------- Cart Item Row ---------------------- */
const CartItem = memo(function CartItem({ it, updateQty, removeItem }) {
  return (
    <div className="d-flex gap-3 align-items-center">
      <img
        src={it.image || "/img/placeholder.png"}
        width="64"
        height="64"
        style={{ objectFit: "cover", borderRadius: 12 }}
        alt={it.title}
        onError={(e) => {
          e.currentTarget.src = "/img/placeholder.png";
        }}
        loading="lazy"
      />

      <div className="flex-grow-1">
        <div className="fw-semibold">{it.title}</div>
        <div className="small text-white-50">{usd(it.price)}</div>

        <div className="d-flex align-items-center gap-2 mt-1">
          <button
            className="btn btn-sm btn-outline-light"
            onClick={() => updateQty(it.id, it.qty - 1)}
          >
            -
          </button>

          <span className="small">{it.qty}</span>

          <button
            className="btn btn-sm btn-outline-light"
            onClick={() => updateQty(it.id, it.qty + 1)}
          >
            +
          </button>

          <button
            className="btn btn-sm btn-outline-danger ms-2"
            onClick={() => removeItem(it.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
});
