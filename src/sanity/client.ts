import { publicSpecialist } from '@/lib/team';
import { planningGuides } from '@/lib/planningGuides';
import type { TripPageData } from '@/lib/tripIdeasData';
import type { ThingToDoData } from '@/lib/thingsToDoData';
import { curatedAccommodations, getCuratedAccommodationBySlug } from '@/lib/accommodationData';
import { thingsToDoData } from '@/lib/thingsToDoData';
import { createClient } from '@sanity/client';
import { defineLive } from 'next-sanity/live';
import { draftMode } from 'next/headers';
import { mergeItineraryCatalogue } from '@/lib/legacyItineraries';
import { applyEditorialCorrections } from '@/lib/editorialCorrections';
import { editorialImageFor, uniqueEditorialImages } from '@/lib/editorialPhotos';
import { mockItineraries, mockAccommodations, mockSpecialists, mockDestinations } from './mockData';
import { Itinerary, Accommodation, Specialist, Destination, TravelGuide, Cruise, Post, BlogPost } from './types';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'knxuvin4';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2026-06-17';

export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      stega: {
        enabled: true,
        studioUrl: '/studio',
      },
    })
  : null;

const useMock = !client;

const imageFields = new Set(['image', 'mainImage', 'heroImage', 'featuredImage', 'pressBackgroundImage', 'artOfTravelImage', 'ogImage', 'mapImage']);
const isSanityImage = (value: string): boolean => value.startsWith('https://cdn.sanity.io/images/');

function replaceCmsPhotos<T>(value: T, inheritedContext = ''): T {
  if (Array.isArray(value)) return value.map((item) => replaceCmsPhotos(item, inheritedContext)) as T;
  if (!value || typeof value !== 'object') return value;

  const record = value as Record<string, unknown>;
  const context = [record.title, record.name, record.location, record.category, record.heading,
    typeof record.slug === 'object' && record.slug ? (record.slug as { current?: unknown }).current : record.slug,
    inheritedContext].filter((part): part is string => typeof part === 'string').join(' ');

  const updated = Object.fromEntries(Object.entries(record).map(([key, item]) => {
    if (key === 'specialist') return [key, item];
    if (key === 'gallery' && Array.isArray(item)) {
      return [key, uniqueEditorialImages(item, (_, index) => `${context} gallery-${index}`)];
    }
    if ((imageFields.has(key) || key === 'url') && typeof item === 'string' && isSanityImage(item)) return [key, editorialImageFor(context)];
    return [key, replaceCmsPhotos(item, context)];
  }));
  return updated as T;
}

export const { sanityFetch, SanityLive } = client
  ? defineLive({
      client,
      serverToken: process.env.SANITY_WRITE_TOKEN,
    })
  : { sanityFetch: null, SanityLive: () => null };

async function fetchSanity<T>(query: string, params: Record<string, string> = {}): Promise<T> {
  let isPreview = false;
  try { isPreview = (await draftMode()).isEnabled; } catch { /* No request context during prerendering. */ }
  if (isPreview && sanityFetch) {
    try {
      const { data } = await sanityFetch({ query, params, perspective: 'drafts', stega: true });
      return replaceCmsPhotos(data as T);
    } catch (e) {
      console.warn('[sanityFetch draft error]:', e);
    }
  }
  if (client) {
    // Retry up to 3 times to prevent build worker timeouts on Vercel/CI
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const data = await client.fetch<T>(query, params, {
          perspective: 'published', stega: false, next: { revalidate: 60 },
        });
        return replaceCmsPhotos(data);
      } catch (err) {
        if (attempt === 3) {
          console.warn(`[fetchSanity] Network timeout/error after 3 attempts:`, (err as Error)?.message || err);
          if (query.trim().startsWith('*[_type ==') && query.includes('][0]')) {
            return null as unknown as T;
          }
          if (query.trim().startsWith('*[_type ==')) {
            return [] as unknown as T;
          }
          return null as unknown as T;
        }
        await new Promise((res) => setTimeout(res, 500 * attempt));
      }
    }
  }
  return (query.includes('][0]') ? null : []) as unknown as T;
}

// --- Itineraries ---

export async function getItineraries(): Promise<Itinerary[]> {
  if (useMock) {
    return mockItineraries;
  }
  const query = `*[_type == "itinerary"]{
    ...,
    "gallery": gallery[].asset->url,
    accommodations[]->{
      ...,
      "gallery": gallery[].asset->url
    },
    specialist->{
      ...,
      "image": image.asset->url
    },
    destination->{ _id, name, slug, "image": image.asset->url },
    "seo": seo{
      metaTitle, metaDescription, keywords, canonicalUrl, noIndex,
      "ogImage": ogImage.asset->url
    }
  }`;
  return mergeItineraryCatalogue(await fetchSanity<Itinerary[]>(query));
}

export async function getFeaturedItineraries(): Promise<Itinerary[]> {
  if (useMock) {
    return mockItineraries.filter(it => it.featured);
  }
  const query = `*[_type == "itinerary" && featured == true]{
    ...,
    "gallery": gallery[].asset->url,
    accommodations[]->{
      ...,
      "gallery": gallery[].asset->url
    },
    specialist->{
      ...,
      "image": image.asset->url
    },
    destination->{ _id, name, slug, "image": image.asset->url },
    "seo": seo{
      metaTitle, metaDescription, keywords, canonicalUrl, noIndex,
      "ogImage": ogImage.asset->url
    }
  }`;
  return (await fetchSanity<Itinerary[]>(query)).map((tour) => ({ ...tour, specialist: publicSpecialist(tour.specialist) }));
}

export async function getItineraryBySlug(slug: string): Promise<Itinerary | null> {
  if (useMock) {
    return mockItineraries.find(it => it.slug.current === slug) || null;
  }
  const query = `*[_type == "itinerary" && slug.current == $slug][0]{
    ...,
    "gallery": gallery[].asset->url,
    accommodations[]->{
      ...,
      "gallery": gallery[].asset->url
    },
    specialist->{
      ...,
      "image": image.asset->url
    },
    destination->{ _id, name, slug, "image": image.asset->url },
    "seo": seo{
      metaTitle, metaDescription, keywords, canonicalUrl, noIndex,
      "ogImage": ogImage.asset->url
    }
  }`;
  const itinerary = await fetchSanity<Itinerary | null>(query, { slug });
  return itinerary ? { ...itinerary, specialist: publicSpecialist(itinerary.specialist) } : mergeItineraryCatalogue([]).find((tour) => tour.slug.current === slug) || null;
}

// --- Accommodations ---

export async function getAccommodations(): Promise<Accommodation[]> {
  if (useMock) {
    return mergeAccommodationCatalogue(mockAccommodations);
  }
  const accommodations = await fetchSanity<Accommodation[]>(`*[_type == "accommodation"]{
    ...,
    "gallery": gallery[].asset->url
  }`);
  return mergeAccommodationCatalogue(accommodations);
}

function mergeAccommodationCatalogue(accommodations: Accommodation[]): Accommodation[] {
  const existingSlugs = new Set(accommodations.map((accommodation) => accommodation.slug?.current));
  return [...accommodations, ...curatedAccommodations.filter((accommodation) => !existingSlugs.has(accommodation.slug.current))];
}

export async function getAccommodationBySlug(slug: string): Promise<Accommodation | null> {
  if (useMock) {
    return mockAccommodations.find(acc => acc.slug.current === slug) || getCuratedAccommodationBySlug(slug) || null;
  }
  const accommodation = await fetchSanity<Accommodation | null>(`*[_type == "accommodation" && slug.current == $slug][0]{
    ...,
    "gallery": gallery[].asset->url
  }`, { slug });
  return accommodation || getCuratedAccommodationBySlug(slug) || null;
}

// --- Specialists ---

export async function getSpecialists(): Promise<Specialist[]> {
  if (useMock) {
    return [];
  }
  return await fetchSanity<Specialist[]>(`*[_type == "specialist" && profileVerified == true && defined(profileEvidenceUrl)]{
    ...,
    "image": image.asset->url
  }`);
}

export async function getSpecialistBySlug(slug: string): Promise<Specialist | null> {
  if (useMock) {
    return mockSpecialists.find(spec => spec.slug.current === slug) || null;
  }
  return await fetchSanity<Specialist | null>(`*[_type == "specialist" && slug.current == $slug][0]{
    ...,
    "image": image.asset->url
  }`, { slug });
}

// --- Destinations ---

export async function getDestinations(): Promise<Destination[]> {
  if (useMock) {
    return mockDestinations;
  }
  return await fetchSanity<Destination[]>(`*[_type == "destination"]{
    ...,
    "image": image.asset->url,
    "seo": seo{
      metaTitle, metaDescription, keywords, canonicalUrl, noIndex,
      "ogImage": ogImage.asset->url
    }
  }`);
}

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  if (useMock) {
    return mockDestinations.find(dest => dest.slug.current === slug) || null;
  }
  const query = `*[_type == "destination" && slug.current == $slug][0]{
    ...,
    "image": image.asset->url,
    featuredTours[]->{
      _id, title, slug, duration, priceFrom, intro, featured,
      "gallery": gallery[].asset->url
    },
    "seo": seo{
      metaTitle, metaDescription, keywords, canonicalUrl, noIndex,
      "ogImage": ogImage.asset->url
    }
  }`;
  return await fetchSanity<Destination | null>(query, { slug });
}


// --- Cruises ---

export async function getCruises(): Promise<Cruise[]> {
  if (useMock) return [];
  return await fetchSanity<Cruise[]>(`*[_type == "cruise"]{
    ...,
    destination->{ _id, name, slug },
    "mainImage": mainImage.asset->url,
    "seo": seo{
      metaTitle, metaDescription, keywords, canonicalUrl, noIndex,
      "ogImage": ogImage.asset->url
    }
  }`);
}

export async function getCruiseBySlug(slug: string): Promise<Cruise | null> {
  if (useMock) return null;
  const query = `*[_type == "cruise" && slug.current == $slug][0]{
    ...,
    destination->{ _id, name, slug },
    "mainImage": mainImage.asset->url,
    "seo": seo{
      metaTitle, metaDescription, keywords, canonicalUrl, noIndex,
      "ogImage": ogImage.asset->url
    }
  }`;
  return await fetchSanity<Cruise | null>(query, { slug });
}

export async function getCruisesByDestination(destinationSlug: string): Promise<Cruise[]> {
  if (useMock) return [];
  const query = `*[_type == "cruise" && destination->slug.current == $destinationSlug]{
    ...,
    destination->{ _id, name, slug },
    "mainImage": mainImage.asset->url
  }`;
  return await fetchSanity<Cruise[]>(query, { destinationSlug });
}

// --- Travel Guides ---

export async function getTravelGuides(): Promise<TravelGuide[]> {
  if (useMock) return [];
  return await fetchSanity<TravelGuide[]>(`*[_type == "travelGuide"]{
    ...,
    destination->{ _id, name, slug },
    "mainImage": mainImage.asset->url,
    "seo": seo{
      metaTitle, metaDescription, keywords, canonicalUrl, noIndex,
      "ogImage": ogImage.asset->url
    }
  }`);
}

export async function getTravelGuideBySlug(destinationSlug: string, guideSlug: string): Promise<TravelGuide | null> {
  if (useMock) return null;
  const query = `*[_type == "travelGuide" && slug.current == $guideSlug && destination->slug.current == $destinationSlug][0]{
    ...,
    destination->{ _id, name, slug },
    "mainImage": mainImage.asset->url,
    relatedTours[]->{
      _type,
      _id,
      title,
      slug,
      ... _type == "itinerary" => {
        duration, priceFrom, intro,
        "gallery": gallery[].asset->url
      },
      ... _type == "cruise" => {
        location, duration, price,
        "mainImage": mainImage.asset->url
      }
    },
    "seo": seo{
      metaTitle, metaDescription, keywords, canonicalUrl, noIndex,
      "ogImage": ogImage.asset->url
    }
  }`;
  return await fetchSanity<TravelGuide | null>(query, { destinationSlug, guideSlug });
}

export async function getTravelGuidesByDestination(destinationSlug: string): Promise<TravelGuide[]> {
  if (useMock) return [];
  const query = `*[_type == "travelGuide" && destination->slug.current == $destinationSlug]{
    _id, title, slug,
    "mainImage": mainImage.asset->url,
    destination->{ _id, name, slug }
  }`;
  return await fetchSanity<TravelGuide[]>(query, { destinationSlug });
}

// --- Homepage ---

export interface HomepageData {
  title?: string;
  heroHeading?: string;
  heroSubheading?: string;
  // Pillars
  valuePillars?: { title: string; desc: string }[];
  // Intro
  introHeading?: string;
  introParagraph1?: string;
  introParagraph2?: string;
  introButtonText?: string;
  introButtonLink?: string;
  gridCategories?: { title: string; image: string; link: string }[];
  // Art of Travel
  artOfTravelHeading?: string;
  artOfTravelText?: string;
  artOfTravelButtonText?: string;
  artOfTravelButtonLink?: string;
  artOfTravelImage?: string;
  artOfTravelImageLabel?: string;
  artOfTravelImageTitle?: string;
  // Experiences
  experiencesLabel?: string;
  experiencesHeading?: string;
  experiencesDescription?: string;
  experiences?: { title: string; desc: string; image: string; badge: string; link: string }[];
  // Steps
  stepsHeading?: string;
  steps?: { num: string; title: string; desc: string }[];
  stepsButtonText?: string;
  // Press
  pressLabel?: string;
  pressHeading?: string;
  pressBackgroundImage?: string;
  pressQuotes?: { quote: string; source: string }[];
  // Reviews
  reviewsHeading?: string;
  reviews?: { title: string; text: string; author: string; location: string; rating: number; date: string; highlights: string[] }[];
  // CTA
  finalCtaLabel?: string;
  finalCtaHeading?: string;
  finalCtaSubtext?: string;
  finalCtaButtonText?: string;
  finalCtaPhone?: string;
  // SEO
  seoTitle?: string;
  seoDescription?: string;
}

export async function getHomepage(): Promise<HomepageData | null> {
  if (useMock) return null;
  return await fetchSanity<HomepageData | null>(`*[_type == "homepage"][0]{
    title, heroHeading, heroSubheading,
    valuePillars[]{ title, desc },
    introHeading, introParagraph1, introParagraph2,
    introButtonText, introButtonLink,
    gridCategories[]{ title, "image": image.asset->url, link },
    artOfTravelHeading, artOfTravelText,
    artOfTravelButtonText, artOfTravelButtonLink,
    "artOfTravelImage": artOfTravelImage.asset->url,
    artOfTravelImageLabel, artOfTravelImageTitle,
    experiencesLabel, experiencesHeading, experiencesDescription,
    experiences[]{ title, desc, "image": image.asset->url, badge, link },
    stepsHeading,
    steps[]{ num, title, desc },
    stepsButtonText,
    pressLabel, pressHeading,
    "pressBackgroundImage": pressBackgroundImage.asset->url,
    pressQuotes[]{ quote, source },
    reviewsHeading,
    reviews[]{ title, text, author, location, rating, date, highlights },
    finalCtaLabel, finalCtaHeading, finalCtaSubtext,
    finalCtaButtonText, finalCtaPhone,
    seoTitle, seoDescription
  }`);
}

// --- Posts ---

export async function getPosts(): Promise<Post[]> {
  if (useMock) return [];
  // Refresh public article data on the same bounded interval as the detail route.
  if (!client) return [];
  const fetchedPosts: Post[] = await client.fetch(
    `*[_type == "post"] | order(publishedAt desc){
    _id, _updatedAt, title, slug, publishedAt, excerpt,
    editorial{lastReviewedAt, sources, fieldVisits, "author": select(author->profileVerified == true && defined(author->profileEvidenceUrl) => author->{name, slug}, null), "reviewer": select(reviewer->profileVerified == true && defined(reviewer->profileEvidenceUrl) => reviewer->{name, slug}, null)},
    "mainImage": mainImage.asset->url,
    heroAuthor{
      name, role,
      "avatar": avatar.asset->url
    },
    content[]{
      ...,
      _type == "image" => {
        ...,
        "url": asset->url
      },
      _type == "gallery" => {
        ...,
        images[]{
          caption,
          "url": image.asset->url
        }
      },
      _type == "specialistTip" => {
        ...,
        specialist->{
          name, role,
          "image": image.asset->url
        },
        customAvatar{
          "url": asset->url
        }
      }
    },
    ctaLabel, ctaHeading, ctaDescription,
    "seo": seo{
      metaTitle, metaDescription, keywords, canonicalUrl, noIndex,
      "ogImage": ogImage.asset->url
    }
  }`,
    {},
    { perspective: 'published', stega: false, next: { revalidate: 60 } }
  );
  const posts = replaceCmsPhotos(fetchedPosts);
  const publishedSlugs = new Set(posts.map((post) => post.slug.current));
  return [...posts, ...planningGuides.filter((guide) => !publishedSlugs.has(guide.slug.current))].map(applyEditorialCorrections);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (useMock) return null;
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id, _updatedAt, title, slug, publishedAt, excerpt,
    editorial{lastReviewedAt, sources, fieldVisits, "author": select(author->profileVerified == true && defined(author->profileEvidenceUrl) => author->{name, slug}, null), "reviewer": select(reviewer->profileVerified == true && defined(reviewer->profileEvidenceUrl) => reviewer->{name, slug}, null)},
    "mainImage": mainImage.asset->url,
    heroAuthor{
      name, role,
      "avatar": avatar.asset->url
    },
    content[]{
      ...,
      _type == "image" => {
        ...,
        "url": asset->url
      },
      _type == "gallery" => {
        ...,
        images[]{
          caption,
          "url": image.asset->url
        }
      },
      _type == "specialistTip" => {
        ...,
        specialist->{
          name, role,
          "image": image.asset->url
        },
        customAvatar{
          "url": asset->url
        }
      }
    },
    ctaLabel, ctaHeading, ctaDescription,
    "seo": seo{
      metaTitle, metaDescription, keywords, canonicalUrl, noIndex,
      "ogImage": ogImage.asset->url
    }
  }`;
  const post = await fetchSanity<Post | null>(query, { slug });
  const article = post || planningGuides.find((guide) => guide.slug.current === slug);
  return article ? applyEditorialCorrections(article) : null;
}

// --- Tours Landing Page ---

export interface ToursLandingData {
  title?: string;
  heroHeading?: string;
  heroSubheading?: string;
  heroImage?: string;
  recommendedToursLabel?: string;
  recommendedToursHeading?: string;
  recommendedTours?: Itinerary[];
  faqLabel?: string;
  faqHeading?: string;
  faqs?: { question: string; answer: string }[];
  inspirationLabel?: string;
  inspirationHeading?: string;
  inspirationPosts?: Post[];
  seo?: { metaTitle?: string; metaDescription?: string };
}

export async function getToursLanding(): Promise<ToursLandingData | null> {
  if (useMock) return null;
  const query = `*[_type == "toursLanding"][0]{
    title,
    heroHeading,
    heroSubheading,
    "heroImage": heroImage.asset->url,
    recommendedToursLabel,
    recommendedToursHeading,
    recommendedTours[]->{
      _id, title, slug, duration, priceFrom, intro,
      "gallery": gallery[].asset->url
    },
    faqLabel,
    faqHeading,
    faqs[]{ question, answer },
    inspirationLabel,
    inspirationHeading,
    inspirationPosts[]->{
      _id, _updatedAt, title, slug, publishedAt, excerpt,
    editorial{lastReviewedAt, sources, fieldVisits, "author": select(author->profileVerified == true && defined(author->profileEvidenceUrl) => author->{name, slug}, null), "reviewer": select(reviewer->profileVerified == true && defined(reviewer->profileEvidenceUrl) => reviewer->{name, slug}, null)}, content,
      "mainImage": mainImage.asset->url
    },
    "seo": seo{
      metaTitle, metaDescription, keywords, canonicalUrl, noIndex,
      "ogImage": ogImage.asset->url
    }
  }`;
  return await fetchSanity<ToursLandingData | null>(query);
}

// ─── Editorial dynamic pages (Sanity support) ─────────────────────────────────

export async function getTripIdeasFromSanity(): Promise<TripPageData[]> {
  if (useMock) return [];
  const query = `*[_type == "tripIdea"] | order(_createdAt desc){
    _updatedAt, seo{noIndex},
    title,
    "slug": slug.current,
    metaTitle,
    metaDescription,
    "heroImage": heroImage.asset->url,
    heroSubtitle,
    category,
    breadcrumb,
    intro
  }`;
  return await fetchSanity<TripPageData[]>(query);
}

export async function getInspirationsFromSanity(): Promise<TripPageData[]> {
  if (useMock) return [];
  const query = `*[_type == "inspiration"] | order(_createdAt desc){
    _updatedAt, seo{noIndex},
    title,
    "slug": slug.current,
    metaTitle,
    metaDescription,
    "heroImage": heroImage.asset->url,
    heroSubtitle,
    category,
    breadcrumb,
    intro
  }`;
  return await fetchSanity<TripPageData[]>(query);
}

export async function getMonthGuidesFromSanity(): Promise<TripPageData[]> {
  if (useMock) return [];
  const query = `*[_type == "monthGuide"] | order(_createdAt desc){
    _updatedAt, seo{noIndex},
    title,
    "slug": slug.current,
    metaTitle,
    metaDescription,
    "heroImage": heroImage.asset->url,
    heroSubtitle,
    category,
    breadcrumb,
    intro
  }`;
  return await fetchSanity<TripPageData[]>(query);
}


export async function getTripIdeaFromSanity(slug: string): Promise<TripPageData | null> {
  if (useMock) return null;
  const query = `*[_type == "tripIdea" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    metaTitle,
    metaDescription,
    "heroImage": heroImage.asset->url,
    heroSubtitle,
    category,
    breadcrumb,
    intro,
    editorial{lastReviewedAt, sources, fieldVisits, "author": select(author->profileVerified == true && defined(author->profileEvidenceUrl) => author->{name, slug}, null), "reviewer": select(reviewer->profileVerified == true && defined(reviewer->profileEvidenceUrl) => reviewer->{name, slug}, null)},
    sections[]{
      heading,
      body,
      "image": image.asset->url,
      "imageAlt": image.imageAlt,
      "imageCaption": image.imageCaption
    },
    highlights,
    faqs[]{ question, answer },
    relatedSlugs,
    ctaHeading,
    ctaBody,
    "seo": seo{
      metaTitle, metaDescription, keywords, canonicalUrl, noIndex,
      "ogImage": ogImage.asset->url
    }
  }`;
  return await fetchSanity<TripPageData>(query, { slug });
}

export async function getInspirationFromSanity(slug: string): Promise<TripPageData | null> {
  if (useMock) return null;
  const query = `*[_type == "inspiration" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    metaTitle,
    metaDescription,
    "heroImage": heroImage.asset->url,
    heroSubtitle,
    category,
    breadcrumb,
    intro,
    editorial{lastReviewedAt, sources, fieldVisits, "author": select(author->profileVerified == true && defined(author->profileEvidenceUrl) => author->{name, slug}, null), "reviewer": select(reviewer->profileVerified == true && defined(reviewer->profileEvidenceUrl) => reviewer->{name, slug}, null)},
    sections[]{
      heading,
      body,
      "image": image.asset->url,
      "imageAlt": image.imageAlt,
      "imageCaption": image.imageCaption
    },
    highlights,
    faqs[]{ question, answer },
    relatedSlugs,
    ctaHeading,
    ctaBody,
    "seo": seo{
      metaTitle, metaDescription, keywords, canonicalUrl, noIndex,
      "ogImage": ogImage.asset->url
    }
  }`;
  return await fetchSanity<TripPageData>(query, { slug });
}

export async function getMonthGuideFromSanity(slug: string): Promise<TripPageData | null> {
  if (useMock) return null;
  const query = `*[_type == "monthGuide" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    metaTitle,
    metaDescription,
    "heroImage": heroImage.asset->url,
    heroSubtitle,
    category,
    breadcrumb,
    intro,
    editorial{lastReviewedAt, sources, fieldVisits, "author": select(author->profileVerified == true && defined(author->profileEvidenceUrl) => author->{name, slug}, null), "reviewer": select(reviewer->profileVerified == true && defined(reviewer->profileEvidenceUrl) => reviewer->{name, slug}, null)},
    sections[]{
      heading,
      body,
      "image": image.asset->url,
      "imageAlt": image.imageAlt,
      "imageCaption": image.imageCaption
    },
    highlights,
    faqs[]{ question, answer },
    relatedSlugs,
    ctaHeading,
    ctaBody,
    "seo": seo{
      metaTitle, metaDescription, keywords, canonicalUrl, noIndex,
      "ogImage": ogImage.asset->url
    }
  }`;
  return await fetchSanity<TripPageData>(query, { slug });
}

// ─── New Redesigned Schemas ─────────────────────────────────────────────────

export async function getBlogPostsFromSanity(): Promise<BlogPost[]> {
  if (useMock) return [];
  const query = `*[_type == "blogPost"] | order(publishedAt desc){
    _updatedAt, seo{noIndex},
    "hasContent": count(content) > 0,
    _id, _updatedAt, title, slug, publishedAt, category, excerpt,
    editorial{lastReviewedAt, sources, fieldVisits, "author": select(author->profileVerified == true && defined(author->profileEvidenceUrl) => author->{name, slug}, null), "reviewer": select(reviewer->profileVerified == true && defined(reviewer->profileEvidenceUrl) => reviewer->{name, slug}, null)},
    "featuredImage": featuredImage.asset->url,
    "imageAlt": featuredImage.alt,
    author->{
      name, role, slug, bio,
      "avatar": image.asset->url
    },
    tags
  }`;
  return await fetchSanity<BlogPost[]>(query);
}

export async function getBlogPostBySlugFromSanity(slug: string): Promise<BlogPost | null> {
  if (useMock) return null;
  const query = `*[_type == "blogPost" && slug.current == $slug][0]{
    _id, _updatedAt, title, slug, publishedAt, category, excerpt,
    editorial{lastReviewedAt, sources, fieldVisits, "author": select(author->profileVerified == true && defined(author->profileEvidenceUrl) => author->{name, slug}, null), "reviewer": select(reviewer->profileVerified == true && defined(reviewer->profileEvidenceUrl) => reviewer->{name, slug}, null)},
    "featuredImage": featuredImage.asset->url,
    "imageAlt": featuredImage.alt,
    author->{
      name, role, slug, bio,
      "avatar": image.asset->url
    },
    tags,
    content[]{
      ...,
      _type == "image" => {
        ...,
        "url": asset->url
      },
      _type == "gallery" => {
        ...,
        images[]{
          caption,
          alt,
          "url": image.asset->url
        }
      },
      _type == "specialistTip" => {
        ...,
        specialist->{
          name, role,
          "image": image.asset->url
        }
      }
    },
    relatedPosts[]->{
      _id, _updatedAt, title, slug, publishedAt, category, excerpt,
    editorial{lastReviewedAt, sources, fieldVisits, "author": select(author->profileVerified == true && defined(author->profileEvidenceUrl) => author->{name, slug}, null), "reviewer": select(reviewer->profileVerified == true && defined(reviewer->profileEvidenceUrl) => reviewer->{name, slug}, null)},
      "featuredImage": featuredImage.asset->url,
      "imageAlt": featuredImage.alt
    },
    relatedTours[]->{
      _id, title, slug, duration, priceFrom, intro,
      "gallery": gallery[].asset->url
    },
    ctaHeading, ctaBody,
    "seo": seo{
      metaTitle, metaDescription, keywords, canonicalUrl, noIndex,
      "ogImage": ogImage.asset->url
    }
  }`;
  return await fetchSanity<BlogPost | null>(query, { slug });
}

export async function getThingsToDoFromSanity(): Promise<ThingToDoData[]> {
  if (useMock) return [];
  const query = `*[_type == "thingToDo"] | order(_createdAt desc){
    _updatedAt, seo{noIndex},
    _id, title, "slug": slug.current, category, breadcrumb, readingTime, heroSubtitle,
    "heroImage": heroImage.asset->url,
    "imageAlt": heroImage.alt,
    intro, highlights, practicalInfo
  }`;
  const sanityItems = await fetchSanity<ThingToDoData[]>(query);
  const sanitySlugs = new Set(sanityItems.map((item) => item.slug));
  return [...sanityItems, ...thingsToDoData.filter((item) => !sanitySlugs.has(item.slug))];
}

export async function getThingToDoBySlugFromSanity(slug: string): Promise<ThingToDoData | null> {
  if (useMock) return null;
  const query = `*[_type == "thingToDo" && slug.current == $slug][0]{
    _id, title, "slug": slug.current, category, breadcrumb, readingTime, heroSubtitle,
    "heroImage": heroImage.asset->url,
    "imageAlt": heroImage.alt,
    intro, highlights, practicalInfo,
    editorial{lastReviewedAt, sources, fieldVisits, "author": select(author->profileVerified == true && defined(author->profileEvidenceUrl) => author->{name, slug}, null), "reviewer": select(reviewer->profileVerified == true && defined(reviewer->profileEvidenceUrl) => reviewer->{name, slug}, null)},
    sections[]{
      heading,
      body,
      "image": image.asset->url,
      "imageAlt": image.alt,
      "imageCaption": image.caption
    },
    faqs[]{ question, answer },
    relatedThings[]->{
      _id, title, "slug": slug.current, category,
      "heroImage": heroImage.asset->url,
      "imageAlt": heroImage.alt
    },
    recommendedTours[]->{
      _id, title, "slug": slug.current, duration, priceFrom, intro,
      "gallery": gallery[].asset->url
    },
    ctaHeading, ctaBody,
    "seo": seo{
      metaTitle, metaDescription, keywords, canonicalUrl, noIndex,
      "ogImage": ogImage.asset->url
    }
  }`;
  return await fetchSanity<ThingToDoData | null>(query, { slug });
}

export async function getMediaAssetsFromSanity(category?: string): Promise<MediaAsset[]> {
  if (useMock) return [];
  const categoryFilter = category ? ' && category == $category' : '';
  const query = `*[_type == "mediaAsset"${categoryFilter}] | order(_createdAt desc){
    _id, title, alt, caption, category, tags, photographer, usedIn,
    "url": image.asset->url,
    "metadata": image.asset->metadata
  }`;
  return await fetchSanity<MediaAsset[]>(query, category ? { category } : {});
}

interface MediaAsset {
  _id: string;
  title?: string;
  alt?: string;
  caption?: string;
  category?: string;
  tags?: string[];
  photographer?: string;
  usedIn?: string[];
  url?: string;
  metadata?: unknown;
}
