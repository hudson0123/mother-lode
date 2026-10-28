import Image from "next/image";

import type { InstagramPost } from "../data/instagram";
import { brand, instagramFallbackPhotos } from "../data/shops";

const TILE_COUNT = 6;
const tileClass = "relative block aspect-square overflow-hidden bg-sage-light";
const sizes = "(min-width: 768px) 17vw, 34vw";

/** Six square tiles: the latest posts first, then shop photos linking to the profile. */
export default function InstagramTiles({ posts }: { posts: InstagramPost[] }) {
  const shown = posts.slice(0, TILE_COUNT);
  const fillers = instagramFallbackPhotos.slice(0, TILE_COUNT - shown.length);

  return (
    <div className="grid grid-cols-3 gap-[3px] md:grid-cols-6">
      {shown.map((post) => (
        <a
          key={post.id}
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className={tileClass}
        >
          {/* Behold already serves resized WebP, so skip Next's optimizer. */}
          <Image
            src={post.imageUrl}
            alt={post.alt}
            fill
            unoptimized
            sizes={sizes}
            className="object-cover"
          />
        </a>
      ))}
      {fillers.map((photo) => (
        <a
          key={photo.alt}
          href={brand.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={tileClass}
        >
          <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className="object-cover" />
        </a>
      ))}
    </div>
  );
}
