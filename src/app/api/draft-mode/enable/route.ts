import { defineEnableDraftMode } from 'next-sanity/draft-mode';
import { client } from '@/sanity/client';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
  try {
    if (!client) {
      console.error('Sanity client is null');
      return new NextResponse('<html><body><h1>Error</h1><p>Sanity client not configured.</p></body></html>', { status: 500, headers: { 'Content-Type': 'text/html' } });
    }
    const token = process.env.SANITY_WRITE_TOKEN;
    if (!token) {
      console.error('Missing SANITY_WRITE_TOKEN environment variable');
      return new NextResponse(
        `<html><body style="font-family: sans-serif; padding: 2rem;">
          <h1 style="color: #dc2626;">Configuration Error</h1>
          <p><strong>Missing <code>SANITY_WRITE_TOKEN</code> environment variable.</strong></p>
          <p>Please add it to your environment variables on Vercel and trigger a redeployment.</p>
        </body></html>`, 
        { status: 500, headers: { 'Content-Type': 'text/html' } }
      );
    }
    // Must set useCdn: false so we fetch the newly created preview secret immediately
    const handler = defineEnableDraftMode({
      client: client.withConfig({ token, useCdn: false }),
    });
    return await handler.GET(request);
  } catch (error: any) {
    if (
      error &&
      (error.message === 'NEXT_REDIRECT' ||
        (typeof error.digest === 'string' && error.digest.includes('NEXT_REDIRECT')))
    ) {
      throw error;
    }
    console.error('Error in draft-mode enable route:', error);
    return new NextResponse(
      `<html><body><h1>Internal Server Error</h1><p>${error?.message}</p></body></html>`, 
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    );
  }
};
