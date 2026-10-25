import { describe, expect, it } from "vitest";
import {
  brand,
  directionsUrl,
  fullAddress,
  homeHero,
  homeInsidePhotos,
  interiors,
  mapEmbedUrl,
  shopList,
  shopMetadata,
  shops,
  telHref,
} from "./shops";

describe("brand", () => {
  it("carries the shared copy, hours and social links", () => {
    expect(brand.name).toBe("Mother Lode");
    expect(brand.tagline).toBe("Vintage & makers market");
    expect(brand.supporting).toBe("Goods and gifts for you and your home.");
    expect(brand.hours).toBe("Open daily · 11am–7pm");
    expect(brand.instagram).toBe("https://www.instagram.com/motherlodeatl/");
    expect(brand.facebook).toBe("https://www.facebook.com/motherlodeatl/");
  });
});

describe("shops", () => {
  it("describes the Decatur shop", () => {
    expect(shops.decatur).toMatchObject({
      slug: "decatur",
      city: "Decatur",
      name: "Mother Lode Atlanta",
      street: "3429 Covington Hwy Ste B",
      locality: "Decatur, GA 30032",
      phone: "678-927-9635",
      offeringsHeading: "30 to 50 local vendors & makers",
      intro: "An indoor market of local vendors and makers.",
    });
    expect(shops.decatur.offerings).toEqual([
      "Mid-century modern furniture",
      "Lighting",
      "Antiques",
      "Vintage clothing: 90s, Y2K and true vintage",
      "Vinyl records",
      "Comics",
      "Handmade jewelry",
      "Low-maintenance indoor plants",
    ]);
  });

  it("describes the Athens shop with no intro line", () => {
    expect(shops.athens).toMatchObject({
      slug: "athens",
      city: "Athens",
      name: "Mother Lode Athens",
      street: "1005 Baxter St",
      locality: "Athens, GA 30606",
      phone: "762-772-5554",
      offeringsHeading: "What you'll find",
    });
    expect(shops.athens.intro).toBeUndefined();
    expect(shops.athens.offerings).toEqual([
      "Retro and vintage clothing",
      "Unique home goods",
      "Georgia Bulldogs gear",
      "Handcrafted jewelry",
      "Plants",
    ]);
  });

  it("lists Decatur before Athens", () => {
    expect(shopList.map((s) => s.slug)).toEqual(["decatur", "athens"]);
  });
});

describe("link helpers", () => {
  it("joins street and locality into one address", () => {
    expect(fullAddress(shops.decatur)).toBe(
      "3429 Covington Hwy Ste B, Decatur, GA 30032",
    );
  });

  it("builds E.164 tel: links from the display phone", () => {
    expect(telHref("678-927-9635")).toBe("tel:+16789279635");
    expect(telHref("762-772-5554")).toBe("tel:+17627725554");
  });

  it("does not double the country code on 11-digit numbers", () => {
    expect(telHref("1-678-927-9635")).toBe("tel:+16789279635");
    expect(telHref("+1 678 927 9635")).toBe("tel:+16789279635");
  });

  it("URL-encodes the suite number and commas in directions links", () => {
    expect(directionsUrl(shops.decatur)).toBe(
      "https://www.google.com/maps/dir/?api=1&destination=3429%20Covington%20Hwy%20Ste%20B%2C%20Decatur%2C%20GA%2030032",
    );
  });

  it("builds a keyless map embed URL", () => {
    expect(mapEmbedUrl(shops.athens)).toBe(
      "https://maps.google.com/maps?q=1005%20Baxter%20St%2C%20Athens%2C%20GA%2030606&output=embed",
    );
  });
});

describe("photos", () => {
  it("gives every photo real alt text", () => {
    const all = [
      brand.logo,
      homeHero,
      ...homeInsidePhotos,
      ...shopList.flatMap((s) => [s.storefront, ...s.insidePhotos]),
    ];
    for (const photo of all) {
      expect(photo.alt.trim().length).toBeGreaterThan(0);
    }
  });

  it("uses the wide interior as the home hero and the approved home grid", () => {
    expect(homeHero).toBe(interiors.one);
    expect(homeInsidePhotos).toEqual([
      interiors.five,
      interiors.four,
      interiors.six,
      interiors.two,
    ]);
  });

  it("keeps the power-strip photo off every page", () => {
    const placed = [
      homeHero,
      ...homeInsidePhotos,
      ...shopList.flatMap((s) => s.insidePhotos),
    ];
    expect(placed).not.toContain(interiors.three);
  });
});

describe("shopMetadata", () => {
  it("builds the title and description from the shop facts", () => {
    for (const shop of shopList) {
      const meta = shopMetadata(shop);
      expect(meta.title).toBe(shop.city);
      expect(meta.description).toContain(fullAddress(shop));
      expect(meta.description).toContain(brand.hours);
    }
  });
});
