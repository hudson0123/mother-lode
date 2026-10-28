import { cacheLife } from "next/cache";

export type InstagramPost = {
  id: string;
  imageUrl: string;
  permalink: string;
  alt: string;
};

const MAX_POSTS = 6;
const MAX_ALT = 120;
const GENERIC_ALT = "Instagram post from Mother Lode";

function str(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value : undefined;
}

function record(value: unknown): Record<string, unknown> | undefined {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : undefined;
}

function altText(post: Record<string, unknown>): string {
  const given = str(post.altText);
  if (given) return given;
  const caption = str(post.prunedCaption) ?? str(post.caption);
  const text = caption?.replace(/#\w+/g, "").replace(/\s+/g, " ").trim();
  if (!text) return GENERIC_ALT;
  return text.length > MAX_ALT ? `${text.slice(0, MAX_ALT - 1).trimEnd()}…` : text;
}

function imageUrl(post: Record<string, unknown>): string | undefined {
  const sizes = record(post.sizes);
  const sized = str(record(sizes?.medium)?.mediaUrl) ?? str(record(sizes?.large)?.mediaUrl);
  if (sized) return sized;
  // A video's mediaUrl is the video file itself, so only its thumbnail will do.
  return post.mediaType === "VIDEO" ? str(post.thumbnailUrl) : str(post.mediaUrl);
}

/** Turns a Behold JSON feed into at most six displayable posts, skipping anything unusable. */
export function parseBeholdFeed(json: unknown): InstagramPost[] {
  const posts = record(json)?.posts;
  if (!Array.isArray(posts)) return [];

  const parsed: InstagramPost[] = [];
  for (const item of posts) {
    const post = record(item);
    const id = str(post?.id);
    const permalink = str(post?.permalink);
    const image = post && imageUrl(post);
    if (!post || !id || !permalink || !image) continue;
    parsed.push({ id, imageUrl: image, permalink, alt: altText(post) });
    if (parsed.length === MAX_POSTS) break;
  }
  return parsed;
}

async function fetchBeholdFeed(feedId: string): Promise<InstagramPost[]> {
  "use cache";
  try {
    const res = await fetch(`https://feeds.behold.so/${feedId}`, {
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`Behold feed returned ${res.status}`);
    const posts = parseBeholdFeed(await res.json());
    // Behold's free plan refreshes daily; a few hours keeps the feed's view count low.
    cacheLife({ revalidate: 4 * 60 * 60, expire: 24 * 60 * 60 });
    return posts;
  } catch {
    // Retry sooner after a failure; the strip shows shop photos meanwhile.
    cacheLife({ revalidate: 15 * 60, expire: 60 * 60 });
    return [];
  }
}

/** Latest posts from the Behold feed in BEHOLD_FEED_ID, or none if it is unset or unavailable. */
export async function getInstagramPosts(): Promise<InstagramPost[]> {
  const feedId = process.env.BEHOLD_FEED_ID?.trim();
  if (!feedId) return [];
  return fetchBeholdFeed(feedId);
}
