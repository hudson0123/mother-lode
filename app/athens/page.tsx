import type { Metadata } from "next";

import ShopPage from "../components/ShopPage";
import { shopMetadata, shops } from "../data/shops";

export const metadata: Metadata = shopMetadata(shops.athens);

export default function AthensPage() {
  return <ShopPage shop={shops.athens} />;
}
