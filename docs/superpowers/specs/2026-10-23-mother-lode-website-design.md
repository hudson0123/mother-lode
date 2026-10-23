# Mother Lode website: design

Date: 2026-10-23
Status: reviewed, awaiting owner approval

## What this is and why

Mother Lode is a vintage and makers market selling goods and gifts for you and
your home. It has two shops in Georgia, Decatur ("Mother Lode Atlanta") and
Athens ("Mother Lode Athens"). Both are open daily from 11am to 7pm.

The website is purely informational for now. Someone who has never heard of
Mother Lode should come away knowing what it is, what kind of things they'll
find, where the two shops are, and when they're open, and be able to call or
get directions in one tap. Photos carry the site: the owner wants to lean on
them heavily.

## Goals

- One Next.js app with three pages: a Mother Lode home page and one page per
  shop.
- Mobile first: designed for a phone, then laid out wider for a laptop. It
  must look good on both.
- Photo-forward look built from the logo's palette.
- Shop facts (address, phone, hours, offerings, social links) are easy to
  change in one place.

## Non-goals (for now)

- Auctions. The owner may add auction features to the home page later. Don't
  build anything for them, but don't make the home page so rigid that a new
  section couldn't be dropped in.
- Online shopping, vendor applications, events, newsletters, and contact
  forms.
- A weekend coffee and chai pop-up mention. The owner removed it on purpose,
  so leave it out.
- Choosing or connecting a domain name.

## Anti-goals (would make this a failure even if it works)

- **Any emoji anywhere** in the project: page copy, icons, alt text, code
  comments, commit messages, docs. Use text or line-art icons instead.
- Rounded corners or borders on photos.
- Looking like a generic template. It should feel like this shop: ink-black
  line art, sage, a touch of gold.
- Photos that are slow or blurry on phones.

## Constraints

- **Existing app.** The repo root is a Next.js 16.4.3 app (App Router, React
  19.3, TypeScript, Tailwind CSS v4 via `@tailwindcss/turbopack`, ESLint).
  `next.config.ts` enables `cacheComponents`, `partialPrefetching`, and
  `experimental.agentFeedback`. Build on what's there. `npm run build` passes
  today.
- **Assets in `public/`:**
  - `motherlodelogo.png` (447×447): a black line-drawn hand holding a gold
    nugget, with "Mother Lode" in script lettering, on a solid sage square.
  - `motherlodeatlstorefront.jpeg` (516×387, small): the Decatur storefront.
  - `motherlodeathensstorefront.webp` (700×525): the Athens sign and
    building.
  - Interiors, all shared by both shops (none belongs to one shop):
    - `motherlodeinterior1.webp` (1999×1125, the only high-res wide shot:
      clothing racks, UGA gear, home goods)
    - `motherlodeinterior2.jpeg` (516×387)
    - `motherloadinterior3.jpg` (1200×900). This has a power strip lying
      across a table, so keep it out of prominent spots. The filename has a
      typo; rename it to `motherlodeinterior3.jpg`.
    - `motherlodeinterior4.jpeg` (639×480, a shopper at the clothing racks)
    - `motherlodeinterior5.webp` (1000×1316, portrait, red velvet chair)
    - `motherlodeinterior6.webp` (1000×1328, portrait, toys and comics
      corner)
  - The starter files `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, and
    `window.svg` are unused. Delete them.
- **Approved sketches** live in
  `.superpowers/brainstorm/14543-1792790437/content/` (gitignored, local
  only): `site-map-v3.html` for the overall structure,
  `home-hero-mix.html` for the home page on phone and laptop, and
  `shop-page.html` for the shop page on phone and laptop. Treat them as
  layout references, not pixel specs. This document is the source of truth
  where they differ.

## Content (exact facts)

Shared by both shops:

- Tagline: "Vintage & makers market". Supporting line: "Goods and gifts for
  you and your home."
- Hours: open daily, 11:00 AM to 7:00 PM.
- Instagram: https://www.instagram.com/motherlodeatl/
- Facebook: https://www.facebook.com/motherlodeatl/
- Both shops use these same accounts.

**Decatur**, page `/decatur`

- Name: Mother Lode Atlanta
- Address: 3429 Covington Hwy Ste B, Decatur, GA 30032
- Phone: 678-927-9635
- Offerings heading: "30 to 50 local vendors & makers". The owner approved
  this wording in the sketch.
- Intro line under that heading: "An indoor market of local vendors and
  makers." (My call: it keeps the owner's "indoor market" fact. The data
  model gets an optional intro field that only Decatur uses.)
- What you'll find: mid-century modern furniture, lighting, antiques, vintage
  clothing (90s, Y2K, and true vintage), vinyl records, comics, handmade
  jewelry, low-maintenance indoor plants.

**Athens**, page `/athens`

- Name: Mother Lode Athens
- Address: 1005 Baxter St, Athens, GA 30606
- Phone: 762-772-5554
- What you'll find: retro and vintage clothing, unique home goods, Georgia
  Bulldogs gear, handcrafted jewelry, plants.
- No vendor count is given, so the heading is simply "What you'll find".

All of this lives in one typed data module, for example `app/data/shops.ts`,
which every page reads from.

## Visual direction (decided with the owner)

- **Palette from the logo:** sage green (about `#a9bb87`, matching the
  logo's background so the logo blends in), ink black (about `#1b1b1b`), gold
  as a small accent (about `#d9a521`, used for the hours pill and link
  underlines), and a warm off-white page background (about `#fbfaf5`). Light
  theme only. Remove the starter dark-mode styles, since the brand colors are
  fixed.
- **Top-left wordmark:** "Mother Lode" set in black cursive text, no drawing.
  The owner tried a black version of the drawn logo there and preferred the
  text.
- **Photos:** square corners, no borders, cropped to fill their frames.
  Full-bleed (edge to edge) on phones.
- **Non-photo elements** (the nav bar, the sage info block, the hours pill,
  the offering tags, the round logo badge) may keep thin ink outlines and the
  pill and circle shapes from the sketches. The owner only ruled out rounded
  corners and borders on photos.
- **Type:** a script font close to the logo's lettering for the wordmark, a
  classic serif for headings, and a plain sans-serif for body text.

## Pages

### Shared layout (every page)

- **Top nav bar**, sage with an ink bottom rule: the wordmark on the left,
  links to Home, Decatur, and Athens on the right, with the current page
  marked. It has to fit at 390px wide, so keep the three links short.
- **Footer**, ink background with off-white text: the "Mother Lode" wordmark,
  both shops' addresses (each linking to its shop page), "Open daily
  11am–7pm", and Instagram and Facebook links as line-art icons with
  accessible labels.

### Home `/`

1. **Hero:** `motherlodeinterior1` as one big full-width photo. In its center
   sits a round sage badge outlined in ink, with the full logo image inside,
   sized so the whole drawing and script fit within the circle. Under the
   badge is a gold "Open daily · 11am–7pm" pill. The owner picked this mix
   after seeing a single big photo and a photo collage with a centered round
   logo.
2. **Intro:** "Vintage & makers market" / "Goods and gifts for you and your
   home."
3. **Visit us:** one card per shop showing its storefront photo, shop name,
   and street address, linking to the shop page. The cards stack on a phone
   and sit side by side on a laptop.
4. **Inside the shops:** a grid of interior photos, two across on a phone and
   four across on a laptop.

### Shop page `/decatur` and `/athens` (one shared template)

1. **Storefront photo** at the top.
2. **Sage info block:** a small uppercase city label ("Decatur" or
   "Athens"), the shop name in the script font, the full address, the phone
   number as a tap-to-call link, the gold hours pill, and two buttons: "Get
   directions" (solid ink) and "Call" (outlined). On a laptop the photo and
   the info block sit side by side, with the photo taking about 3/5 of the
   width.
3. **Offerings:** a heading (Decatur's vendor line, or "What you'll find"),
   the optional intro line, and the offerings shown as tags.
4. **Inside:** a grid of shared interior photos.
5. **Find us:** an embedded map of the shop's address.

On a phone the order is exactly 1 to 5 above. On a laptop, Offerings and Find
us sit side by side in one row, and Inside moves below that row, as in the
approved sketch.

Laptop widening in general: the content gets a comfortable maximum width, and
grids gain columns. The shop page's Offerings, Find us, and Inside sections
are the only place where the order changes.

## Builder decisions already made (my calls during brainstorming, owner has seen them)

- **Routing:** App Router, with static routes `/`, `/decatur`, and `/athens`
  (or a single `[shop]` route limited to those two). Built on Next's
  client-side navigation, so it behaves like one app.
- **Images** go through `next/image`, so phones get small files and laptops
  get sharp ones. The hero image loads with priority.
- **Map:** a keyless Google Maps embed (iframe) of the address. "Get
  directions" links to Google Maps directions for the address, which opens
  the native maps app on phones.
- **Hosting:** Vercel, deployed by the owner. Deploying is out of scope for
  this build. The work ends at a passing local production build that
  deploys to Vercel with no extra configuration. No domain yet.
- **Housekeeping:** rename the package to `mother-lode`, fix the
  `motherloadinterior3` filename, delete the unused starter SVGs, and replace
  the starter metadata with real titles and descriptions per page.

## Left to the builder

- Exact font choices within the direction above, and exact sizes and spacing.
- Which interior photos go where, beyond `interior1` as the home hero and
  `interior3` kept out of prominent spots.
- Which nav breakpoint and which laptop maximum width to use.
- Icon source for Instagram and Facebook (inline SVG line art is fine).
- How far to test. This is a small static site, so a production build, lint,
  and a check at phone and laptop widths are the baseline.

## Known weak spot (owner decision)

The Decatur storefront photo (516px wide), `interior2`, `interior4`, and to a
lesser degree the Athens storefront (700px) are lower resolution than a
full-width phone or laptop slot needs. The owner will supply better
storefront photos later. Until then, build the layout as designed, with the
current photos in their intended spots, and accept some softness. Don't
upscale the files or change the layout to hide it. Swapping a photo later
should only mean replacing the file, or changing its path in the shop data
module. Don't hard-code image dimensions anywhere else.
