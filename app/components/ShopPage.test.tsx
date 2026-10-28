import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { brand, directionsUrl, mapEmbedUrl, shops } from "../data/shops";
import ShopPage from "./ShopPage";

describe("ShopPage for Decatur", () => {
  const shop = shops.decatur;

  it("opens with the storefront and the visit details", () => {
    render(<ShopPage shop={shop} />);
    expect(screen.getByRole("img", { name: shop.storefront.alt })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "Mother Lode Atlanta" }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/3429 Covington Hwy Ste B/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(brand.hours).length).toBeGreaterThan(0);
  });

  it("calls and gets directions with working links", () => {
    render(<ShopPage shop={shop} />);
    expect(screen.getByRole("link", { name: "678-927-9635" })).toHaveAttribute(
      "href",
      "tel:+16789279635",
    );
    expect(screen.getByRole("link", { name: "Call" })).toHaveAttribute(
      "href",
      "tel:+16789279635",
    );
    expect(screen.getByRole("link", { name: "Get directions" })).toHaveAttribute(
      "href",
      directionsUrl(shop),
    );
    expect(screen.getByRole("link", { name: "Open in Google Maps" })).toHaveAttribute(
      "href",
      directionsUrl(shop),
    );
  });

  it("lists the vendor line, intro and every offering", () => {
    render(<ShopPage shop={shop} />);
    expect(
      screen.getByRole("heading", { name: "30 to 50 local vendors & makers" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("An indoor market of local vendors and makers."),
    ).toBeInTheDocument();
    for (const offering of shop.offerings) {
      expect(screen.getByText(offering)).toBeInTheDocument();
    }
  });

  it("keeps the painted logo in frame by cropping toward the upper part", () => {
    render(<ShopPage shop={shop} />);
    const img = screen.getByRole("img", { name: shop.storefront.alt });
    expect(img).toHaveClass("object-[center_15%]");
    expect(img).not.toHaveClass("object-center");
  });

  it("crops the storefront from the center when no position is set", () => {
    const plain = { ...shop, storefront: { ...shop.storefront, position: undefined } };
    render(<ShopPage shop={plain} />);
    const img = screen.getByRole("img", { name: shop.storefront.alt });
    expect(img).toHaveClass("object-center");
  });

  it("embeds a titled map of the address", () => {
    render(<ShopPage shop={shop} />);
    expect(screen.getByTitle("Map of Mother Lode Atlanta")).toHaveAttribute(
      "src",
      mapEmbedUrl(shop),
    );
  });

  it("orders the sections offerings, inside, find us, other shop", () => {
    render(<ShopPage shop={shop} />);
    expect(
      screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent),
    ).toEqual(["30 to 50 local vendors & makers", "A look around", "Getting here", "Mother Lode Athens"]);
  });

  it("points to the Athens shop", () => {
    render(<ShopPage shop={shop} />);
    expect(screen.getByRole("link", { name: "Visit the Athens shop" })).toHaveAttribute(
      "href",
      "/athens",
    );
  });
});

describe("ShopPage for Athens", () => {
  const shop = shops.athens;

  it("uses its own heading and no intro line", () => {
    render(<ShopPage shop={shop} />);
    expect(
      screen.getByRole("heading", { name: "Retro, vintage and handmade" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("An indoor market of local vendors and makers."),
    ).toBeNull();
  });

  it("crops the storefront from the top so the sign stays in frame", () => {
    render(<ShopPage shop={shop} />);
    expect(screen.getByRole("img", { name: shop.storefront.alt })).toHaveClass("object-top");
  });

  it("calls the Athens number", () => {
    render(<ShopPage shop={shop} />);
    expect(screen.getByRole("link", { name: "Call" })).toHaveAttribute(
      "href",
      "tel:+17627725554",
    );
  });

  it("points back to the Decatur shop", () => {
    render(<ShopPage shop={shop} />);
    expect(screen.getByRole("link", { name: "Visit the Decatur shop" })).toHaveAttribute(
      "href",
      "/decatur",
    );
  });
});
