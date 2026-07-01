import os

files = [
    'src/app/our-story/page.tsx',
    'src/app/visa-guide/page.tsx',
    'src/app/best-time-to-visit/page.tsx',
    'src/app/terms/page.tsx',
    'src/app/privacy-policy/page.tsx'
]

for filepath in files:
    if not os.path.exists(filepath):
        print(f"Skipping {filepath} (does not exist)")
        continue
        
    with open(filepath, 'r') as f:
        content = f.read()
        
    # Check if Navbar is already imported
    if 'import Navbar' in content:
        print(f"Already fixed: {filepath}")
        continue

    # Add imports
    content = "import Navbar from '@/components/Navbar';\nimport Footer from '@/components/Footer';\n" + content

    # Replace wrapper layout in return statement
    # Find return ( <main ... > ... </main> ); and change to return ( <> <Navbar /> <main ... > ... </main> <Footer /> </> );
    # Let's do simple replacement:
    content = content.replace("return (\n    <main className=\"bg-[#faf8f5] text-[#343434]\">", "return (\n    <>\n      <Navbar />\n      <main className=\"bg-[#faf8f5] text-[#343434] flex-grow flex flex-col\">")
    content = content.replace("return (\n    <main className=\"bg-[#faf8f5] text-[#343434] \">", "return (\n    <>\n      <Navbar />\n      <main className=\"bg-[#faf8f5] text-[#343434] flex-grow flex flex-col\">")
    
    # We must find the last </main> and replace with </main>\n      <Footer />\n    </>\n  );
    # Since the file structure is simple:
    content = content.replace("</main>\n  );\n}", "</main>\n      <Footer />\n    </>\n  );\n}")

    with open(filepath, 'w') as f:
        f.write(content)
        
    print(f"Added Navbar/Footer to {filepath}")
