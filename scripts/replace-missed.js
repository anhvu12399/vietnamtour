const fs = require('fs');
const path = require('path');

const DIRECTORY = path.join(__dirname, '../src');

const replacements = [
  { search: /hover:bg-\[#9A4B33\]/g, replace: 'hover:bg-copper' },
  { search: /hover:text-\[#9A4B33\]/g, replace: 'hover:text-copper' },
  { search: /border-\[#9A4B33\]/g, replace: 'border-copper' },
  { search: /text-\[#343434\]\/75/g, replace: 'text-ink/75' },
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
console.log('Missed replacements complete.');
