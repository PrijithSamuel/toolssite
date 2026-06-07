import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Free Engineering Tools — Ohm's Law, Resistor Color, Aspect Ratio, PPI",
  description: "Free online engineering tools — Ohm's Law calculator, resistor color code decoder, aspect ratio calculator and PPI calculator. No signup required.",
};

const tools = [
  { name: "Ohm's Law Calculator", description: "Calculate Voltage, Current, Resistance or Power from any two known values", href: "/engineering/ohms-law", icon: "⚡" },
  { name: "Resistor Color Code", description: "Decode 4-band resistor color codes to resistance and tolerance", href: "/engineering/resistor-color", icon: "🎨" },
  { name: "Aspect Ratio Calculator", description: "Simplify pixel dimensions to a ratio or calculate a missing dimension", href: "/engineering/aspect-ratio", icon: "📐" },
  { name: "PPI Calculator", description: "Calculate pixels per inch, megapixels and dot pitch for any screen", href: "/engineering/ppi-calculator", icon: "🖥️" },
];

export default function Engineering() {
  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Engineering" }]} />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Engineering Tools</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Free online engineering calculators — no signup required.</p>
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
