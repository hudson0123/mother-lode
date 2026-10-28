import Image from "next/image";
import Link from "next/link";

import { brand, directionsUrl, telHref, type Shop } from "../data/shops";
import { Eyebrow } from "./SectionHeading";
import { storefrontPosition } from "./storefront";
import { textLink } from "./ui";

export default function ShopCard({ shop }: { shop: Shop }) {
  const headingId = `shop-card-${shop.slug}`;

  return (
    <article aria-labelledby={headingId}>
      <div className="relative -mx-5 aspect-[4/3] bg-sage-light md:mx-0">
        <Image
          src={shop.storefront.src}
          alt={shop.storefront.alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className={`object-cover ${storefrontPosition(shop.storefront)}`}
        />
      </div>
      <div className="pt-4">
        <Eyebrow>{shop.city}</Eyebrow>
        <h3 id={headingId} className="mb-2 mt-1 font-serif text-[26px] font-medium">
          {shop.name}
        </h3>
        <dl className="grid grid-cols-[70px_1fr] gap-y-1 text-sm">
          <dt className="text-ink/55">Address</dt>
          <dd>{shop.street}, {shop.locality}</dd>
          <dt className="text-ink/55">Phone</dt>
          <dd>
            <a href={telHref(shop.phone)} className="hover:underline">
              {shop.phone}
            </a>
          </dd>
          <dt className="text-ink/55">Hours</dt>
          <dd>{brand.hours}</dd>
        </dl>
        <div className="mt-4 flex gap-6">
          <a
            href={directionsUrl(shop)}
            target="_blank"
            rel="noopener noreferrer"
            className={textLink.white}
          >
            Get directions
          </a>
          <Link href={`/${shop.slug}`} className={textLink.white}>
            About this shop
          </Link>
        </div>
      </div>
    </article>
  );
}
