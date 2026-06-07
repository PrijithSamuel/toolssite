import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Free Image Tools — Compress, Resize, Convert Images",
  description: "Free online image tools — compress, resize, convert format and convert to PDF. No signup required.",
};

const tools = [
  { name: "Image Compressor", description: "Compress JPG and PNG images without losing quality", href: "/image-tools/compress", icon: "🗜️" },
  { name: "Image Resizer", description: "Resize images to any dimension instantly", href: "/image-tools/resize", icon: "📐" },
  { name: "Image to PDF", description: "Convert images to PDF in one click", href: "/image-tools/image-to-pdf", icon: "📑" },
  { name: "Convert Format", description: "Convert images between JPG, PNG and WebP", href: "/image-tools/convert-format", icon: "🔄" },
  { name: "Photo Print Size Calculator", description: "Check if your photo has enough resolution for print sizes from 10×15cm to 40×60cm", href: "/image-tools/photo-print-size", icon: "🖨️" },
];

export default function ImageTools() {
  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Image Tools" }]} />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Image Tools</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Free online image tools — no signup required.</p>
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