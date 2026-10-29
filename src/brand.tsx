import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { inkFor, normalizeHex } from './brand-colors';

export type Theme = 'light' | 'dark' | 'system';
export type Brand = { color: string; mover: string; theme: Theme };

const DEFAULT: Brand = { color: '#ff4d2e', mover: 'Your Moving Company', theme: 'light' };
const THEMES: Theme[] = ['light', 'dark', 'system'];
const asTheme = (v: unknown): Theme | null => (THEMES.includes(v as Theme) ? (v as Theme) : null);
const KEY = 'taredesk-brand';

function initial(): Brand {
  let saved: Partial<Brand> = {};
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (raw)
      saved = {
        color: normalizeHex(raw.color || '') || undefined,
        mover: raw.mover ? String(raw.mover).slice(0, 32) : undefined,
        theme: asTheme(raw.theme) || undefined,
      };
  } catch {
    /* storage blocked */
  }
  // ?brand=1f8a4c&mover=Pine%20Movers&theme=dark lets sales send a prospect a page in their colors.
  try {
    const q = new URLSearchParams(window.location.search);
    const c = q.get('brand') && normalizeHex(q.get('brand')!);
    const m = q.get('mover')?.slice(0, 32);
    const t = asTheme(q.get('theme'));
    if (c || m || t)
      return {
        color: c || saved.color || DEFAULT.color,
        mover: m || saved.mover || DEFAULT.mover,
        theme: t || saved.theme || DEFAULT.theme,
      };
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
      setTheme: (t) => setBrand((b) => ({ ...b, theme: t })),
      setColor: (c) => setBrand((b) => ({ ...b, color: c })),
      setMover: (m) => setBrand((b) => ({ ...b, mover: m })),
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
