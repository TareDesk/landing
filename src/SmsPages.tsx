import { useEffect, type ReactNode } from 'react';
import { Logo } from './Logo';

export function SmsLinks() {
  return (
    <nav aria-label="SMS policies" className="flex flex-wrap gap-x-5 gap-y-2">
      <a href="/sms" className="inline-flex min-h-11 items-center underline underline-offset-4">SMS program</a>
      <a href="/sms/terms" className="inline-flex min-h-11 items-center underline underline-offset-4">SMS terms</a>
      <a href="/sms/privacy" className="inline-flex min-h-11 items-center underline underline-offset-4">Privacy policy</a>
    </nav>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink">{title}</h2>
      {children}
    </section>
  );
}

function Contact() {
  return <a href="mailto:conor@merrimackdata.com" className="underline underline-offset-4">conor@merrimackdata.com</a>;
}

function Program() {
  return (
    <>
      <Section title="Who sends these messages">
        <p>Conor Doyle operates TareDesk, moving-survey software, and the TareDesk Demo text-message program. Messages identify TareDesk Demo as the sender.</p>
      </Section>
      <Section title="What we send">
        <p>Messages support software demonstrations conducted by Conor: appointment coordination, video-survey invitations, demonstration inventory-report links, and individual replies to your questions. This program does not enroll you in unrelated promotional messaging.</p>
      </Section>
      <Section title="How you opt in">
        <p>During a phone call or demonstration intake, Conor reads the following disclosure and asks for your permission before recording your number for texting:</p>
        <blockquote className="border-l border-line pl-5 text-ink">
          May I text this number about your requested TareDesk software demonstration, including the video invitation, demonstration report and related conversation? Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help. Texting is optional and is not a condition of purchase; we can use email or shared links instead. The SMS terms and privacy policy are available on the TareDesk website. Is that okay?
        </blockquote>
        <p>Only an affirmative answer is recorded as consent, with your number, date, method, disclosure version and the person who obtained it. Providing a phone number or booking a demonstration alone does not enroll you.</p>
        <p>Read the <a href="/sms/terms" className="underline underline-offset-4">SMS terms</a> and <a href="/sms/privacy" className="underline underline-offset-4">privacy policy</a>. Texting is optional; you can use email and shared links.</p>
      </Section>
      <Section title="Frequency and cost">
        <p>Message frequency varies with your requested demonstration and conversation. Message and data rates may apply.</p>
      </Section>
      <Section title="Opt out and get help">
        <p>Reply <strong className="text-ink">STOP</strong> to unsubscribe or <strong className="text-ink">HELP</strong> for support. You may receive one opt-out confirmation, after which no further program messages will be sent unless you opt in again. For toll-free messaging, reply <strong className="text-ink">START</strong> or <strong className="text-ink">UNSTOP</strong> to resubscribe.</p>
        <p>You can also contact <Contact />. Wireless carriers are not liable for delayed or undelivered messages.</p>
      </Section>
    </>
  );
}

function Terms() {
  return (
    <>
      <Section title="The program">
        <p>TareDesk is moving-survey software operated by Conor Doyle. TareDesk Demo supports software demonstrations conducted by Conor. Messages include demonstration appointment coordination, video-survey invitations, demonstration inventory-report links, and individual replies to participants’ questions.</p>
        <p>Messages identify TareDesk Demo as the sender. This program is for requested demonstrations and related conversations; it does not enroll participants in unrelated promotional messaging.</p>
      </Section>
      <Section title="Your consent">
        <p>Participation requires your affirmative consent. During phone or demonstration intake, Conor reads the SMS disclosure and asks for your permission. Only an affirmative answer is recorded as consent. We keep the date, method, disclosure and person who recorded your permission. The full script is on the <a href="/sms" className="underline underline-offset-4">SMS program page</a>.</p>
        <p>Providing a phone number alone does not enroll you. Text messages are optional and are not required to book a demonstration, purchase a service or receive help. You may use email and shared links instead.</p>
      </Section>
      <Section title="Frequency and cost">
        <p>Message frequency varies with your requested demonstration and conversation. Message and data rates may apply to messages sent and received. Contact your wireless carrier for information about your plan.</p>
      </Section>
      <Section title="Opt out and resubscribe">
        <p>Reply <strong className="text-ink">STOP</strong> to unsubscribe. You may receive a final confirmation of your opt-out, after which no further program messages will be sent unless you opt in again. You may also request removal by emailing <Contact />.</p>
        <p>For toll-free messaging, reply <strong className="text-ink">START</strong> or <strong className="text-ink">UNSTOP</strong> to resubscribe. Replying HELP does not resubscribe you.</p>
      </Section>
      <Section title="Help and delivery">
        <p>Reply <strong className="text-ink">HELP</strong> for support information or email <Contact />. Support hours are Monday through Friday, 9 a.m. to 5 p.m. Eastern, excluding holidays. The initial response is normally by the next business day; resolution time depends on the issue.</p>
        <p>Wireless carriers are not liable for delayed or undelivered messages.</p>
      </Section>
      <Section title="Privacy and changes">
        <p>Mobile information and messaging consent are not sold, rented or shared with third parties or affiliates for marketing or promotional purposes. The <a href="/sms/privacy" className="underline underline-offset-4">privacy policy</a> explains how information is used to provide the demonstration.</p>
        <p>We may update these terms. The date above identifies the latest revision.</p>
      </Section>
    </>
  );
}

function Privacy() {
  return (
    <>
      <Section title="Scope and operator">
        <p>Conor Doyle operates TareDesk and the TareDesk Demo program. This policy covers information used for requested software demonstrations and associated communications. Contact <Contact /> with privacy requests.</p>
      </Section>
      <Section title="Information we collect">
        <p>Depending on the parts of the software demonstrated, we collect:</p>
        <ul className="list-disc space-y-3 pl-5">
          <li>Your name, email address, mobile number, demonstration appointment details, messages and SMS consent or opt-out records.</li>
          <li>Survey information you provide, including photos, inventory details, and audio or video where recording is enabled with permission.</li>
          <li>Report edits, comments and approval activity, together with timestamps and relevant browser, IP address and session information for security and audit records.</li>
        </ul>
      </Section>
      <Section title="How we use information">
        <p>We use information to arrange and conduct your requested demonstration, send invitation and report links, respond to messages, produce draft inventories, support the service, maintain security and perform necessary operations.</p>
        <p>We do not sell this information or use homeowner photos, audio or transcripts to train TareDesk models. AI-generated inventories are drafts for human review.</p>
      </Section>
      <Section title="Photos, AI processing and recording">
        <p>Photos may be processed by our AI provider to create a draft inventory. We explain recording before it starts and require affirmative permission from every participant. Recording remains off without that permission. Consent records identify the disclosure, time and relevant person or session. Contact the operator if you want recording stopped.</p>
      </Section>
      <Section title="Providers and sharing">
        <p>We use these service providers for the relevant functions:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li><strong className="text-ink">Twilio:</strong> text-message delivery and inbound replies.</li>
          <li><strong className="text-ink">Resend:</strong> email delivery.</li>
          <li><strong className="text-ink">Daily:</strong> video calls and enabled recording.</li>
          <li><strong className="text-ink">Anthropic:</strong> AI processing of survey content to draft inventories.</li>
          <li><strong className="text-ink">Supabase:</strong> authentication, database and file storage.</li>
          <li><strong className="text-ink">Vercel:</strong> application hosting.</li>
        </ul>
        <p>Information is processed by the providers needed to deliver the relevant function. We may also disclose information when required by law. Provider retention and legally required preservation may continue separately from removal within TareDesk; we do not promise immediate erasure of every provider copy.</p>
        <p>We do not share mobile information with third parties or affiliates for marketing or promotional purposes. All the above categories exclude text messaging originator opt-in data and consent; this information won’t be shared with any third parties. Service providers process the information needed to deliver messages on our behalf; this does not authorize use for their own marketing.</p>
      </Section>
      <Section title="Retention and deletion">
        <p>We retain survey media, inventories, reports, messages and associated audit records to deliver and support the service and maintain the related records. The current platform does not automatically expire and permanently delete survey media on a fixed schedule. Removing a photo from a survey hides it from the active inventory but does not itself permanently erase its stored file or audit history.</p>
        <p>Contact <Contact /> to request access, correction or deletion. We handle requests individually, subject to records needed for security, legal obligations or unresolved claims. Opt-out records are retained as needed to honor your choice. Backups and providers may retain copies for their applicable retention periods.</p>
      </Section>
      <Section title="Security and your choices">
        <p>We use access controls, encrypted connections, private media storage and restricted report links to protect information. You can decline SMS and use email or shared links. Reply STOP to end SMS messages, or HELP for messaging support. Message frequency varies. Message and data rates may apply.</p>
        <p>This service is intended for adults. We do not knowingly collect information from children under 13. We may update this policy; the date above identifies the latest revision.</p>
      </Section>
    </>
  );
}

export function SmsPage({ path }: { path: string }) {
  const title = path === '/sms/terms' ? 'SMS terms and conditions' : path === '/sms/privacy' ? 'Privacy policy' : 'TareDesk Demo SMS';

  useEffect(() => {
    document.title = `${title} — TareDesk`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', `${title} for the TareDesk Demo program operated by Conor Doyle.`);
  }, [title]);

  return (
    <>
      <a href="#main" className="sr-only fixed top-2 left-2 z-50 rounded-lg bg-primary px-4 py-3 text-primary-fg focus:not-sr-only">Skip to content</a>
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <a href="/" aria-label="TareDesk home" className="inline-flex min-h-11 items-center"><Logo className="h-6" /></a>
          <a href="/#demo" className="inline-flex min-h-11 items-center text-sm underline underline-offset-4">Book a demo</a>
        </div>
      </header>
      <main id="main" className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        <h1 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{title}</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-fg">TareDesk Demo · Operated by Conor Doyle<br />Last updated October 28, 2026</p>
        <div className="mt-6 border-b border-line pb-4 text-sm"><SmsLinks /></div>
        <div className="mt-10 space-y-10 text-base leading-7 text-muted-fg">
          {path === '/sms/terms' ? <Terms /> : path === '/sms/privacy' ? <Privacy /> : <Program />}
        </div>
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto max-w-3xl space-y-3 px-5 py-8 text-sm leading-relaxed text-muted-fg sm:px-8">
          <p>TareDesk is operated by Conor Doyle. <Contact /></p>
          <SmsLinks />
        </div>
      </footer>
    </>
  );
}
