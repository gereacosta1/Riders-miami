// src/utils/affirmConfig.js
export function initAffirm() {
  const publicKey = import.meta.env.VITE_AFFIRM_PUBLIC_KEY;

  if (!publicKey) {
    console.error('[Affirm] Falta VITE_AFFIRM_PUBLIC_KEY en el frontend');
    return;
  }

  if (!window.affirm) {
    console.error('[Affirm] SDK no cargado todavía');
    return;
  }

  window._affirm_config = {
    public_api_key: publicKey,
    script: "https://cdn1.affirm.com/js/v2/affirm.js",
  };

  window.affirm.config(window._affirm_config);

  console.log('[Affirm] Config cargada con Public Key:', publicKey);
  console.log('[Affirm] Public key en frontend:', import.meta.env.VITE_AFFIRM_PUBLIC_KEY);

}
