import { useEffect, useState } from "react";
import { loadGoogleAnalytics } from "../lib/analytics";

const STORAGE_KEY = "cookieConsent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let choice: string | null = null;
    try {
      choice = localStorage.getItem(STORAGE_KEY);
    } catch {
      // localStorage unavailable — just show the banner each visit.
    }
    if (choice === "accepted") {
      loadGoogleAnalytics();
    } else if (choice !== "rejected") {
      setVisible(true);
    }
  }, []);

  const choose = (accepted: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, accepted ? "accepted" : "rejected");
    } catch {
      // ignore
    }
    if (accepted) loadGoogleAnalytics();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[200] border-t border-cream/10 bg-ink/95 backdrop-blur-sm">
      <div className="container-px flex flex-col items-center gap-4 py-5 sm:flex-row sm:justify-between">
        <p className="text-sm text-cream/80">
          Χρησιμοποιούμε cookies μόνο για στατιστικά επισκεψιμότητας, ώστε να καταλαβαίνουμε πώς μας βρίσκει ο κόσμος.
          Δεν χρησιμοποιούνται για διαφημίσεις.
        </p>
        <div className="flex flex-none gap-3">
          <button onClick={() => choose(false)} className="btn-outline-light !px-5 !py-2.5 whitespace-nowrap">
            Απόρριψη
          </button>
          <button onClick={() => choose(true)} className="btn-primary !px-5 !py-2.5 whitespace-nowrap">
            Αποδοχή
          </button>
        </div>
      </div>
    </div>
  );
}
