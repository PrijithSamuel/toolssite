export default function sitemap() {
  const baseUrl = "https://www.quiktoolkit.com";

  const routes = [
    "",
    // PDF Tools
    "/pdf",
    "/pdf/compress",
    "/pdf/merge",
    "/pdf/split",
    "/pdf/pdf-to-text",
    // Calculators
    "/calculators",
    "/calculators/percentage",
    "/calculators/bmi",
    "/calculators/age",
    "/calculators/emi",
    "/calculators/tip",
    "/calculators/discount",
    "/calculators/scientific",
    "/calculators/gpa",
    // Finance
    "/finance",
    "/finance/loan-calculator",
    "/finance/compound-interest",
    "/finance/salary-calculator",
    "/finance/invoice-generator",
    // Health
    "/health",
    "/health/calorie-calculator",
    "/health/water-intake",
    "/health/ideal-weight",
    // Converters
    "/converters",
    "/converters/unit",
    "/converters/currency",
    "/converters/color",
    "/converters/timezone",
    "/converters/number-base",
    // Text Tools
    "/text-tools",
    "/text-tools/word-counter",
    "/text-tools/case-converter",
    "/text-tools/text-reverser",
    "/text-tools/remove-duplicates",
    "/text-tools/lorem-ipsum",
    "/text-tools/text-to-slug",
    "/text-tools/line-counter",
    "/text-tools/sort-lines",
    "/text-tools/text-compare",
    // Image Tools
    "/image-tools",
    "/image-tools/compress",
    "/image-tools/resize",
    "/image-tools/image-to-pdf",
    "/image-tools/convert-format",
    // Developer Tools
    "/developer-tools",
    "/developer-tools/password-generator",
    "/developer-tools/json-formatter",
    "/developer-tools/qr-code",
    "/developer-tools/regex-tester",
    "/developer-tools/base64",
    "/developer-tools/url-encoder",
    "/developer-tools/markdown",
    "/developer-tools/uuid-generator",
    "/developer-tools/hash-generator",
    // SEO Tools
    "/seo-tools",
    "/seo-tools/meta-tag-generator",
    "/seo-tools/word-density",
    // Timer Tools
    "/timer-tools",
    "/timer-tools/stopwatch",
    "/timer-tools/countdown-timer",
    "/timer-tools/pomodoro",
    // Random Tools
    "/random-tools",
    "/random-tools/random-number",
    "/random-tools/coin-flip",
    "/random-tools/random-name-picker",
    "/random-tools/spin-wheel",
    // Math Tools
    "/math-tools",
    "/math-tools/fraction-calculator",
    "/math-tools/percentage-change",
    "/math-tools/prime-checker",
    // Date Tools
    "/date-tools",
    "/date-tools/date-difference",
    "/date-tools/days-until",
    "/date-tools/unix-timestamp",
    // Food Tools
    "/food-tools",
    "/food-tools/recipe-converter",
    "/food-tools/cooking-converter",
    "/food-tools/calorie-counter",
    // Student Tools
    "/student-tools",
    "/student-tools/grade-calculator",
    "/student-tools/study-timer",
    "/student-tools/citation-generator",
    // Finance additions
    "/finance/vat-calculator",
    "/finance/french-tax-calculator",
    // German Finance Tools
    "/finance/brutto-netto",
    "/finance/mehrwertsteuer",
    "/finance/german-grade-calculator",
    "/finance/kurzarbeit",
    "/finance/elterngeld",
    // Dutch / Netherlands Finance Tools
    "/finance/netherlands-tax",
    "/finance/netherlands-btw",
    "/finance/netherlands-30-percent",
    "/finance/netherlands-mortgage",
    "/finance/netherlands-zzp",
    "/finance/netherlands-toeslagen",
    // Irish Finance Tools
    "/finance/ireland-tax",
    "/finance/ireland-vat",
    "/finance/ireland-mortgage",
    "/finance/ireland-rent-tax-credit",
    "/finance/ireland-stamp-duty",
    "/finance/ireland-usc",
    "/finance/ireland-pension",
    // German Converter
    "/converters/german-units",
    // Abfindung
    "/calculators/abfindung",
    // Converter addition
    "/converters/euro-converter",
    // Developer tool addition
    "/developer-tools/json-to-csv",
    // Text tool additions
    "/text-tools/html-encode",
    "/text-tools/text-to-speech",
    // PDF addition
    "/pdf/word-count",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : route.split("/").length === 2 ? 0.8 : 0.6,
  }));
}
