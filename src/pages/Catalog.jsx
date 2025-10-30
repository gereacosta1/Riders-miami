// src/pages/Catalog.jsx
import React, { useState } from "react";
import products from "../data/products.json";
import ProductGrid from "../components/ProductGrid";
import ProductModal from "../components/ProductModal";

export default function Catalog() {
  const [selected, setSelected] = useState(null);

  const handleView = (product) => setSelected(product);
  const handleClose = () => setSelected(null);

  const handleAddToCart = (product) => {
    // aquí llama a tu lógica real de carrito si la tienes
    console.log("Add to cart:", product);
    // opcional: cerrar al agregar
    setSelected(null);
  };

  return (
    <>
      <section className="container-narrow my-4">
        <h1>Catalog</h1>
        <p className="text-white-50">
          Explore motorcycles, electric rides, wheels & speakers.
        </p>
      </section>

      <ProductGrid
        products={products}
        onAddToCart={handleAddToCart}
        onView={handleView}
      />

      <ProductModal
        open={!!selected}
        product={selected}
        onClose={handleClose}
        onAdd={handleAddToCart}
      />
    </>
  );
}
