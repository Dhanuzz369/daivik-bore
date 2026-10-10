import type { MetadataRoute } from "next";
import { brand } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/borewell-services", "/service-areas"].map((path) => ({ url: `${brand.url}${path}` }));
}
