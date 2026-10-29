export const PRESETS = [
  { label: 'Tomato', color: '#ff4d2e' },
  { label: 'Box tape', color: '#ffc21a' },
  { label: 'Pine', color: '#1f8a4c' },
  { label: 'Royal', color: '#3355ff' },
  { label: 'Bubblegum', color: '#ff5fa2' },
  { label: 'Grape', color: '#7a3cff' },
];

export function normalizeHex(value: string): string | null {
  let hex = value.trim().replace(/^#?/, '#');
  if (/^#[0-9a-f]{3}$/i.test(hex)) hex = '#' + [...hex.slice(1)].map((c) => c + c).join('');
  return /^#[0-9a-f]{6}$/i.test(hex) ? hex.toLowerCase() : null;
}

export function inkFor(hex: string): string {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const channel = parseInt(hex.slice(i, i + 2), 16) / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return (luminance + 0.05) / 0.05 >= 1.05 / (luminance + 0.05) ? '#000000' : '#ffffff';
}
