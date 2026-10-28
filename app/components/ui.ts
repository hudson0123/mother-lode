// Class names shared by the page sections, so spacing and controls stay consistent.

export type Tone = "white" | "green";

export const wrap = "mx-auto max-w-6xl px-5 md:px-12";

export const sectionPad = "py-13 md:py-21";

export const sectionBg: Record<Tone, string> = {
  white: "bg-paper",
  green: "bg-sage",
};

const linkBase = "inline-block whitespace-nowrap border-b-2 pb-0.5 text-[13px] font-semibold";

export const textLink: Record<Tone, string> = {
  white: `${linkBase} border-gold hover:border-ink`,
  green: `${linkBase} border-ink hover:border-paper`,
};

const buttonBase = "inline-block px-5 py-3 text-[13px] font-semibold tracking-[0.02em]";

export const button = {
  ink: `${buttonBase} bg-ink text-paper hover:bg-black`,
  line: `${buttonBase} shadow-[inset_0_0_0_1px_var(--color-ink)] hover:bg-ink hover:text-paper`,
  paper: `${buttonBase} bg-paper text-ink hover:bg-white`,
  ghost: `${buttonBase} text-paper shadow-[inset_0_0_0_1px_rgb(251_250_245/0.7)] hover:bg-paper hover:text-ink`,
};
