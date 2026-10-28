import type { Tone } from "./ui";

const eyebrowTone: Record<Tone, string> = {
  white: "text-olive",
  green: "text-ink/70",
};

export function Eyebrow({ tone = "white", children }: { tone?: Tone; children: React.ReactNode }) {
  return (
    <p className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${eyebrowTone[tone]}`}>
      {children}
    </p>
  );
}

/** A small uppercase label above a serif heading. */
export default function SectionHeading({
  eyebrow,
  title,
  level = 2,
  tone = "white",
  id,
}: {
  eyebrow: string;
  title: string;
  level?: 1 | 2;
  tone?: Tone;
  id?: string;
}) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <div>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <Heading
        id={id}
        className="mt-1.5 font-serif text-[30px] font-medium leading-[1.1] tracking-[-0.01em] md:text-[40px]"
      >
        {title}
      </Heading>
    </div>
  );
}
