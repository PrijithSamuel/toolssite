import Link from "next/link";

const categories = [
  {
    name: "PDF Tools",
    description: "Convert, compress, merge and split PDF files",
    icon: "📄",
    color: "bg-red-50 border-red-200",
    iconBg: "bg-red-100",
    tools: ["PDF to Word", "Compress PDF", "Merge PDF", "Split PDF"],
    slug: "pdf",
  },
  {
    name: "Calculators",
    description: "Percentage, EMI, BMI and more calculators",
    icon: "🧮",
    color: "bg-blue-50 border-blue-200",
    iconBg: "bg-blue-100",
    tools: ["Percentage Calculator", "EMI Calculator", "BMI Calculator", "Age Calculator"],
    slug: "calculators",
  },
  {
    name: "Converters",
    description: "Unit, currency and image converters",
    icon: "🔄",
    color: "bg-green-50 border-green-200",
    iconBg: "bg-green-100",
    tools: ["Unit Converter", "Currency Converter", "Image Converter", "Color Converter"],
    slug: "converters",
  },
  {
    name: "Image Tools",
    description: "Compress, resize and convert images",
    icon: "🖼️",
    color: "bg-purple-50 border-purple-200",
    iconBg: "bg-purple-100",
    tools: ["Compress Image", "Resize Image", "Image to PDF", "Convert Format"],
    slug: "image-tools",
  },
  {
    name: "Text Tools",
    description: "Word counter, case converter and more",
    icon: "✍️",
    color: "bg-yellow-50 border-yellow-200",
    iconBg: "bg-yellow-100",
    tools: ["Word Counter", "Case Converter", "Remove Duplicates", "Text Reverser"],
    slug: "text-tools",
  },
  {
    name: "Developer Tools",
    description: "JSON formatter, Base64, regex tester",
    icon: "⚙️",
    color: "bg-gray-50 border-gray-200",
    iconBg: "bg-gray-100",
    tools: ["JSON Formatter", "Base64 Encoder", "Regex Tester", "Password Generator"],
    slug: "developer-tools",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      {/* Header */}
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-gray-900">ToolsKit</span>
            <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Free</span>
          </div>
          <nav className="flex gap-6 text-sm text-gray-500">
            <a href="#tools" className="hover:text-gray-900">Tools</a>
            <a href="#about" className="hover:text-gray-900">About</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 py-16 text-center bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Free Online Tools — No Signup Required
          </h1>
          <p className="text-lg text-gray-500 mb-8">
            PDF converter, calculators, image tools and more. 100% free, works in your browser, no account needed.
          </p>
          <a href="#tools" className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
            Browse All Tools
          </a>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">All Tools</h2>
          <p className="text-gray-500 text-center mb-10">Click any category to explore the tools</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/${cat.slug}`} className={`border rounded-xl p-6 ${cat.color} hover:shadow-md transition-shadow cursor-pointer block`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg ${cat.iconBg} flex items-center justify-center text-xl`}>
                    {cat.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900">{cat.name}</h3>
                </div>
                <p className="text-sm text-gray-500 mb-4">{cat.description}</p>
                <ul className="space-y-1">
                  {cat.tools.map((tool) => (
                    <li key={tool} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="w-1 h-1 bg-gray-400 rounded-full inline-block"></span>
                      {tool}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="border-t border-gray-100 px-6 py-8 text-center text-sm text-gray-400">
        <p>ToolsKit — Free online tools for everyone. No signup, no limits.</p>
      </footer>

    </main>
  );
}