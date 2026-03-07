/**
 * compress-images.js
 *
 * Batch-compresses all images in the Oneiros-26 public folder.
 *
 * Usage:  node scripts/compress-images.js
 *
 * What it does:
 *   1. Converts every JPG in public/minor_events/ to WebP (max 1920px wide, q80)
 *   2. Compresses public/oneiros-logo.png → WebP (max 800px wide, q85)
 *   3. Compresses public/favicon.png → 256×256 optimised PNG
 *   4. Compresses every image in public/team/ to WebP (max 600px wide, q80)
 */

import sharp from 'sharp';
import { readdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PUBLIC = join(__dirname, '..', 'public');

/* ── helpers ─────────────────────────────────────────────────────────── */

async function compressToWebP(inputPath, outputPath, maxWidth, quality = 80) {
    const meta = await sharp(inputPath).metadata();
    const needsResize = meta.width && meta.width > maxWidth;

    let pipeline = sharp(inputPath);
    if (needsResize) pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
    await pipeline.webp({ quality }).toFile(outputPath);

    const before = statSync(inputPath).size;
    const after = statSync(outputPath).size;
    console.log(
        `  ✅ ${basename(inputPath)} → ${basename(outputPath)}  ` +
        `${(before / 1024 / 1024).toFixed(1)} MB → ${(after / 1024).toFixed(0)} KB  ` +
        `(${((1 - after / before) * 100).toFixed(0)}% smaller)`
    );
}

async function compressPNG(inputPath, outputPath, size) {
    await sharp(inputPath)
        .resize({ width: size, height: size, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png({ quality: 80, compressionLevel: 9 })
        .toFile(outputPath);

    const before = statSync(inputPath).size;
    const after = statSync(outputPath).size;
    console.log(
        `  ✅ ${basename(inputPath)} → ${basename(outputPath)}  ` +
        `${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB  ` +
        `(${((1 - after / before) * 100).toFixed(0)}% smaller)`
    );
}

/* ── 1. Minor events ─────────────────────────────────────────────────── */

async function compressMinorEvents() {
    const dir = join(PUBLIC, 'minor_events');
    const files = readdirSync(dir).filter(f => /\.(jpe?g|png)$/i.test(f));

    console.log(`\n🖼  Minor Events — ${files.length} images\n`);

    for (const file of files) {
        const input = join(dir, file);
        const output = join(dir, basename(file, extname(file)) + '.webp');
        await compressToWebP(input, output, 1920, 80);
    }
}

/* ── 2. Logo ─────────────────────────────────────────────────────────── */

async function compressLogo() {
    console.log('\n🖼  Logo\n');
    const input = join(PUBLIC, 'oneiros-logo.png');
    const output = join(PUBLIC, 'oneiros-logo.webp');
    await compressToWebP(input, output, 800, 85);
}

/* ── 3. Favicon ──────────────────────────────────────────────────────── */

async function compressFavicon() {
    console.log('\n🖼  Favicon\n');
    const input = join(PUBLIC, 'favicon.png');
    const tmpOutput = join(PUBLIC, 'favicon-optimized.png');
    await compressPNG(input, tmpOutput, 256);
}

/* ── 4. Team images ──────────────────────────────────────────────────── */

async function compressTeam() {
    const dir = join(PUBLIC, 'team');
    let files;
    try {
        files = readdirSync(dir).filter(f => /\.(jpe?g|png)$/i.test(f));
    } catch {
        console.log('\n⏭  No public/team/ directory — skipping');
        return;
    }

    console.log(`\n🖼  Team — ${files.length} images\n`);

    for (const file of files) {
        const input = join(dir, file);
        const output = join(dir, basename(file, extname(file)) + '.webp');
        await compressToWebP(input, output, 600, 80);
    }
}

/* ── Run ─────────────────────────────────────────────────────────────── */

(async () => {
    console.log('═══════════════════════════════════════════════');
    console.log('  Oneiros-26 Image Compression');
    console.log('═══════════════════════════════════════════════');

    await compressMinorEvents();
    await compressLogo();
    await compressFavicon();
    await compressTeam();

    console.log('\n✨ Done! WebP files have been created alongside originals.');
    console.log('   Update your component imports to use .webp paths.\n');
})();
