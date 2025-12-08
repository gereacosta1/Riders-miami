// src/pages/Checkout.jsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { usd } from "../utils/currency";
import { startAffirm } from "../utils/affirm";

export default function Checkout() {
  const { items, totals } = useCart();

  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "FL",
    zip: "",
    country: "US",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const validateCustomer = () => {
    const required = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address1",
      "city",
      "state",
      "zip",
    ];

    for (const field of required) {
      if (!customer[field] || String(customer[field]).trim() === "") {
        alert("Por favor completá todos los datos de facturación/envío.");
        return false;
      }
    }
    return true;
  };

  const handlePayWithAffirm = async () => {
    if (!items.length) {
      alert("Tu carrito está vacío.");
      return;
    }

    if (!validateCustomer()) return;

    try {
      setLoading(true);

      const res = await startAffirm(
        items,
        {
          shipping: totals?.shipping || 0,
          tax: totals?.tax || 0,
          // total: totals?.total, // si querés forzar el total exacto
        },
        customer
      );

      console.log("[Affirm] Final result:", res);
      alert("Pago completado con Affirm. Estado: " + res.status);
      // TODO: vaciar carrito y redirigir:
      // window.location.href = "/order-confirmed";
    } catch (e) {
      console.error("[Affirm] Error in flow:", e);
      alert(e.message || "No se pudo completar el pago con Affirm.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container-narrow my-5">
      <h1>Checkout</h1>
      <p className="text-white-50">
        Completá tus datos y revisá tu pedido antes de pagar con Affirm.
      </p>

      <div className="card-dark p-3">
        {items.length === 0 ? (
          <div>Tu carrito está vacío.</div>
        ) : (
          <>
            {/* RESUMEN DEL PEDIDO */}
            {items.map((it) => (
              <div
                key={it.id}
                className="d-flex justify-content-between py-2 border-bottom border-secondary"
              >
                <div>
                  {it.title} × {it.qty}
                </div>
                <div>{usd(it.price * it.qty)}</div>
              </div>
            ))}

            <div className="d-flex justify-content-between mt-3">
              <strong>Total</strong>
              <strong>{usd(totals.total)}</strong>
            </div>

            {/* DATOS DEL CLIENTE */}
            <hr className="my-4" />
            <h2 className="h5 mb-3">Datos de facturación y envío</h2>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label text-white-50">Nombre</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  value={customer.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label text-white-50">Apellido</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  value={customer.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label text-white-50">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={customer.email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label text-white-50">
                  Teléfono (solo números)
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  value={customer.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label className="form-label text-white-50">
                  Dirección (línea 1)
                </label>
                <input
                  type="text"
                  name="address1"
                  className="form-control"
                  value={customer.address1}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label className="form-label text-white-50">
                  Dirección (línea 2, opcional)
                </label>
                <input
                  type="text"
                  name="address2"
                  className="form-control"
                  value={customer.address2}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label text-white-50">Ciudad</label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  value={customer.city}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label text-white-50">Estado</label>
                <input
                  type="text"
                  name="state"
                  className="form-control"
                  value={customer.state}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label text-white-50">ZIP</label>
                <input
                  type="text"
                  name="zip"
                  className="form-control"
                  value={customer.zip}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* BOTONES */}
            <div className="mt-4 d-flex gap-2">
              <button
                className="btn btn-accent"
                onClick={handlePayWithAffirm}
                disabled={loading}
              >
                {loading ? "Procesando..." : "Pagar con Affirm"}
              </button>
              <a className="btn btn-outline-light" href="/cart">
                Volver al carrito
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
