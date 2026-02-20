// src/pages/Solar.jsx
import React, { useMemo, useState } from 'react';
import productsRaw from '../data/products.json';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { normalizeProduct } from '../utils/normalizeProduct';

export default function Solar() {
  const [selected, setSelected] = useState(null);

  const products = useMemo(() => productsRaw.map(normalizeProduct), []);

  const solar = useMemo(() => {
    return products.filter((p) => {
      const c = String(p.category || '').toLowerCase().trim();
      return c === 'solar' || c === 'solar-energy';
    });
  }, [products]);

  const hasSolar = solar.length > 0;

  const handleView = (product) => setSelected(product);
  const handleClose = () => setSelected(null);

  // callback (ProductCard ya agrega al carrito por dentro)
  const handleAddToCart = (product) => {
    console.log('Added:', product?.title);
    setSelected(null);
  };

  const goCatalogSolar = (e) => {
    e?.preventDefault?.();
    window.history.pushState({}, '', '/catalog?cat=solar');
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <section className="container-narrow my-4">
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-end justify-content-between gap-3">
          <div style={{ minWidth: 0 }}>
            <div className="h-eyebrow">Solar energy</div>
            <h1 className="mb-1">Solar products</h1>
            <p className="text-white-50 mb-0" style={{ maxWidth: 820 }}>
              Power stations, panels, batteries, and home backup gear.
            </p>
          </div>

          <div className="d-flex align-items-center gap-2 flex-wrap">
            <a
              href="/catalog?cat=solar"
              className="btn btn-accent btn-sm"
              onClick={goCatalogSolar}
            >
              Go to catalog solar
            </a>
            <a href="/catalog" className="btn btn-outline-light btn-sm">
              Back to catalog
            </a>
          </div>
        </div>

        {/* Info row */}
        <div className="row g-3 mt-3">
          {/* ✅ Solo mostrar ayuda si NO hay productos solar */}
          {!hasSolar && (
            <div className="col-12 col-md-6">
              <div className="card-dark p-3 h-100">
                <div className="fw-semibold">Home backup ready</div>
                <div className="text-white-50 small mt-1" style={{ lineHeight: 1.5 }}>
                  Add items in <code>src/data/products.json</code> with <code>"category": "solar"</code>.
                </div>
              </div>
            </div>
          )}

          <div className={`col-12 ${hasSolar ? '' : 'col-md-6'}`}>
            <div className="card-dark p-3 h-100">
              <div className="fw-semibold">Financing with Affirm</div>
              <div className="text-white-50 small mt-1" style={{ lineHeight: 1.5 }}>
                As-low-as and payment options may appear on eligible products and at checkout.
              </div>
            </div>
          </div>
        </div>

        {hasSolar ? (
          <>
            <div className="grid-products mt-4">
              {solar.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onView={handleView}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>

            {/* ✅ Affirm compliance (Solar page también) */}
            <div className="rm-affirm mt-4">
              <p className="rm-affirm-text">
                Rates from 0–36% APR. Payment options through Affirm are subject to an eligibility check and are provided by these lending partners:{' '}
                <a href="https://www.affirm.com/lenders" target="_blank" rel="noreferrer">
                  affirm.com/lenders
                </a>
                . Options depend on your purchase amount, and a down payment may be required. CA residents: Loans by Affirm Loan Services, LLC are made or arranged pursuant to a California Financing Law license. For licenses and disclosures, see{' '}
                <a href="https://www.affirm.com/licenses" target="_blank" rel="noreferrer">
                  affirm.com/licenses
                </a>
                .
              </p>

              <p className="rm-affirm-text">
                For example, a $800 purchase could be split into 12 monthly payments of $72.21 at 15% APR, or 4 interest-free payments of $200 every 2 weeks. Full terms:{' '}
                <a href="https://www.affirm.com/disclosures" target="_blank" rel="noreferrer">
                  affirm.com/disclosures
                </a>
                .
              </p>
            </div>
          </>
        ) : (
          <div className="card-dark p-3 mt-4">
            <div className="fw-semibold">No solar products yet</div>
            <div className="text-white-50 small mt-2" style={{ lineHeight: 1.5 }}>
              Add items in <code>src/data/products.json</code> with <code>"category": "solar"</code>.
            </div>
            <div className="d-flex gap-2 flex-wrap mt-3">
              <a className="btn btn-outline-light btn-sm" href="/catalog">
                View full catalog
              </a>
            </div>
          </div>
        )}
      </section>

      <ProductModal
        open={!!selected}
        product={selected}
        onClose={handleClose}
        onAdd={handleAddToCart}
      />
    </>
  );
}