const fs = require('fs');
const path = require('path');

const dir = __dirname;

const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(dir, 'spsu_game.css'), 'utf8');
const audioJs = fs.readFileSync(path.join(dir, 'spsu_audio.js'), 'utf8');
const levelsJs = fs.readFileSync(path.join(dir, 'spsu_levels.js'), 'utf8');
const certJs = fs.readFileSync(path.join(dir, 'spsu_certificate.js'), 'utf8');
const appJs = fs.readFileSync(path.join(dir, 'spsu_app.js'), 'utf8');

let b64Logo = '';
if (fs.existsSync(path.join(dir, 'logo_b64.txt'))) {
  b64Logo = fs.readFileSync(path.join(dir, 'logo_b64.txt'), 'utf8').trim();
}

let standalone = html;

// Replace stylesheet link with inline CSS
standalone = standalone.replace(
  '<link rel="stylesheet" href="spsu_game.css">',
  `<style>\n${css}\n</style>`
);

// Replace logo image references with inline Base64 data URL
if (b64Logo) {
  const dataUri = `data:image/png;base64,${b64Logo}`;
  standalone = standalone.split('src="spsu_logo.png"').join(`src="${dataUri}"`);
}

// Replace script tags with inline JavaScript
const scriptsReplacement = `
  <script>
    ${audioJs}
  </script>
  <script>
    ${levelsJs}
  </script>
  <script>
    ${certJs}
  </script>
  <script>
    ${appJs}
  </script>
`;

standalone = standalone.replace(
  `<script src="spsu_audio.js"></script>
  <script src="spsu_levels.js"></script>
  <script src="spsu_certificate.js"></script>
  <script src="spsu_app.js"></script>`,
  scriptsReplacement
);

fs.writeFileSync(path.join(dir, 'spsu_dsa_quest_standalone.html'), standalone, 'utf8');
console.log('✅ Standalone single-file game generated: spsu_dsa_quest_standalone.html');
console.log(`File size: ${(Buffer.byteLength(standalone, 'utf8') / 1024).toFixed(2)} KB`);
