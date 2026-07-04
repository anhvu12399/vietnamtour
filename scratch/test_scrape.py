import urllib.request
import re
import ssl
from bs4 import BeautifulSoup

url = "https://web.archive.org/web/20190826032212/https://www.buffalotours.com/tailor-made-vietnam-tours/highlights-of-vietnam-tour/"
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}

# Ignore SSL certificate verification
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

try:
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, context=ctx) as response:
        html = response.read()
        
    soup = BeautifulSoup(html, 'html.parser')
    
    print("Page Title:", soup.title.string if soup.title else "No title")
    
    # Let's inspect headings
    # Typically, the day accordions use classes like 'panel-title' or headers inside an accordion div
    # Let's search for "DAY 1" or tags that represent day headers
    print("\n--- Day Accordions Check ---")
    accordion_elements = soup.select('.panel-title a, .accordion-toggle, h3, h4')
    found_days = []
    for el in accordion_elements:
        text = el.get_text(strip=True)
        if "day" in text.lower() or "day 1" in text.lower():
            found_days.append((text, el.name, el.get('class'), el.get('href')))
            
    for f in found_days[:15]:
        print(f)

    # Let's see some raw text to find where the itinerary details are
    print("\n--- Content container check ---")
    # Find divs with class itinerary or similar
    itinerary_divs = soup.find_all('div', class_=re.compile(r'itinerary|accordion|panel', re.I))
    print(f"Found {len(itinerary_divs)} divs with itinerary/accordion/panel in class name")
    
except Exception as e:
    print("Error:", e)
