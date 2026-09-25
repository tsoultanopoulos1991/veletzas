import { useEffect, useState } from "react";
import { hero, trustStrip } from "../data/content";

const SLIDE_MS = 6000;

const slides = [
  {
    src: "/images/tentopergoles/0037-ac90d830a86a.jpg",
    alt: "Τεντοπέργκολα με θέα στο ηλιοβασίλεμα – Τεντοτεχνική Περιστερίου",
  },
  {
    src: "/images/tentopergoles/0308-0906283d7487.jpg",
    alt: "Τεντοπέργκολα κήπου με φωτισμό – Τεντοτεχνική Περιστερίου",
  },
  {
    src: "/images/tentopergoles/0347-19389d34d6e7.jpg",
    alt: "Τεντοπέργκολα ταράτσας με θέα στη θάλασσα το σούρουπο – Τεντοτεχνική Περιστερίου",
  },
  {
    src: "/images/arm-awnings/0104-246a35ac3542.jpg",
    alt: "Τέντα βραχίονα καταστήματος Atmoulis – Τεντοτεχνική Περιστερίου",
  },
  {
    src: "/images/arm-awnings/0164-c2be48200e52.jpg",
    alt: "Τέντες βραχίονα σε σύγχρονη πολυκατοικία – Τεντοτεχνική Περιστερίου",
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink">
      {slides.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={i === active ? slide.alt : ""}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
          fetchPriority={i === 0 ? "high" : "low"}
          loading={i === 0 ? "eager" : "lazy"}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/45 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_25%_58%,rgba(27,30,34,0.75),transparent_72%)]" />

      <div className="relative container-px pt-40 pb-16 sm:pb-20">
        <p className="eyebrow animate-fade-up text-accent-light [animation-delay:0ms]">{hero.eyebrow}</p>
        <h1 className="section-heading animate-fade-up mt-5 max-w-3xl text-4xl leading-[1.08] text-cream [animation-delay:120ms] sm:text-5xl lg:text-6xl">
          {hero.title}
        </h1>
        <p className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-cream/80 [animation-delay:240ms] sm:text-lg">
          {hero.subtitle}
        </p>

        <div className="animate-fade-up mt-9 flex flex-wrap items-center gap-4 [animation-delay:360ms]">
          <a href="#contact" className="btn-primary">
            {hero.primaryCta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#projects" className="btn-outline-light">
            {hero.secondaryCta}
          </a>
        </div>

        <div className="animate-fade-up mt-10 flex items-center gap-2.5 [animation-delay:480ms]">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              aria-label={`Φωτογραφία ${i + 1} από ${slides.length}`}
              onClick={() => setActive(i)}
              className="group flex h-4 items-center px-0.5"
            >
              <span
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === active ? "w-7 bg-accent-light" : "w-1.5 bg-cream/40 group-hover:bg-cream/70"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="relative border-t border-cream/10 bg-ink/40 backdrop-blur-sm">
        <div className="container-px grid grid-cols-2 gap-x-6 gap-y-4 py-6 text-sm font-semibold text-cream/85 sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-6 lg:text-[15px]">
          {trustStrip.map((item) => (
            <div key={item} className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-accent/90 text-cream">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
