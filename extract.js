const fs = require('fs');
const path = require('path');
const icons = new Set();
function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (p.endsWith('.html') || p.endsWith('.ts')) {
      const content = fs.readFileSync(p, 'utf8');
      const regex = /<lucide-icon[^>]*name=[\"']([^\"']+)[\"']/g;
      let match;
      while ((match = regex.exec(content)) !== null) {
        icons.add(match[1]);
      }
    }
  }
}
walk('src');
console.log(Array.from(icons).join(', '));
