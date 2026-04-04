import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, '..', '.assets_raw');
const targetArtistsDir = path.join(__dirname, '..', 'public', 'artists');
const targetLoghiDir = path.join(__dirname, '..', 'public', 'loghi');

// Artisti photos - simple conversion
const artists = [
  { name: 'orion', file: 'orionfotoprofilo.jpeg' },
  { name: 'blister', file: 'blisterfotoprofilo.jpeg' },
  { name: 'dysa', file: 'dysafotoprofilo.jpeg' },
  { name: 'licore', file: 'licorofotoprofilo.jpeg' }
];

// Loghi - need transparency
const loghi = [
  { name: 'pikete', file: 'piketelogo.jpeg' },
  { name: 'trebla', file: 'treblalogo.jpeg' }
];

async function makeBackgroundTransparent(imagePath, outputPath) {
  // Load image
  const { data, info } = await sharp(imagePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Make white/gray background transparent
  // Assuming white/light background - we'll make pixels close to white transparent
  const pixels = new Uint8ClampedArray(data);
  const threshold = 240; // Whiteness threshold

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];

    // If pixel is close to white, make it transparent
    if (r > threshold && g > threshold && b > threshold) {
      pixels[i + 3] = 0; // Set alpha to 0 (transparent)
    }
  }

  // Create new image with transparency
  await sharp(Buffer.from(pixels), {
    raw: { width: info.width, height: info.height, channels: 4 }
  })
    .webp({ quality: 90 })
    .toFile(outputPath);
}

async function convertArtists() {
  console.log('Conversione foto artisti...');
  for (const artist of artists) {
    const input = path.join(sourceDir, artist.file);
    const output = path.join(targetArtistsDir, `${artist.name}.webp`);
    await sharp(input)
      .webp({ quality: 85 })
      .toFile(output);
    console.log(`✓ Convertito ${artist.name}.webp`);
  }
}

async function convertLoghi() {
  console.log('\nConversione loghi con sfondo trasparente...');
  for (const logo of loghi) {
    const input = path.join(sourceDir, logo.file);
    const output = path.join(targetLoghiDir, `${logo.name}.webp`);

    try {
      await makeBackgroundTransparent(input, output);
      console.log(`✓ Convertito ${logo.name}.webp (con trasparenza)`);
    } catch (err) {
      console.error(`Errore con ${logo.name}:`, err.message);
      // Fallback: simple conversion
      await sharp(input)
        .webp({ quality: 90 })
        .toFile(output);
      console.log(`  → Convertito senza trasparenza (fallback)`);
    }
  }
}

async function copySpoilers() {
  console.log('\nCopia spoiler video...');
  const spoilers = [
    { file: 'spoilerorion.mp4', name: 'orion.mp4' },
    { file: 'spoilerblister.mp4', name: 'blister.mp4' },
    { file: 'spoilerdysa.mp4', name: 'dysa.mp4' }
  ];

  const targetDir = path.join(__dirname, '..', 'public', 'spoilers');

  for (const spoiler of spoilers) {
    const input = path.join(sourceDir, spoiler.file);
    const output = path.join(targetDir, spoiler.name);
    fs.copyFileSync(input, output);
    console.log(`✓ Copiato ${spoiler.name}`);
  }
}

async function main() {
  try {
    await convertArtists();
    await convertLoghi();
    await copySpoilers();
    console.log('\n✅ Tutte le conversioni completate!');
  } catch (err) {
    console.error('Errore:', err);
  }
}

main();
