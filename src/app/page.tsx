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
      <main>
        <Hero />
        <Manifesto />
        <SelectedWork />
        <ServicesMarquee />
        <About />
        <Contact />
      </main>
      <footer className="w-full border-t border-white/5 bg-bg px-6 py-8 text-center text-xs text-muted sm:px-12">
        © {new Date().getFullYear()} NOCTURNE Studio. A fictional creative studio.
      </footer>
    </>
  );
}
