# TareDesk landing page

Vite + React + Tailwind v4. Animated bits from [React Bits](https://reactbits.dev) live in `src/components/reactbits/`.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in dist/ (deploy to Vercel/Netlify as-is)
```

## The brand color
One editable color (`--brand`) drives every streak, sticker dot, toggle, the scroll bar, click sparks and the customer-link previews.
- Default lives in `src/brand.tsx` (`DEFAULT`) and `src/index.css` (`:root --brand`).
- Visitors change it with the floating **Brand color** button. The choice is saved in localStorage.
- Sales link in a prospect's colors: `/?brand=1f8a4c&mover=Pine%20Movers` (add `&theme=dark` for dark mode).

Every other color comes from the TareDesk app palette (shadcn neutral plus red/amber/sky status pills) in `src/index.css`.

## Content
- Room photos: `public/rooms/` (Unsplash, credits in the footer). Sticker positions: `src/rooms.json`, exported from `../promo/stickerize.py`.
- Demo booking: Conor's CalendarBridge page is embedded on screens 1280px and wider; smaller screens get a button that opens it in a new tab (`BOOKING_URL` in `src/sections/More.tsx`).
