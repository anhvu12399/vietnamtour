import os
import glob
import re

files = glob.glob('/Users/mac/ai-website-cloner-template/src/app/**/*.tsx', recursive=True)

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    original = content

    # 1. Main wrappers
    content = content.replace('bg-luxury-slate text-luxury-linen', 'bg-[#faf8f5] text-[#343434]')
    content = content.replace('bg-[#161C1A] text-white', 'bg-[#faf8f5] text-[#343434]')
    
    # 2. Section backgrounds
    # Don't replace bg-[#161C1A]/25 (which is an image overlay)
    content = re.sub(r'bg-\[\#161C1A\](?!\/)', r'bg-[#faf8f5]', content)
    content = re.sub(r'bg-\[\#0e1628\](?!\/)', r'bg-[#faf8f5]', content)
    
    # 3. Card backgrounds
    content = content.replace('bg-luxury-slate/30', 'bg-white')
    content = content.replace('bg-luxury-slate/20', 'bg-[#f4efe6]')
    content = content.replace('bg-luxury-slate/90', 'bg-white/90')
    
    # 4. Text colors (luxury-linen)
    content = content.replace('text-luxury-linen/50', 'text-[#545454]')
    content = content.replace('text-luxury-linen/60', 'text-[#545454]')
    content = content.replace('text-luxury-linen/80', 'text-[#545454]')
    content = content.replace('text-luxury-linen/85', 'text-[#343434]')
    content = content.replace('text-luxury-linen', 'text-[#343434]')
    
    # 5. Borders
    content = content.replace('border-white/5', 'border-[#e6e2d6]')
    content = content.replace('border-white/10', 'border-[#e6e2d6]')
    content = content.replace('border-white/25', 'border-[#e6e2d6]')
    content = content.replace('border-luxury-gold/10', 'border-[#e6e2d6]')
    content = content.replace('border-luxury-gold/15', 'border-[#e6e2d6]')
    content = content.replace('border-luxury-gold/30', 'border-[#e6e2d6]')
    
    # 6. Specific text-white inside sections
    content = re.sub(r'text-3xl sm:text-5xl text-white', r'text-3xl sm:text-5xl text-[#343434]', content)
    content = re.sub(r'text-4xl text-white', r'text-4xl text-[#343434]', content)
    content = re.sub(r'text-2xl text-white', r'text-2xl text-[#343434]', content)
    
    # 7. Itineraries page specifics
    content = content.replace('bg-[#0e1628]/10', 'bg-[#f4efe6]')
    content = content.replace('bg-[#0e1628]/35', 'bg-black/10')
    content = content.replace('bg-[#0e1628]/85 border border-[#d8d8d8] text-white', 'bg-white border border-[#e6e2d6] text-[#343434]')
    
    # Things to do page specifics
    content = content.replace('bg-[#161C1A]/40', 'bg-black/20')
    
    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath}")

for f in files:
    process_file(f)
