with open('src/components/Navbar.tsx', 'r') as f:
    content = f.read()

# Replace client import with server action
content = content.replace("import { client } from '@/sanity/client';", "import { fetchMainSpecialistAction } from '@/app/actions';")

# Replace useEffect logic
old_use_effect = """
  useEffect(() => {
    if (client) {
      client.fetch(`*[_type == "specialist"][0]{name, role, "image": image.asset->url, slug, bio}`).then(res => setMainSpecialist(res)).catch(console.error);
    }
  }, []);
"""

new_use_effect = """
  useEffect(() => {
    fetchMainSpecialistAction().then(res => {
      if (res) setMainSpecialist(res);
    }).catch(console.error);
  }, []);
"""
content = content.replace(old_use_effect.strip(), new_use_effect.strip())

with open('src/components/Navbar.tsx', 'w') as f:
    f.write(content)
