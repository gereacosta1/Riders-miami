// src/utils/affirm.js
import { toCents } from './money';

/**
 * Construye el payload de Affirm a partir del carrito.
 * cartItems: [{ id, title, price, qty, image }]
 * totals: { subtotal, shipping=0, tax=0, total }  // opcional
 */
export function buildAffirmCheckout(cartItems, totals = {}) {
  // Items en centavos
  const items = cartItems.map(({ id, title, price, qty, image }) => {
    const quantity = Number(qty ?? 1) || 1;
    return {
      display_name: title,
      sku: String(id),
      unit_price: toCents(price),      // <-- centavos enteros
      qty: quantity,
      item_url: window.location.origin + '/',
      item_image_url: image?.startsWith('http')
        ? image
        : window.location.origin + image
    };
  });

  // Sumas en centavos (derivadas + override opcional desde totals)
  const subtotalCents =
    items.reduce((acc, it) => acc + it.unit_price * it.qty, 0);

  const shippingCents =
    'shipping' in totals ? toCents(totals.shipping) : toCents(0);

  const taxCents =
    'tax' in totals ? toCents(totals.tax) : toCents(0);

  // Si te pasan totals.total lo respetamos; si no, lo calculamos
  const totalCents =
    'total' in totals
      ? toCents(totals.total)
      : subtotalCents + shippingCents + taxCents;

  // Mínimo Affirm $50
  if (totalCents < 5000) {
    throw new Error('Affirm requires a minimum order total of $50.');
  }

  return {
    merchant: {
      user_confirmation_url: window.location.origin + '/order-confirmed',
      user_cancel_url: window.location.origin + '/checkout'
    },
    // Datos de ejemplo (podés reemplazar con datos reales del cliente)
    shipping: {
      name: { first: 'Riders', last: 'Customer' },
      address: {
        line1: '123 Demo St',
        city: 'Miami',
        state: 'FL',
        zipcode: '33101',
        country: 'US' // ISO-2
      },
      email: 'demo@ridersmiami.test',
      phone_number: '3050000000'
    },
    billing: {
      name: { first: 'Riders', last: 'Customer' },
      address: {
        line1: '123 Demo St',
        city: 'Miami',
        state: 'FL',
        zipcode: '33101',
        country: 'US'
      }
    },
    items,
    currency: 'USD',
    shipping_amount: shippingCents,
    tax_amount: taxCents,
    total: totalCents
  };
}

export function openAffirmCheckout(checkout) {
  return new Promise((resolve, reject) => {
    const affirm = window.affirm;
    if (!affirm) return reject(new Error('Affirm SDK not loaded'));
    affirm.checkout(checkout);
    affirm.checkout.open({
      onSuccess: (res) => resolve(res),
      onFail: (e) => reject(e),
      onAbort: () => reject(new Error('User aborted'))
    });
  });
}

/**
 * Helper: arma y abre el checkout en una sola llamada.
 */
export async function startAffirm(cartItems, totals = {}) {
  const checkout = buildAffirmCheckout(cartItems, totals);
  return openAffirmCheckout(checkout);
}
