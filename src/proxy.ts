import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Lightweight AI-crawler observability. Emits one structured log line per hit
// from search/answer-engine crawlers so Vercel Logs (or a Log Drain) can answer:
// "Is OAI-SearchBot reaching the site, and which URLs?"
// It never blocks or rewrites a request.

const BOTS: { token: string; label: string; kind: 'search' | 'user' | 'training' }[] = [
  { token: 'OAI-SearchBot', label: 'OAI-SearchBot', kind: 'search' },
  { token: 'ChatGPT-User', label: 'ChatGPT-User', kind: 'user' },
  { token: 'GPTBot', label: 'GPTBot', kind: 'training' },
  { token: 'PerplexityBot', label: 'PerplexityBot', kind: 'search' },
  { token: 'Perplexity-User', label: 'Perplexity-User', kind: 'user' },
  { token: 'Claude-SearchBot', label: 'Claude-SearchBot', kind: 'search' },
  { token: 'Claude-User', label: 'Claude-User', kind: 'user' },
  { token: 'ClaudeBot', label: 'ClaudeBot', kind: 'training' },
  { token: 'bingbot', label: 'Bingbot', kind: 'search' },
  { token: 'Applebot', label: 'Applebot', kind: 'search' },
  { token: 'Google-Extended', label: 'Google-Extended', kind: 'training' },
];

export function proxy(request: NextRequest) {
  const ua = request.headers.get('user-agent') || '';
  if (ua) {
    const lower = ua.toLowerCase();
    const bot = BOTS.find((b) => lower.includes(b.token.toLowerCase()));
    if (bot) {
      console.log(
        JSON.stringify({
          event: 'ai_crawler',
          bot: bot.label,
          kind: bot.kind,
          path: request.nextUrl.pathname,
          country: request.headers.get('x-vercel-ip-country') || undefined,
        }),
      );
    }
  }
  return NextResponse.next();
}

export const config = {
  // Skip static assets, Next internals and the Sanity studio
  matcher: ['/((?!_next/static|_next/image|images|videos|fonts|seo|studio|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|avif|ico|css|js|woff2?)$).*)'],
};
