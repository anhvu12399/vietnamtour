'use client';

import { useEffect } from 'react';

export function TrafficTracker() {
  useEffect(() => {
    try {
      if (!sessionStorage.getItem('vpt_traffic_init')) {
        const ref = document.referrer || '';
        const search = window.location.search;
        const params = new URLSearchParams(search);

        sessionStorage.setItem('vpt_traffic_init', '1');
        sessionStorage.setItem('vpt_initial_referrer', ref);
        sessionStorage.setItem('vpt_landing_page', window.location.pathname || '/');
        sessionStorage.setItem('vpt_utm_source', params.get('utm_source') || '');
        sessionStorage.setItem('vpt_utm_medium', params.get('utm_medium') || '');
        sessionStorage.setItem('vpt_utm_campaign', params.get('utm_campaign') || '');
      }
    } catch {
      // ignore storage access restrictions
    }
  }, []);

  return null;
}
