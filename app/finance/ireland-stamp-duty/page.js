"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n) { return Math.round(n).toLocaleString("en-IE"); }
function fmtDec(n, d = 2) { return n.toLocaleString("en-IE", { minimumFractionDigits: d, maximumFractionDigits: d }); }

function calcResidential(val) {
  if (val <= 1000000) return val * 0.01;
  return 1000000 * 0.01 + (val - 1000000) * 0.02;
}

export default function IrelandStampDuty() {
  const [valueInput, setValueInput] = useState("350000");
  const [propertyType, setPropertyType] = useState("residential");

  const val = parseFloat(valueInput) || 0;

  let stampDuty = 0;
  let rateLabel = "";
  let breakdown = [];

  if (val > 0) {
    if (propertyType === "residential") {
      stampDuty = calcResidential(val);
      rateLabel = val <= 1000000 ? "1% on full value" : "1% on first €1M + 2% above";
      if (val <= 1000000) {
        breakdown = [{ label: `1% on €${fmt(val)}`, amount: val * 0.01 }];
      } else {
        breakdown = [
          { label: "1% on first €1,000,000", amount: 10000 },
          { label: `2% on €${fmt(val - 1000000)} (balance)`, amount: (val - 1000000) * 0.02 },
        ];
      }
    } else if (propertyType === "commercial") {
      stampDuty = val * 0.075;
      rateLabel = "7.5% on commercial property";
      breakdown = [{ label: `7.5% on €${fmt(val)}`, amount: val * 0.075 }];
    } else {
      // Land (non-residential)
      stampDuty = val * 0.075;
      rateLabel = "7.5% on land";
      breakdown = [{ label: `7.5% on €${fmt(val)}`, amount: val * 0.075 }];
    }
  }

  const totalCost = val + stampDuty;
  const effectiveRate = val > 0 ? (stampDuty / val) * 100 : 0;

  const QUICK = [250000, 350000, 500000, 750000, 1000000, 1500000];

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "Stamp Duty Ireland" }]} />
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>Stamp Duty Calculator Ireland 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate stamp duty on residential, commercial property and land in Ireland.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Property / Asset Value (€)</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "20px", color: "#6B7280" }}>€</span>
              <input
                type="number"
                value={valueInput}
                onChange={(e) => setValueInput(e.target.value)}
                placeholder="350000"
                style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "13px 14px 13px 38px", outline: "none", background: "white", fontSize: "24px", fontWeight: "600", boxSizing: "border-box" }}
              />
            </div>
            <div style={{ display: "flex", gap: "6px", marginTop: "8px", flexWrap: "wrap" }}>
              {QUICK.map((q) => (
                <button key={q} onClick={() => setValueInput(String(q))} style={{ padding: "5px 12px", borderRadius: "6px", border: "0.5px solid #C7D2FE", background: "white", color: "#374151", fontSize: "12px", cursor: "pointer" }}>
                  €{(q / 1000).toFixed(0)}k
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "8px" }}>Property Type</label>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {[
                { val: "residential", label: "Residential Property", desc: "Houses, apartments, buy-to-let — 1% / 2%" },
                { val: "commercial", label: "Commercial Property", desc: "Offices, shops, industrial — 7.5%" },
                { val: "land", label: "Non-Residential Land", desc: "Agricultural or development land — 7.5%" },
              ].map(({ val, label, desc }) => (
                <button key={val} onClick={() => setPropertyType(val)} style={{ padding: "11px 14px", borderRadius: "8px", border: `0.5px solid ${propertyType === val ? "#A5B4FC" : "#C7D2FE"}`, background: propertyType === val ? "#EEF2FF" : "white", cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: "600", color: propertyType === val ? "#4F46E5" : "#1E1B4B" }}>{label}</div>
                    <div style={{ fontSize: "11px", color: "#9CA3AF" }}>{desc}</div>
                  </div>
                  {propertyType === val && <span style={{ color: "#4F46E5", fontSize: "16px" }}>✓</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {val > 0 && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Stamp Duty</div>
                  <div style={{ fontSize: "36px", fontWeight: "700", color: "#EF4444" }}>€{fmt(stampDuty)}</div>
                  <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "2px" }}>{rateLabel}</div>
                </div>
                <div style={{ textAlign: "center", borderLeft: "1px solid #C7D2FE", borderRight: "1px solid #C7D2FE" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Effective Rate</div>
                  <div style={{ fontSize: "36px", fontWeight: "700", color: "#374151" }}>{fmtDec(effectiveRate, 2)}%</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Total Cost</div>
                  <div style={{ fontSize: "36px", fontWeight: "700", color: "#4F46E5" }}>€{fmt(totalCost)}</div>
                  <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "2px" }}>incl. stamp duty</div>
                </div>
              </div>
            </div>

            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
              <div style={{ padding: "10px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "12px", fontWeight: "600", color: "#6B7280", background: "#F8F9FF" }}>Calculation Breakdown</div>
              {breakdown.map((r) => (
                <div key={r.label} style={{ padding: "11px 20px", borderBottom: "0.5px solid #F3F4F6", display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "#374151" }}>{r.label}</span>
                  <span style={{ color: "#EF4444", fontWeight: "500" }}>€{fmt(r.amount)}</span>
                </div>
              ))}
              <div style={{ padding: "11px 20px", borderBottom: "0.5px solid #F3F4F6", display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "#374151" }}>Property value</span>
                <span style={{ fontWeight: "500", color: "#374151" }}>€{fmt(val)}</span>
              </div>
              <div style={{ padding: "12px 20px", display: "flex", justifyContent: "space-between", fontSize: "14px", background: "#EEF2FF" }}>
                <span style={{ fontWeight: "700", color: "#4F46E5" }}>Total cost (incl. stamp duty)</span>
                <span style={{ fontWeight: "700", color: "#4F46E5", fontSize: "16px" }}>€{fmt(totalCost)}</span>
              </div>
            </div>

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ Stamp duty rates as per Finance Act. First-time buyers may qualify for a refund on the 1% portion if building their first home (Help-to-Buy scheme applies to new builds). Consult a solicitor for your exact liability.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
