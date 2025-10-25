exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    };
  }

  try {
    const body = JSON.parse(event.body);
    const checkoutToken = body.checkout_token;

    if (!checkoutToken) {
      return {
        statusCode: 302,
        headers: {
          Location: '/success.html?error=No se recibió el token de checkout'
        }
      };
    }

    const affirmPublicKey = process.env.AFFIRM_PUBLIC_KEY;
    const affirmPrivateKey = process.env.AFFIRM_PRIVATE_KEY;
    const affirmEnv = process.env.AFFIRM_ENV || 'sandbox';

    if (!affirmPublicKey || !affirmPrivateKey) {
      return {
        statusCode: 302,
        headers: {
          Location: '/success.html?error=Configuración de Affirm incompleta'
        }
      };
    }

    const affirmApiUrl = affirmEnv === 'production'
      ? 'https://api.affirm.com/api/v2/charges'
      : 'https://sandbox.affirm.com/api/v2/charges';

    const authString = Buffer.from(`${affirmPublicKey}:${affirmPrivateKey}`).toString('base64');

    const response = await fetch(affirmApiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        checkout_token: checkoutToken
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Affirm API error:', data);
      return {
        statusCode: 302,
        headers: {
          Location: `/success.html?error=${encodeURIComponent(data.message || 'Error al procesar el pago')}`
        }
      };
    }

    if (data.id && data.status_code === 'authorized') {
      return {
        statusCode: 302,
        headers: {
          Location: `/success.html?charge_id=${data.id}&status=authorized`
        }
      };
    } else {
      return {
        statusCode: 302,
        headers: {
          Location: `/success.html?error=El pago no fue autorizado`
        }
      };
    }

  } catch (error) {
    console.error('Error en affirm-confirm:', error);
    return {
      statusCode: 302,
      headers: {
        Location: `/success.html?error=${encodeURIComponent(error.message || 'Error del servidor')}`
      }
    };
  }
};
