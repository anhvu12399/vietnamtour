import Header from "@/components/Header";
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

export default function Home() {
  return (
    <>
      <Header />
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

