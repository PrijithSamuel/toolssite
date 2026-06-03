"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n) { return Math.round(Math.abs(n)).toLocaleString("en-IN"); }
function fmtDec(n, d = 1) { return Math.abs(n).toLocaleString("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d }); }

const NEW_BANDS = [
  { from: 0, to: 400000, rate: 0 },
  { from: 400000, to: 800000, rate: 0.05 },
  { from: 800000, to: 1200000, rate: 0.10 },
  { from: 1200000, to: 1600000, rate: 0.15 },
  { from: 1600000, to: 2000000, rate: 0.20 },
  { from: 2000000, to: 2400000, rate: 0.25 },
  { from: 2400000, to: Infinity, rate: 0.30 },
];

function calcBandTax(income, bands) {
  let tax = 0;
  for (const b of bands) {
    if (income <= b.from) break;
    tax += (Math.min(income, b.to) - b.from) * b.rate;
  }
  return Math.max(0, tax);
}

function calcNewRegime(grossIncome) {
  const stdDed = 75000;
  const taxable = Math.max(0, grossIncome - stdDed);
  let tax = calcBandTax(taxable, NEW_BANDS);
  const rebate = taxable <= 1275000 ? Math.min(tax, 60000) : 0;
  tax = Math.max(0, tax - rebate);
  const cess = tax * 0.04;
  return { taxable, tax, rebate, cess, total: tax + cess };
}

function calcOldRegime(grossIncome, ageGroup, ded80C, ded80D, hra, homeLoan) {
  const stdDed = 50000;
  const exemptLimit = ageGroup === "60-80" ? 300000 : ageGroup === "80+" ? 500000 : 250000;
  const totalDed = stdDed + Math.min(ded80C, 150000) + Math.min(ded80D, 25000) + hra + Math.min(homeLoan, 200000);
  const taxable = Math.max(0, grossIncome - totalDed);
  const taxableAboveExempt = Math.max(0, taxable - exemptLimit);
  const OLD_BANDS = [
    { from: 0, to: exemptLimit, rate: 0 },
    { from: exemptLimit, to: 500000, rate: 0.05 },
    { from: 500000, to: 1000000, rate: 0.20 },
    { from: 1000000, to: Infinity, rate: 0.30 },
  ];
  let tax = calcBandTax(taxable, OLD_BANDS);
  const rebate = taxable <= 500000 ? Math.min(tax, 12500) : 0;
  tax = Math.max(0, tax - rebate);
  const cess = tax * 0.04;
  return { taxable, tax, rebate, cess, total: tax + cess, totalDed };
}

export default function IndiaIncomeTax() {
  const [income, setIncome] = useState("1200000");
  const [ageGroup, setAgeGroup] = useState("below60");
  const [ded80C, setDed80C] = useState("150000");
  const [ded80D, setDed80D] = useState("25000");
  const [hra, setHra] = useState("0");
  const [homeLoan, setHomeLoan] = useState("0");

  const grossIncome = parseFloat(income) || 0;
  const newR = grossIncome > 0 ? calcNewRegime(grossIncome) : null;
  const oldR = grossIncome > 0 ? calcOldRegime(grossIncome, ageGroup, parseFloat(ded80C) || 0, parseFloat(ded80D) || 0, parseFloat(hra) || 0, parseFloat(homeLoan) || 0) : null;
  const recommended = newR && oldR ? (newR.total <= oldR.total ? "new" : "old") : null;
  const saving = newR && oldR ? Math.abs(newR.total - oldR.total) : 0;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "India Income Tax" }]} />
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>Income Tax Calculator India FY 2025-26</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Compare Old vs New Regime — includes 87A rebate, cess, and all major deductions.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Annual Income / CTC (₹)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}>₹</span>
                <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "12px 12px 12px 28px", outline: "none", background: "white", fontSize: "18px", fontWeight: "600", boxSizing: "border-box" }} />
              </div>
              {grossIncome > 0 && <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "3px" }}>= ₹{fmt(grossIncome / 100000)} Lakh</div>}
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Age Group</label>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                {[{ val: "below60", label: "Below 60 years" }, { val: "60-80", label: "60–80 years (Senior)" }, { val: "80+", label: "Above 80 (Super Senior)" }].map(({ val, label }) => (
                  <button key={val} onClick={() => setAgeGroup(val)} style={{ padding: "8px 12px", borderRadius: "7px", border: "0.5px solid #C7D2FE", background: ageGroup === val ? "#4F46E5" : "white", color: ageGroup === val ? "white" : "#374151", fontSize: "12px", cursor: "pointer", textAlign: "left", fontWeight: "500" }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ borderTop: "0.5px solid #E0E7FF", paddingTop: "14px" }}>
            <div style={{ fontSize: "12px", fontWeight: "700", color: "#374151", marginBottom: "10px" }}>Old Regime Deductions (for comparison)</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {[
                { label: "80C — PPF / ELSS / LIC / EPF (max ₹1.5L)", val: ded80C, set: setDed80C },
                { label: "80D — Health Insurance (max ₹25,000)", val: ded80D, set: setDed80D },
                { label: "HRA Exemption (annual)", val: hra, set: setHra },
                { label: "Home Loan Interest — Sec 24 (max ₹2L)", val: homeLoan, set: setHomeLoan },
              ].map((f) => (
                <div key={f.label}>
                  <label style={{ fontSize: "11px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "4px" }}>{f.label}</label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#6B7280", fontSize: "13px" }}>₹</span>
                    <input type="number" value={f.val} onChange={(e) => f.set(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "8px 10px 8px 26px", outline: "none", background: "white", fontSize: "13px", boxSizing: "border-box" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {newR && oldR && (
          <>
            {/* Recommendation banner */}
            <div style={{ background: recommended === "new" ? "#ECFDF5" : "#EEF2FF", border: `0.5px solid ${recommended === "new" ? "#6EE7B7" : "#A5B4FC"}`, borderRadius: "12px", padding: "16px 20px", marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "700", color: recommended === "new" ? "#065F46" : "#4F46E5" }}>
                  ✓ {recommended === "new" ? "New Regime" : "Old Regime"} is better for you
                </div>
                <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>
                  Save ₹{fmt(saving)} more in tax ({recommended === "new" ? "New" : "Old"} Regime recommended)
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "11px", color: "#9CA3AF" }}>Monthly TDS (recommended)</div>
                <div style={{ fontSize: "22px", fontWeight: "700", color: "#4F46E5" }}>₹{fmt((recommended === "new" ? newR.total : oldR.total) / 12)}</div>
              </div>
            </div>

            {/* Side-by-side comparison */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
              {[
                { label: "New Regime (FY 2025-26)", r: newR, isNew: true },
                { label: "Old Regime (with deductions)", r: oldR, isNew: false },
              ].map(({ label, r, isNew }) => (
                <div key={label} style={{ background: "white", border: `0.5px solid ${recommended === (isNew ? "new" : "old") ? "#A5B4FC" : "#E0E7FF"}`, borderRadius: "12px", padding: "18px 20px" }}>
                  <div style={{ fontSize: "12px", fontWeight: "700", color: "#374151", marginBottom: "12px", display: "flex", justifyContent: "space-between" }}>
                    {label}
                    {recommended === (isNew ? "new" : "old") && <span style={{ fontSize: "10px", background: "#EEF2FF", color: "#4F46E5", padding: "2px 7px", borderRadius: "4px" }}>RECOMMENDED</span>}
                  </div>
                  {[
                    { label: "Taxable income", val: r.taxable },
                    { label: "Tax (before rebate)", val: r.tax + r.rebate },
                    { label: "Rebate u/s 87A", val: -r.rebate },
                    { label: "Health & Ed Cess (4%)", val: r.cess },
                  ].map((row) => (
                    <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "0.5px solid #F3F4F6", fontSize: "12px" }}>
                      <span style={{ color: "#6B7280" }}>{row.label}</span>
                      <span style={{ color: row.val < 0 ? "#10B981" : "#374151", fontWeight: "500" }}>
                        {row.val < 0 ? `−₹${fmt(Math.abs(row.val))}` : `₹${fmt(row.val)}`}
                      </span>
                    </div>
                  ))}
                  <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "8px", fontSize: "14px" }}>
                    <span style={{ fontWeight: "700", color: "#374151" }}>Total Tax</span>
                    <span style={{ fontWeight: "700", color: "#EF4444", fontSize: "16px" }}>₹{fmt(r.total)}</span>
                  </div>
                  <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "4px", textAlign: "right" }}>
                    Effective rate: {grossIncome > 0 ? fmtDec(r.total / grossIncome * 100) : 0}% | Monthly TDS: ₹{fmt(r.total / 12)}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ Based on FY 2025-26 (AY 2026-27) slab rates. New regime standard deduction is ₹75,000. Old regime standard deduction is ₹50,000. Surcharge not applied for incomes under ₹50 lakh. Consult a CA for exact tax liability.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
