// Detects whether a visit came from an AI assistant / answer engine.

/** Hostnames of AI assistants / answer engines, matched as suffix of the referrer host. */
const AI_HOSTS: Record<string, string> = {
  'chatgpt.com': 'ChatGPT',
  'chat.openai.com': 'ChatGPT',
  'openai.com': 'ChatGPT',
  'perplexity.ai': 'Perplexity',
  'claude.ai': 'Claude',
  'gemini.google.com': 'Gemini',
  'copilot.microsoft.com': 'Copilot',
  'you.com': 'You.com',
  'phind.com': 'Phind',
  'kagi.com': 'Kagi',
  'duckduckgo.com/aichat': 'DuckDuckGo AI',
};

/** ChatGPT appends utm_source=chatgpt.com to outbound links. */
const AI_UTM: Record<string, string> = {
  'chatgpt.com': 'ChatGPT',
  chatgpt: 'ChatGPT',
  openai: 'ChatGPT',
  perplexity: 'Perplexity',
  claude: 'Claude',
  gemini: 'Gemini',
  copilot: 'Copilot',
};

export function detectAiSource(referrer: string, utmSource: string): string | null {
  const utm = utmSource.toLowerCase();
  for (const [key, label] of Object.entries(AI_UTM)) {
    if (utm.includes(key)) return label;
  }
  if (!referrer) return null;
  let host = '';
  try {
    host = new URL(referrer).hostname.toLowerCase();
  } catch {
    return null;
  }
  for (const [key, label] of Object.entries(AI_HOSTS)) {
    const h = key.split('/')[0];
    if (host === h || host.endsWith(`.${h}`)) return label;
  }
  return null;
}
