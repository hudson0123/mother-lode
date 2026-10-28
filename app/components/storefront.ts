import type { Photo } from "../data/shops";

const POSITION_CLASS = {
  top: "object-top",
  upper: "object-[center_15%]",
} as const;

/** The object-position class that keeps a storefront's sign in frame. */
export function storefrontPosition(photo: Photo): string {
  return photo.position ? POSITION_CLASS[photo.position] : "object-center";
}
