"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n) { return Math.round(n).toLocaleString("en-LK"); }
function fmtDec(n, d = 1) { return n.toLocaleString("en-LK", { minimumFractionDigits: d, maximumFractionDigits: d }); }

const PIT_BANDS = [
  { from: 0, to: 1200000, rate: 0, label: "First Rs.1,200,000 — tax free" },
  { from: 1200000, to: 1700000, rate: 0.06, label: "Rs.1,200,001 – 1,700,000" },
  { from: 1700000, to: 2200000, rate: 0.12, label: "Rs.1,700,001 – 2,200,000" },
  { from: 2200000, to: 2700000, rate: 0.18, label: "Rs.2,200,001 – 2,700,000" },
  { from: 2700000, to: 3200000, rate: 0.24, label: "Rs.3,200,001 – 3,700,000" },
  { from: 3200000, to: 3700000, rate: 0.30, label: "Rs.3,200,001 – 3,700,000" },
  { from: 3700000, to: Infinity, rate: 0.36, label: "Above Rs.3,700,000" },
];

function calcPIT(taxable) {
  let tax = 0;
  const rows = [];
  for (const b of PIT_BANDS) {
    if (taxable <= b.from) break;
    const chunk = Math.min(taxable, b.to) - b.from;
    const bandTax = chunk * b.rate;
    tax += bandTax;
    rows.push({ label: b.label, amount: chunk, rate: b.rate, tax: bandTax });
  }
  return { tax: Math.max(0, tax), rows };
}

export default function SriLankaIncomeTax() {
  const [annualIncome, setAnnualIncome] = useState("3000000");
  const [epfContrib, setEpfContrib] = useState("0");
  const [qualifyingPayments, setQualifyingPayments] = useState("0");

  const income = parseFloat(annualIncome) || 0;
  const epf = parseFloat(epfContrib) || 0;
  const qp = parseFloat(qualifyingPayments) || 0;

  const totalDeductions = epf + Math.min(qp, 1200000);
  const taxableIncome = Math.max(0, income - totalDeductions);
  const { tax, rows } = calcPIT(taxableIncome);
  const effectiveRate = income > 0 ? (tax / income) * 100 : 0;
  const monthlyAPIT = tax / 12;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "Sri Lanka Income Tax" }]} />
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>Personal Income Tax Calculator Sri Lanka 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>APIT annual calculation using 2025 PIT slabs — salary, business, rent and interest income.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Total Annual Income (Rs.) — all sources</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "#6B7280", fontWeight: "600" }}>Rs.</span>
              <input type="number" value={annualIncome} onChange={(e) => setAnnualIncome(e.target.value)} placeholder="3000000" style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "12px 12px 12px 44px", outline: "none", background: "white", fontSize: "20px", fontWeight: "500", boxSizing: "border-box" }} />
            </div>
            {income > 0 && <div style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "4px" }}>= Rs.{fmt(income / 12)} per month</div>}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>EPF Contributions (annual, Rs.) <span style={{ color: "#9CA3AF", fontWeight: "400" }}>deductible</span></label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "12px", color: "#6B7280", fontWeight: "600" }}>Rs.</span>
                <input type="number" value={epfContrib} onChange={(e) => setEpfContrib(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px 10px 36px", outline: "none", background: "white", fontSize: "14px", boxSizing: "border-box" }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Qualifying Payments (Rs.) <span style={{ color: "#9CA3AF", fontWeight: "400" }}>max Rs.1.2M</span></label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "12px", color: "#6B7280", fontWeight: "600" }}>Rs.</span>
                <input type="number" value={qualifyingPayments} onChange={(e) => setQualifyingPayments(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px 10px 36px", outline: "none", background: "white", fontSize: "14px", boxSizing: "border-box" }} />
              </div>
            </div>
          </div>
        </div>

        {income > 0 && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Annual Tax</div>
                  <div style={{ fontSize: "32px", fontWeight: "700", color: "#EF4444" }}>Rs.{fmt(tax)}</div>
                </div>
                <div style={{ textAlign: "center", borderLeft: "1px solid #C7D2FE", borderRight: "1px solid #C7D2FE" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Monthly APIT</div>
                  <div style={{ fontSize: "32px", fontWeight: "700", color: "#4F46E5" }}>Rs.{fmt(monthlyAPIT)}</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Effective Rate</div>
                  <div style={{ fontSize: "32px", fontWeight: "700", color: "#374151" }}>{fmtDec(effectiveRate)}%</div>
                </div>
              </div>
            </div>

            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
              <div style={{ padding: "10px 20px", fontSize: "11px", fontWeight: "600", color: "#6B7280", background: "#F8F9FF", borderBottom: "0.5px solid #E0E7FF" }}>Taxable Income Calculation</div>
              {[
                { label: "Total annual income", val: income, color: "#1E1B4B", bold: true },
                ...(epf > 0 ? [{ label: "Less: EPF contributions", val: -epf, color: "#10B981" }] : []),
                ...(qp > 0 ? [{ label: `Less: Qualifying payments (Rs.${fmt(Math.min(qp, 1200000))} applied)`, val: -Math.min(qp, 1200000), color: "#10B981" }] : []),
                { label: "Taxable income", val: taxableIncome, color: "#374151", bold: true },
              ].map((r) => (
                <div key={r.label} style={{ padding: "10px 20px", borderBottom: "0.5px solid #F3F4F6", display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "#374151" }}>{r.label}</span>
                  <span style={{ fontWeight: r.bold ? "700" : "500", color: r.color }}>
                    {r.val < 0 ? `− Rs.${fmt(Math.abs(r.val))}` : `Rs.${fmt(r.val)}`}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
              <div style={{ padding: "10px 20px", fontSize: "11px", fontWeight: "600", color: "#6B7280", background: "#F8F9FF", borderBottom: "0.5px solid #E0E7FF", display: "grid", gridTemplateColumns: "1fr 120px 70px 100px" }}>
                <span>Tax Slab</span><span style={{ textAlign: "right" }}>Amount</span><span style={{ textAlign: "right" }}>Rate</span><span style={{ textAlign: "right" }}>Tax</span>
              </div>
              {rows.map((r) => (
                <div key={r.label} style={{ padding: "9px 20px", borderBottom: "0.5px solid #F3F4F6", display: "grid", gridTemplateColumns: "1fr 120px 70px 100px", fontSize: "12px" }}>
                  <span style={{ color: "#374151" }}>{r.label}</span>
                  <span style={{ textAlign: "right", color: "#6B7280" }}>Rs.{fmt(r.amount)}</span>
                  <span style={{ textAlign: "right", color: "#6B7280" }}>{(r.rate * 100).toFixed(0)}%</span>
                  <span style={{ textAlign: "right", color: r.rate === 0 ? "#10B981" : "#EF4444", fontWeight: "500" }}>Rs.{fmt(r.tax)}</span>
                </div>
              ))}
              <div style={{ padding: "10px 20px", display: "grid", gridTemplateColumns: "1fr 120px 70px 100px", fontSize: "13px", background: "#EEF2FF" }}>
                <span style={{ fontWeight: "700", color: "#4F46E5" }}>Total Annual Tax</span>
                <span />
                <span style={{ textAlign: "right", fontWeight: "600", color: "#EF4444" }}>{fmtDec(effectiveRate)}%</span>
                <span style={{ textAlign: "right", fontWeight: "700", color: "#EF4444" }}>Rs.{fmt(tax)}</span>
              </div>
            </div>

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ Based on 2025 PIT rates (Inland Revenue Act). Tax-free threshold is Rs.1,200,000. APIT is deducted monthly by employer; balance paid via annual tax return at IRD. Qualifying payments include approved donations, insurance premiums and housing loans.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
