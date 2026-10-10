import { areas, brand, serviceNames } from "@/data/site";

export function businessSchema() {
  return {
    "@type": "Organization",
    "@id": `${brand.url}/#business`,
    name: brand.name,
    url: `${brand.url}/`,
    logo: `${brand.url}/icon.svg`,
    telephone: "+919448417318",
    email: brand.email,
    areaServed: areas.map((name) => ({ "@type": "Place", name })),
    knowsAbout: serviceNames,
  };
}

export function directorySchema(path: string, name: string, mainEntity: object) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      businessSchema(),
      { "@type": "WebSite", "@id": `${brand.url}/#website`, url: `${brand.url}/`, name: brand.name, publisher: { "@id": `${brand.url}/#business` } },
      { "@type": "WebPage", "@id": `${brand.url}${path}#webpage`, url: `${brand.url}${path}`, name, inLanguage: "en-IN", isPartOf: { "@id": `${brand.url}/#website` }, about: { "@id": `${brand.url}/#business` }, breadcrumb: { "@id": `${brand.url}${path}#breadcrumb` }, mainEntity: { "@id": `${brand.url}${path}#service` } },
      { "@type": "BreadcrumbList", "@id": `${brand.url}${path}#breadcrumb`, itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${brand.url}/` },
        { "@type": "ListItem", position: 2, name, item: `${brand.url}${path}` },
      ] },
      { ...mainEntity, "@id": `${brand.url}${path}#service` },
    ],
  };
}
