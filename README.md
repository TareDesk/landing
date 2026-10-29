# TareDesk landing page

Vite + React + Tailwind v4. The page includes a photo-tag toggle, editable sample
inventory, catalog comparison, company-brand preview, and a pausable CSS item ticker.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in dist/ (deploy to Vercel/Netlify as-is)
npm test         # color validation and foreground-contrast checks
npm run lint
```

## The brand color
One editable color (`--brand`) drives the squiggly underlines, item tags, toggle,
and customer-report previews. Foreground text is chosen for contrast.
- Default lives in `src/brand.tsx` (`DEFAULT`) and `src/index.css` (`:root --brand`); presets and color helpers are in `src/brand-colors.ts`.
- Visitors enter their company name and color with the floating **Try your brand** button. Choices are saved in localStorage. Appearance controls are secondary.
- Sales link in a prospect's colors: `/?brand=1f8a4c&mover=Pine%20Movers` (add `&theme=dark` for dark mode).

The other colors use the TareDesk app’s neutral palette in `src/index.css`.

## Content

- Public sample SMS destinations are `/j/sample` (illustrative video invitation,
  no active call or camera access) and `/r/sample` (existing illustrative report).
  They share the landing deployment, including on `reports.taredesk.com`; they
  use no customer records, database, consent collection, or messaging backend.

- SMS program, terms and privacy pages live at `/sms`, `/sms/terms` and
  `/sms/privacy` (`src/SmsPages.tsx`). They describe Conor-operated TareDesk Demo
  messaging, using recorded verbal consent. Booking alone is not SMS consent.
  These pages do not provide a consent-collection backend or activate texting.
- `vercel.json` routes direct requests for those pages to the Vite app. If using
  another host, configure the equivalent rewrites. Publishing and domain/DNS
  changes require Conor's approval; local edits do not submit a Twilio application.
- Verbal-consent evidence is available at `/sms/verbal-consent.pdf`. Rebuild it
  with `python3 scripts/build-sms-consent-evidence.py` (requires `reportlab` and
  `pypdf`); the script checks the consent wording against `src/SmsPages.tsx` and
  writes both the local review copy and the public PDF. The document describes
  the process and contains no recipient data or individual consent records.
- The laptop/tablet visual in `public/images/photos-and-inventory.webp` is exported
  from the [approved Canva composition](https://www.canva.com/design/DAHYrFFdnLA/D0_PXZYCEwo-vj-uHTufgg/edit).
  Update that design and re-export to revise the static visual.
- Room photos: `public/rooms/` (Unsplash, credits in the footer). Sticker positions: `src/rooms.json`, exported from `../promo/stickerize.py`.
- Demo booking: the button opens Conor's CalendarBridge page in a new tab (`BOOKING_URL` in `src/sections/More.tsx`). No booking or signup is submitted by this site.
- Reports, catalog values, messages, and approval states are illustrative. The hero,
  sample report, and initial review table use the same family-room inventory.
- The page describes staff-led capture and customer review; it does not offer
  unguided self-survey, estimating, or e-signature. Guided video remains labeled
  as in testing. Current CTA: book a demo, with no beta enrollment or price lock.
