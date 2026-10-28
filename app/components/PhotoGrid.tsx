import Image from "next/image";

import type { Photo } from "../data/shops";

/** Two across on phones; three or four across from md. With three, the first spans the phone row. */
export default function PhotoGrid({ photos }: { photos: Photo[] }) {
  const three = photos.length === 3;

  return (
    <div className={`grid grid-cols-2 gap-1 md:gap-3 ${three ? "md:grid-cols-3" : "md:grid-cols-4"}`}>
      {photos.map((photo, i) => {
        const wide = three && i === 0;
        return (
          <div
            key={photo.alt}
            className={`relative bg-sage-light ${wide ? "col-span-2 aspect-[4/3] md:col-span-1 md:aspect-[4/5]" : "aspect-[4/5]"}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes={wide ? "(min-width: 768px) 33vw, 100vw" : "(min-width: 768px) 33vw, 50vw"}
              className="object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}
