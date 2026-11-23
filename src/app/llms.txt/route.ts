import { NextResponse } from "next/server";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  SERVICE_TYPES,
  CONTACT_EMAIL,
} from "@/lib/seo/constants";
import { projects } from "@/lib/work/projects";

export const dynamic = "force-dynamic";

export function GET() {
  const lines: string[] = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    `${SITE_NAME} is a technology consultancy that builds websites, platforms, and AI-powered workflows for businesses. Based in India, serving clients globally.`,
    "",
    "## Services",
    "",
    ...SERVICE_TYPES.map((s) => `- ${s}`),
    "",
    "## Portfolio",
    "",
    ...projects
      .filter((p) => p.link)
      .map((p) => `- [${p.name}](${p.link}): ${p.description}`),
    "",
    "## Links",
    "",
    `- Website: ${SITE_URL}`,
    `- Contact: ${CONTACT_EMAIL}`,
    `- Full context for LLMs: ${SITE_URL}/llms-full.txt`,
    "",
  ];

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
