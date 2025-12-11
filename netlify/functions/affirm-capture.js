// netlify/functions/affirm-capture.js

export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Method Not Allowed" }),
      };
    }

    console.log("[AFFIRM CAPTURE] Incoming body:", event.body);

    const { charge_id } = JSON.parse(event.body || "{}");
    if (!charge_id) {
      console.log("[AFFIRM CAPTURE] Missing charge_id");
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Missing charge_id" }),
      };
    }

    // Base URL de Affirm (usa env si existe, sino live por defecto)
    let base = process.env.AFFIRM_API_BASE || "https://api.affirm.com/api";
    if (base.endsWith("/")) base = base.slice(0, -1);

    const publicKey = process.env.AFFIRM_PUBLIC_KEY;
    const privateKey = process.env.AFFIRM_PRIVATE_KEY;

    if (!publicKey || !privateKey) {
      console.error("[AFFIRM CAPTURE] Missing API keys", {
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

    console.log("[AFFIRM CAPTURE] Using base URL:", base);

    const r = await fetch(
      `${base}/v2/charges/${encodeURIComponent(charge_id)}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      }
    );

    const text = await r.text();

    console.log("[AFFIRM CAPTURE] Affirm response status:", r.status);
    console.log("[AFFIRM CAPTURE] Affirm response body:", text);

    if (!r.ok) {
      let errJson = null;
      try {
        errJson = JSON.parse(text);
      } catch (_) {
        // no-op
      }

      return {
        statusCode: r.status,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "capture_failed",
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
      body: JSON.stringify({ status: data.status || "captured" }),
    };
  } catch (e) {
    console.error("[AFFIRM CAPTURE] Server error:", e);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "server_error", detail: String(e) }),
    };
  }
}
