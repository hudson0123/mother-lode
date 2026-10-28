import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const pathname = vi.hoisted(() => ({ current: "/decatur" }));
vi.mock("next/navigation", () => ({ usePathname: () => pathname.current }));

import SiteNav from "./SiteNav";

describe("SiteNav", () => {
  beforeEach(() => {
    pathname.current = "/decatur";
  });

  it("links the text wordmark home", () => {
    render(<SiteNav />);
    expect(screen.getByRole("link", { name: "Mother Lode" })).toHaveAttribute("href", "/");
    expect(screen.queryByRole("img")).toBeNull();
  });

  it("links to the two shops only", () => {
    render(<SiteNav />);
    const links = within(screen.getByRole("list", { name: "Site" })).getAllByRole("link");
    expect(links.map((a) => [a.textContent, a.getAttribute("href")])).toEqual([
      ["Decatur", "/decatur"],
      ["Athens", "/athens"],
    ]);
  });

  it("marks only the current page", () => {
    render(<SiteNav />);
    expect(screen.getByRole("link", { name: "Decatur" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Athens" })).not.toHaveAttribute("aria-current");
  });

  it("shows the links directly, with no menu button", () => {
    render(<SiteNav />);
    expect(screen.queryByRole("button")).toBeNull();
  });
});
