/**
 * Paystack Inline JS integration.
 * Loads the Paystack script once, then exposes a `payWithPaystack` helper.
 */

declare global {
  interface Window {
    PaystackPop: {
      setup: (config: PaystackConfig) => { openIframe: () => void };
    };
  }
}

interface PaystackConfig {
  key: string;
  email: string;
  amount: number; // in pesewas (kobo) — smallest currency unit
  currency: string;
  ref: string;
  callback: (response: { reference: string; status: string }) => void;
  onClose: () => void;
}

const PAYSTACK_SCRIPT_URL = 'https://js.paystack.co/v1/inline.js';

let scriptLoaded = false;
let scriptLoading: Promise<void> | null = null;

function loadPaystackScript(): Promise<void> {
  if (scriptLoaded) return Promise.resolve();
  if (scriptLoading) return scriptLoading;

  scriptLoading = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = PAYSTACK_SCRIPT_URL;
    script.async = true;
    script.onload = () => {
      scriptLoaded = true;
      resolve();
    };
    script.onerror = () => reject(new Error('Failed to load Paystack'));
    document.head.appendChild(script);
  });

  return scriptLoading;
}

interface PaymentOptions {
  email: string;
  amountInCedis: number;
  onSuccess: (reference: string) => void;
  onClose: () => void;
}

export async function payWithPaystack({ email, amountInCedis, onSuccess, onClose }: PaymentOptions) {
  await loadPaystackScript();

  const key = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  if (!key || key.startsWith('pk_test_xxx')) {
    // Dev mode: simulate payment
    console.warn('Paystack key not configured — simulating payment');
    await new Promise((r) => setTimeout(r, 1500));
    onSuccess(`SIM_${Date.now()}`);
    return;
  }

  const ref = `SAAB_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  const handler = window.PaystackPop.setup({
    key,
    email,
    amount: Math.round(amountInCedis * 100), // pesewas
    currency: 'GHS',
    ref,
    callback: (response) => onSuccess(response.reference),
    onClose,
  });

  handler.openIframe();
}
