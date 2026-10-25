import type { Metadata } from "next";
import { Inter, Lora, Yellowtail } from "next/font/google";

import SiteFooter from "./components/SiteFooter";
import SiteNav from "./components/SiteNav";
import { brand } from "./data/shops";
import "./globals.css";

const yellowtail = Yellowtail({
  variable: "--font-yellowtail",
  weight: "400",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${brand.name} | ${brand.tagline}`,
    template: `%s | ${brand.name}`,
  },
  description: `${brand.name} is a ${brand.tagline.toLowerCase()} in Decatur and Athens, Georgia. ${brand.supporting}`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${yellowtail.variable} ${lora.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
