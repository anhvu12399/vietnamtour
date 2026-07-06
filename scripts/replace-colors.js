const fs = require('fs');
const path = require('path');

const DIRECTORY = path.join(__dirname, '../src');

const replacements = [
  // Backgrounds
  { search: /bg-\[#faf8f5\]/g, replace: 'bg-paper' },
  { search: /bg-\[#EDE9E3\]/g, replace: 'bg-paper-dim' },
  { search: /bg-\[#e6e2d6\]/g, replace: 'bg-paper-dim' },
  { search: /bg-\[#f0efe9\]/g, replace: 'bg-paper' },
  { search: /bg-\[#161C1A\]/g, replace: 'bg-ink' },
  { search: /bg-\[#0a231c\]/g, replace: 'bg-jade-deep' },
  { search: /bg-\[#0e3b2e\]/g, replace: 'bg-jade-deep' },
  { search: /bg-\[#1f5c4a\]/g, replace: 'bg-jade' },
  { search: /bg-\[#4d726d\]/g, replace: 'bg-celadon' },
  
  // Texts
  { search: /text-\[#343434\]/g, replace: 'text-ink' },
  { search: /text-\[#545454\]/g, replace: 'text-ink-soft' },
  { search: /text-\[#747474\]/g, replace: 'text-ink-soft' },
  { search: /text-\[#2A2D2B\]/g, replace: 'text-ink' },
  { search: /text-\[#161C1A\]/g, replace: 'text-ink' },
  { search: /text-\[#9A4B33\]/g, replace: 'text-copper' },
  { search: /text-\[#c5a880\]/g, replace: 'text-gold' },
  { search: /text-\[#BC986A\]/g, replace: 'text-gold' },
  { search: /text-\[#B8AC94\]/g, replace: 'text-gold-soft' },
  { search: /text-\[#EDE9E3\]/g, replace: 'text-paper-dim' },
  { search: /text-\[#faf8f5\]/g, replace: 'text-paper' },
  { search: /text-\[#4d726d\]/g, replace: 'text-celadon' },
  { search: /text-luxury-linen/g, replace: 'text-paper' },
  { search: /text-luxury-gold/g, replace: 'text-gold' },
  { search: /text-luxury-slate/g, replace: 'text-ink' },
  { search: /text-green/g, replace: 'text-jade' },
  { search: /text-dark-green/g, replace: 'text-jade-deep' },
  
  // Borders
  { search: /border-\[#e6e2d6\]/g, replace: 'border-line' },
  { search: /border-\[#d8d8d8\]/g, replace: 'border-line' },
  { search: /border-\[#9A4B33\]/g, replace: 'border-copper' },
  { search: /border-\[#c5a880\]/g, replace: 'border-gold' },
  
  // Custom Old Named Tokens
  { search: /bg-luxury-moss/g, replace: 'bg-jade-deep' },
  { search: /bg-luxury-linen/g, replace: 'bg-paper' },
  { search: /bg-luxury-gold/g, replace: 'bg-gold' },
  { search: /border-luxury-moss/g, replace: 'border-jade-deep' },
  { search: /border-luxury-gold/g, replace: 'border-gold' },
  
  // Hover & Focus (Prefixes)
  { search: /hover:bg-\[#faf8f5\]/g, replace: 'hover:bg-paper' },
  { search: /hover:text-\[#343434\]/g, replace: 'hover:text-ink' },
  { search: /hover:bg-\[#EDE9E3\]/g, replace: 'hover:bg-paper-dim' },
  { search: /hover:text-\[#2A2D2B\]/g, replace: 'hover:text-ink' },
  
  // Typography mapping from old utility classes if any
  { search: /font-merriweather/g, replace: 'font-serif' },
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (stat.isFile() && (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts'))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      for (const { search, replace } of replacements) {
        content = content.replace(search, replace);
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory(DIRECTORY);
console.log('Global color replacement complete.');
