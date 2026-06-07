import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Free Online Calculators — EMI BMI Age Percentage",
  description: "Free online calculators — EMI loan calculator, BMI calculator, age calculator, percentage calculator and more. Instant results, no signup required.",
};

const tools = [
  { name: "Percentage Calculator", description: "Calculate percentages, increases and decreases", href: "/calculators/percentage", icon: "%" },
  { name: "EMI Calculator", description: "Calculate loan EMI, interest and total payment", href: "/calculators/emi", icon: "🏦" },
  { name: "BMI Calculator", description: "Calculate your Body Mass Index instantly", href: "/calculators/bmi", icon: "⚖️" },
  { name: "Age Calculator", description: "Calculate exact age from date of birth", href: "/calculators/age", icon: "🎂" },
  { name: "Tip Calculator", description: "Calculate tip and split the bill between people", href: "/calculators/tip", icon: "🍽️" },
  { name: "Discount Calculator", description: "Find final price and savings after a discount", href: "/calculators/discount", icon: "🏷️" },
  { name: "Scientific Calculator", description: "Full calculator with sin, cos, log, sqrt and more", href: "/calculators/scientific", icon: "🔬" },
  { name: "GPA Calculator", description: "Calculate GPA from course grades and credit hours", href: "/calculators/gpa", icon: "🎓" },
];

export default function Calculators() {
  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Calculators" }]} />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Calculators</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Free online calculators — no signup required.</p>
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
