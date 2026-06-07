import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Free Online Converters — Unit Currency Color",
  description: "Free online converters — unit converter for length weight temperature, currency converter for 20 currencies, color converter HEX RGB HSL. No signup needed.",
};

const tools = [
  { name: "Unit Converter", description: "Convert length, weight, temperature, speed and more", href: "/converters/unit", icon: "📏" },
  { name: "Currency Converter", description: "Convert between 20 world currencies instantly", href: "/converters/currency", icon: "💱" },
  { name: "Color Converter", description: "Convert HEX, RGB, HSL color codes", href: "/converters/color", icon: "🎨" },
  { name: "Image Converter", description: "Convert images between JPG, PNG and WebP", href: "/image-tools/convert-format", icon: "🖼️" },
  { name: "Time Zone Converter", description: "Convert date and time between world time zones", href: "/converters/timezone", icon: "🌐" },
  { name: "Number Base Converter", description: "Convert numbers between Binary, Octal, Decimal, Hex", href: "/converters/number-base", icon: "🔢" },
  { name: "Clothing Size Converter", description: "Convert EU, US and UK clothing and shoe sizes for men and women", href: "/converters/clothing-size", icon: "👗" },
  { name: "Cooking Measurement Converter", description: "Convert cups, tablespoons, ounces, pounds and oven temperatures", href: "/converters/cooking-units", icon: "🍳" },
];

export default function Converters() {
  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Converters" }]} />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Converters</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Free online converters — no signup required.</p>
        </div>
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "24px" }}>
          <p style={{ fontSize: "14px", color: "#4B5563", lineHeight: "1.8" }}>
            Unit converters are essential for students, engineers, travelers and anyone working with international measurements. Convert between metric and imperial units for length, weight, temperature, speed, area and volume. Convert between 20 world currencies with our currency converter. Transform color codes between HEX, RGB and HSL formats for web design. All converters update instantly as you type with no page reload required.
          </p>
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
