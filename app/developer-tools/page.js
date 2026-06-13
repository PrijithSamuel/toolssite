import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Free Developer Tools — JSON Formatter QR Code Regex",
  description: "Free online developer tools — JSON formatter, QR code generator, regex tester, password generator, base64 encoder and more. No signup required.",
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
  { name: "HTML Encoder / Decoder", description: "Encode HTML special characters or decode HTML entities", href: "/developer-tools/html-encoder", icon: "🔤" },
  { name: "Image to Base64", description: "Convert any image to Base64 string, data URI and img tag", href: "/developer-tools/image-to-base64", icon: "🖼️" },
  { name: "CSS Gradient Generator", description: "Build linear or radial gradients visually with live preview", href: "/developer-tools/css-gradient", icon: "🎨" },
  { name: "Password Strength Checker", description: "Analyse password strength with entropy estimate and improvement tips", href: "/developer-tools/password-strength", icon: "🔐" },
];

const sectionStyle = { background:"white", border:"0.5px solid #E0E7FF", borderRadius:"12px", padding:"24px", marginBottom:"28px" };
const h2Style = { fontSize:"18px", fontWeight:"500", color:"#1E1B4B", marginBottom:"14px" };
const pStyle = { fontSize:"14px", color:"#4B5563", lineHeight:"1.85", marginBottom:"12px" };
const pLast = { fontSize:"14px", color:"#4B5563", lineHeight:"1.85", margin:0 };

export default function DeveloperTools() {
  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Developer Tools" }]} />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Developer Tools</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Free online developer tools — no signup required.</p>
        </div>
        <div style={sectionStyle}>
          <h2 style={h2Style}>Free Developer Tools — JSON, Base64, Regex, QR Code and More</h2>
          <p style={pStyle}>Developer utility tools are used dozens of times per day by software engineers, web developers, and technical analysts. Having these tools available instantly in a browser tab — without installing extensions, opening terminal windows, or navigating complex software interfaces — saves significant time in development and debugging workflows.</p>
          <p style={pStyle}>The JSON formatter validates JSON syntax and shows the exact line and character position of any error — critical when debugging API responses that arrive as compressed single-line strings. The regex tester provides live match highlighting as you type your pattern, with preset patterns for the most commonly needed expressions including email, URL, phone number, IP address, date, and hex colour code validation.</p>
          <p style={pLast}>The QR code generator, password generator, UUID generator, Base64 encoder, and URL encoder all generate output entirely within your browser using cryptographically secure random number generation where applicable. No inputs, generated values, or results are transmitted to any server or logged anywhere.</p>
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
