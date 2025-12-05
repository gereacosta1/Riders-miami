// src/lib/cardCheckout.ts
// @ts-nocheck

const API_URL = '/api/card-checkout';

export async function startCardCheckout(items: any[]): Promise<void> {
  if (!Array.isArray(items) || !items.length) {
    throw new Error('The shopping cart is empty.');
  }

  const origin =
    typeof window !== 'undefined' && window.location?.origin
      ? window.location.origin
      : '';

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items, origin }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('[card-checkout] error body:', text);
    throw new Error('The card payment could not be initiated.');
  }

  const data = await res.json();

  if (!data || !data.url) {
    console.error('[card-checkout] invalid response:', data);
    throw new Error('Stripe response did not include a URL.');
  }

  // Redirige al checkout de Stripe
  window.location.href = data.url as string;
}
