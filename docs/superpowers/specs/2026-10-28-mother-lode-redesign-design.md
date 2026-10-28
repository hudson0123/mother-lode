# Mother Lode website redesign: design

Date: 2026-10-28
Status: draft, awaiting approval
Builds on: `2026-10-23-mother-lode-website-design.md` (the original design).
That document still holds for anything this one doesn't change, including the
shop facts, the photo notes, and the hosting setup.

## What this is and why

The site works, but the owner's view is that it looks "a little empty and
cartoony." This redesign keeps the brand (sage, ink black, a touch of gold,
the script "Mother Lode" wordmark) and makes the site feel more modern and
fuller. It also adds the kinds of information that similar shops put on their
sites.

These sites were reviewed:

- Kudzu Antiques + Modern (Decatur): a top bar with phone and hours, a story
  ("Atlanta's Best since 1979"), a dealers section, reviews, and an Instagram
  feed.
- Uncommon Objects (Austin): a short personal history and visit details.
- Artists & Fleas (NYC): "apply to sell" for vendors and an Instagram feed.

What made the old site look cartoony:

- thick 2px ink outlines on the nav, the info block, the hours pill and the
  tags
- the round sage logo badge stamped on the hero photo
- the outlined bubble pills

What made it look empty:

- a short hero
- few sections
- almost nothing to read beyond the facts

## Goals

- **Look more modern** while keeping the brand:
  - thin hairlines instead of thick outlines
  - bigger photos
  - a more refined heading font
  - sections that alternate between green and white backgrounds
- **More content on the home page:**
  - what you'll find
  - full details for both shops
  - the owner's story
  - the latest Instagram posts
  - a section for vendors who want a booth
- **Better shop pages:**
  - cleaner essentials
  - offerings as a list
  - a bigger map
  - a link to the other shop
- **A live Instagram strip** showing the six latest posts from @motherlodeatl,
  pulled in through Behold. It falls back to shop photos when the feed is
  unavailable.

## Non-goals

- A reviews section. It would need real customer quotes or the Google rating,
  and nothing will be made up. It can be added later.
- A newsletter, gift cards, events, online shopping, or a vendor application
  form.
- Separate pages for "Our story" or "Sell with us". Both are home page
  sections, and they aren't in the nav.
- Category pages. The "What you'll find" tiles are not links.
- Our own Instagram API integration with tokens. Behold handles that.

## Anti-goals (would make this a failure even if it works)

- **Any emoji anywhere** in the project. This still applies, and
  `test/no-emoji.test.ts` enforces it.
- **Rounded corners or borders on photos.** This still applies.
- **Thick black outlines or bubble shapes** coming back. That is the
  "cartoony" look being removed.
- **Invented facts**, such as reviews, vendor counts or story details that
  didn't come from the owner, the existing shop data, or the press coverage
  cited below.
- **The page breaking, erroring, or showing an empty gap** when Instagram or
  Behold is down or not set up.
- **Photos that are slow or blurry** on phones.

## Constraints

- Same app: Next.js 16.4.3 (App Router), React 19.3, TypeScript, and Tailwind
  CSS v4 via `@tailwindcss/turbopack`. `cacheComponents` and
  `partialPrefetching` are on. Per `AGENTS.md`, read the relevant guide in
  `node_modules/next/dist/docs/` before writing code. This matters most for
  caching the Instagram fetch under `cacheComponents`.
- All shop facts and copy stay in one typed data module (`app/data/shops.ts`
  or a sibling). No hard-coded image dimensions outside it.
- The approved mockups are local and gitignored, in
  `.superpowers/brainstorm/26374-1793211928/content/`:
  - `home-redesign-v2.html`: the home page, laptop and phone
  - `shop-page.html`: the shop page, laptop and phone

  Treat them as layout and style references. Where they differ from this
  document, this document wins.

## Visual system

- **Colors.** Keep the existing tokens: sage, sage-light, ink, gold and paper.
  - Change `--color-sage` from `#a9bb87` to `#b0ba84`. That is the logo's
    actual background (sampled from `motherlodelogo.png`), so the logo blends
    into green sections without a visible square. (My call.)
  - Add one text accent, an olive of about `#4d5a36`, for small uppercase
    labels on white sections. On green sections, those labels use ink at about
    70% opacity. (My call.)
  - Gold stays decorative only: link underlines and the quote rule. Never use
    it for text, because the contrast on paper is too low.
- **Lines.** Use 1px hairlines at about 12% ink for dividers and the nav
  bottom border. The thick 2px ink outlines go away everywhere.
- **Type:**
  - Headings switch from Lora to **Fraunces**, using a medium weight and a
    slightly tight letter spacing. (My call; it was shown in the mockups.)
  - Yellowtail is used only for the "Mother Lode" wordmark in the nav and the
    footer. Shop names move to Fraunces.
  - Inter stays as the body font.
  - Small section labels ("eyebrows") are uppercase, about 11px, with wide
    letter spacing.
- **Buttons.** Square corners. There are three kinds:
  - solid ink with paper text
  - a 1px ink outline
  - on photos, solid paper, or a 1px paper outline
- **Text links.** Bold and small, with a 2px gold underline on white sections
  and a 2px ink underline on green.
- **Section rhythm.** Below the hero, page sections alternate green (sage) and
  white (paper), as listed below. Ink is used only for the top bar and the
  footer.
- **Photos.** Square corners, no borders, cropped to fill their frames. Wide
  photos run full-bleed on phones, as the mockups show.
- **Removed:** the `HoursPill` component and the round logo badge.

## Shared layout (every page)

1. **Top bar (ink).**
   - The two phone numbers, labeled "Decatur 678-927-9635" and "Athens
     762-772-5554". Each is a `tel:` link.
   - The numbers are centered on phones and right-aligned on laptops.
   - **No hours here.** The owner asked for that specifically.
2. **Nav (paper, with a 1px hairline under it).**
   - The "Mother Lode" wordmark sits on the left and links to `/`.
   - The links are Decatur and Athens only. The owner removed Our story and
     Sell with us from the header. The current shop page gets a gold
     underline.
   - Two links fit at 390px, so they show directly on phones, with no Menu
     button.
3. **Footer (ink).**
   - Four columns on a laptop, stacked on a phone:
     - the wordmark and "Vintage & makers market"
     - Decatur: address and phone
     - Athens: address and phone
     - Hours ("Open daily, 11am–7pm"), plus the existing Instagram and
       Facebook line-art icons with accessible labels
   - A small copyright line ends the footer.

## Home page `/`, in order

1. **Hero (photo).**
   - `interior1` runs full width, about 520px tall on phones and 620px on
     laptops, with a dark gradient toward the bottom.
   - Over the photo, bottom left:
     - an h1, "Vintage & makers market", large, in Fraunces
     - a line of copy: "Goods and gifts for you and your home, from dozens of
       local vendors. Two shops in Decatur and Athens, open every day."
     - two buttons, "Visit Decatur" (solid paper) and "Visit Athens" (paper
       outline), linking to the shop pages
   - No logo badge.
2. **What you'll find (green).**
   - The eyebrow "What you'll find" and the h2 "Something new every visit".
   - Four 4:5 photo tiles with labels underneath:
     - Vintage clothing (`interior4`)
     - Mid-century furniture (`interior2`)
     - Lighting & decor (`interior5`)
     - Toys, comics & records (`interior6`)
   - The tiles go 2 across on phones and 4 across on laptops. They are not
     links, so there are no arrows. (My call: the mockup's arrows and its "See
     both shops" link pointed nowhere useful, so drop them.)
3. **Two shops, open every day (white, `id="visit"`).**
   - The eyebrow "Visit".
   - One card per shop:
     - a 4:3 storefront photo, using each shop's crop position
     - the city as an eyebrow, and the shop name as an h3
     - Address, Phone (a `tel:` link) and Hours as a small label/value list
     - two text links: "Get directions" (Google Maps, new tab) and "About
       this shop" (the shop page)
   - The cards stack on phones and sit side by side on laptops.
4. **Our story (green, `id="story"`).**
   - The logo image sits on its own, with no circle and no border. Because the
     sage token now matches the logo, it blends into the green.
   - Beside the logo (on a laptop) or below it (on a phone):
     - the eyebrow "Our story"
     - the h2 "From estate sales to two shops full of local makers"
     - this paragraph: "Lindsay Short grew up tagging along to estate sales
       with her antique-dealer parents. After years running Bennett and
       Sudderth, an estate sale company named for her grandmothers, she opened
       Mother Lode in Decatur in 2021 and in Athens in 2023."
     - a pull quote with a gold left rule: "I love being able to support more
       than 40 small businesses and give them a space where they don't have to
       take on a lot of overhead." It is attributed "Lindsay Short, owner".
   - **Needs the owner's OK before launch.** The copy comes from 2023 press
     coverage (Red & Black, Athens Magazine). Keep it in the data module so
     it's easy to edit.
5. **New in the shops (white).**
   - The eyebrow "@motherlodeatl", the h2 "New in the shops", and a "Follow on
     Instagram" text link to the profile.
   - Six square tiles run edge to edge: 3 by 2 on phones, 6 across on laptops.
   - See the Instagram section below for where the tiles come from.
6. **Sell with us (green, `id="sell"`).**
   - The eyebrow "Sell with us" and the h2 "Have a booth at Mother Lode".
   - The line "Interested in selling at Mother Lode? Give us a call to ask
     about booth space in either shop."
   - A solid ink button labeled "Call 678-927-9635", linking to the Decatur
     `tel:`.
   - The owner said to use one of the phone numbers for now. (My call:
     Decatur, since it was the first shop. Keep the booth phone as its own
     field in the data module so switching numbers or adding an email later
     is a one-line change.)
   - The wording was written to avoid promising that space is available.
     The owner should still check it.

## Shop page `/decatur` and `/athens` (one shared template), in order

1. **Storefront and essentials (green).**
   - On a laptop, the storefront photo takes 3/5 of the width and the info
     panel 2/5, at least about 520px tall. On a phone, the photo (4:3) sits
     above the panel.
   - The panel holds:
     - the city as an eyebrow
     - the h1 shop name in Fraunces
     - Address, Phone (a `tel:` link) and Hours ("Open every day,
       11am–7pm") as a label/value list
     - two buttons, "Get directions" (solid ink, new tab) and "Call" (1px ink
       outline)
2. **What you'll find (white).**
   - The eyebrow "What you'll find", then the h2:
     - Decatur: "30 to 50 local vendors & makers" (unchanged).
     - Athens: "Retro, vintage and handmade". (My call. The old Athens
       heading, "What you'll find", would repeat the eyebrow. This avoids
       stating a vendor count the owner hasn't given.)
   - The optional intro line (Decatur only).
   - The offerings as a plain list with hairline dividers: one column on
     phones, two on laptops. The outlined pills are gone.
   - A 4:5 photo sits beside the list on laptops and below it on phones. Each
     shop has its own offerings photo in the data module:
     - Decatur: `interior5`
     - Athens: `interior1`. Its Orphintage sign belongs to the Athens shop.
3. **Inside (green).**
   - The eyebrow "Inside" and the h2 "A look around".
   - A photo grid that handles 3 or 4 photos:
     - with 4 photos: 2 across on phones, 4 across on laptops
     - with 3 photos: 3 across on laptops; on phones the first photo is full
       width and the other two sit below it
   - Decatur: `interior4`, `interior6`, `interior2`. **Don't use
     `interior1` on Decatur**, since its Orphintage sign is in the Athens shop.
   - Athens: `interior5`, `interior6`, `interior4`, `interior2`.
   - `interior3` is still kept off every page.
4. **Find us (white).**
   - The eyebrow "Find us", the h2 "Getting here", the address and hours, and
     an "Open in Google Maps" text link.
   - The map embed beside them on laptops (about 1/3 text, 2/3 map, about
     380px tall) and below them on phones (about 280px tall).
5. **Our other shop (green).**
   - The other shop's storefront photo beside a text panel on laptops, or
     above it on phones.
   - The panel has the eyebrow "Our other shop", the other shop's name as an
     h2, its street, city and hours on one line, and a text link, "Visit the
     Athens shop" or "Visit the Decatur shop".

## Instagram strip via Behold

- **Source.** Fetch Behold's JSON feed (`https://feeds.behold.so/<FEED_ID>`)
  on the server. The feed ID comes from the `BEHOLD_FEED_ID` environment
  variable. (My call on the name.)
- **Freshness.**
  - Cache the response for several hours. Behold's free plan only refreshes
    once a day.
  - Cache on the server, not per visitor. That keeps Behold's view count low:
    the free plan allows 1,200 views a month and pauses the feed after that.
  - Use the caching approach that Next 16 documents for `cacheComponents`.
- **Display.**
  - Use the first six posts, through `next/image`. Prefer Behold's
    CDN-hosted `sizes` (medium or large) over the original `mediaUrl`, which is
    very large.
  - For video posts, use the post's sized image or `thumbnailUrl`.
  - Each tile links to the post's `permalink` in a new tab.
  - Alt text: the post's `altText` if there is one. Otherwise use the caption
    with the hashtags stripped, trimmed short. Otherwise use "Instagram post
    from Mother Lode".
  - Add the image host to `images.remotePatterns`. Confirm the exact host from
    a real feed response.
- **Fallback.** Show six shop photos in the same tiles, each linking to the
  Instagram profile, whenever:
  - the env var is missing
  - the fetch fails or returns a non-OK response
  - the JSON is malformed
  - the feed returns no usable posts

  The fallback must not throw, log noisily, or delay the rest of the page.
  The strip loads independently, so a slow feed never holds up the hero.
- **Setup for the owner.** Add a short section to the README:
  1. Create a free Behold account.
  2. Connect the @motherlodeatl Instagram account.
  3. Create a JSON feed.
  4. Put its ID in the Vercel environment variable `BEHOLD_FEED_ID`.
  5. Redeploy.

  The README should also note the free plan's limits (six posts, daily
  refresh, 1,200 views a month) and that the site shows shop photos until
  this is done.

## Data module changes

Add these to the shared data module, typed and in one place:

- the story copy and quote
- the "Sell with us" copy and booth phone
- the hero supporting line
- the "What you'll find" tiles, each with a label and a photo
- each shop's offerings photo
- the Athens offerings heading

Shop facts don't change.

## Testing

- Update the existing component tests to match the new structure:
  - the home page has no logo badge and no hours pill
  - the new section headings are present
  - the nav has just the two shop links
  - the top bar has both `tel:` links
- New tests:
  - Behold feed parsing, including a good feed, a video post, and missing alt
    text
  - each fallback case, from the list above
- The no-emoji test must keep passing. It also covers this document.
- The baseline is `npm test`, `npm run lint` and `npm run build`, plus a
  visual check at 390px and about 1280px wide on all three pages.

## Left to the builder

- Exact sizes, spacing and breakpoints within the mockups' direction.
- Exactly how the Instagram fetch is cached and how the strip loads in
  separately, following the Next 16 docs.
- Which six shop photos the Instagram fallback uses.

## Needs the owner's OK before launch

- The "Our story" copy and quote. It came from the 2023 press coverage.
- The "Sell with us" wording, and which phone number vendors should call.
- The Athens offerings heading.

Build these in as written. They get checked before the site is deployed, not
before it's built. (My call.)

## Sources for the new copy

- Red & Black, "New vintage store Mother Lode opens in Athens" (2023).
- Athens Magazine, "Classic Style with Lindsay Short" (November 2023).
