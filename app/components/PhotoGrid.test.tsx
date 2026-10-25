import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { homeInsidePhotos } from "../data/shops";
import PhotoGrid from "./PhotoGrid";

describe("PhotoGrid", () => {
  it("renders every photo in order with its alt text", () => {
    render(<PhotoGrid photos={homeInsidePhotos} />);
    expect(screen.getAllByRole("img").map((img) => img.getAttribute("alt"))).toEqual(
      homeInsidePhotos.map((p) => p.alt),
    );
  });
});
