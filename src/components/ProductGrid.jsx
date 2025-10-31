import React, { useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';

const startCase = (s) =>
  String(s || '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

export default function ProductGrid({ products }) {
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
    const qlc = q.toLowerCase();
    return products.filter((p) => {
      const hayQ =
        (p.title + ' ' + (p.description || '')).toLowerCase().includes(qlc);
      const hayCat = cat === 'all' ? true : p.category === cat;
      return hayQ && hayCat;
    });
  }, [products, q, cat]);

  const handleAddToCart = (p) => {
    // conecta aquí tu lógica real de carrito
    console.log('Add to Cart:', p);
    setSelected(null); // si venías del modal, lo cierra
  };

  return (
    <>
      <section id="catalog" className="container-narrow my-5">
        <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between mb-3">
          <h2 className="m-0">Catalog</h2>
          <input
            className="form-control w-auto"
            placeholder="Search..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
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
              onView={setSelected}
            />
          ))}
        </div>
      </section>

      <ProductModal
        open={!!selected}
        product={selected}
        onClose={() => setSelected(null)}
        onAdd={handleAddToCart}
      />
    </>
  );
}
