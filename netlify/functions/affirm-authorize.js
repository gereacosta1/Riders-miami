// netlify/functions/affirm-authorize.js

function maskKey(k) {
  if (!k) return null;
  const s = String(k);
  if (s.length <= 10) return s;
  return s.slice(0, 6) + "..." + s.slice(-4);
}

export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Method Not Allowed" }),
      };
    }

    console.log("[AFFIRM AUTH] Incoming body:", event.body);

    const { checkout_token } = JSON.parse(event.body || "{}");
    if (!checkout_token) {
      console.log("[AFFIRM AUTH] Missing checkout_token");
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Missing checkout_token" }),
      };
    }

    // Base URL de Affirm (usa env si existe, sino live por defecto)
    let base = process.env.AFFIRM_API_BASE || "https://api.affirm.com/api";
    if (base.endsWith("/")) base = base.slice(0, -1);

    const publicKey = process.env.AFFIRM_PUBLIC_KEY;
    const privateKey = process.env.AFFIRM_PRIVATE_KEY;

    // Logueamos qué ve el servidor, pero enmascarado
    console.log("[AFFIRM AUTH] Env check:", {
      base,
      publicKey: maskKey(publicKey),
      privateKey: maskKey(privateKey),
    });

    if (!publicKey || !privateKey) {
      console.error("[AFFIRM AUTH] Missing API keys", {
        hasPublic: !!publicKey,
        hasPrivate: !!privateKey,
      });
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "missing_affirm_keys",
          message:
            "AFFIRM_PUBLIC_KEY or AFFIRM_PRIVATE_KEY not configured in environment.",
        }),
      };
    }

    const key = `${publicKey}:${privateKey}`;
    const auth = "Basic " + Buffer.from(key).toString("base64");

    const r = await fetch(`${base}/v2/charges`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      body: JSON.stringify({ checkout_token }),
    });

    const text = await r.text();

    console.log("[AFFIRM AUTH] Affirm response status:", r.status);
    console.log("[AFFIRM AUTH] Affirm response body:", text);

    if (!r.ok) {
      let errJson = null;
      try {
        errJson = JSON.parse(text);
      } catch (_) {}

      return {
        statusCode: r.status,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "authorize_failed",
          affirm_code: errJson?.code || null,
          affirm_message: errJson?.message || null,
          raw: text,
        }),
      };
    }

    const data = JSON.parse(text); // { id, status, ... }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ charge_id: data.id, status: data.status }),
    };
  } catch (e) {
    console.error("[AFFIRM AUTH] Server error:", e);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "server_error", detail: String(e) }),
    };
  }
}
