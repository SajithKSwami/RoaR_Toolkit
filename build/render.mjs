#!/usr/bin/env node
// render.mjs — branded HTML → PDF via Playwright (preserves design; no ATS flattening)
import { createRequire } from 'module';
import { pathToFileURL } from 'url';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Playwright is installed in the career-ops project; resolve it from there.
const require = createRequire('C:/career-ops/');
const { chromium } = require('playwright');

const __dirname = dirname(fileURLToPath(import.meta.url));
const input = resolve(__dirname, 'toolkit.html');
const output = resolve(__dirname, '..', 'RoaR_Companion_Toolkit.pdf');

const execPath = process.env.HOME +
  '/AppData/Local/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-win64/chrome-headless-shell.exe';
const browser = await chromium.launch({ executablePath: execPath });
const page = await browser.newPage();
await page.goto(pathToFileURL(input).href, { waitUntil: 'networkidle' });
await page.emulateMedia({ media: 'print' });
await page.pdf({
  path: output,
  format: 'Letter',
  printBackground: true,
  preferCSSPageSize: true,
});
await browser.close();
console.log('PDF written:', output);
