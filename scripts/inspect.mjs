import sharp from 'sharp';

async function main() {
  const highResPath = 'C:/Users/giuli/Downloads/Hero jpg calidad alta.jpg';
  const img = sharp(highResPath);
  const meta = await img.metadata();
  console.log('Metadata:', {
    width: meta.width,
    height: meta.height,
    format: meta.format,
    space: meta.space,
    channels: meta.channels,
    density: meta.density,
    orientation: meta.orientation,
    hasProfile: meta.hasProfile,
    isProgressive: meta.isProgressive
  });
}

main();
