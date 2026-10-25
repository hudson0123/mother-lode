import { render, screen } from "@testing-library/react";
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

  it("links to every page", () => {
    render(<SiteNav />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Decatur" })).toHaveAttribute("href", "/decatur");
    expect(screen.getByRole("link", { name: "Athens" })).toHaveAttribute("href", "/athens");
  });

  it("marks only the current page", () => {
    render(<SiteNav />);
    expect(screen.getByRole("link", { name: "Decatur" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Athens" })).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute("aria-current");
  });

  it("marks Home on the home page", () => {
    pathname.current = "/";
    render(<SiteNav />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "page");
  });
});
