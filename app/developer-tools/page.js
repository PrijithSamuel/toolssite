import Link from "next/link";

const tools = [
  { name: "Password Generator", description: "Generate strong, secure passwords instantly", href: "/developer-tools/password-generator" },
  { name: "JSON Formatter", description: "Format and validate JSON data instantly", href: "/developer-tools/json-formatter" },
  { name: "QR Code Generator", description: "Generate QR codes for any text or URL", href: "/developer-tools/qr-code" },
];

export default function DeveloperTools() {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">← Home</Link>
          <span className="text-gray-200">/</span>
          <span className="text-sm font-medium text-gray-900">Developer Tools</span>
        </div>
      </header>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Developer Tools</h1>
        <p className="text-gray-500 mb-8">Free online developer tools — no signup required.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} className="border border-gray-200 bg-gray-50 rounded-xl p-5 hover:shadow-md transition-shadow block">
              <div className="font-semibold text-gray-900 mb-1">{tool.name}</div>
              <div className="text-sm text-gray-500">{tool.description}</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}