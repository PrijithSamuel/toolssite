import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Free Finance Calculators — Loan, Salary, German, Irish Tax Tools",
  description: "Free online finance calculators — loan calculator, compound interest, German Brutto-Netto, Irish PAYE/USC/PRSI, mortgage, VAT and more. No signup required.",
};

const tools = [
  { name: "Loan Calculator", description: "Monthly payment, total interest and amortization schedule", href: "/finance/loan-calculator", icon: "🏦" },
  { name: "Compound Interest", description: "Calculate investment growth with compounding interest", href: "/finance/compound-interest", icon: "📈" },
  { name: "Salary Calculator", description: "Break annual salary into monthly, weekly, hourly rates", href: "/finance/salary-calculator", icon: "💰" },
  { name: "Invoice Generator", description: "Create and print professional invoices with line items", href: "/finance/invoice-generator", icon: "🧾" },
  { name: "TVA Calculator 🇫🇷", description: "Calculate French VAT — add or remove tax (HT/TTC)", href: "/finance/vat-calculator", icon: "🇫🇷" },
  { name: "French Tax Calculator 🇫🇷", description: "Estimate your Impôt sur le revenu 2024", href: "/finance/french-tax-calculator", icon: "📋" },
  { name: "Brutto-Netto-Rechner 🇩🇪", description: "German salary calculator — all deductions, Steuerklassen, Bundesland", href: "/finance/brutto-netto", icon: "🇩🇪" },
  { name: "Mehrwertsteuer-Rechner 🇩🇪", description: "German VAT calculator — 19%, 7% rates, Netto ↔ Brutto", href: "/finance/mehrwertsteuer", icon: "🧾" },
  { name: "Notendurchschnitt Rechner 🇩🇪", description: "German grade average calculator with Bavarian formula", href: "/finance/german-grade-calculator", icon: "🎓" },
  { name: "Kurzarbeitergeld-Rechner 🇩🇪", description: "Short-time work allowance calculator (60%/67% net difference)", href: "/finance/kurzarbeit", icon: "⏸️" },
  { name: "Elterngeld-Rechner 🇩🇪", description: "German parental allowance — Basis-Elterngeld & ElterngeldPlus", href: "/finance/elterngeld", icon: "👶" },
  { name: "Irish Income Tax 2025 🇮🇪", description: "PAYE, USC and PRSI calculator — Irish take-home pay", href: "/finance/ireland-tax", icon: "🇮🇪" },
  { name: "Irish VAT Calculator 🇮🇪", description: "Calculate Irish VAT — 23%, 13.5%, 9% rates, add or remove", href: "/finance/ireland-vat", icon: "🧾" },
  { name: "Mortgage Calculator Ireland 🇮🇪", description: "Monthly repayments with Central Bank LTV rules and stamp duty", href: "/finance/ireland-mortgage", icon: "🏠" },
  { name: "Rent Tax Credit Ireland 🇮🇪", description: "Calculate your €1,000 / €2,000 rent tax credit for 2025", href: "/finance/ireland-rent-tax-credit", icon: "🏘️" },
  { name: "Stamp Duty Ireland 🇮🇪", description: "Stamp duty on residential, commercial property and land", href: "/finance/ireland-stamp-duty", icon: "📑" },
  { name: "USC Calculator Ireland 🇮🇪", description: "Universal Social Charge — detailed band-by-band breakdown", href: "/finance/ireland-usc", icon: "📊" },
  { name: "Irish Pension Calculator 🇮🇪", description: "Pension tax relief, net cost and projected pot at retirement", href: "/finance/ireland-pension", icon: "🏦" },
  { name: "Dutch Income Tax 2025 🇳🇱", description: "Bruto netto berekenen — Box 1 tax, heffingskortingen and 30% ruling", href: "/finance/netherlands-tax", icon: "🇳🇱" },
  { name: "BTW Calculator Nederland 🇳🇱", description: "Dutch VAT — 21% / 9% / 0%, excl. and incl. BTW berekenen", href: "/finance/netherlands-btw", icon: "🧾" },
  { name: "30% Ruling Calculator 🇳🇱", description: "Calculate your 30%-regeling tax saving for expats in the Netherlands", href: "/finance/netherlands-30-percent", icon: "💼" },
  { name: "Hypotheek Calculator 🇳🇱", description: "Dutch mortgage — maandlast, renteaftrek and overdrachtsbelasting", href: "/finance/netherlands-mortgage", icon: "🏠" },
  { name: "ZZP Belasting Calculator 🇳🇱", description: "Dutch freelancer tax — winst, MKB-vrijstelling, BTW schedule", href: "/finance/netherlands-zzp", icon: "💻" },
  { name: "Toeslagen Calculator 🇳🇱", description: "Dutch allowances — zorgtoeslag, huurtoeslag, kinderbijslag 2025", href: "/finance/netherlands-toeslagen", icon: "🏛️" },
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
