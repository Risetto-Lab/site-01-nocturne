import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import SelectedWork from "@/components/SelectedWork";
import ServicesMarquee from "@/components/ServicesMarquee";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Manifesto />
        <SelectedWork />
        <ServicesMarquee />
        <About />
        <Contact />
      </main>
      <footer className="w-full border-t border-white/5 bg-bg px-6 py-10 sm:px-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-xs text-muted sm:flex-row">
          <span className="font-display tracking-[0.2em] text-ink">NOCTURNE</span>
          <span>
            © {new Date().getFullYear()} — A fictional creative studio.
          </span>
          <a href="#hero" data-cursor="grow" className="uppercase tracking-[0.2em] hover:text-accent">
            Back to top ↑
          </a>
        </div>
      </footer>
    </>
  );
}
