'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';
import { detectAiSource } from '@/lib/firstTouch';

/**
 * Records visits that arrive from AI assistants (ChatGPT adds utm_source=chatgpt.com
 * to outbound links) as a Vercel Analytics `ai_visit` event. Enquiry attribution
 * itself is handled by TrafficTracker (session first-touch). Renders nothing.
 */
export default function AiReferralTracker() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get('utm_source') || '';
    const referrer = document.referrer || '';

    const aiSource = detectAiSource(referrer, utmSource);

    if (aiSource) {
      try {
        // Dedupe per tab session so reloads do not inflate counts
        const k = `vt_ai_visit_${window.location.pathname}`;
        if (!window.sessionStorage.getItem(k)) {
          window.sessionStorage.setItem(k, '1');
          track('ai_visit', { source: aiSource, landing: window.location.pathname });
        }
      } catch {
        track('ai_visit', { source: aiSource, landing: window.location.pathname });
      }
    }
  }, []);

  return null;
}
