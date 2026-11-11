import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { licenseUrl, photoCredits } from '@/lib/photoCredits';

export const metadata: Metadata = {
  title: 'Photo Credits & Image Sources | VietnamTours.co.uk',
  description: 'Photographer credits, image sources and licence details for editorial travel photography used on VietnamTours.co.uk.',
  alternates: { canonical: 'https://www.vietnamtours.co.uk/photo-credits' },
};

export default function PhotoCreditsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-paper px-6 py-24 text-ink sm:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold">Image sources</p>
          <h1 className="mb-5 font-serif text-4xl sm:text-5xl">Photo Credits</h1>
          <p className="mb-10 max-w-3xl text-sm leading-7 text-ink/70">
            Travel photographs on this site are editorial illustrations. This list records each image source, photographer and licence.
          </p>
          <ul className="divide-y divide-line border-y border-line">
            {photoCredits.map((credit) => (
              <li key={credit.file} className="grid gap-1 py-4 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6">
                <div>
                  <h2 className="font-medium">{credit.title || credit.file}</h2>
                  <p className="mt-1 text-sm text-ink/65">Photo by {credit.photographer || 'the credited source'}</p>
                </div>
                <div className="flex gap-4 text-sm">
                  <a className="text-blue underline underline-offset-2" href={credit.source} target="_blank" rel="noreferrer">Source</a>
                  <a className="text-blue underline underline-offset-2" href={licenseUrl(credit.license)} target="_blank" rel="noreferrer">{credit.license}</a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
