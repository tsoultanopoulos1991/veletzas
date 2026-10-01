import { about, business, locations } from "../data/content";
import Reveal from "./Reveal";

export default function About() {
  const [mainLocation, badgeLocation] = locations;

  return (
    <section id="about" className="bg-sand py-24 sm:py-28">
      <div className="container-px grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="overflow-hidden rounded-[2rem] shadow-soft">
            <img
              src={mainLocation.photo ?? "/images/company/0001-64cc6ad5ac58.jpg"}
              alt={`Το ${mainLocation.name} της Τεντοτεχνικής Περιστερίου`}
              className="h-[420px] w-full object-cover sm:h-[520px]"
            />
          </div>
          {badgeLocation?.photo && (
            <div className="absolute -bottom-8 -right-4 w-40 overflow-hidden rounded-2xl border-4 border-cream shadow-card sm:-right-8 sm:w-52">
              <img
                src={badgeLocation.photo}
                alt={`Το ${badgeLocation.name} της Τεντοτεχνικής Περιστερίου`}
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </Reveal>

        <Reveal delay={120}>
          <p className="eyebrow text-accent-dark">{about.title}</p>
          <h2 className="section-heading mt-4 text-3xl sm:text-4xl">
            Ο Παντελής Βελέντζας &amp; η ομάδα του
          </h2>
          <div className="mt-6 space-y-4">
            {about.paragraphs.map((p) => (
              <p key={p} className="text-base leading-relaxed text-ink-muted sm:text-lg">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-ink/5 p-6">
            <p className="text-sm font-medium text-ink-soft">{about.ctaText}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={business.phoneHref} className="btn-primary !px-5 !py-2.5">
                Καλέστε μας: {business.phone}
              </a>
              <a href="#contact" className="btn-outline !px-5 !py-2.5">
                Ζητήστε προσφορά
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
