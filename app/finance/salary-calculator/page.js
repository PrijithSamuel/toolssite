"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const brackets2024 = [
  { rate: 0.10, min: 0, max: 11600 },
  { rate: 0.12, min: 11601, max: 47150 },
  { rate: 0.22, min: 47151, max: 100525 },
  { rate: 0.24, min: 100526, max: 191950 },
  { rate: 0.32, min: 191951, max: 243725 },
  { rate: 0.35, min: 243726, max: 609350 },
  { rate: 0.37, min: 609351, max: Infinity },
];

function calcTax(income) {
  let tax = 0;
  for (const b of brackets2024) {
    if (income <= b.min - 1) break;
    const taxable = Math.min(income, b.max) - (b.min - 1);
    tax += taxable * b.rate;
  }
  return tax;
}

function fmt(n, dec = 2) {
  return n.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

function Row({ label, value, sub, accent }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "0.5px solid #F3F4F6" }}>
      <div>
        <div style={{ fontSize: "13px", fontWeight: "500", color: "#374151" }}>{label}</div>
        {sub && <div style={{ fontSize: "11px", color: "#9CA3AF" }}>{sub}</div>}
      </div>
      <div style={{ fontSize: "18px", fontWeight: "500", color: accent || "#4F46E5" }}>${fmt(value)}</div>
    </div>
  );
}

export default function SalaryCalculator() {
  const [salary, setSalary] = useState("75000");

  const annual = parseFloat(salary) || 0;
  const monthly = annual / 12;
  const biweekly = annual / 26;
  const weekly = annual / 52;
  const daily = annual / 260;
  const hourly = annual / 2080;

  const tax = calcTax(annual);
  const netAnnual = annual - tax;
  const effectiveRate = annual > 0 ? (tax / annual) * 100 : 0;

  const appliedBrackets = brackets2024.filter((b) => annual >= b.min);

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "Salary Calculator" }]} />
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Salary Calculator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Break down annual salary into monthly, weekly, and hourly rates with estimated US taxes.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>Annual Salary ($)</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="75,000"
            style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "12px 14px", outline: "none", background: "white", fontSize: "18px", boxSizing: "border-box" }}
          />
        </div>

        {annual > 0 && (
          <>
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px 24px", marginBottom: "16px" }}>
              <div style={{ fontSize: "13px", fontWeight: "500", color: "#6B7280", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px", fontSize: "11px" }}>Gross Pay Breakdown</div>
              <Row label="Annual" value={annual} />
              <Row label="Monthly" sub="÷ 12 months" value={monthly} />
              <Row label="Bi-weekly" sub="÷ 26 pay periods" value={biweekly} />
              <Row label="Weekly" sub="÷ 52 weeks" value={weekly} />
              <Row label="Daily" sub="÷ 260 working days" value={daily} />
              <Row label="Hourly" sub="÷ 2,080 hours/year (40 hrs/wk)" value={hourly} />
            </div>

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "20px 24px", marginBottom: "16px" }}>
              <div style={{ fontSize: "11px", fontWeight: "500", color: "#6366F1", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Estimated US Federal Tax (2024, Single Filer)</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "16px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "4px" }}>Est. Tax</div>
                  <div style={{ fontSize: "24px", fontWeight: "500", color: "#EF4444" }}>${fmt(tax)}</div>
                </div>
                <div style={{ textAlign: "center", borderLeft: "1px solid #C7D2FE", borderRight: "1px solid #C7D2FE" }}>
                  <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "4px" }}>Net Annual</div>
                  <div style={{ fontSize: "24px", fontWeight: "500", color: "#10B981" }}>${fmt(netAnnual)}</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "4px" }}>Effective Rate</div>
                  <div style={{ fontSize: "24px", fontWeight: "500", color: "#4F46E5" }}>{effectiveRate.toFixed(1)}%</div>
                </div>
              </div>

              <div style={{ fontSize: "12px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>Tax Brackets Applied</div>
              {appliedBrackets.map((b) => {
                const taxable = Math.min(annual, b.max) - (b.min - 1);
                const bracketTax = taxable * b.rate;
                return (
                  <div key={b.rate} style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#6B7280", padding: "4px 0", borderBottom: "0.5px solid #E0E7FF" }}>
                    <span style={{ color: "#374151" }}>{(b.rate * 100).toFixed(0)}% bracket (${fmt(b.min, 0)} – {b.max === Infinity ? "+" : "$" + fmt(b.max, 0)})</span>
                    <span style={{ color: "#EF4444", fontWeight: "500" }}>−${fmt(bracketTax)}</span>
                  </div>
                );
              })}
              <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "8px" }}>
                * Estimate only. Does not include FICA (7.65%), state tax, or deductions.
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
