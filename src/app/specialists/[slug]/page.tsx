import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import { getSpecialistBySlug, getSpecialists } from '@/sanity/client';
import { BreadcrumbJsonLd, PersonJsonLd } from '@/components/SeoJsonLd';
import { absoluteUrl } from '@/lib/siteConfig';

export const revalidate = 60;

export async function generateStaticParams() {
  const specialists = await getSpecialists();
  return specialists.filter((spec) => spec.slug?.current).map((spec) => ({
    slug: spec.slug.current,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const specialist = await getSpecialistBySlug(slug);
  if (!specialist) return {};
  const title = `${specialist.name} – ${specialist.role} | Vietnam Travel Specialist`;
  const description = `Meet ${specialist.name}, ${specialist.role} at VietnamTours.co.uk. Plan a tailor-made private Vietnam tour with a specialist who knows the country first-hand.`;
  const url = absoluteUrl(`/specialists/${slug}`);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'profile', ...(specialist.image && { images: [{ url: specialist.image }] }) },
  };
}

export default async function SpecialistDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const specialist = await getSpecialistBySlug(slug);

  if (!specialist) {
    notFound();
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Specialists', url: '/specialists' },
          { name: specialist.name, url: `/specialists/${slug}` },
        ]}
      />
      <PersonJsonLd
        person={{
          name: specialist.name,
          jobTitle: specialist.role,
          url: `/specialists/${slug}`,
          image: specialist.image,
          knowsAbout: specialist.favoriteDestinations,
        }}
      />
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-32 sm:py-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
          
          {/* Left Column: Portrait & Details */}
          <div className="space-y-8 md:sticky md:top-32">
            <div className="relative aspect-square w-full max-w-sm mx-auto overflow-hidden border border-jade-deep/50">
              <Image
                src={specialist.image}
                alt={specialist.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            <div className="text-center md:text-left space-y-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-gold font-semibold block">
                  {specialist.role}
                </span>
                <h1 className="font-serif text-2xl lg:text-3xl text-ink font-semibold">
                  {specialist.name}
                </h1>
              </div>

              <div className="pt-6 border-t border-jade-deep/50 space-y-3 text-sm text-ink-soft">
                <p className="flex items-center justify-center md:justify-start space-x-2">
                  <span>📞 UK:</span>
                  <a href={`tel:${specialist.phone?.replace(/\s+/g, '')}`} className="font-semibold text-ink hover:underline">
                    {specialist.phone}
                  </a>
                </p>
                <p className="flex items-center justify-center md:justify-start space-x-2">
                  <span>✉ Email:</span>
                  <a href={`mailto:${specialist.email}`} className="font-semibold text-ink hover:underline break-all">
                    {specialist.email}
                  </a>
                </p>
              </div>

              <div className="pt-6">
                <Link
                  href="/enquire"
                  className="block w-full py-3 bg-gold hover:bg-gold/95 text-ink font-semibold text-xs tracking-widest uppercase transition-all duration-300 rounded-none text-center shadow-md"
                >
                  Plan A Trip With {specialist.name.split(' ')[0]}
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Expert Tips */}
          <div className="md:col-span-2 space-y-12">
            
            {/* Bio */}
            <div className="space-y-6">
              <h2 className="font-serif text-2xl sm:text-3xl text-ink font-medium border-b border-jade-deep/50 pb-4">
                My Travel Story
              </h2>
              <p className="text-base font-light text-ink-soft leading-relaxed">
                {specialist.bio[0]?.children[0]?.text}
              </p>
            </div>

            {/* Favorite Destinations */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg text-ink font-medium">
                My Favorite Places in Vietnam
              </h3>
              <div className="flex flex-wrap gap-3">
                {specialist.favoriteDestinations.map((dest, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-jade-deep text-white px-4 py-2 font-medium tracking-wide border border-line"
                  >
                    {dest}
                  </span>
                ))}
              </div>
            </div>

            {/* Expert Tips */}
            <div className="space-y-6">
              <h3 className="font-serif text-xl text-ink font-medium">
                My Insider Expert Tips
              </h3>
              <div className="space-y-6">
                {specialist.expertTips.map((tip, idx) => (
                  <div key={idx} className="relative bg-[#f4efe6] border border-line p-6 space-y-3">
                    <span className="absolute -top-3.5 left-4 text-4xl text-gold font-serif select-none">“</span>
                    <p className="text-sm sm:text-base font-light text-ink/75 italic leading-relaxed pt-2">
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
