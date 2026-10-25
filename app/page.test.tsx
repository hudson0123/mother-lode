import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { brand, homeHero } from "./data/shops";
import Home from "./page";

describe("Home page", () => {
  it("opens with the hero photo, logo badge and hours", () => {
    render(<Home />);
    expect(screen.getByRole("img", { name: homeHero.alt })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: brand.logo.alt })).toBeInTheDocument();
    expect(screen.getByText("Open daily · 11am–7pm")).toBeInTheDocument();
  });

  it("introduces Mother Lode", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Vintage & makers market" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Goods and gifts for you and your home.")).toBeInTheDocument();
  });

  it("links a card to each shop", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: "Visit us" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Decatur/ })).toHaveAttribute("href", "/decatur");
    expect(screen.getByRole("link", { name: /Athens/ })).toHaveAttribute("href", "/athens");
  });

  it("shows the interior photo grid", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: "Inside the shops" })).toBeInTheDocument();
  });
});
