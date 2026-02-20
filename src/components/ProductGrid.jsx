// src/components/ProductGrid.jsx
import React, { useEffect, useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';

const startCase = (s) =>
  String(s || '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

function getQueryParams() {
  const sp = new URLSearchParams(window.location.search || '');
  const cat = (sp.get('cat') || '').trim();
  const q = (sp.get('q') || '').trim();
  return { cat, q };
}

export default function ProductGrid({ products, onAddToCart, onView }) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('all');
  const [selected, setSelected] = useState(null);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category).filter(Boolean));
    return ['all', ...Array.from(set).sort()];
  }, [products]);

  // ✅ Lee ?cat=solar / ?q=xxx al montar, y también cuando cambia el historial (tu App dispara popstate)
  useEffect(() => {
    const applyFromUrl = () => {
      const { cat: catParam, q: qParam } = getQueryParams();

      if (qParam) setQ(qParam);

      if (catParam) {
        // Acepta "all" o una categoría válida (case-insensitive)
        const want = catParam.toLowerCase();
        const match = categories.find((c) => String(c).toLowerCase() === want);
        if (match) setCat(match);
        else if (want === 'all') setCat('all');
      }
    };

    applyFromUrl();
    window.addEventListener('popstate', applyFromUrl);
    return () => window.removeEventListener('popstate', applyFromUrl);
  }, [categories]);

  const filtered = useMemo(() => {
    const qlc = q.toLowerCase().trim();
    return products.filter((p) => {
      const hayQ =
        (p.title + ' ' + (p.description || '')).toLowerCase().includes(qlc);
      const hayCat = cat === 'all' ? true : p.category === cat;
      return hayQ && hayCat;
    });
  }, [products, q, cat]);

  const handleView = (p) => {
    if (typeof onView === 'function') onView(p);
    else setSelected(p);
  };

  // ✅ callback opcional: sirve para cerrar modal y/o avisar al padre
  const handleAdded = (p) => {
    if (typeof onAddToCart === 'function') onAddToCart(p);
    setSelected(null);
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
              onAddToCart={handleAdded} // ✅ solo callback; el add real lo hace ProductCard via addItem()
              onView={handleView}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-white-50 mt-4" style={{ opacity: 0.9 }}>
            No results. Try a different search or category.
          </div>
        )}
      </section>

      <ProductModal
        open={!!selected}
        product={selected}
        onClose={() => setSelected(null)}
        onAdd={handleAdded}
      />
    </>
  );
}