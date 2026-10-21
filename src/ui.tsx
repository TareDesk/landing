import { useEffect, useRef, type ReactNode } from 'react';
import { motion } from 'motion/react';
import CountUp from './components/reactbits/CountUp';

/** Hand-drawn marker streak behind a word, in the mover's brand color. */
export function Streak({ children, delay = 0.2, variant = 'marker' }: { children: ReactNode; delay?: number; variant?: 'marker' | 'squiggle' }) {
  const marker = variant === 'marker';
  return (
    <span className="relative inline-block whitespace-nowrap isolate">
      <svg
        aria-hidden
        viewBox="0 0 300 40"
        preserveAspectRatio="none"
        className={`absolute -z-10 left-[-3%] w-[106%] overflow-visible ${marker ? 'bottom-[0.06em] h-[0.48em]' : 'bottom-[-0.18em] h-[0.3em]'}`}
      >
        <motion.path
          d={marker ? 'M6 24 C 70 12, 150 30, 294 14' : 'M4 26 Q 40 8 76 24 T 150 24 T 224 24 T 296 20'}
          stroke="var(--brand)"
          strokeWidth={marker ? 30 : 7}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-8% 0px' }}
          transition={{ duration: 0.75, delay, ease: [0.65, 0, 0.35, 1] }}
        />
      </svg>
      {children}
    </span>
  );
}

/** Count that eases from the previous value when `value` changes. */
export function Num({ value, className = '' }: { value: number; className?: string }) {
  const prev = useRef(0);
  useEffect(() => {
    prev.current = value;
  }, [value]);
  return <CountUp from={prev.current} to={value} duration={0.9} separator="," className={className} />;
}

export function fmt(n: number) {
  return Number.isInteger(n) ? n.toLocaleString('en-US') : n.toLocaleString('en-US', { maximumFractionDigits: 1 });
}

export type Status = 'upcoming' | 'review' | 'quote' | 'quoted' | 'approved';

const STATUS: Record<Status, { label: string; cls: string }> = {
  upcoming: { label: 'Upcoming', cls: 'bg-muted text-ink border-line' },
  review: { label: 'Needs review', cls: 'bg-review text-white border-review' },
  quote: { label: 'Needs quote', cls: 'bg-quote/10 text-quote-ink border-quote/40' },
  quoted: { label: 'Quoted', cls: 'bg-sky-wash text-sky-deep border-sky' },
  approved: { label: 'Customer approved', cls: 'bg-brand text-brand-ink border-brand' },
};

export function Pill({ status, className = '' }: { status: Status; className?: string }) {
  const s = STATUS[status];
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2 py-0.5 text-[11px] font-medium leading-5 ${s.cls} ${className}`}>
      {s.label}
    </span>
  );
}

/** The weigh-ticket card that totals an inventory. */
export function Ticket({ room, items, cu, lb, className = '' }: { room: string; items: number; cu: number; lb: number; className?: string }) {
  return (
    <div className={`rounded-[14px] border border-line bg-card p-4 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.35)] ${className}`}>
      <div className="flex items-center justify-between gap-6 font-mono text-[10px] uppercase tracking-[0.14em]">
        <span className="font-semibold text-ink">TareDesk</span>
        <span className="text-brand">Draft inventory</span>
      </div>
      <div className="mt-1 text-lg font-semibold tracking-tight">{room}</div>
      <div className="my-3 border-t border-dashed border-ring/60" />
      <div className="grid grid-cols-3 gap-4 font-mono">
        {[
          [items, 'Items'],
          [cu, 'Cu ft'],
          [lb, 'Est. lb'],
        ].map(([v, l]) => (
          <div key={l as string}>
            <Num value={v as number} className="tabular block text-2xl font-semibold leading-none tracking-tight" />
            <div className="mt-1.5 text-[10px] uppercase tracking-[0.12em] text-muted-fg">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`font-mono text-[11px] uppercase tracking-[0.16em] text-muted-fg ${className}`}>{children}</div>;
}

export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`size-4 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
