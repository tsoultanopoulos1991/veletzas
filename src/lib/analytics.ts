declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// gtag.js is always loaded (see index.html) but starts fully denied —
// this just flips the one storage type we actually use to "granted".
export function grantAnalyticsConsent() {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(["consent", "update", { analytics_storage: "granted" }]);
}
