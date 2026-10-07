import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { SITE_URL, absoluteUrl } from '@/lib/siteConfig';
import { getSiteEntries, staticPages } from '@/lib/siteIndex';

// Notifies Bing (and other IndexNow engines) of new/changed URLs so they reach
// the Bing index — which ChatGPT Search relies on — within hours.
//
// Triggers:
//   • Sanity webhook (POST, secret in ?secret= or `x-webhook-secret` header).
//     Body may carry { slug, _type }; otherwise the full URL list is submitted.
//   • Manual: curl -X POST "$SITE/api/indexnow?secret=…&all=1"
//
// Env: INDEXNOW_KEY, INDEXNOW_WEBHOOK_SECRET

export const dynamic = 'force-dynamic';

const ENDPOINT = 'https://api.indexnow.org/indexnow';

const PATH_BY_TYPE: Record<string, (slug: string) => string[]> = {
  itinerary: (s) => [`/itineraries/${s}`, '/itineraries'],
  destination: (s) => [`/destinations/${s}`, '/destinations'],
  post: (s) => [`/travel-guides/${s}`, `/blog/${s}`, '/travel-guides', '/blog'],
  blogPost: (s) => [`/blog/${s}`, '/blog'],
  travelGuide: (s) => [`/travel-guides/${s}`, '/travel-guides'],
  thingToDo: (s) => [`/things-to-do/${s}`, '/things-to-do'],
  tripIdea: (s) => [`/trip-ideas/${s}`, '/trip-ideas'],
  inspiration: (s) => [`/inspirations/${s}`, '/inspirations'],
  monthGuide: (s) => [`/ideas-by-month/${s}`, '/ideas-by-month'],
};

function authorised(req: NextRequest): boolean {
  const secret = process.env.INDEXNOW_WEBHOOK_SECRET;
  if (!secret) return false;
  const given = req.nextUrl.searchParams.get('secret') || req.headers.get('x-webhook-secret');
  return given === secret;
}

export async function POST(req: NextRequest) {
  const key = process.env.INDEXNOW_KEY;
  if (!key) return NextResponse.json({ ok: false, error: 'INDEXNOW_KEY not set' }, { status: 503 });
  if (!authorised(req)) return NextResponse.json({ ok: false, error: 'unauthorised' }, { status: 401 });

  let body: { slug?: string | { current?: string }; _type?: string } = {};
  try {
    body = await req.json();
  } catch {
    // empty body is fine
  }

  const slug = typeof body.slug === 'string' ? body.slug : body.slug?.current;
  const type = body._type;
  const all = req.nextUrl.searchParams.get('all') === '1';

  let paths: string[] = [];
  if (!all && slug && type && PATH_BY_TYPE[type]) {
    paths = PATH_BY_TYPE[type](slug);
  }

  if (paths.length === 0) {
    // Unknown change → submit everything (max 10,000 per request)
    const entries = await getSiteEntries();
    paths = [...staticPages.map((p) => p.path), ...entries.map((e) => new URL(e.url).pathname)];
  }

  // Refresh ISR output immediately so crawlers see new content
  for (const p of paths) {
    try {
      revalidatePath(p);
    } catch {
      // not a cached path
    }
  }
  revalidatePath('/sitemap.xml');
  revalidatePath('/llms.txt');
  revalidatePath('/rss.xml');

  const urlList = Array.from(new Set(paths.map((p) => absoluteUrl(p)))).slice(0, 10000);
  const host = new URL(SITE_URL).host;

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host, key, keyLocation: absoluteUrl('/api/indexnow/key'), urlList }),
  });

  return NextResponse.json({ ok: res.ok || res.status === 202, status: res.status, submitted: urlList.length });
}
