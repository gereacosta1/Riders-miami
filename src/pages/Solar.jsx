// src/pages/Solar.jsx
import React, { useMemo, useState } from 'react';
import productsRaw from '../data/products.json';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { normalizeProduct } from '../utils/normalizeProduct';

const SOLAR_BANNERS = [
  {
    title: 'Power stations',
    text: 'Backup power for outages, camping, and off-grid setups.',
    img: '/solar/ecoflow-delta-pro-3-4096wh.jpg',
  },
  {
    title: 'Smart home ready',
    text: 'Integrate compatible systems to power key circuits at home.',
    img: '/solar/ecoflow-smart-home-panel-2.webp',
  },
  {
    title: 'Panels & batteries',
    text: 'Charge fast with foldable panels and LiFePO4 storage.',
    img: '/solar/panel-450w-38v-fold.jpg',
  },
];

const SOLAR_TABS = [
  { key: 'all', label: 'All' },
  { key: 'stations', label: 'Power stations' },
  { key: 'smart', label: 'Smart home' },
  { key: 'panels', label: 'Panels' },
  { key: 'batteries', label: 'Batteries' },
];

export default function Solar() {
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState('all');

  const products = useMemo(() => productsRaw.map(normalizeProduct), []);

  const solarAll = useMemo(() => {
    return products.filter((p) => {
      const c = String(p.category || '').toLowerCase().trim();
      return c === 'solar' || c === 'solar-energy';
    });
  }, [products]);

  const hasSolar = solarAll.length > 0;

  const solarFiltered = useMemo(() => {
    if (tab === 'all') return solarAll;
    return solarAll.filter((p) => String(p.subCategory || '').toLowerCase().trim() === tab);
  }, [solarAll, tab]);

  const handleView = (product) => setSelected(product);
  const handleClose = () => setSelected(null);

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
        {/* HEADER */}
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-end justify-content-between gap-3">
          <div style={{ minWidth: 0 }}>
            <div className="h-eyebrow">Solar energy</div>
            <h1 className="mb-1">Solar products</h1>
            <p className="text-white-50 mb-0" style={{ maxWidth: 820 }}>
              Power stations, panels, batteries, and home backup gear.
            </p>
          </div>

          <div className="d-flex align-items-center gap-2 flex-wrap">
            <a href="/catalog?cat=solar" className="btn btn-accent btn-sm" onClick={goCatalogSolar}>
              Go to catalog solar
            </a>
            <a href="/catalog" className="btn btn-outline-light btn-sm">
              Back to catalog
            </a>
          </div>
        </div>

        {/* VISUAL STRIP */}
        <div className="row g-3 mt-3">
          {SOLAR_BANNERS.map((b) => (
            <div className="col-12 col-md-4" key={b.title}>
              <div className="card-dark p-3 h-100 hover-raise">
                <div className="prod-media rounded" style={{ height: 150 }}>
                  <img
                    src={b.img}
                    alt={b.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className="fw-semibold mt-3">{b.title}</div>
                <div className="text-white-50 small mt-1" style={{ lineHeight: 1.5 }}>
                  {b.text}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* INFO ROW */}
        <div className="row g-3 mt-3">
          <div className="col-12 col-lg-7">
            <div className="card-dark p-3 h-100">
              <div className="fw-semibold">Quick picks</div>
              <div className="text-white-50 small mt-1" style={{ lineHeight: 1.6 }}>
                Use the tabs below to browse by type — power stations, panels, batteries, and smart home gear.
              </div>
              <div className="mt-2 text-white-50 small" style={{ lineHeight: 1.7 }}>
                • Stations: backup power for essentials<br />
                • Panels: recharge anywhere (check connectors)<br />
                • Batteries: LiFePO4 storage for solar/RV setups
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <div className="card-dark p-3 h-100">
              <div className="fw-semibold">Financing with Affirm</div>
              <div className="text-white-50 small mt-1" style={{ lineHeight: 1.5 }}>
                As-low-as and payment options may appear on eligible products and at checkout.
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCTS */}
        {hasSolar ? (
          <>
            <div className="d-flex align-items-end justify-content-between gap-3 mt-4 flex-wrap">
              <div>
                <h2 className="m-0">Featured solar items</h2>
                <div className="text-white-50 small mt-1" style={{ lineHeight: 1.4 }}>
                  Filter by type and open any item for details.
                </div>
              </div>

              <a href="/catalog?cat=solar" className="btn btn-outline-light btn-sm" onClick={goCatalogSolar}>
                View all in catalog
              </a>
            </div>

            {/* Tabs */}
            <div className="d-flex gap-2 flex-wrap mt-3">
              {SOLAR_TABS.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  className={`btn btn-sm ${tab === t.key ? 'btn-accent' : 'btn-outline-light'}`}
                >
                  {t.label}
                </button>
              ))}

              <span className="text-white-50 small ms-1" style={{ alignSelf: 'center' }}>
                Showing {solarFiltered.length} of {solarAll.length}
              </span>
            </div>

            <div className="grid-products mt-3">
              {solarFiltered.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onView={(prod) => setSelected(prod)}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>

            {solarFiltered.length === 0 && (
              <div className="text-white-50 mt-4" style={{ opacity: 0.9 }}>
                No items in this section. Try a different filter.
              </div>
            )}

            {/* Affirm compliance */}
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

      <ProductModal open={!!selected} product={selected} onClose={() => setSelected(null)} onAdd={handleAddToCart} />
    </>
  );
}