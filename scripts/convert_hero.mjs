// Genera el set responsive del hero a partir del original en alta.
// Cada dispositivo descarga solo el ancho que necesita (ver srcset en HeroSection.tsx):
// un celular baja ~300KB en vez de los 4.6MB del archivo unico a resolucion completa.
import sharp from 'sharp';
import fs from 'fs';

const INPUT = 'C:/Users/giuli/Downloads/Hero jpg calidad alta.jpg';
const OUT_DIR = './public/images';
const QUALITY = 92; // indistinguible de q96 a simple vista, ~35% mas liviano

// El ancho mayor es el nativo del original: ampliar mas no agrega detalle real.
const WIDTHS = [1280, 1920, 2560, 3777];
// Ancho que queda como /images/hero.webp, usado de fallback en el atributo src.
const FALLBACK_WIDTH = 1920;

async function convert() {
  if (!fs.existsSync(INPUT)) {
    throw new Error(`No se encontro el original: ${INPUT}`);
  }

  const meta = await sharp(INPUT).metadata();
  console.log(`Original: ${meta.width}x${meta.height} ${meta.format}`);

  for (const width of WIDTHS) {
    const name = width === FALLBACK_WIDTH ? 'hero.webp' : `hero-${width}.webp`;
    const path = `${OUT_DIR}/${name}`;
    await sharp(INPUT)
      .resize({ width })
      .webp({ quality: QUALITY, effort: 6, smartSubsample: true })
      .toFile(path);
    const kb = Math.round(fs.statSync(path).size / 1024);
    console.log(`  ${name.padEnd(16)} ${String(width).padStart(4)}px  ${kb} KB`);
  }
}

convert().catch((err) => {
  console.error(err);
  process.exit(1);
});
