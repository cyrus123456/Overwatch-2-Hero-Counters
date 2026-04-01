import { readFileSync } from 'fs';
import { join } from 'path';
import sharp from 'sharp';

const publicDir = join(process.cwd(), 'public');

const sizes = [
  { name: 'pwa-192x192.png', size: 192 },
  { name: 'pwa-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 }
];

async function generateIcons() {
  const svgBuffer = readFileSync(join(publicDir, 'favicon.svg'));
  
  for (const { name, size } of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(join(publicDir, name));
    
    console.log(`Generated ${name}`);
  }
  
  console.log('All PWA icons generated successfully!');
}

generateIcons().catch(console.error);
