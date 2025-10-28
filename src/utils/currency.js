
export const toCents = (num) => Math.round(Number(num) * 100);
export const fromCents = (cents) => (cents / 100).toFixed(2);
export const usd = (num) => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(Number(num));
