import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { SanityLive } from "@/sanity/client";
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
    template: "%s | VietnamTour.co.uk",
    default: "VietnamTour.co.uk | Luxury Bespoke Travel Vietnam",
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
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraftMode = (await draftMode()).isEnabled;
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-luxury-slate text-luxury-linen">
        {children}
        {SanityLive && <SanityLive />}
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  );
}
