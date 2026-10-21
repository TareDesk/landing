import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import ScrollVelocity from '../components/reactbits/ScrollVelocity';
import { BrandControls } from '../BrandPanel';
import { useBrand } from '../brand';
import { Arrow, Eyebrow, Num, Streak } from '../ui';

/* ───────────────────────── Marquee of item stickers ───────────────────────── */

const ROW_A = [
  ['Sofa, 3-seat', '35 cu ft · 245 lb'],
  ['Queen bed', '65 cu ft · 455 lb'],
  ['Dresser, 6-drawer', '35 cu ft · 245 lb'],
  ['Book box ×12', '18 cu ft · 480 lb'],
  ['TV, 65 in', '12 cu ft · Crate'],
  ['Dining table', '20 cu ft · 140 lb'],
  ['Wardrobe box ×6', '60 cu ft · 300 lb'],
  ['Armchair', '15 cu ft · 105 lb'],
];
const ROW_B = [
  ['Upright piano', '70 cu ft · 3-person'],
  ['Peloton', '25 cu ft · 140 lb'],
  ['Kayak', '15 cu ft · 60 lb'],
  ['Box labeled “misc” ×11', 'check me'],
  ['Grandfather clock', '20 cu ft · PBO'],
  ['Air hockey table', '40 cu ft · 280 lb'],
  ['Fish tank, 55 gal', 'drained, please'],
  ['Crib (assembled)', '10 cu ft · 70 lb'],
];

function Chip({ name, meta }: { name: string; meta: string }) {
  return (
    <span className="mx-2 inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-[15px] shadow-[0_6px_14px_-10px_rgba(0,0,0,.4)]">
      <span className="size-2 rounded-full bg-brand" />
      <span className="font-semibold">{name}</span>
      <span className="font-mono text-[12px] text-muted-fg">{meta}</span>
    </span>
  );
}

export function Marquee() {
  return (
    <section aria-label="Things TareDesk tags" className="border-y border-line bg-muted/60 py-6">
      <ScrollVelocity
        velocity={40}
        numCopies={4}
        className="py-1.5"
        texts={[
          <span key="a" className="inline-flex">{ROW_A.map(([n, m]) => <Chip key={n} name={n} meta={m} />)}</span>,
          <span key="b" className="inline-flex">{ROW_B.map(([n, m]) => <Chip key={n} name={n} meta={m} />)}</span>,
        ]}
      />
    </section>
  );
}

/* ───────────────────────── Problems as receipts ───────────────────────── */

const RECEIPTS = [
  {
    no: '01',
    title: 'The house call',
    line: 'A 40-minute drive and a 30-minute walkthrough. Then they booked someone else.',
    rows: [
      ['Drive + walkthrough', '1h 50m'],
      ['Gas', '$14.20'],
      ['Booked', 'No'],
    ],
    rot: -2,
  },
  {
    no: '02',
    title: 'The customer’s list',
    line: '“Just a couple of boxes.” It was 63 boxes, a treadmill and a kayak.',
    rows: [
      ['Quoted', '420 cu ft'],
      ['Actual', '610 cu ft'],
      ['Difference', '+45%'],
    ],
    rot: 1.5,
  },
  {
    no: '03',
    title: 'Move day',
    line: '“That dresser wasn’t on the estimate.” Now it’s an argument in a driveway.',
    rows: [
      ['Crew waiting', '3 people'],
      ['Re-quote', 'On site'],
      ['Review', '★☆☆☆☆'],
    ],
    rot: -1,
  },
];

export function Problems() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <Eyebrow>The problem</Eyebrow>
      <h2 className="mt-3 max-w-2xl text-4xl leading-[1.05] font-semibold tracking-[-0.03em] sm:text-5xl">
        Every estimator has kept <Streak>these receipts.</Streak>
      </h2>
      <div className="mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
        {RECEIPTS.map(r => (
          <motion.article
            key={r.no}
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: r.rot }}
            whileHover={{ rotate: 0, y: -6 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ type: 'spring', stiffness: 180, damping: 18 }}
            className="receipt bg-receipt px-6 py-9 font-mono text-[13px] shadow-[0_24px_40px_-28px_rgba(0,0,0,.5)] ring-1 ring-black/5"
          >
            <div className="flex justify-between text-[11px] uppercase tracking-[0.14em] text-muted-fg">
              <span>Receipt {r.no}</span>
              <span>Thank you!</span>
            </div>
            <h3 className="mt-4 font-sans text-xl font-semibold tracking-tight">{r.title}</h3>
            <p className="mt-2 font-sans text-[15px] leading-relaxed text-ink/75">{r.line}</p>
            <div className="my-5 border-t border-dashed border-ring" />
            {r.rows.map(([k, v]) => (
              <div key={k} className="flex justify-between py-0.5">
                <span className="text-muted-fg">{k}</span>
                <span className="font-semibold">{v}</span>
              </div>
            ))}
            <div className="my-5 border-t border-dashed border-ring" />
            <div className="text-center text-[11px] tracking-[0.3em] text-muted-fg">||| | || ||| | ||</div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Your catalog ───────────────────────── */

const CATALOG = [
  { name: 'Sofa, 3-seat', qty: 1, g: [35, 245], y: [42, 290], pack: 'CP' },
  { name: 'Dresser, 6-drawer', qty: 1, g: [30, 210], y: [36, 260], pack: 'CP' },
  { name: 'Queen bed', qty: 1, g: [60, 420], y: [65, 455], pack: 'Mattress bag' },
  { name: 'Book box', qty: 12, g: [1.5, 10.5], y: [1.5, 45], pack: 'PBO' },
  { name: 'Upright piano', qty: 1, g: [60, 420], y: [70, 550], pack: '3-person' },
  { name: 'Wardrobe box', qty: 6, g: [10, 70], y: [12, 60], pack: 'Provided' },
];

export function Catalog() {
  const { mover } = useBrand();
  const [yours, setYours] = useState(true);
  const k = yours ? 'y' : 'g';
  const tot = useMemo(() => CATALOG.reduce((a, r) => ({ cu: a.cu + r[k][0] * r.qty, lb: a.lb + r[k][1] * r.qty }), { cu: 0, lb: 0 }), [k]);
  const short = (mover || 'Your').replace(/\s+(Moving|Movers|Van Lines|Relocation).*$/i, '');

  return (
    <section id="catalog" className="relative overflow-hidden bg-[#0a0a0a] py-24 text-white dark:border-y dark:border-line dark:bg-[#111111]">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <Eyebrow className="text-white/50">Your item catalog</Eyebrow>
          <h2 className="mt-3 text-4xl leading-[1.05] font-semibold tracking-[-0.03em] sm:text-5xl">
            Your cube sheet. Not <Streak>somebody else’s.</Streak>
          </h2>
          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-white/70">
            Bring your item list once, as a spreadsheet if that’s what you have. Every tag maps to your cubic feet, your weights and your packing
            defaults. If your large dresser is 36 cu ft, it’s 36 cu ft.
          </p>
          <div className="mt-8 inline-flex rounded-full bg-white/10 p-1 text-sm">
            {[
              [false, 'Generic table'],
              [true, `${short}’s catalog`],
            ].map(([v, l]) => (
              <button
                key={String(v)}
                type="button"
                onClick={() => setYours(v as boolean)}
                className={`relative rounded-full px-4 py-2 font-medium transition ${yours === v ? 'text-[#0a0a0a]' : 'text-white/70 hover:text-white'}`}
              >
                {yours === v && <motion.span layoutId="catpill" className="absolute inset-0 rounded-full bg-white" transition={{ type: 'spring', stiffness: 500, damping: 35 }} />}
                <span className="relative">{l as string}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-card text-ink shadow-2xl">
          <div className="flex items-center justify-between border-b border-line px-5 py-3">
            <span className="text-sm font-semibold">{yours ? `${short}’s catalog` : 'Generic 7 lb / cu ft table'}</span>
            <span className="font-mono text-[11px] text-muted-fg">6 matched items</span>
          </div>
          <div className="divide-y divide-line">
            <div className="grid grid-cols-[1fr_44px_70px_70px] gap-2 bg-muted px-5 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-fg sm:grid-cols-[1fr_44px_80px_80px_110px]">
              <span>Item</span>
              <span className="text-right">Qty</span>
              <span className="text-right">Cu ft</span>
              <span className="text-right">Lb</span>
              <span className="hidden pl-4 sm:block">Packing</span>
            </div>
            {CATALOG.map(r => {
              const changed = r.g[0] !== r.y[0] || r.g[1] !== r.y[1];
              return (
                <div key={r.name} className="grid grid-cols-[1fr_44px_70px_70px] items-center gap-2 px-5 py-2.5 text-[14px] sm:grid-cols-[1fr_44px_80px_80px_110px]">
                  <span className="flex items-center gap-2 font-medium">
                    <span className={`size-1.5 rounded-full transition ${yours && changed ? 'bg-brand' : 'bg-line'}`} />
                    {r.name}
                  </span>
                  <span className="tabular text-right font-mono text-muted-fg">×{r.qty}</span>
                  <Num value={r[k][0] * r.qty} className="tabular text-right font-mono" />
                  <Num value={r[k][1] * r.qty} className="tabular text-right font-mono" />
                  <span className="hidden pl-4 font-mono text-[12px] text-muted-fg sm:block">{yours ? r.pack : '—'}</span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between border-t border-line bg-muted px-5 py-3 font-mono text-[13px]">
            <span className="text-muted-fg">Estimate</span>
            <span>
              <Num value={tot.cu} className="tabular font-semibold" /> cu ft · <Num value={tot.lb} className="tabular font-semibold" /> lb
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Your colors ───────────────────────── */

export function BrandSection() {
  const { mover, color, ink } = useBrand();
  const first = (mover || 'your movers').split(' ')[0];
  return (
    <section className="relative overflow-hidden border-y border-line bg-muted/60">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <Eyebrow>White-label customer link</Eyebrow>
          <h2 className="mt-3 text-4xl leading-[1.05] font-semibold tracking-[-0.03em] sm:text-5xl">
            Your customers see <Streak>your brand.</Streak> Not ours.
          </h2>
          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-muted-fg">
            The review link carries your name and your color. Try yours: this whole page is wearing it.
          </p>
          <div className="mt-8 max-w-md rounded-2xl border border-line bg-card p-5">
            <BrandControls />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="space-y-3">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-card px-4 py-3 text-[15px] shadow-sm ring-1 ring-line">
              Hi Dana! It’s {first}. Snap each room when you get a sec, then check our list 👇
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="w-[85%] overflow-hidden rounded-2xl rounded-bl-md bg-card shadow-sm ring-1 ring-line"
            >
              <div className="flex h-28 items-end p-4" style={{ background: color, color: ink }}>
                <div>
                  <div className="text-[12px] opacity-80">{mover || 'Your moving company'}</div>
                  <div className="text-lg leading-tight font-semibold">Your move, room by room</div>
                </div>
              </div>
              <div className="px-4 py-3">
                <div className="text-[13px] font-medium">Review your inventory · 4 rooms</div>
                <div className="font-mono text-[11px] text-muted-fg">survey.{(mover || 'yourco').toLowerCase().replace(/[^a-z]/g, '').slice(0, 12) || 'yourco'}.com/h8x2</div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md px-4 py-3 text-[15px]"
              style={{ background: color, color: ink }}
            >
              Done! Forgot the kayak in the garage, added it 🛶
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── FAQ ───────────────────────── */

const FAQ = [
  ['How accurate is the AI?', 'It’s a draft, not a verdict. TareDesk tags what it can see and marks what it’s unsure about. Your estimator checks every line before a customer sees it.'],
  ['What about things that aren’t in a photo?', 'Your staff or your customer can add them during review, like the boxes in the basement or the bikes in the shed.'],
  ['Who takes the photos?', 'Either. Estimators use it on a tablet during a walkthrough, or you send the customer a link and they do it from the couch.'],
  ['Does it work for interstate moves?', 'Federal rules for interstate household-goods moves call for an on-site or video survey, or a signed waiver. We’re building TareDesk to fit that process, not get around it. Ask us how.'],
  ['Does it work with my CRM?', 'Today it exports CSV. Tell us what you run, because we’re deciding which integrations come first with our beta partners.'],
  ['What does it cost?', 'Pricing isn’t set yet. Founding beta partners help set it, and keep it.'],
];

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <Eyebrow>Questions movers ask</Eyebrow>
      <h2 className="mt-3 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">Fair questions.</h2>
      <div className="mt-10 divide-y divide-line border-y border-line">
        {FAQ.map(([q, a]) => (
          <details key={q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium">
              {q}
              <span className="relative size-6 shrink-0 rounded-full border border-line transition group-open:rotate-45 group-open:border-brand group-open:bg-brand">
                <span className="absolute top-1/2 left-1/2 h-px w-2.5 -translate-1/2 bg-current group-open:bg-brand-ink" />
                <span className="absolute top-1/2 left-1/2 h-2.5 w-px -translate-1/2 bg-current group-open:bg-brand-ink" />
              </span>
            </summary>
            <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-muted-fg">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Demo CTA ───────────────────────── */

const BOOKING_URL = 'https://app.calendarbridge.com/book/conor-merrimack';

export function Demo() {
  return (
    <section id="demo" className="px-4 pb-24 sm:px-6">
      <div className="relative mx-auto max-w-[78rem] overflow-hidden rounded-[28px] bg-brand py-12 text-brand-ink sm:py-14">
        <div className="px-6 sm:px-12 xl:px-10">
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] opacity-70">Founding beta · a few spots</div>
          <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="text-4xl leading-[1.02] font-semibold tracking-[-0.035em] sm:text-6xl">Book a demo.</h2>
            <p className="max-w-md text-[17px] leading-relaxed opacity-85">
              Pick a time that works for you. Bring a few room photos and we’ll run them through TareDesk together, then show you the rest of the
              build.
            </p>
          </div>
        </div>

        {/* Wide screens: the booking page fits in its compact layout, so embed it. */}
        <div className="mt-10 hidden px-4 xl:block">
          <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
            <iframe src={BOOKING_URL} title="Book a TareDesk demo with Conor" loading="lazy" className="block h-[880px] w-full border-0" />
          </div>
        </div>

        {/* Tablets and phones: the embedded page would need scrolling inside the page, so open it full-screen instead. */}
        <div className="mt-8 px-6 sm:px-12 xl:hidden">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex h-14 items-center gap-3 rounded-full bg-primary px-8 text-[16px] font-medium text-primary-fg shadow-[0_18px_40px_-18px_rgba(0,0,0,.6)] hover:opacity-90"
          >
            Pick a time with Conor <Arrow className="transition group-hover:translate-x-0.5" />
          </a>
          <p className="mt-3 text-[13px] opacity-80">30 minutes · opens Conor’s calendar in a new tab</p>
        </div>

        <div className="mt-8 px-6 text-[15px] opacity-85 sm:px-12 xl:px-10">
          Prefer email? Write to Conor Doyle,{' '}
          <a className="font-medium underline underline-offset-4" href="mailto:conor@merrimackdata.com">
            conor@merrimackdata.com
          </a>
        </div>
      </div>
    </section>
  );
}
