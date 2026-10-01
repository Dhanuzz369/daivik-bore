export const whatsappMessage = "Hi, I need a borewell solution for my property in Bangalore. I would like to discuss my site.";

export const brand = {
  name: "Daivik Borewells",
  legalName: "Daivik Borewells",
  phone: "+91 94484 17318",
  phoneHref: "tel:+919448417318",
  email: "daivikborewells@gmail.com",
  emailHref: "mailto:daivikborewells@gmail.com",
  whatsappNumber: "919448417318",
  whatsapp: `https://wa.me/919448417318?text=${encodeURIComponent(whatsappMessage)}`,
  url: "https://daivikborewells.com",
  maps: "https://www.google.com/maps/search/?api=1&query=Thalaghattapura+Bangalore",
};

export const images = {
  heroRig: "/images/hero-user.webp",
  heroMobile: "/images/hero-user.webp",
  large: "/images/large.webp",
  compact: "/images/compact.webp",
  robo: "/images/robo.webp",
  survey: "/images/survey.webp",
  water: "/images/water.webp",
  casing: "/images/casing.webp",
  pump: "/images/pump.webp",
  villa: "/images/villa.webp",
  farm: "/images/farm.webp",
  apartment: "/images/apartment.webp",
  commercial: "/images/commercial.webp",
};

export const equipment = [
  { name: "Large rigs", label: "Open sites", image: images.large, description: "Room to work. Power to go deeper.", detail: "Open plots, farms & larger developments", tone: "mint" },
  { name: "Compact drilling", label: "Narrow roads", image: images.compact, description: "A smaller footprint. A smarter fit.", detail: "Built-up streets & existing homes", tone: "blue" },
  { name: "Robo drilling", label: "Restricted spaces", image: images.robo, description: "When every metre matters.", detail: "Tight entrances & limited turning space", tone: "peach" },
];

export const solutions = [
  { key: "home", label: "Home", site: "Your home. Your water source.", equipment: "Compact or robo drilling", service: "From access checks to pump installation, planned around your existing property.", image: images.villa },
  { key: "apartment", label: "Apartment", site: "A plan for the whole property.", equipment: "Large or compact drilling", service: "Site assessment, drilling and pump planning for apartments and residential layouts.", image: images.apartment },
  { key: "farm", label: "Farm", site: "Water for what you grow.", equipment: "Large drilling rigs", service: "Site assessment and pump sizing around your land, geology and irrigation needs.", image: images.farm },
  { key: "commercial", label: "Commercial", site: "Built around your operations.", equipment: "Access-led machine selection", service: "A coordinated drilling, casing and pump installation scope for your commercial site.", image: images.commercial },
];

export const services = [
  { name: "Find the right spot", label: "Site & water assessment", image: images.survey, description: "Understand the land before the first drill." },
  { name: "Drill with a plan", label: "Drilling & deepening", image: images.large, description: "The machine and scope your site calls for." },
  { name: "Protect the borewell", label: "Casing installation", image: images.casing, description: "Casing selected for your ground conditions." },
  { name: "Bring water home", label: "Pump installation", image: images.pump, description: "Pump selection, fitting and final testing." },
];

export const process = [
  { title: "Visit & assess", detail: "Location, access and ground conditions." },
  { title: "Plan & select", detail: "Agree the scope and right machine." },
  { title: "Drill & case", detail: "Drilling and casing to suit the site." },
  { title: "Install & test", detail: "Pump installation and handover." },
];

// Service scenarios, not claims of completed customer projects.
export const projects = [
  { type: "Homes & villas", service: "Compact access. Complete installation.", image: images.villa, key: "home" },
  { type: "Apartments & layouts", service: "Planned for shared water needs.", image: images.apartment, key: "apartment" },
  { type: "Farms & agriculture", service: "From the borewell to your irrigation.", image: images.farm, key: "farm" },
  { type: "Commercial properties", service: "A scope that works around your site.", image: images.commercial, key: "commercial" },
];

export const areas = ["Thalaghattapura", "Kanakapura Road", "Uttarahalli", "JP Nagar", "Banashankari", "Jayanagar", "NICE Road corridor", "South Bangalore"];

export const serviceNames = [
  "Borewell drilling",
  "Compact borewell drilling",
  "Robo borewell drilling",
  "Borewell deepening",
  "Borewell casing installation",
  "Submersible pump installation",
  "Groundwater site assessment",
];

export const faqs = [
  { question: "Can you reach a narrow road or an existing home?", answer: "Compact and track-mounted robo drilling machines may suit restricted sites. We check entrance width, turning space, overhead clearance and working room before confirming the right machine." },
  { question: "How much does a borewell cost?", answer: "The price depends on access, drilling depth, ground conditions, casing and pump requirements. Share your location and site details for an assessment and a scope-based quote." },
  { question: "Can you guarantee that we will find water?", answer: "No. A groundwater assessment helps guide the drilling location, but water availability and yield depend on local geology. No survey or drilling method can guarantee water." },
  { question: "Do you handle casing and pump installation too?", answer: "Yes. We can coordinate assessment, machine selection, drilling, casing, pump installation and testing. Pump selection follows the drilling results and your usage requirements." },
  { question: "Can an existing borewell be deepened?", answer: "We first assess the existing borewell, its condition and site access. Deepening is considered only where suitable; the recommendation and scope depend on that assessment." },
  { question: "Where in Bangalore do you work?", answer: "We serve Thalaghattapura, Kanakapura Road, Uttarahalli, JP Nagar, Banashankari, Jayanagar and nearby South Bangalore areas. Share your location to confirm access and scheduling." },
  { question: "How can I book a borewell site visit?", answer: "Call or WhatsApp Daivik Borewells on +91 94484 17318, email daivikborewells@gmail.com, or submit the site-visit form. Share your Bangalore location and property type so we can discuss access and the suitable drilling machine." },
];
