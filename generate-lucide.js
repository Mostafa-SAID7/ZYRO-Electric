const fs = require('fs');
const lucide = require('lucide-angular');

const rawIcons = [
  'log-in', 'user-plus', 'shopping-cart', 'arrow-left', 'image', 'minus', 'plus', 'trash-2', 'trash', 
  'shopping-bag', 'check', 'credit-card', 'lock', 'truck', 'undo-2', 'map-pin', 'globe', 'smartphone', 
  'check-circle', 'activity', 'x-circle', 'download', 'packages', 'inbox', 'rotate-ccw', 'star', 'eye', 
  'message-square', 'thumbs-up', 'shopping-basket', 'home', 'store', 'sun', 'moon', 'user', 'log-out', 
  'x', 'loader-2', 'alert-triangle', 'refresh-cw', 'alert-circle', 'filter', 'search-x', 'arrow-right', 
  'package', 'chevron-left', 'chevron-right', 'search'
];

// Convert kebab-case to PascalCase
function toPascalCase(str) {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

const importsToUse = [];
const pickObj = [];

for (const name of rawIcons) {
  let pascal = toPascalCase(name);
  if (lucide[pascal]) {
    if (pascal === 'Image') {
      importsToUse.push('Image as ImageIcon');
      pickObj.push('Image: ImageIcon');
    } else {
      importsToUse.push(pascal);
      pickObj.push(pascal);
    }
  } else {
    console.log('WARNING: Not found ' + pascal);
  }
}

const replacement = `
// Import Lucide icons explicitly
import { 
  LucideAngularModule, 
  ${importsToUse.join(', ')} 
} from 'lucide-angular';

const icons = {
  ${pickObj.join(', ')}
};
`;

console.log(replacement);
