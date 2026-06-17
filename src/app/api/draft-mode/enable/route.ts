import { defineEnableDraftMode } from 'next-sanity/draft-mode';
import { client } from '@/sanity/client';
import { NextResponse } from 'next/server';
import { draftMode } from 'next/headers';

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

    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');

    // 1. Direct check: allow using SANITY_WRITE_TOKEN directly as the secret key
    if (secret === token) {
      const draft = await draftMode();
      draft.enable();
      const slug = searchParams.get('slug') || '/';
      if (!slug.startsWith('/')) {
        return new NextResponse('Invalid slug', { status: 400 });
      }
      return NextResponse.redirect(new URL(slug, request.url));
    }

    // 2. Fallback check: use next-sanity's built-in handshake via Sanity documents
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

    const errorMessage = error?.message || '';
    if (errorMessage.includes('secret') || errorMessage.includes('preview URL')) {
      console.warn('Unauthorized draft-mode request:', errorMessage);
      return new NextResponse(
        `<html><body><h1>Unauthorized</h1><p>${errorMessage}</p></body></html>`,
        { status: 401, headers: { 'Content-Type': 'text/html' } }
      );
    }

    console.error('Error in draft-mode enable route:', error);
    return new NextResponse(
      `<html><body><h1>Internal Server Error</h1><p>${error?.message}</p></body></html>`, 
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    );
  }
};
