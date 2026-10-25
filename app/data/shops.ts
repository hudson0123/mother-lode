import type { StaticImageData } from "next/image";

import logo from "@/public/motherlodelogo.png";
import athensStorefront from "@/public/motherlodeathensstorefront.webp";
import decaturStorefront from "@/public/motherlodeatlstorefront.jpeg";
import interior1 from "@/public/motherlodeinterior1.webp";
import interior2 from "@/public/motherlodeinterior2.jpeg";
import interior3 from "@/public/motherlodeinterior3.jpg";
import interior4 from "@/public/motherlodeinterior4.jpeg";
import interior5 from "@/public/motherlodeinterior5.webp";
import interior6 from "@/public/motherlodeinterior6.webp";

export type ShopSlug = "decatur" | "athens";

export type Photo = { src: StaticImageData; alt: string };

export type Shop = {
  slug: ShopSlug;
  city: string;
  name: string;
  street: string;
  locality: string;
  /** Display form, e.g. "678-927-9635". */
  phone: string;
  offeringsHeading: string;
  intro?: string;
  offerings: string[];
  storefront: Photo;
  insidePhotos: Photo[];
};

export const brand = {
  name: "Mother Lode",
  tagline: "Vintage & makers market",
  supporting: "Goods and gifts for you and your home.",
  hours: "Open daily · 11am–7pm",
  instagram: "https://www.instagram.com/motherlodeatl/",
  facebook: "https://www.facebook.com/motherlodeatl/",
  logo: {
    src: logo,
    alt: "Mother Lode logo: a hand holding a gold nugget",
  },
} as const satisfies Record<string, string | Photo>;

// Interior photos are shared by both shops.
export const interiors = {
  one: {
    src: interior1,
    alt: "Racks of vintage tees and Georgia gear beside shelves of home goods",
  },
  two: {
    src: interior2,
    alt: "A mid-century wood hutch, leather chair and framed art",
  },
  // A power strip sits across the table in this one, so it is not placed on any page.
  three: {
    src: interior3,
    alt: "Large abstract paintings behind a carved wooden chair",
  },
  four: {
    src: interior4,
    alt: "A shopper browsing racks of colorful vintage dresses",
  },
  five: {
    src: interior5,
    alt: "A red velvet armchair among brass lamps and framed prints",
  },
  six: {
    src: interior6,
    alt: "A corner of vintage toys, games and comics",
  },
} satisfies Record<string, Photo>;

export const homeHero: Photo = interiors.one;

export const homeInsidePhotos: Photo[] = [
  interiors.five,
  interiors.four,
  interiors.six,
  interiors.two,
];

export const shops: Record<ShopSlug, Shop> = {
  decatur: {
    slug: "decatur",
    city: "Decatur",
    name: "Mother Lode Atlanta",
    street: "3429 Covington Hwy Ste B",
    locality: "Decatur, GA 30032",
    phone: "678-927-9635",
    offeringsHeading: "30 to 50 local vendors & makers",
    intro: "An indoor market of local vendors and makers.",
    offerings: [
      "Mid-century modern furniture",
      "Lighting",
      "Antiques",
      "Vintage clothing: 90s, Y2K and true vintage",
      "Vinyl records",
      "Comics",
      "Handmade jewelry",
      "Low-maintenance indoor plants",
    ],
    storefront: {
      src: decaturStorefront,
      alt: "The Mother Lode Decatur storefront with its Vintage and Handmade sign",
    },
    insidePhotos: [interiors.five, interiors.six, interiors.two, interiors.four],
  },
  athens: {
    slug: "athens",
    city: "Athens",
    name: "Mother Lode Athens",
    street: "1005 Baxter St",
    locality: "Athens, GA 30606",
    phone: "762-772-5554",
    offeringsHeading: "What you'll find",
    offerings: [
      "Retro and vintage clothing",
      "Unique home goods",
      "Georgia Bulldogs gear",
      "Handcrafted jewelry",
      "Plants",
    ],
    storefront: {
      src: athensStorefront,
      alt: "The Mother Lode Athens sign on Baxter Street",
    },
    insidePhotos: [interiors.one, interiors.six, interiors.four, interiors.five],
  },
};

export const shopList: Shop[] = [shops.decatur, shops.athens];

export function fullAddress(shop: Shop): string {
  return `${shop.street}, ${shop.locality}`;
}

export function telHref(phone: string): string {
  return `tel:+1${phone.replace(/\D/g, "")}`;
}

export function directionsUrl(shop: Shop): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress(shop))}`;
}

export function mapEmbedUrl(shop: Shop): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(fullAddress(shop))}&output=embed`;
}
