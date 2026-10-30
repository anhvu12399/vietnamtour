export interface ForensicsResult {
  source: string;
  channel: 'ai' | 'organic' | 'cpc' | 'referral' | 'unknown';
  isAi: boolean;
  evidence: 'observed_referral' | 'campaign' | 'unknown';
  signals: string[];
  contentHints: string[];
}

const aiSources = [
  { name: 'ChatGPT', hosts: ['chatgpt.com', 'chat.openai.com'], aliases: ['chatgpt', 'openai'] },
  { name: 'Gemini', hosts: ['gemini.google.com', 'bard.google.com'], aliases: ['gemini', 'google-gemini'] },
  { name: 'Perplexity', hosts: ['perplexity.ai'], aliases: ['perplexity'] },
  { name: 'Claude', hosts: ['claude.ai'], aliases: ['claude'] },
  { name: 'Copilot', hosts: ['copilot.microsoft.com'], aliases: ['copilot', 'microsoft-copilot'] },
];
const matchesHost = (host: string, expected: string) => host === expected || host.endsWith(`.${expected}`);
function hostname(value: string): string {
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) ? url.hostname.toLowerCase().replace(/^www\./, '') : '';
  } catch { return ''; }
}

export function detectTrafficSource(
  referrer = '', utmSource = '', messageText = '', _landingPage = '', utmMedium = ''
): ForensicsResult {
  void _landingPage; // Retained for compatibility; landing pages do not establish acquisition.
  const host = hostname(referrer);
  const campaign = utmSource.trim().toLowerCase();
  const campaignHost = hostname(campaign);
  const contentHints = /\[\d+\]|\*\*[^*]+\*\*|\|.*\|/.test(messageText)
    ? ['Formatted itinerary text supplied; this does not identify the acquisition source.'] : [];
  const result = (source: string, channel: ForensicsResult['channel'], evidence: ForensicsResult['evidence'], signal: string): ForensicsResult => ({
    source, channel, isAi: channel === 'ai', evidence, signals: [signal], contentHints,
  });
  if (/^(cpc|ppc|paid|paidsearch|paid_search)$/i.test(utmMedium.trim())) {
    return result(campaign || 'Paid campaign', 'cpc', 'campaign', 'Paid campaign medium supplied.');
  }
  // Campaign tags are recorded evidence, not proof of the sender's identity.
  for (const ai of aiSources) {
    if (campaign && (ai.aliases.includes(campaign) || ai.hosts.some((h) => matchesHost(campaignHost || campaign, h)))) {
      return result(ai.name, 'ai', 'campaign', `Campaign source: ${campaign}`);
    }
  }
  for (const ai of aiSources) {
    if (ai.hosts.some((h) => matchesHost(host, h))) return result(ai.name, 'ai', 'observed_referral', `Referrer hostname: ${host}`);
  }
  const searchHosts = ['google.com', 'google.co.uk', 'google.com.vn', 'google.de', 'google.fr', 'google.com.au', 'bing.com', 'search.yahoo.com', 'duckduckgo.com'];
  if (searchHosts.some((h) => matchesHost(host, h))) return result(host, 'organic', 'observed_referral', `Search referrer: ${host}; AI features cannot be separated from this signal.`);
  if (campaign) return result(campaign.slice(0, 100), 'referral', 'campaign', `Campaign source: ${campaign.slice(0, 100)}`);
  if (host && !matchesHost(host, 'vietnamtours.co.uk') && !['localhost', '127.0.0.1'].includes(host)) {
    return result(host, 'referral', 'observed_referral', `Referrer hostname: ${host}`);
  }
  return result('Direct / unknown', 'unknown', 'unknown', 'No external referral or campaign was observed.');
}
