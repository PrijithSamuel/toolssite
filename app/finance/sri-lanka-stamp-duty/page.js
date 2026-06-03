"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n) { return Math.round(n).toLocaleString("en-LK"); }
function fmtDec(n, d = 1) { return n.toLocaleString("en-LK", { minimumFractionDigits: d, maximumFractionDigits: d }); }

function calcStampDuty(value) {
  // 3% up to Rs.1,000,000, 4% above Rs.1,000,000
  if (value <= 1000000) return Math.max(100, value * 0.03);
  return 1000000 * 0.03 + (value - 1000000) * 0.04;
}

const TX_TYPES = [
  { val: "sale", label: "Sale / Transfer of Property" },
  { val: "gift", label: "Gift / Deed of Gift" },
  { val: "mortgage", label: "Mortgage Deed" },
];

const QUICK = [500000, 1000000, 2000000, 5000000, 10000000];

export default function SriLankaStampDuty() {
  const [valueInput, setValueInput] = useState("5000000");
  const [txType, setTxType] = useState("sale");

  const value = parseFloat(valueInput) || 0;

  const stampDuty = value > 0 ? calcStampDuty(value) : 0;
  const localGovtFee = value * 0.015;
  const totalPayable = stampDuty + localGovtFee;
  const effectiveRate = value > 0 ? (stampDuty / value) * 100 : 0;

  // Mortgage stamp duty is different — 1% of loan amount (simplified)
  const mortgageStamp = txType === "mortgage" ? value * 0.01 : 0;
  const displayStamp = txType === "mortgage" ? mortgageStamp : stampDuty;
  const displayTotal = txType === "mortgage" ? mortgageStamp : totalPayable;

  const breakdown = value > 0 && txType !== "mortgage" ? (
    value <= 1000000
      ? [{ label: `3% on Rs.${fmt(value)}`, amount: stampDuty }]
      : [
          { label: "3% on first Rs.1,000,000", amount: 30000 },
          { label: `4% on Rs.${fmt(value - 1000000)} (balance)`, amount: (value - 1000000) * 0.04 },
        ]
  ) : [];

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "Stamp Duty Sri Lanka" }]} />
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>Stamp Duty Calculator Sri Lanka 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate stamp duty and transfer fees for property transactions in Sri Lanka.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>
              {txType === "mortgage" ? "Loan / Mortgage Amount (Rs.)" : "Property Value (Rs.)"}
            </label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "#6B7280", fontWeight: "600" }}>Rs.</span>
              <input
                type="number"
                value={valueInput}
                onChange={(e) => setValueInput(e.target.value)}
                placeholder="5000000"
                style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "13px 12px 13px 44px", outline: "none", background: "white", fontSize: "22px", fontWeight: "600", boxSizing: "border-box" }}
              />
            </div>
            <div style={{ display: "flex", gap: "6px", marginTop: "8px", flexWrap: "wrap" }}>
              {QUICK.map((q) => (
                <button key={q} onClick={() => setValueInput(String(q))} style={{ padding: "4px 10px", borderRadius: "6px", border: "0.5px solid #C7D2FE", background: "white", color: "#374151", fontSize: "11px", cursor: "pointer" }}>
                  Rs.{q >= 1000000 ? `${q / 1000000}M` : `${q / 1000}K`}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "7px" }}>Transaction Type</label>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {TX_TYPES.map(({ val, label }) => (
                <button key={val} onClick={() => setTxType(val)} style={{ padding: "10px 14px", borderRadius: "8px", border: `0.5px solid ${txType === val ? "#A5B4FC" : "#C7D2FE"}`, background: txType === val ? "#EEF2FF" : "white", cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "13px", fontWeight: "600", color: txType === val ? "#4F46E5" : "#1E1B4B" }}>{label}</span>
                  {txType === val && <span style={{ color: "#4F46E5" }}>✓</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {value > 0 && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#EF4444", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Stamp Duty</div>
                  <div style={{ fontSize: "32px", fontWeight: "700", color: "#EF4444" }}>Rs.{fmt(displayStamp)}</div>
                  <div style={{ fontSize: "11px", color: "#9CA3AF" }}>effective {fmtDec(effectiveRate)}%</div>
                </div>
                {txType !== "mortgage" && (
                  <div style={{ textAlign: "center", borderLeft: "1px solid #C7D2FE", borderRight: "1px solid #C7D2FE" }}>
                    <div style={{ fontSize: "11px", color: "#F97316", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Local Govt. Fee</div>
                    <div style={{ fontSize: "32px", fontWeight: "700", color: "#F97316" }}>Rs.{fmt(localGovtFee)}</div>
                    <div style={{ fontSize: "11px", color: "#9CA3AF" }}>1.5% of value</div>
                  </div>
                )}
                <div style={{ textAlign: "center", borderLeft: txType !== "mortgage" ? "none" : "none" }}>
                  <div style={{ fontSize: "11px", color: "#4F46E5", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Total Payable</div>
                  <div style={{ fontSize: "32px", fontWeight: "700", color: "#4F46E5" }}>Rs.{fmt(displayTotal)}</div>
                  <div style={{ fontSize: "11px", color: "#9CA3AF" }}>stamp duty {txType !== "mortgage" ? "+ transfer fee" : ""}</div>
                </div>
              </div>
            </div>

            {breakdown.length > 0 && (
              <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
                <div style={{ padding: "10px 20px", fontSize: "12px", fontWeight: "600", color: "#6B7280", background: "#F8F9FF", borderBottom: "0.5px solid #E0E7FF" }}>Stamp Duty Breakdown</div>
                {breakdown.map((r) => (
                  <div key={r.label} style={{ padding: "10px 20px", borderBottom: "0.5px solid #F3F4F6", display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                    <span style={{ color: "#374151" }}>{r.label}</span>
                    <span style={{ color: "#EF4444", fontWeight: "500" }}>Rs.{fmt(r.amount)}</span>
                  </div>
                ))}
                <div style={{ padding: "10px 20px", borderBottom: "0.5px solid #F3F4F6", display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "#374151" }}>Local Government Transfer Fee (1.5%)</span>
                  <span style={{ color: "#F97316", fontWeight: "500" }}>Rs.{fmt(localGovtFee)}</span>
                </div>
                <div style={{ padding: "11px 20px", display: "flex", justifyContent: "space-between", fontSize: "13px", background: "#EEF2FF" }}>
                  <span style={{ fontWeight: "700", color: "#4F46E5" }}>Total Payable</span>
                  <span style={{ fontWeight: "700", color: "#4F46E5", fontSize: "15px" }}>Rs.{fmt(displayTotal)}</span>
                </div>
              </div>
            )}

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ Stamp duty rates as per the Stamp Duty (Special Provisions) Act. First Rs.100 minimum applies. Consult a licensed notary or attorney for exact payable amounts and applicable exemptions.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
