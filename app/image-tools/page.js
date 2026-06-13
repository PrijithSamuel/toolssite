import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TrustBadges from "../components/TrustBadges";

export const metadata = {
  title: "Free Image Tools Online — Compress Resize Convert",
  description: "Free online image tools — compress images, resize images, convert image format, image to PDF. No signup required, works in your browser instantly.",
};

const tools = [
  { name: "Image Compressor", description: "Compress JPG and PNG images without losing quality", href: "/image-tools/compress", icon: "🗜️" },
  { name: "Image Resizer", description: "Resize images to any dimension instantly", href: "/image-tools/resize", icon: "📐" },
  { name: "Image to PDF", description: "Convert images to PDF in one click", href: "/image-tools/image-to-pdf", icon: "📑" },
  { name: "Convert Format", description: "Convert images between JPG, PNG and WebP", href: "/image-tools/convert-format", icon: "🔄" },
  { name: "Photo Print Size Calculator", description: "Check if your photo has enough resolution for print sizes from 10×15cm to 40×60cm", href: "/image-tools/photo-print-size", icon: "🖨️" },
];

const sectionStyle = { background:"white", border:"0.5px solid #E0E7FF", borderRadius:"12px", padding:"24px", marginBottom:"28px" };
const h2Style = { fontSize:"18px", fontWeight:"500", color:"#1E1B4B", marginBottom:"14px" };
const pStyle = { fontSize:"14px", color:"#4B5563", lineHeight:"1.85", marginBottom:"12px" };
const pLast = { fontSize:"14px", color:"#4B5563", lineHeight:"1.85", margin:0 };

export default function ImageTools() {
  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Image Tools" }]} />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Image Tools</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Free online image tools — no signup required.</p>
        </div>
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "24px" }}>
          <p style={{ fontSize: "14px", color: "#4B5563", lineHeight: "1.8" }}>
            Image tools let you compress, resize, convert and transform images directly in your browser. Compress JPG and PNG images to reduce file size without visible quality loss using our quality slider. Resize images to exact pixel dimensions or common presets like HD and Full HD. Convert images between JPG, PNG and WebP formats. Combine multiple images into a single PDF document. All image processing happens locally on your device — your photos are never uploaded to any server.
          </p>
        </div>
        <TrustBadges />
        <div style={sectionStyle}>
          <h2 style={h2Style}>Free Image Tools — Compress, Resize, Convert and Convert to PDF</h2>
          <p style={pStyle}>Image file management is a constant need for website owners, social media managers, bloggers, and anyone who shares visual content online. Large image files slow down websites, fail email attachment size limits, and take excessive storage space. The image tools in this section address the four most common image tasks without requiring software installation, account creation, or file uploads to external servers.</p>
          <p style={pStyle}>The image compressor uses the browser-image-compression library to reduce file sizes by 30-70% while preserving visual quality. Unlike online compression tools that upload your images to cloud servers, all compression happens locally using JavaScript — your photos are never transmitted anywhere. The quality slider gives you precise control over the balance between file size and visual clarity.</p>
          <p style={pLast}>The image resizer supports both exact pixel dimensions and common social media presets including Instagram square 1080x1080px, Instagram story 1080x1920px, and YouTube thumbnail 1280x720px. The format converter handles JPG, PNG, and WebP — the three formats that cover virtually all web use cases. All image processing uses the browser's built-in Canvas API and never involves server-side processing.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} className="tool-card" style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", textDecoration: "none", display: "flex", alignItems: "flex-start", gap: "14px" }}>
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