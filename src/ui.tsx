import type { ReactNode } from 'react';

export function Streak({ children }: { children: ReactNode }) {
  return (
    <span className="relative isolate inline-block whitespace-nowrap">
      <svg
        aria-hidden
        viewBox="0 0 300 24"
        preserveAspectRatio="none"
        className="absolute -bottom-[0.2em] -left-[2%] -z-10 h-[0.22em] w-[104%] overflow-visible"
      >
        <path
          d="M3 13 Q 22 3 41 13 T 79 13 T 117 13 T 155 13 T 193 13 T 231 13 T 269 13 T 297 13"
          stroke="var(--brand)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      {children}
    </span>
  );
}

export function fmt(n: number) {
  return n.toLocaleString('en-US', { maximumFractionDigits: 1 });
}

export function Num({ value, className = '' }: { value: number; className?: string }) {
  return <span className={className}>{fmt(value)}</span>;
}

export function Pill() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-xs font-medium text-brand-ink">
      <svg aria-hidden viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="m3 8 3 3 7-7" />
      </svg>
      Customer approved
    </span>
  );
}

export function Ticket({ room, items, cu, lb }: { room: string; items: number; cu: number; lb: number }) {
  return (
    <div className="rounded-[14px] bg-card p-4 shadow-[0_12px_30px_-12px_rgba(0,0,0,.3)]">
      <div className="flex items-center justify-between gap-4 text-xs text-muted-fg">
        <span className="font-semibold text-ink">TareDesk</span>
        <span>Example draft</span>
      </div>
      <div className="mt-1 text-lg font-semibold tracking-tight">{room}</div>
      <dl className="mt-3 grid grid-cols-3 gap-4 border-t border-line pt-3">
        {[
          [items, 'Items'],
          [cu, 'Cu ft'],
          [lb, 'Est. lb'],
        ].map(([value, label]) => (
          <div key={label}>
            <dt className="text-xs text-muted-fg">{label}</dt>
            <dd className="tabular mt-1 font-mono text-xl font-semibold">{fmt(Number(value))}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className={`size-4 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
