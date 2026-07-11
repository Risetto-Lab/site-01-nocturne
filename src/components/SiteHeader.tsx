const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-6 mix-blend-difference sm:px-12">
      <a href="#hero" data-cursor="grow" className="font-display text-sm font-semibold tracking-[0.2em] text-ink">
        NOCTURNE<span className="text-accent">.</span>
      </a>
      <nav aria-label="Primary">
        <ul className="flex items-center gap-6 text-sm text-ink">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} data-cursor="grow" className="hover:text-accent">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
