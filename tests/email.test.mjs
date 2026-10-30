import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const resendPath = new URL('../node_modules/resend/dist/index.mjs', import.meta.url).href;

async function moduleFrom(path) {
  let source = await readFile(new URL(`../${path}`, import.meta.url), 'utf8');
  source = source.replace(/from 'resend'/g, `from '${resendPath}'`);
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  return import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'));
}

const { buildCustomerThankYouEmail, buildAdminNotificationEmail, sendEnquiryViaResend } = await moduleFrom('src/lib/emailService.ts');

const sampleInput = {
  submissionId: '12345678-1234-4567-8901-123456789012',
  firstName: 'Oliver',
  lastName: 'Smith',
  email: 'oliver.smith@example.co.uk',
  phone: '07123456789',
  phoneCode: '+44',
  destinations: ['Hanoi & The North', 'Central Heritage (Hoi An)'],
  travelMonth: 'November',
  travelYear: '2026',
  duration: '14 Days',
  adults: 2,
  teens: 1,
  children: 0,
  budgetPerPerson: '£5,000 - £8,000 per person',
  notes: 'Interested in bespoke cooking class in Hoi An and private Halong bay cruise.',
  style: 'Luxury Boutique',
  availableTime: 'Afternoons (UK time)',
  referrer: 'https://google.co.uk',
  landingPage: 'https://vietnamtour.co.uk/itineraries/signature-vietnam',
  utmSource: 'google',
  utmMedium: 'organic',
  utmCampaign: '',
  interest: 'Signature Vietnam Itinerary',
};

const sampleAttribution = {
  source: 'google.co.uk',
  channel: 'organic',
  isAi: false,
  evidence: 'observed_referral',
  signals: ['Search referrer: google.co.uk'],
  contentHints: [],
};

test('Customer confirmation email contains greeting, leadId, and trip preferences', () => {
  const email = buildCustomerThankYouEmail(sampleInput, 'enquiry-12345678-1234-4567-8901-123456789012');

  assert.match(email.subject, /Thank you for your Vietnam travel enquiry/);
  assert.match(email.subject, /enquiry-12345678-1234-4567-8901-123456789012/);
  assert.match(email.html, /Oliver/);
  assert.match(email.html, /Hanoi &amp; The North/);
  assert.match(email.html, /2 Adults, 1 Teens/);
  assert.match(email.html, /November 2026/);
  assert.match(email.html, /&pound;5,000 - &pound;8,000 per person|£5,000 - £8,000 per person/);
  assert.match(email.html, /\+84 988600388/);
  assert.match(email.text, /Oliver Smith/);
  assert.match(email.text, /Hanoi & The North/);
});

test('Admin notification email contains full contact details and traffic forensics', () => {
  const email = buildAdminNotificationEmail(
    sampleInput,
    'enquiry-12345678-1234-4567-8901-123456789012',
    'Oliver Smith',
    '+44 07123456789',
    sampleAttribution
  );

  assert.match(email.subject, /New Lead: Oliver Smith/);
  assert.match(email.html, /oliver\.smith@example\.co\.uk/);
  assert.match(email.html, /\+44 07123456789/);
  assert.match(email.html, /google\.co\.uk/);
  assert.match(email.html, /organic/);
  assert.match(email.text, /Oliver Smith/);
  assert.match(email.text, /Traffic & Acquisition Forensics|ATTRIBUTION FORENSICS/);
});

test('sendEnquiryViaResend reports error when RESEND_API_KEY is unset', async () => {
  const res = await sendEnquiryViaResend(
    sampleInput,
    'enquiry-123',
    'Oliver Smith',
    '+44 07123456789',
    sampleAttribution
  );
  assert.equal(res.customerSent, false);
  assert.equal(res.adminSent, false);
  assert.match(res.error || '', /RESEND_API_KEY/);
});
