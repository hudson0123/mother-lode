import type { Metadata } from "next";

import ShopPage from "../components/ShopPage";
import { shops } from "../data/shops";

export const metadata: Metadata = {
  title: "Athens",
  description:
    "Mother Lode Athens: 1005 Baxter St, Athens, GA 30606. Open daily 11am–7pm.",
};

export default function AthensPage() {
  return <ShopPage shop={shops.athens} />;
}
