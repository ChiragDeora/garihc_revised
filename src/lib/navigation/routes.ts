import { projects } from "@/lib/work/projects";

export const SECTION_IDS = ["work", "about", "services", "contact"] as const;

export type SectionId = (typeof SECTION_IDS)[number];

const DEFAULT_WORK_SLUG = projects[0].slug;

export function getSectionIdFromPath(pathname: string): SectionId | null {
  if (pathname === "/about") return "about";
  if (pathname === "/services") return "services";
  if (pathname === "/contact") return "contact";
  if (pathname === "/work" || /^\/work\/[^/]+$/.test(pathname)) return "work";
  return null;
}

export function getWorkSlugFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/work\/([^/]+)$/);
  return match?.[1] ?? null;
}

export function getPathForSection(
  sectionId: SectionId,
  currentPathname = ""
): string {
  if (sectionId === "work") {
    const slug = getWorkSlugFromPath(currentPathname) ?? DEFAULT_WORK_SLUG;
    return `/work/${slug}`;
  }
  return `/${sectionId}`;
}

export const SECTION_PATHS = [
  "/about",
  "/services",
  "/contact",
  "/work",
  ...projects.map((project) => `/work/${project.slug}`),
] as const;
