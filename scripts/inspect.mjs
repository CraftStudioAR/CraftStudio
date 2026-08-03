import sharp from 'sharp';

async function main() {
  const heroPath = './public/images/hero.webp';
  const meta = await sharp(heroPath).metadata();
  console.log('Image dimensions:', meta.width, 'x', meta.height, 'format:', meta.format);
}

main();
