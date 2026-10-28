import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { InstagramPost } from "../data/instagram";
import { brand } from "../data/shops";
import InstagramTiles from "./InstagramTiles";

const post = (id: string): InstagramPost => ({
  id,
  imageUrl: `https://behold.pictures/x/${id}/medium.webp`,
  permalink: `https://www.instagram.com/p/${id}/`,
  alt: `Post ${id}`,
});

describe("InstagramTiles", () => {
  it("shows the posts first and fills the rest with shop photos", () => {
    render(<InstagramTiles posts={[post("a"), post("b")]} />);
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual([
      "https://www.instagram.com/p/a/",
      "https://www.instagram.com/p/b/",
      brand.instagram,
      brand.instagram,
      brand.instagram,
      brand.instagram,
    ]);
    expect(screen.getByRole("img", { name: "Post a" })).toHaveAttribute(
      "src",
      "https://behold.pictures/x/a/medium.webp",
    );
  });

  it("shows six shop photos linking to the profile when there are no posts", () => {
    render(<InstagramTiles posts={[]} />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(6);
    for (const link of links) {
      expect(link).toHaveAttribute("href", brand.instagram);
    }
  });

  it("opens every tile in a new tab", () => {
    render(<InstagramTiles posts={[post("a")]} />);
    for (const link of screen.getAllByRole("link")) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });
});
