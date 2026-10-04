export type Project = {
  slug: string;
  name: string;
  tag: string;
  description: string;
  link: string | null;
  url: string;
  image: string | null;
  favicon: string | null;
  favColor: string;
  favInitial: string;
  nda?: boolean;
};

export const projects: Project[] = [
  {
    slug: "spco",
    name: "SPCO",
    tag: "Web · Platform",
    description:
      "Corporate website and product catalog for a B2B distributor of industrial bearings, lubricants, and hardware components.",
    link: "https://www.spco.in/",
    url: "https://www.spco.in",
    image: "/project-one.png",
    favicon: "https://www.spco.in/assets/images/SPCO_Favicon_Black-D1YeWmpV.svg",
    favColor: "#2F6BD8",
    favInitial: "S",
  },
  {
    slug: "foal-and-pony",
    name: "Foal & Pony",
    tag: "Branding · D2C · Web",
    description:
      "Premium kids eyewear. Brand identity, website, and D2C launch across India.",
    link: "https://foalandpony.com/",
    url: "https://foalandpony.com",
    image: "/project-two.png",
    favicon: "https://www.google.com/s2/favicons?domain=foalandpony.com&sz=32",
    favColor: "#C98B5E",
    favInitial: "F",
  },
  {
    slug: "saaj",
    name: "SAAJ",
    tag: "Design · Frontend",
    description:
      "Cinematic brand website for a Mumbai-based Bollywood acoustic wedding duo, crafted to feel as intimate as their live pheras performances.",
    link: "https://saaj.garihc.com/",
    url: "https://saaj.garihc.com",
    image: null,
    favicon: null,
    favColor: "#BFA67A",
    favInitial: "S",
  },
  {
    slug: "rppl",
    name: "RPPL",
    tag: "Design · Web · Platform",
    description:
      "Corporate website for Rajshree Polypack Limited, a rigid packaging manufacturer serving dairy, beverages, QSR and fresh produce markets across India and globally.",
    link: "https://rppl.garihc.com/",
    url: "https://rppl.garihc.com",
    image: null,
    favicon: "https://rppl.garihc.com/icon.svg",
    favColor: "#1A3A5C",
    favInitial: "R",
  },
  {
    slug: "block",
    name: "BLOCK",
    tag: "Design · Web · Platform",
    description:
      "Website for BLOCK Advisory LLP, a full-stack financial services firm offering strategic fundraising, trade finance, accounting, compliance and consulting for SMEs and MSMEs.",
    link: "https://block.garihc.com/",
    url: "https://block.garihc.com",
    image: null,
    favicon: "https://block.garihc.com/icon.png",
    favColor: "#1C1C1E",
    favInitial: "B",
  },
  {
    slug: "ties",
    name: "Ties",
    tag: "Design · Web · Product",
    description:
      "A private relationship-keeping tool that reminds you to reach out on birthdays, festivals, or when it's been too long, with one-tap messaging.",
    link: "https://ties.garihc.com/",
    url: "https://ties.garihc.com",
    image: null,
    favicon: null,
    favColor: "#6B4F3A",
    favInitial: "T",
  },
];

export function getProjectIndexFromSlug(slug: string): number {
  const index = projects.findIndex((project) => project.slug === slug);
  return index >= 0 ? index : 0;
}

export function getProjectIndexFromPath(pathname: string): number | null {
  const match = pathname.match(/^\/work\/([^/]+)$/);
  if (!match) return null;
  const index = projects.findIndex((project) => project.slug === match[1]);
  return index >= 0 ? index : null;
}
