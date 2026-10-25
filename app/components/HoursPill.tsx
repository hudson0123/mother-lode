import { brand } from "../data/shops";

export default function HoursPill({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block rounded-full border-2 border-ink bg-gold px-3 py-1 text-xs font-bold text-ink ${className}`}
    >
      {brand.hours}
    </span>
  );
}
