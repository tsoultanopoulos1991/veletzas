import { useEffect, useState } from "react";
import { business, nav } from "../data/content";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/90 backdrop-blur-md shadow-card"
          : "bg-transparent"
      }`}
    >
      <div className="container-px flex h-20 items-center justify-between">
        <a href="#home" className="flex flex-col leading-tight" onClick={() => setOpen(false)}>
          <span
            className={`font-display text-lg sm:text-xl font-bold tracking-tight transition-colors ${
              scrolled ? "text-ink" : "text-cream"
            }`}
          >
            Τεντοτεχνική <span className="text-accent">Περιστερίου</span>
          </span>
          <span
            className={`text-[11px] sm:text-xs font-medium tracking-wide transition-colors ${
              scrolled ? "text-ink-muted" : "text-cream/70"
            }`}
          >
            Παντελής Βελέντζας
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-semibold transition-colors hover:text-accent ${
                scrolled ? "text-ink-soft" : "text-cream/90"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href={business.phoneHref}
            className={`text-sm font-semibold transition-colors hover:text-accent ${
              scrolled ? "text-ink-soft" : "text-cream/90"
            }`}
          >
            {business.phone}
          </a>
          <a href="#contact" className="btn-primary !px-5 !py-2.5">
            Ζητήστε προσφορά
          </a>
        </div>

        <button
          aria-label="Μενού"
          onClick={() => setOpen((v) => !v)}
          className={`lg:hidden flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
            scrolled ? "border-ink/20 text-ink" : "border-cream/40 text-cream"
          }`}
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-cream border-t border-ink/10 shadow-soft">
          <nav className="container-px flex flex-col py-4">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-semibold text-ink-soft border-b border-ink/5 last:border-none"
              >
                {item.label}
              </a>
            ))}
            <a href={business.phoneHref} className="py-3 text-base font-semibold text-accent-dark">
              {business.phone}
            </a>
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-3 w-full">
              Ζητήστε προσφορά
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
