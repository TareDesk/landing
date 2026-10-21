import { useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { motion, useInView } from 'motion/react';
import rooms from './rooms.json';
import { fmt } from './ui';

export type RoomId = keyof typeof rooms;
type Item = { name: string; cu: number; lb: number; dots: number[][]; label: number[] };

export function roomTotals(id: RoomId) {
  const items = rooms[id].items as Item[];
  return {
    room: rooms[id].room,
    items: items.reduce((n, i) => n + (Number(i.name.match(/ ×(\d+)$/)?.[1]) || 1), 0),
    cu: items.reduce((n, i) => n + i.cu, 0),
    lb: items.reduce((n, i) => n + i.lb, 0),
  };
}

/** A room photo with AI-style item stickers rendered as live DOM (so they pick up the brand color). */
export function RoomPhoto({
  id,
  tags = true,
  compact = false,
  className = '',
  eager = false,
}: {
  id: RoomId;
  tags?: boolean;
  compact?: boolean;
  className?: string;
  eager?: boolean;
}) {
  const room = rooms[id];
  const items = room.items as Item[];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const show = tags && inView;
  const [hoverIdx, setHover] = useState<number | null>(null);
  // Label positions (in % of the photo) — users can drag them around.
  const [pos, setPos] = useState(() => items.map(it => it.label));
  const [dragging, setDragging] = useState<number | null>(null);
  const [front, setFront] = useState<number | null>(null);
  const drag = useRef<{ i: number; sx: number; sy: number; ox: number; oy: number; w: number; h: number } | null>(null);
  const hover = dragging ?? hoverIdx;
  const settled = dragging !== null || hoverIdx !== null;

  function onDown(e: ReactPointerEvent<HTMLDivElement>, i: number) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { i, sx: e.clientX, sy: e.clientY, ox: pos[i][0], oy: pos[i][1], w: r.width, h: r.height };
    setDragging(i);
    setFront(i);
  }
  function onMove(e: ReactPointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d) return;
    const clamp = (v: number) => Math.min(97, Math.max(3, v));
    const x = clamp(d.ox + ((e.clientX - d.sx) / d.w) * 100);
    const y = clamp(d.oy + ((e.clientY - d.sy) / d.h) * 100);
    setPos(ps => ps.map((p, j) => (j === d.i ? [x, y] : p)));
  }
  function onUp() {
    drag.current = null;
    setDragging(null);
  }

  return (
    <div ref={ref} className={`relative overflow-hidden bg-muted ${className}`} style={{ aspectRatio: `${room.w} / ${room.h}` }}>
      <img
        src={`/rooms/${id}.jpg`}
        alt={`${room.room} photo`}
        loading={eager ? 'eager' : 'lazy'}
        className="absolute inset-0 size-full object-cover"
        draggable={false}
      />

      <svg className="pointer-events-none absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        {items.flatMap((it, i) =>
          it.dots.map(([x, y], j) => (
            <motion.line
              key={`${i}-${j}`}
              x1={x}
              y1={y}
              x2={pos[i][0]}
              y2={pos[i][1]}
              stroke="white"
              strokeOpacity={hover === null || hover === i ? 0.95 : 0.35}
              strokeWidth={hover === i ? 2.4 : 1.4}
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={show ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.4, delay: show ? 0.15 + i * 0.12 : 0 }}
              style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,.45))' }}
            />
          )),
        )}
      </svg>

      {items.flatMap((it, i) =>
        it.dots.map(([x, y], j) => (
          <motion.span
            key={`d${i}-${j}`}
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
            initial={{ scale: 0 }}
            animate={{ scale: show ? (hover === i ? 1.35 : 1) : 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 22, delay: show && !settled ? 0.1 + i * 0.12 : 0 }}
          >
            <span className="block size-3 rounded-full border-[3px] border-[#0a0a0a] bg-white shadow-[0_0_0_5px_rgba(255,255,255,.35),0_2px_4px_rgba(0,0,0,.4)] sm:size-3.5" />
          </motion.span>
        )),
      )}

      {items.map((it, i) => {
        const [lx, ly] = pos[i];
        const ox = it.label[0];
        const tx = ox < 18 ? '-12%' : ox > 82 ? '-88%' : '-50%';
        return (
          <motion.div
            key={it.name + i}
            className={`absolute touch-none select-none ${dragging === i ? 'z-30 cursor-grabbing' : front === i ? 'z-20 cursor-grab' : 'z-10 cursor-grab'}`}
            style={{ left: `${lx}%`, top: `${ly}%`, x: tx, y: '-50%' }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={show ? { opacity: 1, scale: dragging === i ? 1.1 : hover === i ? 1.06 : 1, rotate: dragging === i ? -3 : 0 } : { opacity: 0, scale: 0.6 }}
            transition={{ type: 'spring', stiffness: 420, damping: 24, delay: show && !settled ? 0.2 + i * 0.12 : 0 }}
            onPointerDown={e => onDown(e, i)}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            title="Drag me"
            onHoverStart={() => setHover(i)}
            onHoverEnd={() => setHover(null)}
          >
            <span
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white/95 font-medium text-[#0a0a0a] transition-shadow ${dragging === i ? 'shadow-[0_14px_28px_-8px_rgba(0,0,0,.6)]' : 'shadow-[0_6px_16px_-6px_rgba(0,0,0,.55)]'} ring-1 ring-black/5 ${
                compact ? 'px-2 py-0.5 text-[10px]' : 'px-2 py-0.5 text-[10px] sm:px-2.5 sm:py-1 sm:text-xs'
              }`}
            >
              <span className="size-1.5 shrink-0 rounded-full bg-brand sm:size-2" />
              <span className="font-semibold">{it.name}</span>
              {!compact && (
                <span className="hidden font-mono text-[10px] text-[#737373] md:inline">
                  {fmt(it.cu)} cu ft · {fmt(it.lb)} lb
                </span>
              )}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
