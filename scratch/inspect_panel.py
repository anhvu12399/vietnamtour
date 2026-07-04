import urllib.request
import ssl
from bs4 import BeautifulSoup

url = "https://web.archive.org/web/20190826032212/https://www.buffalotours.com/tailor-made-vietnam-tours/highlights-of-vietnam-tour/"
headers = {'User-Agent': 'Mozilla/5.0'}

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

try:
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, context=ctx) as response:
        html = response.read()
        
    soup = BeautifulSoup(html, 'html.parser')
    
    # Print the outer HTML of the first panel-default div
    panel = soup.find('div', class_='panel')
    if panel:
        print("--- Panel HTML snippet ---")
        print(panel.prettify()[:1500]) # Print first 1500 chars of the panel HTML
    else:
        print("No panel div found with class 'panel'")
        
except Exception as e:
    print("Error:", e)
