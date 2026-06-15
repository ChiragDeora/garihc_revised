import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/constants";
import { SECTION_PATHS } from "@/lib/navigation/routes";

const STATIC_PATHS = ["", "/calculator"] as const;

function getPriority(path: string): number {
  if (path === "") return 1;
  if (path === "/calculator") return 0.8;
  if (path === "/about" || path === "/services" || path === "/contact") return 0.85;
  return 0.7;
}

function getChangeFrequency(
  path: string
): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (path === "") return "weekly";
  if (path === "/about" || path === "/services" || path === "/contact") {
    return "monthly";
  }
  return "monthly";
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [...STATIC_PATHS, ...SECTION_PATHS].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: getChangeFrequency(path),
    priority: getPriority(path),
  }));
}
