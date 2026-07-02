import os
import glob
import re

# Find all tsx and ts files in src/
files = glob.glob('src/**/*.tsx', recursive=True) + glob.glob('src/**/*.ts', recursive=True)

phone_replacements = [
    # tel links
    ('tel:+442078459200', 'tel:+84988600388'),
    ('tel:02046005398', 'tel:+84988600388'),
    ('tel:+442000000000', 'tel:+84988600388'),
    
    # display texts
    ('+44 (0) 20 7845 9200', '+84 988600388'),
    ('020 4600 5398', '+84 988600388'),
    ('+44 20 7845 9200', '+84 988600388'),
    ('+442078459200', '+84988600388'),
    ('+44-20-0000-0000', '+84-98-8600-388'),
    
    # specialist phones in mockData
    ('+44 (0) 20 7845 9210', '+84 988600388'),
    ('+44 (0) 20 7845 9214', '+84 988600388'),
]

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()
        
    original = content
    
    # Apply phone replacements
    for old, new in phone_replacements:
        content = content.replace(old, new)
        
    # Specifically update Footer copyright line
    if 'Footer.tsx' in filepath:
        # replace old copyright line
        old_copyright = '&copy; {new Date().getFullYear()} Vietnam Heritage Tours. All rights reserved. Handcrafted Luxury Travels in Indochina.'
        new_copyright = '&copy; 2026 VIETNAM TOURS. ALL RIGHTS RESERVED. HANDCRAFTED LUXURY TRAVELS IN INDOCHINA.'
        content = content.replace(old_copyright, new_copyright)

    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated: {filepath}")

