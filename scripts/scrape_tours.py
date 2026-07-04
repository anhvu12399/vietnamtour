import urllib.request
import ssl
import re
import os
import json
import time
import random
from bs4 import BeautifulSoup

# Setup SSL bypass
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36'}
DATA_FILE = 'src/lib/tours_data.json'

def fetch_html(url, retries=3, delay=10):
    for i in range(retries):
        try:
            req = urllib.request.Request(url, headers=HEADERS)
            with urllib.request.urlopen(req, context=ctx, timeout=20) as response:
                return response.read()
        except Exception as e:
            print(f"Attempt {i+1} failed for {url}: {e}")
            if i < retries - 1:
                sleep_time = delay + random.randint(2, 5)
                print(f"Sleeping for {sleep_time}s before retrying...")
                time.sleep(sleep_time)
            else:
                return None

def parse_listing_page():
    print("Fetching listing page to find tour URLs...")
    main_url = "https://web.archive.org/web/20190826032212/https://www.buffalotours.com/tailor-made-vietnam-tours/"
    html = fetch_html(main_url, retries=4, delay=15)
    if not html:
        return []
    
    soup = BeautifulSoup(html, 'html.parser')
    links = []
    
    # We want to extract links that go to individual tours
    for a in soup.find_all('a', href=True):
        href = a['href']
        if '/tailor-made-vietnam-tours/' in href and not href.endswith('/tailor-made-vietnam-tours/') and '#' not in href:
            if not href.startswith('http'):
                href = "https://web.archive.org" + href
            
            # Normalize URL to ensure it is in the listing
            match = re.search(r'/tailor-made-vietnam-tours/([^/]+)/?$', href)
            if match:
                slug = match.group(1)
                if slug in ['1-day', '2-5-days', '6-12-days', '13-days']:
                    continue
                if (href, slug) not in links:
                    links.append((href, slug))
                    
    print(f"Found {len(links)} unique tour URLs.")
    return links

def parse_tour_page(url, slug):
    print(f"Scraping tour details from: {url}")
    html = fetch_html(url, retries=3, delay=12)
    if not html:
        return None
        
    soup = BeautifulSoup(html, 'html.parser')
    
    # Title
    title = ""
    title_tag = soup.find('h1')
    if title_tag:
        title = title_tag.get_text(strip=True)
    if not title and soup.title:
        title = soup.title.string.split('|')[0].strip()
        
    # Duration
    duration = 1
    duration_text = ""
    text_content = soup.get_text()
    match_days_nights = re.search(r'(\d+)\s*Days?\s*/\s*(\d+)\s*Nights?', text_content, re.IGNORECASE)
    match_days_only = re.search(r'(\d+)\s*Days?', text_content, re.IGNORECASE)
    
    if match_days_nights:
        duration_text = match_days_nights.group(0)
        duration = int(match_days_nights.group(1))
    elif match_days_only:
        duration_text = match_days_only.group(0)
        duration = int(match_days_only.group(1))
    else:
        subtitle = soup.find('p', class_='lead')
        if subtitle:
            match = re.search(r'(\d+)\s*day', subtitle.get_text(), re.IGNORECASE)
            if match:
                duration = int(match.group(1))
                duration_text = f"{duration} Days"
                
    if not duration_text:
        duration_text = f"{duration} Days"
        
    # Intro / Description
    intro = ""
    intro_tag = soup.find('div', class_='intro-content')
    if not intro_tag:
        intro_tag = soup.find('p', class_='lead')
    if not intro_tag:
        for p in soup.find_all('p'):
            p_text = p.get_text(strip=True)
            if len(p_text) > 100 and not p_text.startswith('JOURNEY') and not p_text.startswith('TOUR'):
                intro = p_text
                break
    else:
        intro = intro_tag.get_text(strip=True)
        
    if not intro:
        intro = f"Experience the incredible sights, sounds, and flavors on this tailor-made tour through Vietnam."
        
    # Highlights & Inclusions
    highlights = []
    inclusions = []
    
    headings = soup.find_all(['h3', 'h4', 'h2', 'strong'])
    for h in headings:
        h_text = h.get_text(strip=True).upper()
        if 'HIGHLIGHTS' in h_text:
            sibling = h.find_next()
            while sibling and sibling.name not in ['h2', 'h3', 'h4']:
                if sibling.name == 'ul':
                    highlights = [li.get_text(strip=True) for li in sibling.find_all('li')]
                    break
                sibling = sibling.next_sibling
        elif 'INCLUSIONS' in h_text:
            sibling = h.find_next()
            while sibling and sibling.name not in ['h2', 'h3', 'h4']:
                if sibling.name == 'ul':
                    inclusions = [li.get_text(strip=True) for li in sibling.find_all('li')]
                    break
                sibling = sibling.next_sibling
                
    if not highlights:
        highlights = [
            f"Handcrafted custom itinerary exploring the best of {title}.",
            "Private guided excursions with experienced English-speaking specialists.",
            "Handpicked luxury accommodations matching your personal style.",
            "Seamless private transfers and dedicated ground concierge services."
        ]
        
    # Timeline
    timeline = []
    panels = soup.find_all('div', class_=re.compile(r'panel|accordion-group', re.I))
    
    for panel in panels:
        day_title_tag = panel.find('h3', class_='visible-print')
        if not day_title_tag:
            day_title_tag = panel.find('h4', class_='panel-title')
            
        if not day_title_tag:
            continue
            
        day_title_text = day_title_tag.get_text(strip=True)
        day_match = re.search(r'^(DAY\s+\d+(?:-\d+)?)\s*[:-]?\s*(.*)$', day_title_text, re.IGNORECASE)
        
        day_range = "Day 1"
        day_title = day_title_text
        if day_match:
            day_range = day_match.group(1).title()
            day_title = day_match.group(2).strip()
            
        desc_div = panel.find('div', class_=re.compile(r'panel-collapse|collapse', re.I))
        desc_paragraphs = []
        accommodation = "Luxury Selected Hotel"
        
        if desc_div:
            for p in desc_div.find_all('p'):
                p_text = p.get_text(strip=True)
                if not p_text:
                    continue
                acc_match = re.search(r'^(?:Accommodation|Overnight|Stay\s+at)\s*[:-]\s*(.*)$', p_text, re.IGNORECASE)
                if acc_match:
                    accommodation = acc_match.group(1).strip()
                else:
                    if not p_text.startswith('[') and not p_text.endswith(']'):
                        desc_paragraphs.append(p_text)
                        
        if not desc_paragraphs:
            desc_paragraphs = [f"Enjoy your day exploring the beautiful highlights of {day_title} on your custom itinerary."]
            
        timeline.append({
            'dayRange': day_range,
            'title': day_title,
            'description': desc_paragraphs,
            'accommodation': accommodation
        })
        
    def get_day_num(t):
        match = re.search(r'\d+', t['dayRange'])
        return int(match.group(0)) if match else 999
        
    timeline.sort(key=get_day_num)
    price_from = duration * 350 + 1500
    
    return {
        'title': title,
        'slug': slug,
        'duration': duration,
        'durationText': duration_text,
        'priceFrom': price_from,
        'intro': intro,
        'highlights': highlights,
        'inclusions': inclusions,
        'timeline': timeline
    }

def main():
    scraped_tours = {}
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, 'r') as f:
                scraped_tours = json.load(f)
            print(f"Loaded {len(scraped_tours)} already scraped tours.")
        except Exception as e:
            print("Error reading data file:", e)
            
    links = parse_listing_page()
    if not links:
        print("No tour links found. Exiting.")
        return
        
    success_count = 0
    for idx, (url, slug) in enumerate(links, 1):
        if slug in scraped_tours:
            print(f"[{idx}/{len(links)}] Skipping {slug} (already scraped)")
            continue
            
        tour_data = parse_tour_page(url, slug)
        if tour_data:
            scraped_tours[slug] = tour_data
            success_count += 1
            
            with open(DATA_FILE, 'w') as f:
                json.dump(scraped_tours, f, indent=2)
                
            print(f"[{idx}/{len(links)}] Scraped and saved: {tour_data['title']}")
            
            # Larger sleep to avoid blocks
            sleep_time = 7 + random.randint(3, 8)
            print(f"Sleeping for {sleep_time}s before next tour...")
            time.sleep(sleep_time)
        else:
            print(f"[{idx}/{len(links)}] Failed to scrape: {slug}")
            
    print(f"\nScraping session finished. Successfully scraped {success_count} tours. Total tours in database: {len(scraped_tours)}")

if __name__ == '__main__':
    main()
