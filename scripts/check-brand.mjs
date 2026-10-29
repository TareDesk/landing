import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../src/brand-colors.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { inkFor, normalizeHex, PRESETS } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);

function luminance(hex) {
  const channels = hex
    .match(/[a-f\d]{2}/gi)
    .map((value) => parseInt(value, 16) / 255)
    .map((value) => (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4));
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}
for (const color of [...PRESETS.map((preset) => preset.color), '#000000', '#ffffff', '#777777', '#747474']) {
  const values = [luminance(color), luminance(inkFor(color))].sort((a, b) => a - b);
  assert.ok((values[1] + 0.05) / (values[0] + 0.05) >= 4.5, `Insufficient contrast for ${color}`);
}
assert.equal(inkFor('#ff4d2e'), '#000000');
assert.equal(inkFor('#1f8a4c'), '#000000');
assert.equal(normalizeHex(' ABC '), '#aabbcc');
assert.equal(normalizeHex('#3355FF'), '#3355ff');
for (const value of ['', 'red', '#ffff', '#1234567', 'url(example)']) assert.equal(normalizeHex(value), null);
console.log('Brand color checks passed.');
