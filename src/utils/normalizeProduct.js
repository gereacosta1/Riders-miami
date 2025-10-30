// src/utils/normalizeProduct.js
export function normalizeProduct(p) {
  return {
    id: p.id ?? p.sku ?? p.slug ?? String(p.title || 'item').toLowerCase().replace(/\s+/g,'-'),
    title: p.title ?? p.name ?? 'Product',
    price: Number(p.price ?? p.amount ?? 0),
    image: p.image || p.img || p.thumbnail || p.picture || p.photo || p.imageUrl || '/img/placeholder.png',
    ...p
  };
}
