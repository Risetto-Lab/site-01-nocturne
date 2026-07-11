import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const SITE_URL = "https://site-01-nocturne.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "NOCTURNE — Studio for the After Hours",
  description:
    "NOCTURNE is a fictional creative studio working in the space between sleep and signal — brand, motion, and spatial design for people who build at night.",
  openGraph: {
    title: "NOCTURNE — Studio for the After Hours",
    description:
      "A fictional creative studio for ideas that only make sense after midnight. Brand, motion, and spatial design.",
    url: SITE_URL,
    siteName: "NOCTURNE",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "NOCTURNE — a glassy torus knot lit by a lime rim light on a near-black background",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NOCTURNE — Studio for the After Hours",
    description:
      "A fictional creative studio for ideas that only make sense after midnight.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0F",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link
          rel="preload"
          href="/fonts/clash-display-600.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/general-sans-400.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="h-full bg-bg text-ink antialiased font-body">
        <a
          href="#main"
          className="sr-only z-[100] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
