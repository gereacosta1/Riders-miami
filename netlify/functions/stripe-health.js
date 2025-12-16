import Stripe from "stripe";

export async function handler(event) {
  try {
    if (event.httpMethod !== "GET") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const sk = process.env.STRIPE_SECRET_KEY;
    if (!sk) {
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ok: false, error: "missing_STRIPE_SECRET_KEY" }),
      };
    }

    const stripe = new Stripe(sk);
    const balance = await stripe.balance.retrieve();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ok: true,
        mode: sk.startsWith("sk_live_") ? "live" : "test",
        hasAvailable: Array.isArray(balance?.available),
      }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ok: false,
        error: "stripe_error",
        detail: String(e?.message || e),
      }),
    };
  }
}
