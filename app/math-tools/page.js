import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Free Math Tools — Calculator Solver Converter",
  description: "Free online math tools — fraction calculator, quadratic solver, LCM GCD calculator, standard deviation, roman numerals and more. Instant results.",
};

const tools = [
  { name: "Fraction Calculator", description: "Add, subtract, multiply and divide fractions with step-by-step solutions", href: "/math-tools/fraction-calculator", icon: "½" },
  { name: "Percentage Change", description: "Calculate percentage of, what percent, and percent increase/decrease", href: "/math-tools/percentage-change", icon: "%" },
  { name: "Prime Checker", description: "Check if a number is prime, find factors and list primes", href: "/math-tools/prime-checker", icon: "🔢" },
  { name: "LCM & GCD Calculator", description: "Find LCM and GCD of up to 5 numbers with prime factorization", href: "/math-tools/lcm-gcd", icon: "÷" },
  { name: "Quadratic Equation Solver", description: "Solve ax² + bx + c = 0 with roots, discriminant and vertex", href: "/math-tools/quadratic", icon: "²" },
  { name: "Standard Deviation", description: "Calculate mean, median, mode, variance and standard deviation", href: "/math-tools/standard-deviation", icon: "σ" },
  { name: "Roman Numerals", description: "Convert numbers to Roman numerals or decode Roman numerals", href: "/math-tools/roman-numerals", icon: "Ⅻ" },
  { name: "Area Calculator", description: "Calculate area of square, rectangle, triangle, circle and 5 more shapes", href: "/math-tools/area-calculator", icon: "📐" },
  { name: "Volume Calculator", description: "Calculate volume of cube, sphere, cylinder, cone and more 3D shapes", href: "/math-tools/volume-calculator", icon: "📦" },
  { name: "Percentage Calculator", description: "Three percentage calculators on one page: X% of Y, X is what % of Y, and % change", href: "/math-tools/percentage-calc", icon: "%" },
];

const sectionStyle = { background:"white", border:"0.5px solid #E0E7FF", borderRadius:"12px", padding:"24px", marginBottom:"28px" };
const h2Style = { fontSize:"18px", fontWeight:"500", color:"#1E1B4B", marginBottom:"14px" };
const pStyle = { fontSize:"14px", color:"#4B5563", lineHeight:"1.85", marginBottom:"12px" };
const pLast = { fontSize:"14px", color:"#4B5563", lineHeight:"1.85", margin:0 };

export default function MathTools() {
  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Math Tools" }]} />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Math Tools</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Free online math tools — no signup required.</p>
        </div>
        <div style={sectionStyle}>
          <h2 style={h2Style}>Free Math Tools — Fractions, Statistics, Geometry and Number Systems</h2>
          <p style={pStyle}>Mathematics tools bridge the gap between understanding a formula and applying it correctly to real numbers. These calculators show step-by-step working alongside results — not just the final answer — which makes them genuinely useful for learning, checking homework, and verifying calculations in professional contexts.</p>
          <p style={pStyle}>The fraction calculator handles addition, subtraction, multiplication, and division of fractions, showing the full working including finding the lowest common denominator and simplifying the result. The quadratic equation solver computes both roots of any quadratic expression and shows the discriminant, helping students understand not just what the roots are but why they are real or complex.</p>
          <p style={pLast}>The standard deviation calculator computes all major descriptive statistics simultaneously — mean, median, mode, range, variance, and both population and sample standard deviation — from a comma-separated list of numbers. The Roman numeral converter handles the full valid range from 1 to 3999 supporting both standard subtractive notation and validation of correctly formed Roman numeral strings.</p>
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
