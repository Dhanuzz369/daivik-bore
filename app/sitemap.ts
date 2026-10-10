import type { MetadataRoute } from "next";
import { brand } from "@/data/site";
import { getPublishedLocations } from "@/data/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/borewell-services", "/service-areas", ...getPublishedLocations().map(location => `/service-areas/${location.slug}`)].map((path) => ({ url: `${brand.url}${path}` }));
}
