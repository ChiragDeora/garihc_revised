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
    favicon: "https://www.google.com/s2/favicons?domain=spco.in&sz=32",
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
    link: "https://saaj-website.vercel.app/",
    url: "https://saaj-website.vercel.app",
    image: null,
    favicon: null,
    favColor: "#BFA67A",
    favInitial: "S",
  },
  {
    slug: "prodflow",
    name: "ProdFlow",
    tag: "AI · Full-Stack",
    description:
      "Production management with workflow automation, real-time tracking, and advanced reporting.",
    link: null,
    url: "prodflow.garihc",
    image: "/prodflow.png",
    favicon: null,
    favColor: "#6B7280",
    favInitial: "P",
    nda: true,
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
