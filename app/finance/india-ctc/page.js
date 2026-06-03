"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n) { return Math.round(n).toLocaleString("en-IN"); }
function fmtDec(n, d = 1) { return n.toLocaleString("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d }); }

const NEW_BANDS = [
  { from: 0, to: 400000, rate: 0 },
  { from: 400000, to: 800000, rate: 0.05 },
  { from: 800000, to: 1200000, rate: 0.10 },
  { from: 1200000, to: 1600000, rate: 0.15 },
  { from: 1600000, to: 2000000, rate: 0.20 },
  { from: 2000000, to: 2400000, rate: 0.25 },
  { from: 2400000, to: Infinity, rate: 0.30 },
];

function calcNewTax(grossIncome) {
  const taxable = Math.max(0, grossIncome - 75000);
  let tax = 0;
  for (const b of NEW_BANDS) {
    if (taxable <= b.from) break;
    tax += (Math.min(taxable, b.to) - b.from) * b.rate;
  }
  const rebate = taxable <= 1275000 ? Math.min(tax, 60000) : 0;
  tax = Math.max(0, tax - rebate);
  return Math.round(tax * 1.04);
}

export default function IndiaCTC() {
  const [ctcInput, setCTCInput] = useState("1200000");
  const [basicPct, setBasicPct] = useState("40");
  const [hraPct, setHraPct] = useState("50");

  const ctc = parseFloat(ctcInput) || 0;
  const bPct = parseFloat(basicPct) / 100 || 0.40;
  const hPct = parseFloat(hraPct) / 100 || 0.50;

  const annualBasic = ctc * bPct;
  const monthlyBasic = annualBasic / 12;
  const annualHRA = annualBasic * hPct;

  // EPF: 12% of basic capped at ₹1800/month if basic > ₹15000
  const monthlyEPFEmployee = monthlyBasic > 15000 ? 1800 : monthlyBasic * 0.12;
  const monthlyEPFEmployer = monthlyEPFEmployee;
  const annualEPFEmployee = monthlyEPFEmployee * 12;
  const annualEPFEmployer = monthlyEPFEmployer * 12;

  // Gratuity (employer): 4.81% of basic
  const annualGratuity = annualBasic * 0.0481;

  // Special allowance = CTC - basic - HRA - EPF employer - gratuity
  const annualSpecialAllowance = Math.max(0, ctc - annualBasic - annualHRA - annualEPFEmployer - annualGratuity);

  // Gross salary (employee-visible part)
  const annualGross = annualBasic + annualHRA + annualSpecialAllowance;
  const monthlyGross = annualGross / 12;

  // Deductions from in-hand
  const profTax = 200 * 12; // ₹200/month
  const annualIncomeTax = calcNewTax(annualGross - annualEPFEmployee);
  const totalAnnualDeductions = annualEPFEmployee + profTax + annualIncomeTax;

  const annualInHand = annualGross - totalAnnualDeductions;
  const monthlyInHand = annualInHand / 12;

  const effectivePct = ctc > 0 ? (annualInHand / ctc * 100) : 0;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "CTC to In-Hand Calculator" }]} />
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>CTC to In-Hand Salary Calculator India 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Convert your CTC offer to actual monthly take-home — EPF, Professional Tax and Income Tax (New Regime).</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Annual CTC (₹)</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}>₹</span>
              <input type="number" value={ctcInput} onChange={(e) => setCTCInput(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "13px 12px 13px 28px", outline: "none", background: "white", fontSize: "22px", fontWeight: "700", boxSizing: "border-box" }} />
            </div>
            {ctc > 0 && <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "3px" }}>= ₹{fmtDec(ctc / 100000)} Lakh per annum</div>}
            <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
              {[600000, 1000000, 1500000, 2000000, 3000000].map((v) => (
                <button key={v} onClick={() => setCTCInput(String(v))} style={{ padding: "4px 10px", borderRadius: "6px", border: "0.5px solid #C7D2FE", background: "white", color: "#374151", fontSize: "11px", cursor: "pointer" }}>
                  ₹{v >= 100000 ? `${v / 100000}L` : v}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Basic Salary % of CTC (usually 35–50%)</label>
              <div style={{ position: "relative" }}>
                <input type="number" value={basicPct} onChange={(e) => setBasicPct(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 30px 10px 12px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
                <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}>%</span>
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>HRA % of Basic (usually 40–50%)</label>
              <div style={{ position: "relative" }}>
                <input type="number" value={hraPct} onChange={(e) => setHraPct(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 30px 10px 12px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
                <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}>%</span>
              </div>
            </div>
          </div>
        </div>

        {ctc > 0 && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Monthly In-Hand Salary</div>
                  <div style={{ fontSize: "40px", fontWeight: "700", color: "#4F46E5" }}>₹{fmt(monthlyInHand)}</div>
                  <div style={{ fontSize: "12px", color: "#9CA3AF" }}>Annual: ₹{fmt(annualInHand)} ({fmtDec(effectivePct)}% of CTC)</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  <div style={{ background: "white", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
                    <div style={{ fontSize: "10px", color: "#9CA3AF" }}>Monthly Gross</div>
                    <div style={{ fontSize: "15px", fontWeight: "700", color: "#374151" }}>₹{fmt(monthlyGross)}</div>
                  </div>
                  <div style={{ background: "white", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
                    <div style={{ fontSize: "10px", color: "#9CA3AF" }}>Monthly Tax</div>
                    <div style={{ fontSize: "15px", fontWeight: "700", color: "#EF4444" }}>₹{fmt(annualIncomeTax / 12)}</div>
                  </div>
                  <div style={{ background: "white", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
                    <div style={{ fontSize: "10px", color: "#9CA3AF" }}>Monthly EPF</div>
                    <div style={{ fontSize: "15px", fontWeight: "700", color: "#6366F1" }}>₹{fmt(monthlyEPFEmployee)}</div>
                  </div>
                  <div style={{ background: "white", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
                    <div style={{ fontSize: "10px", color: "#9CA3AF" }}>Prof. Tax</div>
                    <div style={{ fontSize: "15px", fontWeight: "700", color: "#374151" }}>₹200</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
              {/* CTC breakdown */}
              <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
                <div style={{ padding: "12px 16px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "700", color: "#374151" }}>CTC Breakdown (Annual)</div>
                {[
                  { label: "Basic Salary", val: annualBasic, pct: annualBasic / ctc * 100 },
                  { label: "HRA", val: annualHRA, pct: annualHRA / ctc * 100 },
                  { label: "Special Allowance", val: annualSpecialAllowance, pct: annualSpecialAllowance / ctc * 100 },
                  { label: "EPF (employer, 12%)", val: annualEPFEmployer, pct: annualEPFEmployer / ctc * 100 },
                  { label: "Gratuity (4.81%)", val: annualGratuity, pct: annualGratuity / ctc * 100 },
                  { label: "Total CTC", val: ctc, pct: 100, bold: true },
                ].map((r) => (
                  <div key={r.label} style={{ padding: "8px 16px", borderBottom: "0.5px solid #F3F4F6", display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                    <span style={{ color: "#374151" }}>{r.label}</span>
                    <span style={{ fontWeight: r.bold ? "700" : "400", color: r.bold ? "#4F46E5" : "#374151" }}>₹{fmt(r.val)} <span style={{ color: "#9CA3AF", fontSize: "10px" }}>({fmtDec(r.pct, 0)}%)</span></span>
                  </div>
                ))}
              </div>

              {/* Monthly deductions */}
              <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
                <div style={{ padding: "12px 16px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "700", color: "#374151" }}>Monthly In-Hand Working</div>
                {[
                  { label: "Monthly Gross", val: monthlyGross, color: "#374151", bold: true },
                  { label: "− EPF Employee (12%)", val: monthlyEPFEmployee, color: "#6366F1" },
                  { label: "− Professional Tax", val: 200, color: "#374151" },
                  { label: "− Income Tax (new regime)", val: annualIncomeTax / 12, color: "#EF4444" },
                  { label: "= Monthly In-Hand", val: monthlyInHand, color: "#4F46E5", bold: true },
                ].map((r) => (
                  <div key={r.label} style={{ padding: "8px 16px", borderBottom: "0.5px solid #F3F4F6", display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                    <span style={{ color: "#374151" }}>{r.label}</span>
                    <span style={{ fontWeight: r.bold ? "700" : "400", color: r.color }}>₹{fmt(r.val)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ Assumes New Tax Regime (FY 2025-26). EPF capped at ₹1,800/month if basic exceeds ₹15,000. Professional Tax varies by state (₹200/month used). Actual in-hand depends on employer structure, perks and exact tax declaration. Gratuity and EPF employer contributions are part of CTC but not received as monthly salary.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
