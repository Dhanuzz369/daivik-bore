import { locationGuides } from "./location-guides.ts";

export interface LocationRecord {
  slug: string;
  name: string;
  aliases: readonly string[];
  coverageLabels: readonly string[];
  introduction: string;
  sections: readonly { heading: string; body: string }[];
  questions: readonly { question: string; answer: string }[];
  evidence: readonly { source: string; supports: readonly string[] }[];
  review: {
    status: "pending" | "approved";
    reviewedBy: string;
    reviewedAt: string;
  };
}

function approvedLocation(
  slug: string,
  name: string,
  coverageLabels: readonly string[],
  aliases: readonly string[] = [],
): LocationRecord {
  const guide = locationGuides[slug];
  if (!guide) throw new Error(`Missing local guide: ${slug}`);
  return {
    slug, name, aliases, coverageLabels,
    ...guide,
    evidence: [{ source: "Owner-confirmed service coverage and scope; approved editorial site-preparation guidance. Not completed-project evidence.", supports: guide.sections.map(section => section.heading) }],
    review: { status: "approved", reviewedBy: "Business owner: publication and factual service scope approved in chat", reviewedAt: "2026-10-11" },
  };
}

// Owner-approved service-area guidance; no local project or groundwater claims.
export const locationRecords: readonly LocationRecord[] = [
  approvedLocation("devanahalli-airport-road", "Devanahalli / Airport Road", ["Devanahalli", "Airport Road", "Bagalur"], ["devanahalli", "airport-road", "bagalur"]),
  approvedLocation("nelamangala", "Nelamangala", ["Nelamangala"]),
  approvedLocation("doddaballapura", "Doddaballapura", ["Doddaballapura", "Apparel Park"], ["apparel-park"]),
  approvedLocation("kanakapura-road", "Kanakapura Road", ["Kanakapura Road"]),
  approvedLocation("kengeri", "Kengeri", ["Kengeri", "RR Nagar"], ["rr-nagar"]),
  approvedLocation("hosur-road", "Hosur Road", ["Hosur Road", "Electronic City", "Bommasandra", "Attibele"], ["electronic-city", "bommasandra", "attibele"]),
  approvedLocation("bhartiya-city-thanisandra", "Bhartiya City / Thanisandra", ["Bhartiya City", "Thanisandra"], ["bhartiya-city", "bharathiya-city", "thanisandra"]),
  approvedLocation("whitefield", "Whitefield", ["EPIP Whitefield"], ["epip-whitefield"]),
  approvedLocation("peenya", "Peenya", ["Peenya"]),
  approvedLocation("jigani", "Jigani", ["Jigani"]),
  approvedLocation("dabaspet-sompura", "Dabaspet / Sompura", ["Dabaspet", "Sompura"], ["dabaspet", "sompura"]),
  approvedLocation("hoskote", "Hoskote", ["Hoskote Industrial Area"], ["hoskote-industrial-area"]),
  approvedLocation("bidadi", "Bidadi", ["Bidadi"]),
  approvedLocation("harohalli", "Harohalli", ["Harohalli"]),
  approvedLocation("aerospace-hardware-parks", "Bengaluru Aerospace Park / Hardware Park", ["Bengaluru Aerospace Park", "Hardware Park", "Huvinayakanahalli"], ["bengaluru-aerospace-park", "hardware-park", "huvinayakanahalli"]),
  approvedLocation("south-bengaluru", "South Bengaluru", ["Thalaghattapura", "Uttarahalli", "JP Nagar", "Banashankari", "Jayanagar", "Bannerghatta Road", "NICE Road corridor"], ["thalaghattapura", "uttarahalli", "jp-nagar", "banashankari", "jayanagar", "bannerghatta-road", "nice-road-corridor"]),
];

// Neighbouring guides, grouped by side of the city, for cross-linking.
const regions: readonly (readonly string[])[] = [
  ["devanahalli-airport-road", "aerospace-hardware-parks", "doddaballapura", "bhartiya-city-thanisandra"],
  ["nelamangala", "peenya", "dabaspet-sompura"],
  ["whitefield", "hoskote", "bhartiya-city-thanisandra"],
  ["hosur-road", "jigani", "south-bengaluru"],
  ["kengeri", "bidadi", "kanakapura-road", "harohalli", "south-bengaluru"],
];

export function getNearbyLocations(slug: string): readonly LocationRecord[] {
  const slugs = new Set(regions.filter(group => group.includes(slug)).flat());
  slugs.delete(slug);
  return getPublishedLocations().filter(record => slugs.has(record.slug));
}

// Keyword-led title; falls back to the shorter form when the area name is long.
export function locationTitle(record: Pick<LocationRecord, "name">): string {
  const candidates = [
    `Borewell Drilling Contractors in ${record.name} | Daivik Borewells`,
    `Borewell Drilling in ${record.name} | Daivik Borewells`,
  ];
  return candidates.find(title => title.length <= 70) ?? `Borewell Drilling in ${record.name}`;
}

export function locationKeywords(record: Pick<LocationRecord, "name" | "coverageLabels">): string[] {
  const places = [...new Set([record.name, ...record.coverageLabels])];
  return [
    ...places.flatMap(place => [`borewell drilling in ${place}`, `borewell contractors in ${place}`]),
    `borewell drilling ${record.name}`, `bore well drilling ${record.name}`, `robo borewell drilling ${record.name}`, `submersible pump installation ${record.name}`,
  ];
}

// First sentences of the introduction, up to a meta-description length.
export function locationSummary(record: LocationRecord, max = 160): string {
  const sentences = record.introduction.match(/[^.!?]+[.!?]+/g) ?? [record.introduction];
  let summary = "";
  for (const sentence of sentences.map(s => s.trim())) {
    if (summary && (summary + " " + sentence).length > max) break;
    summary = summary ? `${summary} ${sentence}` : sentence;
  }
  return summary.length > max ? `${summary.slice(0, summary.lastIndexOf(" ", max - 1))}…` : summary;
}

/**
 * Mechanical eligibility only: the named reviewer must verify original local
 * value and source accuracy before approval. Nonempty text cannot prove quality.
 * Each evidence.supports entry identifies a supported section by its heading.
 * reviewedAt is a calendar date in YYYY-MM-DD format.
 */
export function isPublishableLocation(record: LocationRecord): boolean {
  const { review } = record;
  if (review.status !== "approved" || !review.reviewedBy.trim()) return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(review.reviewedAt)) return false;
  const date = new Date(`${review.reviewedAt}T00:00:00Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== review.reviewedAt) return false;
  if (!record.introduction.trim() || record.sections.length === 0) return false;
  if (record.questions.length === 0) return false;
  if (!record.questions.every(({ question, answer }) => question.trim() && answer.trim())) return false;
  return record.sections.every(section =>
    Boolean(section.heading.trim() && section.body.trim()) &&
    record.evidence.some(evidence =>
      Boolean(evidence.source.trim()) && evidence.supports.includes(section.heading),
    ),
  );
}

export function getPublishedLocations(): readonly LocationRecord[] {
  return locationRecords.filter(isPublishableLocation);
}

export function getPublishedLocation(slug: string): LocationRecord | undefined {
  return getPublishedLocations().find(record => record.slug === slug);
}
