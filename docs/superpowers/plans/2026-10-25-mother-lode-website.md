# Mother Lode Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the create-next-app starter with the three-page Mother Lode site (home, Decatur, Athens): mobile first, photo-forward, and built from the logo's palette.

**Architecture:** One Next.js App Router app with static routes `/`, `/decatur` and `/athens`. Every fact and photo lives in one typed data module (`app/data/shops.ts`). Small presentational components read from it, and a shared `ShopPage` template renders both shop routes. A client-side `SiteNav` marks the current page, and it and `SiteFooter` sit in the root layout.

**Tech Stack:** Next.js 16.4.3, React 19.3, TypeScript, Tailwind CSS v4, `next/font/google`, `next/image`, Vitest 5 with React Testing Library and jsdom.

**Spec:** `docs/superpowers/specs/2026-10-23-mother-lode-website-design.md`. Read it before starting any task. It is the source of truth for copy, layout order and visual rules.

## Global Constraints

- No emoji anywhere: copy, alt text, code, comments, commit messages, docs. Also avoid the copyright sign (U+00A9), the trademark sign (U+2122) and the left-right arrow (U+2194), because the emoji scan in Task 1 treats them as pictographic.
- Photos: square corners, no borders, `object-fit: cover`, full-bleed on phones. Non-photo elements (nav, info block, hours pill, tags, logo badge) may keep thin ink outlines and pill and circle shapes.
- Palette tokens: sage `#a9bb87`, sage-light `#e6ecd9`, ink `#1b1b1b`, gold `#d9a521`, paper `#fbfaf5`. Light theme only.
- Top-left wordmark: the text "Mother Lode" in black script, with no image.
- Hours copy: `Open daily · 11am–7pm` (middle dot U+00B7, en dash U+2013).
- Mobile first: base styles target a 390px phone, and wider layouts are added with `md:`/`lg:` variants. There must be no horizontal scroll at 320px.
- Image dimensions come only from static imports in `app/data/shops.ts`. Never hard-code width or height values for photos anywhere else.
- Don't touch `next.config.ts`. Deploying is out of scope: the work ends at a passing `npm run build`.
- Commit after each task with a conventional message ending in the line `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

1. **320px phones.** The nav (wordmark plus three links) and the shop info buttons must fit with no horizontal scroll. Checked by hand in Task 6, step 3.
2. **Tap-to-call format.** `tel:` links must use E.164 (`tel:+16789279635`), not the dashed display string. Tested in Task 2 and Task 5.
3. **Addresses with a suite number.** "Ste B" and commas must be URL-encoded in the directions and map URLs so the right place opens. Tested in Task 2.
4. **Screen readers.** Icon-only social links need `aria-label`, the map iframe needs a `title`, and every photo needs non-empty alt text. Tested in Task 2 (alt text), Task 3 (social labels) and Task 5 (iframe title).
5. **A missing or slow photo must not collapse the layout.** Every photo sits in a frame whose size is set by aspect ratio or height (`next/image` with `fill` inside a sized wrapper), so the page keeps its shape before the image loads. Checked by hand in Task 6, step 3 (throttled network).

---

### Task 1: Test harness and housekeeping

**Files:**
- Create: `vitest.config.mts`, `test/setup.tsx`, `test/no-emoji.test.ts`
- Modify: `package.json` (name to `mother-lode`, add `"test": "vitest run"`), `package-lock.json` (via npm), `README.md` (add `npm test` under Getting Started)
- Rename: `public/motherloadinterior3.jpg` to `public/motherlodeinterior3.jpg`
- Commit as-is: the photos, the logo and `.gitignore`, which are already in the working tree but untracked or modified

**Interfaces:**
- Produces: `npm test` runs Vitest with jsdom. `test/setup.tsx` registers jest-dom matchers, runs `cleanup` after each test, and mocks `next/image` as a plain `<img>`. The mock resolves `src` to `typeof src === "string" ? src : src.src` and passes `alt` through. Later tasks rely on that mock and on `@/` path aliases.

- [ ] **Step 1: Install dev dependencies**

Run: `npm install -D vitest@^5 @vitejs/plugin-react@^6 jsdom vite-tsconfig-paths @testing-library/react @testing-library/dom @testing-library/jest-dom`
Expected: exits 0, with the packages listed under `devDependencies`.

- [ ] **Step 2: Add `vitest.config.mts` and `test/setup.tsx`**

The config follows `node_modules/next/dist/docs/01-app/02-guides/testing/vitest.md` (`tsconfigPaths()` and `react()` plugins, `environment: "jsdom"`) and adds `setupFiles: ["./test/setup.tsx"]`. In the setup, the mocked `<img>` needs an `// eslint-disable-next-line @next/next/no-img-element`.

- [ ] **Step 3: Write `test/no-emoji.test.ts`**

It runs in Node (`// @vitest-environment node`) and walks `app/`, `test/`, `docs/`, `README.md` and `package.json`, skipping `node_modules`, `.next` and `.superpowers`. It reads every `.ts`, `.tsx`, `.css`, `.md`, `.json` and `.mjs` file.

```ts
it("contains no emoji in project text files", () => {
  const offenders = files.filter((f) => /\p{Extended_Pictographic}/u.test(readFileSync(f, "utf8")));
  expect(offenders).toEqual([]);
});
```

- [ ] **Step 4: Run the tests**

Run: `npm test`
Expected: PASS, 1 test.

- [ ] **Step 5: Rename the package, fix the photo filename and update the README**

Set `"name": "mother-lode"` in `package.json`, then run `npm install` so the lockfile matches. Move the interior3 file to its corrected name. Add `npm test` to the README.

- [ ] **Step 6: Verify the build still passes**

Run: `npm test && npm run build`
Expected: both exit 0.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: add Vitest harness, emoji guard, and site photos"
```

---

### Task 2: Shop data module

**Files:**
- Create: `app/data/shops.ts`
- Test: `app/data/shops.test.ts`

**Interfaces:**
- Produces:

```ts
import type { StaticImageData } from "next/image";
export type ShopSlug = "decatur" | "athens";
export type Photo = { src: StaticImageData; alt: string };
export type Shop = {
  slug: ShopSlug;
  city: string;              // "Decatur" | "Athens"
  name: string;              // "Mother Lode Atlanta" | "Mother Lode Athens"
  street: string;            // "3429 Covington Hwy Ste B"
  locality: string;          // "Decatur, GA 30032"
  phone: string;             // display form "678-927-9635"
  offeringsHeading: string;
  intro?: string;            // Decatur only
  offerings: string[];
  storefront: Photo;
  insidePhotos: Photo[];
};
export const brand: {
  name: "Mother Lode"; tagline: string; supporting: string; hours: string;
  instagram: string; facebook: string; logo: Photo;
};
export const interiors: Record<"one" | "two" | "three" | "four" | "five" | "six", Photo>;
export const homeHero: Photo;            // interiors.one
export const homeInsidePhotos: Photo[];  // [five, four, six, two]
export const shops: Record<ShopSlug, Shop>;
export const shopList: Shop[];           // [shops.decatur, shops.athens]
export function fullAddress(shop: Shop): string;    // `${street}, ${locality}`
export function telHref(phone: string): string;     // "tel:+1" + digits
export function directionsUrl(shop: Shop): string;  // https://www.google.com/maps/dir/?api=1&destination=<encoded fullAddress>
export function mapEmbedUrl(shop: Shop): string;    // https://maps.google.com/maps?q=<encoded fullAddress>&output=embed
```

- [ ] **Step 1: Write the failing tests**

```ts
expect(brand.tagline).toBe("Vintage & makers market");
expect(brand.supporting).toBe("Goods and gifts for you and your home.");
expect(brand.hours).toBe("Open daily · 11am–7pm");
expect(brand.instagram).toBe("https://www.instagram.com/motherlodeatl/");
expect(brand.facebook).toBe("https://www.facebook.com/motherlodeatl/");

expect(shops.decatur).toMatchObject({
  city: "Decatur", name: "Mother Lode Atlanta",
  street: "3429 Covington Hwy Ste B", locality: "Decatur, GA 30032",
  phone: "678-927-9635",
  offeringsHeading: "30 to 50 local vendors & makers",
  intro: "An indoor market of local vendors and makers.",
});
expect(shops.decatur.offerings).toEqual([
  "Mid-century modern furniture", "Lighting", "Antiques",
  "Vintage clothing: 90s, Y2K and true vintage", "Vinyl records", "Comics",
  "Handmade jewelry", "Low-maintenance indoor plants",
]);
expect(shops.athens).toMatchObject({
  city: "Athens", name: "Mother Lode Athens",
  street: "1005 Baxter St", locality: "Athens, GA 30606",
  phone: "762-772-5554", offeringsHeading: "What you'll find",
});
expect(shops.athens.intro).toBeUndefined();
expect(shops.athens.offerings).toEqual([
  "Retro and vintage clothing", "Unique home goods", "Georgia Bulldogs gear",
  "Handcrafted jewelry", "Plants",
]);
expect(shopList.map((s) => s.slug)).toEqual(["decatur", "athens"]);

expect(fullAddress(shops.decatur)).toBe("3429 Covington Hwy Ste B, Decatur, GA 30032");
expect(telHref("678-927-9635")).toBe("tel:+16789279635");
expect(telHref("762-772-5554")).toBe("tel:+17627725554");
expect(directionsUrl(shops.decatur)).toBe(
  "https://www.google.com/maps/dir/?api=1&destination=3429%20Covington%20Hwy%20Ste%20B%2C%20Decatur%2C%20GA%2030032");
expect(mapEmbedUrl(shops.athens)).toBe(
  "https://maps.google.com/maps?q=1005%20Baxter%20St%2C%20Athens%2C%20GA%2030606&output=embed");

// every photo has real alt text
const all = [brand.logo, homeHero, ...homeInsidePhotos, ...shopList.flatMap((s) => [s.storefront, ...s.insidePhotos])];
for (const p of all) expect(p.alt.trim().length).toBeGreaterThan(0);
expect(homeHero).toBe(interiors.one);
expect(homeInsidePhotos).toEqual([interiors.five, interiors.four, interiors.six, interiors.two]);
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run app/data/shops.test.ts`
Expected: FAIL, cannot resolve `./shops`.

- [ ] **Step 3: Implement `app/data/shops.ts`**

Use static imports from `@/public/...` for every photo. Storefronts: `motherlodeatlstorefront.jpeg` for Decatur and `motherlodeathensstorefront.webp` for Athens. Inside photos: Decatur gets `[five, six, two, four]` and Athens gets `[one, six, four, five]`. `interiors.three` is exported but not placed anywhere, because of the power strip. Write descriptive alt text from the spec's photo descriptions, for example "Racks of vintage tees and Georgia gear beside shelves of home goods".

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/data
git commit -m "feat: add shop data module with address, phone and map helpers"
```

---

### Task 3: Theme, layout, nav and footer

**Files:**
- Modify: `app/globals.css` (replace the starter tokens and remove dark mode), `app/layout.tsx`
- Create: `app/components/SiteNav.tsx` (`"use client"`), `app/components/SiteFooter.tsx`, `app/components/HoursPill.tsx`, `app/components/icons.tsx`
- Test: `app/components/SiteNav.test.tsx`, `app/components/SiteFooter.test.tsx`

**Interfaces:**
- Consumes: `brand`, `shopList`, `fullAddress` from Task 2.
- Produces:
  - `SiteNav(): JSX.Element`, using `usePathname()`.
  - `SiteFooter(): JSX.Element`.
  - `HoursPill({ className?: string }): JSX.Element`, rendering `brand.hours`.
  - `InstagramIcon` and `FacebookIcon` as inline line-art SVG components (`aria-hidden`).
  - Tailwind theme tokens: `--color-sage`, `--color-sage-light`, `--color-ink`, `--color-gold`, `--color-paper`, and `--font-script`, `--font-serif`, `--font-sans`, giving classes such as `bg-sage`, `text-ink` and `font-script`.

- [ ] **Step 1: Write the failing tests**

SiteNav (mock `next/navigation` so `usePathname` returns `"/decatur"`):

```ts
expect(screen.getByRole("link", { name: "Mother Lode" })).toHaveAttribute("href", "/");
expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
expect(screen.getByRole("link", { name: "Decatur" })).toHaveAttribute("aria-current", "page");
expect(screen.getByRole("link", { name: "Athens" })).not.toHaveAttribute("aria-current");
expect(screen.queryByRole("img")).toBeNull(); // wordmark is text, not an image
```

SiteFooter:

```ts
expect(screen.getByRole("link", { name: "Instagram" })).toHaveAttribute("href", "https://www.instagram.com/motherlodeatl/");
expect(screen.getByRole("link", { name: "Facebook" })).toHaveAttribute("href", "https://www.facebook.com/motherlodeatl/");
expect(screen.getByRole("link", { name: /3429 Covington Hwy Ste B/ })).toHaveAttribute("href", "/decatur");
expect(screen.getByRole("link", { name: /1005 Baxter St/ })).toHaveAttribute("href", "/athens");
expect(screen.getByText("Open daily · 11am–7pm")).toBeInTheDocument();
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run app/components`
Expected: FAIL, modules not found.

- [ ] **Step 3: Implement the theme, components and layout**

- `globals.css`: set the tokens above in `@theme`, a paper background with ink text on `body`, and no `prefers-color-scheme` block.
- `layout.tsx`: load fonts with `next/font/google`: Yellowtail as the script font (weight 400), Lora as the serif and Inter as the sans. Expose them as CSS variables that feed the font tokens. Replace the Geist fonts.
  - Render `<SiteNav />`, then `<main className="flex-1">{children}</main>`, then `<SiteFooter />`.
  - Metadata: `title: { default: "Mother Lode | Vintage & makers market", template: "%s | Mother Lode" }`, plus a description built from the tagline and the supporting line.
- `SiteNav`: a sage bar with an ink bottom rule. The wordmark on the left is a link to `/` using `font-script`. Links: Home, Decatur, Athens.
- `SiteFooter`: an ink background with paper text, the wordmark, one line per shop as `city · street` linking to the shop page, `HoursPill` (or the plain hours text), and the icon links with `aria-label="Instagram"` and `aria-label="Facebook"`, opening in a new tab with `rel="noopener noreferrer"`.
- If `next build` complains that `usePathname` needs a Suspense boundary under `cacheComponents`, wrap `<SiteNav />` in `<Suspense>` in the layout.

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app
git commit -m "feat: add brand theme, fonts, site nav and footer"
```

---

### Task 4: Home page

**Files:**
- Modify: `app/page.tsx` (replace the starter completely)
- Create: `app/components/PhotoGrid.tsx`
- Delete: `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg`
- Test: `app/page.test.tsx`, `app/components/PhotoGrid.test.tsx`

**Interfaces:**
- Consumes: `brand`, `homeHero`, `homeInsidePhotos`, `shopList` (Task 2) and `HoursPill` (Task 3).
- Produces: `PhotoGrid({ photos: Photo[] }): JSX.Element`. It is two columns on phones and four from `md:` up. Each cell is a fixed-aspect frame holding `next/image` with `fill`, `object-cover` and a `sizes` hint. There are no borders or radius.

- [ ] **Step 1: Write the failing tests**

PhotoGrid: rendering `homeInsidePhotos` gives 4 images whose alt values equal `homeInsidePhotos.map(p => p.alt)`, in order.

Home page:

```ts
expect(screen.getByRole("img", { name: homeHero.alt })).toBeInTheDocument();
expect(screen.getByRole("img", { name: brand.logo.alt })).toBeInTheDocument();
expect(screen.getByText("Open daily · 11am–7pm")).toBeInTheDocument();
expect(screen.getByRole("heading", { name: "Vintage & makers market" })).toBeInTheDocument();
expect(screen.getByText("Goods and gifts for you and your home.")).toBeInTheDocument();
expect(screen.getByRole("heading", { name: "Visit us" })).toBeInTheDocument();
expect(screen.getByRole("link", { name: /Decatur/ })).toHaveAttribute("href", "/decatur");
expect(screen.getByRole("link", { name: /Athens/ })).toHaveAttribute("href", "/athens");
expect(screen.getByRole("heading", { name: "Inside the shops" })).toBeInTheDocument();
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run app/page.test.tsx app/components/PhotoGrid.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement `PhotoGrid` and the home page**

The section order is fixed by the spec:

1. **Hero:** `homeHero` filling the frame with `priority`. It is about 300px tall on phones and about 420px from `lg:`. A centered round sage badge with an ink outline holds `brand.logo` at about 66% of the badge diameter, so the script lettering isn't clipped. The badge is 170px on phones and 220px from `lg:`, with `HoursPill` under it.
2. **Intro:** an `h1` with the tagline and the supporting line.
3. **Visit us:** one card per `shopList` entry, each a single `Link` to `/${slug}` holding the storefront photo frame, the city and the street. The cards stack on phones and sit side by side from `md:`.
4. **Inside the shops:** `PhotoGrid` of `homeInsidePhotos`.

Content gets a comfortable max width (about `max-w-6xl`) on laptops. The hero stays full-bleed.

- [ ] **Step 4: Delete the starter SVGs, then run the tests and build**

Run: `npm test && npm run build`
Expected: PASS, and the build lists `/`.

- [ ] **Step 5: Commit**

```bash
git add -A app public
git commit -m "feat: build photo-forward home page"
```

---

### Task 5: Shop page template and the two shop routes

**Files:**
- Create: `app/components/ShopPage.tsx`, `app/decatur/page.tsx`, `app/athens/page.tsx`
- Test: `app/components/ShopPage.test.tsx`

**Interfaces:**
- Consumes: `Shop`, `shops`, `fullAddress`, `telHref`, `directionsUrl`, `mapEmbedUrl` (Task 2), `HoursPill` (Task 3) and `PhotoGrid` (Task 4).
- Produces: `ShopPage({ shop }: { shop: Shop }): JSX.Element`. Each route file renders `<ShopPage shop={shops.decatur} />` or `shops.athens`, and exports `metadata`:
  - `/decatur`: `{ title: "Decatur", description: "Mother Lode Atlanta: 3429 Covington Hwy Ste B, Decatur, GA 30032. Open daily 11am–7pm." }`
  - `/athens`: `{ title: "Athens", description: "Mother Lode Athens: 1005 Baxter St, Athens, GA 30606. Open daily 11am–7pm." }`

- [ ] **Step 1: Write the failing tests**

For `shops.decatur`:

```ts
expect(screen.getByRole("img", { name: shop.storefront.alt })).toBeInTheDocument();
expect(screen.getByText("Decatur")).toBeInTheDocument();
expect(screen.getByRole("heading", { level: 1, name: "Mother Lode Atlanta" })).toBeInTheDocument();
expect(screen.getByText(/3429 Covington Hwy Ste B/)).toBeInTheDocument();
expect(screen.getByRole("link", { name: "678-927-9635" })).toHaveAttribute("href", "tel:+16789279635");
expect(screen.getByRole("link", { name: "Call" })).toHaveAttribute("href", "tel:+16789279635");
expect(screen.getByRole("link", { name: "Get directions" })).toHaveAttribute("href", directionsUrl(shop));
expect(screen.getByText("Open daily · 11am–7pm")).toBeInTheDocument();
expect(screen.getByRole("heading", { name: "30 to 50 local vendors & makers" })).toBeInTheDocument();
expect(screen.getByText("An indoor market of local vendors and makers.")).toBeInTheDocument();
for (const o of shop.offerings) expect(screen.getByText(o)).toBeInTheDocument();
expect(screen.getByTitle("Map of Mother Lode Atlanta")).toHaveAttribute("src", mapEmbedUrl(shop));
expect(screen.getByRole("heading", { name: "Inside" })).toBeInTheDocument();
expect(screen.getByRole("heading", { name: "Find us" })).toBeInTheDocument();
```

For `shops.athens`: the heading "What you'll find" exists, the Decatur intro text is absent, and the call link is `tel:+17627725554`.

Phone order: in DOM order the headings are offerings heading, then "Inside", then "Find us". Check it with `getAllByRole("heading", { level: 2 })`.

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run app/components/ShopPage.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement `ShopPage` and the routes**

- **Top:** the storefront frame, then the sage info block, which holds:
  - an uppercase city label
  - an `h1` name in `font-script`
  - the street and locality
  - the phone as a `tel:` link
  - `HoursPill`
  - a "Get directions" button (solid ink, opens in a new tab with `rel="noopener noreferrer"`)
  - a "Call" button (outlined)
- **From `lg:`,** the photo and the info block sit side by side, with the photo at about 3/5 of the width.
- **Body (phone order):** Offerings (`h2` heading, optional intro, offerings as sage-light pill tags), then Inside (`h2`, `PhotoGrid` of `shop.insidePhotos`), then Find us (`h2`, an iframe with `title={\`Map of ${shop.name}\`}`, `loading="lazy"`, a fixed height, full width and no border).
- **From `lg:`,** Offerings and Find us share one row and Inside sits below it. Get this with CSS grid placement (`lg:order-*` or grid areas) so the DOM order, and the phone order, stay as above.

- [ ] **Step 4: Run the tests and build**

Run: `npm test && npm run build`
Expected: PASS, and the build lists `/`, `/decatur` and `/athens` as static.

- [ ] **Step 5: Commit**

```bash
git add app
git commit -m "feat: add shop page template with Decatur and Athens routes"
```

---

### Task 6: Final verification

**Files:** none, unless the checks turn something up.

- [ ] **Step 1: Lint**

Run: `npm run lint`
Expected: exits 0 with no errors.

- [ ] **Step 2: Tests and production build**

Run: `npm test && npm run build`
Expected: all tests pass, and the three routes build as static.

- [ ] **Step 3: Visual check in a browser**

Start `npm run dev` and look at `/`, `/decatur` and `/athens` at widths of 320, 390 and 1280px. Use the `run` skill or a browser tool to capture screenshots. Check each of these:

- there is no horizontal scroll at 320px
- the nav fits on one line
- photos have no borders or rounded corners and fill their frames
- the logo badge shows the whole drawing and the script
- the laptop shop page has the photo and the info block side by side, and Offerings beside the map, with Inside below them
- with network throttling ("Slow 4G"), the photo frames keep their size before the images load
- no emoji is visible anywhere

Fix anything that fails, then rerun steps 1 and 2.

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: polish layout from visual check"
```

Skip this if nothing changed.
