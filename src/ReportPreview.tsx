import { useBrand } from './brand';
import rooms from './rooms.json';
import { RoomPhoto, roomTotals } from './RoomPhoto';
import { fmt, Pill } from './ui';

export function ReportPreview({ compact = false }: { compact?: boolean }) {
  const { mover, color, ink } = useBrand();
  const totals = roomTotals('m13');
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-card text-ink">
      <div className="px-5 py-4" style={{ background: color, color: ink }}>
        <div className="text-sm font-medium break-words">{mover || 'Your moving company'}</div>
        <div className="mt-1 text-xl font-semibold tracking-tight">Moving inventory</div>
      </div>
      <div className="p-4 sm:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm font-medium">{totals.room}</span>
          <Pill />
        </div>
        <RoomPhoto id="m13" compact className="rounded-lg" />
        {!compact && (
          <table className="mt-4 w-full text-left text-xs sm:text-sm">
            <caption className="sr-only">Sample family room inventory; weights and volumes are line totals.</caption>
            <thead>
              <tr className="border-b border-line text-xs text-muted-fg">
                <th scope="col" className="py-2 font-medium">
                  Item
                </th>
                <th scope="col" className="py-2 text-right font-medium">
                  Lb
                </th>
                <th scope="col" className="py-2 text-right font-medium">
                  Cu ft
                </th>
              </tr>
            </thead>
            <tbody>
              {rooms.m13.items.map((item) => (
                <tr key={item.name} className="border-b border-line">
                  <th scope="row" className="py-2 pr-2 font-normal">
                    {item.name}
                  </th>
                  <td className="tabular py-2 text-right font-mono">{fmt(item.lb)}</td>
                  <td className="tabular py-2 text-right font-mono">{fmt(item.cu)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="mt-4 flex flex-wrap justify-between gap-2 text-sm">
          <span>{totals.items} items</span>
          <span className="tabular font-mono font-semibold">
            {fmt(totals.lb)} lb · {fmt(totals.cu)} cu ft
          </span>
        </div>
        <p className="mt-3 text-xs text-muted-fg">Example report · illustrative inventory and approval.</p>
      </div>
    </div>
  );
}
