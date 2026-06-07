import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Free Math Tools — Fraction Calculator, Percentage Change, Prime Checker",
  description: "Free online math tools — fraction calculator, percentage change calculator, prime number checker. No signup required.",
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
];

export default function MathTools() {
  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Math Tools" }]} />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Math Tools</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Free online math tools — no signup required.</p>
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
