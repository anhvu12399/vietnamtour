import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';
import { detectTrafficSource } from '@/lib/trafficDetector';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'knxuvin4';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN;

const sanityClient = token
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      token,
      useCdn: false,
    })
  : null;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firstName = '',
      lastName = '',
      email = '',
      phone = '',
      phoneCode = '+44',
      destinations = [],
      travelMonth = '',
      duration = '',
      adults = 2,
      teens = 0,
      children = 0,
      budgetPerPerson = '',
      style = '',
      notes = '',
      availableTime = '',
      // Tracking fields passed from client
      referrer = '',
      landingPage = '',
      utmSource = '',
      utmMedium = '',
      utmCampaign = '',
    } = body;

    const fullName = `${firstName} ${lastName}`.trim() || 'New Enquiry';
    const fullPhone = `${phoneCode} ${phone}`.trim();

    // 1. Phân tích nguồn traffic (AI vs Search vs Direct vs Referral)
    const forensics = detectTrafficSource(
      referrer || req.headers.get('referer') || '',
      utmSource,
      notes,
      landingPage
    );

    // 2. Lưu trực tiếp vào Sanity CMS (để quản lý trong /studio)
    let sanityDocId: string | null = null;
    if (sanityClient) {
      try {
        const doc = await sanityClient.create({
          _type: 'enquiry',
          name: fullName,
          email,
          phone: fullPhone,
          destinations: Array.isArray(destinations) ? destinations : [destinations].filter(Boolean),
          travelMonth,
          duration,
          adults: String(adults),
          children: String(Number(teens) + Number(children)),
          budgetPerPerson,
          style,
          notes,
          trafficSource: forensics.source,
          trafficChannel: forensics.channel,
          isAi: forensics.isAi,
          confidence: forensics.confidence,
          referrer,
          landingPage,
          utmSource,
          utmMedium,
          utmCampaign,
          aiSignals: forensics.signals,
          submittedAt: new Date().toISOString(),
        });
        sanityDocId = doc._id;
      } catch (sanityErr) {
        console.error('Failed to store enquiry in Sanity:', sanityErr);
      }
    }

    // 3. Gửi thông báo email qua formsubmit.co
    try {
      await fetch('https://formsubmit.co/ajax/mywaytravelinc@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: fullName,
          email,
          phone: fullPhone,
          destinations: Array.isArray(destinations) ? destinations.join(', ') : destinations,
          travelMonth,
          duration,
          travelers: `${adults} Adults, ${teens} Teens, ${children} Children`,
          budgetPerPerson,
          preferredContactTime: availableTime,
          notes,
          '--- TRAFFIC & AI FORENSICS ---': '------------------------',
          'Detected Source': forensics.source,
          'Is AI Generated': forensics.isAi ? 'YES 🤖' : 'NO 👤',
          'Confidence': `${forensics.confidence}%`,
          'AI Signals': forensics.signals.join(' | ') || 'None',
          'Entry Referrer': referrer || 'Direct',
          'Landing Page': landingPage || '/',
          _subject: `[${forensics.source}] New Enquiry: ${fullName}`,
          _template: 'table',
        }),
      });
    } catch (emailErr) {
      console.error('Failed to forward email:', emailErr);
    }

    return NextResponse.json({
      success: true,
      sanityDocId,
      forensics,
    });
  } catch (err: any) {
    console.error('Error in enquiry endpoint:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
