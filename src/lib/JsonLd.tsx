/**
 * Renders a JSON-LD structured-data block. Safe in server components; Google
 * reads application/ld+json anywhere in the document.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
