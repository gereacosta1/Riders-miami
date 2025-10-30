import React, { useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';

export default function ProductGrid({ products }) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('all');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchQ = (p.title + ' ' + p.description).toLowerCase().includes(q.toLowerCase());
      const matchC = cat === 'all' ? true : p.category === cat;
      return matchQ && matchC;
    });
  }, [products, q, cat]);

  const handleAddToCart = (p) => {
    // conecta aquí tu lógica real de carrito
    console.log('Add to Cart:', p);
    // si abriste desde el modal, lo podés cerrar:
    setSelected(null);
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
            onChange={e => setQ(e.target.value)}
          />
        </div>
        <div className="d-flex gap-2 flex-wrap mb-3">
          {['all','motorcycle','electric','wheels','speakers'].map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`btn btn-sm ${cat === c ? 'btn-accent' : 'btn-outline-light'}`}
            >
              {c[0].toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid-products">
          {filtered.map(p => (
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
