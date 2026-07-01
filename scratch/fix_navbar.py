import re

with open('src/components/Navbar.tsx', 'r') as f:
    content = f.read()

# 1. Add sanity client import if not exists
if 'import { client }' not in content:
    content = content.replace("import { usePathname } from 'next/navigation';", "import { usePathname } from 'next/navigation';\nimport { client } from '@/sanity/client';\nimport { Specialist } from '@/sanity/types';")

# 2. Add state and useEffect for Specialist
if 'const [mainSpecialist' not in content:
    content = content.replace("const [isOpen, setIsOpen] = useState(false);", "const [isOpen, setIsOpen] = useState(false);\n  const [mainSpecialist, setMainSpecialist] = useState<Specialist | null>(null);")
    
    use_effect_block = """
  useEffect(() => {
    if (client) {
      client.fetch(`*[_type == "specialist"][0]{name, role, "image": image.asset->url, slug, bio}`).then(res => setMainSpecialist(res)).catch(console.error);
    }
  }, []);
"""
    content = content.replace("const isHeroPage = pathname === '/'", use_effect_block + "\n  const isHeroPage = pathname === '/'")

# 3. Replace the hardcoded Alice Mercer section
content = content.replace('src="/images/specialist_alice.png"', 'src={mainSpecialist?.image || "/images/specialist_alice.png"}')
content = content.replace('alt="Alice Mercer"', 'alt={mainSpecialist?.name || "Alice Mercer"}')
content = content.replace('>Alice Mercer</h4>', '>{mainSpecialist?.name || "Alice Mercer"}</h4>')
content = content.replace('12+ years designing bespoke luxury itineraries.', '{mainSpecialist?.role || "12+ years designing bespoke luxury itineraries."}')
content = content.replace('href="/specialists/alice-mercer"', 'href={`/specialists/${mainSpecialist?.slug?.current || "alice-mercer"}`}')

with open('src/components/Navbar.tsx', 'w') as f:
    f.write(content)

print("Navbar fixed!")
