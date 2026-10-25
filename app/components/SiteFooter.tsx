import Link from "next/link";

import { brand, shopList } from "../data/shops";
import HoursPill from "./HoursPill";
import { FacebookIcon, InstagramIcon } from "./icons";

const socials = [
  { href: brand.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: brand.facebook, label: "Facebook", Icon: FacebookIcon },
];

export default function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm sm:px-6 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="font-script text-3xl leading-none">
          {brand.name}
        </Link>
        <ul className="space-y-1">
          {shopList.map((shop) => (
            <li key={shop.slug}>
              <Link href={`/${shop.slug}`} className="hover:underline">
                {shop.city} · {shop.street}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <HoursPill />
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
    </footer>
  );
}
