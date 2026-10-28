# Mother Lode Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the site so it looks more modern and fuller while keeping
the brand, and add the new home sections and the live Instagram strip.

**Architecture:**
- Same three static routes. Copy and photos are extended in
  `app/data/shops.ts`.
- New presentational components: top bar, menu-capable nav, footer, shop
  card, section heading, Instagram tiles.
- Instagram posts come from a `"use cache"` function that fetches the Behold
  JSON feed and never throws. A sync `InstagramTiles` renders either posts or
  fallback photos, so it can be tested without Next.

**Tech Stack:** Next.js 16.4.3 (App Router, `cacheComponents`), React 19.3,
TypeScript, Tailwind CSS v4, Vitest with Testing Library.

**Spec:** `docs/superpowers/specs/2026-10-28-mother-lode-redesign-design.md`

## Global Constraints

- **No emoji** anywhere: code, copy, comments or docs.
  `test/no-emoji.test.ts` must pass.
- **Photos:** square corners, no borders, `object-cover`. No hard-coded image
  dimensions outside the data module.
- **No 2px ink outlines or pill shapes.** Dividers are 1px at about 12% ink.
- **Colors:**
  - `--color-sage: #b0ba84`
  - `--color-olive: #4d5a36`, used for eyebrows on white. On green, eyebrows
    use `text-ink/70`.
  - Gold is decorative only: underlines and the quote rule.
- **Type:**
  - Fraunces replaces Lora as `--font-serif`.
  - Yellowtail is used only for the "Mother Lode" wordmark.
  - Inter is the body font.
- **Buttons** have square corners.
- **Section order and backgrounds** are exactly as the spec lists.
- **No `new Date()` or `Math.random()`** in server components. Cache
  Components fails the prerender on them, so the footer copyright has no year.
- **Instagram failures:** a missing env var, a fetch error, a non-OK response,
  malformed JSON or zero usable posts all render the fallback photos. Never
  throw, never show an empty gap.

## Review Focus

- **A feed with fewer than six usable posts.** The strip still shows six
  tiles: posts first, then fallback photos. (Task 3 test.)
- **Video or carousel posts without `sizes`.** Use `thumbnailUrl` for video
  and `mediaUrl` otherwise. Skip a post that has no usable image URL.
  (Task 3 test.)
- **Behold hanging during `next build`.** The fetch has a 5 second timeout and
  then falls back. (Task 3 test with a rejected fetch.)
- **A long caption used as alt text.** Strip the hashtags and trim to 120
  characters. (Task 3 test.)
- **The phone menu.** It has to work from the keyboard, and it closes after a
  link is chosen, including `/#story` on the home page itself. (Task 2 test.)

---

### Task 1: Visual tokens, fonts and data

**Files:**
- Modify: `app/globals.css`, `app/layout.tsx` (fonts only), `app/data/shops.ts`
- Test: `app/data/shops.test.ts`

**Interfaces:**
- Produces, in `app/data/shops.ts`:
  - `Shop` gains `offeringsPhoto: Photo`.
  - `brand.hours = "Open daily, 11am–7pm"`. One string everywhere.
  - `brand.heroLine: string`
  - `brand.instagramHandle = "@motherlodeatl"`
  - `story: { heading: string; body: string; quote: string; quoteBy: string }`
  - `sell: { heading: string; body: string; phone: string }`. Here `phone` is
    `shops.decatur.phone`.
  - `findTiles: { label: string; photo: Photo }[]`
  - `instagramFallbackPhotos: Photo[]`, six photos.
  - `otherShop(shop: Shop): Shop`
  - `homeInsidePhotos` is removed. `homeHero` stays.

- [ ] **Step 1: Update tests in `app/data/shops.test.ts`**

  Assertions to add or change:
  - `brand.hours` is `"Open daily, 11am–7pm"`.
  - `brand.heroLine` is `"Goods and gifts for you and your home, from dozens of local vendors. Two shops in Decatur and Athens, open every day."`
  - `shops.athens.offeringsHeading` is `"Retro, vintage and handmade"`.
  - `shops.decatur.insidePhotos` is `[interiors.four, interiors.six, interiors.two]`.
  - `shops.athens.insidePhotos` is `[interiors.five, interiors.six, interiors.four, interiors.two]`.
  - `shops.decatur.offeringsPhoto` is `interiors.five`.
  - `shops.athens.offeringsPhoto` is `interiors.one`.
  - A new test, "keeps the Orphintage photo off Decatur": `interiors.one` is
    not among Decatur's `storefront`, `offeringsPhoto` or `insidePhotos`.
  - `findTiles.map((t) => t.label)` is `["Vintage clothing", "Mid-century furniture", "Lighting & decor", "Toys, comics & records"]`.
    Their photos are `interiors` four, two, five and six.
  - `instagramFallbackPhotos` has length 6.
  - `sell.phone` is `"678-927-9635"`.
  - `story.quoteBy` is `"Lindsay Short, owner"`.
  - `otherShop(shops.decatur)` is `shops.athens`, and the reverse.

  Extend the existing alt-text test and power-strip test to cover
  `offeringsPhoto`, `findTiles` photos and `instagramFallbackPhotos`. Remove
  the `homeInsidePhotos` assertions.

- [ ] **Step 2: Run the tests and confirm they fail**

  Run: `npx vitest run app/data/shops.test.ts`. Expected: FAIL on the new
  fields.

- [ ] **Step 3: Implement the data changes**

  Use the exact copy from the spec's Home sections 4 and 6:
  - **story.heading:** "From estate sales to two shops full of local makers"
  - **story.body and story.quote:** verbatim from the spec.
  - **sell.heading:** "Have a booth at Mother Lode"
  - **sell.body:** "Interested in selling at Mother Lode? Give us a call to ask
    about booth space in either shop."
  - **instagramFallbackPhotos:** interiors five, six, four, two and one, plus
    the Athens storefront.

- [ ] **Step 4: Update tokens and fonts**

  - In `globals.css`, set sage to `#b0ba84` and add `--color-olive: #4d5a36`.
  - In `layout.tsx`, swap `Lora` for `Fraunces`, keeping the
    `--font-serif` mapping (`variable: "--font-fraunces"`).

- [ ] **Step 5: Run the tests and confirm they pass**

  Run: `npx vitest run app/data/shops.test.ts`. Expected: PASS.

### Task 2: Shared layout (top bar, nav with menu, footer)

**Files:**
- Create: `app/components/TopBar.tsx`, `app/components/TopBar.test.tsx`
- Modify: `app/components/SiteNav.tsx`, `app/components/SiteFooter.tsx`,
  `app/layout.tsx`, and their tests
- Delete: `app/components/HoursPill.tsx`

**Interfaces:**
- Consumes: `brand`, `shopList` and `telHref` from Task 1.
- Produces: `TopBar()`, `SiteNav()` (client component) and `SiteFooter()`.
  None take props.

- [ ] **Step 1: Write the tests**

  - **TopBar:** has links "Decatur 678-927-9635" to `tel:+16789279635` and
    "Athens 762-772-5554" to `tel:+17627725554`. `queryByText(/11am/)` is null.
  - **SiteNav:**
    - The wordmark links to `/`.
    - The nav links are Decatur `/decatur`, Athens `/athens`, Our story
      `/#story` and Sell with us `/#sell`. There is no "Home" link.
    - On `/decatur`, only Decatur has `aria-current="page"`.
    - The "Menu" button has `aria-expanded="false"` and toggles to `"true"` on
      click.
    - Clicking a link inside the open menu sets it back to `"false"`.
  - **SiteFooter:**
    - It still has both social links.
    - It still links each address to its shop page.
    - It shows both `tel:` numbers and `brand.hours`.
    - It has the text "Vintage & makers market".

- [ ] **Step 2: Run the tests and confirm they fail**

  Run: `npx vitest run app/components`. Expected: FAIL.

- [ ] **Step 3: Implement**

  - **TopBar:** an ink strip, 11.5px text, centered on phones and
    right-aligned from `md`.
  - **SiteNav:**
    - Paper background with a `border-b border-ink/12`. Wordmark at 28px,
      34px from `md`.
    - The inline links show from `md`. Below `md`, a "Menu" button toggles a
      stacked link list (`aria-controls` points at that list).
    - The current link gets a 2px gold underline.
  - **SiteFooter:** four columns from `md`, a closing "Copyright Mother Lode" line with no year,
    and the existing icons.
  - **layout:** renders `TopBar`, then `SiteNav`, `main` and `SiteFooter`.

- [ ] **Step 4: Run the tests and confirm they pass**

  Run: `npx vitest run app/components`. Expected: PASS for these files.
  ShopPage and Home are fixed in Tasks 4 and 5.

### Task 3: Instagram feed and tiles

**Files:**
- Create: `app/data/instagram.ts`, `app/data/instagram.test.ts`,
  `app/components/InstagramTiles.tsx`, `app/components/InstagramTiles.test.tsx`,
  `app/components/InstagramStrip.tsx`

**Interfaces:**
- Produces:
  - `type InstagramPost = { id: string; imageUrl: string; permalink: string; alt: string }`
  - `parseBeholdFeed(json: unknown): InstagramPost[]`. Pure. Returns at most
    6 posts.
  - `getInstagramPosts(): Promise<InstagramPost[]>`. Reads
    `process.env.BEHOLD_FEED_ID` and returns `[]` if it is unset. Otherwise
    it calls the cached `fetchBeholdFeed(feedId: string)`.
  - `InstagramTiles({ posts }: { posts: InstagramPost[] })`. Sync. Always
    renders 6 tiles.
  - `InstagramStrip()`. Async server component that renders
    `<InstagramTiles posts={await getInstagramPosts()} />`.

- [ ] **Step 1: Write the tests**

  In `instagram.test.ts`, mock `next/cache` so `cacheLife` is a no-op, and
  stub `fetch`.
  - **parseBeholdFeed:**
    - An image post uses `sizes.medium.mediaUrl`.
    - A video post with no sizes uses `thumbnailUrl`.
    - A post with no usable URL is skipped.
    - Alt text falls back from `altText` to `prunedCaption` (trimmed to 120
      characters) to `"Instagram post from Mother Lode"`.
    - The result is capped at 6.
    - `{}`, `null` and `{ posts: "x" }` each return `[]`.
  - **getInstagramPosts:**
    - With no env var, it returns `[]` and fetch is never called.
    - A rejected fetch returns `[]`.
    - A 500 response returns `[]`.
    - A good feed calls `https://feeds.behold.so/<id>` and returns the parsed
      posts.

  In `InstagramTiles.test.tsx`:
  - Two posts give 6 links. The first two go to the posts' permalinks and the
    other four go to `brand.instagram`.
  - Zero posts give 6 links, all to `brand.instagram`.
  - Every link has `target="_blank"`.

- [ ] **Step 2: Run the tests and confirm they fail**

  Run: `npx vitest run app/data/instagram.test.ts app/components/InstagramTiles.test.tsx`.
  Expected: FAIL.

- [ ] **Step 3: Implement**

  - **fetchBeholdFeed:**
    - Starts with `"use cache"`.
    - Fetches with `signal: AbortSignal.timeout(5000)`.
    - On success it calls `cacheLife({ revalidate: 4 * 60 * 60, expire: 24 * 60 * 60 })`.
      On any failure it calls `cacheLife({ revalidate: 15 * 60, expire: 60 * 60 })`
      and returns `[]`.
    - Exactly one `cacheLife` call runs per invocation.
  - **Tiles:** use `next/image` with `unoptimized`. Behold already serves
    sized WebP, so this needs no `remotePatterns`. (My call. It changes the
    spec's remotePatterns note.) Fallback tiles use the local photos with
    normal optimization.

- [ ] **Step 4: Run the tests and confirm they pass**

  Same command. Expected: PASS.

### Task 4: Home page

**Files:**
- Create: `app/components/SectionHeading.tsx`, `app/components/ShopCard.tsx`
- Modify: `app/page.tsx`, `app/page.test.tsx`

**Interfaces:**
- Consumes: Task 1 data, `InstagramStrip` and `InstagramTiles` from Task 3.
- Produces:
  - `SectionHeading({ eyebrow, title, level?: 1 | 2, tone?: "white" | "green", children? })`.
    The eyebrow `<p>` comes before an `h1` or `h2` in Fraunces.
  - `ShopCard({ shop }: { shop: Shop })`

- [ ] **Step 1: Rewrite `app/page.test.tsx`**

  Mock `./components/InstagramStrip` as a component that renders
  `<InstagramTiles posts={[]} />`.
  - The h1 is "Vintage & makers market", with `brand.heroLine`.
  - The "Visit Decatur" and "Visit Athens" links go to the shop pages.
  - The h2 headings, in order, are: "Something new every visit", "Two shops,
    open every day", `story.heading`, "New in the shops" and `sell.heading`.
  - The sections with ids `story`, `sell` and `visit` exist.
  - The logo image appears once.
  - There's no text "Open daily · 11am–7pm".
  - "Call 678-927-9635" links to `tel:+16789279635`.
  - Each shop card has "Get directions" (equal to `directionsUrl(shop)`) and
    "About this shop" links.

- [ ] **Step 2: Run the tests and confirm they fail**

  Run: `npx vitest run app/page.test.tsx`. Expected: FAIL.

- [ ] **Step 3: Implement the sections in the spec's order and colors**

  - The hero image keeps `preload`.
  - Wrap the strip as
    `<Suspense fallback={<InstagramTiles posts={[]} />}><InstagramStrip /></Suspense>`.
  - The content width is `max-w-6xl`, with `px-5`, rising to `md:px-12`.
  - Section padding is about 52px on phones and 84px from `md`.

- [ ] **Step 4: Run the tests and confirm they pass**

  Run: `npx vitest run app/page.test.tsx`. Expected: PASS.

### Task 5: Shop page

**Files:**
- Modify: `app/components/ShopPage.tsx`, `app/components/ShopPage.test.tsx`,
  `app/components/PhotoGrid.tsx`, `app/components/PhotoGrid.test.tsx`

**Interfaces:**
- Consumes: `otherShop` and `offeringsPhoto` from Task 1, and
  `SectionHeading` from Task 4.
- Produces: `PhotoGrid({ photos })`, which now lays out 3 or 4 photos.

- [ ] **Step 1: Update the tests**

  - **ShopPage:**
    - The h2 order is "30 to 50 local vendors & makers", "A look around",
      "Getting here" and "Mother Lode Athens" (for Decatur).
    - It shows `brand.hours`.
    - The storefront crop-class tests are kept.
    - "Visit the Athens shop" links to `/athens`, and Athens shows "Visit the
      Decatur shop".
    - Athens uses the heading "Retro, vintage and handmade".
    - It has an "Open in Google Maps" link to `directionsUrl(shop)`.
    - The map iframe title is unchanged.
  - **PhotoGrid:** with 3 photos, the first tile has `col-span-2` (spanning
    both columns on phones) and `md:col-span-1`.

- [ ] **Step 2: Run the tests and confirm they fail**

  Run: `npx vitest run app/components/ShopPage.test.tsx app/components/PhotoGrid.test.tsx`.
  Expected: FAIL.

- [ ] **Step 3: Implement**

  Follow the spec's shop page sections 1 to 5. On laptops the top grid is
  `md:grid-cols-5`: the photo spans `md:col-span-3`, and the info panel
  spans `md:col-span-2` with `min-h-[520px]`.

- [ ] **Step 4: Run the tests and confirm they pass**

  Same command. Expected: PASS.

### Task 6: README and full verification

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Add a "Live Instagram strip (Behold)" section**

  Cover the five setup steps and the free plan's limits from the spec, and
  that shop photos show until the setup is done.

- [ ] **Step 2: Run the full suite**

  Run: `npm test && npm run lint && npm run build`. Expected: all pass, and
  the build prerenders `/`, `/decatur` and `/athens`.

- [ ] **Step 3: Check the pages visually**

  Run `npm run start` and take headless Chrome screenshots of all three pages
  at 390px and 1280px. Check the following:
  - the logo blends into the green
  - no thick outlines
  - sections alternate green and white
  - the phone menu works
  - the Instagram fallback shows six tiles

- [ ] **Step 4: Ask the user before committing**

  On approval, commit to branch `redesign`.
