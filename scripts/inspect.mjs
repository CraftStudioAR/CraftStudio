// Muestra las dimensiones y el formato de una imagen.
//
// Uso:
//   node scripts/inspect.mjs                       (por defecto: public/images/hero.webp)
//   node scripts/inspect.mjs ruta/a/otra-imagen.jpg
import sharp from 'sharp';
import fs from 'fs';

const DEFAULT_INPUT = './public/images/hero.webp';

async function main() {
  const input = process.argv[2] || DEFAULT_INPUT;

  if (!fs.existsSync(input)) {
    throw new Error(`No se encontro la imagen: ${input}`);
  }

  const meta = await sharp(input).metadata();
  const sizeMB = (fs.statSync(input).size / (1024 * 1024)).toFixed(2);

  console.log(`${input}:`, {
    dimensions: `${meta.width}x${meta.height}`,
    sizeMB,
    format: meta.format,
    space: meta.space,
    channels: meta.channels,
    density: meta.density,
    orientation: meta.orientation,
    hasProfile: meta.hasProfile,
    isProgressive: meta.isProgressive,
  });
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
