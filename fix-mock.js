const fs = require('fs');
const path = 'src/app/products/data/mock-products.ts';
let content = fs.readFileSync(path, 'utf8');
// Remove everything after the first '];\r\n'
const marker = '];\r\n';
const idx = content.indexOf(marker);
if (idx !== -1) {
  content = content.substring(0, idx + marker.length);
  fs.writeFileSync(path, content, 'utf8');
  console.log('Done. File now ends at char', idx + marker.length);
} else {
  console.log('Marker not found, trying alternate...');
  // Try just ];
  const idx2 = content.indexOf('];');
  console.log(']; found at:', idx2, 'total length:', content.length);
}
