// src/pages/Catalog.jsx
import React, { useState, useMemo } from 'react';
import productsRaw from '../data/products.json';
import ProductGrid from '../components/ProductGrid';
import ProductModal from '../components/ProductModal';
import { normalizeProduct } from '../utils/normalizeProduct';

export default function Catalog() {
  const [selected, setSelected] = useState(null);

  // normalizar una sola vez
  const products = useMemo(() => productsRaw.map(normalizeProduct), []);

  const handleView = (product) => setSelected(product);
  const handleClose = () => setSelected(null);

  const handleAddToCart = (product) => {
    console.log('Add to cart:', product);
    setSelected(null);
  };

  return (
    <>
      <section className="container-narrow my-4">
        <h1>Catalog</h1>
        <p className="text-white-50">
          Explore motorcycles, electric rides, wheels &amp; speakers.
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
