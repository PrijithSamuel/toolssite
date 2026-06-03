import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Free Health Calculators — Calories, Water Intake, Ideal Weight",
  description: "Free online health calculators — calorie calculator, water intake, ideal weight. Based on scientific formulas. No signup required.",
};

const tools = [
  { name: "Calorie Calculator", description: "Calculate BMR and daily calorie needs using Mifflin-St Jeor", href: "/health/calorie-calculator", icon: "🔥" },
  { name: "Water Intake Calculator", description: "Recommended daily water intake based on weight and activity", href: "/health/water-intake", icon: "💧" },
  { name: "Ideal Weight Calculator", description: "Calculate ideal weight using 4 medical formulas", href: "/health/ideal-weight", icon: "⚖️" },
];

export default function Health() {
  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Health" }]} />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Health Calculators</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Free science-based health calculators — no signup required.</p>
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
