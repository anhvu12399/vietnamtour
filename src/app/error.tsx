'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled runtime error:', error);
  }, [error]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#1e293b', color: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ maxWidth: '800px', width: '100%', backgroundColor: '#0f172a', padding: '2rem', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
        <h2 style={{ color: '#ef4444', marginTop: 0 }}>Application Error (Page)</h2>
        <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{error.message || 'Unknown Error'}</p>
        {error.digest && (
          <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
            Digest: <code>{error.digest}</code>
          </p>
        )}
        {error.stack && (
          <pre style={{ backgroundColor: '#1e293b', padding: '1rem', borderRadius: '4px', overflowX: 'auto', fontSize: '0.85rem', whiteSpace: 'pre-wrap', wordBreak: 'break-all', color: '#cbd5e1' }}>
            {error.stack}
          </pre>
        )}
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => reset()}
            style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Try again
          </button>
          <a
            href="/api/draft-mode/disable"
            style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: 'white', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold' }}
          >
            Disable Draft Mode
          </a>
        </div>
      </div>
    </div>
  );
}
