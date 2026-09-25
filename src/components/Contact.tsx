import { FormEvent, useState } from "react";
import { business, categories, contact } from "../data/content";
import Reveal from "./Reveal";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative isolate overflow-hidden bg-ink py-24 sm:py-28">
      <div
        aria-hidden
        className="absolute -right-40 bottom-0 -z-10 h-[26rem] w-[26rem] rounded-full bg-accent/10 blur-3xl"
      />

      <div className="container-px grid grid-cols-1 gap-14 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <p className="eyebrow text-accent-light">Επικοινωνία</p>
          <h2 className="section-heading mt-4 text-3xl text-cream sm:text-4xl">{contact.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-cream/70 sm:text-lg">{contact.subtitle}</p>

          <div className="mt-10 space-y-5">
            <a href={business.phoneHref} className="flex items-center gap-4 group">
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-cream/10 text-accent-light transition-colors group-hover:bg-accent group-hover:text-cream">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 015 6a2 2 0 012-2z" strokeLinejoin="round" />
                </svg>
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wide text-cream/50">Σταθερό</span>
                <span className="block text-lg font-semibold text-cream">{business.phone}</span>
              </span>
            </a>

            <a href={business.mobileHref} className="flex items-center gap-4 group">
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-cream/10 text-accent-light transition-colors group-hover:bg-accent group-hover:text-cream">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="7" y="3" width="10" height="18" rx="2" />
                  <path d="M11 18h2" strokeLinecap="round" />
                </svg>
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wide text-cream/50">Κινητό</span>
                <span className="block text-lg font-semibold text-cream">{business.mobile}</span>
              </span>
            </a>

            <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-cream/10 text-accent-light transition-colors group-hover:bg-accent group-hover:text-cream">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wide text-cream/50">Instagram</span>
                <span className="block text-lg font-semibold text-cream">@{business.instagramHandle}</span>
              </span>
            </a>

            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-cream/10 text-accent-light">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 21s7-6.5 7-11.5A7 7 0 105 9.5C5 14.5 12 21 12 21z" strokeLinejoin="round" />
                  <circle cx="12" cy="9.5" r="2.5" />
                </svg>
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wide text-cream/50">Περιοχή</span>
                <span className="block text-lg font-semibold text-cream">{business.area}</span>
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-3" delay={120}>
          <div className="rounded-3xl bg-cream p-7 shadow-soft sm:p-10">
            {submitted ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent-dark">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold text-ink">Ευχαριστούμε!</h3>
                <p className="mt-2 max-w-sm text-ink-muted">
                  Λάβαμε το αίτημά σας και θα επικοινωνήσουμε μαζί σας σύντομα για να κλείσουμε ραντεβού για δωρεάν μέτρηση.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-outline mt-7 !px-5 !py-2.5">
                  Νέο αίτημα
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-semibold text-ink-soft">
                  Ονοματεπώνυμο
                  <input
                    required
                    type="text"
                    placeholder="π.χ. Γιώργος Παπαδόπουλος"
                    className="rounded-xl border border-ink/10 bg-sand px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-semibold text-ink-soft">
                  Τηλέφωνο
                  <input
                    required
                    type="tel"
                    placeholder="69XX XXX XXX"
                    className="rounded-xl border border-ink/10 bg-sand px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent"
                  />
                </label>
                <label className="sm:col-span-2 flex flex-col gap-2 text-sm font-semibold text-ink-soft">
                  Με ενδιαφέρει
                  <select className="rounded-xl border border-ink/10 bg-sand px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent">
                    {categories.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.title}
                      </option>
                    ))}
                    <option value="other">Κάτι άλλο</option>
                  </select>
                </label>
                <label className="sm:col-span-2 flex flex-col gap-2 text-sm font-semibold text-ink-soft">
                  Μήνυμα
                  <textarea
                    rows={4}
                    placeholder="Πείτε μας λίγα λόγια για τον χώρο σας…"
                    className="resize-none rounded-xl border border-ink/10 bg-sand px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent"
                  />
                </label>
                <button type="submit" className="btn-primary sm:col-span-2 mt-1">
                  Αποστολή αιτήματος
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
