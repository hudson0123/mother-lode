import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("./components/InstagramStrip", async () => {
  const { default: InstagramTiles } = await import("./components/InstagramTiles");
  return { default: () => <InstagramTiles posts={[]} /> };
});

import { brand, directionsUrl, sell, shopList, story } from "./data/shops";
import Home from "./page";

describe("Home page", () => {
  it("opens with the headline, hero line and a button for each shop", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Vintage & makers market" }),
    ).toBeInTheDocument();
    expect(screen.getByText(brand.heroLine)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Visit Decatur" })).toHaveAttribute("href", "/decatur");
    expect(screen.getByRole("link", { name: "Visit Athens" })).toHaveAttribute("href", "/athens");
  });

  it("runs the sections in the approved order", () => {
    render(<Home />);
    expect(screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent)).toEqual([
      "Something new every visit",
      "Two shops, open every day",
      story.heading,
      "New in the shops",
      sell.heading,
    ]);
  });

  it("gives the nav targets their ids", () => {
    const { container } = render(<Home />);
    for (const id of ["visit", "story", "sell"]) {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    }
  });

  it("drops the logo badge and hours pill from the hero", () => {
    render(<Home />);
    expect(screen.getAllByRole("img", { name: brand.logo.alt })).toHaveLength(1);
    expect(screen.queryByText("Open daily · 11am–7pm")).toBeNull();
  });

  it("shows each shop's details with directions and a page link", () => {
    render(<Home />);
    for (const shop of shopList) {
      const card = within(screen.getByRole("article", { name: shop.name }));
      expect(card.getByRole("link", { name: shop.phone })).toBeInTheDocument();
      expect(card.getByText(brand.hours)).toBeInTheDocument();
      expect(card.getByRole("link", { name: "Get directions" })).toHaveAttribute(
        "href",
        directionsUrl(shop),
      );
      expect(card.getByRole("link", { name: "About this shop" })).toHaveAttribute(
        "href",
        `/${shop.slug}`,
      );
    }
  });

  it("tells the story with the owner's quote", () => {
    render(<Home />);
    expect(screen.getByText(story.body)).toBeInTheDocument();
    expect(screen.getByText(story.quoteBy)).toBeInTheDocument();
  });

  it("lets vendors call about a booth", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: "Call 678-927-9635" })).toHaveAttribute(
      "href",
      "tel:+16789279635",
    );
  });

  it("links the Instagram section to the profile", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: "Follow on Instagram" })).toHaveAttribute(
      "href",
      brand.instagram,
    );
  });
});
