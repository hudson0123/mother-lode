import { getInstagramPosts } from "../data/instagram";
import InstagramTiles from "./InstagramTiles";

export default async function InstagramStrip() {
  return <InstagramTiles posts={await getInstagramPosts()} />;
}
