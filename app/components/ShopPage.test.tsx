import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { directionsUrl, mapEmbedUrl, shops } from "../data/shops";
import ShopPage from "./ShopPage";

describe("ShopPage for Decatur", () => {
  const shop = shops.decatur;

  it("opens with the storefront and the visit details", () => {
    render(<ShopPage shop={shop} />);
    expect(screen.getByRole("img", { name: shop.storefront.alt })).toBeInTheDocument();
    expect(screen.getByText("Decatur")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "Mother Lode Atlanta" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/3429 Covington Hwy Ste B/)).toBeInTheDocument();
    expect(screen.getByText("Open daily · 11am–7pm")).toBeInTheDocument();
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

  it("crops the storefront from the center by default", () => {
    render(<ShopPage shop={shop} />);
    const img = screen.getByRole("img", { name: shop.storefront.alt });
    expect(img).toHaveClass("object-center");
    expect(img).not.toHaveClass("object-top");
  });

  it("embeds a titled map of the address", () => {
    render(<ShopPage shop={shop} />);
    expect(screen.getByTitle("Map of Mother Lode Atlanta")).toHaveAttribute(
      "src",
      mapEmbedUrl(shop),
    );
  });

  it("orders the sections offerings, inside, find us", () => {
    render(<ShopPage shop={shop} />);
    expect(
      screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent),
    ).toEqual(["30 to 50 local vendors & makers", "Inside", "Find us"]);
  });
});

describe("ShopPage for Athens", () => {
  const shop = shops.athens;

  it("uses the generic heading and no intro line", () => {
    render(<ShopPage shop={shop} />);
    expect(screen.getByRole("heading", { name: "What you'll find" })).toBeInTheDocument();
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
});
