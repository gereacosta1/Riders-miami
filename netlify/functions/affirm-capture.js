// netlify/functions/affirm-capture.js

export async function handler(event) {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { charge_id } = JSON.parse(event.body || '{}');
    if (!charge_id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing charge_id' }),
      };
    }

    // Base URL de Affirm (usa env si existe, sino live por defecto)
    let base = process.env.AFFIRM_API_BASE || 'https://api.affirm.com/api';
    if (base.endsWith('/')) base = base.slice(0, -1);

    const key = `${process.env.AFFIRM_PUBLIC_KEY}:${process.env.AFFIRM_PRIVATE_KEY}`;
    const auth = 'Basic ' + Buffer.from(key).toString('base64');

    const r = await fetch(
      `${base}/v2/charges/${encodeURIComponent(charge_id)}/capture`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth,
        },
      }
    );

    const text = await r.text();

    if (!r.ok) {
      let errJson = null;
      try {
        errJson = JSON.parse(text);
      } catch (_) {}

      return {
        statusCode: r.status,
        body: JSON.stringify({
          error: 'capture_failed',
          affirm_code: errJson?.code || null,
          affirm_message: errJson?.message || null,
          raw: text,
        }),
      };
    }

    const data = JSON.parse(text); // { id, status, ... }

    return {
      statusCode: 200,
      body: JSON.stringify({ status: data.status || 'captured' }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'server_error', detail: String(e) }),
    };
  }
}
