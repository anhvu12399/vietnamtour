import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PreambleText from "@/components/PreambleText";
import DestinationsTabbed from "@/components/DestinationsTabbed";
import BreakingLine from "@/components/BreakingLine";
import JourneyBlock from "@/components/JourneyBlock";
import SignatureMap from "@/components/SignatureMap";
import PossibilitiesCarousel from "@/components/PossibilitiesCarousel";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import BrochureRequest from "@/components/BrochureRequest";
import WhyUs from "@/components/WhyUs";
import Footer from "@/components/Footer";
import { fromPriceLabel, getMultiDayStartingPrice } from "@/lib/pricing";

export async function generateMetadata(): Promise<Metadata> {
  const price = fromPriceLabel(await getMultiDayStartingPrice());
  const title = { absolute: "Luxury Private Vietnam Tours from the UK | VietnamTours.co.uk" };
  const description = `Bespoke private Vietnam tours for UK travellers: tailor-made itineraries, Ha Long Bay cruises, Hoi An and the Mekong.${price}`;
  return {
    title,
    description,
    alternates: { canonical: "https://www.vietnamtours.co.uk" },
    openGraph: {
      title: "Luxury Private Vietnam Tours from the UK",
      description: `Handcrafted private Vietnam holidays for UK travellers: Ha Long Bay cruises, Sa Pa trekking, Hoi An heritage journeys and Mekong escapes.${price}`,
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
}

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
        <SignatureMap />
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
