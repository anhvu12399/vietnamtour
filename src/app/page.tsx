import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PreambleText from "@/components/PreambleText";
import DestinationsTabbed from "@/components/DestinationsTabbed";
import BreakingLine from "@/components/BreakingLine";
import JourneyBlock from "@/components/JourneyBlock";
import PossibilitiesCarousel from "@/components/PossibilitiesCarousel";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import BrochureRequest from "@/components/BrochureRequest";
import WhyUs from "@/components/WhyUs";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Luxury Vietnam Private Tours | Bespoke Tailor-Made Holidays from the UK",
  description:
    "Vietnam Tours specialises in handcrafted private holidays to Vietnam for discerning UK travellers. Explore Ha Long Bay, Sa Pa, Hoi An and the Mekong Delta on a bespoke itinerary designed around you. From £3,960pp.",
  alternates: {
    canonical: "https://www.vietnamtours.co.uk",
  },
  openGraph: {
    title: "Luxury Vietnam Private Tours | Bespoke Tailor-Made Holidays from the UK",
    description:
      "Handcrafted bespoke Vietnam holidays for UK travellers. Private guided tours, luxury Ha Long Bay cruises, highland trekking in Sa Pa and lantern-lit heritage journeys through Hoi An. From £3,960pp.",
    url: "https://www.vietnamtours.co.uk",
    images: [
      {
        url: "/images/dest_halong_limestone.png",
        width: 1200,
        height: 630,
        alt: "Ha Long Bay limestone karsts at sunrise — luxury private Vietnam tour from the UK",
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow flex flex-col">
        <Hero />
        <PreambleText />
        <DestinationsTabbed />
        <BreakingLine />
        <JourneyBlock />
        <PossibilitiesCarousel />
        <Testimonials />
        <CTASection />
        <BrochureRequest />
        <WhyUs />
      </main>
      <Footer />
    </>
  );
}
