// main.ts — "Sunday 22 November 2026 in one picture", a news-image entry.
// Node 22, standard library only.
//
// The entry is a single picture: entry.png next to this file, a newspaper
// front page for Sunday 22 November 2026. It was laid out in design.html and
// screenshotted in a real headless browser by scripts/capture.mjs. This
// program only hands that picture to the grader: it reads entry.png, checks
// it really is a PNG and sits under the 1 MiB cap, and copies it to
// /output/entry.png. No network, no re-encoding, so the bytes the judge sees
// are exactly the bytes that were captured.
//
// Determinism is by construction: the only input is entry.png itself, there
// is no clock and no random source, so two runs write identical bytes. Run it
// anywhere with MAKEFUN_OUTPUT_DIR standing in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// The eight bytes that open every PNG file. Anything else is not our image.
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

// The competition's hard limit: the picture must stay at or under 1 MiB.
const ONE_MIB = 1048576;

function fail(reason: string): never {
  throw new Error('main.ts: ' + reason);
}

function deliver(): void {
  const here = fileURLToPath(new URL('.', import.meta.url));
  const source = join(here, 'entry.png');
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  const target = join(outDir, 'entry.png');

  const image = readFileSync(source);
  if (image.length === 0) {
    fail('entry.png is empty');
  }
  if (!image.subarray(0, PNG_MAGIC.length).equals(PNG_MAGIC)) {
    fail('entry.png does not open with the PNG signature');
  }
  if (image.length > ONE_MIB) {
    fail(`entry.png is ${image.length} bytes, over the 1 MiB cap`);
  }

  mkdirSync(outDir, { recursive: true });
  copyFileSync(source, target);

  // A short write would hand the judge a truncated picture, so the run only
  // counts as done when the copy is byte-for-byte the same size as the source.
  const copied = statSync(target).size;
  if (copied !== image.length) {
    fail(`entry.png copy came up short: ${copied} of ${image.length} bytes`);
  }
  console.log(`wrote ${target} (${copied} bytes)`);
}

deliver();
