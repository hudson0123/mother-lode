import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import InstagramStrip from "./components/InstagramStrip";
import InstagramTiles from "./components/InstagramTiles";
import SectionHeading from "./components/SectionHeading";
import ShopCard from "./components/ShopCard";
import { button, sectionBg, sectionPad, textLink, wrap } from "./components/ui";
import { brand, findTiles, homeHero, sell, shopList, story, telHref } from "./data/shops";

export default function Home() {
  return (
    <>
      <section className="relative h-[520px] bg-ink text-paper md:h-[620px]">
        <Image
          src={homeHero.src}
          alt={homeHero.alt}
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent from-30% to-black/60" />
        <div className={`${wrap} absolute inset-x-0 bottom-0 pb-7 md:pb-14`}>
          <h1 className="max-w-[9em] font-serif text-[42px] font-medium leading-[1.02] tracking-[-0.01em] md:text-[72px]">
            {brand.tagline}
          </h1>
          <p className="mb-5 mt-3 max-w-[30em] text-[15px] opacity-90 md:text-[17px]">
            {brand.heroLine}
          </p>
          <div className="flex flex-wrap gap-2.5">
            {shopList.map((shop, i) => (
              <Link
                key={shop.slug}
                href={`/${shop.slug}`}
                className={i === 0 ? button.paper : button.ghost}
              >
                Visit {shop.city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={`${sectionBg.green} ${sectionPad}`}>
        <div className={wrap}>
          <SectionHeading tone="green" eyebrow="What you'll find" title="Something new every visit" />
          <ul className="mt-6 grid grid-cols-2 gap-1 md:grid-cols-4 md:gap-3">
            {findTiles.map(({ label, photo }) => (
              <li key={label}>
                <div className="relative aspect-[4/5] bg-sage-light">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <p className="pt-2.5 text-sm font-medium">{label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="visit" className={`${sectionBg.white} ${sectionPad}`}>
        <div className={wrap}>
          <SectionHeading eyebrow="Visit" title="Two shops, open every day" />
          <div className="mt-6 grid gap-9 md:grid-cols-2 md:gap-8">
            {shopList.map((shop) => (
              <ShopCard key={shop.slug} shop={shop} />
            ))}
          </div>
        </div>
      </section>

      <section id="story" className={`${sectionBg.green} ${sectionPad}`}>
        <div className={`${wrap} grid gap-7 md:grid-cols-[260px_1fr] md:items-center md:gap-16`}>
          {/* The sage token matches the logo's background, so it needs no frame. */}
          <Image
            src={brand.logo.src}
            alt={brand.logo.alt}
            sizes="(min-width: 768px) 260px, 150px"
            className="h-auto w-[150px] md:w-[260px]"
          />
          <div>
            <SectionHeading tone="green" eyebrow="Our story" title={story.heading} />
            <p className="mt-4 max-w-[36em]">{story.body}</p>
            <blockquote className="mt-6 max-w-[30em] border-l-[3px] border-gold pl-4">
              <p className="font-serif text-[19px] italic leading-[1.4]">
                &ldquo;{story.quote}&rdquo;
              </p>
              <footer className="mt-2 text-[12.5px] font-medium">{story.quoteBy}</footer>
            </blockquote>
          </div>
        </div>
      </section>

      <section className={`${sectionBg.white} pt-13 md:pt-21`}>
        <div className={`${wrap} mb-6 flex items-end justify-between gap-4`}>
          <SectionHeading eyebrow={brand.instagramHandle} title="New in the shops" />
          <a
            href={brand.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={textLink.white}
          >
            Follow on Instagram
          </a>
        </div>
        <Suspense fallback={<InstagramTiles posts={[]} />}>
          <InstagramStrip />
        </Suspense>
      </section>

      <section id="sell" className={`${sectionBg.green} ${sectionPad}`}>
        <div className={`${wrap} grid gap-5 md:grid-cols-[1.2fr_1fr_auto] md:items-center md:gap-12`}>
          <SectionHeading tone="green" eyebrow="Sell with us" title={sell.heading} />
          <p className="max-w-[34em]">{sell.body}</p>
          <div>
            <a href={telHref(sell.phone)} className={button.ink}>
              Call {sell.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
