#!/usr/bin/env node
// generate-resume.mjs — compiles resume/resume.tex (hand-authored source of
// truth) into public/resume.pdf via tectonic. Run this whenever
// resume/resume.tex changes:
//   node scripts/generate-resume.mjs
//
// Requires `tectonic` on PATH (a self-contained LaTeX engine, `brew install
// tectonic` — no system-wide TeX Live install, no sudo).
//
// Note for future edits to resume.tex: this template targets XeTeX (what
// tectonic uses), not pdfTeX — it deliberately has no `\input{glyphtounicode}`
// / `\pdfgentounicode=1` lines, which are pdfTeX-only accessibility hooks
// (`\pdfglyphtounicode` is undefined under XeTeX). If you paste in an update
// from a pdflatex-targeted version of this template, strip those two lines
// again or the compile will fail.

import { readFileSync, writeFileSync, mkdtempSync, rmSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(HERE, '..');
const SOURCE_TEX_PATH = join(REPO_ROOT, 'resume/resume.tex');
const OUTPUT_PDF_PATH = join(REPO_ROOT, 'public/resume.pdf');

function main() {
	const tex = readFileSync(SOURCE_TEX_PATH, 'utf8');

	const workDir = mkdtempSync(join(tmpdir(), 'krishsingh-resume-'));
	const texPath = join(workDir, 'resume.tex');
	writeFileSync(texPath, tex, 'utf8');

	console.log(`Compiling ${SOURCE_TEX_PATH} with tectonic...`);
	execFileSync('tectonic', [texPath], { cwd: workDir, stdio: 'inherit' });

	const pdfPath = join(workDir, 'resume.pdf');
	if (!existsSync(pdfPath)) throw new Error('tectonic did not produce resume.pdf');

	const pdfBytes = readFileSync(pdfPath);
	writeFileSync(OUTPUT_PDF_PATH, pdfBytes);
	rmSync(workDir, { recursive: true, force: true });

	console.log(`Wrote ${OUTPUT_PDF_PATH} (${(pdfBytes.length / 1024).toFixed(1)} KiB)`);
}

main();
