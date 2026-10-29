import { useState, type ReactNode } from 'react';
import { RoomPhoto } from '../RoomPhoto';
import { ReportPreview } from '../ReportPreview';
import { fmt } from '../ui';

function Step({ n, title, body, children }: { n: string; title: string; body: string; children: ReactNode }) {
  return (
    <article className="min-w-0 overflow-hidden rounded-2xl border border-line bg-card">
      <div className="p-5 sm:p-6">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-sm text-muted-fg">{n}</span>
          <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        </div>
        <p className="mt-2 text-[15px] leading-relaxed text-muted-fg">{body}</p>
      </div>
      {children}
    </article>
  );
}

function ReviewTable() {
  const [rows, setRows] = useState([
    { name: 'TV, 65 in', cu: 12, lb: 84, qty: 1, pack: 'Crate' },
    { name: 'Soundbar', cu: 2, lb: 14, qty: 1, pack: 'Owner packs' },
    { name: 'Book box', cu: 1.5, lb: 40, qty: 10, pack: 'Owner packs' },
    { name: 'Sofa', cu: 40, lb: 280, qty: 1, pack: 'Mover packs' },
    { name: 'Armchair', cu: 15, lb: 105, qty: 1, pack: 'Mover packs' },
    { name: 'Round coffee table', cu: 12, lb: 84, qty: 1, pack: 'Mover packs' },
    { name: 'Rattan ottoman', cu: 5, lb: 35, qty: 1, pack: 'Mover packs' },
  ]);
  const totals = rows.reduce((sum, row) => ({ cu: sum.cu + row.cu * row.qty, lb: sum.lb + row.lb * row.qty }), { cu: 0, lb: 0 });
  function bump(i: number, delta: number) {
    setRows((current) => current.map((row, index) => (index === i ? { ...row, qty: Math.max(0, row.qty + delta) } : row)));
  }
  return (
    <div className="px-4 pb-5 sm:px-6">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">Interactive sample inventory. Change quantities or packing to try the review controls.</caption>
        <thead>
          <tr className="border-b border-line text-xs text-muted-fg">
            <th scope="col" className="pb-2 font-medium">
              Item and packing
            </th>
            <th scope="col" className="pb-2 text-center font-medium">
              Quantity
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.name} className="border-b border-line">
              <th scope="row" className="py-2 pr-2 font-normal">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-medium">{row.name}</span>
                  <select
                    aria-label={`Packing for ${row.name}`}
                    value={row.pack}
                    onChange={(event) =>
                      setRows((current) => current.map((r, index) => (index === i ? { ...r, pack: event.target.value } : r)))
                    }
                    className="h-11 max-w-full rounded-md border border-line bg-card px-2 text-xs text-muted-fg sm:max-w-32"
                  >
                    <option>Owner packs</option>
                    <option>Mover packs</option>
                    <option>Crate</option>
                  </select>
                </div>
              </th>
              <td className="w-[116px] py-2 text-center">
                <div className="inline-flex items-center rounded-lg border border-line">
                  <button
                    type="button"
                    onClick={() => bump(i, -1)}
                    disabled={row.qty === 0}
                    aria-label={`Fewer ${row.name}`}
                    className="size-11 rounded-l-lg text-lg hover:bg-muted disabled:opacity-40"
                  >
                    −
                  </button>
                  <span className="tabular w-7 font-mono">{row.qty}</span>
                  <button
                    type="button"
                    onClick={() => bump(i, 1)}
                    aria-label={`More ${row.name}`}
                    className="size-11 rounded-r-lg text-lg hover:bg-muted"
                  >
                    +
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div role="status" className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="text-muted-fg">Sample totals</span>
        <span className="tabular font-mono font-semibold">
          {fmt(totals.lb)} lb · {fmt(totals.cu)} cu ft
        </span>
      </div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <h2 className="max-w-3xl text-3xl leading-tight font-semibold tracking-[-0.03em] sm:text-4xl">From walkthrough to customer review</h2>
      <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted-fg">
        Your team captures the rooms, checks the draft, and sends the reviewed inventory to the customer.
      </p>
      <div className="mt-10 grid items-start gap-6 lg:grid-cols-2">
        <Step
          n="01"
          title="Capture the rooms"
          body="Take photos during an in-person walkthrough, or guide the customer through the property on a video call."
        >
          <div className="px-5 pb-5 sm:px-6 sm:pb-6">
            <RoomPhoto id="m13" tags={false} className="rounded-xl" />
            <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <p>
                <strong className="block font-medium">In person</strong>
                <span className="text-muted-fg">Staff capture on a phone or tablet, with offline photo capture.</span>
              </p>
              <p>
                <strong className="block font-medium">Guided video</strong>
                <span className="text-muted-fg">A surveyor directs the walkthrough. Currently in testing.</span>
              </p>
            </div>
          </div>
        </Step>
        <Step
          n="02"
          title="Check the AI inventory draft"
          body="Items are matched to your catalog, with your labels, weights, and cubic footage. The photos show what each inventory line refers to."
        >
          <div className="px-5 pb-5 sm:px-6 sm:pb-6">
            <RoomPhoto id="m13" compact className="rounded-xl" />
            <p className="mt-4 text-sm leading-relaxed text-muted-fg">
              Review what the AI found, correct mismatches, and add anything the photos missed.
            </p>
          </div>
        </Step>
        <Step
          n="03"
          title="Adjust quantities and packing"
          body="Your estimator checks the details before sharing. Try changing a quantity or packing choice in this example."
        >
          <ReviewTable />
        </Step>
        <Step
          n="04"
          title="Your customer reviews and approves"
          body="Customers can propose additions, mark items as not moving, and approve the report. Your team reviews proposed changes."
        >
          <div className="px-5 pb-5 sm:px-6 sm:pb-6">
            <ReportPreview compact />
            <p className="mt-4 text-sm leading-relaxed text-muted-fg">
              Customer changes and approvals are recorded. Weights and volumes stay under your team’s control.
            </p>
          </div>
        </Step>
      </div>
    </section>
  );
}
