import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type Brand = { color: string; mover: string; theme: Theme };

export const PRESETS: { label: string; color: string }[] = [
  { label: 'Tomato', color: '#ff4d2e' },
  { label: 'Box tape', color: '#ffc21a' },
  { label: 'Pine', color: '#1f8a4c' },
  { label: 'Royal', color: '#3355ff' },
  { label: 'Bubblegum', color: '#ff5fa2' },
  { label: 'Grape', color: '#7a3cff' },
];

const DEFAULT: Brand = { color: '#ff4d2e', mover: 'Hartwell Moving Co.', theme: 'light' };
const THEMES: Theme[] = ['light', 'dark', 'system'];
const asTheme = (v: unknown): Theme | null => (THEMES.includes(v as Theme) ? (v as Theme) : null);
const KEY = 'taredesk-brand';
const HEX = /^#[0-9a-f]{6}$/i;

export function normalizeHex(v: string): string | null {
  let s = v.trim().replace(/^#?/, '#');
  if (/^#[0-9a-f]{3}$/i.test(s)) s = '#' + [...s.slice(1)].map(c => c + c).join('');
  return HEX.test(s) ? s.toLowerCase() : null;
}

/** Dark ink on light brands, white ink on dark brands (WCAG relative luminance). */
export function inkFor(hex: string): string {
  const [r, g, b] = [1, 3, 5].map(i => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return L > 0.4 ? '#0a0a0a' : '#ffffff';
}

function initial(): Brand {
  let saved: Partial<Brand> = {};
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (raw) saved = { color: normalizeHex(raw.color || '') || undefined, mover: raw.mover ? String(raw.mover) : undefined, theme: asTheme(raw.theme) || undefined };
  } catch {
    /* storage blocked */
  }
  // ?brand=1f8a4c&mover=Pine%20Movers&theme=dark lets sales send a prospect a page in their colors.
  try {
    const q = new URLSearchParams(window.location.search);
    const c = q.get('brand') && normalizeHex(q.get('brand')!);
    const m = q.get('mover');
    const t = asTheme(q.get('theme'));
    if (c || m || t) return { color: c || saved.color || DEFAULT.color, mover: m || saved.mover || DEFAULT.mover, theme: t || saved.theme || DEFAULT.theme };
  } catch {
    /* ignore */
  }
  return { ...DEFAULT, ...Object.fromEntries(Object.entries(saved).filter(([, v]) => v !== undefined)) };
}

function useSystemDark() {
  const [dark, setDark] = useState(() => {
    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });
  useEffect(() => {
    try {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const on = (e: MediaQueryListEvent) => setDark(e.matches);
      mq.addEventListener('change', on);
      return () => mq.removeEventListener('change', on);
    } catch {
      return undefined;
    }
  }, []);
  return dark;
}

type Ctx = Brand & {
  ink: string;
  dark: boolean;
  setTheme: (t: Theme) => void;
  setColor: (c: string) => void;
  setMover: (m: string) => void;
  reset: () => void;
  shareUrl: () => string;
};

const BrandCtx = createContext<Ctx | null>(null);

export function BrandProvider({ children }: { children: ReactNode }) {
  const [brand, setBrand] = useState<Brand>(initial);
  const ink = inkFor(brand.color);
  const systemDark = useSystemDark();
  const dark = brand.theme === 'dark' || (brand.theme === 'system' && systemDark);

  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty('--brand', brand.color);
    root.setProperty('--brand-ink', ink);
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    try {
      localStorage.setItem(KEY, JSON.stringify(brand));
    } catch {
      /* storage blocked */
    }
  }, [brand, ink, dark]);

  const value = useMemo<Ctx>(
    () => ({
      ...brand,
      ink,
      dark,
      setTheme: t => setBrand(b => ({ ...b, theme: t })),
      setColor: c => setBrand(b => ({ ...b, color: c })),
      setMover: m => setBrand(b => ({ ...b, mover: m })),
      reset: () => setBrand(DEFAULT),
      shareUrl: () => {
        const u = new URL(window.location.href);
        u.searchParams.set('brand', brand.color.slice(1));
        u.searchParams.set('mover', brand.mover);
        if (brand.theme !== 'light') u.searchParams.set('theme', brand.theme);
        else u.searchParams.delete('theme');
        return u.toString();
      },
    }),
    [brand, ink, dark],
  );

  return <BrandCtx.Provider value={value}>{children}</BrandCtx.Provider>;
}

export function useBrand() {
  const v = useContext(BrandCtx);
  if (!v) throw new Error('useBrand outside BrandProvider');
  return v;
}
