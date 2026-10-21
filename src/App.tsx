import { motion, useScroll, useSpring } from 'motion/react';
import ClickSpark from './components/reactbits/ClickSpark';
import { BrandPanel, openBrandPanel } from './BrandPanel';
import { BrandProvider, useBrand } from './brand';
import { Logo } from './Logo';
import { Hero } from './sections/Hero';
import { HowItWorks } from './sections/HowItWorks';
import { BrandSection, Catalog, Demo, Faq, Marquee, Problems } from './sections/More';

function ScrollStreak() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  return <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-brand" style={{ scaleX }} />;
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#" aria-label="TareDesk home" className="flex items-center">
          <Logo className="h-6" />
        </a>
        <nav className="hidden items-center gap-7 text-[14px] text-muted-fg md:flex">
          <a href="#how" className="hover:text-ink">How it works</a>
          <a href="#catalog" className="hover:text-ink">Your catalog</a>
          <button type="button" onClick={openBrandPanel} className="hover:text-ink">Your colors</button>
          <a href="#faq" className="hover:text-ink">FAQ</a>
        </nav>
        <a href="#demo" className="inline-flex h-9 items-center rounded-full bg-primary px-4 text-[14px] font-medium text-primary-fg hover:opacity-85">
          Book a demo
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-[13px] text-muted-fg sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <Logo className="mb-2 h-6 text-ink" />
          <p className="mt-1 max-w-sm">In development. SaaS pricing and beta availability are not yet set.</p>
        </div>
        <div className="sm:text-right">
          <p>Room photos: Clay Banks, Christina Radevich, Mạnh Ngô, Colin + Meg, Timothy Buck on Unsplash.</p>
          <p className="mt-1">Weights and volumes shown are illustrative.</p>
        </div>
      </div>
    </footer>
  );
}

function Page() {
  const { color } = useBrand();
  return (
    <ClickSpark sparkColor={color} sparkSize={9} sparkRadius={18} sparkCount={8} duration={420}>
      <ScrollStreak />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Problems />
        <HowItWorks />
        <Catalog />
        <BrandSection />
        <Faq />
        <Demo />
      </main>
      <Footer />
      <BrandPanel />
    </ClickSpark>
  );
}

export default function App() {
  return (
    <BrandProvider>
      <Page />
    </BrandProvider>
  );
}
