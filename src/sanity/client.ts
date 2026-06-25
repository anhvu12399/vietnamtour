import { createClient } from '@sanity/client';
import { defineLive } from 'next-sanity/live';
import { draftMode } from 'next/headers';
import { mockItineraries, mockAccommodations, mockSpecialists, mockDestinations } from './mockData';
import { Itinerary, Accommodation, Specialist, Destination, TravelGuide, Cruise, Post } from './types';

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

export const { sanityFetch, SanityLive } = client
  ? defineLive({
      client,
      serverToken: process.env.SANITY_WRITE_TOKEN,
      browserToken: process.env.SANITY_WRITE_TOKEN,
    })
  : { sanityFetch: null, SanityLive: () => null };

async function fetchSanity<T>(query: string, params: Record<string, any> = {}): Promise<T> {
  if (sanityFetch) {
    let previewOptions: {
      perspective: 'published' | 'previewDrafts';
      stega: boolean;
    } = {
      perspective: 'published',
      stega: false,
    };

    try {
      const draft = await draftMode();
      previewOptions = {
        perspective: draft.isEnabled ? 'previewDrafts' : 'published',
        stega: draft.isEnabled,
      };
    } catch (e) {
      // draftMode() throws during static generation / build time without HTTP request context
    }

    try {
      const { data } = await sanityFetch({
        query,
        params,
        ...previewOptions,
      });
      return data as T;
    } catch (error) {
      console.error('sanityFetch failed, falling back to client.fetch:', error);
      if (client) {
        return await client.fetch(query, params);
      }
      throw error;
    }
  }
  if (client) {
    return await client.fetch(query, params);
  }
  throw new Error('Sanity client not configured');
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
      metaTitle, metaDescription, keywords,
      "ogImage": ogImage.asset->url
    }
  }`;
  return await fetchSanity<Itinerary[]>(query);
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
      metaTitle, metaDescription, keywords,
      "ogImage": ogImage.asset->url
    }
  }`;
  return await fetchSanity<Itinerary[]>(query);
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
      metaTitle, metaDescription, keywords,
      "ogImage": ogImage.asset->url
    }
  }`;
  return await fetchSanity<Itinerary | null>(query, { slug });
}

// --- Accommodations ---

export async function getAccommodations(): Promise<Accommodation[]> {
  if (useMock) {
    return mockAccommodations;
  }
  return await fetchSanity<Accommodation[]>(`*[_type == "accommodation"]{
    ...,
    "gallery": gallery[].asset->url
  }`);
}

export async function getAccommodationBySlug(slug: string): Promise<Accommodation | null> {
  if (useMock) {
    return mockAccommodations.find(acc => acc.slug.current === slug) || null;
  }
  return await fetchSanity<Accommodation | null>(`*[_type == "accommodation" && slug.current == $slug][0]{
    ...,
    "gallery": gallery[].asset->url
  }`, { slug });
}

// --- Specialists ---

export async function getSpecialists(): Promise<Specialist[]> {
  if (useMock) {
    return mockSpecialists;
  }
  return await fetchSanity<Specialist[]>(`*[_type == "specialist"]{
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
      metaTitle, metaDescription, keywords,
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
      metaTitle, metaDescription, keywords,
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
      metaTitle, metaDescription, keywords,
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
      metaTitle, metaDescription, keywords,
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
      metaTitle, metaDescription, keywords,
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
      metaTitle, metaDescription, keywords,
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
  return await fetchSanity<Post[]>(`*[_type == "post"] | order(publishedAt desc){
    _id, title, slug, publishedAt, excerpt,
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
      metaTitle, metaDescription, keywords,
      "ogImage": ogImage.asset->url
    }
  }`);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (useMock) return null;
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id, title, slug, publishedAt, excerpt,
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
      metaTitle, metaDescription, keywords,
      "ogImage": ogImage.asset->url
    }
  }`;
  return await fetchSanity<Post | null>(query, { slug });
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
      _id, title, slug, publishedAt, excerpt, content,
      "mainImage": mainImage.asset->url
    },
    "seo": seo{
      metaTitle, metaDescription, keywords,
      "ogImage": ogImage.asset->url
    }
  }`;
  return await fetchSanity<ToursLandingData | null>(query);
}

// ─── Editorial dynamic pages (Sanity support) ─────────────────────────────────

export async function getTripIdeaFromSanity(slug: string): Promise<any | null> {
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
      metaTitle, metaDescription, keywords,
      "ogImage": ogImage.asset->url
    }
  }`;
  return await fetchSanity<any>(query, { slug });
}

export async function getInspirationFromSanity(slug: string): Promise<any | null> {
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
      metaTitle, metaDescription, keywords,
      "ogImage": ogImage.asset->url
    }
  }`;
  return await fetchSanity<any>(query, { slug });
}

export async function getMonthGuideFromSanity(slug: string): Promise<any | null> {
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
      metaTitle, metaDescription, keywords,
      "ogImage": ogImage.asset->url
    }
  }`;
  return await fetchSanity<any>(query, { slug });
}

// ─── New Redesigned Schemas ─────────────────────────────────────────────────

export async function getBlogPostsFromSanity(): Promise<any[]> {
  if (useMock) return [];
  const query = `*[_type == "blogPost"] | order(publishedAt desc){
    _id, title, slug, publishedAt, category, excerpt,
    "featuredImage": featuredImage.asset->url,
    "imageAlt": featuredImage.alt,
    author->{
      name, role,
      "avatar": image.asset->url
    },
    tags
  }`;
  return await fetchSanity<any[]>(query);
}

export async function getBlogPostBySlugFromSanity(slug: string): Promise<any | null> {
  if (useMock) return null;
  const query = `*[_type == "blogPost" && slug.current == $slug][0]{
    _id, title, slug, publishedAt, category, excerpt,
    "featuredImage": featuredImage.asset->url,
    "imageAlt": featuredImage.alt,
    author->{
      name, role,
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
      _id, title, slug, publishedAt, category, excerpt,
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
  return await fetchSanity<any | null>(query, { slug });
}

export async function getThingsToDoFromSanity(): Promise<any[]> {
  if (useMock) return [];
  const query = `*[_type == "thingToDo"] | order(_createdAt desc){
    _id, title, slug, category, breadcrumb, readingTime, heroSubtitle,
    "heroImage": heroImage.asset->url,
    "imageAlt": heroImage.alt,
    intro, highlights
  }`;
  return await fetchSanity<any[]>(query);
}

export async function getThingToDoBySlugFromSanity(slug: string): Promise<any | null> {
  if (useMock) return null;
  const query = `*[_type == "thingToDo" && slug.current == $slug][0]{
    _id, title, slug, category, breadcrumb, readingTime, heroSubtitle,
    "heroImage": heroImage.asset->url,
    "imageAlt": heroImage.alt,
    intro, highlights, practicalInfo,
    sections[]{
      heading,
      body,
      "image": image.asset->url,
      "imageAlt": image.alt,
      "imageCaption": image.caption
    },
    faqs[]{ question, answer },
    relatedThings[]->{
      _id, title, slug, category,
      "heroImage": heroImage.asset->url,
      "imageAlt": heroImage.alt
    },
    recommendedTours[]->{
      _id, title, slug, duration, priceFrom, intro,
      "gallery": gallery[].asset->url
    },
    ctaHeading, ctaBody,
    "seo": seo{
      metaTitle, metaDescription, keywords, canonicalUrl, noIndex,
      "ogImage": ogImage.asset->url
    }
  }`;
  return await fetchSanity<any | null>(query, { slug });
}

export async function getMediaAssetsFromSanity(category?: string): Promise<any[]> {
  if (useMock) return [];
  const categoryFilter = category ? ' && category == $category' : '';
  const query = `*[_type == "mediaAsset"${categoryFilter}] | order(_createdAt desc){
    _id, title, alt, caption, category, tags, photographer, usedIn,
    "url": image.asset->url,
    "metadata": image.asset->metadata
  }`;
  return await fetchSanity<any[]>(query, category ? { category } : {});
}
