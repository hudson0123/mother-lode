"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { brand, shopList } from "../data/shops";

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-ink/12 bg-paper">
      <nav className="mx-auto flex max-w-6xl items-center gap-5 px-5 py-3.5 md:gap-6 md:px-12 md:py-4">
        <Link href="/" className="mr-auto font-script text-[28px] leading-none md:text-[34px]">
          {brand.name}
        </Link>
        <ul aria-label="Site" className="flex gap-5 md:gap-6">
          {shopList.map((shop) => {
            const href = `/${shop.slug}`;
            const current = pathname === href;
            return (
              <li key={shop.slug}>
                <Link
                  href={href}
                  aria-current={current ? "page" : undefined}
                  className={`block border-b-2 py-1 text-[13.5px] font-medium ${
                    current ? "border-gold" : "border-transparent hover:border-ink/30"
                  }`}
                >
                  {shop.city}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
