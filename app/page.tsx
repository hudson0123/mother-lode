import Image from "next/image";
import Link from "next/link";

import HoursPill from "./components/HoursPill";
import PhotoGrid from "./components/PhotoGrid";
import { brand, homeHero, homeInsidePhotos, shopList } from "./data/shops";

export default function Home() {
  return (
    <>
      <section className="relative h-[300px] bg-sage-light lg:h-[420px]">
        <Image
          src={homeHero.src}
          alt={homeHero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="flex h-[170px] w-[170px] items-center justify-center rounded-full border-2 border-ink bg-sage lg:h-[220px] lg:w-[220px]">
            <Image
              src={brand.logo.src}
              alt={brand.logo.alt}
              sizes="(min-width: 1024px) 146px, 112px"
              className="h-auto w-[66%]"
            />
          </div>
          <HoursPill />
        </div>
      </section>

      <section className="px-4 py-8 text-center">
        <h1 className="font-serif text-3xl font-bold lg:text-4xl">{brand.tagline}</h1>
        <p className="mt-2 text-base lg:text-lg">{brand.supporting}</p>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-4 font-serif text-2xl font-bold">Visit us</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {shopList.map((shop) => (
            <Link key={shop.slug} href={`/${shop.slug}`} className="group block">
              <div className="relative -mx-4 aspect-[4/3] bg-sage-light sm:-mx-6 md:mx-0">
                <Image
                  src={shop.storefront.src}
                  alt={shop.storefront.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 font-serif text-xl font-bold group-hover:underline group-hover:decoration-gold group-hover:decoration-[3px]">
                {shop.city}
              </p>
              <p className="text-sm">{shop.street}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10 pt-10 sm:px-6">
        <h2 className="mb-4 font-serif text-2xl font-bold">Inside the shops</h2>
        <div className="-mx-4 sm:-mx-6 md:mx-0">
          <PhotoGrid photos={homeInsidePhotos} />
        </div>
      </section>
    </>
  );
}
