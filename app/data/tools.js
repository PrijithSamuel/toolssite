const tools = [
  // PDF Tools
  { name: "Merge PDF", description: "Combine multiple PDF files into one", href: "/pdf/merge", category: "PDF Tools", icon: "📎", badge: "Hot" },
  { name: "Split PDF", description: "Split a PDF into separate pages or extract specific pages", href: "/pdf/split", category: "PDF Tools", icon: "✂️", badge: "" },
  { name: "Compress PDF", description: "Reduce PDF file size without losing quality", href: "/pdf/compress", category: "PDF Tools", icon: "🗜️", badge: "" },
  { name: "PDF to Text", description: "Extract text content from any PDF file", href: "/pdf/pdf-to-text", category: "PDF Tools", icon: "📝", badge: "" },

  // Calculators
  { name: "Percentage Calculator", description: "Calculate percentages, increases and decreases", href: "/calculators/percentage", category: "Calculators", icon: "%", badge: "" },
  { name: "EMI Calculator", description: "Calculate loan EMI, interest and total payment", href: "/calculators/emi", category: "Calculators", icon: "🏦", badge: "Popular" },
  { name: "BMI Calculator", description: "Calculate your Body Mass Index instantly", href: "/calculators/bmi", category: "Calculators", icon: "⚖️", badge: "Popular" },
  { name: "Age Calculator", description: "Calculate exact age from date of birth", href: "/calculators/age", category: "Calculators", icon: "🎂", badge: "" },

  // Converters
  { name: "Unit Converter", description: "Convert length, weight, temperature, speed and more", href: "/converters/unit", category: "Converters", icon: "📏", badge: "Popular" },
  { name: "Currency Converter", description: "Convert between 20 world currencies instantly", href: "/converters/currency", category: "Converters", icon: "💱", badge: "" },
  { name: "Color Converter", description: "Convert HEX, RGB, HSL color codes", href: "/converters/color", category: "Converters", icon: "🎨", badge: "" },

  // Text Tools
  { name: "Word Counter", description: "Count words, characters, sentences and paragraphs", href: "/text-tools/word-counter", category: "Text Tools", icon: "✍️", badge: "Popular" },
  { name: "Case Converter", description: "Convert text to UPPER, lower or Title Case", href: "/text-tools/case-converter", category: "Text Tools", icon: "🔤", badge: "" },
  { name: "Text Reverser", description: "Reverse characters, words or lines instantly", href: "/text-tools/text-reverser", category: "Text Tools", icon: "🔁", badge: "" },
  { name: "Remove Duplicates", description: "Remove duplicate lines from any text", href: "/text-tools/remove-duplicates", category: "Text Tools", icon: "🗑️", badge: "" },
  { name: "Lorem Ipsum Generator", description: "Generate placeholder text for designs and mockups", href: "/text-tools/lorem-ipsum", category: "Text Tools", icon: "📄", badge: "New" },
{ name: "Text to Slug", description: "Convert text to URL-friendly slug instantly", href: "/text-tools/text-to-slug", category: "Text Tools", icon: "🔗", badge: "New" },
{ name: "Line Counter", description: "Count lines and get detailed line statistics", href: "/text-tools/line-counter", category: "Text Tools", icon: "🔢", badge: "New" },
{ name: "Sort Lines", description: "Sort lines alphabetically, by length or randomly", href: "/text-tools/sort-lines", category: "Text Tools", icon: "↕️", badge: "New" },

  // Image Tools
  { name: "Image Compressor", description: "Compress JPG and PNG images without losing quality", href: "/image-tools/compress", category: "Image Tools", icon: "🗜️", badge: "Hot" },
  { name: "Image Resizer", description: "Resize images to any dimension instantly", href: "/image-tools/resize", category: "Image Tools", icon: "📐", badge: "" },
  { name: "Image to PDF", description: "Convert images to PDF in one click", href: "/image-tools/image-to-pdf", category: "Image Tools", icon: "📑", badge: "" },
  { name: "Image Format Converter", description: "Convert images between JPG, PNG and WebP", href: "/image-tools/convert-format", category: "Image Tools", icon: "🔄", badge: "" },

  // Developer Tools
  { name: "JSON Formatter", description: "Format, minify and validate JSON instantly", href: "/developer-tools/json-formatter", category: "Developer Tools", icon: "📋", badge: "" },
  { name: "QR Code Generator", description: "Generate QR codes for any text or URL", href: "/developer-tools/qr-code", category: "Developer Tools", icon: "📱", badge: "New" },
  { name: "Regex Tester", description: "Test and debug regular expressions instantly", href: "/developer-tools/regex-tester", category: "Developer Tools", icon: "🔍", badge: "" },
  { name: "Password Generator", description: "Generate strong, secure passwords instantly", href: "/developer-tools/password-generator", category: "Developer Tools", icon: "🔑", badge: "New" },
];

export default tools;