import type { Metadata } from "next";
import { Manrope, Fraunces, Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { TrafficTracker } from "@/components/TrafficTracker";
import { OrganizationJsonLd } from "@/components/SeoJsonLd";
import AiReferralTracker from "@/components/AiReferralTracker";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vietnamtours.co.uk"),
  title: {
    default: "Luxury Vietnam Private Tours | Bespoke Holidays from the UK | VietnamTours.co.uk",
    template: "%s | VietnamTours.co.uk",
  },
  description:
    "Discover Vietnam on a bespoke private tour crafted exclusively for you. Luxury tailor-made holidays from the UK — Ha Long Bay cruises, Sa Pa trekking, Hoi An heritage and Mekong Delta escapes. Enquire today.",
  keywords: [
    "Vietnam private tours UK",
    "luxury Vietnam holidays",
    "bespoke Vietnam travel",
    "tailor-made Vietnam tours UK",
    "Vietnam holidays from UK",
    "Ha Long Bay luxury cruise",
    "Sa Pa trekking tour",
    "Hoi An private tour",
    "Mekong Delta cruise",
    "Vietnam specialist UK",
    "private guided Vietnam tour",
    "exclusive Vietnam itinerary",
    "Vietnam luxury travel",
    "Vietnam holiday packages UK",
    "vietnamtours co uk",
  ],
  authors: [{ name: "VietnamTours.co.uk" }],
  creator: "VietnamTours.co.uk",
  publisher: "VietnamTours.co.uk",
  // NOTE: Do NOT set alternates.canonical here in layout.tsx!
  // In Next.js App Router, layout-level canonical overrides page-level canonical.
  // Each page (generateMetadata) sets its own self-referencing canonical.
  // Setting a global canonical here was causing ALL pages to canonicalize to the homepage,
  // which was the #1 reason only 27/136 sitemap URLs were being indexed by Google.
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://www.vietnamtours.co.uk",
    siteName: "VietnamTours.co.uk",
    title: "Luxury Vietnam Private Tours | Bespoke Holidays from the UK",
    description:
      "Handcrafted bespoke Vietnam holidays for discerning UK travellers. Private guided tours, luxury Ha Long Bay cruises, highland trekking in Sa Pa and heritage journeys through Hoi An.",
    images: [
      {
        url: "/images/dest_halong_limestone.png",
        width: 1200,
        height: 630,
        alt: "Ha Long Bay limestone karsts at sunrise — luxury private Vietnam tour",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Vietnam Private Tours | Bespoke Holidays from the UK",
    description:
      "Handcrafted bespoke Vietnam holidays for discerning UK travellers. Private guided tours, luxury cruises and highland trekking.",
    images: ["/images/dest_halong_limestone.png"],
    creator: "@vietnamtoursuk",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }),
    // Bing Webmaster Tools — Bing's index feeds ChatGPT Search
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION && { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } }),
  },
  alternates: {
    types: { "application/rss+xml": "https://www.vietnamtours.co.uk/rss.xml" },
  },
};

import WhatsAppFloating from "@/components/WhatsAppFloating";
import { SanityLive } from "@/sanity/client";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${manrope.variable} ${fraunces.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <OrganizationJsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink font-medium">
        <TrafficTracker />
        {children}
        <WhatsAppFloating />
        <Analytics />
        <AiReferralTracker />
        <SanityLive />
      </body>
    </html>
  );
}
