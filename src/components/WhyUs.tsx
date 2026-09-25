import { whyUs } from "../data/content";
import Reveal from "./Reveal";

const icons = [
  <path key="a" d="M12 3l2.4 5.2L20 9l-4 4 1 6-5-2.8L7 19l1-6-4-4 5.6-.8L12 3z" strokeLinejoin="round" strokeLinecap="round" />,
  <path key="b" d="M4 20V10l8-6 8 6v10M9 20v-6h6v6" strokeLinejoin="round" strokeLinecap="round" />,
  <path key="c" d="M4 12a8 8 0 1116 0 8 8 0 01-16 0zM12 7v5l3 2" strokeLinejoin="round" strokeLinecap="round" />,
  <path key="d" d="M9 12l2 2 4-4M20 12a8 8 0 11-3.5-6.6" strokeLinejoin="round" strokeLinecap="round" />,
];

export default function WhyUs() {
  return (
    <section id="why-us" className="relative isolate overflow-hidden bg-ink py-24 sm:py-28">
      <div
        aria-hidden
        className="absolute -left-40 top-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl"
      />

      <div className="container-px">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-accent-light">Γιατί Εμάς</p>
          <h2 className="section-heading mt-4 text-3xl text-cream sm:text-4xl">
            Εμπιστοσύνη σε κάθε λεπτομέρεια
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <div className="h-full rounded-3xl border border-cream/10 bg-cream/[0.04] p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent-light">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    {icons[i]}
                  </svg>
                </span>
                <h3 className="mt-6 font-display text-lg font-semibold text-cream">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/65">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
