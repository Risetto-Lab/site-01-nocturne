import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";
import StatNumber from "./StatNumber";

export default function About() {
  return (
    <section id="about" className="w-full bg-panel px-6 py-32 sm:px-12 lg:py-40">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
        <Reveal y={40}>
          <SectionLabel index="03" title="About" />
          <h2 className="font-display mt-8 text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
            Founded on the belief that the best hours are the{" "}
            <span className="text-accent">quiet ones</span>.
          </h2>
        </Reveal>
        <Reveal y={40} delay={0.15} className="flex flex-col gap-6 text-lg leading-relaxed text-muted">
          <p>
            NOCTURNE is a small studio working across brand, motion, and space.
            We work with a short list of clients at a time, mostly between
            the hours of 9pm and 4am, because that&apos;s when the work
            gets honest.
          </p>
          <p>
            No pitch decks. No moodboard theatre. Just a team that reads
            the brief twice, disagrees with each other in the room, and
            ships things that feel considered rather than templated.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-6 border-t border-white/10 pt-8 text-sm">
            <div>
              <p className="font-display text-3xl font-semibold text-ink">
                <StatNumber value={8} />
              </p>
              <p className="mt-2 text-muted">Years running</p>
            </div>
            <div>
              <p className="font-display text-3xl font-semibold text-ink">
                <StatNumber value={4} />
              </p>
              <p className="mt-2 text-muted">Studio members</p>
            </div>
            <div>
              <p className="font-display text-3xl font-semibold text-accent">
                <StatNumber value={3} pad={false} suffix="am" />
              </p>
              <p className="mt-2 text-muted">Peak output</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
