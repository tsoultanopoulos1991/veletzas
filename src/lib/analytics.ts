declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// gtag.js is always loaded (see index.html) but starts fully denied —
// this just flips the one storage type we actually use to "granted".
// Must go through window.gtag: gtag.js only processes `arguments` objects
// pushed to dataLayer and silently ignores plain arrays.
export function grantAnalyticsConsent() {
  window.gtag?.("consent", "update", { analytics_storage: "granted" });
  // The landing page_view already went out as a denied ping; record it now.
  window.gtag?.("event", "page_view");
}
