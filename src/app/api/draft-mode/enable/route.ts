import { defineEnableDraftMode } from 'next-sanity/draft-mode';
import { client } from '@/sanity/client';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
  if (!client) {
    return new NextResponse('Sanity client not configured', { status: 500 });
  }
  const handler = defineEnableDraftMode({
    client: client.withConfig({ token: process.env.SANITY_WRITE_TOKEN }),
  });
  return handler.GET(request);
};
