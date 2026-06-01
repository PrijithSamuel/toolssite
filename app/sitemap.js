export default function sitemap() {
  const baseUrl = "https://toolssite-kappa.vercel.app";

  const routes = [
    "",
    "/pdf",
    "/pdf/compress",
    "/pdf/merge",
    "/pdf/split",
    "/pdf/pdf-to-text",
    "/calculators",
    "/calculators/percentage",
    "/calculators/bmi",
    "/calculators/age",
    "/calculators/emi",
    "/converters",
    "/converters/unit",
    "/converters/currency",
    "/converters/color",
    "/text-tools",
    "/text-tools/word-counter",
    "/text-tools/case-converter",
    "/text-tools/text-reverser",
    "/text-tools/remove-duplicates",
    "/image-tools",
    "/image-tools/compress",
    "/image-tools/resize",
    "/image-tools/image-to-pdf",
    "/image-tools/convert-format",
    "/developer-tools",
    "/developer-tools/password-generator",
    "/developer-tools/json-formatter",
    "/developer-tools/qr-code",
    "/developer-tools/regex-tester",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : route.split("/").length === 2 ? 0.8 : 0.6,
  }));
}