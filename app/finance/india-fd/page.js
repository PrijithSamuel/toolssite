"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n) { return Math.round(n).toLocaleString("en-IN"); }
function fmtDec(n, d = 2) { return n.toLocaleString("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d }); }

const BANKS = [
  { name: "SBI", range: "6.5 – 7.1%", rate: 6.8 },
  { name: "HDFC Bank", range: "6.6 – 7.4%", rate: 7.0 },
  { name: "ICICI Bank", range: "6.7 – 7.25%", rate: 7.0 },
  { name: "Axis Bank", range: "6.7 – 7.2%", rate: 6.95 },
  { name: "Post Office (NSC)", range: "6.9 – 7.5%", rate: 7.1 },
];

function calcFD(P, annualRate, months, compFreq) {
  const r = annualRate / 100;
  const t = months / 12;
  let maturity;
  if (compFreq === "maturity") {
    maturity = P * (1 + r * t);
  } else {
    const n = compFreq === "monthly" ? 12 : compFreq === "quarterly" ? 4 : 1;
    maturity = P * Math.pow(1 + r / n, n * t);
  }
  return maturity;
}

export default function IndiaFD() {
  const [principal, setPrincipal] = useState("500000");
  const [rate, setRate] = useState("7.0");
  const [tenure, setTenure] = useState("24");
  const [tenureUnit, setTenureUnit] = useState("months");
  const [compFreq, setCompFreq] = useState("quarterly");
  const [isSenior, setIsSenior] = useState(false);
  const [hasPAN, setHasPAN] = useState(true);

  const P = parseFloat(principal) || 0;
  const r = parseFloat(rate) || 0;
  const seniorRate = isSenior ? r + 0.5 : r;
  const months = tenureUnit === "years" ? (parseFloat(tenure) || 0) * 12 : (parseFloat(tenure) || 0);

  const maturity = P > 0 && seniorRate > 0 && months > 0 ? calcFD(P, seniorRate, months, compFreq) : 0;
  const grossInterest = maturity - P;
  const annualInterest = months > 0 ? grossInterest / (months / 12) : 0;
  const tdsThreshold = isSenior ? 50000 : 40000;
  const tdsApplies = annualInterest > tdsThreshold;
  const tdsRate = tdsApplies ? (hasPAN ? 0.10 : 0.20) : 0;
  const tdsAmount = grossInterest * tdsRate;
  const netInterest = grossInterest - tdsAmount;
  const netMaturity = P + netInterest;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "FD Calculator India" }]} />
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>FD Calculator India 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Fixed Deposit returns with TDS, compounding options and bank rate comparison.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Principal Amount (₹)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}>₹</span>
                <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "11px 12px 11px 26px", outline: "none", background: "white", fontSize: "18px", fontWeight: "600", boxSizing: "border-box" }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Interest Rate (% p.a.) {isSenior && <span style={{ color: "#10B981", fontSize: "10px" }}>+0.5% senior</span>}</label>
              <div style={{ position: "relative" }}>
                <input type="number" step="0.05" value={rate} onChange={(e) => setRate(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "11px 30px 11px 12px", outline: "none", background: "white", fontSize: "18px", fontWeight: "600", boxSizing: "border-box" }} />
                <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}>%</span>
              </div>
              {isSenior && <div style={{ fontSize: "11px", color: "#10B981", marginTop: "3px" }}>Effective rate: {fmtDec(seniorRate, 2)}%</div>}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Tenure</label>
              <div style={{ display: "flex", gap: "6px" }}>
                <input type="number" value={tenure} onChange={(e) => setTenure(e.target.value)} style={{ flex: 1, border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "15px", boxSizing: "border-box" }} />
                <select value={tenureUnit} onChange={(e) => setTenureUnit(e.target.value)} style={{ border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 8px", outline: "none", background: "white", fontSize: "13px", cursor: "pointer" }}>
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                </select>
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Compounding Frequency</label>
              <select value={compFreq} onChange={(e) => setCompFreq(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "13px", cursor: "pointer" }}>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly (most banks)</option>
                <option value="yearly">Yearly</option>
                <option value="maturity">At Maturity (simple interest)</option>
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Senior Citizen? (+0.5% extra rate)</label>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => setIsSenior(true)} style={{ flex: 1, padding: "8px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: isSenior ? "#4F46E5" : "white", color: isSenior ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>Yes</button>
                <button onClick={() => setIsSenior(false)} style={{ flex: 1, padding: "8px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: !isSenior ? "#4F46E5" : "white", color: !isSenior ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>No</button>
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>PAN provided to bank?</label>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => setHasPAN(true)} style={{ flex: 1, padding: "8px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: hasPAN ? "#4F46E5" : "white", color: hasPAN ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>Yes (10% TDS)</button>
                <button onClick={() => setHasPAN(false)} style={{ flex: 1, padding: "8px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: !hasPAN ? "#4F46E5" : "white", color: !hasPAN ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>No (20% TDS)</button>
              </div>
            </div>
          </div>
        </div>

        {maturity > 0 && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                {[
                  { label: "Maturity Value (gross)", val: `₹${fmt(maturity)}`, color: "#374151" },
                  { label: tdsApplies ? `TDS (${tdsRate * 100}%)` : "TDS — Not applicable", val: tdsApplies ? `₹${fmt(tdsAmount)}` : "₹0", color: tdsApplies ? "#EF4444" : "#10B981" },
                  { label: "Net Maturity (after TDS)", val: `₹${fmt(netMaturity)}`, color: "#4F46E5" },
                ].map((i) => (
                  <div key={i.label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "10px", color: "#6B7280", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>{i.label}</div>
                    <div style={{ fontSize: "24px", fontWeight: "700", color: i.color }}>{i.val}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: "0.5px solid #C7D2FE", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {[
                  { label: "Gross interest earned", val: `₹${fmt(grossInterest)}` },
                  { label: "Net interest (after TDS)", val: `₹${fmt(netInterest)}` },
                ].map((i) => (
                  <div key={i.label} style={{ background: "white", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
                    <div style={{ fontSize: "11px", color: "#9CA3AF" }}>{i.label}</div>
                    <div style={{ fontSize: "18px", fontWeight: "700", color: "#374151" }}>{i.val}</div>
                  </div>
                ))}
              </div>
              {!tdsApplies && <div style={{ marginTop: "10px", fontSize: "12px", color: "#10B981", textAlign: "center" }}>✓ Annual interest ₹{fmt(annualInterest)} is below TDS threshold (₹{fmt(tdsThreshold)}) — no TDS deducted.</div>}
            </div>

            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
              <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "600", color: "#374151" }}>
                Bank FD Rate Comparison — ₹{fmt(P)} for {tenure} {tenureUnit}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 110px 110px", padding: "8px 20px", fontSize: "11px", fontWeight: "600", color: "#6B7280", background: "#F8F9FF", borderBottom: "0.5px solid #E0E7FF" }}>
                <span>Bank</span><span style={{ textAlign: "center" }}>Rate</span><span style={{ textAlign: "right" }}>Gross Interest</span><span style={{ textAlign: "right" }}>Net (after TDS)</span>
              </div>
              {BANKS.map((b) => {
                const bRate = isSenior ? b.rate + 0.5 : b.rate;
                const bMat = calcFD(P, bRate, months, compFreq);
                const bGross = bMat - P;
                const bTDS = bGross * tdsRate;
                const isSelected = Math.abs(bRate - (isSenior ? seniorRate : parseFloat(rate) || 0)) < 0.3;
                return (
                  <div key={b.name} onClick={() => setRate(String(b.rate))} style={{ display: "grid", gridTemplateColumns: "1fr 80px 110px 110px", padding: "9px 20px", borderBottom: "0.5px solid #F3F4F6", fontSize: "12px", cursor: "pointer", background: isSelected ? "#F5F3FF" : "white" }}>
                    <span style={{ color: isSelected ? "#4F46E5" : "#374151", fontWeight: isSelected ? "600" : "400" }}>{b.name}</span>
                    <span style={{ textAlign: "center", color: "#374151" }}>{b.range}</span>
                    <span style={{ textAlign: "right", color: "#6B7280" }}>₹{fmt(bGross)}</span>
                    <span style={{ textAlign: "right", color: "#10B981", fontWeight: "500" }}>₹{fmt(bGross - bTDS)}</span>
                  </div>
                );
              })}
              <div style={{ padding: "8px 16px", fontSize: "11px", color: "#9CA3AF", background: "#F8F9FF" }}>Click any bank to use that rate. Rates are indicative — verify with bank before investing.</div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
