import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Free Developer Tools — UUID, Hash, JSON, Base64, Regex, Markdown",
  description: "Free online developer tools — UUID generator, hash generator, JSON formatter, Base64 encoder, regex tester, markdown previewer and more. No signup required.",
};

const tools = [
  { name: "JSON Formatter", description: "Format, minify and validate JSON instantly", href: "/developer-tools/json-formatter", icon: "📋" },
  { name: "QR Code Generator", description: "Generate QR codes for any text or URL", href: "/developer-tools/qr-code", icon: "📱" },
  { name: "Regex Tester", description: "Test and debug regular expressions instantly", href: "/developer-tools/regex-tester", icon: "🔍" },
  { name: "Password Generator", description: "Generate strong, secure passwords instantly", href: "/developer-tools/password-generator", icon: "🔑" },
  { name: "Base64 Encoder/Decoder", description: "Encode text to Base64 or decode Base64 strings", href: "/developer-tools/base64", icon: "🔐" },
  { name: "URL Encoder/Decoder", description: "Encode or decode URL percent-encoded strings", href: "/developer-tools/url-encoder", icon: "🔗" },
  { name: "Markdown Previewer", description: "Write Markdown and see a live HTML preview", href: "/developer-tools/markdown", icon: "📝" },
  { name: "UUID Generator", description: "Generate cryptographically random UUID v4 values", href: "/developer-tools/uuid-generator", icon: "🎲" },
  { name: "Hash Generator", description: "Generate MD5, SHA-1 and SHA-256 hashes from text", href: "/developer-tools/hash-generator", icon: "🔒" },
];

export default function DeveloperTools() {
  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Developer Tools" }]} />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Developer Tools</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Free online developer tools — no signup required.</p>
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
