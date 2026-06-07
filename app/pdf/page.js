import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TrustBadges from "../components/TrustBadges";

export const metadata = {
  title: "Free PDF Tools — Compress, Merge, Split PDF",
  description: "Free online PDF tools. Compress, merge, split PDF files and extract text. No signup, no watermark, no limits.",
};

const tools = [
  { name: "Merge PDF", description: "Combine multiple PDF files into one", href: "/pdf/merge", icon: "📎" },
  { name: "Split PDF", description: "Split a PDF into separate pages or extract specific pages", href: "/pdf/split", icon: "✂️" },
  { name: "Compress PDF", description: "Reduce PDF file size without losing quality", href: "/pdf/compress", icon: "🗜️" },
  { name: "PDF to Text", description: "Extract text content from any PDF file", href: "/pdf/pdf-to-text", icon: "📝" },
];

export default function PDFTools() {
  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "PDF Tools" }]} />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>PDF Tools</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Free online PDF tools — no signup, no watermark, no limits.</p>
        </div>
        <TrustBadges />
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