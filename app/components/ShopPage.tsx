import Image from "next/image";

import { directionsUrl, mapEmbedUrl, telHref, type Shop } from "../data/shops";
import HoursPill from "./HoursPill";
import PhotoGrid from "./PhotoGrid";

export default function ShopPage({ shop }: { shop: Shop }) {
  const tel = telHref(shop.phone);

  return (
    <>
      <section className="lg:grid lg:grid-cols-5">
        <div className="relative aspect-[4/3] bg-sage-light lg:col-span-3 lg:aspect-auto lg:min-h-[380px]">
          <Image
            src={shop.storefront.src}
            alt={shop.storefront.alt}
            fill
            priority
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center border-b-2 border-ink bg-sage px-4 py-6 sm:px-6 lg:col-span-2 lg:border-l-2 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.12em]">{shop.city}</p>
          <h1 className="mt-1 font-script text-4xl font-normal leading-tight lg:text-5xl">
            {shop.name}
          </h1>
          <p className="mt-3">
            <span className="block">{shop.street}</span>
            <span className="block">{shop.locality}</span>
          </p>
          <p className="mt-1">
            <a
              href={tel}
              className="font-bold underline decoration-gold decoration-[3px] underline-offset-2"
            >
              {shop.phone}
            </a>
          </p>
          <div className="mt-3">
            <HoursPill />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href={directionsUrl(shop)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-ink px-4 py-2.5 text-sm font-bold text-paper hover:bg-black"
            >
              Get directions
            </a>
            <a
              href={tel}
              className="border-2 border-ink px-4 py-2 text-sm font-bold hover:bg-ink hover:text-paper"
            >
              Call
            </a>
          </div>
        </div>
      </section>

      {/* Phone order is offerings, inside, find us; on laptops offerings and the map share a row. */}
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:gap-x-10 lg:py-10">
        <section className="lg:col-start-1 lg:row-start-1">
          <h2 className="font-serif text-2xl font-bold">{shop.offeringsHeading}</h2>
          {shop.intro && <p className="mt-2">{shop.intro}</p>}
          <ul className="mt-4 flex flex-wrap gap-2">
            {shop.offerings.map((offering) => (
              <li
                key={offering}
                className="rounded-full border border-ink bg-sage-light px-3 py-1 text-sm"
              >
                {offering}
              </li>
            ))}
          </ul>
        </section>

        <section className="lg:col-span-2 lg:row-start-2">
          <h2 className="mb-4 font-serif text-2xl font-bold">Inside</h2>
          <div className="-mx-4 sm:-mx-6 md:mx-0">
            <PhotoGrid photos={shop.insidePhotos} />
          </div>
        </section>

        <section className="lg:col-start-2 lg:row-start-1">
          <h2 className="mb-4 font-serif text-2xl font-bold">Find us</h2>
          <iframe
            title={`Map of ${shop.name}`}
            src={mapEmbedUrl(shop)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[260px] w-full border-0 bg-sage-light lg:h-[300px]"
          />
        </section>
      </div>
    </>
  );
}
