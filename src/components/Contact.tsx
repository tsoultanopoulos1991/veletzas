import { FormEvent, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { business, categories, contact, locations } from "../data/content";
import { emailConfig } from "../data/email";
import Reveal from "./Reveal";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");
    emailjs
      .sendForm(emailConfig.serviceId, emailConfig.templateId, formRef.current, { publicKey: emailConfig.publicKey })
      .then(() => setStatus("sent"))
      .catch(() => setStatus("error"));
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

          <div className="mt-10 space-y-7">
            {locations.map((loc) => (
              <div key={loc.name} className="flex items-start gap-4">
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-cream/10 text-accent-light">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M3 10.5L12 4l9 6.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5 9.5V20h14V9.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-cream/50">{loc.name}</span>
                  <span className="block text-lg font-semibold text-cream">{loc.address}</span>
                  <span className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                    {loc.phones.map((p) => (
                      <a
                        key={p.href}
                        href={p.href}
                        className="text-sm font-medium text-cream/70 transition-colors hover:text-accent-light"
                      >
                        {p.number}
                      </a>
                    ))}
                  </span>
                </span>
              </div>
            ))}

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
          </div>
        </Reveal>

        <Reveal className="lg:col-span-3" delay={120}>
          <div className="rounded-3xl bg-cream p-7 shadow-soft sm:p-10">
            {status === "sent" ? (
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
                <button onClick={() => setStatus("idle")} className="btn-outline mt-7 !px-5 !py-2.5">
                  Νέο αίτημα
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-semibold text-ink-soft">
                  Ονοματεπώνυμο
                  <input
                    required
                    name="from_name"
                    type="text"
                    placeholder="π.χ. Γιώργος Παπαδόπουλος"
                    className="rounded-xl border border-ink/10 bg-sand px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-semibold text-ink-soft">
                  Τηλέφωνο
                  <input
                    required
                    name="phone"
                    type="tel"
                    placeholder="69XX XXX XXX"
                    className="rounded-xl border border-ink/10 bg-sand px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent"
                  />
                </label>
                <label className="sm:col-span-2 flex flex-col gap-2 text-sm font-semibold text-ink-soft">
                  Με ενδιαφέρει
                  <select
                    name="category"
                    className="rounded-xl border border-ink/10 bg-sand px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent"
                  >
                    {categories.map((c) => (
                      <option key={c.slug} value={c.title}>
                        {c.title}
                      </option>
                    ))}
                    <option value="Κάτι άλλο">Κάτι άλλο</option>
                  </select>
                </label>
                <label className="sm:col-span-2 flex flex-col gap-2 text-sm font-semibold text-ink-soft">
                  Μήνυμα
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Πείτε μας λίγα λόγια για τον χώρο σας…"
                    className="resize-none rounded-xl border border-ink/10 bg-sand px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent"
                  />
                </label>

                {status === "error" && (
                  <p className="sm:col-span-2 text-sm font-medium text-red-600">
                    Κάτι πήγε στραβά. Δοκιμάστε ξανά ή καλέστε μας στο {business.phone}.
                  </p>
                )}

                <button type="submit" disabled={status === "sending"} className="btn-primary sm:col-span-2 mt-1 disabled:opacity-60">
                  {status === "sending" ? "Αποστολή…" : "Αποστολή αιτήματος"}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
