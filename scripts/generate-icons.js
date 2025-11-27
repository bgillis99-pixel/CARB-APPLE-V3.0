const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = {
  'icon.png': 1024,
  'adaptive-icon.png': 1024,
  'favicon.png': 48,
  'splash-icon.png': 1024,
  'apple-touch-icon.png': 180,
  'icon-192.png': 192,
  'icon-512.png': 512
};

async function generateIcons() {
  const svgPath = path.join(__dirname, '../assets/logo-green-apple-c.svg');
  const svgBuffer = fs.readFileSync(svgPath);

  console.log('Generating PNG icons from SVG...\n');

  for (const [filename, size] of Object.entries(sizes)) {
    const outputPath = path.join(__dirname, '../assets', filename);

    try {
      await sharp(svgBuffer)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(outputPath);

      console.log(`✓ Generated ${filename} (${size}x${size})`);
    } catch (error) {
      console.error(`✗ Failed to generate ${filename}:`, error.message);
    }
  }

  console.log('\n✓ All icons generated successfully!');
}

generateIcons().catch(console.error);
