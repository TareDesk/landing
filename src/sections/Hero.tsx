import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import RotatingText from '../components/reactbits/RotatingText';
import Magnet from '../components/reactbits/Magnet';
import { RoomPhoto, roomTotals } from '../RoomPhoto';
import { Arrow, Eyebrow, Streak, Ticket } from '../ui';

export function Hero() {
  const [tags, setTags] = useState(false);
  const [poked, setPoked] = useState(false); // stops the switch wiggle after the first click
  const demoRef = useRef<HTMLDivElement>(null);
  const t = roomTotals('m13');
  const shown = tags ? t : { ...t, items: 0, cu: 0, lb: 0 };

  // The "See how it works" switch is the only control for the AI tags on the photo.
  function setTagsOn(on: boolean) {
    setTags(on);
    setPoked(true);
    if (!on) return;
    // On small screens the photo sits below the buttons; bring it into view so the reveal is seen.
    const r = demoRef.current?.getBoundingClientRect();
    if (r && (r.top < 72 || r.bottom > window.innerHeight)) demoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return (
    <section className="relative overflow-hidden">
      <div className="grid-paper pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div className="relative mx-auto grid max-w-[90rem] gap-12 px-5 pt-12 pb-16 sm:px-10 sm:pb-20 lg:grid-cols-[23rem_minmax(0,1fr)] lg:items-center lg:gap-8 lg:pt-16 lg:pb-24 xl:grid-cols-[28rem_minmax(0,1fr)] xl:gap-10">
        <div className="min-w-0">
          <Eyebrow>AI-assisted moving surveys</Eyebrow>
          <h1 className="mt-5 text-[2.3rem] leading-[1.04] font-semibold tracking-[-0.035em] text-balance sm:text-[3.25rem] lg:text-[2.6rem] xl:text-[3rem]">
            Quote the whole job from a few <Streak delay={0.5}>photos!</Streak>
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-lg text-muted-fg sm:text-xl">
            <span>Yes, even</span>
            <RotatingText
              texts={['47 boxes of books.', 'the upright piano.', 'the attic.', 'the kayak.']}
              mainClassName="overflow-hidden rounded-md bg-ink px-2 py-0.5 text-paper"
              staggerFrom="last"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-120%' }}
              staggerDuration={0.012}
              splitLevelClassName="overflow-hidden pb-0.5"
              transition={{ type: 'spring', damping: 30, stiffness: 400 }}
              rotationInterval={2400}
            />
          </div>

          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-ink/80">
            Stop losing leads at the first step and give each an accurate estimate from{' '}
            <em className="not-italic font-medium text-ink">your own catalog</em>.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Magnet padding={60} magnetStrength={4}>
              <a href="#demo" className="group inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-[15px] font-medium text-primary-fg transition hover:opacity-85">
                Book a demo <Arrow className="transition group-hover:translate-x-0.5" />
              </a>
            </Magnet>
            <button
              type="button"
              onClick={() => setTagsOn(!tags)}
              aria-pressed={tags}
              className="relative inline-flex h-12 items-center gap-3 rounded-full border border-line bg-card pr-3.5 pl-5 text-[15px] font-medium hover:bg-muted"
            >
              See how it works
              <span aria-hidden className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${tags ? 'bg-brand' : 'bg-line'}`}>
                <motion.span
                  className={`absolute top-0.5 size-4 rounded-full bg-white shadow transition-[left] ${tags ? 'left-[18px]' : 'left-0.5'}`}
                  animate={poked ? { x: 0 } : { x: [0, 7, 0, 7, 0] }}
                  transition={poked ? { duration: 0.15 } : { duration: 1.1, repeat: Infinity, repeatDelay: 1.4, ease: 'easeInOut' }}
                />
              </span>
            </button>
          </div>
        </div>

        <motion.div
          ref={demoRef}
          initial={{ opacity: 0, y: 24, rotate: 1.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.1 }}
          className="relative min-w-0"
        >
          <RoomPhoto id="m13" tags={tags} eager className="rounded-[20px] shadow-[0_40px_80px_-40px_rgba(0,0,0,.5)] ring-1 ring-black/5" />

          <motion.div
            initial={{ opacity: 0, y: 20, rotate: -4 }}
            animate={{ opacity: 1, y: 0, rotate: -2.5 }}
            transition={{ type: 'spring', stiffness: 160, damping: 16, delay: 1.1 }}
            className="relative z-20 mx-auto -mt-10 w-[270px] sm:absolute sm:top-5 sm:right-5 sm:mx-0 sm:mt-0 sm:w-[280px]"
          >
            <Ticket room={t.room} items={shown.items} cu={shown.cu} lb={shown.lb} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
