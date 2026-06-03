import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Free Food Tools — Recipe Converter, Calorie Counter, Cooking Converter",
  description: "Free online food tools — scale recipe servings, convert cooking measurements, count calories. No signup required.",
};

const tools = [
  { name: "Recipe Converter", description: "Scale recipe ingredients up or down for any number of servings", href: "/food-tools/recipe-converter", icon: "👨‍🍳" },
  { name: "Cooking Converter", description: "Convert weights, volumes and oven temperatures for cooking", href: "/food-tools/cooking-converter", icon: "⚖️" },
  { name: "Calorie Counter", description: "Add foods and track your daily calorie intake", href: "/food-tools/calorie-counter", icon: "🥗" },
];

export default function FoodTools() {
  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Food Tools" }]} />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Food Tools</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Free online food and cooking tools — no signup required.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", textDecoration: "none", display: "flex", alignItems: "flex-start", gap: "14px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>{tool.icon}</div>
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
