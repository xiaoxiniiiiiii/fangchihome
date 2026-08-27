import path from 'node:path';
import sharp from 'sharp';

const source = path.join(process.cwd(), 'public', 'source-sheets', 'decor-replacements.png');
const output = path.join(process.cwd(), 'public', 'products');
const meta = await sharp(source).metadata();
const width = Math.floor(meta.width / 3);
for (let i = 0; i < 3; i++) {
  await sharp(source).extract({ left: i * width, top: 120, width, height: Math.min(width, meta.height - 240) }).resize(720, 720, { fit: 'cover' }).webp({ quality: 84 }).toFile(path.join(output, `decor-replacement-${String(i + 1).padStart(2, '0')}.webp`));
}
console.log('Generated decor-replacement-01.webp through decor-replacement-03.webp.');
