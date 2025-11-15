// netlify/functions/affirm-authorize.js
export async function handler(event) {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { checkout_token } = JSON.parse(event.body || '{}');
    if (!checkout_token) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing checkout_token' }) };
    }

    const key = `${process.env.AFFIRM_PUBLIC_KEY}:${process.env.AFFIRM_PRIVATE_KEY}`;
    const auth = 'Basic ' + Buffer.from(key).toString('base64');

    const r = await fetch(
      `${process.env.AFFIRM_API_BASE || 'https://api.affirm.com'}/v2/charges`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth,
        },
        body: JSON.stringify({ checkout_token }),
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
          error: 'authorize_failed',
          affirm_code: errJson?.code || null,
          affirm_message: errJson?.message || null,
          // para debug si hace falta ver más en logs:
          raw: text,
        }),
      };
    }

    const data = JSON.parse(text); // expected { id, status, ... }
    return {
      statusCode: 200,
      body: JSON.stringify({ charge_id: data.id, status: data.status }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'server_error', detail: String(e) }),
    };
  }
}
