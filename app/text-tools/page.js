import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Free Text Tools — Word Counter, Case Converter, Text Reverser",
  description: "Free online text tools — word counter, case converter, text reverser, remove duplicates and more. No signup required.",
};

const tools = [
  { name: "Word Counter", description: "Count words, characters, sentences and paragraphs", href: "/text-tools/word-counter", icon: "✍️" },
  { name: "Case Converter", description: "Convert text to UPPER, lower or Title Case", href: "/text-tools/case-converter", icon: "🔤" },
  { name: "Text Reverser", description: "Reverse any text instantly", href: "/text-tools/text-reverser", icon: "🔁" },
  { name: "Remove Duplicates", description: "Remove duplicate lines from text", href: "/text-tools/remove-duplicates", icon: "🗑️" },
  { name: "Lorem Ipsum Generator", description: "Generate placeholder text instantly", href: "/text-tools/lorem-ipsum", icon: "📄" },
  { name: "Text to Slug", description: "Convert text to URL-friendly slug", href: "/text-tools/text-to-slug", icon: "🔗" },
  { name: "Line Counter", description: "Count lines and get line statistics", href: "/text-tools/line-counter", icon: "🔢" },
  { name: "Sort Lines", description: "Sort lines alphabetically, by length or randomly", href: "/text-tools/sort-lines", icon: "↕️" },
];

export default function TextTools() {
  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Text Tools" }]} />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Text Tools</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Free online text tools — no signup required.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", textDecoration: "none", display: "flex", alignItems: "flex-start", gap: "14px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>
                {tool.icon}
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "500", color: "#1E1B4B", marginBottom: "4px" }}>{tool.name}</div>
                <div style={{ fontSize: "13px", color: "#6B7280" }}>{tool.description}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}