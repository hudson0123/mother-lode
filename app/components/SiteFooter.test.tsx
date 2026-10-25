import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import SiteFooter from "./SiteFooter";

describe("SiteFooter", () => {
  it("links to both social accounts by name", () => {
    render(<SiteFooter />);
    expect(screen.getByRole("link", { name: "Instagram" })).toHaveAttribute(
      "href",
      "https://www.instagram.com/motherlodeatl/",
    );
    expect(screen.getByRole("link", { name: "Facebook" })).toHaveAttribute(
      "href",
      "https://www.facebook.com/motherlodeatl/",
    );
  });

  it("links each shop address to its page", () => {
    render(<SiteFooter />);
    expect(screen.getByRole("link", { name: /3429 Covington Hwy Ste B/ })).toHaveAttribute(
      "href",
      "/decatur",
    );
    expect(screen.getByRole("link", { name: /1005 Baxter St/ })).toHaveAttribute(
      "href",
      "/athens",
    );
  });

  it("shows the hours", () => {
    render(<SiteFooter />);
    expect(screen.getByText("Open daily · 11am–7pm")).toBeInTheDocument();
  });
});
