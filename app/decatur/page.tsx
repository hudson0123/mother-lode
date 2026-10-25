import type { Metadata } from "next";

import ShopPage from "../components/ShopPage";
import { shopMetadata, shops } from "../data/shops";

export const metadata: Metadata = shopMetadata(shops.decatur);

export default function DecaturPage() {
  return <ShopPage shop={shops.decatur} />;
}
