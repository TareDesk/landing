import { useState } from 'react';
import { BrandControls } from '../BrandPanel';
import { useBrand } from '../brand';
import { Arrow, fmt, Streak } from '../ui';

const ITEM_ICONS = {
  sofa: 'M4 11V8a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v3M4 16H2v-5h4v4h12v-4h4v5h-2M4 16v3m16-3v3M6 16h12',
  bed: 'M3 18V7m0 7h18v4M7 10h4v4H7zm6 0h6a2 2 0 0 1 2 2v2',
  box: 'm3 7 9-4 9 4v11l-9 4-9-4zm0 0 9 4 9-4m-9 4v11M7 5l10 4',
  table: 'M3 8h18v4H3zm2 4v9m14-9v9M7 8V5h10v3',
  piano: 'M4 5h16v14H4zm0 8h16M8 13v6m4-6v6m4-6v6M7 5v5m5-5v5m5-5v5',
  desk: 'M3 7h18v4H3zm2 4v10m14-10v10M14 11v6h5m-3-3h1',
  chair: 'M7 13V4h10v9M5 13h14v4H5zm3 4v4m8-4v4',
  cabinet: 'M5 3h14v18H5zm0 9h14M10 7h4m-4 9h4',
};
const ITEM_ROWS: [keyof typeof ITEM_ICONS, string, string][][] = [
  [
    ['sofa', 'Sofa, 3-seat', '35 cu ft'],
    ['bed', 'Queen bed', '65 cu ft'],
    ['box', 'Book boxes', '40 lb each'],
    ['table', 'Dining table', '20 cu ft'],
    ['piano', 'Upright piano', 'Special handling'],
  ],
  [
    ['desk', 'Office desk', '30 cu ft'],
    ['chair', 'Office chair', '10 cu ft'],
    ['cabinet', 'Filing cabinet', '25 cu ft'],
    ['box', 'Archive boxes', 'Owner packed'],
    ['table', 'Conference table', '40 cu ft'],
  ],
];

export function Marquee() {
  const [paused, setPaused] = useState(false);
  return (
    <section
      aria-label="Illustrative home and office catalog items"
      className="relative border-y border-line bg-muted/50 py-5"
      data-paused={paused}
    >
      <div className="pr-14 motion-reduce:pr-0">
        {ITEM_ROWS.map((items, row) => (
          <div
            key={row}
            className="marquee-window py-1.5"
            role="region"
            aria-label={`Sample ${row === 0 ? 'home' : 'office'} catalog items; scroll horizontally to explore`}
            tabIndex={0}
          >
            <div className={`marquee-track ${row === 1 ? 'marquee-reverse' : ''}`}>
              {[0, 1].map((copy) => (
                <ul
                  key={copy}
                  aria-hidden={copy === 1 ? true : undefined}
                  className={`flex shrink-0 gap-3 pr-3 ${copy === 1 ? 'marquee-copy' : ''}`}
                >
                  {items.map(([icon, name, meta]) => (
                    <li
                      key={name}
                      className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-line bg-card px-4 py-2 text-sm"
                    >
                      <svg
                        aria-hidden
                        viewBox="0 0 24 24"
                        className="size-5 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d={ITEM_ICONS[icon]} />
                      </svg>
                      <span className="font-medium">{name}</span>
                      <span className="text-xs text-muted-fg">{meta}</span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        aria-label={paused ? 'Play item carousel' : 'Pause item carousel'}
        aria-pressed={paused}
        onClick={() => setPaused(!paused)}
        className="absolute top-1/2 right-2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-card motion-reduce:hidden"
      >
        <svg aria-hidden viewBox="0 0 16 16" className="size-4" fill="currentColor">
          {paused ? <path d="m5 3 8 5-8 5z" /> : <path d="M4 3h3v10H4zm5 0h3v10H9z" />}
        </svg>
      </button>
    </section>
  );
}

export function Problems() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
      <div>
        <h2 className="text-3xl leading-tight font-semibold tracking-[-0.03em] sm:text-4xl">
          Keep the survey photos and inventory together
        </h2>
        <p className="mt-5 text-[17px] leading-relaxed text-muted-fg">
          Writing up a survey means listing items, assigning weights and volumes, and checking changes with the customer. TareDesk drafts
          the list from photos and keeps the source images alongside it.
        </p>
        <dl className="mt-8 divide-y divide-line">
          <div className="py-4">
            <dt className="font-semibold">Review the draft</dt>
            <dd className="mt-1 text-[15px] leading-relaxed text-muted-fg">
              Correct items and quantities using the room photos and your catalog.
            </dd>
          </div>
          <div className="py-4">
            <dt className="font-semibold">Check changes with the customer</dt>
            <dd className="mt-1 text-[15px] leading-relaxed text-muted-fg">
              Share the visual inventory for proposed changes, notes, and approval.
            </dd>
          </div>
          <div className="py-4">
            <dt className="font-semibold">Hand it to the office and crew</dt>
            <dd className="mt-1 text-[15px] leading-relaxed text-muted-fg">
              Use the report link, PDF, and totals alongside your existing CRM and estimating process.
            </dd>
          </div>
        </dl>
      </div>
      <figure className="min-w-0">
        <img
          src="/images/photos-and-inventory.webp"
          alt="Illustrative family-room inventory on a laptop beside a tablet showing the same room with item labels, 16 items, and 1,002 lb."
          width={1920}
          height={1080}
          loading="lazy"
          decoding="async"
          className="h-auto w-full rounded-2xl"
        />
        <figcaption className="mt-3 text-center text-xs text-muted-fg">Illustrative inventory and room labels.</figcaption>
      </figure>
    </section>
  );
}

const CATALOG = [
  { name: 'Sofa, 3-seat', qty: 1, generic: [35, 245], yours: [42, 290] },
  { name: 'Dresser, 6-drawer', qty: 1, generic: [30, 210], yours: [36, 260] },
  { name: 'Queen bed', qty: 1, generic: [60, 420], yours: [65, 455] },
  { name: 'Book box', qty: 12, generic: [1.5, 10.5], yours: [1.5, 45] },
  { name: 'Upright piano', qty: 1, generic: [60, 420], yours: [70, 550] },
  { name: 'Wardrobe box', qty: 6, generic: [10, 70], yours: [12, 60] },
];

export function Catalog() {
  const { mover } = useBrand();
  const [yours, setYours] = useState(true);
  const key = yours ? 'yours' : 'generic';
  const totals = CATALOG.reduce((sum, row) => ({ cu: sum.cu + row[key][0] * row.qty, lb: sum.lb + row[key][1] * row.qty }), {
    cu: 0,
    lb: 0,
  });
  return (
    <section id="catalog" className="bg-[#0a0a0a] py-16 text-white sm:py-20 dark:border-y dark:border-line dark:bg-[#111111]">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:gap-14">
        <div>
          <h2 className="text-3xl leading-tight font-semibold tracking-[-0.03em] sm:text-4xl">
            Use your company’s <Streak>catalog</Streak>
          </h2>
          <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-white/80">
            Bring your item list and we’ll help prepare your catalog. Labels, cubic footage, and weight come from that list, with both
            values set for each item.
          </p>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/70">
            Compare these sample catalogs to see how the same item counts can produce different totals.
          </p>
          <div className="mt-7 inline-flex flex-wrap gap-1 rounded-xl bg-white/10 p-1" role="group" aria-label="Sample catalog comparison">
            {[false, true].map((value) => (
              <button
                key={String(value)}
                type="button"
                aria-pressed={yours === value}
                onClick={() => setYours(value)}
                className={`min-h-11 rounded-lg px-4 text-sm font-medium ${yours === value ? 'bg-white text-[#0a0a0a]' : 'text-white hover:bg-white/10'}`}
              >
                {value ? 'Your catalog' : 'Generic example'}
              </button>
            ))}
          </div>
        </div>
        <div className="min-w-0 overflow-hidden rounded-2xl bg-card text-ink">
          <div className="border-b border-line px-4 py-4 sm:px-5">
            <h3 className="text-sm font-semibold break-words">
              {yours ? `${mover || 'Your moving company'} · sample catalog` : 'Generic sample catalog'}
            </h3>
          </div>
          <div className="px-4 sm:px-5">
            <table className="w-full text-left text-xs sm:text-sm">
              <caption className="sr-only">Illustrative catalog comparison; weights and volumes are line totals.</caption>
              <thead>
                <tr className="border-b border-line text-xs text-muted-fg">
                  <th scope="col" className="py-3 font-medium">
                    Item
                  </th>
                  <th scope="col" className="px-2 py-3 text-right font-medium">
                    Qty
                  </th>
                  <th scope="col" className="py-3 text-right font-medium">
                    Lb
                  </th>
                  <th scope="col" className="py-3 pl-3 text-right font-medium">
                    Cu ft
                  </th>
                </tr>
              </thead>
              <tbody>
                {CATALOG.map((row) => (
                  <tr key={row.name} className="border-b border-line">
                    <th scope="row" className="py-3 pr-2 font-medium">
                      {row.name}
                    </th>
                    <td className="tabular px-2 text-right font-mono">{row.qty}</td>
                    <td className="tabular text-right font-mono">{fmt(row[key][1] * row.qty)}</td>
                    <td className="tabular pl-3 text-right font-mono">{fmt(row[key][0] * row.qty)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row" colSpan={2} className="py-4 font-medium">
                    Total
                  </th>
                  <td className="tabular py-4 text-right font-mono font-semibold">{fmt(totals.lb)}</td>
                  <td className="tabular py-4 pl-3 text-right font-mono font-semibold">{fmt(totals.cu)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="border-t border-line px-4 py-3 text-xs text-muted-fg sm:px-5">
            Illustrative values; this is a comparison of sample data.
          </p>
        </div>
      </div>
    </section>
  );
}

function SmsPhone() {
  const { mover, color, ink } = useBrand();
  const company = mover || 'Your moving company';
  return (
    <figure className="relative mx-auto w-full max-w-[350px]">
      <div aria-hidden className="absolute top-24 -left-[3px] flex flex-col gap-3">
        <span className="h-5 w-1 rounded-l bg-[#333336]" />
        <span className="h-8 w-1 rounded-l bg-[#333336]" />
        <span className="h-8 w-1 rounded-l bg-[#333336]" />
      </div>
      <span aria-hidden className="absolute top-36 -right-[3px] h-14 w-1 rounded-r bg-[#333336]" />
      <div
        className="flex min-h-[740px] flex-col overflow-hidden rounded-[52px] border-[9px] border-[#1c1c1e] bg-white text-[#171717] shadow-[0_24px_48px_-24px_rgba(0,0,0,.3)] ring-1 ring-[#8e8e93]"
        style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
      >
        <div aria-hidden className="relative flex h-14 shrink-0 items-start justify-between px-6 pt-5 text-xs font-semibold">
          <span>9:41</span>
          <span className="absolute top-3 left-1/2 h-7 w-[90px] -translate-x-1/2 rounded-full bg-[#1c1c1e]" />
          <svg viewBox="0 0 45 16" className="h-4 w-11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
            <path d="M2 12V9m4 3V6m4 6V3M16 6q5-5 10 0m-8 3q3-3 6 0m-3 3h.01" />
            <rect x="31" y="4" width="11" height="8" rx="2" />
            <path d="M44 7v2M33 6h7v4h-7z" fill="currentColor" />
          </svg>
        </div>
        <div className="relative border-b border-[#e5e5e8] bg-[#fafafa] px-8 pt-3 pb-4 text-center">
          <svg
            aria-hidden
            viewBox="0 0 20 20"
            className="absolute top-8 left-3 size-6 text-[#075db5]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 4-6 6 6 6" />
          </svg>
          <div
            aria-hidden
            className="mx-auto flex size-12 items-center justify-center rounded-full"
            style={{ background: color, color: ink }}
          >
            <svg
              viewBox="0 0 24 24"
              className="size-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h11v11H3zM14 10h4l3 4v3h-7M17 10v4h4M3 10h4m-4 3h2" />
              <circle cx="7" cy="18" r="2" fill="var(--brand)" />
              <circle cx="18" cy="18" r="2" fill="var(--brand)" />
            </svg>
          </div>
          <p className="mt-2 text-sm font-semibold break-words">{company}</p>
        </div>
        <div className="flex-1 px-4 pt-4 pb-8">
          <p aria-hidden className="mb-4 text-center text-xs text-[#6b6b71]">
            Text message · Today
          </p>
          <ol className="space-y-4 text-[15px] leading-relaxed">
            <li className="mr-8 rounded-[20px] rounded-bl-md bg-[#ededf0] px-4 py-3 break-words">
              <span className="sr-only">Message from {company}: </span>
              <p>
                <span className="font-medium">{company}:</span> Your moving inventory is ready to review and approve:
              </p>
              <div className="mt-3 overflow-hidden rounded-xl bg-[#dedee3]">
                <img
                  src="/rooms/m13.jpg"
                  alt="Family room photo in the sample inventory link preview"
                  loading="lazy"
                  className="h-28 w-full object-cover"
                />
                <div className="px-3 py-2.5">
                  <p className="text-sm leading-snug font-semibold break-words">{company} · Moving inventory</p>
                  <p className="mt-1 text-xs text-[#505057]">reports.taredesk.com</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-[#505057]">Reply STOP to opt out.</p>
            </li>
            <li className="ml-auto w-fit max-w-[85%] rounded-[20px] rounded-br-md bg-[#0070ef] px-4 py-2.5 text-white">
              <span className="sr-only">Reply from the customer: </span>
              Thanks, I’ll review it now.
            </li>
          </ol>
        </div>
        <div aria-hidden className="flex items-center gap-3 px-4 pb-5 text-[#68686f]">
          <svg viewBox="0 0 20 20" className="size-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10 3v14M3 10h14" />
          </svg>
          <div className="flex h-10 flex-1 items-center justify-between rounded-full border border-[#c6c6cc] px-3 text-sm">
            <span>Text message</span>
            <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <rect x="7" y="2" width="6" height="10" rx="3" />
              <path d="M4 9v1a6 6 0 0 0 12 0V9m-6 7v2m-3 0h6" />
            </svg>
          </div>
        </div>
        <div aria-hidden className="mx-auto mb-2 h-1 w-28 rounded-full bg-[#202124]" />
      </div>
      <figcaption className="mt-5 text-center text-xs leading-relaxed text-muted-fg">
        Illustrative iPhone Messages preview.
      </figcaption>
    </figure>
  );
}

export function BrandSection() {
  return (
    <section id="brand" className="border-b border-line bg-muted/50">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-3xl leading-tight font-semibold tracking-[-0.03em] sm:text-4xl">Text customers a link to their inventory</h2>
          <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-muted-fg">
            After your team checks the inventory, customers receive a text with your company name and a link to review it. Their report uses
            your name and color.
          </p>
          <div className="mt-7 max-w-lg">
            <BrandControls />
            <p className="mt-4 text-sm leading-relaxed text-muted-fg">
              Try your company name and color in the contact preview. Your color also updates the report examples throughout this page.
            </p>
          </div>
        </div>
        <SmsPhone />
      </div>
    </section>
  );
}

const FAQ = [
  [
    'How does the AI inventory work?',
    'TareDesk identifies items in room photos and matches them to your catalog to create a draft. Your estimator checks the items, quantities, weights, and volumes before sharing the report.',
  ],
  [
    'Who takes the photos?',
    'Your staff take photos during an in-person walkthrough. For a guided virtual survey, the customer joins a video call and the surveyor directs the walkthrough and captures images. Guided video surveys are currently in testing.',
  ],
  [
    'Can customers make changes?',
    'Customers can propose additions, mark items as not moving, and add notes. Your team reviews proposed changes. Catalog weights and volumes remain under your control, and changes and approvals are recorded.',
  ],
  [
    'Do I need to change my CRM?',
    'Keep your existing CRM and estimating process. Share the permanent visual inventory link, download a PDF, and use the reviewed weight and cubic-foot totals. Estimating, pricing, tariffs, dispatch, and e-signature stay in your existing systems.',
  ],
  [
    'Can I use my own item catalog?',
    'Yes. Your company’s item labels, weights, and cubic footage are the basis of the inventory. We help prepare the catalog from your existing list or spreadsheet.',
  ],
  [
    'What does it cost?',
    'SaaS pricing is being finalized. Book a demo with Conor to see the current build and discuss your workflow and current availability.',
  ],
];

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Questions about TareDesk</h2>
      <div className="mt-8 divide-y divide-line border-y border-line">
        {FAQ.map(([question, answer]) => (
          <details key={question} className="group py-1">
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-medium">
              {question}
              <svg
                aria-hidden
                viewBox="0 0 16 16"
                className="size-5 shrink-0 transition-transform group-open:rotate-45"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M8 3v10M3 8h10" />
              </svg>
            </summary>
            <p className="max-w-2xl pb-5 text-[16px] leading-relaxed text-muted-fg">{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

const BOOKING_URL = 'https://app.calendarbridge.com/book/conor-merrimack';

export function Demo() {
  return (
    <section id="demo" className="px-4 pb-16 sm:px-6 sm:pb-20">
      <div className="mx-auto grid max-w-6xl items-center gap-8 rounded-2xl bg-brand p-6 text-brand-ink sm:p-10 lg:grid-cols-[1fr_auto]">
        <div>
          <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Book a demo</h2>
          <p className="mt-4 max-w-xl text-[17px] leading-relaxed">
            See how TareDesk handles a sample survey with Conor Doyle. We’ll walk through capture, inventory review, and the customer
            report. You can bring your own photos if you’d like.
          </p>
        </div>
        <div>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center gap-3 rounded-full bg-primary px-6 py-3 text-[15px] font-medium text-primary-fg hover:opacity-90"
          >
            Pick a time with Conor <Arrow />
          </a>
          <p className="mt-3 text-sm">30 minutes · calendar opens in a new tab</p>
        </div>
        <p className="text-sm lg:col-span-2">
          Prefer email?{' '}
          <a className="font-medium underline underline-offset-4" href="mailto:conor@merrimackdata.com">
            conor@merrimackdata.com
          </a>
        </p>
      </div>
    </section>
  );
}
