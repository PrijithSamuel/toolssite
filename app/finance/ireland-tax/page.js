"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n) { return Math.round(n).toLocaleString("en-IE"); }
function fmtDec(n) { return n.toLocaleString("en-IE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

function calcUSC(income) {
  if (income <= 13000) return 0;
  let usc = 0;
  usc += Math.min(income, 12012) * 0.005;
  if (income > 12012) usc += (Math.min(income, 25760) - 12012) * 0.02;
  if (income > 25760) usc += (Math.min(income, 70044) - 25760) * 0.04;
  if (income > 70044) usc += (income - 70044) * 0.08;
  return usc;
}

function calcPRSI(income) {
  const threshold = 18304;
  if (income <= threshold) return 0;
  return income * 0.04;
}

function calcPAYE(income, maritalStatus) {
  const band = maritalStatus === "married" ? 51000 : 42000;
  const credits = maritalStatus === "married" ? 4150 : 3750;
  let tax = 0;
  tax += Math.min(income, band) * 0.20;
  if (income > band) tax += (income - band) * 0.40;
  return Math.max(0, tax - credits);
}

export default function IrelandTax() {
  const [salaryInput, setSalaryInput] = useState("50000");
  const [marital, setMarital] = useState("single");

  const salary = parseFloat(salaryInput) || 0;

  const paye = salary > 0 ? calcPAYE(salary, marital) : 0;
  const usc = salary > 0 ? calcUSC(salary) : 0;
  const prsi = salary > 0 ? calcPRSI(salary) : 0;
  const totalDed = paye + usc + prsi;
  const netAnnual = salary - totalDed;
  const netMonthly = netAnnual / 12;
  const effectiveRate = salary > 0 ? (totalDed / salary) * 100 : 0;
  const marginalRate = salary > (marital === "married" ? 51000 : 42000) ? 40 : 20;

  const rows = salary > 0 ? [
    { label: "PAYE Income Tax", amount: paye, pct: salary > 0 ? (paye / salary * 100).toFixed(1) : "0", color: "#EF4444" },
    { label: "USC (Universal Social Charge)", amount: usc, pct: salary > 0 ? (usc / salary * 100).toFixed(1) : "0", color: "#F97316" },
    { label: "PRSI (Pay Related Social Insurance)", amount: prsi, pct: salary > 0 ? (prsi / salary * 100).toFixed(1) : "0", color: "#8B5CF6" },
  ] : [];

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "Irish Income Tax" }]} />
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>Irish Income Tax Calculator 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate PAYE, USC and PRSI — Ireland&apos;s three income taxes for 2025.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Gross Annual Salary</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "18px", color: "#6B7280" }}>€</span>
              <input
                type="number"
                value={salaryInput}
                onChange={(e) => setSalaryInput(e.target.value)}
                placeholder="50000"
                style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "12px 14px 12px 36px", outline: "none", background: "white", fontSize: "22px", fontWeight: "500", boxSizing: "border-box" }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Marital / Assessment Status</label>
            <div style={{ display: "flex", gap: "8px" }}>
              {[
                { val: "single", label: "Single" },
                { val: "married", label: "Married (one earner)" },
              ].map(({ val, label }) => (
                <button key={val} onClick={() => setMarital(val)} style={{ padding: "9px 20px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: marital === val ? "#4F46E5" : "white", color: marital === val ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {salary > 0 && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Take-Home / Month</div>
                  <div style={{ fontSize: "34px", fontWeight: "700", color: "#4F46E5" }}>€{fmt(netMonthly)}</div>
                </div>
                <div style={{ textAlign: "center", borderLeft: "1px solid #C7D2FE", borderRight: "1px solid #C7D2FE" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Take-Home / Year</div>
                  <div style={{ fontSize: "24px", fontWeight: "600", color: "#4F46E5" }}>€{fmt(netAnnual)}</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Effective Rate</div>
                  <div style={{ fontSize: "34px", fontWeight: "700", color: "#EF4444" }}>{effectiveRate.toFixed(1)}%</div>
                </div>
              </div>
              <div style={{ height: "10px", background: "#E0E7FF", borderRadius: "5px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${100 - effectiveRate}%`, background: "linear-gradient(90deg, #4F46E5, #818CF8)", borderRadius: "5px", transition: "width 0.4s" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#6B7280", marginTop: "4px" }}>
                <span>Take-home: €{fmt(netAnnual)}</span>
                <span>Total tax: €{fmt(totalDed)} ({effectiveRate.toFixed(1)}%)</span>
              </div>
            </div>

            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
              <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", display: "grid", gridTemplateColumns: "1fr 120px 80px", fontSize: "11px", fontWeight: "600", color: "#6B7280", background: "#F8F9FF" }}>
                <span>Tax / Deduction</span><span style={{ textAlign: "right" }}>Annual</span><span style={{ textAlign: "right" }}>% of Gross</span>
              </div>
              <div style={{ padding: "10px 20px", borderBottom: "0.5px solid #F3F4F6", display: "grid", gridTemplateColumns: "1fr 120px 80px" }}>
                <span style={{ fontSize: "13px", fontWeight: "600", color: "#1E1B4B" }}>Gross Salary</span>
                <span style={{ textAlign: "right", fontSize: "13px", fontWeight: "600", color: "#1E1B4B" }}>€{fmt(salary)}</span>
                <span style={{ textAlign: "right", fontSize: "13px", color: "#6B7280" }}>100%</span>
              </div>
              {rows.map((r) => (
                <div key={r.label} style={{ padding: "10px 20px", borderBottom: "0.5px solid #F3F4F6", display: "grid", gridTemplateColumns: "1fr 120px 80px" }}>
                  <span style={{ fontSize: "13px", color: "#374151", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: r.color, flexShrink: 0 }} />
                    {r.label}
                  </span>
                  <span style={{ textAlign: "right", fontSize: "13px", color: r.color, fontWeight: "500" }}>−€{fmt(r.amount)}</span>
                  <span style={{ textAlign: "right", fontSize: "13px", color: "#6B7280" }}>{r.pct}%</span>
                </div>
              ))}
              <div style={{ padding: "12px 20px", display: "grid", gridTemplateColumns: "1fr 120px 80px", background: "#EEF2FF" }}>
                <span style={{ fontSize: "14px", fontWeight: "700", color: "#4F46E5" }}>✓ Net Take-Home</span>
                <span style={{ textAlign: "right", fontSize: "15px", fontWeight: "700", color: "#4F46E5" }}>€{fmt(netAnnual)}</span>
                <span style={{ textAlign: "right", fontSize: "13px", fontWeight: "600", color: "#4F46E5" }}>{(100 - effectiveRate).toFixed(1)}%</span>
              </div>
            </div>

            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px 20px", marginBottom: "16px" }}>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "10px" }}>Key Figures</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                {[
                  { label: "Marginal Rate", val: `${marginalRate}%` },
                  { label: "Tax Credits", val: marital === "married" ? "€4,150" : "€3,750" },
                  { label: "PRSI Class", val: salary > 18304 ? "A1 (4%)" : "Exempt" },
                ].map((i) => (
                  <div key={i.label} style={{ background: "#F8F9FF", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
                    <div style={{ fontSize: "11px", color: "#9CA3AF" }}>{i.label}</div>
                    <div style={{ fontSize: "18px", fontWeight: "600", color: "#374151" }}>{i.val}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ Estimate based on 2025 Revenue Ireland rates. Does not account for additional tax credits, SRCOP, pension contributions, or other deductions. Consult Revenue myAccount or a tax advisor for exact figures.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
