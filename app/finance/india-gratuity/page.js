"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n) { return Math.round(n).toLocaleString("en-IN"); }

const TAX_EXEMPT_LIMIT = 2000000;

export default function IndiaGratuity() {
  const [basic, setBasic] = useState("50000");
  const [years, setYears] = useState("7");
  const [months, setMonths] = useState("6");
  const [isCovered, setIsCovered] = useState(true);
  const [taxSlab, setTaxSlab] = useState(30);

  const basicVal = parseFloat(basic) || 0;
  const yrsVal = parseInt(years) || 0;
  const monthsVal = parseInt(months) || 0;

  // Round up service years: 6+ months = full year for covered
  let serviceYears = yrsVal;
  if (isCovered && monthsVal >= 6) serviceYears = yrsVal + 1;
  else if (!isCovered) serviceYears = yrsVal + monthsVal / 12;

  const gratuity = isCovered
    ? basicVal * serviceYears * (15 / 26)
    : basicVal * serviceYears * (15 / 30);

  const exemptAmount = Math.min(gratuity, TAX_EXEMPT_LIMIT);
  const taxableGratuity = Math.max(0, gratuity - TAX_EXEMPT_LIMIT);
  const taxOnGratuity = taxableGratuity * (taxSlab / 100) * 1.04;
  const netGratuity = gratuity - taxOnGratuity;
  const eligible = (yrsVal >= 5) || (yrsVal === 4 && monthsVal >= 6 && isCovered);

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "Gratuity Calculator India" }]} />
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>Gratuity Calculator India 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate gratuity under Payment of Gratuity Act — tax-exempt up to ₹20 Lakhs.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Last Basic Salary + DA (monthly ₹)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}>₹</span>
                <input type="number" value={basic} onChange={(e) => setBasic(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px 10px 26px", outline: "none", background: "white", fontSize: "16px", fontWeight: "500", boxSizing: "border-box" }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Tax Slab</label>
              <div style={{ display: "flex", gap: "6px" }}>
                {[10, 20, 30].map((s) => <button key={s} onClick={() => setTaxSlab(s)} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: taxSlab === s ? "#4F46E5" : "white", color: taxSlab === s ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "600" }}>{s}%</button>)}
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "16px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Years of Service</label>
              <input type="number" value={years} onChange={(e) => setYears(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Additional Months</label>
              <input type="number" min={0} max={11} value={months} onChange={(e) => setMonths(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Covered under Act?</label>
              <div style={{ display: "flex", gap: "6px" }}>
                <button onClick={() => setIsCovered(true)} style={{ flex: 1, padding: "9px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: isCovered ? "#4F46E5" : "white", color: isCovered ? "white" : "#374151", fontSize: "12px", cursor: "pointer", fontWeight: "500" }}>Yes (15/26)</button>
                <button onClick={() => setIsCovered(false)} style={{ flex: 1, padding: "9px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: !isCovered ? "#4F46E5" : "white", color: !isCovered ? "white" : "#374151", fontSize: "12px", cursor: "pointer", fontWeight: "500" }}>No (15/30)</button>
              </div>
            </div>
          </div>
        </div>

        {basicVal > 0 && (
          <>
            {!eligible && (
              <div style={{ background: "#FEF2F2", border: "0.5px solid #FCA5A5", borderRadius: "10px", padding: "12px 16px", marginBottom: "14px", fontSize: "13px", color: "#B91C1C" }}>
                ⚠️ Minimum 5 years of continuous service required for gratuity eligibility. {isCovered && yrsVal === 4 && monthsVal >= 6 ? "Exception: 4 yrs 6+ months qualifies if Act-covered." : `Current: ${yrsVal} years ${monthsVal} months.`}
              </div>
            )}

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Gratuity Amount</div>
                  <div style={{ fontSize: "30px", fontWeight: "700", color: "#4F46E5" }}>₹{fmt(gratuity)}</div>
                </div>
                <div style={{ textAlign: "center", borderLeft: "1px solid #C7D2FE", borderRight: "1px solid #C7D2FE" }}>
                  <div style={{ fontSize: "11px", color: "#10B981", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Tax-Exempt</div>
                  <div style={{ fontSize: "30px", fontWeight: "700", color: "#10B981" }}>₹{fmt(exemptAmount)}</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: taxableGratuity > 0 ? "#EF4444" : "#10B981", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Taxable Amount</div>
                  <div style={{ fontSize: "30px", fontWeight: "700", color: taxableGratuity > 0 ? "#EF4444" : "#10B981" }}>{taxableGratuity > 0 ? `₹${fmt(taxableGratuity)}` : "None ✓"}</div>
                </div>
              </div>
            </div>

            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
              {[
                { label: `Formula: ₹${fmt(basicVal)} × ${Math.round(serviceYears * 10) / 10} yrs × ${isCovered ? "15/26" : "15/30"}`, val: `₹${fmt(gratuity)}`, color: "#374151", bold: true },
                { label: "Tax-exempt gratuity (max ₹20,00,000)", val: `₹${fmt(exemptAmount)}`, color: "#10B981" },
                { label: "Taxable gratuity", val: taxableGratuity > 0 ? `₹${fmt(taxableGratuity)}` : "Nil", color: taxableGratuity > 0 ? "#EF4444" : "#10B981" },
                ...(taxableGratuity > 0 ? [{ label: `Tax on taxable gratuity (${taxSlab}% + 4% cess)`, val: `₹${fmt(taxOnGratuity)}`, color: "#EF4444" }] : []),
                { label: "Net gratuity received", val: `₹${fmt(netGratuity)}`, color: "#4F46E5", bold: true },
              ].map((r) => (
                <div key={r.label} style={{ padding: "11px 20px", borderBottom: "0.5px solid #F3F4F6", display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "#374151" }}>{r.label}</span>
                  <span style={{ fontWeight: r.bold ? "700" : "500", color: r.color }}>{r.val}</span>
                </div>
              ))}
            </div>

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ Gratuity Act covers organisations with 10+ employees. Tax exemption limit is ₹20 Lakhs for government employees under Section 10(10) as amended. Gratuity from private employers may be taxed differently in some cases.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
