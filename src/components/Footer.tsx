import { business, nav } from "../data/content";

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-cream/10 py-14">
      <div className="container-px flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <span className="font-display text-lg font-bold text-cream">
            Τεντοτεχνική <span className="text-accent-light">Περιστερίου</span>
          </span>
          <p className="mt-3 text-sm leading-relaxed text-cream/60">
            Τεντοπέργκολες, κάθετη σκίαση, τέντες και ρολοκουρτίνες. Κατασκευή και τοποθέτηση από τον Παντελή Βελέντζα
            και την ομάδα του, στο Περιστέρι και τη Δυτική Αττική.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-12 gap-y-8">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-cream/40">Πλοήγηση</h4>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sm text-cream/70 transition-colors hover:text-accent-light">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-cream/40">Επικοινωνία</h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href={business.phoneHref} className="text-sm text-cream/70 transition-colors hover:text-accent-light">
                  {business.phone}
                </a>
              </li>
              <li>
                <a href={business.mobileHref} className="text-sm text-cream/70 transition-colors hover:text-accent-light">
                  {business.mobile}
                </a>
              </li>
              <li>
                <a
                  href={business.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-cream/70 transition-colors hover:text-accent-light"
                >
                  @{business.instagramHandle}
                </a>
              </li>
              <li className="text-sm text-cream/70">{business.area}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container-px mt-12 flex flex-col gap-2 border-t border-cream/10 pt-6 text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Τεντοτεχνική Περιστερίου — {business.owner}. Με επιφύλαξη παντός δικαιώματος.</span>
      </div>
    </footer>
  );
}
