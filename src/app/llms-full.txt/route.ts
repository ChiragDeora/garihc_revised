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

const SERVICES_DETAIL = [
  {
    name: "Applied AI",
    detail:
      "Workflow automation, intelligent dashboards with real-time pattern detection, AI-first product features including smart search, recommendation engines, and predictive workflows. Custom agents deployed where they move the needle.",
  },
  {
    name: "Web & Product Dev",
    detail:
      "Corporate websites, e-commerce platforms, SaaS products, and digital experiences. Built with Next.js, React, and modern frameworks. Performance-first, SEO-optimised, responsive across devices.",
  },
  {
    name: "Systems & Integrations",
    detail:
      "API development, third-party integrations, data pipelines, CRM and ERP connections. Infrastructure that connects the tools your business already runs on.",
  },
  {
    name: "Digital Transformation",
    detail:
      "Replacing manual and broken workflows with streamlined digital systems. Process audit, tool selection, migration, and training. Built so your team actually wants to use it.",
  },
];

const FAQ = [
  {
    q: "What does GARIHC do?",
    a: `${SITE_NAME} builds websites, platforms, and AI-powered workflows for businesses. Services include ${SERVICE_TYPES.join(", ")}.`,
  },
  {
    q: "Where is GARIHC based?",
    a: "GARIHC is based in India and serves clients globally.",
  },
  {
    q: "What industries does GARIHC work with?",
    a: "GARIHC works across industries including manufacturing, finance, music and entertainment, eyewear and D2C, and industrial distribution.",
  },
  {
    q: "How can I contact GARIHC?",
    a: `You can reach GARIHC at ${CONTACT_EMAIL} or through the contact form at ${SITE_URL}/contact.`,
  },
  {
    q: "What technology stack does GARIHC use?",
    a: "GARIHC builds with Next.js, React, TypeScript, Node.js, and integrates AI/ML capabilities. Infrastructure is typically deployed on Vercel, AWS, or client-preferred platforms.",
  },
];

export function GET() {
  const lines: string[] = [
    `# ${SITE_NAME} - Full Context`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "## About",
    "",
    `${SITE_NAME} is a technology consultancy that builds refined websites, platforms, and AI-powered workflows for businesses. The company helps clients look sharper, move faster, and sell better through digital systems built with precision.`,
    "",
    "Based in India, serving clients globally across manufacturing, finance, entertainment, D2C, and industrial distribution.",
    "",
    "## Services",
    "",
    ...SERVICES_DETAIL.flatMap((s) => [`### ${s.name}`, "", s.detail, ""]),
    "## Portfolio",
    "",
    ...projects
      .filter((p) => p.link)
      .map(
        (p) =>
          `### ${p.name}\n- Tags: ${p.tag}\n- URL: ${p.link}\n- ${p.description}\n`
      ),
    "## Frequently Asked Questions",
    "",
    ...FAQ.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
    "## Contact",
    "",
    `- Email: ${CONTACT_EMAIL}`,
    `- Website: ${SITE_URL}`,
    `- Contact page: ${SITE_URL}/contact`,
    "",
    "## Sitemap",
    "",
    `- Home: ${SITE_URL}`,
    `- About: ${SITE_URL}/about`,
    `- Services: ${SITE_URL}/services`,
    `- Contact: ${SITE_URL}/contact`,
    ...projects
      .filter((p) => p.link)
      .map((p) => `- ${p.name}: ${SITE_URL}/work/${p.slug}`),
    "",
  ];

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
