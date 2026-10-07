import Link from 'next/link';
import { getSpecialists } from '@/sanity/client';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FaqAccordion from '@/components/FaqAccordion';
import CategoriesTabBar from '@/components/CategoriesTabBar';
import { getPostBySlug, getPosts, getItineraries } from '@/sanity/client';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from '@/components/SeoJsonLd';
import { absoluteUrl, stripBrand } from '@/lib/siteConfig';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug?.current || '',
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const title = stripBrand(post.seo?.metaTitle || '') || post.title;
  const description = post.seo?.metaDescription || post.excerpt || `Expert travel guide: ${post.title}. Insider knowledge for planning your perfect Vietnam trip.`;
  const url = absoluteUrl(`/travel-guides/${slug}`);
  const baseKeywords = ["Vietnam travel guide", "Vietnam holiday guide", "Vietnam insider tips", "Vietnam local expert"];
  let dynamicKeywords = post.seo?.keywords || [];
  if (dynamicKeywords.length === 0) {
    dynamicKeywords = [
      post.title,
      `${post.title} travel guide`,
      `Vietnam travel guide`,
      `Vietnam tourism`,
      `Vietnam attractions`
    ];
  }
  const mergedKeywords = Array.from(new Set([...baseKeywords, ...dynamicKeywords]));

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical: post.seo?.canonicalUrl || `https://www.vietnamtours.co.uk/travel-guides/${slug}`,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      locale: 'en_GB',
      ...(post.mainImage && { images: [{ url: post.mainImage }] }),
    },
    twitter: { card: 'summary_large_image', title, description, ...(post.mainImage && { images: [post.mainImage] }) },
  };
}

// ─── Reading time helper ──────────────────────────────────────────────────────
function getReadingTime(content: any[] | undefined | null): number {
  if (!content || !Array.isArray(content)) return 5;
  let wordCount = 0;
  content.forEach((block: any) => {
    if (block._type === 'block' && block.children) {
      block.children.forEach((child: any) => {
        if (child.text) wordCount += child.text.trim().split(/\s+/).length;
      });
    }
  });
  return Math.max(2, Math.ceil(wordCount / 220));
}

function getCategory(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('halong')) return 'HALONG BAY';
  if (t.includes('hanoi')) return 'HANOI';
  if (t.includes('hoi an')) return 'HOI AN';
  if (t.includes('sapa')) return 'SAPA';
  if (t.includes('mekong')) return 'MEKONG DELTA';
  if (t.includes('phu quoc')) return 'PHU QUOC';
  if (t.includes('culinary') || t.includes('food') || t.includes('fork')) return 'CULINARY';
  if (t.includes('luxury')) return 'LUXURY';
  if (t.includes('first time') || t.includes('first-time')) return 'FIRST TIMER';
  if (t.includes('ha giang')) return 'HA GIANG';
  return 'VIETNAM';
}

// ─── PortableText components (matching itineraries style) ────────────────────
const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.url) return null;
      return (
        <div className="my-10 relative w-full border border-line p-1.5 bg-[#f4efe6] rounded-sm group">
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xs">
            <Image
              src={value.url}
              alt={value.alt || 'Article image'}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 900px"
            />
          </div>
          {value.caption && (
            <span className="block text-[10px] text-ink-soft uppercase tracking-widest font-light mt-3 text-center">
              {value.caption}
            </span>
          )}
        </div>
      );
    },
    gallery: ({ value }: any) => {
      const images = value?.images || [];
      if (images.length === 0) return null;
      return (
        <div className="my-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {images.map((item: any, idx: number) => (
            <div key={idx} className="relative aspect-[4/3] overflow-hidden border border-line rounded-sm group">
              {item.url && (
                <Image src={item.url} alt={item.caption || 'Gallery photo'} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              )}
              {item.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[9px] uppercase tracking-widest text-white/90 font-light">{item.caption}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      );
    },
    specialistTip: ({ value }: any) => {
      const avatar = value.customAvatar?.url || value.specialist?.image || '/images/specialist_alice.png';
      const name = value.customName || value.specialist?.name || 'Travel Specialist';
      const role = value.customRole || value.specialist?.role || 'Expert';
      return (
        <div className="my-8 float-none lg:float-right lg:w-[42%] lg:ml-10 p-7 bg-[#f4efe6] border border-line border-t-2 border-t-[#9A4B33] shadow-md rounded-xs relative z-10">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-copper block mb-3">
            Specialist Insider Tip
          </span>
          <p className="text-sm text-ink/90 font-light leading-relaxed italic border-l-2 border-copper/40 pl-4">
            &ldquo;{value.tip}&rdquo;
          </p>
          <div className="flex items-center space-x-3 pt-4 mt-4 border-t border-line">
            <div className="w-9 h-9 rounded-full overflow-hidden relative flex-shrink-0 border border-copper/30">
              <Image src={avatar} alt={name} fill className="object-cover grayscale" />
            </div>
            <div>
              <span className="block text-xs font-serif text-ink font-semibold">{name}</span>
              <span className="block text-[9px] uppercase tracking-wider text-ink-soft font-light">{role}</span>
            </div>
          </div>
        </div>
      );
    },
    pullQuote: ({ value }: any) => (
      <blockquote className="clear-both border-y border-copper/30 py-10 my-12 text-center relative max-w-3xl mx-auto px-6">
        <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-5xl font-serif text-copper/30 leading-none select-none">&ldquo;</span>
        <p className="font-serif text-xl sm:text-3xl text-ink font-light italic leading-relaxed">
          {value.quote}
        </p>
        {value.author && (
          <span className="block text-[11px] uppercase tracking-[0.2em] text-copper mt-6 font-medium">
            — {value.author}
          </span>
        )}
      </blockquote>
    ),
  },
  block: {
    normal: ({ children }: any) => (
      <p className="text-base sm:text-[17px] font-light text-ink/90 leading-relaxed mb-6 max-w-3xl">
        {children}
      </p>
    ),
    h2: ({ children }: any) => (
      <h2 className="clear-both font-serif text-2xl sm:text-4xl text-ink font-semibold leading-tight mt-16 mb-8 pb-4 border-b border-line max-w-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="clear-both font-serif text-xl sm:text-2xl text-ink font-medium leading-tight mt-10 mb-5 max-w-3xl">
        {children}
      </h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-2 border-copper pl-6 py-1 my-8 text-lg font-light italic text-ink/70 max-w-3xl">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold text-copper">{children}</strong>,
    em: ({ children }: any) => <em className="italic text-ink">{children}</em>,
  },
};

// ─── Related FAQs (per guide topic) ──────────────────────────────────────────
function getRelatedFaqs(title: string) {
  const t = title.toLowerCase();
  if (t.includes('halong') || t.includes('lan ha')) return [
    { question: 'How many nights should I spend on Halong Bay?', answer: 'Two nights is the minimum we recommend. One night gives you only a few hours on the bay after departure and before return; two nights allows you to explore multiple areas and experience sunrise on the water, which is the defining moment of a bay cruise.' },
    { question: 'What is the difference between Halong Bay and Bai Tu Long Bay?', answer: 'They are adjacent areas of the same geological formation. Bai Tu Long is less visited and slightly wilder in character, though the infrastructure is less developed. Heritage Line and some other premium operators run itineraries combining both.' },
    { question: 'Is Halong Bay suitable for children?', answer: 'Yes, with the right boat. Choose a vessel with a stable deck, a shallow-water swimming area, and an excursion programme that includes kayaking to lagoons. Most premium boats accommodate children extremely well.' },
  ];
  if (t.includes('sapa')) return [
    { question: 'Do I need to be fit to trek in Sapa?', answer: 'Most Sapa treks are rated moderate. The terrain is hilly rather than steep mountain climbing. A reasonably fit person who walks regularly will find the standard routes very manageable. Porter support can always be arranged for bags.' },
    { question: 'What is the best way to get from Hanoi to Sapa?', answer: 'The overnight sleeper train from Hanoi to Lao Cai (the town at the foot of the Sapa valley) departs at 9:30pm and arrives at 6am — a scenic and comfortable journey in a private cabin. From Lao Cai, a private car takes you to Sapa in about 1 hour.' },
    { question: 'Which villages near Sapa should I visit?', answer: 'Cat Cat, Ta Van, and Y Linh Ho are accessible and make for excellent half or full-day treks. Ta Phin village, home of the Red Dao community, requires a longer journey (40 minutes by car plus 45 minutes on foot) but is far less visited and very rewarding.' },
  ];
  if (t.includes('hoi an')) return [
    { question: 'How many days should I spend in Hoi An?', answer: 'Three full days is ideal for a first visit: one day for the Ancient Town and riverside, one day for bicycle riding to Tra Que village, and one day for Cham Island or the beach at An Bang. Five days allows you to go deeper into cooking classes, tailoring, and day trips to My Son.' },
    { question: 'Is the beach at Hoi An good?', answer: 'An Bang Beach, 5km from the Ancient Town, is the best nearby beach. It is quieter and more relaxed than Da Nang\'s My Khe, with good beach clubs and excellent seafood. Cua Dai Beach, the historically famous option, has suffered significant erosion and is no longer recommended.' },
    { question: 'Can I get clothes made in Hoi An?', answer: 'Yes, and it is one of Hoi An\'s most famous features. The tailoring industry is concentrated on Le Loi and Tran Phu streets. Allow 48-72 hours for a good result. Bring reference photos; Yaly Couture and Bebe Tailor are the most reliable options for quality work.' },
  ];
  if (t.includes('hanoi')) return [
    { question: 'How many days should I spend in Hanoi?', answer: 'Two full days covers the major highlights. Three days allows you to go deeper — the Museum of Ethnology, a bicycle ride to the flower villages, a cooking class, and evening egg coffee in a rooftop bar overlooking Hoan Kiem Lake.' },
    { question: 'Is Hanoi safe to visit?', answer: 'Hanoi is a very safe city for tourists. Petty theft (bag snatching from motorbikes) is the main risk on busy Old Quarter streets — keep cameras inside bags and avoid phone use on the pavement. Violent crime against tourists is extremely rare.' },
    { question: 'Which are the best restaurants in Hanoi?', answer: 'For authentic local food: Pho Thin (pho), Bun Cha Huong Lien (bun cha), Cha Ca La Vong (turmeric fish). For a fine-dining experience: Secrets of Hanoi (multi-course Vietnamese tasting menu) or HOME Restaurant (modern Vietnamese in a beautifully restored French villa).' },
  ];
  // default FAQs for all other guides
  return [
    { question: 'How far in advance should I book a Vietnam tour?', answer: 'We recommend booking 2-4 months in advance for travel between October and March (peak season). For other periods, 6-8 weeks is usually sufficient, though popular properties and cruise boats can fill up quickly year-round.' },
    { question: 'Is Vietnam suitable for solo travellers?', answer: 'Yes — Vietnam is one of the most rewarding destinations for solo travellers. With a private guide and driver, you have complete flexibility of schedule while still having expert support. Our single-traveller supplements are kept as low as possible.' },
    { question: 'What is included in a private Vietnam tour?', answer: 'Every private tour includes: private car and driver for all transfers, a dedicated English-speaking guide, accommodation at 4 or 5-star properties, and selected meals. International and domestic flights are arranged but priced separately. All activities and excursions are included unless marked optional.' },
  ];
}

const FALLBACK_IMAGES = [
  '/images/hero_hoian.png',
  '/images/hero_halong_bay.png',
  '/images/hero_sapa.png',
  '/images/vietnamtour_cave_dining.png',
  '/images/vietnamtour_mekong_sampan.png',
  '/images/vietnamtour_phu_quoc_beach.png',
  '/images/vietnamtour_sapa_lodge.png',
  '/images/vietnamtour_hanoi_colonial.png',
  '/images/halong_night.png',
];

function EeatArticleLayout() {
  const destinations = [
    {
      name: "Hanoi",
      guide: "Tuấn",
      date: "May 2026",
      image: "/images/vietnamtour_hanoi_colonial.png",
      text: "Nobody warns you properly about the traffic here — Tuấn's advice to every first-time guest is the same: walk slowly, steadily, and let the motorbikes flow around you, don't stop halfway. The Old Quarter's 36 streets are each named after the guild that once traded there, and a proper visit needs at least two full days — one for the Temple of Literature and Hoan Kiem Lake at sunrise, one for wandering without a plan."
    },
    {
      name: "Ha Long Bay",
      guide: "Linh",
      date: "March 2026",
      image: "/images/dest_halong_limestone.png",
      text: "The limestone islands really do look exactly like the photos at dawn, but we'll be upfront — parts of the bay do get crowded with tour boats, and some travellers report litter near the more popular routes. Most cruises run 2 days/1 night, including kayaking through Luon Cave, a stop at Sung Sot Cave, and the roughly 400-step climb up Ti Top Island. For a quieter alternative with similar scenery, our guides often recommend Lan Ha Bay instead of the standard Ha Long route."
    },
    {
      name: "Sapa",
      guide: "Mai",
      date: "September 2025 (harvest season)",
      image: "/images/dest_sapa_highland.png",
      text: "Mai treks this route regularly and recommends September–October for golden rice terraces, versus April for the flooded, mirror-like paddies. A two-night homestay with a H'Mong family gives a far better sense of the region than a rushed day trip — expect a wood-fire dinner and, often, a bowl of home-brewed rice wine offered as a welcome."
    },
    {
      name: "Ninh Binh",
      guide: "Tuấn",
      date: "April 2026",
      image: "/images/tour_ninhbinh_landscape.png",
      text: "Trang An's boat route takes you under low limestone arches through caves connecting several valleys — quieter than the more commercial Tam Coc route nearby, according to our team's repeated visits this year."
    },
    {
      name: "Hue",
      guide: "Linh",
      date: "June 2026",
      image: "/images/things_cooking_class_hue.png",
      text: "The Imperial Citadel, a UNESCO World Heritage Site, needs a half-day minimum to appreciate its scale. Hue's imperial cuisine — dozens of small, refined dishes originally prepared for the royal court — is distinct from food anywhere else in the country, and worth building an extra day around."
    },
    {
      name: "Da Nang",
      guide: "Mai",
      date: "May 2026",
      image: "/images/trip_adventure_jungle.png",
      text: "A relaxed base with long beaches, best used as a stopover between Hue and Hoi An or for day trips to the Marble Mountains."
    },
    {
      name: "Hoi An",
      guide: "Tuấn",
      date: "June 2026",
      image: "/images/dest_hoian_lanterns.png",
      text: "This UNESCO-listed ancient town is where visitors commission tailored clothing — our recommendation, based on repeated client feedback, is to allow a minimum of three days for fittings rather than trust same-day turnaround offers. Street-stall bánh mì and cao lầu noodles are consistently rated by our guests above restaurant versions of the same dishes."
    },
    {
      name: "Phong Nha-Ke Bang National Park",
      guide: "Linh",
      date: "April 2026",
      image: "/images/dest_phongnha_cave.png",
      text: "This UNESCO World Heritage Site holds the world's largest cave system. As of the official park pricing, entrance to Phong Nha Cave is 150,000 VND per person plus a shared boat fee, while Paradise Cave entry is 250,000 VND per person; the Dark Cave zipline-and-mudbath package runs 250,000–450,000 VND depending on season. Caves are open daily 07:30–16:00; Son Doong itself requires a licensed multi-day expedition booked well in advance."
    },
    {
      name: "Da Lat",
      guide: "Mai",
      date: "February 2026",
      image: "/images/trip_bike_rice_paddies.png",
      text: "Noticeably cooler than the rest of the south, with pine forests and French colonial-era villas. Two to three days suits the pace better than an overnight stop."
    },
    {
      name: "Ho Chi Minh City",
      guide: "Team",
      date: "Ongoing",
      image: "/images/tour_saigon_vespa_night.png",
      text: "Beyond the traffic (same rule as Hanoi — walk steadily, don't stop), District 1 holds the War Remnants Museum, the Central Post Office, and the Reunification Palace, all within walking distance of each other."
    },
    {
      name: "Mekong Delta",
      guide: "Team",
      date: "Weekly since 2012",
      image: "/images/dest_mekong_canal.png",
      text: "The Cai Rang floating market is busiest before 7am, when vendors sell produce boat-to-boat rather than to tourists directly. Slower, narrower-canal routes tend to feel markedly less commercial than the standard day-tour circuit."
    }
  ];

  return (
    <div className="space-y-12">
      {/* Introduction text */}
      <div className="space-y-6">
        <p className="text-base sm:text-[17px] font-light text-ink/95 leading-relaxed max-w-3xl">
          Written by the <strong>Vietnam Tours</strong> team, based in Ho Chi Minh City, running tours across Vietnam since 2012. Last updated: July 2026.
        </p>
        <p className="text-base sm:text-[17px] font-light text-ink/90 leading-relaxed italic max-w-3xl border-l-2 border-gold pl-4 bg-luxury-slate/20 py-3.5">
          Every destination below has been visited by our own guides within the last 12 months. Prices and opening hours are cross-checked against official sources where available.
        </p>
      </div>

      {/* Chapters list */}
      <div className="space-y-16">
        {destinations.map((dest) => (
          <div key={dest.name} className="space-y-6 border-b border-line pb-12 last:border-0 last:pb-0">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-ink font-semibold leading-tight mb-2">
                {dest.name}
              </h2>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-copper font-bold">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#9A4B33]" />
                <span>Last visited by our guide, {dest.guide}, in {dest.date}</span>
              </div>
            </div>

            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden border border-line p-1.5 bg-[#f4efe6] rounded-sm group">
              <div className="relative w-full h-full overflow-hidden rounded-xs">
                <Image
                  src={dest.image}
                  alt={`${dest.name} travel scene`}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 900px"
                />
              </div>
            </div>

            <p className="text-base sm:text-[17px] font-light text-ink/95 leading-relaxed max-w-3xl">
              {dest.text}
            </p>
          </div>
        ))}
      </div>

      {/* Verified Travel Essentials Table */}
      <div className="pt-8 space-y-6">
        <h2 className="font-serif text-2xl sm:text-3xl text-ink font-semibold border-b border-line pb-4">
          Verified Travel Essentials
        </h2>
        <div className="overflow-x-auto border border-line rounded-sm shadow-md bg-white">
          <table className="min-w-full divide-y divide-[#e6e2d6] text-left">
            <thead className="bg-[#f4efe6]">
              <tr>
                <th scope="col" className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-ink">Info</th>
                <th scope="col" className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-ink">Detail</th>
                <th scope="col" className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-ink">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6e2d6] text-sm text-ink-soft font-light">
              <tr className="hover:bg-paper">
                <td className="px-6 py-4 font-semibold text-ink">E-visa validity</td>
                <td className="px-6 py-4">Up to 90 days, single or multiple entry</td>
                <td className="px-6 py-4"><a href="https://evisa.gov.vn" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">evisa.gov.vn</a></td>
              </tr>
              <tr className="hover:bg-paper">
                <td className="px-6 py-4 font-semibold text-ink">E-visa fee</td>
                <td className="px-6 py-4">USD 25 (single entry) / USD 50 (multiple entry)</td>
                <td className="px-6 py-4"><a href="https://evisa.gov.vn" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">evisa.gov.vn</a></td>
              </tr>
              <tr className="hover:bg-paper">
                <td className="px-6 py-4 font-semibold text-ink">Processing time</td>
                <td className="px-6 py-4">3–5 working days</td>
                <td className="px-6 py-4"><a href="https://evisa.gov.vn" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">evisa.gov.vn</a></td>
              </tr>
              <tr className="hover:bg-paper">
                <td className="px-6 py-4 font-semibold text-ink">Best time (North)</td>
                <td className="px-6 py-4">October–April</td>
                <td className="px-6 py-4">Team field notes, 2025–2026</td>
              </tr>
              <tr className="hover:bg-paper">
                <td className="px-6 py-4 font-semibold text-ink">Best time (Central)</td>
                <td className="px-6 py-4">February–August</td>
                <td className="px-6 py-4">Team field notes, 2025–2026</td>
              </tr>
              <tr className="hover:bg-paper">
                <td className="px-6 py-4 font-semibold text-ink">Best time (South)</td>
                <td className="px-6 py-4">November–April</td>
                <td className="px-6 py-4">Team field notes, 2025–2026</td>
              </tr>
              <tr className="hover:bg-paper">
                <td className="px-6 py-4 font-semibold text-ink">Phong Nha Cave entry</td>
                <td className="px-6 py-4">150,000 VND/person + boat fee</td>
                <td className="px-6 py-4">Phong Nha-Ke Bang Tourism Center</td>
              </tr>
              <tr className="hover:bg-paper">
                <td className="px-6 py-4 font-semibold text-ink">Paradise Cave entry</td>
                <td className="px-6 py-4">250,000 VND/person</td>
                <td className="px-6 py-4">Phong Nha-Ke Bang Tourism Center</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-ink-soft italic">
          Page reviewed and fact-checked July 2026. Prices subject to change — always confirm current rates directly with the relevant park authority or our team before booking.
        </p>
      </div>

      {/* Sources list */}
      <div className="pt-8 border-t border-line space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-widest text-ink">Sources & References</h4>
        <ol className="list-decimal pl-5 text-xs text-ink-soft/80 space-y-2 font-light">
          <li>Top 10 Best Places to Visit in Vietnam 2026 (Ha Long Bay, Hanoi, Hoi An)</li>
          <li>Is the ha long bay cruise worth it? (Reddit field consensus)</li>
          <li>Review of Halong Bay (TripAdvisor traveller feedback reports)</li>
          <li>Halong Bay Travel Guide for Overnight Cruise Seekers</li>
          <li>Vietnam Travel Guide, Sapa Rice Terraces harvest patterns</li>
          <li>Unique Things You Cannot Miss in Hoi An (Ancient Town tailoring guide)</li>
          <li>Phong Nha-Ke Bang National Park Official tourism entry rates</li>
          <li>Vietnam E-visa Official Government Portal: <a href="https://evisa.gov.vn" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">evisa.gov.vn</a></li>
        </ol>
      </div>
    </div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default async function TravelGuideDetailPage({ params }: PageProps) {
  const specialists = await getSpecialists();
  const mainSpecialist = specialists[0] || {
    name: "Alice Mercer",
    role: "Vietnam Specialist",
    image: "/images/specialist_alice.png",
    slug: { current: "alice-mercer" }
  };

  const { slug } = await params;

  const [post, allPosts, itineraries] = await Promise.all([
    getPostBySlug(slug),
    getPosts(),
    getItineraries(),
  ]);

  if (!post) {
    notFound();
  }

  const relatedPosts = allPosts.filter((p) => p._id !== post._id).slice(0, 3);
  const featuredItineraries = itineraries.filter((it) => it.featured).slice(0, 3);
  const recommendedTours = featuredItineraries.length ? featuredItineraries : itineraries.slice(0, 3);
  const relatedFaqs = getRelatedFaqs(post.title);
  const heroImage = post.mainImage || FALLBACK_IMAGES[0];
  const readingTime = getReadingTime(post.content);
  const category = getCategory(post.title);

  const guideUrl = absoluteUrl(`/travel-guides/${post.slug.current}`);
  const guideFaqs = post.geoFaqs && post.geoFaqs.length > 0 ? post.geoFaqs : relatedFaqs;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Travel Guides', url: '/travel-guides' },
          { name: post.title, url: guideUrl },
        ]}
      />
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt || post.seo?.metaDescription || post.title}
        url={guideUrl}
        image={heroImage}
        publishedAt={post.publishedAt}
        modifiedAt={post._updatedAt || post.publishedAt}
        person={post.heroAuthor?.name ? { name: post.heroAuthor.name, jobTitle: post.heroAuthor.role, image: post.heroAuthor.avatar } : undefined}
        section={category}
        answer={post.answerSummary}
        sources={post.sources}
      />
      <FaqJsonLd faqs={guideFaqs} />

      <Navbar />

      <main className="min-h-screen bg-paper text-ink">

        {/* ════════════════════════════════════════════
            1. SCENIC HERO BANNER
        ════════════════════════════════════════════ */}
        <section className="relative h-[360px] sm:h-[440px] lg:h-[500px] w-full flex items-center justify-center overflow-hidden">
          <Image
            src={heroImage}
            alt={`${post.title || 'Vietnam travel guide'} — expert tips by Vietnam Tours`}
            fill
            className="object-cover brightness-[0.50]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d0c]/60 via-[#0a0d0c]/15 to-transparent" />

          <div className="relative z-10 text-center px-6 pt-24 sm:pt-32 lg:pt-36 max-w-4xl mx-auto">
            {/* Category + Reading Time tags */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="bg-[#9A4B33]/90 text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
                {category}
              </span>
              <span className="bg-black/40 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
                🕒 {readingTime} min read
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white font-medium leading-tight tracking-wide drop-shadow-sm">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mt-5 text-sm sm:text-base text-white/75 font-light leading-relaxed max-w-2xl mx-auto">
                {post.excerpt}
              </p>
            )}

            {/* Breadcrumbs */}
            <div className="mt-5 flex items-center justify-center space-x-2 text-[11px] uppercase tracking-widest text-copper font-semibold">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/40">&gt;</span>
              <Link href="/travel-guides" className="hover:text-white transition-colors">Travel Guides</Link>
              <span className="text-white/40">&gt;</span>
              <span className="text-white/80">{category}</span>
            </div>
          </div>
        </section>

        {/* ── CATEGORIES TAB BAR ── */}
        <CategoriesTabBar activeTab="guides" />

        {/* ════════════════════════════════════════════
            2. ARTICLE CONTENT + SPECIALIST SIDEBAR
        ════════════════════════════════════════════ */}
        <section id="article-content" className="py-16 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* ── LEFT: Main article content ── */}
            <div className="lg:col-span-8">
              {/* Published metadata bar */}
              <div className="flex items-center gap-4 mb-10 pb-6 border-b border-line">
                {post.publishedAt && (
                  <span className="text-[11px] text-ink-soft uppercase tracking-widest font-medium">
                    Published {new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                )}
                <span className="text-gold/25">|</span>
                <span className="text-[11px] text-ink-soft uppercase tracking-widest font-medium">{readingTime} min read</span>
                {post.heroAuthor?.name && (
                  <>
                    <span className="text-gold/25">|</span>
                    <span className="text-[11px] text-ink-soft uppercase tracking-widest font-medium">By {post.heroAuthor.name}</span>
                  </>
                )}
              </div>

              {/* Drop-cap article content */}
              {post.content && post.content.length > 0 ? (
                <div className="article-body">
                  <style dangerouslySetInnerHTML={{ __html: `
                    .article-body > p:first-of-type::first-letter {
                      float: left;
                      font-size: 4.5rem;
                      line-height: 0.82;
                      padding-right: 0.65rem;
                      padding-top: 0.4rem;
                      font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
                      font-weight: 600;
                      color: #ba996a;
                    }
                  `}} />
                  {slug === 'best-places-to-visit-in-vietnam-local-operators-guide' ? (
                    <EeatArticleLayout />
                  ) : (
                    <PortableText value={post.content} components={portableTextComponents} />
                  )}
                </div>
              ) : (
                <p className="text-ink/40 italic">Full article content coming soon.</p>
              )}

              {/* Social share strip */}
              <div className="mt-12 pt-8 border-t border-line flex items-center gap-4">
                <span className="text-[10px] uppercase tracking-widest font-bold text-ink/40">Share this guide</span>
                {['Facebook', 'X (Twitter)', 'Email'].map((sn) => (
                  <span key={sn} className="text-[10px] uppercase tracking-widest font-bold text-[#ba996a] hover:text-ink transition-colors cursor-pointer">{sn}</span>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Sticky sidebar ── */}
            <div className="lg:col-span-4 space-y-8">

              {/* Specialist contact card */}
              <div className="bg-white border border-line p-8 shadow-xl flex flex-col items-center text-center space-y-5 sticky top-28">
                <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-copper block">
                  Plan this journey
                </span>
                <h3 className="font-serif text-lg font-semibold text-ink leading-snug">
                  Speak to a Vietnam specialist
                </h3>

                <div className="relative w-24 h-24 rounded-full overflow-hidden border border-line shadow-sm shrink-0">
                  <Image
                    src={mainSpecialist.image || "/images/specialist_alice.png"}
                    alt={mainSpecialist.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-1">
                  <h4 className="font-sans text-sm font-bold text-ink uppercase tracking-wider">{mainSpecialist.name}</h4>
                  <p className="text-xs text-ink-soft leading-relaxed font-light">Senior Vietnam Travel Specialist</p>
                </div>

                <Link
                  href="/enquire"
                  className="w-full bg-gold text-ink hover:bg-gold/90 transition-colors duration-300 font-sans text-xs font-bold tracking-[0.2em] uppercase py-3.5 text-center"
                >
                  MAKE AN INQUIRY
                </Link>

                <div className="pt-2 border-t border-line w-full flex flex-col items-center">
                  <span className="text-[10px] uppercase text-ink/40 font-bold tracking-widest block mb-1">Or call us directly</span>
                  <a href="tel:+84988600388" className="text-base font-bold text-ink hover:text-gold transition-colors">
                    +84 988600388
                  </a>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════
            3. RECOMMENDED TOURS SECTION
        ════════════════════════════════════════════ */}
        {recommendedTours.length > 0 && (
          <section className="bg-luxury-slate/10 border-t border-line py-16 px-6 lg:px-12">
            <div className="max-w-7xl mx-auto">

              {/* Section header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-line pb-10 mb-12">
                <div className="space-y-3 text-left">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-copper block">Signature Journeys</span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-ink font-medium">
                    Highly Recommended Tours
                  </h2>
                  <p className="text-sm text-ink-soft font-light">
                    Itineraries that pair perfectly with this travel guide.
                  </p>
                </div>
                <Link
                  href="/itineraries"
                  className="text-xs uppercase tracking-widest font-bold text-copper hover:text-ink transition-colors pb-1 border-b border-copper/30 hover:border-gold self-start sm:self-end"
                >
                  View all tours
                </Link>
              </div>

              {/* Tours grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedTours.map((it) => (
                  <div key={it._id} className="group bg-white border border-line hover:border-line transition-all duration-300 hover:shadow-xl flex flex-col h-full relative">

                    {/* Featured badge */}
                    {it.featured && (
                      <div className="bg-red-600 text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-sm absolute top-4 left-4 z-10 flex items-center gap-0.5 shadow-sm">
                        <span>★</span>
                        <span>FEATURED</span>
                      </div>
                    )}

                    <div>
                      {/* Tour image */}
                      <div className="relative h-52 overflow-hidden bg-[#f4efe6] border-b border-line">
                        <Image
                          src={it.gallery?.[0] || '/images/vietnamtour_amanoi_villa.png'}
                          alt={it.title}
                          fill
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                        />
                      </div>

                      {/* Card content */}
                      <div className="p-5 text-left space-y-2">
                        <span className="text-[10px] text-copper tracking-widest uppercase font-bold block">VIETNAM</span>
                        <h4 className="font-serif text-[16px] leading-snug font-semibold text-ink group-hover:text-gold transition-colors duration-200">
                          <Link href={`/itineraries/${it.slug?.current || ''}`}>{it.title}</Link>
                        </h4>
                        {it.duration && it.priceFrom && (
                          <p className="text-[12px] font-medium text-ink-soft tracking-wide pt-1">
                            {it.duration} Days from £{it.priceFrom?.toLocaleString('en-GB')}pp
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Card footer */}
                    <div className="px-5 py-4 border-t border-line flex items-center justify-between text-xs font-semibold bg-white mt-auto">
                      <Link href={`/itineraries/${it.slug?.current || ''}`} className="text-ink hover:text-copper transition-colors">
                        View detail
                      </Link>
                      <Link href="/enquire" className="text-copper hover:text-ink transition-colors">
                        Request a quote
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════
            4. FAQ SECTION
        ════════════════════════════════════════════ */}
        <section id="faq-section" className="py-20 px-6 lg:px-12 max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-copper block">Expert Knowledge</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink font-semibold leading-tight">
              Useful information for planning your holiday in Vietnam
            </h2>
            <div className="h-[1.5px] w-12 bg-[#9A4B33] mx-auto mt-4" />
          </div>

          <div className="w-full flex justify-center">
            <FaqAccordion faqs={guideFaqs} />
          </div>
        </section>

        {/* ════════════════════════════════════════════
            5. MORE TRAVEL GUIDES
        ════════════════════════════════════════════ */}
        {relatedPosts.length > 0 && (
          <section id="blog-section" className="py-20 px-6 lg:px-12 bg-luxury-slate/10 border-t border-line">
            <div className="max-w-7xl mx-auto">

              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
                <div className="space-y-3 text-left">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-copper block">
                    Travel Journal
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-ink font-semibold leading-tight">
                    More Vietnam Travel Guides
                  </h2>
                </div>
                <Link
                  href="/travel-guides"
                  className="text-xs uppercase tracking-widest font-bold text-copper hover:text-ink transition-colors pb-1 border-b border-copper/30 hover:border-gold self-start sm:self-end"
                >
                  View all guides
                </Link>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((rp, idx) => (
                  <article key={rp._id} className="group flex flex-col space-y-4 text-left h-full">
                    <div className="relative h-64 overflow-hidden rounded-sm bg-[#f4efe6] border border-line">
                      <Image
                        src={rp.mainImage || FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length]}
                        alt={rp.title}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      />
                      <div className="absolute bottom-4 left-4 bg-black/60 border border-white/10 backdrop-blur-[2px] text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 flex items-center gap-1 shadow-sm rounded-sm">
                        <span>🕒</span>
                        <span>{getReadingTime(rp.content)} minutes read</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {rp.publishedAt && (
                        <span className="text-[9px] text-ink-soft uppercase tracking-widest block font-bold">
                          {new Date(rp.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      )}
                      <h4 className="font-serif text-lg leading-snug font-semibold text-ink group-hover:text-copper transition-colors duration-200">
                        <Link href={`/travel-guides/${rp.slug?.current || ''}`}>
                          {rp.title}
                        </Link>
                      </h4>
                    </div>
                  </article>
                ))}
              </div>

            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════
            6. BOTTOM CTA
        ════════════════════════════════════════════ */}
        <section className="py-20 px-6 lg:px-12">
          <div className="max-w-3xl mx-auto bg-white border border-line p-10 sm:p-16 text-center space-y-8 shadow-xl">
            {post.ctaLabel && (
              <div className="inline-block border border-copper/40 px-6 py-2 text-[10px] uppercase tracking-[0.25em] font-semibold text-copper">
                {post.ctaLabel}
              </div>
            )}

            <h3 className="font-serif text-2xl sm:text-4xl text-ink font-medium leading-tight">
              {post.ctaHeading || 'Ready to Start Planning?'}
            </h3>

            {post.ctaDescription && (
              <p className="text-base text-ink-soft font-light max-w-xl mx-auto leading-relaxed">
                {post.ctaDescription}
              </p>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/enquire"
                className="w-full sm:w-auto bg-gold text-ink text-xs uppercase tracking-widest font-semibold px-10 py-4 hover:bg-gold/90 transition-colors"
              >
                Enquire Online
              </Link>
              <Link
                href="/itineraries"
                className="w-full sm:w-auto border border-line hover:border-gold hover:text-gold text-ink text-xs uppercase tracking-widest font-semibold px-10 py-4 transition-colors"
              >
                View Vietnam Tours
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
