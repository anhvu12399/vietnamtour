import { defineEnableDraftMode } from 'next-sanity/draft-mode';
import { client } from '@/sanity/client';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
  try {
    if (!client) {
      console.error('Sanity client is null');
      return new NextResponse('Sanity client not configured', { status: 500 });
    }
    const token = process.env.SANITY_WRITE_TOKEN;
    if (!token) {
      console.error('Missing SANITY_WRITE_TOKEN environment variable');
      return new NextResponse('SANITY_WRITE_TOKEN not configured', { status: 500 });
    }
    const handler = defineEnableDraftMode({
      client: client.withConfig({ token }),
    });
    return await handler.GET(request);
  } catch (error: any) {
    console.error('Error in draft-mode enable route:', error);
    return new NextResponse(
      JSON.stringify({ error: error?.message || 'Internal Server Error' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
