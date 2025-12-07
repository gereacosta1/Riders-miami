// src/utils/affirm.js 
import { toCents } from "./money";

const FALLBACK_CUSTOMER = {
  first: "Online",
  last: "Customer",
  email: "onewaymotors2@gmail.com",
  phone: "17862530995",
  addr: {
    line1: "297 NW 54th St",
    city: "Miami",
    state: "FL",
    zipcode: "33127",
    country: "US",
  },
};

// Construye payload Affirm a partir del carrito
export function buildAffirmCheckout(cartItems, totals = {}) {

  const items = cartItems.map(({ id, title, price, qty, image, url }) => {
    const quantity = Number(qty ?? 1) || 1;
    return {
      display_name: title,
      sku: String(id),
      unit_price: toCents(price),
      qty: quantity,
      item_url: url || window.location.origin + "/",
      image_url: image?.startsWith("http")
        ? image
        : window.location.origin + (image || ""),
    };
  });

  const subtotalCents = items.reduce(
    (acc, it) => acc + it.unit_price * it.qty,
    0
  );

  const shippingCents =
    "shipping" in totals ? toCents(totals.shipping) : toCents(0);
  const taxCents = "tax" in totals ? toCents(totals.tax) : toCents(0);

  const totalCents =
    "total" in totals
      ? toCents(totals.total)
      : subtotalCents + shippingCents + taxCents;

  if (totalCents < 5000) {
    throw new Error("Affirm requires a minimum order total of $50.");
  }

  const orderId = "ORDER-" + Date.now();

  return {
    merchant: {
      name: "Riders Miami",
      user_confirmation_url: window.location.origin + "/affirm/confirm",
      user_cancel_url: window.location.origin + "/affirm/cancel",
      user_confirmation_url_action: "GET",
    },

    customer: {
      email: FALLBACK_CUSTOMER.email,
      phone_number: FALLBACK_CUSTOMER.phone,
    },

    shipping: {
      name: { first: FALLBACK_CUSTOMER.first, last: FALLBACK_CUSTOMER.last },
      address: { ...FALLBACK_CUSTOMER.addr },
      email: FALLBACK_CUSTOMER.email,
      phone_number: FALLBACK_CUSTOMER.phone,
    },

    billing: {
      name: { first: FALLBACK_CUSTOMER.first, last: FALLBACK_CUSTOMER.last },
      address: { ...FALLBACK_CUSTOMER.addr },
    },

    items,
    currency: "USD",
    shipping_amount: shippingCents,
    tax_amount: taxCents,
    total: totalCents,
    order_id: orderId,
    metadata: { mode: "modal" },
  };
}

export function openAffirmCheckout(checkout) {
  return new Promise((resolve, reject) => {
    const affirm = window.affirm;
    if (!affirm?.checkout)
      return reject(new Error("Affirm SDK not loaded"));

    affirm.checkout(checkout);
    affirm.checkout.open({
      onSuccess: (res) => resolve(res),
      onFail: (e) => reject(e),
      onValidationError: (e) => reject(e),
      onClose: () => reject(new Error("User closed")),
      onAbort: () => reject(new Error("User aborted")),
    });
  });
}

export async function startAffirm(cartItems, totals = {}) {
  const checkout = buildAffirmCheckout(cartItems, totals);
  const result = await openAffirmCheckout(checkout);

  if (!result || !result.checkout_token) {
    throw new Error("Missing checkout_token from Affirm.");
  }

  const checkout_token = result.checkout_token;

  const authRes = await fetch("/.netlify/functions/affirm-authorize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ checkout_token }),
  });

  const authData = await authRes.json();

  if (!authRes.ok || !authData.charge_id) {
    throw new Error(
      authData?.affirm_message ||
        authData?.message ||
        "Affirm authorization failed."
    );
  }

  const charge_id = authData.charge_id;

  const captureRes = await fetch("/.netlify/functions/affirm-capture", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ charge_id }),
  });

  const captureData = await captureRes.json();

  if (!captureRes.ok) {
    throw new Error(
      captureData?.affirm_message ||
        captureData?.message ||
        "Affirm capture failed."
    );
  }

  return {
    checkout_token,
    charge_id,
    status: captureData.status || "captured",
  };
}
