import Link from "next/link";
import HeroSearch from "./components/HeroSearch";

export const metadata = {
  title: "QuikToolkit — Free Online Tools, No Signup Required",
  description: "Free online tools — PDF converter, calculators, image tools, unit converter and more. No signup, no limits, works in your browser.",
};

const categories = [
  {
    name: "PDF Tools",
    icon: "📄",
    iconBg: "#FEE2E2",
    count: 4,
    slug: "pdf",
    tools: ["PDF to Text", "Compress PDF", "Merge PDF", "Split PDF"],
  },
  {
    name: "Calculators",
    icon: "🧮",
    iconBg: "#DBEAFE",
    count: 8,
    slug: "calculators",
    tools: ["Tip Calculator", "Discount Calculator", "GPA Calculator", "Scientific"],
  },
  {
    name: "Finance",
    icon: "💰",
    iconBg: "#D1FAE5",
    count: 4,
    slug: "finance",
    tools: ["Loan Calculator", "Compound Interest", "Salary Calculator", "Invoice"],
  },
  {
    name: "Health",
    icon: "🏥",
    iconBg: "#FCE7F3",
    count: 3,
    slug: "health",
    tools: ["Calorie Calculator", "Water Intake", "Ideal Weight"],
  },
  {
    name: "Converters",
    icon: "🔄",
    iconBg: "#CCFBF1",
    count: 6,
    slug: "converters",
    tools: ["Unit Converter", "Time Zone", "Number Base", "Color Converter"],
  },
  {
    name: "Text Tools",
    icon: "✍️",
    iconBg: "#FEF9C3",
    count: 9,
    slug: "text-tools",
    tools: ["Word Counter", "Text Compare", "Lorem Ipsum", "Sort Lines"],
  },
  {
    name: "Image Tools",
    icon: "🖼️",
    iconBg: "#EDE9FE",
    count: 4,
    slug: "image-tools",
    tools: ["Compress Image", "Resize Image", "Image to PDF", "Convert Format"],
  },
  {
    name: "Developer Tools",
    icon: "⚙️",
    iconBg: "#F1F5F9",
    count: 9,
    slug: "developer-tools",
    tools: ["UUID Generator", "Hash Generator", "Base64 Encoder", "Markdown"],
  },
  {
    name: "SEO Tools",
    icon: "🔍",
    iconBg: "#FEF3C7",
    count: 2,
    slug: "seo-tools",
    tools: ["Meta Tag Generator", "Word Density"],
  },
];

const popularTools = [
  { name: "Merge PDF", desc: "Combine PDFs into one", icon: "📄", iconBg: "#FEE2E2", href: "/pdf/merge", badge: "Hot" },
  { name: "EMI Calculator", desc: "Calculate loan EMI", icon: "🧮", iconBg: "#DBEAFE", href: "/calculators/emi", badge: "Popular" },
  { name: "Image Compressor", desc: "Reduce image size", icon: "🖼️", iconBg: "#D1FAE5", href: "/image-tools/compress", badge: "Hot" },
  { name: "Word Counter", desc: "Count words instantly", icon: "✍️", iconBg: "#FEF9C3", href: "/text-tools/word-counter", badge: "Popular" },
  { name: "Password Generator", desc: "Strong secure passwords", icon: "🔑", iconBg: "#EDE9FE", href: "/developer-tools/password-generator", badge: "New" },
  { name: "Unit Converter", desc: "Convert any unit", icon: "🔄", iconBg: "#D1FAE5", href: "/converters/unit", badge: "Popular" },
  { name: "QR Code Generator", desc: "Generate QR codes free", icon: "📱", iconBg: "#F1F5F9", href: "/developer-tools/qr-code", badge: "New" },
  { name: "BMI Calculator", desc: "Check your BMI", icon: "⚖️", iconBg: "#DBEAFE", href: "/calculators/bmi", badge: "Popular" },
];

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>

      {/* Navigation */}
      <nav style={{ background: "#4F46E5" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", height: "56px" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", marginRight: "32px", textDecoration: "none" }}>
            <div style={{ width: "30px", height: "30px", background: "rgba(255,255,255,0.2)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>🛠️</div>
            <span style={{ fontSize: "16px", fontWeight: "500", color: "white" }}>QuikToolkit</span>
          </Link>
          <div style={{ display: "flex", flex: 1 }}>
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/${cat.slug}`} style={{ padding: "0 12px", height: "56px", display: "flex", alignItems: "center", fontSize: "13px", color: "rgba(255,255,255,0.85)", textDecoration: "none", whiteSpace: "nowrap" }}>
                {cat.name.replace(" Tools", "").replace("Developer", "Dev")}
              </Link>
            ))}
          </div>
          <Link href="/search" style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.15)", border: "0.5px solid rgba(255,255,255,0.3)", borderRadius: "20px", padding: "5px 14px", textDecoration: "none", width: "180px" }}>
            <span style={{ fontSize: "13px" }}>🔍</span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>Search tools...</span>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: "#4F46E5", padding: "48px 24px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.15)", border: "0.5px solid rgba(255,255,255,0.3)", borderRadius: "20px", padding: "4px 14px", fontSize: "12px", color: "white", fontWeight: "500", marginBottom: "16px" }}>
            ✓ 100% Free — No Signup Required
          </div>
          <h1 style={{ fontSize: "34px", fontWeight: "500", color: "white", marginBottom: "10px", lineHeight: "1.25" }}>
            Free Online Tools for Everyone
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)", marginBottom: "24px" }}>
            PDF, calculators, image tools, converters and more. Works entirely in your browser.
          </p>

          <HeroSearch />

          {/* Stats */}
          <div style={{ display: "flex", justifyContent: "center", gap: "36px" }}>
            {[["65+", "Free tools"], ["0", "Signups needed"], ["100%", "Browser based"], ["9", "Categories"]].map(([num, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "20px", fontWeight: "500", color: "white" }}>{num}</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.65)", marginTop: "2px" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 24px" }}>

        {/* Popular tools */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: "500", color: "#1E1B4B" }}>Most popular tools</h2>
          <Link href="/search" style={{ fontSize: "13px", color: "#4F46E5", textDecoration: "none", fontWeight: "500" }}>See all →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "36px" }}>
          {popularTools.map((tool) => (
            <Link key={tool.href} href={tool.href} style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px", textAlign: "center", textDecoration: "none", display: "block" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: tool.iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", margin: "0 auto 10px" }}>
                {tool.icon}
              </div>
              <div style={{ fontSize: "12px", fontWeight: "500", color: "#1E1B4B", marginBottom: "4px" }}>{tool.name}</div>
              <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "8px" }}>{tool.desc}</div>
              <span style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "4px", background: "#EEF2FF", color: "#4F46E5", fontWeight: "500" }}>{tool.badge}</span>
            </Link>
          ))}
        </div>

        {/* Categories */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: "500", color: "#1E1B4B" }}>Browse by category</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/${cat.slug}`} style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "18px", textDecoration: "none", display: "block" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: cat.iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>
                  {cat.icon}
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "500", color: "#1E1B4B" }}>{cat.name}</div>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "500" }}>{cat.count} tools</div>
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {cat.tools.map((tool) => (
                  <span key={tool} style={{ fontSize: "11px", padding: "3px 8px", borderRadius: "5px", color: "#4338CA", background: "#EEF2FF", border: "0.5px solid #C7D2FE" }}>
                    {tool}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: "#4F46E5", padding: "20px 24px", marginTop: "40px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>QuikToolkit — Free tools for everyone. No signup, no limits.</span>
          <div style={{ display: "flex", gap: "20px" }}>
            {[["Privacy Policy", "/privacy-policy"], ["Terms", "/terms"], ["Contact", "mailto:contact@quiktoolkit.com"]].map(([label, href]) => (
              <Link key={label} href={href} style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>{label}</Link>
            ))}
          </div>
        </div>
      </footer>

    </main>
  );
}