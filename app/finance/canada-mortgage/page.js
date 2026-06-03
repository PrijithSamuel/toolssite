"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n) { return Math.round(n).toLocaleString("en-CA"); }
function fmtDec(n, d = 2) { return n.toLocaleString("en-CA", { minimumFractionDigits: d, maximumFractionDigits: d }); }

function calcLTT(price, province) {
  if (province === "ON") {
    let ltt = 0;
    ltt += Math.min(price, 55000) * 0.005;
    if (price > 55000) ltt += (Math.min(price, 250000) - 55000) * 0.01;
    if (price > 250000) ltt += (Math.min(price, 400000) - 250000) * 0.015;
    if (price > 400000) ltt += (price - 400000) * 0.02;
    return ltt;
  }
  if (province === "BC") {
    let ltt = 0;
    ltt += Math.min(price, 200000) * 0.01;
    if (price > 200000) ltt += (Math.min(price, 2000000) - 200000) * 0.02;
    if (price > 2000000) ltt += (price - 2000000) * 0.03;
    return ltt;
  }
  return price * 0.015; // approximate for other provinces
}

function cmhcRate(downPct) {
  if (downPct >= 20) return 0;
  if (downPct >= 15) return 0.028;
  if (downPct >= 10) return 0.031;
  return 0.04;
}

function calcPayment(principal, annualRate, years, freq) {
  let paymentsPerYear = freq === "monthly" ? 12 : 26;
  const r = annualRate / 100 / paymentsPerYear;
  const n = years * paymentsPerYear;
  if (r === 0) return principal / n;
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

const PROVINCES_LTT = [
  { code: "ON", name: "Ontario" }, { code: "BC", name: "British Columbia" },
  { code: "AB", name: "Alberta" }, { code: "QC", name: "Quebec" },
  { code: "MB", name: "Manitoba" }, { code: "SK", name: "Saskatchewan" },
  { code: "NS", name: "Nova Scotia" }, { code: "NB", name: "New Brunswick" },
  { code: "NL", name: "Newfoundland" }, { code: "PE", name: "PEI" },
];

export default function CanadaMortgage() {
  const [price, setPrice] = useState("650000");
  const [downInput, setDownInput] = useState("130000");
  const [rateInput, setRateInput] = useState("5.5");
  const [amort, setAmort] = useState("25");
  const [freq, setFreq] = useState("monthly");
  const [province, setProvince] = useState("ON");

  const priceVal = parseFloat(price) || 0;
  const downVal = parseFloat(downInput) || 0;
  const rateVal = parseFloat(rateInput) || 0;
  const amortVal = parseInt(amort) || 25;

  const downPct = priceVal > 0 ? (downVal / priceVal) * 100 : 0;
  const mortgageBase = Math.max(0, priceVal - downVal);

  // Minimum down payment rules
  let minDownPct = 5;
  if (priceVal > 1000000) minDownPct = 20;
  else if (priceVal > 500000) minDownPct = 5 + ((priceVal - 500000) * 0.10 / priceVal) * 100;
  const minDown = priceVal * minDownPct / 100;
  const belowMinDown = downVal < minDown;

  const cmhc = cmhcRate(downPct);
  const cmhcAmount = mortgageBase * cmhc;
  const totalMortgage = mortgageBase + cmhcAmount;

  const payment = totalMortgage > 0 ? calcPayment(totalMortgage, rateVal, amortVal, freq) : 0;
  const paymentsPerYear = freq === "monthly" ? 12 : 26;
  const totalPaid = payment * amortVal * paymentsPerYear;
  const totalInterest = totalPaid - totalMortgage;

  const ltt = priceVal > 0 ? calcLTT(priceVal, province) : 0;

  // Stress test
  const stressRate = Math.max(rateVal + 2, 5.25);
  const stressPayment = totalMortgage > 0 ? calcPayment(totalMortgage, stressRate, amortVal, "monthly") : 0;
  const qualifyingIncome = stressPayment * 12 / 0.32; // 32% GDS ratio

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "Canadian Mortgage Calculator" }]} />
      <div style={{ maxWidth: "740px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>Canadian Mortgage Calculator 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>CMHC insurance, stress test qualifying income, and land transfer tax for all provinces.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Home Price ($)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}>$</span>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px 10px 24px", outline: "none", background: "white", fontSize: "15px", boxSizing: "border-box" }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>
                Down Payment ($) {priceVal > 0 && <span style={{ color: "#6366F1", fontWeight: "400" }}>— {fmtDec(downPct, 1)}%</span>}
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}>$</span>
                <input type="number" value={downInput} onChange={(e) => setDownInput(e.target.value)} style={{ width: "100%", border: `0.5px solid ${belowMinDown ? "#FCA5A5" : "#C7D2FE"}`, borderRadius: "8px", padding: "10px 12px 10px 24px", outline: "none", background: belowMinDown ? "#FFF5F5" : "white", fontSize: "15px", boxSizing: "border-box" }} />
              </div>
              {priceVal > 0 && <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "3px" }}>Mortgage: ${fmt(mortgageBase)}</div>}
            </div>
          </div>

          {belowMinDown && (
            <div style={{ background: "#FEF2F2", border: "0.5px solid #FCA5A5", borderRadius: "8px", padding: "9px 14px", marginBottom: "12px", fontSize: "12px", color: "#B91C1C" }}>
              ⚠️ Minimum down payment is ${fmt(minDown)} ({fmtDec(minDownPct, 1)}%) for this price.
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Interest Rate (%)</label>
              <input type="number" step="0.05" value={rateInput} onChange={(e) => setRateInput(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "15px", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Amortization (years)</label>
              <select value={amort} onChange={(e) => setAmort(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "13px", cursor: "pointer" }}>
                {[5, 10, 15, 20, 25, 30].map((y) => <option key={y} value={y}>{y} years{y === 25 ? " (max insured)" : ""}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Payment Frequency</label>
              <select value={freq} onChange={(e) => setFreq(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "13px", cursor: "pointer" }}>
                <option value="monthly">Monthly</option>
                <option value="biweekly">Bi-weekly</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Province (for land transfer tax)</label>
            <select value={province} onChange={(e) => setProvince(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "13px", cursor: "pointer" }}>
              {PROVINCES_LTT.map((p) => <option key={p.code} value={p.code}>{p.name}</option>)}
            </select>
          </div>
        </div>

        {totalMortgage > 0 && (
          <>
            {cmhc > 0 && (
              <div style={{ background: "#FEF9EC", border: "0.5px solid #FCD34D", borderRadius: "10px", padding: "12px 16px", marginBottom: "14px", fontSize: "12px", color: "#92400E" }}>
                🏛️ <strong>CMHC insurance applies</strong> — down payment under 20%. Premium: {(cmhc * 100).toFixed(1)}% = ${fmt(cmhcAmount)} added to mortgage. Total insured mortgage: ${fmt(totalMortgage)}.
              </div>
            )}

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>{freq === "monthly" ? "Monthly" : "Bi-weekly"} Payment</div>
                  <div style={{ fontSize: "40px", fontWeight: "700", color: "#4F46E5" }}>${fmt(payment)}</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {[
                    { label: "Total interest", val: `$${fmt(totalInterest)}` },
                    { label: "Land transfer tax", val: `$${fmt(ltt)}` },
                    { label: "Stress test rate", val: `${fmtDec(stressRate, 2)}%` },
                    { label: "Income needed", val: `$${fmt(qualifyingIncome)}/yr` },
                  ].map((i) => (
                    <div key={i.label} style={{ background: "white", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
                      <div style={{ fontSize: "10px", color: "#9CA3AF" }}>{i.label}</div>
                      <div style={{ fontSize: "14px", fontWeight: "700", color: "#374151" }}>{i.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
              {[
                { label: "Home price", val: priceVal },
                { label: "Down payment", val: downVal },
                { label: "Mortgage amount (base)", val: mortgageBase },
                ...(cmhc > 0 ? [{ label: `CMHC insurance (${(cmhc * 100).toFixed(1)}%)`, val: cmhcAmount }] : []),
                { label: "Total mortgage", val: totalMortgage, bold: true },
                { label: "Total repaid over amortization", val: totalPaid },
                { label: "Total interest paid", val: totalInterest, color: "#EF4444" },
                { label: "Land transfer tax", val: ltt, color: "#F97316" },
              ].map((r) => (
                <div key={r.label} style={{ padding: "10px 20px", borderBottom: "0.5px solid #F3F4F6", display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "#374151" }}>{r.label}</span>
                  <span style={{ fontWeight: r.bold ? "700" : "500", color: r.color || "#1E1B4B" }}>${fmt(r.val)}</span>
                </div>
              ))}
            </div>

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ Stress test qualifying income uses {fmtDec(stressRate, 2)}% rate with 32% GDS ratio. CMHC insurance is required for insured mortgages with down payments under 20% and purchase price under $1.5M. Consult a mortgage broker for personalized advice.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
