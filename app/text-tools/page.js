import Link from "next/link";

const tools = [
  { name: "Word Counter", description: "Count words, characters and sentences", href: "/text-tools/word-counter" },
  { name: "Case Converter", description: "Convert text to UPPER, lower or Title Case", href: "/text-tools/case-converter" },
  { name: "Text Reverser", description: "Reverse any text instantly", href: "/text-tools/text-reverser" },
  { name: "Remove Duplicates", description: "Remove duplicate lines from text", href: "/text-tools/remove-duplicates" },
];

export const metadata = {
  title: "Free Text Tools — Word Counter, Case Converter, Text Reverser",
  description: "Free online text tools — word counter, case converter, text reverser, remove duplicates and more. No signup required.",
};

export default function TextTools() {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">← Home</Link>
          <span className="text-gray-200">/</span>
          <span className="text-sm font-medium text-gray-900">Text Tools</span>
        </div>
      </header>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Text Tools</h1>
        <p className="text-gray-500 mb-8">Free online text tools — no signup required.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} className="border border-yellow-200 bg-yellow-50 rounded-xl p-5 hover:shadow-md transition-shadow block">
              <div className="font-semibold text-gray-900 mb-1">{tool.name}</div>
              <div className="text-sm text-gray-500">{tool.description}</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}