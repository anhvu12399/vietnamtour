import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';
import { detectTrafficSource } from '@/lib/trafficDetector';
import { canStoreEnquiry, deliverEnquiry, emailAcknowledged, parseEnquiry } from '@/lib/enquiryDelivery';
import { sendEnquiryViaResend } from '@/lib/emailService';

const token = process.env.SANITY_WRITE_TOKEN;
const enquiryDataset = process.env.SANITY_ENQUIRY_DATASET;
const sanityClient = token && enquiryDataset ? createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'knxuvin4',
  dataset: enquiryDataset,
  apiVersion: '2026-06-17', token, useCdn: false,
}) : null;

export async function POST(req: NextRequest) {
  let raw: unknown;
  try {
    const text = await req.text();
    if (text.length > 65536) return NextResponse.json({ error: 'Your request is too long.' }, { status: 413 });
    raw = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: 'Please send a valid enquiry.' }, { status: 400 });
  }
  const input = parseEnquiry(raw);
  if (!input) return NextResponse.json({ error: 'Please check your contact details and traveller numbers.' }, { status: 400 });
  const attribution = detectTrafficSource(input.referrer, input.utmSource, input.notes, input.landingPage, input.utmMedium);
  const id = `enquiry-${input.submissionId}`;
  const name = `${input.firstName} ${input.lastName}`;
  const phone = `${input.phoneCode} ${input.phone}`.trim();
  const result = await deliverEnquiry({
    save: async () => {
      if (!sanityClient || !enquiryDataset) return null;
      // Never write personal contact data into the public editorial dataset.
      const datasets = await sanityClient.datasets.list();
      if (!canStoreEnquiry(enquiryDataset, datasets)) return null;
      try {
        const doc = await sanityClient.create({
          _id: id, _type: 'enquiry', status: 'new', name, email: input.email, phone,
          destinations: input.destinations, travelMonth: input.travelMonth, travelYear: input.travelYear,
          duration: input.duration, adults: String(input.adults), children: String(input.teens + input.children),
          budgetPerPerson: input.budgetPerPerson, style: input.style, notes: input.notes, availableTime: input.availableTime,
          interest: input.interest, trafficSource: attribution.source, trafficChannel: attribution.channel,
          isAi: attribution.isAi, attributionEvidence: attribution.evidence, aiSignals: attribution.signals,
          contentHints: attribution.contentHints, referrer: input.referrer, landingPage: input.landingPage,
          utmSource: input.utmSource, utmMedium: input.utmMedium, utmCampaign: input.utmCampaign,
          submittedAt: new Date().toISOString(),
        });
        return { id: doc._id, created: true };
      } catch (error: unknown) {
        if (error && typeof error === 'object' && 'statusCode' in error && error.statusCode === 409) {
          const existing: { _id: string } | null = await sanityClient.fetch('*[_id == $id][0]{_id}', { id });
          if (existing) return { id: existing._id, created: false };
        }
        throw error;
      }
    },
    forwardEmail: async () => {
      // 1. Attempt primary delivery via Resend (sends customer thank-you and admin notification)
      if (process.env.RESEND_API_KEY) {
        try {
          const resendResult = await sendEnquiryViaResend(input, id, name, phone, attribution);
          if (resendResult.adminSent || resendResult.customerSent) {
            return true;
          }
          console.warn('Resend did not acknowledge sending, falling back to FormSubmit:', resendResult.error);
        } catch (resendError) {
          console.error('Resend execution error, falling back to FormSubmit:', resendError);
        }
      }

      // 2. Fallback to FormSubmit.co for admin notification if Resend is unconfigured or failed
      const response = await fetch('https://formsubmit.co/ajax/mywaytravelinc@gmail.com', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        signal: AbortSignal.timeout(10000),
        body: JSON.stringify({
          name, email: input.email, phone, destinations: input.destinations.join(', '),
          travelMonth: input.travelMonth, travelYear: input.travelYear, duration: input.duration,
          travellers: `${input.adults} adults, ${input.teens} teens, ${input.children} children`,
          budgetPerPerson: input.budgetPerPerson, preferredContactTime: input.availableTime,
          interest: input.interest, notes: input.notes,
          source: attribution.source, sourceEvidence: attribution.evidence, landingPage: input.landingPage,
          referrer: input.referrer, utmSource: input.utmSource, utmMedium: input.utmMedium, utmCampaign: input.utmCampaign,
          leadReference: id, _subject: `New VietnamTours enquiry: ${name}`, _template: 'table',
        }),
      });
      const body: unknown = await response.json();
      return emailAcknowledged(response.ok, body);
    },
  });
  if (!result.accepted) {
    console.error('Enquiry delivery was not acknowledged', { reference: id });
    return NextResponse.json({ error: 'We could not confirm receipt. Please retry or contact us by phone.' }, { status: 503 });
  }
  return NextResponse.json({ success: true, leadId: result.leadId || id, duplicate: result.duplicate }, { status: result.duplicate ? 200 : 201 });
}
