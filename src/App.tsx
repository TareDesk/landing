import { BrandPanel } from './BrandPanel';
import { BrandProvider } from './brand';
import { Logo } from './Logo';
import { Hero } from './sections/Hero';
import { HowItWorks } from './sections/HowItWorks';
import { BrandSection, Catalog, Demo, Faq, Marquee, Problems } from './sections/More';

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#main" aria-label="TareDesk home" className="flex min-h-11 items-center">
          <Logo className="h-6" />
        </a>
        <nav aria-label="Main navigation" className="hidden items-center gap-6 text-sm text-muted-fg md:flex">
          <a href="#how" className="inline-flex min-h-11 items-center hover:text-ink">
            How it works
          </a>
          <a href="#catalog" className="inline-flex min-h-11 items-center hover:text-ink">
            Your catalog
          </a>
          <button type="button" popoverTarget="brand-settings" className="min-h-11 hover:text-ink">
            Try your brand
          </button>
          <a href="#faq" className="inline-flex min-h-11 items-center hover:text-ink">
            FAQ
          </a>
        </nav>
        <a
          href="#demo"
          className="inline-flex min-h-11 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-fg hover:opacity-85"
        >
          Book a demo
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pt-10 pb-24 text-xs leading-relaxed text-muted-fg sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <Logo className="mb-2 h-6 text-ink" />
          <p className="mt-1 max-w-sm">Development preview. Contact Conor for current availability.</p>
        </div>
        <div className="max-w-md sm:text-right">
          <p>Room photos: Clay Banks, Christina Radevich, Mạnh Ngô, Colin + Meg, Timothy Buck on Unsplash.</p>
          <p className="mt-1">Inventories, catalog values, messages, and approvals shown are illustrative.</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <BrandProvider>
      <a href="#main" className="sr-only fixed top-2 left-2 z-[60] rounded-lg bg-primary px-4 py-3 text-primary-fg focus:not-sr-only">
        Skip to content
      </a>
      <Nav />
      <main id="main">
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
    </BrandProvider>
  );
}
