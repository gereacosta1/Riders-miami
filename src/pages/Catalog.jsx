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
  // ahora esto queda como callback: logs / cerrar modal si está abierto
  console.log('Added:', product.title);
  setSelected(null); // solo cierra si estabas en modal
};

  return (
    <>
      <section className="container-narrow my-4">
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-end justify-content-between gap-3">
          <div>
            <h1 className="mb-1">Catalog</h1>
            <p className="text-white-50 mb-0">
              Explore motorcycles, electric rides, wheels &amp; speakers.
            </p>
          </div>

          {/* Small utility row (fills space, useful, minimal) */}
          <div className="d-flex align-items-center gap-2">
            <span className="text-white-50 small">
              {products.length} items
            </span>
            <a href="#catalog-grid" className="btn btn-outline-light btn-sm">
              Jump to products
            </a>
          </div>
        </div>

        {/* Compact info cards (same design language as Home) */}
        <div className="row g-3 mt-3">
          <div className="col-12 col-md-6">
            <div className="card-dark p-3 h-100">
              <div className="fw-semibold">Fast checkout</div>
              <div className="text-white-50 small mt-1" style={{ lineHeight: 1.5 }}>
                Add to cart, review details, and complete your purchase in a few steps.
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="card-dark p-3 h-100">
              <div className="fw-semibold">Financing with Affirm</div>
              <div className="text-white-50 small mt-1" style={{ lineHeight: 1.5 }}>
                Choose Affirm at checkout to see available payment options based on eligibility and purchase amount.
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Affirm compliance (covers Catalog page too) */}
        <div className="rm-affirm mt-3">
          <p className="rm-affirm-text">
            Rates from 0–36% APR. Payment options through Affirm are subject to an eligibility check and are provided by these lending partners:{' '}
            <a href="https://www.affirm.com/lenders" target="_blank" rel="noreferrer">affirm.com/lenders</a>
            . Options depend on your purchase amount, and a down payment may be required. CA residents: Loans by Affirm Loan Services, LLC are made or arranged pursuant to a California Financing Law license. For licenses and disclosures, see{' '}
            <a href="https://www.affirm.com/licenses" target="_blank" rel="noreferrer">affirm.com/licenses</a>
            .
          </p>

          <p className="rm-affirm-text">
            For example, a $800 purchase could be split into 12 monthly payments of $72.21 at 15% APR, or 4 interest-free payments of $200 every 2 weeks. Full terms:{' '}
            <a href="https://www.affirm.com/disclosures" target="_blank" rel="noreferrer">affirm.com/disclosures</a>
            .
          </p>
        </div>
      </section>

      {/* Anchor to jump directly to the grid */}
      <div id="catalog-grid" />

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
