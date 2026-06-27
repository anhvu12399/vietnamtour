import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { Analytics } from "@vercel/analytics/next";
import { SanityLive } from "@/sanity/client";
import { OrganizationJsonLd } from "@/components/SeoJsonLd";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | VietnamTours.co.uk",
    default: "VietnamTours.co.uk | Luxury Bespoke Travel Vietnam",
  },
  description: "Experience ultra-luxury travel in Vietnam. Fully bespoke itineraries curated by local specialists. Stay at world-class resorts like Amanoi & Six Senses.",
  keywords: [
    "luxury travel Vietnam",
    "bespoke Vietnam tours",
    "luxury holidays Vietnam",
    "custom Vietnam itinerary",
    "Amanoi resort Vietnam"
  ],
  metadataBase: new URL("https://vietnamtour.co.uk"),
  alternates: {
    languages: {
      'en-GB': '/',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/logo-dark.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let isDraftMode = false;
  try {
    isDraftMode = (await draftMode()).isEnabled;
  } catch (error) {
    // Next.js might throw Dynamic Server Usage error when reading draftMode
  }
  return (
    <html
      lang="en-GB"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-luxury-slate text-luxury-linen">
        <OrganizationJsonLd />
        {children}
        <SanityLive />
        {isDraftMode && <VisualEditing />}
        <Analytics />
      </body>
    </html>
  );
}
