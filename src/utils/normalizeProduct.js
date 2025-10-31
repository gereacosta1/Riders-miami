// src/utils/normalizeProduct.js
const ALIASES = {
  // mapea variantes a una misma clave
  'e-bike': 'bicycle',
  'ebike': 'bicycle',
  'bici': 'bicycle',
  'moto': 'motorcycle',
  'motos': 'motorcycle',
  'motocycle': 'motorcycle',
  'scooters': 'scooter',
};

const startCase = (s) =>
  String(s || '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

export function normalizeProduct(p) {
  const title = p.title ?? p.name ?? 'Product';
  const slug =
    p.id ??
    p.sku ??
    p.slug ??
    String(title || 'item').toLowerCase().replace(/\s+/g, '-');

  const raw = String(p.category ?? 'misc').trim().toLowerCase();
  const category = ALIASES[raw] || raw;           // <- clave para filtrar
  const categoryLabel = startCase(category);      // <- para mostrar

  // Asegura imagen y precio
  const image =
    p.image || p.img || p.thumbnail || p.picture || p.photo || '/img/placeholder.png';
  const price = Number(p.price ?? p.amount ?? 0);

  return {
    ...p,
    id: slug,
    title,
    slug,
    category,        // usar esta para filtros
    categoryLabel,   // usar esta para UI
    image,
    price,
  };
}
