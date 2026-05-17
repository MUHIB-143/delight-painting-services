import type { Metadata, Viewport } from "next";
import "./globals.css";
import LenisScroll from "@/components/LenisScroll";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Delight Painting Services | Premium Residential & Commercial Painters",
  description:
    "Transform your spaces with premium painting services. Professional residential & commercial painters offering luxury finishing, modern techniques, and eco-friendly solutions in NSW, Australia.",
  keywords: [
    "painting services",
    "house painting",
    "commercial painting",
    "residential painting",
    "interior painting",
    "exterior painting",
    "spray painting",
    "pressure cleaning",
    "NSW painters",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LenisScroll>{children}</LenisScroll>
      </body>
    </html>
  );
}
