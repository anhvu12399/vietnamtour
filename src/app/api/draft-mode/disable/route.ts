import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const draft = await draftMode();
  draft.disable();
  
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const redirectUrl = searchParams.get('redirect') || '/';
  
  return NextResponse.redirect(new URL(redirectUrl, request.url));
}
