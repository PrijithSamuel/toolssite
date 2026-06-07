import Link from "next/link";
import HeroSearch from "./components/HeroSearch";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
    count: 55,
    slug: "finance",
    tools: ["Loan Calculator", "Compound Interest", "Salary Calculator", "Invoice"],
  },
  {
    name: "Health",
    icon: "🏥",
    iconBg: "#FCE7F3",
    count: 8,
    slug: "health",
    tools: ["Calorie Calculator", "Water Intake", "Ideal Weight"],
  },
  {
    name: "Converters",
    icon: "🔄",
    iconBg: "#CCFBF1",
    count: 8,
    slug: "converters",
    tools: ["Unit Converter", "Time Zone", "Number Base", "Color Converter"],
  },
  {
    name: "Text Tools",
    icon: "✍️",
    iconBg: "#FEF9C3",
    count: 17,
    slug: "text-tools",
    tools: ["Word Counter", "Text Compare", "Lorem Ipsum", "Sort Lines"],
  },
  {
    name: "Image Tools",
    icon: "🖼️",
    iconBg: "#EDE9FE",
    count: 5,
    slug: "image-tools",
    tools: ["Compress Image", "Resize Image", "Image to PDF", "Convert Format"],
  },
  {
    name: "Developer Tools",
    icon: "⚙️",
    iconBg: "#F1F5F9",
    count: 13,
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
  {
    name: "Timer Tools",
    icon: "⏱️",
    iconBg: "#FEE2E2",
    count: 3,
    slug: "timer-tools",
    tools: ["Stopwatch", "Countdown Timer", "Pomodoro"],
  },
  {
    name: "Random Tools",
    icon: "🎲",
    iconBg: "#EDE9FE",
    count: 4,
    slug: "random-tools",
    tools: ["Random Number", "Coin Flip", "Name Picker", "Spin Wheel"],
  },
  {
    name: "Math Tools",
    icon: "📐",
    iconBg: "#DBEAFE",
    count: 10,
    slug: "math-tools",
    tools: ["Fraction Calc", "% Change", "Prime Checker"],
  },
  {
    name: "Date Tools",
    icon: "📅",
    iconBg: "#D1FAE5",
    count: 3,
    slug: "date-tools",
    tools: ["Date Difference", "Days Until", "Unix Timestamp"],
  },
  {
    name: "Food Tools",
    icon: "👨‍🍳",
    iconBg: "#FEF9C3",
    count: 3,
    slug: "food-tools",
    tools: ["Recipe Converter", "Cooking Converter", "Calorie Counter"],
  },
  {
    name: "Student Tools",
    icon: "🎓",
    iconBg: "#DBEAFE",
    count: 3,
    slug: "student-tools",
    tools: ["Grade Calculator", "Study Timer", "Citation Generator"],
  },
  {
    name: "Engineering",
    icon: "🔧",
    iconBg: "#F0FDF4",
    count: 4,
    slug: "engineering",
    tools: ["Ohm's Law", "Resistor Color", "Aspect Ratio", "PPI Calc"],
  },
  {
    name: "Games & Fun",
    icon: "🎮",
    iconBg: "#EDE9FE",
    count: 4,
    slug: "games",
    tools: ["Reaction Time", "Typing Speed", "Rock Paper Scissors", "Memory Game"],
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
    <main id="main-content" role="main" className="min-h-screen" style={{ background: "#F5F3FF" }}>

      <Header />

      {/* Hero */}
      <div style={{ background: "#4F46E5", padding: "48px 24px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.15)", border: "0.5px solid rgba(255,255,255,0.3)", borderRadius: "20px", padding: "4px 14px", fontSize: "12px", color: "white", fontWeight: "500", marginBottom: "16px" }}>
            ✓ 100+ Free Tools — No Signup Required
          </div>
          <h1 style={{ fontSize: "34px", fontWeight: "500", color: "white", marginBottom: "10px", lineHeight: "1.25" }}>
            QuikToolkit — Free Online Tools for Everyone
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)", marginBottom: "24px" }}>
            PDF, calculators, image tools, converters and more. Works entirely in your browser.
          </p>

          <HeroSearch />

          {/* Stats */}
          <div style={{ display: "flex", justifyContent: "center", gap: "36px", marginBottom: "20px" }}>
            {[["100+", "Free tools"], ["0", "Signups needed"], ["100%", "Browser based"], ["17", "Categories"]].map(([num, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "20px", fontWeight: "500", color: "white" }}>{num}</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.65)", marginTop: "2px" }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Trust indicators */}
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap" }}>
            {[
              { icon: "🔒", text: "Files never leave your device" },
              { icon: "⚡", text: "Works in your browser" },
              { icon: "💯", text: "Always free, no signup" },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: "rgba(255,255,255,0.15)", border: "0.5px solid rgba(255,255,255,0.3)", borderRadius: "20px", padding: "4px 12px", fontSize: "12px", color: "rgba(255,255,255,0.9)", fontWeight: "500" }}>
                <span aria-hidden="true">{icon}</span><span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 24px" }}>

        {/* Popular tools */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: "500", color: "#1E1B4B" }}>Most Popular Free Online Tools</h2>
          <Link href="/search" style={{ fontSize: "13px", color: "#4F46E5", textDecoration: "none", fontWeight: "500" }}>See all →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "10px", marginBottom: "36px" }}>
          {popularTools.map((tool) => (
            <Link key={tool.href} href={tool.href} className="tool-card" style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px", textAlign: "center", textDecoration: "none", display: "block" }}>
              <div aria-hidden="true" style={{ width: "44px", height: "44px", borderRadius: "10px", background: tool.iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", margin: "0 auto 10px" }}>
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
          <h2 style={{ fontSize: "16px", fontWeight: "500", color: "#1E1B4B" }}>Browse All Tool Categories — PDF, Calculators, Converters &amp; More</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/${cat.slug}`} className="cat-card" style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "18px", textDecoration: "none", display: "block" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <div aria-hidden="true" style={{ width: "36px", height: "36px", borderRadius: "8px", background: cat.iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>
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

      <Footer />

    </main>
  );
}
