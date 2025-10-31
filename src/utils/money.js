// utils/money.js
export const toCents = (usd) => Math.round(Number(usd || 0) * 100);
