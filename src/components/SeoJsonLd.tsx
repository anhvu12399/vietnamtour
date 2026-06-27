// ─── Reusable JSON-LD Structured Data Components ───────────────────────────
// These generate Schema.org structured data that Google uses for rich snippets

interface OrganizationProps {
  name?: string;
  url?: string;
  logo?: string;
  phone?: string;
  email?: string;
  sameAs?: string[];
}

export function OrganizationJsonLd({
  name = 'VietnamTours',
  url = 'https://www.vietnamtours.co.uk',
  logo = 'https://www.vietnamtours.co.uk/logo-dark.png',
  phone = '+442078459200',
  email = 'info@vietnamtours.co.uk',
  sameAs = [],
}: OrganizationProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name,
    url,
    logo,
    telephone: phone,
    email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
      addressLocality: 'London',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Vietnam',
    },
    sameAs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface ArticleJsonLdProps {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt?: string;
  modifiedAt?: string;
  author?: string;
  section?: string;
}

export function ArticleJsonLd({
  title,
  description,
  url,
  image,
  publishedAt,
  modifiedAt,
  author = 'Vietnam Tour',
  section = 'Travel',
}: ArticleJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    image,
    ...(publishedAt && { datePublished: publishedAt }),
    ...(modifiedAt && { dateModified: modifiedAt }),
    author: {
      '@type': 'Organization',
      name: author,
      url: 'https://www.vietnamtours.co.uk',
    },
    publisher: {
      '@type': 'Organization',
      name: 'VietnamTours',
      url: 'https://www.vietnamtours.co.uk',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.vietnamtours.co.uk/favicon.ico',
      },
    },
    articleSection: section,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqJsonLd({ faqs }: { faqs: FaqItem[] }) {
  if (!faqs || faqs.length === 0) return null;

  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface TouristTripProps {
  name: string;
  description: string;
  url: string;
  image: string;
  duration?: string;
  price?: string;
  destination?: string;
}

export function TouristTripJsonLd({
  name,
  description,
  url,
  image,
  duration,
  price,
  destination,
}: TouristTripProps) {
  const data: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name,
    description,
    url,
    image,
    provider: {
      '@type': 'TravelAgency',
      name: 'VietnamTours',
      url: 'https://www.vietnamtours.co.uk',
    },
  };

  if (destination) {
    data.touristType = 'Leisure Traveler';
    data.itinerary = {
      '@type': 'Place',
      name: destination,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'VN',
      },
    };
  }

  if (duration) {
    data.duration = duration;
  }

  if (price) {
    data.offers = {
      '@type': 'Offer',
      price,
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface TouristDestinationProps {
  name: string;
  description: string;
  url: string;
  image: string;
}

export function TouristDestinationJsonLd({
  name,
  description,
  url,
  image,
}: TouristDestinationProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name,
    description,
    url,
    image,
    containedInPlace: {
      '@type': 'Country',
      name: 'Vietnam',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
