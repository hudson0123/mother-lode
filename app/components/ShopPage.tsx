import Image from "next/image";
import Link from "next/link";

import {
  brand,
  directionsUrl,
  mapEmbedUrl,
  otherShop,
  telHref,
  type Shop,
} from "../data/shops";
import PhotoGrid from "./PhotoGrid";
import SectionHeading, { Eyebrow } from "./SectionHeading";
import { storefrontPosition } from "./storefront";
import { button, sectionBg, sectionPad, textLink, wrap } from "./ui";

function Details({ shop, phone = true }: { shop: Shop; phone?: boolean }) {
  return (
    <dl className="grid grid-cols-[72px_1fr] gap-y-2 text-[14.5px]">
      <dt className="text-ink/60">Address</dt>
      <dd>
        {shop.street}
        <br />
        {shop.locality}
      </dd>
      {phone && (
        <>
          <dt className="text-ink/60">Phone</dt>
          <dd>
            <a href={telHref(shop.phone)} className="border-b border-ink/40 hover:border-ink">
              {shop.phone}
            </a>
          </dd>
        </>
      )}
      <dt className="text-ink/60">Hours</dt>
      <dd>{brand.hours}</dd>
    </dl>
  );
}

export default function ShopPage({ shop }: { shop: Shop }) {
  const other = otherShop(shop);

  return (
    <>
      <section className={`${sectionBg.green} md:grid md:min-h-[520px] md:grid-cols-5`}>
        <div className="relative aspect-[4/3] bg-sage-light md:col-span-3 md:aspect-auto">
          <Image
            src={shop.storefront.src}
            alt={shop.storefront.alt}
            fill
            preload
            sizes="(min-width: 768px) 60vw, 100vw"
            className={`object-cover ${storefrontPosition(shop.storefront)}`}
          />
        </div>
        <div className="flex flex-col justify-center px-5 pb-9 pt-8 md:col-span-2 md:px-12 md:py-14">
          <Eyebrow tone="green">{shop.city}</Eyebrow>
          <h1 className="mb-5 mt-1.5 font-serif text-[38px] font-medium leading-[1.05] tracking-[-0.01em] md:text-[52px]">
            {shop.name}
          </h1>
          <Details shop={shop} />
          <div className="mt-6 flex flex-wrap gap-2.5">
            <a
              href={directionsUrl(shop)}
              target="_blank"
              rel="noopener noreferrer"
              className={button.ink}
            >
              Get directions
            </a>
            <a href={telHref(shop.phone)} className={button.line}>
              Call
            </a>
          </div>
        </div>
      </section>

      <section className={`${sectionBg.white} ${sectionPad}`}>
        <div className={`${wrap} grid gap-7 md:grid-cols-[1.3fr_1fr] md:items-center md:gap-16`}>
          <div>
            <SectionHeading eyebrow="What you'll find" title={shop.offeringsHeading} />
            {shop.intro && <p className="mt-2.5 max-w-[34em]">{shop.intro}</p>}
            <ul className="mt-6 border-t border-ink/12 md:columns-2 md:gap-8">
              {shop.offerings.map((offering) => (
                <li key={offering} className="break-inside-avoid border-b border-ink/12 py-3">
                  {offering}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative -mx-5 aspect-[4/5] bg-sage-light md:mx-0">
            <Image
              src={shop.offeringsPhoto.src}
              alt={shop.offeringsPhoto.alt}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className={`${sectionBg.green} ${sectionPad}`}>
        <div className={wrap}>
          <SectionHeading tone="green" eyebrow="Inside" title="A look around" />
          <div className="mt-6 md:mt-7">
            <PhotoGrid photos={shop.insidePhotos} />
          </div>
        </div>
      </section>

      <section className={`${sectionBg.white} ${sectionPad}`}>
        <div className={`${wrap} grid gap-6 md:grid-cols-[1fr_2fr] md:items-center md:gap-12`}>
          <div>
            <SectionHeading eyebrow="Find us" title="Getting here" />
            <div className="mt-4">
              <Details shop={shop} phone={false} />
            </div>
            <p className="mt-5">
              <a
                href={directionsUrl(shop)}
                target="_blank"
                rel="noopener noreferrer"
                className={textLink.white}
              >
                Open in Google Maps
              </a>
            </p>
          </div>
          <iframe
            title={`Map of ${shop.name}`}
            src={mapEmbedUrl(shop)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[280px] w-full border-0 bg-sage-light md:h-[380px]"
          />
        </div>
      </section>

      <section className={`${sectionBg.green} md:grid md:grid-cols-2`}>
        <div className="relative aspect-[16/10] bg-sage-light md:aspect-auto md:min-h-[340px]">
          <Image
            src={other.storefront.src}
            alt={other.storefront.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className={`object-cover ${storefrontPosition(other.storefront)}`}
          />
        </div>
        <div className="flex flex-col justify-center px-5 pb-9 pt-7 md:px-12 md:py-14">
          <Eyebrow tone="green">Our other shop</Eyebrow>
          <h2 className="mb-2 mt-1.5 font-serif text-[28px] font-medium tracking-[-0.01em] md:text-[38px]">
            {other.name}
          </h2>
          <p>
            {other.street}, {other.city}. {brand.hours}.
          </p>
          <p className="mt-4">
            <Link href={`/${other.slug}`} className={textLink.green}>
              Visit the {other.city} shop
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
