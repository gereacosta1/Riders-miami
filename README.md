
# Riders Miami

Dark, minimal, modern storefront with React + Vite + Bootstrap, real checkout via Affirm (authorize + capture), Netlify Functions.

## Quick Start
```bash
npm i
npm run dev
```

## Build
```bash
npm run build
```

## Deploy (Netlify)
- Set environment variables:
  - `VITE_AFFIRM_PUBLIC_KEY`
  - `AFFIRM_PUBLIC_KEY`
  - `AFFIRM_PRIVATE_KEY`
  - `AFFIRM_API_BASE` (default https://api.affirm.com)
- Ensure functions in `netlify/functions`

## Test Flow
1. Add items to cart
2. Click **Checkout with Affirm** (cart drawer)
3. Approve in Affirm → returns `checkout_token`
4. Function **affirm-authorize** → returns `charge_id`
5. Function **affirm-capture** → captures charge and redirects to Order Confirmed
