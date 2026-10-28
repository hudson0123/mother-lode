import Link from "next/link";

import { brand, shopList, telHref } from "../data/shops";
import { FacebookIcon, InstagramIcon } from "./icons";

const socials = [
  { href: brand.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: brand.facebook, label: "Facebook", Icon: FacebookIcon },
];

const heading = "mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-sage";

export default function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-5 pb-7 pt-10 text-[13.5px] md:px-12 md:pt-14">
        <div className="grid gap-7 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="font-script text-[34px] leading-none">
              {brand.name}
            </Link>
            <p className="mt-2 opacity-75">{brand.tagline}</p>
          </div>
          {shopList.map((shop) => (
            <div key={shop.slug}>
              <h2 className={heading}>{shop.city}</h2>
              <Link href={`/${shop.slug}`} className="block hover:underline">
                {shop.street}
                <br />
                {shop.locality}
              </Link>
              <a href={telHref(shop.phone)} className="hover:underline">
                {shop.phone}
              </a>
            </div>
          ))}
          <div>
            <h2 className={heading}>Hours</h2>
            <p>{brand.hours}</p>
            <div className="mt-3 flex gap-4">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold"
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* Spelled out: the no-emoji check treats the copyright sign as a pictograph. */}
        <p className="mt-8 text-[11.5px] opacity-55">Copyright {brand.name}</p>
      </div>
    </footer>
  );
}
