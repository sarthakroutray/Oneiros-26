/**
 * Image compression script for Lighthouse optimization.
 * Uses sharp (already in devDependencies) to resize and compress
 * oversized WebP images in the public/ directory.
 *
 * Usage:  node scripts/compress-images.mjs
 */

import sharp from 'sharp';
import { readdir, stat, readFile, writeFile } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PUBLIC = join(__dirname, '..', 'public');

// Threshold: compress any .webp file larger than 300 KB
const SIZE_THRESHOLD = 300 * 1024;

// Max dimensions per directory pattern
const MAX_DIMS = {
    'major_events': { width: 1200, height: 1600 },
    'minor_events': { width: 1200, height: 1600 },
    'team': { width: 600, height: 800 },
    '_default': { width: 1200, height: 1200 },
};

async function walkDir(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    const files = [];
    for (const entry of entries) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...await walkDir(full));
        } else if (extname(entry.name).toLowerCase() === '.webp') {
            files.push(full);
        }
    }
    return files;
}

function getDims(filePath) {
    const rel = filePath.replace(PUBLIC, '').replace(/\\/g, '/');
    for (const [key, dims] of Object.entries(MAX_DIMS)) {
        if (key !== '_default' && rel.includes(key)) return dims;
    }
    return MAX_DIMS._default;
}

async function main() {
    const files = await walkDir(PUBLIC);
    let compressed = 0;
    let savedBytes = 0;

    for (const file of files) {
        const info = await stat(file);
        if (info.size <= SIZE_THRESHOLD) continue;

        const dims = getDims(file);
        const sizeBefore = info.size;
        const rel = file.replace(PUBLIC, 'public').replace(/\\/g, '/');

        try {
            // Read file fully into memory first to release the file handle
            const inputBuffer = await readFile(file);

            const outputBuffer = await sharp(inputBuffer)
                .resize({
                    width: dims.width,
                    height: dims.height,
                    fit: 'inside',
                    withoutEnlargement: true,
                })
                .webp({ quality: 80, effort: 6 })
                .toBuffer();

            // Only overwrite if we actually reduced size
            if (outputBuffer.length < sizeBefore) {
                await writeFile(file, outputBuffer);
                const saved = sizeBefore - outputBuffer.length;
                savedBytes += saved;
                compressed++;
                console.log(
                    `OK ${rel}: ` +
                    `${(sizeBefore / 1024).toFixed(0)}KB -> ${(outputBuffer.length / 1024).toFixed(0)}KB ` +
                    `(saved ${(saved / 1024).toFixed(0)}KB)`
                );
            } else {
                console.log(`SKIP ${rel}: already optimal`);
            }
        } catch (err) {
            console.error(`ERR ${rel}: ${err.message}`);
        }
    }

    console.log(`\nDone! Compressed ${compressed} files, saved ${(savedBytes / 1024 / 1024).toFixed(1)}MB total.`);
}

main();
