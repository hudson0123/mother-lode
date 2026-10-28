# mother-lode
Website for the business Mother Lode

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Run the tests with:

```bash
npm test
```

Shop facts (addresses, phones, hours, offerings) and photos live in `app/data/shops.ts`; edit them there and every page updates.

## Live Instagram strip (Behold)

The "New in the shops" section on the home page shows the six latest @motherlodeatl posts through [Behold](https://behold.so). Until it is set up, or whenever the feed is unavailable, the section shows shop photos that link to the Instagram profile instead.

To connect it:

1. Create a free account at [behold.so](https://behold.so).
2. Connect the @motherlodeatl Instagram account.
3. Create a feed and choose the JSON feed option.
4. Copy the feed ID (the last part of the feed URL, `https://feeds.behold.so/<FEED_ID>`) into a Vercel environment variable named `BEHOLD_FEED_ID`.
5. Redeploy.

Behold's free plan shows up to six posts, refreshes once a day, and allows 1,200 feed views a month (the feed pauses until the next month if that runs out). The site only asks Behold for posts every few hours, not once per visitor, so it stays well under that.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
