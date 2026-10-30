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
  const safeFirstName = escapeHtml(input.firstName || 'Valued Traveller');
  const safeDestinations = escapeHtml(input.destinations.join(', ') || 'Vietnam');
  const safeDuration = escapeHtml(input.duration || 'Not specified');
  const safeTiming = escapeHtml(`${input.travelMonth} ${input.travelYear}`.trim() || 'Flexible');
  const safeBudget = escapeHtml(input.budgetPerPerson || 'Custom');
  const safeNotes = escapeHtml(input.notes || 'None specified');
  const safeContactTime = escapeHtml(input.availableTime || 'Anytime');
  const travellersCount = `${input.adults} Adults${input.teens ? `, ${input.teens} Teens` : ''}${input.children ? `, ${input.children} Children` : ''}`;

  const subject = `Thank you for your Vietnam travel enquiry — Vietnam Tours [Ref: ${leadId}]`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f5f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f5f7; padding: 30px 10px;">
    <tr>
      <td align="center">
        <!-- Main Email Container -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #0e1628; padding: 32px 24px; text-align: center; border-bottom: 2px solid #c5a880;">
              <span style="font-size: 11px; letter-spacing: 0.25em; color: #c5a880; font-weight: 700; text-transform: uppercase; display: block; margin-bottom: 6px;">
                Bespoke Luxury Travel
              </span>
              <h1 style="margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 26px; font-weight: 400; letter-spacing: 0.08em; color: #ffffff;">
                VIETNAM TOURS
              </h1>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 36px 32px 24px 32px;">
              <h2 style="margin: 0 0 16px 0; font-family: Georgia, 'Times New Roman', serif; font-size: 22px; font-weight: 400; color: #0e1628;">
                Thank You, ${safeFirstName}
              </h2>
              
              <div style="height: 2px; width: 44px; background-color: #c5a880; margin-bottom: 20px;"></div>

              <p style="font-size: 15px; line-height: 1.6; color: #4b5563; margin: 0 0 16px 0;">
                We are delighted to confirm that your enquiry for a tailor-made journey across Vietnam and Indochina has been received.
              </p>
              
              <p style="font-size: 15px; line-height: 1.6; color: #4b5563; margin: 0 0 24px 0;">
                Our private travel designers are already reviewing your preferences to handcraft an authentic, personalized itinerary. One of our destination specialists will reach out to you within <strong>24 hours</strong> with an initial travel proposal.
              </p>

              <!-- Reference Badge -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8fafc; border-left: 4px solid #c5a880; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 14px 16px;">
                    <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; font-weight: 600; display: block;">Enquiry Reference</span>
                    <strong style="font-size: 15px; color: #0e1628; letter-spacing: 0.03em;">#${escapeHtml(leadId)}</strong>
                  </td>
                </tr>
              </table>

              <!-- Journey Summary Card -->
              <h3 style="margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #0e1628; font-weight: 700;">
                Your Journey Summary
              </h3>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 4px; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 13px; color: #6b7280; width: 38%;">Destinations</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #111827; font-weight: 500;">${safeDestinations}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 13px; color: #6b7280;">Timing</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #111827; font-weight: 500;">${safeTiming}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 13px; color: #6b7280;">Duration</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #111827; font-weight: 500;">${safeDuration}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 13px; color: #6b7280;">Travellers</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #111827; font-weight: 500;">${travellersCount}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 13px; color: #6b7280;">Budget (per person)</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #111827; font-weight: 500;">${safeBudget}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 13px; color: #6b7280;">Preferred Contact Time</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #111827;">${safeContactTime}</td>
                </tr>
                ${safeNotes !== 'None specified' ? `
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; color: #6b7280; vertical-align: top;">Notes &amp; Interests</td>
                  <td style="padding: 12px 16px; font-size: 14px; color: #111827; line-height: 1.5;">${safeNotes}</td>
                </tr>
                ` : ''}
              </table>

              <!-- Next Steps -->
              <h3 style="margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #0e1628; font-weight: 700;">
                What Happens Next?
              </h3>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 28px;">
                <tr>
                  <td style="width: 28px; vertical-align: top; padding-bottom: 12px;">
                    <span style="display: inline-block; width: 22px; height: 22px; line-height: 22px; text-align: center; border-radius: 50%; background-color: #0e1628; color: #c5a880; font-size: 12px; font-weight: bold;">1</span>
                  </td>
                  <td style="padding-bottom: 12px; font-size: 14px; color: #4b5563; line-height: 1.5;">
                    <strong style="color: #111827;">Itinerary Curation:</strong> Our specialist selects authentic heritage experiences, private guides, and boutique stays based on your dates.
                  </td>
                </tr>
                <tr>
                  <td style="width: 28px; vertical-align: top; padding-bottom: 12px;">
                    <span style="display: inline-block; width: 22px; height: 22px; line-height: 22px; text-align: center; border-radius: 50%; background-color: #0e1628; color: #c5a880; font-size: 12px; font-weight: bold;">2</span>
                  </td>
                  <td style="padding-bottom: 12px; font-size: 14px; color: #4b5563; line-height: 1.5;">
                    <strong style="color: #111827;">Direct Consultation:</strong> We share your interactive proposal by email or phone at your preferred time.
                  </td>
                </tr>
                <tr>
                  <td style="width: 28px; vertical-align: top;">
                    <span style="display: inline-block; width: 22px; height: 22px; line-height: 22px; text-align: center; border-radius: 50%; background-color: #0e1628; color: #c5a880; font-size: 12px; font-weight: bold;">3</span>
                  </td>
                  <td style="font-size: 14px; color: #4b5563; line-height: 1.5;">
                    <strong style="color: #111827;">Fine-Tuning:</strong> Adjust, customize, and finalize every detail before any commitment.
                  </td>
                </tr>
              </table>

              <!-- Assistance Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f1f5f9; border-radius: 4px; margin-bottom: 12px;">
                <tr>
                  <td style="padding: 16px 20px; font-size: 13px; color: #475569; line-height: 1.5;">
                    <strong style="color: #0f172a; display: block; margin-bottom: 4px;">Need immediate assistance?</strong>
                    Speak directly with our concierge team on <a href="tel:+84988600388" style="color: #0e1628; font-weight: 600; text-decoration: underline;">+84 988600388</a> (Phone / WhatsApp) or email <a href="mailto:info@vietnamtours.co.uk" style="color: #0e1628; font-weight: 600; text-decoration: underline;">info@vietnamtours.co.uk</a>.
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0e1628; padding: 24px; text-align: center; color: #94a3b8; font-size: 12px; line-height: 1.6;">
              <p style="margin: 0 0 6px 0; color: #e2e8f0; font-size: 13px; font-weight: 500;">
                Vietnam Tours — Bespoke Luxury Journeys
              </p>
              <p style="margin: 0 0 10px 0;">
                Curated Private Travel &amp; Heritage Tours Across Vietnam &amp; Indochina
              </p>
              <p style="margin: 0; color: #64748b; font-size: 11px;">
                &copy; ${new Date().getFullYear()} Vietnam Tours. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = `VIETNAM TOURS — BESPOKE LUXURY TRAVEL
Thank you, ${safeName}

We have received your enquiry for a tailor-made journey across Vietnam and Indochina.
Our private travel specialists are reviewing your request and will be in touch within 24 hours with an initial travel proposal.

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
