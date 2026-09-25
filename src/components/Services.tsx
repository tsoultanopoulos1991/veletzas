import { categories } from "../data/content";
import Reveal from "./Reveal";

export default function Services({ onSelect }: { onSelect: (slug: string) => void }) {
  return (
    <section id="solutions" className="relative isolate overflow-hidden bg-sand py-24 sm:py-28">
      <div
        aria-hidden
        className="absolute -right-32 -top-40 -z-10 h-[26rem] w-[26rem] rounded-full bg-accent/20 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-48 -left-24 -z-10 h-[22rem] w-[22rem] rounded-full bg-sand-deep/50 blur-3xl"
      />

      <div className="container-px">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-accent-dark">Οι Λύσεις μας</p>
          <h2 className="section-heading mt-4 text-3xl sm:text-4xl">
            Μία λύση σκίασης για κάθε χώρο
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
            Από την ταράτσα και τη βεράντα, μέχρι τη βιτρίνα του καταστήματος και το σαλόνι σας —
            σχεδιάζουμε, κατασκευάζουμε και τοποθετούμε το σύστημα σκίασης που ταιριάζει στον χώρο σας.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <Reveal key={cat.slug} delay={i * 90}>
              <a
                href="#projects"
                onClick={() => onSelect(cat.slug)}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-ink shadow-card transition-transform duration-300 hover:-translate-y-1.5"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={cat.cover}
                    alt={cat.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-semibold text-cream">{cat.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-cream/70">{cat.short}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-light">
                    Δείτε έργα
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
