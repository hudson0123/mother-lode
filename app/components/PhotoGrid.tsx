import Image from "next/image";

import type { Photo } from "../data/shops";

export default function PhotoGrid({ photos }: { photos: Photo[] }) {
  return (
    <div className="grid grid-cols-2 gap-1 md:grid-cols-4 md:gap-1.5">
      {photos.map((photo) => (
        <div key={photo.src.src} className="relative aspect-[4/5] bg-sage-light">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
