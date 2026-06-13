import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Free Health Calculators — BMI Calorie Sleep Tools",
  description: "Free health calculators — BMI calculator, calorie calculator, water intake, ideal weight, body fat calculator and more. No signup required.",
};

const tools = [
  { name: "Calorie Calculator", description: "Calculate BMR and daily calorie needs using Mifflin-St Jeor", href: "/health/calorie-calculator", icon: "🔥" },
  { name: "Water Intake Calculator", description: "Recommended daily water intake based on weight and activity", href: "/health/water-intake", icon: "💧" },
  { name: "Ideal Weight Calculator", description: "Calculate ideal weight using 4 medical formulas", href: "/health/ideal-weight", icon: "⚖️" },
  { name: "Body Fat Calculator", description: "US Navy method body fat percentage with category breakdown", href: "/health/body-fat", icon: "📊" },
  { name: "Sleep Calculator", description: "Ideal bedtimes and wake times based on 90-min sleep cycles", href: "/health/sleep-calculator", icon: "😴" },
  { name: "Calories Burned", description: "Calories burned by activity using MET values with food equivalents", href: "/health/calories-burned", icon: "🔥" },
  { name: "Pregnancy Due Date", description: "Estimated due date, trimester, weeks remaining and milestone timeline", href: "/health/pregnancy-due-date", icon: "🤰" },
  { name: "Running Pace Calculator", description: "Calculate pace, finish time or distance with per-km splits", href: "/health/running-pace", icon: "🏃" },
];

const sectionStyle = { background:"white", border:"0.5px solid #E0E7FF", borderRadius:"12px", padding:"24px", marginBottom:"28px" };
const h2Style = { fontSize:"18px", fontWeight:"500", color:"#1E1B4B", marginBottom:"14px" };
const pStyle = { fontSize:"14px", color:"#4B5563", lineHeight:"1.85", marginBottom:"12px" };
const pLast = { fontSize:"14px", color:"#4B5563", lineHeight:"1.85", margin:0 };

export default function Health() {
  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Health" }]} />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Health Calculators</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Free science-based health calculators — no signup required.</p>
        </div>
        <div style={sectionStyle}>
          <h2 style={h2Style}>Free Health Calculators — BMI, Calories, Sleep, Hydration and More</h2>
          <p style={pStyle}>Health calculators provide reference values based on established medical and scientific formulas. They are useful for understanding your current health metrics, setting realistic targets, and having informed conversations with healthcare professionals. These tools are not a substitute for medical advice — they provide educational context based on population-level research.</p>
          <p style={pStyle}>The BMI calculator follows the World Health Organization's classification system with an important caveat clearly explained: BMI does not distinguish between muscle and fat mass, and has known limitations for athletes, elderly individuals, and certain ethnic populations. The calorie calculator uses the Mifflin-St Jeor equation — the formula most widely validated in clinical research for estimating basal metabolic rate.</p>
          <p style={pLast}>The sleep calculator uses 90-minute sleep cycle research to show the optimal wake times that align with the natural sleep architecture — the cycling between light sleep, deep sleep, and REM sleep that occurs throughout the night. Waking at the end of a complete cycle rather than mid-cycle significantly reduces the grogginess that makes waking up difficult.</p>
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
