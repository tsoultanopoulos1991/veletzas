import { useEffect, useMemo, useState } from "react";
import galleryData from "../data/gallery.json";
import { categories } from "../data/content";
import Reveal from "./Reveal";

type Photo = {
  file: string;
  thumb: string;
  category: string;
  project: string;
  projectTitle: string;
  job: string;
  usage: string;
  alt: string;
};

const photos = galleryData.photos as Photo[];

const tabs = [{ slug: "all", title: "Όλα" }, ...categories.map((c) => ({ slug: c.slug, title: c.title }))];

// A handful of jobs are the same real-world project split across two
// categories (e.g. a hospital's shading + its steel frame). Those get their
// own tab, labelled here, so people can browse the whole job in one place
// instead of only finding it inside a single category.
const JOB_LABELS: Record<string, string> = {
  "aiginas-hospital": "Νοσοκομείο Αίγινας",
  "atmoulis-store": "Κατάστημα Atmoulis",
};

const jobTabs = Object.entries(JOB_LABELS)
  .filter(([job]) => photos.some((p) => p.job === job))
  .map(([job, title]) => ({ slug: `job:${job}`, title }));

const PAGE_SIZE = 12;

export default function Gallery({
  activeCategory,
  setActiveCategory,
}: {
  activeCategory: string;
  setActiveCategory: (slug: string) => void;
}) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return photos;
    if (activeCategory.startsWith("job:")) {
      const job = activeCategory.slice(4);
      return photos.filter((p) => p.job === job);
    }
    return photos.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [activeCategory]);

  const shown = filtered.slice(0, visible);

  // Navigation happens over the full filtered list (not just the currently
  // paged-in "shown" photos), so opening a related photo from another page
  // or another category never gets stuck at an edge.
  const activeIndex = lightboxPhoto ? filtered.findIndex((p) => p.file === lightboxPhoto.file) : -1;

  // Grouped by "job" rather than "project": the same real-world job can span
  // more than one project/category (e.g. a hospital's skylight shading and
  // its steel frame are two different projects but one job for the client).
  const relatedPhotos = useMemo(
    () => (lightboxPhoto ? photos.filter((p) => p.job === lightboxPhoto.job && p.file !== lightboxPhoto.file) : []),
    [lightboxPhoto]
  );

  useEffect(() => {
    if (!lightboxPhoto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxPhoto(null);
      if (e.key === "ArrowRight") setLightboxPhoto(filtered[Math.min(activeIndex + 1, filtered.length - 1)]);
      if (e.key === "ArrowLeft") setLightboxPhoto(filtered[Math.max(activeIndex - 1, 0)]);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxPhoto, activeIndex, filtered]);

  const active = lightboxPhoto;

  return (
    <section id="projects" className="bg-cream py-24 sm:py-28">
      <div className="container-px">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-accent-dark">Το Portfolio μας</p>
          <h2 className="section-heading mt-4 text-3xl sm:text-4xl">Έργα που μιλούν από μόνα τους</h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
            Μια γεύση από τις κατασκευές μας σε σπίτια και επαγγελματικούς χώρους σε όλη την Ελλάδα.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.slug}
              onClick={() => setActiveCategory(tab.slug)}
              className={`chip ${
                activeCategory === tab.slug
                  ? "bg-ink text-cream"
                  : "bg-ink/5 text-ink-soft hover:bg-ink/10"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {jobTabs.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-wide text-ink-muted/70">Ενδεικτικά έργα:</span>
            {jobTabs.map((tab) => (
              <button
                key={tab.slug}
                onClick={() => setActiveCategory(tab.slug)}
                className={`chip border ${
                  activeCategory === tab.slug
                    ? "border-accent-dark bg-accent-dark text-cream"
                    : "border-accent-dark/40 bg-transparent text-accent-dark hover:bg-accent-dark/10"
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>
        )}

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {shown.map((photo, i) => (
            <Reveal key={photo.file} delay={(i % 4) * 80} className="aspect-[4/5]">
            <button
              onClick={() => setLightboxPhoto(photo)}
              className="group relative block h-full w-full overflow-hidden rounded-2xl bg-ink/5 shadow-card"
            >
              <img
                src={photo.thumb}
                alt={photo.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="p-4 text-left text-sm font-semibold text-cream">{photo.projectTitle}</span>
              </div>
            </button>
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-ink-muted">Σύντομα διαθέσιμες φωτογραφίες σε αυτή την κατηγορία.</p>
        )}

        {visible < filtered.length && (
          <div className="mt-12 flex justify-center">
            <button onClick={() => setVisible((v) => v + PAGE_SIZE)} className="btn-outline">
              Περισσότερα έργα
            </button>
          </div>
        )}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 sm:p-8"
          onClick={() => setLightboxPhoto(null)}
        >
          <button
            aria-label="Κλείσιμο"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors hover:bg-cream/10"
            onClick={() => setLightboxPhoto(null)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>

          {activeIndex > 0 && (
            <button
              aria-label="Προηγούμενη"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxPhoto(filtered[activeIndex - 1]);
              }}
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors hover:bg-cream/10 sm:left-6"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
          {activeIndex !== -1 && activeIndex < filtered.length - 1 && (
            <button
              aria-label="Επόμενη"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxPhoto(filtered[activeIndex + 1]);
              }}
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors hover:bg-cream/10 sm:right-6"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          <figure className="max-h-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={active.file}
              alt={active.alt}
              className="max-h-[75vh] w-full rounded-xl object-contain shadow-soft"
            />
            <figcaption className="mt-4 text-center text-sm font-medium text-cream/80">
              {active.projectTitle}
            </figcaption>

            {relatedPhotos.length > 0 && (
              <div className="mt-5">
                <p className="text-center text-xs uppercase tracking-wide text-cream/50">
                  Ίδιο έργο — {relatedPhotos.length + 1} φωτογραφίες
                </p>
                <div className="mt-3 flex justify-center gap-2 overflow-x-auto pb-1">
                  {[active, ...relatedPhotos].map((p) => (
                    <button
                      key={p.file}
                      onClick={() => setLightboxPhoto(p)}
                      title={p.projectTitle}
                      className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors sm:h-20 sm:w-20 ${
                        p.file === active.file ? "border-cream" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={p.thumb} alt={p.alt} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </figure>
        </div>
      )}
    </section>
  );
}
