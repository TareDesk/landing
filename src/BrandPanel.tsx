import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PRESETS, normalizeHex, useBrand, type Theme } from './brand';

const icon = (d: string) => (
  <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={d} />
  </svg>
);
const THEME_OPTS: [Theme, string, React.ReactNode][] = [
  ['light', 'Light', icon('M8 2v1.5M8 12.5V14M2 8h1.5M12.5 8H14M3.8 3.8l1 1M11.2 11.2l1 1M3.8 12.2l1-1M11.2 4.8l1-1M8 5.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z')],
  ['dark', 'Dark', icon('M13.5 9.6A5.6 5.6 0 0 1 6.4 2.5a5.6 5.6 0 1 0 7.1 7.1Z')],
  ['system', 'Auto', icon('M2.5 3.5h11v7h-11zM6 13.5h4M8 10.5v3')],
];

export function BrandControls({ dense = false }: { dense?: boolean }) {
  const { color, mover, theme, setTheme, setColor, setMover } = useBrand();
  const [hex, setHex] = useState(color);
  useEffect(() => setHex(color), [color]);

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-muted-fg">Brand color</label>
        <div className="flex flex-wrap items-center gap-2">
          {PRESETS.map(p => (
            <button
              key={p.color}
              type="button"
              title={p.label}
              aria-label={`Use ${p.label}`}
              onClick={() => setColor(p.color)}
              className={`size-8 rounded-full ring-offset-2 transition hover:scale-110 ${color === p.color ? 'ring-2 ring-ink' : 'ring-1 ring-black/10'}`}
              style={{ background: p.color }}
            />
          ))}
          <label className="relative flex size-8 cursor-pointer items-center justify-center rounded-full ring-1 ring-black/10 hover:scale-110 transition" title="Custom color"
            style={{ background: 'conic-gradient(#ff4d2e, #ffc21a, #1f8a4c, #00a5ef, #7a3cff, #ff5fa2, #ff4d2e)' }}>
            <span className="size-4 rounded-full bg-card ring-1 ring-black/10" />
            <input type="color" value={color} onChange={e => setColor(e.target.value)} className="absolute inset-0 cursor-pointer opacity-0" aria-label="Pick a custom color" />
          </label>
        </div>
      </div>

      <div className={`grid gap-3 ${dense ? 'grid-cols-[92px_1fr]' : 'grid-cols-[110px_1fr]'}`}>
        <div>
          <label htmlFor={`hex${dense}`} className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-muted-fg">Hex</label>
          <input
            id={`hex${dense}`}
            value={hex}
            onChange={e => {
              setHex(e.target.value);
              const n = normalizeHex(e.target.value);
              if (n) setColor(n);
            }}
            className="h-9 w-full rounded-md border border-line bg-card px-2.5 font-mono text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
          />
        </div>
        <div>
          <label htmlFor={`mover${dense}`} className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-muted-fg">Moving company</label>
          <input
            id={`mover${dense}`}
            value={mover}
            maxLength={32}
            onChange={e => setMover(e.target.value)}
            className="h-9 w-full rounded-md border border-line bg-card px-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
          />
        </div>
      </div>

      <div>
        <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-fg">Appearance</div>
        <div className="relative grid grid-cols-3 rounded-lg border border-line bg-muted p-0.5 text-[13px]" role="radiogroup" aria-label="Appearance">
          {THEME_OPTS.map(([t, label, icon]) => (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={theme === t}
              onClick={() => setTheme(t)}
              className={`relative flex h-8 items-center justify-center gap-1.5 rounded-md font-medium transition ${theme === t ? 'text-ink' : 'text-muted-fg hover:text-ink'}`}
            >
              {theme === t && (
                <motion.span
                  layoutId={`theme-pill-${dense}`}
                  className="absolute inset-0 rounded-md bg-card shadow-sm ring-1 ring-line"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative">{icon}</span>
              <span className="relative">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Floating "settings" button: the one editable color for the whole page. */
export function BrandPanel() {
  const { color, ink } = useBrand();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onDown = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    const openIt = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('open-brand-panel', openIt);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('open-brand-panel', openIt);
    };
  }, []);

  return (
    <div ref={ref} className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
            className="absolute right-0 bottom-14 w-[min(340px,calc(100vw-2rem))] origin-bottom-right rounded-2xl border border-line bg-card p-4 shadow-[0_30px_60px_-20px_rgba(0,0,0,.35)]"
            role="dialog"
            aria-label="Brand settings"
          >
            <div className="mb-1 flex items-center justify-between">
              <div className="text-sm font-semibold">Make it yours</div>
              <button type="button" onClick={() => setOpen(false)} className="rounded p-1 text-muted-fg hover:bg-muted hover:text-ink" aria-label="Close">
                <svg viewBox="0 0 16 16" className="size-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8" /></svg>
              </button>
            </div>
            <p className="mb-4 text-[13px] leading-snug text-muted-fg">
              Your customers see your color on their review link. Pick it here and the whole page follows.
            </p>
            <BrandControls dense />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen(o => !o)}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
        className="flex h-11 items-center gap-2 rounded-full border border-line bg-card py-1 pr-4 pl-1.5 text-sm font-medium shadow-[0_12px_30px_-12px_rgba(0,0,0,.4)]"
        aria-expanded={open}
      >
        <span className="flex size-8 items-center justify-center rounded-full" style={{ background: color, color: ink }}>
          <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M3 17c2.5 0 4-1.2 4-3.4 0-1.2-.9-2.1-2-2.1s-2 .9-2 2.1V17Z" />
            <path d="M7.4 11.6 16 3l1 1-8.6 8.6" />
          </svg>
        </span>
        Brand color
      </motion.button>
    </div>
  );
}

export function openBrandPanel() {
  window.dispatchEvent(new Event('open-brand-panel'));
}
