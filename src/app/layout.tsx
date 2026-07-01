import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair-display",
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
  alternates: {
    canonical: "https://www.vietnamtours.co.uk",
  },
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
    google: "placeholder-google-site-verification",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TravelAgency",
      "@id": "https://www.vietnamtours.co.uk/#organization",
      name: "VietnamTours.co.uk",
      url: "https://www.vietnamtours.co.uk",
      logo: {
        "@type": "ImageObject",
        url: "https://www.vietnamtours.co.uk/images/adventuretravel-26.svg",
      },
      description:
        "Bespoke private Vietnam tours and luxury tailor-made holidays for discerning travellers from the United Kingdom. Specialists in Ha Long Bay cruises, Sa Pa trekking, Hoi An heritage journeys and Mekong Delta escapes.",
      address: {
        "@type": "PostalAddress",
        addressCountry: "GB",
      },
      areaServed: {
        "@type": "Country",
        name: "Vietnam",
      },
      priceRange: "£££",
      telephone: "+44-20-0000-0000",
      sameAs: [
        "https://www.facebook.com/vietnamtoursuk",
        "https://www.instagram.com/vietnamtoursuk",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.vietnamtours.co.uk/#website",
      url: "https://www.vietnamtours.co.uk",
      name: "VietnamTours.co.uk",
      description: "Bespoke luxury private Vietnam tours from the UK",
      publisher: {
        "@id": "https://www.vietnamtours.co.uk/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://www.vietnamtours.co.uk/itineraries?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://www.vietnamtours.co.uk/#webpage",
      url: "https://www.vietnamtours.co.uk",
      name: "Luxury Vietnam Private Tours | Bespoke Holidays from the UK",
      isPartOf: { "@id": "https://www.vietnamtours.co.uk/#website" },
      about: { "@id": "https://www.vietnamtours.co.uk/#organization" },
      description:
        "Discover Vietnam on a bespoke private tour crafted exclusively for you. Luxury tailor-made holidays from the UK — Ha Long Bay cruises, Sa Pa trekking, Hoi An heritage and Mekong Delta escapes.",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.vietnamtours.co.uk",
          },
        ],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${plusJakartaSans.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <Script
          id="json-ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#faf8f5] text-[#343434]">{children}</body>
    </html>
  );
}
