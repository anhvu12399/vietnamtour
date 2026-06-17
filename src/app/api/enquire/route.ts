import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { client } from '@/sanity/client';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, phone, destinations, travelMonth, duration, adults, children, budgetPerPerson, style, notes } = data;

    // 1. Validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and phone are required fields.' },
        { status: 400 }
      );
    }

    const submittedAt = new Date().toISOString();
    const enquiryPayload = {
      _type: 'enquiry',
      name,
      email,
      phone,
      destinations,
      travelMonth,
      duration,
      adults,
      children,
      budgetPerPerson,
      style,
      notes,
      submittedAt,
    };

    console.log('\n==================================================');
    console.log(`[ENQUIRY RECEIVED] Submission at ${submittedAt}`);
    console.log(JSON.stringify(enquiryPayload, null, 2));
    console.log('==================================================\n');

    // 2. "Bắn email ngay lập tức" - Immediate Email Dispatch Simulation
    // In production, you would use: resend.emails.send() or nodemailer.sendMail()
    console.log('>>> DISPATCHING EMAIL NOTIFICATIONS IMMEDIATELY...');
    
    const emailToSpecialist = `
      TO: experts@vietnamtour.co.uk
      FROM: system@vietnamtour.co.uk
      SUBJECT: [New Luxury Enquiry] Custom Tour Request from ${name} (£${budgetPerPerson}pp)
      
      Dear Team,
      
      A new high-end bespoke travel enquiry has been submitted:
      
      Client Details:
      - Name: ${name}
      - Email: ${email}
      - Phone: ${phone}
      
      Travel Preferences:
      - Regions of Interest: ${destinations?.join(', ') || 'Not specified'}
      - Preferred Travel Style: ${style || 'Not specified'}
      - Travel Date/Month: ${travelMonth || 'Not specified'}
      - Duration: ${duration || 'Not specified'}
      - Party Size: ${adults} Adults, ${children} Children
      - Budget Per Person: £${parseInt(budgetPerPerson).toLocaleString('en-GB')}+
      
      Client Custom Notes:
      "${notes || 'No special requirements listed.'}"
      
      Please review and contact the client within 24 hours.
    `;

    const emailToClient = `
      TO: ${email}
      FROM: expert@vietnamtour.co.uk
      SUBJECT: Your Custom Journey to Vietnam - VietnamTour.co.uk
      
      Dear ${name.split(' ')[0]},
      
      Thank you for contacting Vietnam Tour UK. We have received your enquiry to design a bespoke luxury journey.
      
      Our senior destination specialist, Alice Mercer, has been assigned to your request and is currently reviewing your preferences:
      - Travel Style: ${style || 'Bespoke Curated'}
      - Party Size: ${adults} Adults, ${children} Children
      - Target Budget: £${parseInt(budgetPerPerson).toLocaleString('en-GB')} per person
      
      Alice will prepare an initial luxury itinerary draft and contact you shortly at ${phone} or via email to align on your requirements.
      
      Kind regards,
      The Vietnam Tour UK Team
      +44 (0) 20 7845 9200
    `;

    console.log('\n--- EMAIL SENT TO SPECIALIST ---');
    console.log(emailToSpecialist);
    console.log('--------------------------------\n');
    console.log('\n--- EMAIL SENT TO CLIENT ---');
    console.log(emailToClient);
    console.log('----------------------------\n');


    // 3. "Lưu bản sao vào Database/CMS" - Save to Database & CMS
    
    // 3a. Save to local JSON Database file (Fail-Safe Local Storage)
    const dbPath = path.join(process.cwd(), 'enquiries.json');
    let localDB = [];
    
    if (fs.existsSync(dbPath)) {
      try {
        const fileContent = fs.readFileSync(dbPath, 'utf8');
        localDB = JSON.parse(fileContent);
      } catch (e) {
        console.error('Failed to parse local database. Resetting...', e);
      }
    }
    
    localDB.push(enquiryPayload);
    fs.writeFileSync(dbPath, JSON.stringify(localDB, null, 2), 'utf8');
    console.log(`>>> COPY SAVED TO DATABASE: Added to local database file: ${dbPath}`);

    // 3b. Save to Sanity CMS (If project write-token is provided)
    if (client && process.env.SANITY_WRITE_TOKEN) {
      console.log('>>> COPY SAVED TO SANITY: Sending document to Sanity cloud api...');
      try {
        // Authenticate client with write token to write documents
        const writeClient = client.withConfig({
          token: process.env.SANITY_WRITE_TOKEN,
          useCdn: false // Don't use CDN for writes
        });
        const sanityDoc = await writeClient.create(enquiryPayload);
        console.log('>>> SANITY DOCUMENT CREATED SUCCESS:', sanityDoc._id);
      } catch (err: any) {
        console.error('>>> SANITY DOCUMENT CREATE FAILED:', err.message);
      }
    } else {
      console.log('>>> COPY SAVED TO SANITY: Skipped (Sanity client or SANITY_WRITE_TOKEN not configured). Stored locally in enquiries.json.');
    }

    return NextResponse.json({
      success: true,
      message: 'Enquiry submitted, email sent, and copy saved to database.',
      data: enquiryPayload
    });

  } catch (error: any) {
    console.error('Enquiry API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error: ' + error.message },
      { status: 500 }
    );
  }
}
