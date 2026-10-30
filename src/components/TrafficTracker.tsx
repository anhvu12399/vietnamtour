'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';

export function TrafficTracker() {
  useEffect(() => {
    try {
      if (!sessionStorage.getItem('vpt_traffic_init')) {
        const params = new URLSearchParams(window.location.search);
        let referrer = '';
        try { referrer = document.referrer ? new URL(document.referrer).origin : ''; } catch { /* Invalid referrer. */ }
        sessionStorage.setItem('vpt_initial_referrer', referrer);
        sessionStorage.setItem('vpt_landing_page', window.location.pathname);
        for (const key of ['source', 'medium', 'campaign']) {
          sessionStorage.setItem(`vpt_utm_${key}`, (params.get(`utm_${key}`) || '').slice(0, 200));
        }
        if (params.has('gclid') || params.has('msclkid')) sessionStorage.setItem('vpt_utm_medium', 'cpc');
        sessionStorage.setItem('vpt_traffic_init', '1');
      }
    } catch { /* Tracking must never block browsing or enquiries. */ }

    const onClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!(link instanceof HTMLAnchorElement)) return;
      const url = new URL(link.href);
      // No email, telephone number, notes or arbitrary query values in analytics.
      if (url.origin === window.location.origin && url.pathname === '/enquire') track('article_cta_click', { page: window.location.pathname, cta: 'enquiry' });
      if (url.hostname === 'wa.me' || url.hostname === 'api.whatsapp.com') track('whatsapp_click', { page: window.location.pathname });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return null;
}
