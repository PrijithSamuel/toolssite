import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Free Finance Calculators — Loan, Compound Interest, Salary, Invoice",
  description: "Free online finance calculators — loan calculator, compound interest, salary breakdown, invoice generator. No signup required.",
};

const tools = [
  { name: "Loan Calculator", description: "Monthly payment, total interest and amortization schedule", href: "/finance/loan-calculator", icon: "🏦" },
  { name: "Compound Interest", description: "Calculate investment growth with compounding interest", href: "/finance/compound-interest", icon: "📈" },
  { name: "Salary Calculator", description: "Break annual salary into monthly, weekly, hourly rates", href: "/finance/salary-calculator", icon: "💰" },
  { name: "Invoice Generator", description: "Create and print professional invoices with line items", href: "/finance/invoice-generator", icon: "🧾" },
];

export default function Finance() {
  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance" }]} />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Finance Calculators</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Free online finance tools — no signup required.</p>
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
