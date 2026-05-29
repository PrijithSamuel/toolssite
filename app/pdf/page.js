import Link from "next/link";

const tools = [
  { name: "Merge PDF", description: "Combine multiple PDF files into one", href: "/pdf/merge" },
  { name: "Split PDF", description: "Split a PDF into separate pages", href: "/pdf/split" },
  { name: "Compress PDF", description: "Reduce PDF file size without losing quality", href: "/pdf/compress" },
  { name: "PDF to Text", description: "Extract text content from any PDF file", href: "/pdf/pdf-to-text" },
];

export default function PDFTools() {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">← Home</Link>
          <span className="text-gray-200">/</span>
          <span className="text-sm font-medium text-gray-900">PDF Tools</span>
        </div>
      </header>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">PDF Tools</h1>
        <p className="text-gray-500 mb-8">Free online PDF tools — no signup, no watermark, no limits.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} className="border border-red-200 bg-red-50 rounded-xl p-5 hover:shadow-md transition-shadow block">
              <div className="font-semibold text-gray-900 mb-1">{tool.name}</div>
              <div className="text-sm text-gray-500">{tool.description}</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}