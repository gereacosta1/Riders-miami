// src/components/ProductGrid.jsx
import React, { useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';

const startCase = (s) =>
  String(s || '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

export default function ProductGrid({ products, onAddToCart, onView }) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('all');
  const [selected, setSelected] = useState(null);

  // Categorías dinámicas basadas en los datos
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category).filter(Boolean));
    return ['all', ...Array.from(set).sort()];
  }, [products]);

  // Búsqueda + filtro por categoría
  const filtered = useMemo(() => {
    const qlc = q.toLowerCase().trim();
    return products.filter((p) => {
      const hayQ =
        (p.title + ' ' + (p.description || '')).toLowerCase().includes(qlc);
      const hayCat = cat === 'all' ? true : p.category === cat;
      return hayQ && hayCat;
    });
  }, [products, q, cat]);

  const handleAddToCart = (p) => {
    // ✅ si viene handler real por props, úsalo; si no, fallback
    if (typeof onAddToCart === 'function') onAddToCart(p);
    else console.log('Add to Cart:', p);

    setSelected(null); // si venías del modal, lo cierra
  };

  const handleView = (p) => {
    // ✅ si viene handler real por props, úsalo; si no, abre modal local
    if (typeof onView === 'function') onView(p);
    else setSelected(p);
  };

  return (
    <>
      <section id="catalog" className="container-narrow my-5">
        <div className="d-flex flex-column flex-md-row gap-2 align-items-start align-items-md-center justify-content-between mb-3">
          <div>
            <h2 className="m-0">Catalog</h2>
            <div className="text-white-50 small mt-1" style={{ lineHeight: 1.4 }}>
              Browse by category or search by keywords.
            </div>
          </div>

          <div className="d-flex align-items-center gap-2">
            <span className="text-white-50 small d-none d-md-inline">
              Showing {filtered.length} of {products.length}
            </span>
            <input
              className="form-control"
              style={{ width: 240 }}
              placeholder="Search..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search products"
            />
          </div>
        </div>

        <div className="d-flex gap-2 flex-wrap mb-3">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`btn btn-sm ${
                cat === c ? 'btn-accent' : 'btn-outline-light'
              }`}
              type="button"
            >
              {c === 'all' ? 'All' : startCase(c)}
            </button>
          ))}
        </div>

        <div className="grid-products">
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAddToCart={handleAddToCart}
              onView={handleView}
            />
          ))}
        </div>

        {/* Mensaje vacío (útil, no molesto) */}
        {filtered.length === 0 && (
          <div className="text-white-50 mt-4" style={{ opacity: 0.9 }}>
            No results. Try a different search or category.
          </div>
        )}
      </section>

      {/* Modal local sólo si NO se está controlando desde afuera */}
      <ProductModal
        open={!!selected}
        product={selected}
        onClose={() => setSelected(null)}
        onAdd={handleAddToCart}
      />
    </>
  );
}
