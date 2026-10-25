import type { Metadata } from "next";

import ShopPage from "../components/ShopPage";
import { shops } from "../data/shops";

export const metadata: Metadata = {
  title: "Decatur",
  description:
    "Mother Lode Atlanta: 3429 Covington Hwy Ste B, Decatur, GA 30032. Open daily 11am–7pm.",
};

export default function DecaturPage() {
  return <ShopPage shop={shops.decatur} />;
}
