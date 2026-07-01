import os

# 1. Fix src/app/destinations/page.tsx
file_dest = 'src/app/destinations/page.tsx'
if os.path.exists(file_dest):
    with open(file_dest, 'r') as f:
        content = f.read()
    
    content = content.replace(
        'text-[#343434]\n                    {dest.name}',
        'text-white\n                    {dest.name}'
    )
    content = content.replace(
        'text-2xl lg:text-3xl text-[#343434] font-medium',
        'text-2xl lg:text-3xl text-white font-medium'
    )
    content = content.replace(
        'text-xs text-[#545454] font-light leading-relaxed line-clamp-2 max-w-lg',
        'text-xs text-white/80 font-light leading-relaxed line-clamp-2 max-w-lg'
    )
    
    with open(file_dest, 'w') as f:
        f.write(content)
    print("Fixed destinations listing page")

# 2. Fix src/app/ideas-by-month/page.tsx
file_month = 'src/app/ideas-by-month/page.tsx'
if os.path.exists(file_month):
    with open(file_month, 'r') as f:
        content = f.read()
        
    content = content.replace(
        'text-[#343434] font-semibold leading-none group-hover:text-[#9A4B33] transition-colors',
        'text-white font-semibold leading-none group-hover:text-gold transition-colors'
    )
    content = content.replace(
        'text-[10px] text-[#343434]/75 font-light line-clamp-1 group-hover:text-white transition-colors',
        'text-[10px] text-white/70 font-light line-clamp-1 group-hover:text-white transition-colors'
    )
    
    with open(file_month, 'w') as f:
        f.write(content)
    print("Fixed ideas-by-month page")

# 3. Fix H1 in src/app/destinations/[slug]/page.tsx
file_dest_slug = 'src/app/destinations/[slug]/page.tsx'
if os.path.exists(file_dest_slug):
    with open(file_dest_slug, 'r') as f:
        content = f.read()
    content = content.replace(
        'text-3xl sm:text-5xl lg:text-6xl font-medium leading-tight max-w-4xl text-[#343434]',
        'text-3xl sm:text-5xl lg:text-6xl font-medium leading-tight max-w-4xl text-white'
    )
    with open(file_dest_slug, 'w') as f:
        f.write(content)
    print("Fixed destinations slug page")

# 4. Fix H1 in src/app/itineraries/[slug]/page.tsx
file_itinerary_slug = 'src/app/itineraries/[slug]/page.tsx'
if os.path.exists(file_itinerary_slug):
    with open(file_itinerary_slug, 'r') as f:
        content = f.read()
    content = content.replace(
        'text-3xl sm:text-5xl lg:text-6xl font-medium leading-tight max-w-4xl text-[#343434]',
        'text-3xl sm:text-5xl lg:text-6xl font-medium leading-tight max-w-4xl text-white'
    )
    with open(file_itinerary_slug, 'w') as f:
        f.write(content)
    print("Fixed itineraries slug page")

# 5. Fix H1 in src/app/accommodations/[slug]/page.tsx
file_acc_slug = 'src/app/accommodations/[slug]/page.tsx'
if os.path.exists(file_acc_slug):
    with open(file_acc_slug, 'r') as f:
        content = f.read()
    content = content.replace(
        'text-3xl sm:text-5xl lg:text-6xl font-medium leading-tight max-w-4xl text-[#343434]',
        'text-3xl sm:text-5xl lg:text-6xl font-medium leading-tight max-w-4xl text-white'
    )
    with open(file_acc_slug, 'w') as f:
        f.write(content)
    print("Fixed accommodations slug page")

