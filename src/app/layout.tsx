import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-luxury-slate text-luxury-linen">
        {children}
      </body>
    </html>
  );
}
