import re
import glob
import os

files = [
    'src/app/trip-ideas/[slug]/page.tsx',
    'src/app/inspirations/[slug]/page.tsx',
    'src/app/things-to-do/[slug]/page.tsx',
    'src/app/ideas-by-month/[month]/page.tsx',
    'src/app/travel-guides/[slug]/page.tsx',
    'src/app/itineraries/page.tsx'
]

for filepath in files:
    if not os.path.exists(filepath):
        continue
        
    with open(filepath, 'r') as f:
        content = f.read()
        
    original_content = content

    # 1. Add getSpecialists import if missing
    if 'getSpecialists' not in content:
        content = content.replace("import { getFeaturedItineraries", "import { getFeaturedItineraries, getSpecialists")
        content = content.replace("import { getItineraries", "import { getItineraries, getSpecialists")
        content = content.replace("import { client, sanityFetch", "import { client, sanityFetch, getSpecialists")
        if 'getSpecialists' not in content:
            # Fallback for importing getSpecialists
            content = content.replace("import Link from 'next/link';", "import Link from 'next/link';\nimport { getSpecialists } from '@/sanity/client';")

    # 2. Inject specialist fetch inside the async component
    # Look for "export default async function"
    if 'const mainSpecialist =' not in content:
        comp_match = re.search(r'(export default async function \w+\(.*?\)\s*\{)', content)
        if comp_match:
            injection = """
  const specialists = await getSpecialists();
  const mainSpecialist = specialists[0] || {
    name: "Alice Mercer",
    role: "Vietnam Specialist",
    image: "/images/specialist_alice.png",
    slug: { current: "alice-mercer" }
  };
"""
            content = content.replace(comp_match.group(1), comp_match.group(1) + injection)

    # 3. Replace the hardcoded Alice block
    content = content.replace('src="/images/specialist_alice.png"', 'src={mainSpecialist.image || "/images/specialist_alice.png"}')
    content = content.replace('alt="Alice Mercer"', 'alt={mainSpecialist.name}')
    content = content.replace('>Alice Mercer</h4>', '>{mainSpecialist.name}</h4>')
    
    # Replace the role block, which could be Bespoke Holiday Designer, Vietnam Specialist, etc.
    content = re.sub(r'(<span[^>]*text-\[10px\][^>]*>)\s*(Bespoke Holiday Designer|Vietnam Specialist|Luxury Travel Expert|Regional Specialist|Local Expert|Travel Expert)\s*</span>', r'\1{mainSpecialist.role || "\2"}</span>', content)

    # For link
    content = content.replace('href="/specialists/alice-mercer"', 'href={`/specialists/${mainSpecialist.slug?.current || "alice-mercer"}`}')

    if content != original_content:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Fixed {filepath}")
    else:
        print(f"No changes for {filepath}")

