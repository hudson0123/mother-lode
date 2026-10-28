import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import TopBar from "./TopBar";

describe("TopBar", () => {
  it("links each shop's phone number", () => {
    render(<TopBar />);
    expect(screen.getByRole("link", { name: "Decatur 678-927-9635" })).toHaveAttribute(
      "href",
      "tel:+16789279635",
    );
    expect(screen.getByRole("link", { name: "Athens 762-772-5554" })).toHaveAttribute(
      "href",
      "tel:+17627725554",
    );
  });

  it("leaves the hours out", () => {
    render(<TopBar />);
    expect(screen.queryByText(/11am/)).toBeNull();
  });
});
