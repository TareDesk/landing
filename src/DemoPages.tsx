import { useEffect } from 'react';
import { Logo } from './Logo';
import { ReportPreview } from './ReportPreview';
import { SmsLinks } from './SmsPages';

export function DemoPage({ path }: { path: string }) {
  const invitation = path === '/j/sample';
  const title = invitation ? 'Sample video invitation' : 'Sample inventory report';

  useEffect(() => {
    document.title = `${title} — TareDesk Demo`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', `${title} with illustrative data. TareDesk is operated by Conor Doyle.`);
  }, [title]);

  return (
    <>
      <a href="#main" className="sr-only fixed top-2 left-2 z-50 rounded-lg bg-primary px-4 py-3 text-primary-fg focus:not-sr-only">Skip to content</a>
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <a href="https://www.taredesk.com" aria-label="TareDesk home" className="inline-flex min-h-11 items-center"><Logo className="h-6" /></a>
          <a href="https://www.taredesk.com/#demo" className="inline-flex min-h-11 items-center text-sm underline underline-offset-4">Book a demo</a>
        </div>
      </header>
      <main id="main" className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        <h1 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{title}</h1>
        <p className="mt-4 text-base leading-7 text-muted-fg">TareDesk Demo · Operated by Conor Doyle</p>
        {invitation ? (
          <>
            <p className="mt-8 max-w-prose text-lg leading-8">A guided walkthrough starts with an invitation from Conor. During a demonstration, you join from your phone’s browser while Conor guides the room survey and explains how the inventory is prepared.</p>
            <section className="mt-8 border-y border-line py-6">
              <h2 className="text-xl font-semibold tracking-tight">About this sample</h2>
              <p className="mt-3 leading-7 text-muted-fg">This is a public example invitation, not a scheduled appointment or an active video room. It does not access your camera or microphone. Contact Conor for the current demonstration arrangements.</p>
              <a href="mailto:conor@merrimackdata.com" className="mt-5 inline-flex min-h-12 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-fg hover:opacity-85">Contact Conor about a demo</a>
            </section>
            <a href="/r/sample" className="mt-6 inline-flex min-h-11 items-center underline underline-offset-4">View the sample inventory report</a>
          </>
        ) : (
          <>
            <p className="mt-6 max-w-prose leading-7 text-muted-fg">Explore an example family-room inventory. The room photo and catalog values are illustrative; this report contains no customer information. It does not submit changes or approvals.</p>
            <div className="mt-8"><ReportPreview companyName="TareDesk Demo" /></div>
            <p className="mt-6 text-sm leading-6 text-muted-fg">Inventory weights and volumes are illustrative catalog values. This is not a moving estimate, price, or signed agreement.</p>
            <a href="/j/sample" className="mt-6 inline-flex min-h-11 items-center underline underline-offset-4">View the sample video invitation</a>
          </>
        )}
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto max-w-3xl space-y-3 px-5 py-8 text-sm leading-relaxed text-muted-fg sm:px-8">
          <p>TareDesk is operated by Conor Doyle. <a href="mailto:conor@merrimackdata.com" className="underline underline-offset-4">conor@merrimackdata.com</a></p>
          <SmsLinks />
          <p>Room photos: Clay Banks, Christina Radevich, Mạnh Ngô, Colin + Meg, Timothy Buck on Unsplash.</p>
        </div>
      </footer>
    </>
  );
}
