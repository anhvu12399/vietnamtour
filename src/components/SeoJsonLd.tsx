// ─── Reusable JSON-LD Structured Data Components ───────────────────────────
// Schema.org data read by Google, Bing (→ ChatGPT Search) and other answer engines.
// All entities reference the site-wide Organization via @id so they form one graph.

import { ORG_ID, SITE_URL, WEBSITE_ID, absoluteUrl, isoDays, siteConfig } from '@/lib/siteConfig';

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue | undefined };
type JsonObject = { [key: string]: JsonValue | undefined };

/** Serialise safely for inline <script> (prevents `</script>` / `<!--` breakouts). */
export function serializeJsonLd(data: JsonObject): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(new RegExp(String.fromCharCode(0x2028), 'g'), '\\u2028')
    .replace(new RegExp(String.fromCharCode(0x2029), 'g'), '\\u2029');
}

function JsonLd({ data }: { data: JsonObject }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}

/** The site-wide organisation node, reused by the root layout. */
export function buildOrganizationNode(): JsonObject {
  const { optional } = siteConfig;
  return {
    '@type': ['TravelAgency', 'Organization'],
    '@id': ORG_ID,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: siteConfig.logo },
    image: absoluteUrl('/images/dest_halong_limestone.png'),
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: optional.ukTelephone || siteConfig.telephone,
    ...(optional.foundingYear && { foundingDate: optional.foundingYear }),
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
      ...(optional.streetAddress && { streetAddress: optional.streetAddress }),
      ...(optional.postalCode && { postalCode: optional.postalCode }),
    },
    areaServed: [
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'Vietnam' },
    ],
    knowsAbout: [
      'Private tours of Vietnam',
      'Luxury tailor-made Vietnam holidays',
      'Ha Long Bay and Lan Ha Bay cruises',
      'Hoi An and central Vietnam',
      'Mekong Delta',
      'Vietnam travel planning for UK travellers',
    ],
    priceRange: '£££',
    currenciesAccepted: 'GBP',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: siteConfig.email,
        telephone: optional.ukTelephone || siteConfig.telephone,
        availableLanguage: ['English'],
        areaServed: 'GB',
      },
    ],
    ...(optional.memberships.length > 0 && {
      memberOf: optional.memberships.map((m) => ({
        '@type': 'Organization',
        name: m.name,
        ...(m.id && { identifier: m.id }),
      })),
    }),
    // Only published when real values are set in env — never invent a rating.
    ...(optional.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: optional.rating.value,
        reviewCount: optional.rating.count,
      },
    }),
    sameAs: [...siteConfig.sameAs],
  };
}

export function buildWebSiteNode(): JsonObject {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: siteConfig.name,
    description: siteConfig.tagline,
    inLanguage: 'en-GB',
    publisher: { '@id': ORG_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/itineraries?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function OrganizationJsonLd() {
  return <JsonLd data={{ '@context': 'https://schema.org', '@graph': [buildOrganizationNode(), buildWebSiteNode()] }} />;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: absoluteUrl(item.url),
        })),
      }}
    />
  );
}

export interface JsonLdAuthor {
  name: string;
  jobTitle?: string;
  url?: string;
  image?: string;
  sameAs?: string[];
}

function authorNode(author?: JsonLdAuthor): JsonObject {
  if (!author) return { '@type': 'Organization', '@id': ORG_ID, name: siteConfig.name, url: SITE_URL };
  return {
    '@type': 'Person',
    name: author.name,
    ...(author.jobTitle && { jobTitle: author.jobTitle }),
    ...(author.url && { url: absoluteUrl(author.url) }),
    ...(author.image && { image: absoluteUrl(author.image) }),
    ...(author.sameAs && author.sameAs.length > 0 && { sameAs: author.sameAs }),
    worksFor: { '@id': ORG_ID },
  };
}

interface ArticleJsonLdProps {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt?: string;
  modifiedAt?: string;
  /** Legacy: organisation name. Prefer `person`. */
  author?: string;
  person?: JsonLdAuthor;
  section?: string;
  /** 40–60 word direct answer; exposed via `abstract` */
  answer?: string;
  sources?: { label?: string; url?: string }[];
  wordCount?: number;
}

export function ArticleJsonLd({
  title,
  description,
  url,
  image,
  publishedAt,
  modifiedAt,
  person,
  section = 'Travel',
  answer,
  sources,
  wordCount,
}: ArticleJsonLdProps) {
  const citations = (sources || []).filter((s) => s.url).map((s) => ({ '@type': 'WebPage', name: s.label, url: s.url }));
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        ...(answer && { abstract: answer }),
        url,
        image: absoluteUrl(image),
        inLanguage: 'en-GB',
        ...(publishedAt && { datePublished: publishedAt }),
        dateModified: modifiedAt || publishedAt,
        ...(wordCount && { wordCount }),
        author: authorNode(person),
        publisher: { '@type': 'Organization', '@id': ORG_ID, name: siteConfig.name, url: SITE_URL, logo: { '@type': 'ImageObject', url: siteConfig.logo } },
        articleSection: section,
        isPartOf: { '@id': WEBSITE_ID },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        ...(citations.length > 0 && { citation: citations }),
      }}
    />
  );
}

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqJsonLd({ faqs }: { faqs: FaqItem[] }) {
  if (!faqs || faqs.length === 0) return null;
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      }}
    />
  );
}

interface ItineraryDayLd {
  name: string;
  description?: string;
}

interface TouristTripProps {
  name: string;
  description: string;
  url: string;
  image: string | string[];
  /** Either ISO ("P10D") or a number of days */
  duration?: string | number;
  price?: string | number;
  destination?: string;
  days?: ItineraryDayLd[];
  highlights?: string[];
  specialist?: JsonLdAuthor;
  modifiedAt?: string;
}

export function TouristTripJsonLd({
  name,
  description,
  url,
  image,
  duration,
  price,
  destination,
  days,
  highlights,
  modifiedAt,
}: TouristTripProps) {
  const images = (Array.isArray(image) ? image : [image]).filter(Boolean).map(absoluteUrl);
  const isoDuration = typeof duration === 'number' ? isoDays(duration) : duration;
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': ['TouristTrip', 'Product'],
        '@id': `${url}#trip`,
        name,
        description,
        url,
        image: images,
        inLanguage: 'en-GB',
        touristType: 'Leisure travellers from the United Kingdom',
        ...(isoDuration && { duration: isoDuration }),
        ...(modifiedAt && { dateModified: modifiedAt }),
        ...(destination && {
          subjectOf: { '@type': 'Place', name: destination },
          itinerary: { '@type': 'Place', name: destination, address: { '@type': 'PostalAddress', addressCountry: 'VN' } },
        }),
        ...(days && days.length > 0 && {
          hasPart: days.map((d, i) => ({ '@type': 'TouristAttraction', position: i + 1, name: d.name, ...(d.description && { description: d.description }) })),
        }),
        ...(highlights && highlights.length > 0 && { abstract: highlights.slice(0, 5).join('; ') }),
        provider: { '@id': ORG_ID },
        brand: { '@id': ORG_ID },
        ...(price !== undefined && {
          offers: {
            '@type': 'Offer',
            url,
            price: String(price),
            priceCurrency: 'GBP',
            availability: 'https://schema.org/InStock',
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: String(price),
              priceCurrency: 'GBP',
              referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitText: 'person' },
            },
            seller: { '@id': ORG_ID },
          },
        }),
      }}
    />
  );
}

interface TouristDestinationProps {
  name: string;
  description: string;
  url: string;
  image: string;
  touristTypes?: string[];
  includesAttraction?: string[];
}

export function TouristDestinationJsonLd({ name, description, url, image, touristTypes, includesAttraction }: TouristDestinationProps) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'TouristDestination',
        '@id': `${url}#destination`,
        name,
        description,
        url,
        image: absoluteUrl(image),
        touristType: touristTypes && touristTypes.length > 0 ? touristTypes : ['Luxury travellers', 'Couples', 'Families'],
        ...(includesAttraction && includesAttraction.length > 0 && {
          includesAttraction: includesAttraction.map((a) => ({ '@type': 'TouristAttraction', name: a })),
        }),
        containedInPlace: { '@type': 'Country', name: 'Vietnam' },
      }}
    />
  );
}

interface ItemListProps {
  name: string;
  items: { name: string; url: string }[];
}

export function ItemListJsonLd({ name, items }: ItemListProps) {
  if (items.length === 0) return null;
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name,
        itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, url: absoluteUrl(it.url) })),
      }}
    />
  );
}

interface WebPageJsonLdProps {
  name: string;
  description: string;
  url: string;
  modifiedAt?: string;
  /** CSS selectors for the direct answer (voice assistants / answer engines) */
  speakable?: string[];
}

export function WebPageJsonLd({ name, description, url, modifiedAt, speakable }: WebPageJsonLdProps) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        name,
        description,
        url,
        inLanguage: 'en-GB',
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': ORG_ID },
        ...(modifiedAt && { dateModified: modifiedAt }),
        ...(speakable && speakable.length > 0 && { speakable: { '@type': 'SpeakableSpecification', cssSelector: speakable } }),
      }}
    />
  );
}

export function PersonJsonLd({ person }: { person: JsonLdAuthor & { knowsAbout?: string[]; description?: string } }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        ...(authorNode(person) as JsonObject),
        ...(person.knowsAbout && { knowsAbout: person.knowsAbout }),
        ...(person.description && { description: person.description }),
      }}
    />
  );
}
