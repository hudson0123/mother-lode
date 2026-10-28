import { shopList, telHref } from "../data/shops";

export default function TopBar() {
  return (
    <div className="bg-ink text-paper">
      <ul className="mx-auto flex max-w-6xl justify-center gap-3 px-5 py-1.5 text-[11.5px] md:justify-end md:px-12">
        {shopList.map((shop, i) => (
          <li key={shop.slug} className="flex gap-3">
            {i > 0 && (
              <span aria-hidden="true" className="opacity-40">
                |
              </span>
            )}
            <a href={telHref(shop.phone)} className="opacity-90 hover:opacity-100">
              {shop.city} {shop.phone}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
