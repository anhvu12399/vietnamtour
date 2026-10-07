// Single source of truth for brand / entity data used by metadata, JSON-LD,
// robots, sitemap, llms.txt and feeds.
//
// Anything that must be verifiable (credentials, ratings, registered address)
// is OPTIONAL and read from env, so it is only published when it is real.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vietnamtours.co.uk').replace(/\/$/, '');

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const siteConfig = {
  name: 'VietnamTours.co.uk',
  legalName: 'VietnamTours.co.uk',
  url: SITE_URL,
  logo: `${SITE_URL}/images/adventuretravel-26.svg`,
  email: 'info@vietnamtours.co.uk',
  telephone: '+84-98-8600-388',
  locale: 'en-GB',
  tagline: 'Bespoke private Vietnam tours for UK travellers',
  description:
    'Bespoke private Vietnam tours and luxury tailor-made holidays for travellers from the United Kingdom. Specialists in Ha Long Bay cruises, Sa Pa trekking, Hoi An heritage journeys and Mekong Delta escapes.',
  sameAs: [
    'https://www.facebook.com/vietnamtoursuk',
    'https://www.instagram.com/vietnamtoursuk',
    // Extend via NEXT_PUBLIC_SAME_AS (comma-separated): TripAdvisor, Trustpilot, LinkedIn, YouTube, Wikidata…
    ...(process.env.NEXT_PUBLIC_SAME_AS || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
  ],
  // Optional, only emitted when set. Never invent these.
  optional: {
    ukTelephone: process.env.NEXT_PUBLIC_UK_PHONE, // e.g. +44 20 xxxx xxxx
    streetAddress: process.env.NEXT_PUBLIC_UK_STREET,
    postalCode: process.env.NEXT_PUBLIC_UK_POSTCODE,
    foundingYear: process.env.NEXT_PUBLIC_FOUNDING_YEAR,
    // "ABTA:Y1234,ATOL:1234" – name:number pairs
    memberships: (process.env.NEXT_PUBLIC_MEMBERSHIPS || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((pair) => {
        const [name, id] = pair.split(':');
        return { name: name?.trim(), id: id?.trim() };
      })
      .filter((m) => m.name),
    rating:
      process.env.NEXT_PUBLIC_RATING_VALUE && process.env.NEXT_PUBLIC_RATING_COUNT
        ? {
            value: process.env.NEXT_PUBLIC_RATING_VALUE,
            count: process.env.NEXT_PUBLIC_RATING_COUNT,
          }
        : null,
  },
} as const;

/** Absolute URL helper */
export function absoluteUrl(path?: string | null): string {
  // CMS images can be missing or non-string; never throw while rendering JSON-LD
  if (typeof path !== 'string' || path.length === 0) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/** ISO 8601 duration for N days, e.g. 10 → "P10D" */
export function isoDays(days: number): string {
  return `P${Math.max(1, Math.round(days))}D`;
}

/**
 * Date the editorial facts on the site (visa, flights, seasons) were last
 * checked. Bump this when you re-verify the guides in src/lib/ukGuidesData.ts.
 */
export const CONTENT_REVIEWED_AT = '2026-10-07';

/** AI / search crawlers we explicitly welcome. */
export const AI_SEARCH_BOTS = [
  'OAI-SearchBot', // ChatGPT Search index
  'ChatGPT-User', // ChatGPT browsing on user request
  'PerplexityBot',
  'Perplexity-User',
  'Claude-SearchBot',
  'Claude-User',
  'Applebot',
  'Bingbot',
  'Googlebot',
] as const;

/** Crawlers used for model training. Allowed by default; flip to block. */
export const AI_TRAINING_BOTS = ['GPTBot', 'ClaudeBot', 'Google-Extended', 'Applebot-Extended', 'CCBot'] as const;
export const ALLOW_AI_TRAINING = process.env.GEO_ALLOW_AI_TRAINING !== 'false';

/**
 * The root layout appends " | VietnamTours.co.uk" via `title.template`.
 * Strip a brand suffix already present in a CMS/data title so it is not doubled.
 */
export function stripBrand(title: string): string {
  return title.replace(/\s*[|\-–—]\s*(VietnamTours\.co\.uk|Vietnam Tours?(\s+UK)?)\s*$/i, '').trim();
}
