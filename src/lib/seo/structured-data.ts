import {
  CONTACT_EMAIL,
  SERVICE_TYPES,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "./constants";

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
    contactPoint: {
      "@type": "ContactPoint",
      email: CONTACT_EMAIL,
      contactType: "customer service",
      availableLanguage: ["English"],
    },
  };
}

export function getWebSiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "en-US",
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
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    serviceType: [...SERVICE_TYPES],
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function getStructuredDataSchemas(): JsonLd[] {
  return [
    getOrganizationSchema(),
    getWebSiteSchema(),
    getProfessionalServiceSchema(),
  ];
}
