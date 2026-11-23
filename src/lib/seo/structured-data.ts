import {
  CONTACT_EMAIL,
  SERVICE_TYPES,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "./constants";
import { projects } from "@/lib/work/projects";

type JsonLd = Record<string, unknown>;

export function getOrganizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo-dark.png`,
    image: `${SITE_URL}/logo-dark.png`,
    description: SITE_DESCRIPTION,
    email: CONTACT_EMAIL,
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
      },
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: CONTACT_EMAIL,
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [],
    knowsAbout: [
      "Web Development",
      "Artificial Intelligence",
      "Digital Transformation",
      "UI/UX Design",
      "Systems Integration",
      "Workflow Automation",
    ],
  };
}

export function getWebSiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function getProfessionalServiceSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    image: `${SITE_URL}/logo-dark.png`,
    logo: `${SITE_URL}/logo-dark.png`,
    email: CONTACT_EMAIL,
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
    ],
    serviceType: [...SERVICE_TYPES],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Services",
      itemListElement: SERVICE_TYPES.map((service, i) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service,
          url: `${SITE_URL}/services`,
        },
        position: i + 1,
      })),
    },
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function getFAQSchema(): JsonLd {
  const faqs = [
    {
      q: "What does GARIHC do?",
      a: `GARIHC is a technology consultancy that builds websites, platforms, and AI-powered workflows for businesses. Services include ${SERVICE_TYPES.join(", ")}.`,
    },
    {
      q: "Where is GARIHC based?",
      a: "GARIHC is based in India and serves clients globally across the US, UK, and other markets.",
    },
    {
      q: "What industries does GARIHC work with?",
      a: "GARIHC works across industries including manufacturing, finance, music and entertainment, eyewear and D2C, industrial distribution, and professional services.",
    },
    {
      q: "How can I contact GARIHC?",
      a: `You can reach GARIHC at ${CONTACT_EMAIL} or through the contact form at ${SITE_URL}/contact.`,
    },
    {
      q: "What technology stack does GARIHC use?",
      a: "GARIHC builds with Next.js, React, TypeScript, and Node.js. AI/ML capabilities are integrated where needed. Infrastructure is typically deployed on Vercel, AWS, or client-preferred platforms.",
    },
    {
      q: "What kind of AI solutions does GARIHC build?",
      a: "GARIHC builds workflow automation, intelligent dashboards, AI-first product features like smart search and recommendation engines, and custom agents deployed for real operational impact.",
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

export function getPortfolioSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "GARIHC Portfolio",
    description: "Selected work by GARIHC",
    numberOfItems: projects.filter((p) => p.link).length,
    itemListElement: projects
      .filter((p) => p.link)
      .map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "CreativeWork",
          name: p.name,
          description: p.description,
          url: p.link,
          creator: {
            "@type": "Organization",
            name: SITE_NAME,
          },
        },
      })),
  };
}

export function getStructuredDataSchemas(): JsonLd[] {
  return [
    getOrganizationSchema(),
    getWebSiteSchema(),
    getProfessionalServiceSchema(),
    getFAQSchema(),
    getPortfolioSchema(),
  ];
}
