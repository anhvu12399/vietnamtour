export const SITE_URL = 'https://www.vietnamtours.co.uk';
export const SITE_NAME = 'VietnamTours.co.uk';

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).href;
}

// Independent pages always describe themselves. Duplicate routes use redirects.
export function canonicalUrl(path: string): string {
  const url = new URL(path, SITE_URL);
  url.search = '';
  url.hash = '';
  return url.href.replace(/\/$/, '');
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export function validIsoDate(value?: string): string | undefined {
  if (!value || Number.isNaN(Date.parse(value))) return undefined;
  return new Date(value).toISOString();
}

export function enquiryUrl(subject: string): string {
  return `/enquire?${new URLSearchParams({ interest: subject })}`;
}
