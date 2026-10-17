import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/lib/site";

// Self-hosted (from @fontsource) so there's no request to Google at build or run time.
const poppins = localFont({
  src: [
    { path: "../node_modules/@fontsource/poppins/files/poppins-latin-500-normal.woff2", weight: "500" },
    { path: "../node_modules/@fontsource/poppins/files/poppins-latin-600-normal.woff2", weight: "600" },
    { path: "../node_modules/@fontsource/poppins/files/poppins-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

const inter = localFont({
  src: [
    { path: "../node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2", weight: "400" },
    { path: "../node_modules/@fontsource/inter/files/inter-latin-500-normal.woff2", weight: "500" },
    { path: "../node_modules/@fontsource/inter/files/inter-latin-600-normal.woff2", weight: "600" },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} | Web Apps, Mobile Apps, Digital Platforms, UI/UX Design & Product Engineering`,
  description:
    "Engineering-led software studio in Lagos, Nigeria. Web applications, mobile apps, digital platforms, UI/UX design and product engineering, built by engineers who commit to a date and deliver on it.",
  metadataBase: new URL(site.url),
  // Favicon: app/icon.svg (brand mark in Due Blue); app/apple-icon.png (white mark on navy tile); manifest icons in /public.
  openGraph: {
    title: `${site.name} | ${site.tagline}`,
    siteName: site.name,
    description: "Web applications, mobile apps, digital platforms, UI/UX design and product engineering. Built to ship.",
    type: "website",
    locale: "en_NG",
  },
  keywords: [
    "software development Lagos",
    "web application development Nigeria",
    "mobile app development Lagos",
    "digital platform development",
    "UI/UX design Nigeria",
    "product engineering",
    "Next.js agency Nigeria",
    "Due Label Technologies",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
