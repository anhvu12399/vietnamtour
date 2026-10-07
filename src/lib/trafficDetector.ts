export interface ForensicsResult {
  source: string;
  channel: 'ai' | 'organic' | 'cpc' | 'referral' | 'direct';
  isAi: boolean;
  confidence: number;
  signals: string[];
}

export function detectTrafficSource(
  referrer: string = '',
  utmSource: string = '',
  messageText: string = '',
  landingPage: string = ''
): ForensicsResult {
  const refLower = (referrer + ' ' + utmSource).toLowerCase();
  const text = messageText.trim();
  const signals: string[] = [];

  // ── 1. Referrer / UTM URL checks ──
  if (refLower.includes('chatgpt.com') || refLower.includes('openai.com') || refLower.includes('chat.openai')) {
    return {
      source: '🤖 ChatGPT (URL vào)',
      channel: 'ai',
      isAi: true,
      confidence: 100,
      signals: [`Click link trực tiếp từ ChatGPT (${referrer || utmSource})`],
    };
  }

  if (refLower.includes('gemini.google.com') || refLower.includes('bard.google.com')) {
    return {
      source: '🔵 Google Gemini (URL vào)',
      channel: 'ai',
      isAi: true,
      confidence: 100,
      signals: [`Click link trực tiếp từ Google Gemini (${referrer || utmSource})`],
    };
  }

  if (refLower.includes('perplexity.ai')) {
    return {
      source: '🧭 Perplexity AI (URL vào)',
      channel: 'ai',
      isAi: true,
      confidence: 100,
      signals: [`Click từ trích dẫn Perplexity AI (${referrer || utmSource})`],
    };
  }

  if (refLower.includes('claude.ai')) {
    return {
      source: '🟡 Claude AI (URL vào)',
      channel: 'ai',
      isAi: true,
      confidence: 100,
      signals: [`Click link trực tiếp từ Claude AI (${referrer || utmSource})`],
    };
  }

  if (refLower.includes('copilot.microsoft.com')) {
    return {
      source: '🟣 MS Copilot (URL vào)',
      channel: 'ai',
      isAi: true,
      confidence: 100,
      signals: [`Click link từ Microsoft Copilot (${referrer || utmSource})`],
    };
  }

  if (refLower.includes('tripadvisor')) {
    return {
      source: '🦉 Tripadvisor (Click Link)',
      channel: 'referral',
      isAi: false,
      confidence: 100,
      signals: [`Click link từ Tripadvisor (${referrer})`],
    };
  }

  if (refLower.includes('google.') || refLower.includes('gclid')) {
    const isPaid = refLower.includes('gclid') || refLower.includes('cpc') || refLower.includes('ads');
    return {
      source: isPaid ? '🎯 Google Ads (CPC)' : '🔍 Google Search (Organic)',
      channel: isPaid ? 'cpc' : 'organic',
      isAi: false,
      confidence: 100,
      signals: [`Tìm kiếm và click vào từ Google (${referrer || 'gclid detected'})`],
    };
  }

  if (refLower.includes('bing.com')) {
    return {
      source: '🔎 Bing Search',
      channel: 'organic',
      isAi: false,
      confidence: 95,
      signals: [`Click từ kết quả tìm kiếm Bing (${referrer})`],
    };
  }

  // ── 2. Content & Text Forensics Signatures (Khách copy từ AI sang) ──

  // 2.1 Bảng Markdown (| Day | Destination |)
  const pipeCount = (text.match(/\|/g) || []).length;
  // Emoji cờ quốc gia
  const flagMatches = text.match(/[\uD83C][\uDDE6-\uDDFF][\uD83C][\uDDE6-\uDDFF]/g);
  const flagCount = flagMatches ? flagMatches.length : 0;
  // In đậm Markdown **...**
  const hasBold = /\*\*[^*]+\*\*/.test(text);

  // Câu mở đầu prompt AI điển hình
  const hasAiPrompt =
    /please let me know if this (suggested )?itinerary is possible/i.test(text) ||
    /\b(as an ai|language model|here is (a|the) (recommended|suggested)|suggested itinerary)\b/i.test(text);

  // Perplexity citation footnotes [1], [2]
  const hasPerplexityCitations = /\[\d+\]/.test(text);

  if (hasPerplexityCitations) {
    signals.push('Dấu trích dẫn nguồn số hóa đặc trưng Perplexity AI [1], [2]');
  }

  if (pipeCount >= 4) {
    signals.push(`Cấu trúc bảng phân bổ lịch trình AI (${pipeCount} ký tự '|')`);
  }
  if (flagCount > 0) {
    signals.push(`Emoji cờ quốc gia tự động (${flagCount} cờ)`);
  }
  if (hasBold) {
    signals.push('Cú pháp in đậm Markdown (**City/Day**)');
  }
  if (hasAiPrompt) {
    signals.push('Cụm từ prompt chatbot AI đặc trưng');
  }

  if (hasAiPrompt || (pipeCount >= 4 && (flagCount > 0 || hasBold)) || hasPerplexityCitations) {
    return {
      source: hasPerplexityCitations ? '🧭 Perplexity AI (Nội dung)' : '🤖 ChatGPT / AI Chatbot (Nội dung)',
      channel: 'ai',
      isAi: true,
      confidence: 98,
      signals,
    };
  }

  // 2.2 Tripadvisor review mention trong text
  if (/\b(tripadvisor|trip\s*advisor|ta\s*review|saw you on tripadvisor)\b/i.test(text)) {
    return {
      source: '🦉 Tripadvisor (Đánh giá)',
      channel: 'referral',
      isAi: false,
      confidence: 95,
      signals: ['Khách nhắc đến đánh giá trên Tripadvisor trong tin nhắn'],
    };
  }

  // 2.3 Người quen giới thiệu (Word-of-mouth)
  if (/\b(recommended by|referred by|heard from|friend recommend)\b/i.test(text)) {
    return {
      source: '🤝 Người quen giới thiệu',
      channel: 'referral',
      isAi: false,
      confidence: 95,
      signals: ['Khách nhắc đến được bạn bè / đối tác giới thiệu'],
    };
  }

  // ── 3. Referral Website khác ──
  if (referrer && referrer.startsWith('http') && !referrer.includes('vietnamtours.co.uk')) {
    try {
      const host = new URL(referrer).hostname;
      return {
        source: `🌐 ${host}`,
        channel: 'referral',
        isAi: false,
        confidence: 90,
        signals: [`Khách chuyển tiếp từ website đối tác: ${referrer}`],
      };
    } catch {
      // ignore url error
    }
  }

  // ── 4. Default: Direct / Tự nhập tên miền ──
  return {
    source: '👤 Direct (Vào trực tiếp / Bookmark)',
    channel: 'direct',
    isAi: false,
    confidence: 85,
    signals: ['Khách tự nhập tên miền hoặc mở từ bookmark vào web'],
  };
}
