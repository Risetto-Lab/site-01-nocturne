import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guide — NOCTURNE",
  description: "Build notes for the NOCTURNE showcase site.",
};

export default function GuidePage() {
  return (
    <main className="flex min-h-[100svh] w-full flex-col items-center justify-center bg-bg px-6 py-32 text-center sm:px-12">
      <span className="text-xs uppercase tracking-[0.3em] text-muted">Site Factory</span>
      <h1 className="font-display mt-6 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        Guide coming soon
      </h1>
      <p className="mt-6 max-w-md text-muted">
        Build notes, palette, type pairing, and lessons learned for this site
        will be published here once the showcase entry is finalised.
      </p>
      <Link
        href="/"
        data-cursor="grow"
        className="font-display mt-10 inline-block text-lg text-accent hover:underline"
      >
        ← Back to NOCTURNE
      </Link>
    </main>
  );
}
