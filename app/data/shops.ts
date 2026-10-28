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

export type Photo = {
  src: StaticImageData;
  alt: string;
  /**
   * Which part to keep when a frame crops the photo; defaults to the center.
   * "upper" keeps a sign in the top quarter in frame. Only storefront frames honor this.
   */
  position?: "top" | "upper";
};

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
  /** Sits beside the offerings list. */
  offeringsPhoto: Photo;
  /** Three or four photos for the Inside grid. */
  insidePhotos: Photo[];
};

export const brand = {
  name: "Mother Lode",
  tagline: "Vintage & makers market",
  supporting: "Goods and gifts for you and your home.",
  heroLine:
    "Goods and gifts for you and your home, from dozens of local vendors. Two shops in Decatur and Athens, open every day.",
  hours: "Open daily, 11am–7pm",
  instagram: "https://www.instagram.com/motherlodeatl/",
  instagramHandle: "@motherlodeatl",
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

export const findTiles: { label: string; photo: Photo }[] = [
  { label: "Vintage clothing", photo: interiors.four },
  { label: "Mid-century furniture", photo: interiors.two },
  { label: "Lighting & decor", photo: interiors.five },
  { label: "Toys, comics & records", photo: interiors.six },
];

// From 2023 press coverage (Red & Black, Athens Magazine); the owner checks it before launch.
export const story = {
  heading: "From estate sales to two shops full of local makers",
  body: "Lindsay Short grew up tagging along to estate sales with her antique-dealer parents. After years running Bennett and Sudderth, an estate sale company named for her grandmothers, she opened Mother Lode in Decatur in 2021 and in Athens in 2023.",
  quote:
    "I love being able to support more than 40 small businesses and give them a space where they don't have to take on a lot of overhead.",
  quoteBy: "Lindsay Short, owner",
};

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
      position: "upper",
    },
    offeringsPhoto: interiors.five,
    // interiors.one shows the Orphintage sign, which is in the Athens shop.
    insidePhotos: [interiors.four, interiors.six, interiors.two],
  },
  athens: {
    slug: "athens",
    city: "Athens",
    name: "Mother Lode Athens",
    street: "1005 Baxter St",
    locality: "Athens, GA 30606",
    phone: "762-772-5554",
    offeringsHeading: "Retro, vintage and handmade",
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
      position: "top",
    },
    offeringsPhoto: interiors.one,
    insidePhotos: [interiors.five, interiors.six, interiors.four, interiors.two],
  },
};

export const shopList: Shop[] = [shops.decatur, shops.athens];

export function otherShop(shop: Shop): Shop {
  return shop.slug === "decatur" ? shops.athens : shops.decatur;
}

export const sell = {
  heading: "Have a booth at Mother Lode",
  body: "Interested in selling at Mother Lode? Give us a call to ask about booth space in either shop.",
  phone: shops.decatur.phone,
};

// Shown in the Instagram strip until the Behold feed is connected, or when it is down.
export const instagramFallbackPhotos: Photo[] = [
  interiors.five,
  interiors.six,
  interiors.four,
  interiors.two,
  interiors.one,
  shops.athens.storefront,
];

export function fullAddress(shop: Shop): string {
  return `${shop.street}, ${shop.locality}`;
}

export function telHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `tel:+${digits.length === 11 && digits.startsWith("1") ? digits : `1${digits}`}`;
}

export function directionsUrl(shop: Shop): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress(shop))}`;
}

export function mapEmbedUrl(shop: Shop): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(fullAddress(shop))}&output=embed`;
}

export function shopMetadata(shop: Shop) {
  return {
    title: shop.city,
    description: `${shop.name}: ${fullAddress(shop)}. ${brand.hours}.`,
  };
}
