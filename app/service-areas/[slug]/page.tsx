import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocationPage } from "@/components/LocationPage";
import { getPublishedLocation, getPublishedLocations } from "@/data/locations";
import { brand } from "@/data/site";
import { locationSchema } from "@/lib/seo";

// Installed docs: [] generates no pages; false makes unspecified paths 404.
export const dynamicParams = false;
export function generateStaticParams() {
  return getPublishedLocations().map(({ slug }) => ({ slug }));
}
type Props = { params: Promise<{ slug: string }> };
async function publishedLocation({ params }: Props) {
  const { slug } = await params;
  const location = getPublishedLocation(slug);
  if (!location) notFound();
  return location;
}
export async function generateMetadata(props: Props): Promise<Metadata> {
  const location = await publishedLocation(props);
  const url = `${brand.url}/service-areas/${location.slug}`;
  const title = `Borewell Drilling in ${location.name} | Daivik Borewells`;
  const description = `Borewell drilling, casing and pump installation in ${location.name}. Explore local site guidance and arrange a free site visit with Daivik Borewells.`;
  const image = `${brand.url}/images/hero-user.webp`;
  return { title: { absolute: title }, description, alternates: { canonical: url, languages: { "en-IN": url } },
    openGraph: { title, description, url, siteName: brand.name, locale: "en_IN", type: "website", images: [{ url: image, width: 1448, height: 1086, alt: "Borewell drilling rig" }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
export default async function LocationRoute(props: Props) {
  const location = await publishedLocation(props);
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(locationSchema(location)).replace(/</g, "\\u003c") }} /><LocationPage location={location} /></>;
}
