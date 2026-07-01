import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Vietnam Heritage Tours',
  description: 'Please read these terms and conditions carefully before booking your journey with Vietnam Heritage Tours.',
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#faf8f5] text-[#343434] flex-grow flex flex-col">
      <section className="bg-[#343434] text-white py-24 px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold mb-4">Legal</p>
        <h1 className="font-serif text-4xl md:text-5xl font-light">Terms &amp; Conditions</h1>
        <p className="mt-3 text-white/60 text-xs">Last updated: 1 July 2024</p>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20 space-y-12 text-sm text-[#545454] leading-loose font-light">

        <div>
          <h2 className="font-serif text-xl text-[#343434] mb-4">1. Definitions</h2>
          <p>"Vietnam Heritage Tours", "we", "us", or "our" refers to Vietnam Heritage Tours Ltd. "You" or "the client" refers to the person or persons who have booked a tour or service with us. "Journey" refers to any tour, itinerary, accommodation booking, or travel service arranged by us.</p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-[#343434] mb-4">2. Booking and Confirmation</h2>
          <p>A booking is confirmed upon receipt of a signed booking form and a non-refundable deposit of 30% of the total journey cost. Full payment is required no later than 60 days prior to the departure date. For bookings made within 60 days of departure, full payment is required at the time of booking. We will issue a confirmation invoice upon receipt of your deposit.</p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-[#343434] mb-4">3. Cancellation Policy</h2>
          <p>Cancellations must be made in writing. The following cancellation charges apply:</p>
          <ul className="list-disc list-inside mt-4 space-y-2">
            <li>More than 60 days before departure: Loss of deposit only</li>
            <li>60–45 days before departure: 50% of total journey cost</li>
            <li>44–30 days before departure: 75% of total journey cost</li>
            <li>29 days or fewer before departure: 100% of total journey cost</li>
          </ul>
          <p className="mt-4">We strongly recommend that you obtain comprehensive travel insurance covering cancellation at the time of booking.</p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-[#343434] mb-4">4. Travel Insurance</h2>
          <p>It is a condition of booking with Vietnam Heritage Tours that all clients hold valid travel insurance covering medical expenses, emergency evacuation, trip cancellation, and personal liability. We reserve the right to refuse participation on a journey where no such insurance is held.</p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-[#343434] mb-4">5. Our Responsibilities</h2>
          <p>We act as an agent for hotels, transport operators, and other service providers. Whilst we take every care to select reputable partners, we cannot accept responsibility for any injury, loss, or damage suffered as a result of their acts or omissions, save where such liability cannot lawfully be excluded.</p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-[#343434] mb-4">6. Amendments to Itineraries</h2>
          <p>In exceptional circumstances (including but not limited to severe weather, civil unrest, or force majeure events), we reserve the right to alter or substitute any part of the itinerary. We will endeavour to provide arrangements of equivalent or superior quality and will notify you as promptly as possible of any such changes.</p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-[#343434] mb-4">7. Governing Law</h2>
          <p>These terms and conditions shall be governed by and construed in accordance with the laws of England and Wales. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the English courts.</p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-[#343434] mb-4">8. Contact</h2>
          <p>For any queries regarding these terms, please contact us at <a href="mailto:mywaytravelinc@gmail.com" className="text-[#9A4B33] underline underline-offset-2">mywaytravelinc@gmail.com</a>.</p>
        </div>

      </section>
    </main>
      <Footer />
    </>
  );
}
