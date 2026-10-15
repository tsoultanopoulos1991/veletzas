import { GA_MEASUREMENT_ID } from "../data/analytics";

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

let loaded = false;

// Only called after the visitor accepts cookies — nothing analytics-related
// runs (not even a script tag) until then.
export function loadGoogleAnalytics() {
  if (loaded || !GA_MEASUREMENT_ID || GA_MEASUREMENT_ID.includes("XXXX")) return;
  loaded = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }
  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });
}
