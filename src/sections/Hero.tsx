import { useRef, useState } from 'react';
import { RoomPhoto, roomTotals } from '../RoomPhoto';
import { Arrow, Streak, Ticket } from '../ui';

export function Hero() {
  const [tags, setTags] = useState(true);
  const demoRef = useRef<HTMLDivElement>(null);
  const totals = roomTotals('m13');

  function toggleTags() {
    setTags(!tags);
    const rect = demoRef.current?.getBoundingClientRect();
    if (!tags && rect && (rect.top < 80 || rect.bottom > window.innerHeight)) {
      demoRef.current?.scrollIntoView({ block: 'center' });
    }
  }

  return (
    <section className="relative overflow-hidden">
      <div className="grid-paper pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div className="relative mx-auto grid max-w-[90rem] gap-10 px-5 pt-12 pb-12 sm:px-10 sm:pb-16 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-12 lg:py-16">
        <div className="min-w-0">
          <h1 className="max-w-xl text-[2.6rem] leading-[1.08] font-semibold tracking-[-0.035em] text-balance sm:text-[3.5rem] lg:text-[3rem] xl:text-[3.5rem]">
            Build your moving inventory from <Streak>photos</Streak>
          </h1>
          <p className="mt-7 max-w-lg text-[17px] leading-relaxed text-ink/80">
            TareDesk uses room photos to draft an inventory with your catalog’s weights and cubic footage. Your team checks the details
            before customers review and approve.
          </p>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted-fg">For moving companies surveying homes and offices.</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#demo"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-[15px] font-medium text-primary-fg hover:opacity-85"
            >
              Book a demo <Arrow />
            </a>
            <button
              type="button"
              onClick={toggleTags}
              aria-pressed={tags}
              aria-controls="hero-photo"
              className="inline-flex h-12 items-center gap-3 rounded-full border border-line bg-card px-5 text-[15px] font-medium hover:bg-muted"
            >
              Show item tags
              <span aria-hidden className={`relative h-5 w-9 rounded-full ${tags ? 'bg-brand' : 'bg-line'}`}>
                <span
                  className={`absolute top-0.5 size-4 rounded-full bg-white shadow transition-[left] ${tags ? 'left-[18px]' : 'left-0.5'}`}
                />
              </span>
            </button>
          </div>
        </div>
        <div ref={demoRef} id="hero-photo" className="relative min-w-0 scroll-mt-24">
          <RoomPhoto id="m13" tags={tags} eager className="rounded-2xl shadow-[0_24px_50px_-28px_rgba(0,0,0,.4)]" />
          <div className="relative z-10 mx-auto -mt-7 w-[270px] sm:absolute sm:top-4 sm:right-4 sm:mx-0 sm:mt-0 sm:w-[255px]">
            <Ticket {...totals} />
          </div>
          <p className="mt-4 text-center text-xs text-muted-fg">Illustrative inventory using a sample catalog.</p>
        </div>
      </div>
    </section>
  );
}
