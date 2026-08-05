// Genera el set responsive del hero a partir del original en alta.
// Cada dispositivo descarga solo el ancho que necesita (ver srcset en HeroSection.tsx):
// un celular baja ~400KB en vez de los 4.6MB del archivo unico a resolucion completa.
//
// Uso:
//   node scripts/convert_hero.mjs <ruta-al-original>
//   HERO_SOURCE=<ruta-al-original> node scripts/convert_hero.mjs
//
// El original en alta no vive en el repo por su peso (11MB+), asi que hay que
// pasarle la ruta. Si no se indica ninguna, busca los nombres de abajo.
import sharp from 'sharp';
import fs from 'fs';

const DEFAULT_CANDIDATES = [
  './assets/hero-source.jpg',
  './assets/hero-source.png',
];

const INPUT =
  process.argv[2] ||
  process.env.HERO_SOURCE ||
  DEFAULT_CANDIDATES.find((p) => fs.existsSync(p));

const OUT_DIR = './public/images';
const QUALITY = 92; // indistinguible de q96 a simple vista, ~35% mas liviano

// El ancho mayor es el nativo del original: ampliar mas no agrega detalle real.
const WIDTHS = [1280, 1920, 2560, 3777];
// Ancho que queda como /images/hero.webp, usado de fallback en el atributo src.
const FALLBACK_WIDTH = 1920;

async function convert() {
  if (!INPUT) {
    throw new Error(
      'Falta la imagen original. Pasala como argumento:\n' +
        '  node scripts/convert_hero.mjs "ruta/al/hero-en-alta.jpg"\n' +
        `o dejala en alguna de estas rutas: ${DEFAULT_CANDIDATES.join(', ')}`,
    );
  }
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
  console.error(err.message);
  process.exit(1);
});
