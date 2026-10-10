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

function pendingLocation(
  slug: string,
  name: string,
  coverageLabels: readonly string[],
  aliases: readonly string[] = [],
): LocationRecord {
  return {
    slug, name, aliases, coverageLabels,
    introduction: "", sections: [], questions: [], evidence: [],
    review: { status: "pending", reviewedBy: "", reviewedAt: "" },
  };
}

// Owner-confirmed coverage only. Local publication evidence has not been supplied.
export const locationRecords: readonly LocationRecord[] = [
  pendingLocation("devanahalli-airport-road", "Devanahalli / Airport Road", ["Devanahalli", "Airport Road", "Bagalur"], ["devanahalli", "airport-road", "bagalur"]),
  pendingLocation("nelamangala", "Nelamangala", ["Nelamangala"]),
  pendingLocation("doddaballapura", "Doddaballapura", ["Doddaballapura", "Apparel Park"], ["apparel-park"]),
  pendingLocation("kanakapura-road", "Kanakapura Road", ["Kanakapura Road"]),
  pendingLocation("kengeri", "Kengeri", ["Kengeri", "RR Nagar"], ["rr-nagar"]),
  pendingLocation("hosur-road", "Hosur Road", ["Hosur Road", "Electronic City", "Bommasandra", "Attibele"], ["electronic-city", "bommasandra", "attibele"]),
  pendingLocation("bhartiya-city-thanisandra", "Bhartiya City / Thanisandra", ["Bhartiya City", "Thanisandra"], ["bhartiya-city", "bharathiya-city", "thanisandra"]),
  pendingLocation("whitefield", "Whitefield", ["EPIP Whitefield"], ["epip-whitefield"]),
  pendingLocation("peenya", "Peenya", ["Peenya"]),
  pendingLocation("jigani", "Jigani", ["Jigani"]),
  pendingLocation("dabaspet-sompura", "Dabaspet / Sompura", ["Dabaspet", "Sompura"], ["dabaspet", "sompura"]),
  pendingLocation("hoskote", "Hoskote", ["Hoskote Industrial Area"], ["hoskote-industrial-area"]),
  pendingLocation("bidadi", "Bidadi", ["Bidadi"]),
  pendingLocation("harohalli", "Harohalli", ["Harohalli"]),
  pendingLocation("aerospace-hardware-parks", "Bengaluru Aerospace Park / Hardware Park", ["Bengaluru Aerospace Park", "Hardware Park", "Huvinayakanahalli"], ["bengaluru-aerospace-park", "hardware-park", "huvinayakanahalli"]),
  pendingLocation("south-bengaluru", "South Bengaluru", ["Thalaghattapura", "Uttarahalli", "JP Nagar", "Banashankari", "Jayanagar", "Bannerghatta Road", "NICE Road corridor"], ["thalaghattapura", "uttarahalli", "jp-nagar", "banashankari", "jayanagar", "bannerghatta-road", "nice-road-corridor"]),
];

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
