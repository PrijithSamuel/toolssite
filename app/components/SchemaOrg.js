export default function SchemaOrg({ name, description, url, category }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": name,
    "description": description,
    "url": "https://www.quiktoolkit.com" + url,
    "applicationCategory": category || "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "provider": {
      "@type": "Organization",
      "name": "QuikToolkit",
      "url": "https://www.quiktoolkit.com"
    }
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
