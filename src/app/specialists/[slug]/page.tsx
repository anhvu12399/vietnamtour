import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSpecialistBySlug, getSpecialists } from '@/sanity/client';

export const revalidate = 3600;

export async function generateStaticParams() {
  const specialists = await getSpecialists();
  return specialists.map((spec) => ({
    slug: spec.slug.current,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function SpecialistDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const specialist = await getSpecialistBySlug(slug);

  if (!specialist) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-32 sm:py-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
          
          {/* Left Column: Portrait & Details */}
          <div className="space-y-8 md:sticky md:top-32">
            <div className="relative aspect-square w-full max-w-sm mx-auto overflow-hidden border border-linen">
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
                <span className="text-xs uppercase tracking-widest text-burnt-sienna font-semibold block">
                  {specialist.role}
                </span>
                <h1 className="font-serif text-2xl lg:text-3xl text-deep-green font-semibold">
                  {specialist.name}
                </h1>
              </div>

              <div className="pt-6 border-t border-linen space-y-3 text-sm text-primary-dark/80">
                <p className="flex items-center justify-center md:justify-start space-x-2">
                  <span>📞 UK:</span>
                  <a href={`tel:${specialist.phone?.replace(/\s+/g, '')}`} className="font-semibold text-deep-green hover:underline">
                    {specialist.phone}
                  </a>
                </p>
                <p className="flex items-center justify-center md:justify-start space-x-2">
                  <span>✉ Email:</span>
                  <a href={`mailto:${specialist.email}`} className="font-semibold text-deep-green hover:underline break-all">
                    {specialist.email}
                  </a>
                </p>
              </div>

              <div className="pt-6">
                <Link
                  href="/enquire"
                  className="block w-full py-3 bg-burnt-sienna hover:bg-burnt-sienna/95 text-white font-semibold text-xs tracking-widest uppercase transition-all duration-300 rounded-none text-center shadow-md"
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
              <h2 className="font-serif text-2xl sm:text-3xl text-deep-green font-medium border-b border-linen pb-4">
                My Travel Story
              </h2>
              <p className="text-base font-light text-primary-dark/80 leading-relaxed">
                {specialist.bio[0]?.children[0]?.text}
              </p>
            </div>

            {/* Favorite Destinations */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg text-deep-green font-medium">
                My Favorite Places in Vietnam
              </h3>
              <div className="flex flex-wrap gap-3">
                {specialist.favoriteDestinations.map((dest, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-linen text-deep-green px-4 py-2 font-medium tracking-wide border border-border-gold/30"
                  >
                    {dest}
                  </span>
                ))}
              </div>
            </div>

            {/* Expert Tips */}
            <div className="space-y-6">
              <h3 className="font-serif text-xl text-deep-green font-medium">
                My Insider Expert Tips
              </h3>
              <div className="space-y-6">
                {specialist.expertTips.map((tip, idx) => (
                  <div key={idx} className="relative bg-linen/30 border border-linen p-6 space-y-3">
                    <span className="absolute -top-3.5 left-4 text-4xl text-burnt-sienna font-serif select-none">“</span>
                    <p className="text-sm sm:text-base font-light text-primary-dark/75 italic leading-relaxed pt-2">
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
