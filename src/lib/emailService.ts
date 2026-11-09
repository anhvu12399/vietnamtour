import { Resend } from 'resend';
import type { EnquiryInput } from './enquiryDelivery';
import type { ForensicsResult } from './trafficDetector';

const apiKey = process.env.RESEND_API_KEY;
export const resend = apiKey ? new Resend(apiKey) : null;

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function buildCustomerThankYouEmail(input: EnquiryInput, leadId: string) {
  const safeName = escapeHtml(`${input.firstName} ${input.lastName}`.trim());
  const safeFirstName = escapeHtml(input.firstName || 'traveler');
  const safeDestinations = escapeHtml(input.destinations.join(', ') || 'Vietnam & Indochina');
  const safeDuration = escapeHtml(input.duration || 'Not specified');
  const safeTiming = escapeHtml(`${input.travelMonth} ${input.travelYear}`.trim() || 'Flexible');
  const safeBudget = escapeHtml(input.budgetPerPerson || 'Custom');
  const safeNotes = escapeHtml(input.notes || 'None specified');
  const safeContactTime = escapeHtml(input.availableTime || 'Anytime');
  const travellersCount = `${input.adults} Adults${input.teens ? `, ${input.teens} Teens` : ''}${input.children ? `, ${input.children} Children` : ''}`;

  const subject = `${safeFirstName}, thank you for your Vietnam travel enquiry [Ref: #${leadId}]`;

  const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(subject)}</title>
  <style type="text/css">
    body, table, td, p, a, li, blockquote { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { margin: 0; padding: 0; width: 100% !important; background-color: #ebeff2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; }
    .email-wrapper { width: 100%; background-color: #ebeff2; padding: 30px 10px; }
    .email-container { max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); }
    @media only screen and (max-width: 600px) {
      .email-container { width: 100% !important; border-radius: 0 !important; }
      .header-col-left, .header-col-right { display: block !important; width: 100% !important; text-align: left !important; }
      .header-col-right { margin-top: 12px !important; }
      .feature-col-img, .feature-col-text { display: block !important; width: 100% !important; }
      .feature-col-img img { width: 100% !important; height: auto !important; max-height: 220px !important; }
      .feature-col-text { padding: 20px 20px 24px 20px !important; }
      .content-padding { padding: 22px 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #ebeff2;">
  <center class="email-wrapper">
    <table class="email-container" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 620px; background-color: #ffffff; margin: 0 auto; text-align: left;">
      
      <!-- ── 1. HEADER (Logo with Letter 'M' Mark + UK Hotline) ── -->
      <tr>
        <td style="padding: 24px 32px 20px; border-bottom: 1px solid #f1f5f9;">
          <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <!-- Brand Identity with 'M' Mark -->
              <td class="header-col-left" valign="middle" align="left" style="width: 58%;">
                <a href="https://www.vietnamtours.co.uk" target="_blank" style="text-decoration: none; display: inline-block;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td valign="middle" style="padding-right: 12px;">
                        <!-- Official letter 'M' emblem from live web -->
                        <img src="https://www.mywaytravel.com/images/myway-icon-192.png" 
                             alt="Vietnam Tours 'M' Mark" 
                             width="46" 
                             height="46" 
                             style="display: block; border-radius: 50%;" />
                      </td>
                      <td valign="middle">
                        <div style="font-family: 'Playfair Display', Georgia, serif; font-size: 19px; font-weight: 700; color: #011b31; letter-spacing: 0.5px; line-height: 1.1;">
                          VIETNAM TOURS
                        </div>
                        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 9.5px; font-weight: 600; color: #b48530; letter-spacing: 2px; text-transform: uppercase; margin-top: 2px;">
                          BY MY WAY TRAVEL
                        </div>
                      </td>
                    </tr>
                  </table>
                </a>
              </td>
              <!-- UK Phone / Hours -->
              <td class="header-col-right" valign="middle" align="right" style="width: 42%;">
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 17px; font-weight: 800; color: #011b31;">
                  020 8126 8998
                </div>
                <div style="margin-top: 3px;">
                  <a href="https://www.vietnamtours.co.uk" target="_blank" style="font-size: 12px; color: #64748b; text-decoration: underline; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                    Our London office hours
                  </a>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- ── 2. HERO IMAGE BANNER (Halong Bay Limestone / Vietnam Scenic) ── -->
      <tr>
        <td style="padding: 0; position: relative;">
          <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td style="padding: 0; position: relative; background-color: #011b31;">
                <img src="https://www.vietnamtours.co.uk/images/dest_halong_limestone.png" 
                     alt="Halong Bay Luxury Private Cruise" 
                     width="620" 
                     style="display: block; width: 100%; max-width: 620px; height: auto; max-height: 290px; object-fit: cover;" />
                <div style="background-color: #0c1524; padding: 7px 18px; text-align: right;">
                  <span style="font-family: Georgia, serif; font-style: italic; font-size: 12px; color: #e2e8f0;">
                    Image by Vietnam Tours client David Thornton
                  </span>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- ── 3. LETTER BODY (Salutation & Reassurance) ── -->
      <tr>
        <td class="content-padding" style="padding: 32px 36px 16px;">
          <p style="margin: 0 0 18px; font-size: 16px; color: #1e293b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            Dear ${safeFirstName},
          </p>
          <p style="margin: 0 0 18px; font-size: 14.5px; line-height: 1.68; color: #334155;">
            Thank you for your interest in <strong>Vietnam Tours</strong> — I&#39;m thrilled you&#39;re considering a private tailor-made journey across Vietnam with us.
          </p>
          <p style="margin: 0 0 18px; font-size: 14.5px; line-height: 1.68; color: #334155;">
            If they haven&#39;t yet, someone from our UK Travel Specialist Team will reach out shortly and put you in touch with a dedicated specialist, who knows Vietnam and Indochina inside-out — from the emerald waters of Halong Bay and lantern-lit streets of Hoi An to the misty terraced valleys of Sapa. As always, they&#39;ll take time to listen to what you want from your travels so they can meticulously craft the journey you&#39;ve been imagining.
          </p>
          <p style="margin: 0 0 14px; font-size: 14.5px; line-height: 1.68; color: #334155;">
            We&#39;re looking forward to planning your journey across Vietnam.
          </p>
          <p style="margin: 0 0 24px; font-size: 14.5px; font-weight: 500; color: #1e293b;">
            Here&#39;s to adventure.
          </p>

          <!-- Signoff + Ken Fish Signature -->
          <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 10px;">
            <tr>
              <td valign="middle" style="padding-right: 18px;">
                <img src="https://www.mywaytravel.com/images/founder_ken_fish.jpg" 
                     alt="Ken Fish" 
                     width="76" 
                     height="76" 
                     style="display: block; border-radius: 50%; object-fit: cover; border: 2px solid #e2e8f0;" />
              </td>
              <td valign="middle">
                <!-- SVG Signature Mark -->
                <svg width="190" height="46" viewBox="0 0 190 46" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:4px 0 6px;">
                  <path d="M12 36C22 28 34 10 38 7C40 5 44 8 42 14C39 24 30 33 28 38C26 42 32 39 37 32C42 24 49 14 54 11C57 9 58 12 55 18C50 28 47 37 52 35C57 33 65 22 72 17C79 12 83 14 80 20C76 27 71 35 77 34C83 33 93 21 101 16C108 12 112 14 109 20C104 29 99 37 106 35C114 32 125 19 133 16C138 14 141 16 138 22C133 32 129 39 138 35C146 32 159 20 167 18C174 16 179 21 170 29C160 38 142 41 127 41C102 41 68 40 40 40C25 40 10 41 5 41" stroke="#011b31" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 15px; font-weight: 700; color: #011b31; line-height: 1.2;">
                  Ken Fish
                </div>
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12.5px; color: #64748b; line-height: 1.3;">
                  Managing Director of My Way Travel
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- ── 4. FEATURE BLOCK 1: BROCHURE PROMO ── -->
      <tr>
        <td style="padding: 12px 32px 14px;">
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #556c6e; border-radius: 4px; overflow: hidden;">
            <tr>
              <td class="feature-col-img" width="45%" valign="middle" align="center" style="padding: 0; background-color: #4a5f61;">
                <img src="https://www.vietnamtours.co.uk/images/brochure_vietnam_cover.png" 
                     alt="Vietnam Tours Bespoke Brochure" 
                     width="270" 
                     style="display: block; width: 100%; height: 100%; max-height: 230px; object-fit: cover;" />
              </td>
              <td class="feature-col-text" width="55%" valign="middle" style="padding: 24px 24px 24px 20px;">
                <div style="font-family: Georgia, serif; font-style: italic; font-size: 19px; color: #ffffff; line-height: 1.25; margin-bottom: 10px;">
                  Explore Vietnam your way
                </div>
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12.5px; color: #e8ecef; line-height: 1.5; margin-bottom: 16px;">
                  Our brochure, <em style="color:#ffffff;">The World on Your Terms</em>, is designed to inspire your future travels and show you what your trip can look like when you explore with us. Inside, you&#39;ll find trip ideas alongside hand-picked stays.
                </div>
                <div>
                  <a href="https://www.vietnamtours.co.uk/itineraries" 
                     target="_blank" 
                     style="display: inline-block; background-color: #ffffff; color: #011b31; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; text-decoration: none; padding: 10px 18px; border-radius: 2px;">
                    VIEW ONLINE BROCHURE &rsaquo;
                  </a>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- ── 5. FEATURE BLOCK 2: SPECIALIST INTRO ── -->
      <tr>
        <td style="padding: 8px 32px 26px;">
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #556c6e; border-radius: 4px; overflow: hidden;">
            <tr>
              <td class="feature-col-img" width="45%" valign="middle" align="center" style="padding: 0; background-color: #4a5f61;">
                <img src="https://www.vietnamtours.co.uk/images/specialist_alice.png" 
                     alt="Dedicated UK Travel Specialist" 
                     width="270" 
                     style="display: block; width: 100%; height: 100%; max-height: 220px; object-fit: cover;" />
              </td>
              <td class="feature-col-text" width="55%" valign="middle" style="padding: 24px 24px 24px 20px;">
                <div style="font-family: Georgia, serif; font-style: italic; font-size: 19px; color: #ffffff; line-height: 1.25; margin-bottom: 10px;">
                  What happens next
                </div>
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12.5px; color: #e8ecef; line-height: 1.5;">
                  Keep an eye (and ear) out for our call — one of our UK specialists will be ringing you on a number starting with <strong>020 8126</strong> to talk through your plans and start exploring all the possibilities for your next trip.
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- ── 6. TRUST BADGES & FOOTER ── -->
      <tr>
        <td style="background-color: #f8fafc; padding: 26px 32px 22px; text-align: center; border-top: 1px solid #e2e8f0;">
          <div style="font-size: 11.5px; color: #64748b; line-height: 1.55; margin-bottom: 8px;">
            You&#39;ve received this email because you recently enquired about a tailor-made journey with Vietnam Tours.
          </div>
          <div style="font-size: 12px; font-weight: 600; color: #011b31; margin-bottom: 18px;">
            Please reply directly to this email if you&#39;d like to get in touch.
          </div>

          <!-- Trust Badges (B-Corp / Which? / Travel Awards) -->
          <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto 18px;">
            <tr>
              <td align="center" valign="middle" style="padding: 0 16px;">
                <div style="border: 1.5px solid #1e293b; border-radius: 50%; width: 56px; height: 56px; display: table-cell; vertical-align: middle; text-align: center; background-color: #ffffff;">
                  <span style="font-family: Arial, sans-serif; font-size: 6px; font-weight: 800; color: #1e293b; letter-spacing: 0.5px; text-transform: uppercase; display: block;">CERTIFIED</span>
                  <span style="font-family: Georgia, serif; font-size: 24px; font-weight: 700; color: #1e293b; line-height: 1; display: block; margin: -2px 0;">B</span>
                  <span style="font-family: Arial, sans-serif; font-size: 6px; font-weight: 700; color: #1e293b; letter-spacing: 0.5px; text-transform: uppercase; display: block;">CORP STYLE</span>
                </div>
              </td>
              <td align="center" valign="middle" style="padding: 0 16px;">
                <div style="border: 1.5px solid #dc2626; border-radius: 50%; width: 56px; height: 56px; display: cell; vertical-align: middle; text-align: center; background-color: #ffffff;">
                  <span style="font-family: Arial, sans-serif; font-size: 5.5px; font-weight: 700; color: #dc2626; letter-spacing: 0.5px; text-transform: uppercase; display: block;">RECOMMENDED</span>
                  <span style="font-family: Georgia, serif; font-size: 13px; font-weight: 800; color: #dc2626; line-height: 1.1; display: block;">Which?</span>
                  <span style="font-family: Arial, sans-serif; font-size: 5.5px; font-weight: 700; color: #dc2626; letter-spacing: 0.5px; text-transform: uppercase; display: block;">PROVIDER</span>
                </div>
              </td>
              <td align="center" valign="middle" style="padding: 0 16px;">
                <div style="border: 1.5px solid #1e293b; width: 62px; height: 56px; display: table-cell; vertical-align: middle; text-align: center; background-color: #ffffff;">
                  <span style="font-family: Arial, sans-serif; font-size: 5.5px; font-weight: 700; color: #64748b; letter-spacing: 0.5px; text-transform: uppercase; display: block;">LUXURY</span>
                  <span style="font-family: Georgia, serif; font-size: 9px; font-weight: 700; color: #011b31; line-height: 1; display: block; margin: 2px 0;">TRAVEL</span>
                  <span style="font-family: Georgia, serif; font-size: 9px; font-weight: 700; color: #011b31; line-height: 1; display: block;">AWARDS</span>
                  <span style="font-family: Arial, sans-serif; font-size: 6.5px; font-weight: 800; color: #b48530; letter-spacing: 0.5px; display: block; margin-top: 2px;">WINNER 2025</span>
                </div>
              </td>
            </tr>
          </table>

          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; color: #64748b; line-height: 1.6;">
            <strong>Vietnam Tours</strong> · By My Way Travel<br />
            20-22 Wenlock Road, London N1 7GU, United Kingdom · Tel: 020 8126 8998<br />
            <a href="https://www.vietnamtours.co.uk" target="_blank" style="color: #64748b; text-decoration: underline;">vietnamtours.co.uk</a>
          </div>
        </td>
      </tr>

    </table>
  </center>
</body>
</html>`;

  const text = `VIETNAM TOURS — BESPOKE LUXURY TRAVEL
Thank you, ${safeName}

We have received your enquiry for a tailor-made journey across Vietnam and Indochina.
The travel team will review your request and contact you to discuss possible next steps. Availability, services and prices will be confirmed separately.

ENQUIRY REFERENCE: #${leadId}

YOUR JOURNEY SUMMARY:
- Destinations: ${input.destinations.join(', ')}
- Timing: ${input.travelMonth} ${input.travelYear}
- Duration: ${input.duration}
- Travellers: ${travellersCount}
- Budget (per person): ${input.budgetPerPerson}
- Preferred Contact Time: ${input.availableTime || 'Anytime'}
${input.notes ? `- Notes: ${input.notes}` : ''}

NEED IMMEDIATE ASSISTANCE?
- Phone / WhatsApp: +84 988600388
- Email: info@vietnamtours.co.uk

Vietnam Tours — Curated Luxury Travel Across Vietnam & Indochina.
`;

  return { subject, html, text };
}

export function buildAdminNotificationEmail(
  input: EnquiryInput,
  leadId: string,
  name: string,
  phone: string,
  attribution: ForensicsResult
) {
  const safeName = escapeHtml(name);
  const safeDestinations = escapeHtml(input.destinations.join(', ') || 'None specified');
  const safeDuration = escapeHtml(input.duration || 'Not specified');
  const safeTiming = escapeHtml(`${input.travelMonth} ${input.travelYear}`.trim() || 'Flexible');
  const safeBudget = escapeHtml(input.budgetPerPerson || 'Custom');
  const safeNotes = escapeHtml(input.notes || 'None');
  const safeContactTime = escapeHtml(input.availableTime || 'Anytime');
  const travellersCount = `${input.adults} Adults, ${input.teens} Teens, ${input.children} Children`;

  const subject = `New Lead: ${name} — ${input.destinations.join(', ')} [Ref: ${leadId}]`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f3f4f6; padding: 20px; color: #111827;">
  <div style="max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 6px; overflow: hidden; border: 1px solid #d1d5db;">
    <div style="background-color: #0e1628; color: #ffffff; padding: 20px 24px;">
      <span style="background-color: #c5a880; color: #0e1628; font-size: 11px; font-weight: bold; text-transform: uppercase; padding: 3px 8px; border-radius: 3px;">
        New Lead
      </span>
      <h2 style="margin: 8px 0 4px 0; font-size: 20px;">${safeName}</h2>
      <p style="margin: 0; font-size: 13px; color: #9ca3af;">Reference: #${escapeHtml(leadId)}</p>
    </div>

    <div style="padding: 24px;">
      <!-- Contact Info -->
      <h3 style="font-size: 14px; text-transform: uppercase; color: #4b5563; margin: 0 0 10px 0; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px;">
        Contact Details
      </h3>
      <table style="width: 100%; margin-bottom: 20px; font-size: 14px;">
        <tr><td style="color: #6b7280; width: 35%; padding: 4px 0;">Name:</td><td style="font-weight: 600;">${safeName}</td></tr>
        <tr><td style="color: #6b7280; padding: 4px 0;">Email:</td><td><a href="mailto:${escapeHtml(input.email)}" style="color: #2563eb;">${escapeHtml(input.email)}</a></td></tr>
        <tr><td style="color: #6b7280; padding: 4px 0;">Phone:</td><td><a href="tel:${escapeHtml(phone)}" style="color: #2563eb;">${escapeHtml(phone)}</a></td></tr>
        <tr><td style="color: #6b7280; padding: 4px 0;">Available Time:</td><td>${safeContactTime}</td></tr>
      </table>

      <!-- Travel Preferences -->
      <h3 style="font-size: 14px; text-transform: uppercase; color: #4b5563; margin: 0 0 10px 0; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px;">
        Travel Preferences
      </h3>
      <table style="width: 100%; margin-bottom: 20px; font-size: 14px;">
        <tr><td style="color: #6b7280; width: 35%; padding: 4px 0;">Destinations:</td><td style="font-weight: 600;">${safeDestinations}</td></tr>
        <tr><td style="color: #6b7280; padding: 4px 0;">Timing:</td><td>${safeTiming}</td></tr>
        <tr><td style="color: #6b7280; padding: 4px 0;">Duration:</td><td>${safeDuration}</td></tr>
        <tr><td style="color: #6b7280; padding: 4px 0;">Party Size:</td><td>${travellersCount}</td></tr>
        <tr><td style="color: #6b7280; padding: 4px 0;">Budget/Person:</td><td>${safeBudget}</td></tr>
        <tr><td style="color: #6b7280; padding: 4px 0; vertical-align: top;">Notes/Request:</td><td style="line-height: 1.4;">${safeNotes}</td></tr>
      </table>

      <!-- Attribution & Traffic Forensic -->
      <h3 style="font-size: 14px; text-transform: uppercase; color: #4b5563; margin: 0 0 10px 0; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px;">
        Traffic &amp; Acquisition Forensics
      </h3>
      <table style="width: 100%; font-size: 13px; background-color: #f9fafb; padding: 12px; border: 1px solid #e5e7eb; border-radius: 4px;">
        <tr><td style="color: #6b7280; width: 35%; padding: 3px 0;">Source:</td><td><strong>${escapeHtml(attribution.source)}</strong> (${escapeHtml(attribution.channel)})</td></tr>
        <tr><td style="color: #6b7280; padding: 3px 0;">AI Traffic:</td><td>${attribution.isAi ? '<span style="color: #dc2626; font-weight: bold;">YES</span>' : 'No'}</td></tr>
        <tr><td style="color: #6b7280; padding: 3px 0;">Evidence:</td><td>${escapeHtml(attribution.evidence)}</td></tr>
        <tr><td style="color: #6b7280; padding: 3px 0;">Landing Page:</td><td style="word-break: break-all;">${escapeHtml(input.landingPage || '-')}</td></tr>
        <tr><td style="color: #6b7280; padding: 3px 0;">Referrer:</td><td style="word-break: break-all;">${escapeHtml(input.referrer || '-')}</td></tr>
        <tr><td style="color: #6b7280; padding: 3px 0;">UTM Source / Med / Cam:</td><td>${escapeHtml(input.utmSource || '-')} / ${escapeHtml(input.utmMedium || '-')} / ${escapeHtml(input.utmCampaign || '-')}</td></tr>
      </table>
    </div>
  </div>
</body>
</html>`;

  const text = `NEW VIETNAMTOURS LEAD [Ref: ${leadId}]
Name: ${name}
Email: ${input.email}
Phone: ${phone}
Available Time: ${input.availableTime || 'Anytime'}

DESTINATIONS: ${input.destinations.join(', ')}
TIMING: ${input.travelMonth} ${input.travelYear}
DURATION: ${input.duration}
PARTY SIZE: ${travellersCount}
BUDGET: ${input.budgetPerPerson}
NOTES: ${input.notes || 'None'}

ATTRIBUTION FORENSICS:
Source: ${attribution.source} (${attribution.channel})
AI Traffic: ${attribution.isAi ? 'YES' : 'NO'}
Evidence: ${attribution.evidence}
Landing Page: ${input.landingPage}
Referrer: ${input.referrer}
UTM: ${input.utmSource} / ${input.utmMedium} / ${input.utmCampaign}
`;

  return { subject, html, text };
}

export async function sendEnquiryViaResend(
  input: EnquiryInput,
  leadId: string,
  name: string,
  phone: string,
  attribution: ForensicsResult
): Promise<{ customerSent: boolean; adminSent: boolean; error?: string }> {
  if (!resend) {
    return { customerSent: false, adminSent: false, error: 'RESEND_API_KEY is not configured.' };
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || 'Vietnam Tours <concierge@vietnamtour.co.uk>';
  const replyTo = process.env.RESEND_REPLY_TO || 'info@vietnamtours.co.uk';
  const adminRecipient = process.env.NOTIFICATION_EMAIL || 'mywaytravelinc@gmail.com';

  const customerEmail = buildCustomerThankYouEmail(input, leadId);
  const adminEmail = buildAdminNotificationEmail(input, leadId, name, phone, attribution);

  let customerSent = false;
  let adminSent = false;
  let errorMsg = '';

  // 1. Send confirmation email to customer
  try {
    const customerRes = await resend.emails.send({
      from: fromEmail,
      to: [input.email],
      replyTo,
      subject: customerEmail.subject,
      html: customerEmail.html,
      text: customerEmail.text,
    });
    if (customerRes.error) {
      console.error('Resend customer email error:', customerRes.error);
      errorMsg = customerRes.error.message || 'Customer email error';
    } else {
      customerSent = true;
    }
  } catch (err: unknown) {
    console.error('Failed to dispatch customer email via Resend:', err);
    errorMsg = err instanceof Error ? err.message : String(err);
  }

  // 2. Send notification email to admin team
  try {
    const adminRes = await resend.emails.send({
      from: fromEmail,
      to: [adminRecipient],
      replyTo: input.email,
      subject: adminEmail.subject,
      html: adminEmail.html,
      text: adminEmail.text,
    });
    if (adminRes.error) {
      console.error('Resend admin notification error:', adminRes.error);
      if (!errorMsg) errorMsg = adminRes.error.message || 'Admin email error';
    } else {
      adminSent = true;
    }
  } catch (err: unknown) {
    console.error('Failed to dispatch admin email via Resend:', err);
    if (!errorMsg) errorMsg = err instanceof Error ? err.message : String(err);
  }

  return { customerSent, adminSent, error: errorMsg || undefined };
}
