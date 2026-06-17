import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
  const draft = await draftMode();
  draft.disable();
  const url = new URL(request.url);
  const redirectUrl = url.searchParams.get('redirect') || '/';
  return NextResponse.redirect(new URL(redirectUrl, request.url));
};
