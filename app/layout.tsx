import type { Metadata } from "next";
import { Fraunces, Inter, Yellowtail } from "next/font/google";

import SiteFooter from "./components/SiteFooter";
import SiteNav from "./components/SiteNav";
import TopBar from "./components/TopBar";
import { brand, shopList } from "./data/shops";
import "./globals.css";

const yellowtail = Yellowtail({
  variable: "--font-yellowtail",
  weight: "400",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
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
  description: `${brand.name} is a ${brand.tagline.toLowerCase()} in ${shopList.map((shop) => shop.city).join(" and ")}, Georgia. ${brand.supporting}`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${yellowtail.variable} ${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <TopBar />
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
