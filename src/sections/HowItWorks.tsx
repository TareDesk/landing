import { useMemo, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Stack from '../components/reactbits/Stack';
import StickerPeel from '../components/reactbits/StickerPeel';
import { RoomPhoto } from '../RoomPhoto';
import { useBrand } from '../brand';
import { Eyebrow, Num, Pill, Streak, fmt } from '../ui';

function Step({ n, title, body, children, className = '' }: { n: string; title: string; body: string; children: ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col overflow-hidden rounded-[20px] border border-line bg-card ${className}`}>
      <div className="p-6 pb-0 sm:p-8 sm:pb-0">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-sm text-brand">{n}</span>
          <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h3>
        </div>
        <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted-fg">{body}</p>
      </div>
      <div className="relative mt-6 flex flex-1 flex-col justify-end">{children}</div>
    </div>
  );
}

const STACK = ['m03', 'm08', 'm14', 'c01', 'm13'] as const;

function PhotoStack() {
  return (
    <div className="flex w-full flex-1 items-center justify-center bg-muted/70 px-6 pt-10 pb-12">
      <div className="relative">
        <div className="size-[220px] sm:size-[250px]">
          <Stack
            randomRotation
            sensitivity={140}
            sendToBackOnClick
            cards={STACK.map(id => (
              <img key={id} src={`/rooms/${id}.jpg`} alt="" draggable={false} className="pointer-events-none size-full object-cover" />
            ))}
          />
        </div>
        <div className="pointer-events-none absolute -right-28 -bottom-4 hidden rotate-3 font-mono text-[11px] leading-tight text-muted-fg sm:block">
          ← drag or tap
          <br />
          to flip rooms
        </div>
      </div>
    </div>
  );
}

type Row = { name: string; cu: number; lb: number; qty: number; pack: 'PBO' | 'CP' | 'Crate'; unsure?: boolean };

function ReviewTable() {
  const [rows, setRows] = useState<Row[]>([
    { name: 'Sofa, 3-seat', cu: 35, lb: 245, qty: 1, pack: 'CP' },
    { name: 'Book box, small', cu: 1.5, lb: 40, qty: 10, pack: 'PBO' },
    { name: 'TV, 65 in', cu: 12, lb: 84, qty: 1, pack: 'Crate' },
    { name: 'Box labeled “misc”', cu: 3, lb: 30, qty: 4, pack: 'PBO', unsure: true },
    { name: 'Armchair', cu: 15, lb: 105, qty: 1, pack: 'CP' },
  ]);
  const tot = useMemo(() => rows.reduce((a, r) => ({ cu: a.cu + r.cu * r.qty, lb: a.lb + r.lb * r.qty }), { cu: 0, lb: 0 }), [rows]);
  const bump = (i: number, d: number) => setRows(rs => rs.map((r, j) => (j === i ? { ...r, qty: Math.max(0, r.qty + d), unsure: false } : r)));
  const cycle = (i: number) =>
    setRows(rs => rs.map((r, j) => (j === i ? { ...r, pack: r.pack === 'PBO' ? 'CP' : r.pack === 'CP' ? 'Crate' : 'PBO' } : r)));

  return (
    <div className="flex w-full flex-1 flex-col justify-center px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="overflow-hidden rounded-xl border border-line text-[13px]">
        <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-line bg-muted px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-fg sm:grid-cols-[1fr_70px_auto_auto]">
          <span>Item</span>
          <span className="hidden text-right sm:block">Cu ft</span>
          <span className="text-center">Qty</span>
          <span className="w-12 text-center">Pack</span>
        </div>
        {rows.map((r, i) => (
          <div
            key={r.name}
            className={`grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-line px-3 py-2 last:border-0 sm:grid-cols-[1fr_70px_auto_auto] ${r.unsure ? 'bg-quote/10' : ''}`}
          >
            <span className="flex min-w-0 items-center gap-2">
              <span className="truncate font-medium">{r.name}</span>
              {r.unsure && <span className="shrink-0 rounded border border-quote/40 bg-card px-1.5 font-mono text-[10px] text-quote-ink">check me</span>}
            </span>
            <span className="tabular hidden text-right font-mono text-muted-fg sm:block">{fmt(r.cu * r.qty)}</span>
            <span className="flex items-center rounded-md border border-line bg-card">
              <button type="button" onClick={() => bump(i, -1)} className="px-2 py-0.5 text-muted-fg hover:text-ink" aria-label={`Fewer ${r.name}`}>−</button>
              <span className="tabular w-6 text-center font-mono">{r.qty}</span>
              <button type="button" onClick={() => bump(i, 1)} className="px-2 py-0.5 text-muted-fg hover:text-ink" aria-label={`More ${r.name}`}>+</button>
            </span>
            <button type="button" onClick={() => cycle(i)} className="w-12 rounded-md border border-line bg-card py-0.5 text-center font-mono text-[11px] hover:border-ring" title="Tap to change packing">
              {r.pack}
            </button>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between font-mono text-[12px]">
        <span className="text-muted-fg">Totals update as you edit</span>
        <span>
          <Num value={tot.cu} className="tabular font-semibold" /> cu ft · <Num value={tot.lb} className="tabular font-semibold" /> lb
        </span>
      </div>
    </div>
  );
}

function stickerSvg(color: string, ink: string, mover: string) {
  const name = mover.length > 22 ? mover.slice(0, 21) + '…' : mover;
  const esc = (s: string) => s.replace(/[<>&"']/g, c => `&#${c.charCodeAt(0)};`);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">
  <circle cx="120" cy="120" r="114" fill="#fff"/>
  <circle cx="120" cy="120" r="104" fill="${color}"/>
  <circle cx="120" cy="120" r="88" fill="none" stroke="${ink}" stroke-opacity=".35" stroke-width="2" stroke-dasharray="4 6"/>
  <path d="M84 122l24 24 50-54" fill="none" stroke="${ink}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="120" y="70" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-weight="800" font-size="22" letter-spacing="3" fill="${ink}">APPROVED</text>
  <text x="120" y="182" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-weight="600" font-size="13" fill="${ink}">${esc(name)}</text>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function PhoneApprove() {
  const { mover, color, ink } = useBrand();
  const [approved, setApproved] = useState(false);
  const rooms = [
    ['Family room', 16, 101],
    ['Bedroom', 10, 101],
    ['Dining room', 17, 104],
    ['Living room', 12, 96],
  ] as const;

  return (
    <div className="relative flex w-full flex-1 items-end justify-center bg-muted/70 px-6 pt-8">
      <div className="relative w-[260px] rounded-t-[34px] border-[7px] border-b-0 border-ink bg-card">
        <div className="mx-auto mt-2 h-4 w-20 rounded-full bg-ink" />
        <div className="px-3 pt-3 pb-4">
          <div className="rounded-xl p-3" style={{ background: color, color: ink }}>
            <div className="text-[11px] opacity-80">{mover || 'Your moving company'}</div>
            <div className="text-[15px] leading-tight font-semibold">Your moving inventory</div>
            <div className="mt-1 text-[11px] opacity-80">Tues, May 12 · Boston → Denver</div>
          </div>
          <div className="mt-3 overflow-hidden rounded-lg">
            <img src="/rooms/c01.jpg" alt="" className="h-24 w-full object-cover" />
          </div>
          <div className="mt-2 divide-y divide-line text-[12px]">
            {rooms.map(([r, n, cu]) => (
              <div key={r} className="flex items-center justify-between py-1.5">
                <span className="font-medium">{r}</span>
                <span className="font-mono text-muted-fg">
                  {n} items · {cu} cu ft
                </span>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setApproved(true)}
            disabled={approved}
            className="mt-3 h-10 w-full rounded-lg text-[13px] font-semibold transition active:scale-[.98] disabled:opacity-60"
            style={{ background: color, color: ink }}
          >
            {approved ? 'Approved — thanks!' : 'Looks right · Approve'}
          </button>
          <div className="mt-2 text-center text-[11px] text-muted-fg">Something missing? Add it here.</div>
        </div>

        <AnimatePresence>
          {approved && (
            <motion.div
              initial={{ opacity: 0, scale: 1.8, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 14 }}
              className="absolute inset-0"
            >
              <StickerPeel imageSrc={stickerSvg(color, ink, mover)} width={130} rotate={0} peelDirection={-30} shadowIntensity={0.35} lightingIntensity={0.08} initialPosition={{ x: 60, y: 120 }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {approved && (
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
          <Pill status="approved" />
          <span className="font-mono text-[10px] text-muted-fg">signed 9:41 AM · drag the sticker</span>
        </div>
      )}
    </div>
  );
}

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <Eyebrow>How it works</Eyebrow>
      <h2 className="mt-3 max-w-3xl text-4xl leading-[1.05] font-semibold tracking-[-0.03em] sm:text-5xl">
        Four steps. Only <Streak>one</Streak> of them is the AI.
      </h2>
      <p className="mt-4 max-w-xl text-[17px] text-muted-fg">The software does the typing. Your people make the calls, the same way they do now, just without the drive.</p>

      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        <Step n="01" title="Photos come in" body="Your estimator or your customer snaps each room. Messy is fine. Real houses are messy.">
          <PhotoStack />
        </Step>
        <Step n="02" title="TareDesk drafts the inventory" body="Items get tagged on the photo and matched to your catalog, with quantities, cubic feet and weight.">
          <div className="w-full px-4 pb-4 sm:px-6 sm:pb-6">
            <RoomPhoto id="c01" compact className="rounded-xl" />
          </div>
        </Step>
        <Step n="03" title="Your estimator fixes what’s off" body="Change quantities, packing and notes before anything goes out. Try it, the numbers are live.">
          <ReviewTable />
        </Step>
        <Step n="04" title="Your customer signs off" body="They get tagged photos and the list, in your colors. They add what’s missing, then approve.">
          <PhoneApprove />
        </Step>
      </div>
    </section>
  );
}
