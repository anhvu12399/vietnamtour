import os
import glob

files = glob.glob('/Users/mac/ai-website-cloner-template/src/app/**/*.tsx', recursive=True)

for file in files:
    with open(file, 'r') as f:
        content = f.read()
    
    original = content
    
    # 1. Fix heading color text-[#EDE9E3] to text-[#0e1628] (used in seasonal escapes / January heading)
    content = content.replace('text-[#EDE9E3]', 'text-[#0e1628]')
    
    # 2. Fix text-slate-300 in highlights cards to text-[#545454]
    content = content.replace('text-xs text-slate-300 leading-relaxed', 'text-xs text-[#545454] leading-relaxed')
    
    # 3. Fix button text-white on transparent buttons inside CTA blocks (makes them dark grey and fixes border)
    content = content.replace(
        'border border-[#e6e2d6] hover:border-[#9A4B33] hover:text-[#9A4B33] text-white text-xs',
        'border border-[#e6e2d6] hover:border-[#9A4B33] hover:text-[#9A4B33] text-[#343434] text-xs'
    )
    content = content.replace(
        'border border-white/25 hover:border-[#9A4B33] hover:text-[#9A4B33] text-white text-xs',
        'border border-[#e6e2d6] hover:border-[#9A4B33] hover:text-[#9A4B33] text-[#343434] text-xs'
    )
    
    # 4. Fix h3 titles inside CTA blocks which were still styled with text-white
    content = content.replace(
        'text-3xl sm:text-5xl text-white font-medium leading-tight',
        'text-3xl sm:text-5xl text-[#0e1628] font-medium leading-tight'
    )
    
    if content != original:
        with open(file, 'w') as f:
            f.write(content)
        print(f"Updated {file}")
