import Link from "next/link";

const tools = [
  { name: "Image Compressor", description: "Compress JPG and PNG images without losing quality", href: "/image-tools/compress" },
  { name: "Image Resizer", description: "Resize images to any dimension instantly", href: "/image-tools/resize" },
  { name: "Image to PDF", description: "Convert images to PDF in one click", href: "/image-tools/image-to-pdf" },
  { name: "Convert Format", description: "Convert images between JPG, PNG and WebP", href: "/image-tools/convert-format" },
];

export default function ImageTools() {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">← Home</Link>
          <span className="text-gray-200">/</span>
          <span className="text-sm font-medium text-gray-900">Image Tools</span>
        </div>
      </header>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Image Tools</h1>
        <p className="text-gray-500 mb-8">Free online image tools — no signup required.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} className="border border-purple-200 bg-purple-50 rounded-xl p-5 hover:shadow-md transition-shadow block">
              <div className="font-semibold text-gray-900 mb-1">{tool.name}</div>
              <div className="text-sm text-gray-500">{tool.description}</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}