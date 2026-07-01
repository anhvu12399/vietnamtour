import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Vietnam Heritage Tours',
  description: 'Learn how Vietnam Heritage Tours collects, uses, and protects your personal data in accordance with UK GDPR.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#faf8f5] text-[#343434] flex-grow flex flex-col">
      <section className="bg-[#343434] text-white py-24 px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold mb-4">Legal</p>
        <h1 className="font-serif text-4xl md:text-5xl font-light">Privacy Policy</h1>
        <p className="mt-3 text-white/60 text-xs">Last updated: 1 July 2024</p>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20 space-y-12 text-sm text-[#545454] leading-loose font-light">

        <div>
          <h2 className="font-serif text-xl text-[#343434] mb-4">1. Who We Are</h2>
          <p>Vietnam Heritage Tours Ltd ("we", "us", "our") is committed to protecting and respecting your privacy. This policy explains how we collect, use, and safeguard your personal data when you interact with our website and services, in accordance with the UK General Data Protection Regulation (UK GDPR).</p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-[#343434] mb-4">2. Data We Collect</h2>
          <p>We may collect and process the following personal data:</p>
          <ul className="list-disc list-inside mt-4 space-y-2">
            <li>Name, email address, and telephone number (via enquiry and booking forms)</li>
            <li>Passport details and nationality (required for visa and booking purposes)</li>
            <li>Travel preferences and dietary requirements (to personalise your journey)</li>
            <li>Payment information (processed securely via our payment provider — we do not store card details)</li>
            <li>Browsing data and cookies (see Section 7)</li>
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-xl text-[#343434] mb-4">3. How We Use Your Data</h2>
          <p>We use your personal data to:</p>
          <ul className="list-disc list-inside mt-4 space-y-2">
            <li>Process enquiries and bookings</li>
            <li>Communicate with you about your journey</li>
            <li>Send our travel newsletter (only with your explicit consent)</li>
            <li>Comply with our legal and regulatory obligations</li>
            <li>Improve our website and services</li>
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-xl text-[#343434] mb-4">4. Legal Basis for Processing</h2>
          <p>We process your data on the following legal bases: performance of a contract (booking fulfilment), your consent (newsletter subscription), and our legitimate interests (improving our services and preventing fraud).</p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-[#343434] mb-4">5. Data Sharing</h2>
          <p>We will not sell your personal data. We share your data only with trusted third parties who assist in delivering your journey — including hotels, guide companies, and transport operators — strictly for the purpose of fulfilling your booking. All third parties are required to maintain the confidentiality and security of your data.</p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-[#343434] mb-4">6. Data Retention</h2>
          <p>We retain your personal data for as long as necessary to fulfil the purposes outlined in this policy, and for a period of 7 years thereafter for legal and accounting obligations, unless a shorter or longer period is required by law.</p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-[#343434] mb-4">7. Cookies</h2>
          <p>Our website uses essential cookies to ensure proper functionality. We may also use analytics cookies (e.g. Google Analytics) to understand how visitors use our site. You may disable cookies through your browser settings; however, this may affect your experience on our website.</p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-[#343434] mb-4">8. Your Rights</h2>
          <p>Under UK GDPR, you have the right to access, rectify, erase, restrict, or object to the processing of your personal data. You also have the right to data portability and to withdraw consent at any time. To exercise any of these rights, please contact us at the address below.</p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-[#343434] mb-4">9. Contact &amp; Complaints</h2>
          <p>For any data protection queries, please contact us at <a href="mailto:mywaytravelinc@gmail.com" className="text-[#9A4B33] underline underline-offset-2">mywaytravelinc@gmail.com</a>. If you are unsatisfied with our response, you have the right to lodge a complaint with the Information Commissioner's Office (ICO) at ico.org.uk.</p>
        </div>

      </section>
    </main>
      <Footer />
    </>
  );
}
