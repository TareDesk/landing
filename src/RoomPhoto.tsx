import rooms from './rooms.json';
import { fmt } from './ui';

export type RoomId = keyof typeof rooms;

export function roomTotals(id: RoomId) {
  return {
    room: rooms[id].room,
    items: rooms[id].items.reduce((n, item) => n + (Number(item.name.match(/ ×(\d+)$/)?.[1]) || 1), 0),
    cu: rooms[id].items.reduce((n, item) => n + item.cu, 0),
    lb: rooms[id].items.reduce((n, item) => n + item.lb, 0),
  };
}

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
  return (
    <div className={`relative overflow-hidden bg-muted ${className}`} style={{ aspectRatio: `${room.w} / ${room.h}` }}>
      <img
        src={`/rooms/${id}.jpg`}
        alt={`${room.room}${tags ? ' with example inventory tags' : ''}`}
        loading={eager ? 'eager' : 'lazy'}
        className="absolute inset-0 size-full object-cover"
      />
      {tags && (
        <>
          <svg className="pointer-events-none absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            {room.items.flatMap((item, i) =>
              item.dots.map(([x, y], j) => (
                <g key={`${i}-${j}`}>
                  <line
                    x1={x}
                    y1={y}
                    x2={item.label[0]}
                    y2={item.label[1]}
                    stroke="white"
                    strokeWidth="1.4"
                    vectorEffect="non-scaling-stroke"
                    style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,.6))' }}
                  />
                  <ellipse
                    cx={x}
                    cy={y}
                    rx=".6"
                    ry=".9"
                    fill="white"
                    stroke="#0a0a0a"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              )),
            )}
          </svg>
          {room.items.map((item) => (
            <div
              key={item.name}
              className="absolute"
              style={{
                left: `${item.label[0]}%`,
                top: `${item.label[1]}%`,
                transform: `translate(${item.label[0] < 18 ? '-12%' : item.label[0] > 82 ? '-88%' : '-50%'}, -50%)`,
              }}
            >
              <span
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-2 py-1 text-[#0a0a0a] shadow-[0_3px_10px_-3px_rgba(0,0,0,.5)] ${compact ? 'text-[10px]' : 'text-[10px] sm:text-xs'}`}
              >
                <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-brand" />
                <span className="font-semibold">{item.name}</span>
                {!compact && (
                  <span className="hidden font-mono text-[10px] text-[#595959] xl:inline">
                    {fmt(item.cu)} cu ft · {fmt(item.lb)} lb
                  </span>
                )}
              </span>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
