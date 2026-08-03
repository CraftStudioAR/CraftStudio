import sharp from 'sharp';

async function shiftLeftDrastically() {
  const originalMeta = await sharp('./public/images/hero_backup.webp').metadata();
  console.log('Original size:', originalMeta.width, 'x', originalMeta.height);

  // Target 16:9 canvas: 3414 x 1920
  const targetWidth = 3414;
  const targetHeight = 1920;

  // We want the girls (who are currently on the right) to be on the LEFT side of the screen.
  // In the original photo:
  // x: 0 - 750 is empty lamp / floor / tiles on the left.
  // x: 750 - 2300 is the couch with Martina and Tiziana.
  // x: 2300 - 2880 is the right wall.

  // If we shift the original photo to the left by 750px (crop the empty left space):
  // The couch and girls will start at x = 0 to 1550 (the LEFT half of the screen!).
  // The remaining width from 2880 - 750 = 2130 to 3414 is 1284px on the right.
  
  const shiftX = 750; // shift 750px to the left
  const croppedWidth = originalMeta.width - shiftX; // 2130px

  // Extract the photo starting from x = 750 to the end (2130px wide, 1920px tall)
  const leftShiftedContent = await sharp('./public/images/hero_backup.webp')
    .extract({ left: shiftX, top: 0, width: croppedWidth, height: targetHeight })
    .toBuffer();

  // For the right side (1284px wide), sample the right wall and texture
  const rightWallSample = await sharp('./public/images/hero_backup.webp')
    .extract({ left: originalMeta.width - 500, top: 0, width: 500, height: targetHeight })
    .flop()
    .resize(targetWidth - croppedWidth + 100, targetHeight, { fit: 'fill' })
    .toBuffer();

  await sharp({
    create: {
      width: targetWidth,
      height: targetHeight,
      channels: 4,
      background: { r: 20, g: 20, b: 22, alpha: 1 }
    }
  })
  .composite([
    { input: rightWallSample, left: croppedWidth - 50, top: 0 },
    { input: leftShiftedContent, left: 0, top: 0 }
  ])
  .webp({ quality: 92 })
  .toFile('./public/images/hero.webp');

  console.log('Successfully shifted couch and girls 750px to the left with zero vertical scale change!');
}

shiftLeftDrastically();
