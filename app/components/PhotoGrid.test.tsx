import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { shops } from "../data/shops";
import PhotoGrid from "./PhotoGrid";

describe("PhotoGrid", () => {
  it("renders every photo in order with its alt text", () => {
    const photos = shops.athens.insidePhotos;
    render(<PhotoGrid photos={photos} />);
    expect(screen.getAllByRole("img").map((img) => img.getAttribute("alt"))).toEqual(
      photos.map((p) => p.alt),
    );
  });

  it("lets the first of three photos span the phone row", () => {
    const { container } = render(<PhotoGrid photos={shops.decatur.insidePhotos} />);
    const tiles = container.firstElementChild!.children;
    expect(tiles).toHaveLength(3);
    expect(tiles[0]).toHaveClass("col-span-2", "md:col-span-1");
    expect(tiles[1]).not.toHaveClass("col-span-2");
  });

  it("keeps four photos in an even grid", () => {
    const { container } = render(<PhotoGrid photos={shops.athens.insidePhotos} />);
    expect(container.firstElementChild!).toHaveClass("md:grid-cols-4");
    expect(container.firstElementChild!.children[0]).not.toHaveClass("col-span-2");
  });
});
