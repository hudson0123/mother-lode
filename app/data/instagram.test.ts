import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/cache", () => ({ cacheLife: () => {} }));

import { getInstagramPosts, parseBeholdFeed } from "./instagram";

function imagePost(id: string, extra: Record<string, unknown> = {}) {
  return {
    id,
    mediaType: "IMAGE",
    permalink: `https://www.instagram.com/p/${id}/`,
    mediaUrl: `https://scontent.example/${id}-full.jpg`,
    sizes: { medium: { mediaUrl: `https://behold.pictures/x/${id}/medium.webp` } },
    altText: `Alt for ${id}`,
    ...extra,
  };
}

describe("parseBeholdFeed", () => {
  it("uses Behold's medium image, the permalink and the alt text", () => {
    expect(parseBeholdFeed({ posts: [imagePost("a")] })).toEqual([
      {
        id: "a",
        imageUrl: "https://behold.pictures/x/a/medium.webp",
        permalink: "https://www.instagram.com/p/a/",
        alt: "Alt for a",
      },
    ]);
  });

  it("uses the thumbnail for a video without sizes", () => {
    const video = {
      id: "v",
      mediaType: "VIDEO",
      permalink: "https://www.instagram.com/reel/v/",
      mediaUrl: "https://scontent.example/v.mp4",
      thumbnailUrl: "https://scontent.example/v-thumb.jpg",
    };
    expect(parseBeholdFeed({ posts: [video] })[0].imageUrl).toBe(
      "https://scontent.example/v-thumb.jpg",
    );
  });

  it("falls back to mediaUrl for a carousel without sizes", () => {
    const carousel = imagePost("c", { mediaType: "CAROUSEL_ALBUM", sizes: undefined });
    expect(parseBeholdFeed({ posts: [carousel] })[0].imageUrl).toBe(
      "https://scontent.example/c-full.jpg",
    );
  });

  it("skips posts with no usable image or permalink", () => {
    const noImage = { id: "n", mediaType: "VIDEO", permalink: "https://www.instagram.com/p/n/" };
    const noLink = imagePost("l", { permalink: undefined });
    expect(parseBeholdFeed({ posts: [noImage, noLink, imagePost("ok")] }).map((p) => p.id)).toEqual(
      ["ok"],
    );
  });

  it("builds alt text from the caption without hashtags, trimmed to 120 characters", () => {
    const long = "A".repeat(200);
    const post = imagePost("t", { altText: undefined, prunedCaption: long });
    const alt = parseBeholdFeed({ posts: [post] })[0].alt;
    expect(alt.length).toBeLessThanOrEqual(120);
    expect(alt.startsWith("AAAA")).toBe(true);
  });

  it("uses a generic alt text when there is no caption", () => {
    const post = imagePost("g", { altText: undefined });
    expect(parseBeholdFeed({ posts: [post] })[0].alt).toBe("Instagram post from Mother Lode");
  });

  it("returns at most six posts", () => {
    const posts = Array.from({ length: 9 }, (_, i) => imagePost(String(i)));
    expect(parseBeholdFeed({ posts })).toHaveLength(6);
  });

  it("returns nothing for malformed feeds", () => {
    expect(parseBeholdFeed({})).toEqual([]);
    expect(parseBeholdFeed(null)).toEqual([]);
    expect(parseBeholdFeed({ posts: "x" })).toEqual([]);
    expect(parseBeholdFeed({ posts: [null, 3, "x"] })).toEqual([]);
  });
});

describe("getInstagramPosts", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
    fetchMock.mockReset();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("does not fetch when no feed is configured", async () => {
    vi.stubEnv("BEHOLD_FEED_ID", "");
    expect(await getInstagramPosts()).toEqual([]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns nothing when the request fails", async () => {
    vi.stubEnv("BEHOLD_FEED_ID", "feed123");
    fetchMock.mockRejectedValue(new Error("network down"));
    expect(await getInstagramPosts()).toEqual([]);
  });

  it("returns nothing on an error response", async () => {
    vi.stubEnv("BEHOLD_FEED_ID", "feed123");
    fetchMock.mockResolvedValue(new Response("paused", { status: 500 }));
    expect(await getInstagramPosts()).toEqual([]);
  });

  it("returns nothing when the body is not JSON", async () => {
    vi.stubEnv("BEHOLD_FEED_ID", "feed123");
    fetchMock.mockResolvedValue(new Response("<html>", { status: 200 }));
    expect(await getInstagramPosts()).toEqual([]);
  });

  it("fetches the configured Behold feed and parses it", async () => {
    vi.stubEnv("BEHOLD_FEED_ID", "feed123");
    fetchMock.mockResolvedValue(Response.json({ posts: [imagePost("a")] }));
    const posts = await getInstagramPosts();
    expect(fetchMock.mock.calls[0][0]).toBe("https://feeds.behold.so/feed123");
    expect(posts.map((p) => p.id)).toEqual(["a"]);
  });
});
