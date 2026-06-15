import { getStructuredDataSchemas } from "@/lib/seo/structured-data";

export default function StructuredData() {
  const schemas = getStructuredDataSchemas();

  return (
    <>
      {schemas.map((schema) => (
        <script
          key={schema["@type"] as string}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
