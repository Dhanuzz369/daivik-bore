import type { Metadata } from "next";
import { brand } from "@/data/site";
import "./globals.css";

const siteUrl = brand.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Borewell Drilling Contractors in Bangalore | Daivik Borewells",
    template: "%s | Daivik Borewells",
  },
  description:
    "Borewell drilling contractors in Bangalore for homes, apartments, farms and commercial sites. Large-rig, compact and robo drilling, casing and pump installation. Free site visit.",
  keywords: [
    "borewell drilling Bangalore", "borewell drilling Bengaluru", "borewell contractors in Bangalore", "borewell drilling company in Bangalore",
    "bore well drilling Bangalore", "borewell drilling services", "robo borewell drilling Bangalore", "compact borewell drilling",
    "borewell deepening Bangalore", "borewell casing installation", "submersible pump installation Bangalore", "borewell cost Bangalore",
    "borewell for apartments", "agricultural borewell drilling", "Daivik Borewells",
  ],
  applicationName: "Daivik Borewells",
  category: "Borewell drilling services",
  creator: "Daivik Borewells",
  publisher: "Daivik Borewells",
  alternates: {
    canonical: "/",
    languages: { "en-IN": "/" },
  },
  openGraph: {
    title: "Borewell Drilling Contractors in Bangalore | Daivik Borewells",
    description:
      "Complete borewell drilling, casing, deepening and pump installation for Bangalore properties, including narrow-road and restricted-access sites.",
    url: siteUrl,
    siteName: "Daivik Borewells",
    images: [{ url: "/images/hero-user.webp", width: 1448, height: 1086, alt: "Daivik Borewells: borewell solutions in Bangalore" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Borewell Drilling Contractors in Bangalore | Daivik Borewells",
    description: "Complete borewell solutions for homes, apartments, farms and commercial properties across Bangalore.",
    images: ["/images/hero-user.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": "IN-KA",
    "geo.placename": "Bengaluru",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body>{children}</body>
    </html>
  );
}
