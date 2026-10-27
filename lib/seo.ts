import { areas, brand, contentUpdatedAt, serviceDirectory, serviceNames } from "@/data/site";
import type { LocationRecord } from "@/data/locations";

export const businessId = `${brand.url}/#business`;
const websiteId = `${brand.url}/#website`;

export function serviceSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function serviceId(name: string) {
  return `${brand.url}/borewell-services#${serviceSlug(name)}`;
}

const bengaluru = { "@type": "City", name: brand.locality, containedInPlace: { "@type": "State", name: brand.region } };

export function placesServed(names: readonly string[]) {
  return names.filter(name => name !== "Entire Bengaluru").map(name => ({ "@type": "Place", name }));
}

// One business entity, emitted identically on every page.
export function businessSchema() {
  return {
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": businessId,
    name: brand.name,
    alternateName: "Daivik Borewells Bangalore",
    url: `${brand.url}/`,
    logo: `${brand.url}/icon.svg`,
    image: `${brand.url}/images/hero-user.webp`,
    telephone: "+919448417318",
    email: brand.email,
    description: "Borewell drilling contractor serving homes, apartments, farms and commercial properties across Bengaluru with large-rig, compact and robo drilling, casing, deepening and pump installation.",
    // Service-area business: locality only, no street address published.
    address: { "@type": "PostalAddress", addressLocality: brand.locality, addressRegion: brand.region, addressCountry: "IN" },
    areaServed: [bengaluru, ...placesServed(areas)],
    contactPoint: { "@type": "ContactPoint", telephone: "+919448417318", email: brand.email, contactType: "customer service", areaServed: "IN-KA", availableLanguage: "English" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Borewell services in Bengaluru",
      itemListElement: serviceNames.map(name => ({ "@type": "Offer", itemOffered: { "@type": "Service", "@id": serviceId(name), name } })),
    },
    knowsAbout: serviceNames,
    slogan: "Water, where you need it.",
    ...(brand.sameAs.length > 0 ? { sameAs: brand.sameAs } : {}),
  };
}

export function websiteSchema() {
  return { "@type": "WebSite", "@id": websiteId, url: `${brand.url}/`, name: brand.name, alternateName: "Daivik Borewells Bangalore", inLanguage: "en-IN", publisher: { "@id": businessId } };
}

export function serviceDirectorySchema() {
  return serviceDirectory.map(service => ({
    "@type": "Service", "@id": serviceId(service.name), name: service.name, description: service.description,
    provider: { "@id": businessId }, areaServed: bengaluru,
  }));
}

export function locationSchema(location: LocationRecord) {
  const path = `/service-areas/${location.slug}`;
  return directorySchema(path, `Borewell drilling in ${location.name}`, {
    "@type": "Service", name: `Borewell services in ${location.name}`,
    provider: { "@id": businessId },
    areaServed: placesServed(location.coverageLabels), serviceType: serviceNames,
  }, [], [{ name: "Service areas", path: "/service-areas" }, { name: location.name, path }]);
}

type Crumb = { name: string; path: string };

export function directorySchema(path: string, name: string, mainEntity: object, extra: object[] = [], trail: Crumb[] = [{ name, path }]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      businessSchema(),
      websiteSchema(),
      { "@type": "WebPage", "@id": `${brand.url}${path}#webpage`, url: `${brand.url}${path}`, name, inLanguage: "en-IN", dateModified: contentUpdatedAt, isPartOf: { "@id": websiteId }, about: { "@id": businessId }, breadcrumb: { "@id": `${brand.url}${path}#breadcrumb` }, mainEntity: { "@id": `${brand.url}${path}#service` } },
      { "@type": "BreadcrumbList", "@id": `${brand.url}${path}#breadcrumb`, itemListElement: [{ name: "Home", path: "/" }, ...trail].map((crumb, index) => (
        { "@type": "ListItem", position: index + 1, name: crumb.name, item: `${brand.url}${crumb.path}` }
      )) },
      { ...mainEntity, "@id": `${brand.url}${path}#service` },
      ...extra,
    ],
  };
}

export function jsonLd(schema: object) {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}
