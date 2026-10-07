#!/usr/bin/env node
// Full sitemap URL audit script
// Checks: HTTP status, redirect, X-Robots-Tag, canonical, meta robots via regex in raw HTML

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';

const urls = readFileSync('/tmp/sitemap_urls.txt', 'utf8').trim().split('\n');

const UA_GOOGLEBOT = 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.85 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
const UA_BROWSER = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36';

function curlCheck(url, ua) {
  try {
    const cmd = `curl -sI -L --max-redirs 5 -A "${ua}" "${url}" 2>/dev/null`;
    const headers = execSync(cmd, { timeout: 10000, encoding: 'utf8' });
    
    // Get status codes along redirect chain
    const statusLines = headers.match(/^HTTP\/[\d.]+ (\d+)/gm) || [];
    const finalStatus = statusLines.length ? statusLines[statusLines.length - 1].match(/(\d+)/)[1] : '???';
    const firstStatus = statusLines.length ? statusLines[0].match(/(\d+)/)[1] : '???';
    
    // Get final location after redirects
    const locationMatches = headers.match(/^[Ll]ocation:\s*(.+)/gm) || [];
    const finalLocation = locationMatches.length ? locationMatches[locationMatches.length - 1].replace(/^[Ll]ocation:\s*/, '').trim() : '';
    
    // X-Robots-Tag
    const xRobotsMatch = headers.match(/x-robots-tag:\s*([^\r\n]+)/i);
    const xRobots = xRobotsMatch ? xRobotsMatch[1].trim() : '';
    
    return { finalStatus, firstStatus, finalLocation, xRobots, redirectChain: statusLines.length - 1 };
  } catch (e) {
    return { finalStatus: 'TIMEOUT', firstStatus: 'TIMEOUT', finalLocation: '', xRobots: '', redirectChain: 0 };
  }
}

function curlBody(url, ua) {
  try {
    const cmd = `curl -s -L --max-redirs 5 -A "${ua}" "${url}" 2>/dev/null`;
    const body = execSync(cmd, { timeout: 15000, encoding: 'utf8' });
    
    // Extract meta robots
    const metaRobotsMatch = body.match(/<meta[^>]+name=["']robots["'][^>]*content=["']([^"']+)["']/i);
    const metaRobots = metaRobotsMatch ? metaRobotsMatch[1].toLowerCase() : '';
    
    // Extract canonical
    const canonicalMatch = body.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
    const canonical = canonicalMatch ? canonicalMatch[1].trim() : '';
    
    // Detect soft 404 patterns
    const bodyLower = body.toLowerCase();
    const hasSoft404 = bodyLower.includes('page not found') || bodyLower.includes('404') || bodyLower.includes('not found') && body.length < 3000;
    
    // Content length (proxy for thin content)
    const contentLen = body.length;
    
    // Check for JSON-LD structured data
    const hasJsonLd = body.includes('application/ld+json');
    
    // Detect <h1>
    const h1Match = body.match(/<h1[^>]*>([^<]{1,80})/i);
    const h1 = h1Match ? h1Match[1].trim() : '';

    return { metaRobots, canonical, hasSoft404, contentLen, hasJsonLd, h1 };
  } catch (e) {
    return { metaRobots: 'TIMEOUT', canonical: '', hasSoft404: false, contentLen: 0, hasJsonLd: false, h1: '' };
  }
}

const results = [];
let i = 0;
for (const url of urls) {
  i++;
  process.stderr.write(`[${i}/${urls.length}] ${url}\n`);
  
  const gbHeaders = curlCheck(url, UA_GOOGLEBOT);
  const body = curlBody(url, UA_GOOGLEBOT);
  
  results.push({
    url,
    httpStatus: gbHeaders.finalStatus,
    firstStatus: gbHeaders.firstStatus,
    redirectCount: gbHeaders.redirectChain,
    finalLocation: gbHeaders.finalLocation,
    xRobotsTag: gbHeaders.xRobots,
    metaRobots: body.metaRobots,
    canonical: body.canonical,
    selfCanonical: body.canonical === url,
    hasSoft404: body.hasSoft404,
    contentLen: body.contentLen,
    hasJsonLd: body.hasJsonLd,
    h1: body.h1,
  });
}

// Output as JSON
writeFileSync('/tmp/audit_results.json', JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
