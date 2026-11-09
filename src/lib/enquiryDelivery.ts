export interface EnquiryInput {
  submissionId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  phoneCode: string;
  destinations: string[];
  travelMonth: string;
  travelYear: string;
  duration: string;
  adults: number;
  teens: number;
  children: number;
  budgetPerPerson: string;
  notes: string;
  style: string;
  availableTime: string;
  referrer: string;
  landingPage: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  interest: string;
}

export function parseEnquiry(value: unknown): EnquiryInput | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const body = value as Record<string, unknown>;
  const read = (key: string, max = 200) => typeof body[key] === 'string' ? body[key].trim().slice(0, max) : '';
  const count = (key: string, fallback: number) => body[key] === undefined ? fallback : Number(body[key]);
  const input: EnquiryInput = {
    submissionId: read('submissionId'), firstName: read('firstName'), lastName: read('lastName'),
    email: read('email', 254), phone: read('phone', 50), phoneCode: read('phoneCode', 10),
    destinations: Array.isArray(body.destinations) ? body.destinations.filter((v): v is string => typeof v === 'string').slice(0, 20).map((v) => v.slice(0, 200)) : [read('destination')].filter(Boolean),
    travelMonth: read('travelMonth'), travelYear: read('travelYear'), duration: read('duration'),
    adults: count('adults', 2), teens: count('teens', 0), children: count('children', 0),
    budgetPerPerson: read('budgetPerPerson'), notes: read('notes', 10000), style: read('style'), availableTime: read('availableTime'),
    referrer: read('referrer', 2048), landingPage: read('landingPage', 500), utmSource: read('utmSource'),
    utmMedium: read('utmMedium'), utmCampaign: read('utmCampaign'), interest: read('interest', 300),
  };
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(input.submissionId)) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) return null;
  if (input.phone && input.phone.replace(/\D/g, '').length < 7) return null;
  if ([input.adults, input.teens, input.children].some((n) => !Number.isInteger(n) || n < 0 || n > 100) || input.adults < 1) return null;
  return input;
}

export interface DeliveryDependencies {
  save: () => Promise<{ id: string; created: boolean } | null>;
  forwardEmail: () => Promise<boolean>;
}

export async function deliverEnquiry(dependencies: DeliveryDependencies) {
  let saved: { id: string; created: boolean } | null = null;
  try { saved = await dependencies.save(); } catch { /* Try the independent email channel. */ }
  // A retry of a stored lead must not generate another notification.
  if (saved && !saved.created) return { accepted: true, leadId: saved.id, duplicate: true, emailed: false };
  let emailed = false;
  try { emailed = await dependencies.forwardEmail(); } catch { /* The stored lead remains accepted. */ }
  return { accepted: !!saved || emailed, leadId: saved?.id || null, duplicate: false, emailed };
}

export function emailAcknowledged(httpOk: boolean, body: unknown): boolean {
  if (!httpOk || !body || typeof body !== 'object') return false;
  const success = (body as Record<string, unknown>).success;
  return success === true || success === 'true';
}

export function canStoreEnquiry(datasetName: string | undefined, datasets: { name: string; aclMode?: string }[]): boolean {
  return !!datasetName && datasets.some((dataset) => dataset.name === datasetName && dataset.aclMode === 'private');
}
