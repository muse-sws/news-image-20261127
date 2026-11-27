// main.ts — news-image-20261127 entry program (Node 22, standard library only).
//
// The entry image is entry.png beside this file: a newspaper front page
// summing up the world's news of Friday 27 November 2026. This program
// copies it to <output>/entry.png. It runs fully offline, with no build step.
//
// Run locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

// Start from a clean output directory so a second run writes exactly the
// same bytes as the first. Only the CONTENTS are removed, never the
// directory itself: the grader mounts /output as a writable directory on
// a read-only filesystem, so deleting it (and recreating it) fails with EACCES.
mkdirSync(outDir, { recursive: true });
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}

copyFileSync(join(repoRoot, "entry.png"), join(outDir, "entry.png"));
const bytes = statSync(join(outDir, "entry.png")).size;
console.log("wrote " + join(outDir, "entry.png") + " (" + bytes + " bytes)");
