"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { brand } from "../data/shops";

const links = [
  { href: "/", label: "Home" },
  { href: "/decatur", label: "Decatur" },
  { href: "/athens", label: "Athens" },
];

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="border-b-2 border-ink bg-sage">
      <nav className="mx-auto flex max-w-6xl items-center gap-3 px-3 py-2 sm:gap-6 sm:px-6">
        <Link href="/" className="mr-auto font-script text-[22px] leading-none text-black sm:text-3xl">
          {brand.name}
        </Link>
        {links.map(({ href, label }) => {
          const current = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              aria-current={current ? "page" : undefined}
              className={`border-b-2 py-1 text-[13px] font-semibold sm:text-sm ${
                current ? "border-ink" : "border-transparent hover:border-ink/40"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
