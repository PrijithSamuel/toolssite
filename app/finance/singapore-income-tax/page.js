"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n) { return Math.round(Math.abs(n)).toLocaleString("en-SG"); }
function fmtDec(n, d = 1) { return Math.abs(n).toLocaleString("en-SG", { minimumFractionDigits: d, maximumFractionDigits: d }); }

const TAX_BANDS = [
  { from: 0, to: 20000, rate: 0, fixed: 0 },
  { from: 20000, to: 30000, rate: 0.02, fixed: 0 },
  { from: 30000, to: 40000, rate: 0.035, fixed: 200 },
  { from: 40000, to: 80000, rate: 0.07, fixed: 550 },
  { from: 80000, to: 120000, rate: 0.115, fixed: 3350 },
  { from: 120000, to: 160000, rate: 0.15, fixed: 7950 },
  { from: 160000, to: 200000, rate: 0.18, fixed: 13950 },
  { from: 200000, to: 240000, rate: 0.19, fixed: 21150 },
  { from: 240000, to: 280000, rate: 0.195, fixed: 28750 },
  { from: 280000, to: 320000, rate: 0.20, fixed: 36550 },
  { from: 320000, to: 960000, rate: 0.22, fixed: 44550 },
  { from: 960000, to: 1000000, rate: 0.22, fixed: 185350 },
  { from: 1000000, to: Infinity, rate: 0.24, fixed: 194150 },
];

function calcTaxResident(chargeableIncome) {
  const band = [...TAX_BANDS].reverse().find((b) => chargeableIncome > b.from) || TAX_BANDS[0];
  const tax = band.fixed + (chargeableIncome - band.from) * band.rate;
  const rows = TAX_BANDS.filter((b) => chargeableIncome > b.from && b.rate > 0).map((b) => {
    const taxable = Math.min(chargeableIncome, b.to) - b.from;
    return { label: `S$${fmt(b.from + 1)} – ${b.to === Infinity ? "above" : "S$" + fmt(b.to)}`, rate: b.rate, taxable, tax: taxable * b.rate };
  });
  return { tax: Math.max(0, tax), rows };
}

export default function SingaporeIncomeTax() {
  const [income, setIncome] = useState("120000");
  const [residency, setResidency] = useState("resident");
  const [cpfRelief, setCpfRelief] = useState("20400");
  const [nsmanRelief, setNsmanRelief] = useState("0");
  const [courseRelief, setCourseRelief] = useState("0");
  const [parentRelief, setParentRelief] = useState("0");
  const [childRelief, setChildRelief] = useState("0");
  const [srsRelief, setSrsRelief] = useState("0");

  const grossIncome = parseFloat(income) || 0;
  const totalReliefs = Math.min(80000,
    (parseFloat(cpfRelief) || 0) +
    (parseFloat(nsmanRelief) || 0) +
    (parseFloat(courseRelief) || 0) +
    (parseFloat(parentRelief) || 0) +
    (parseFloat(childRelief) || 0) +
    (parseFloat(srsRelief) || 0)
  );

  const chargeableIncome = residency === "resident" ? Math.max(0, grossIncome - totalReliefs) : grossIncome;
  const { tax, rows } = residency === "resident" ? calcTaxResident(chargeableIncome) : { tax: Math.max(chargeableIncome * 0.24, chargeableIncome * 0.15), rows: [] };
  const effectiveRate = grossIncome > 0 ? (tax / grossIncome) * 100 : 0;
  const monthlySet = tax / 12;

  const RELIEF_FIELDS = [
    { label: "CPF Relief (based on contributions)", val: cpfRelief, set: setCpfRelief, hint: "Employee CPF contribution — 20% of salary (max S$37,740)" },
    { label: "NSman Relief (S$1,500 / S$3,500)", val: nsmanRelief, set: setNsmanRelief, hint: "S$1,500 active NSman or S$3,500 key appointment holder" },
    { label: "Course Fees Relief (max S$5,500)", val: courseRelief, set: setCourseRelief, hint: "Approved courses for upgrading skills" },
    { label: "Parent Relief (S$5,500 or S$9,000 each)", val: parentRelief, set: setParentRelief, hint: "S$5,500 per parent; S$9,000 if living together" },
    { label: "Child Relief (S$4,000 per child)", val: childRelief, set: setChildRelief, hint: "Qualifying child relief" },
    { label: "SRS Relief (amount contributed)", val: srsRelief, set: setSrsRelief, hint: "Supplementary Retirement Scheme contributions" },
  ];

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "Singapore Income Tax" }]} />
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>Singapore Income Tax Calculator 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>IRAS YA2026 tax rates — progressive resident rates with reliefs, or non-resident flat rate.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Annual Employment Income (S$)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "#6B7280", fontWeight: "600" }}>S$</span>
                <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "12px 12px 12px 36px", outline: "none", background: "white", fontSize: "20px", fontWeight: "600", boxSizing: "border-box" }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Tax Residency Status</label>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                {[{ val: "resident", label: "Tax Resident (progressive rates)" }, { val: "non-resident", label: "Non-Resident (24% / 15%)" }].map(({ val, label }) => (
                  <button key={val} onClick={() => setResidency(val)} style={{ padding: "9px 14px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: residency === val ? "#4F46E5" : "white", color: residency === val ? "white" : "#374151", fontSize: "13px", cursor: "pointer", textAlign: "left", fontWeight: "500" }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {residency === "resident" && (
            <>
              <div style={{ borderTop: "0.5px solid #E0E7FF", paddingTop: "14px", marginBottom: "6px" }}>
                <div style={{ fontSize: "12px", fontWeight: "700", color: "#374151", marginBottom: "8px" }}>
                  Tax Reliefs <span style={{ color: "#9CA3AF", fontWeight: "400" }}>(total capped at S$80,000)</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {RELIEF_FIELDS.map((f) => (
                    <div key={f.label}>
                      <label style={{ fontSize: "11px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "3px" }}>{f.label}</label>
                      <div style={{ position: "relative" }}>
                        <span style={{ position: "absolute", left: "9px", top: "50%", transform: "translateY(-50%)", fontSize: "12px", color: "#6B7280", fontWeight: "600" }}>S$</span>
                        <input type="number" value={f.val} onChange={(e) => f.set(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "7px", padding: "8px 10px 8px 32px", outline: "none", background: "white", fontSize: "13px", boxSizing: "border-box" }} />
                      </div>
                      <div style={{ fontSize: "10px", color: "#9CA3AF", marginTop: "2px" }}>{f.hint}</div>
                    </div>
                  ))}
                </div>
                {totalReliefs >= 80000 && (
                  <div style={{ marginTop: "8px", fontSize: "12px", color: "#F97316", background: "#FFF7ED", borderRadius: "6px", padding: "6px 12px" }}>
                    ⚠️ Total reliefs capped at S$80,000 — applying S${fmt(80000)} out of S${fmt(
                      (parseFloat(cpfRelief) || 0) + (parseFloat(nsmanRelief) || 0) + (parseFloat(courseRelief) || 0) +
                      (parseFloat(parentRelief) || 0) + (parseFloat(childRelief) || 0) + (parseFloat(srsRelief) || 0)
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {grossIncome > 0 && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "14px" }}>
                {[
                  { label: "Total Tax Payable", val: `S$${fmt(tax)}`, color: "#EF4444" },
                  { label: "Chargeable Income", val: `S$${fmt(chargeableIncome)}`, color: "#374151" },
                  { label: "Effective Tax Rate", val: `${fmtDec(effectiveRate)}%`, color: "#4F46E5" },
                ].map((i) => (
                  <div key={i.label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>{i.label}</div>
                    <div style={{ fontSize: "28px", fontWeight: "700", color: i.color }}>{i.val}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {[
                  { label: "Total reliefs applied", val: `S$${fmt(totalReliefs)}` },
                  { label: "Monthly tax to set aside", val: `S$${fmt(monthlySet)}` },
                ].map((i) => (
                  <div key={i.label} style={{ background: "white", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
                    <div style={{ fontSize: "11px", color: "#9CA3AF" }}>{i.label}</div>
                    <div style={{ fontSize: "18px", fontWeight: "700", color: "#374151" }}>{i.val}</div>
                  </div>
                ))}
              </div>
            </div>

            {residency === "resident" && rows.length > 0 && (
              <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
                <div style={{ padding: "10px 20px", display: "grid", gridTemplateColumns: "1fr 100px 80px 100px", fontSize: "11px", fontWeight: "600", color: "#6B7280", background: "#F8F9FF", borderBottom: "0.5px solid #E0E7FF" }}>
                  <span>Income Band</span><span style={{ textAlign: "right" }}>Amount</span><span style={{ textAlign: "right" }}>Rate</span><span style={{ textAlign: "right" }}>Tax</span>
                </div>
                {rows.map((r) => (
                  <div key={r.label} style={{ padding: "9px 20px", borderBottom: "0.5px solid #F3F4F6", display: "grid", gridTemplateColumns: "1fr 100px 80px 100px", fontSize: "12px" }}>
                    <span style={{ color: "#374151" }}>{r.label}</span>
                    <span style={{ textAlign: "right", color: "#6B7280" }}>S${fmt(r.taxable)}</span>
                    <span style={{ textAlign: "right", color: "#6B7280" }}>{(r.rate * 100).toFixed(1)}%</span>
                    <span style={{ textAlign: "right", color: "#EF4444", fontWeight: "500" }}>S${fmt(r.tax)}</span>
                  </div>
                ))}
                <div style={{ padding: "10px 20px", display: "grid", gridTemplateColumns: "1fr 100px 80px 100px", fontSize: "13px", background: "#EEF2FF" }}>
                  <span style={{ fontWeight: "700", color: "#4F46E5" }}>Total Tax</span>
                  <span style={{ textAlign: "right", color: "#374151", fontWeight: "600" }}>S${fmt(chargeableIncome)}</span>
                  <span style={{ textAlign: "right", color: "#6B7280" }}>{fmtDec(effectiveRate)}%</span>
                  <span style={{ textAlign: "right", fontWeight: "700", color: "#EF4444" }}>S${fmt(tax)}</span>
                </div>
              </div>
            )}

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ Based on IRAS YA2026 progressive tax rates. Reliefs capped at S$80,000. Does not include personal income tax rebates, earned income relief, or spousal relief. File your tax return via myTax Portal at mytax.iras.gov.sg by 18 Apr 2026.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
