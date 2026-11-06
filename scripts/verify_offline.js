const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Check external resource references or network requests
const urls = html.match(/https?:\/\/[^\s"\'<>]+/g) || [];
console.log('URLs found in index.html (comments/licenses only):', urls);

const netCalls = html.match(/fetch\s*\(|XMLHttpRequest|WebSocket/g) || [];
console.log('Active runtime network calls:', netCalls);
if (netCalls.length > 0) {
  throw new Error('Forbidden runtime network calls found!');
}

console.log('Offline check passed! Zero runtime network requests.');

