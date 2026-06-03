"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n) { return Math.round(n).toLocaleString("en-SG"); }
function fmtDec(n, d = 2) { return n.toLocaleString("en-SG", { minimumFractionDigits: d, maximumFractionDigits: d }); }

function calcBSD(price) {
  let bsd = 0;
  bsd += Math.min(price, 180000) * 0.01;
  if (price > 180000) bsd += (Math.min(price, 360000) - 180000) * 0.02;
  if (price > 360000) bsd += (Math.min(price, 1000000) - 360000) * 0.03;
  if (price > 1000000) bsd += (Math.min(price, 1500000) - 1000000) * 0.04;
  if (price > 1500000) bsd += (Math.min(price, 3000000) - 1500000) * 0.05;
  if (price > 3000000) bsd += (price - 3000000) * 0.06;
  return Math.round(bsd);
}

const ABSD_RATES = {
  sc: [0, 0.20, 0.30],
  pr: [0.05, 0.30, 0.30],
  foreigner: [0.60, 0.60, 0.60],
  entity: [0.65, 0.65, 0.65],
};

const BUYER_TYPES = [
  { val: "sc", label: "Singapore Citizen" },
  { val: "pr", label: "Singapore PR" },
  { val: "foreigner", label: "Foreigner" },
  { val: "entity", label: "Entity / Company" },
];

const QUICK = [500000, 800000, 1000000, 1500000, 2000000, 3000000];

export default function SingaporeStampDuty() {
  const [price, setPrice] = useState("1000000");
  const [buyerType, setBuyerType] = useState("sc");
  const [propertyNo, setPropertyNo] = useState(1);
  const [propertyType, setPropertyType] = useState("residential");

  const priceVal = parseFloat(price) || 0;
  const bsd = priceVal > 0 ? calcBSD(priceVal) : 0;

  const absdRates = ABSD_RATES[buyerType] || [0, 0, 0];
  const absdRateIdx = Math.min(propertyNo - 1, 2);
  const absdRate = propertyType === "residential" ? absdRates[absdRateIdx] : 0;
  const absd = Math.round(priceVal * absdRate);
  const totalSD = bsd + absd;
  const totalCost = priceVal + totalSD;

  const bsdRows = priceVal > 0 ? [
    { label: "First S$180,000 @ 1%", from: 0, to: 180000, rate: 0.01 },
    { label: "Next S$180,000 @ 2%", from: 180000, to: 360000, rate: 0.02 },
    { label: "Next S$640,000 @ 3%", from: 360000, to: 1000000, rate: 0.03 },
    { label: "Next S$500,000 @ 4%", from: 1000000, to: 1500000, rate: 0.04 },
    { label: "Next S$1,500,000 @ 5%", from: 1500000, to: 3000000, rate: 0.05 },
    { label: "Above S$3,000,000 @ 6%", from: 3000000, to: Infinity, rate: 0.06 },
  ].filter((r) => priceVal > r.from).map((r) => ({
    label: r.label,
    amount: (Math.min(priceVal, r.to === Infinity ? priceVal : r.to) - r.from) * r.rate,
  })) : [];

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "Stamp Duty Singapore" }]} />
      <div style={{ maxWidth: "740px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>Stamp Duty Calculator Singapore 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>BSD and ABSD for residential and non-residential properties — all buyer categories.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Property Purchase Price (S$)</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "#6B7280", fontWeight: "600" }}>S$</span>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "13px 14px 13px 36px", outline: "none", background: "white", fontSize: "22px", fontWeight: "700", boxSizing: "border-box" }} />
            </div>
            <div style={{ display: "flex", gap: "6px", marginTop: "8px", flexWrap: "wrap" }}>
              {QUICK.map((q) => (
                <button key={q} onClick={() => setPrice(String(q))} style={{ padding: "4px 10px", borderRadius: "6px", border: "0.5px solid #C7D2FE", background: "white", color: "#374151", fontSize: "11px", cursor: "pointer" }}>
                  S${q >= 1000000 ? `${q / 1000000}M` : `${q / 1000}K`}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Buyer Type</label>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                {BUYER_TYPES.map(({ val, label }) => (
                  <button key={val} onClick={() => setBuyerType(val)} style={{ padding: "8px 12px", borderRadius: "8px", border: `0.5px solid ${buyerType === val ? "#A5B4FC" : "#C7D2FE"}`, background: buyerType === val ? "#EEF2FF" : "white", cursor: "pointer", textAlign: "left", fontSize: "13px", fontWeight: buyerType === val ? "600" : "400", color: buyerType === val ? "#4F46E5" : "#374151" }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Residential Property Number</label>
                <div style={{ display: "flex", gap: "6px" }}>
                  {[1, 2, 3].map((n) => (
                    <button key={n} onClick={() => setPropertyNo(n)} style={{ flex: 1, padding: "9px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: propertyNo === n ? "#4F46E5" : "white", color: propertyNo === n ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "600" }}>
                      {n}{n === 3 ? "rd+" : n === 2 ? "nd" : "st"}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Property Type</label>
                <div style={{ display: "flex", gap: "6px" }}>
                  {[{ val: "residential", label: "Residential" }, { val: "non-residential", label: "Non-Residential" }].map(({ val, label }) => (
                    <button key={val} onClick={() => setPropertyType(val)} style={{ flex: 1, padding: "9px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: propertyType === val ? "#4F46E5" : "white", color: propertyType === val ? "white" : "#374151", fontSize: "12px", cursor: "pointer", fontWeight: "500" }}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {priceVal > 0 && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                {[
                  { label: "BSD (Buyer Stamp Duty)", val: `S$${fmt(bsd)}`, color: "#374151" },
                  { label: `ABSD (${(absdRate * 100).toFixed(0)}%)${propertyType !== "residential" ? " — N/A" : ""}`, val: absdRate > 0 ? `S$${fmt(absd)}` : "None", color: absdRate > 0 ? "#EF4444" : "#10B981" },
                  { label: "Total Stamp Duty", val: `S$${fmt(totalSD)}`, color: "#4F46E5" },
                ].map((i) => (
                  <div key={i.label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "11px", color: "#6B7280", fontWeight: "600", marginBottom: "4px" }}>{i.label}</div>
                    <div style={{ fontSize: "26px", fontWeight: "700", color: i.color }}>{i.val}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: "0.5px solid #C7D2FE", display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "#374151" }}>Total property cost (incl. stamp duty)</span>
                <span style={{ fontWeight: "700", color: "#4F46E5", fontSize: "16px" }}>S${fmt(totalCost)}</span>
              </div>
            </div>

            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
              <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "600", color: "#374151" }}>BSD Breakdown</div>
              {bsdRows.map((r) => (
                <div key={r.label} style={{ padding: "9px 20px", borderBottom: "0.5px solid #F3F4F6", display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                  <span style={{ color: "#374151" }}>{r.label}</span>
                  <span style={{ color: "#374151", fontWeight: "500" }}>S${fmt(r.amount)}</span>
                </div>
              ))}
              <div style={{ padding: "10px 20px", display: "flex", justifyContent: "space-between", fontSize: "13px", background: "#EEF2FF" }}>
                <span style={{ fontWeight: "700", color: "#374151" }}>Total BSD</span>
                <span style={{ fontWeight: "700", color: "#374151" }}>S${fmt(bsd)}</span>
              </div>
              {absd > 0 && (
                <div style={{ padding: "10px 20px", display: "flex", justifyContent: "space-between", fontSize: "13px", background: "#FEF2F2" }}>
                  <span style={{ fontWeight: "700", color: "#EF4444" }}>ABSD ({(absdRate * 100).toFixed(0)}% on S${fmt(priceVal)})</span>
                  <span style={{ fontWeight: "700", color: "#EF4444" }}>S${fmt(absd)}</span>
                </div>
              )}
            </div>

            {/* ABSD reference table */}
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
              <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "600", color: "#374151" }}>ABSD Rates Reference 2025</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px 80px", padding: "8px 20px", fontSize: "11px", fontWeight: "600", color: "#6B7280", background: "#F8F9FF", borderBottom: "0.5px solid #E0E7FF" }}>
                <span>Buyer Type</span><span style={{ textAlign: "center" }}>1st Property</span><span style={{ textAlign: "center" }}>2nd Property</span><span style={{ textAlign: "center" }}>3rd+</span>
              </div>
              {BUYER_TYPES.map(({ val, label }) => {
                const rates = ABSD_RATES[val];
                const isSelected = buyerType === val;
                return (
                  <div key={val} style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px 80px", padding: "9px 20px", borderBottom: "0.5px solid #F3F4F6", fontSize: "12px", background: isSelected ? "#F5F3FF" : "white" }}>
                    <span style={{ color: isSelected ? "#4F46E5" : "#374151", fontWeight: isSelected ? "600" : "400" }}>{label}</span>
                    {rates.map((r, i) => <span key={i} style={{ textAlign: "center", color: r > 0 ? "#EF4444" : "#10B981", fontWeight: "500" }}>{r > 0 ? `${(r * 100).toFixed(0)}%` : "0%"}</span>)}
                  </div>
                );
              })}
            </div>

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ Stamp duty must be paid within 14 days of signing the Option to Purchase (OTP). ABSD remission may apply for married couples (SC + SC or SC + PR) buying their first residential property jointly. Verify at IRAS.gov.sg.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
