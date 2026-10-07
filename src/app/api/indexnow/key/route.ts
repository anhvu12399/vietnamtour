// IndexNow ownership proof, referenced via `keyLocation` when submitting URLs.
// Set INDEXNOW_KEY (8–128 chars, a-z A-Z 0-9 -) in Vercel env.
export const dynamic = 'force-dynamic';

export async function GET() {
  const key = process.env.INDEXNOW_KEY;
  if (!key) return new Response('Not configured', { status: 404 });
  return new Response(key, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
