"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n) { return Math.round(n).toLocaleString("en-IE"); }
function fmtDec(n, d = 2) { return n.toLocaleString("en-IE", { minimumFractionDigits: d, maximumFractionDigits: d }); }

function calcMonthlyRepayment(principal, annualRate, years) {
  if (annualRate === 0) return principal / (years * 12);
  const r = annualRate / 100 / 12;
  const n = years * 12;
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function calcStampDuty(price) {
  if (price <= 1000000) return price * 0.01;
  return 1000000 * 0.01 + (price - 1000000) * 0.02;
}

export default function IrelandMortgage() {
  const [price, setPrice] = useState("350000");
  const [deposit, setDeposit] = useState("35000");
  const [interestRate, setInterestRate] = useState("4.0");
  const [term, setTerm] = useState("30");
  const [buyerType, setBuyerType] = useState("ftb");
  const [mortgageType, setMortgageType] = useState("repayment");

  const priceVal = parseFloat(price) || 0;
  const depositVal = parseFloat(deposit) || 0;
  const rateVal = parseFloat(interestRate) || 0;
  const termVal = parseInt(term) || 30;

  const mortgageAmount = Math.max(0, priceVal - depositVal);
  const ltvPct = priceVal > 0 ? (mortgageAmount / priceVal) * 100 : 0;
  const depositPct = priceVal > 0 ? (depositVal / priceVal) * 100 : 0;

  const maxLTV = buyerType === "ftb" ? 90 : 80;
  const minDepositPct = 100 - maxLTV;
  const minDeposit = priceVal * (minDepositPct / 100);
  const ltvWarning = ltvPct > maxLTV;

  const monthlyPayment = mortgageAmount > 0 && mortgageType === "repayment"
    ? calcMonthlyRepayment(mortgageAmount, rateVal, termVal)
    : mortgageAmount > 0 ? (mortgageAmount * rateVal / 100 / 12) : 0;

  const totalRepaid = mortgageType === "repayment" ? monthlyPayment * termVal * 12 : 0;
  const totalInterest = mortgageType === "repayment" ? totalRepaid - mortgageAmount : 0;
  const stampDuty = priceVal > 0 ? calcStampDuty(priceVal) : 0;
  const totalCost = priceVal + stampDuty;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "Mortgage Calculator Ireland" }]} />
      <div style={{ maxWidth: "740px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>Mortgage Calculator Ireland 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Estimate monthly repayments with Central Bank LTV rules and stamp duty.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          {/* Buyer type */}
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Buyer Type</label>
            <div style={{ display: "flex", gap: "8px" }}>
              {[{ val: "ftb", label: "First-Time Buyer (max 90% LTV)" }, { val: "stb", label: "Second-Time Buyer (max 80% LTV)" }].map(({ val, label }) => (
                <button key={val} onClick={() => setBuyerType(val)} style={{ flex: 1, padding: "9px 12px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: buyerType === val ? "#4F46E5" : "white", color: buyerType === val ? "white" : "#374151", fontSize: "12px", cursor: "pointer", fontWeight: "500" }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Price + Deposit */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Property Price (€)</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "15px", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>
                Deposit (€) {priceVal > 0 && <span style={{ color: "#6366F1", fontWeight: "500" }}>— {fmtDec(depositPct, 1)}%</span>}
              </label>
              <input type="number" value={deposit} onChange={(e) => setDeposit(e.target.value)} style={{ width: "100%", border: `0.5px solid ${ltvWarning ? "#FCA5A5" : "#C7D2FE"}`, borderRadius: "8px", padding: "10px 12px", outline: "none", background: ltvWarning ? "#FFF5F5" : "white", fontSize: "15px", boxSizing: "border-box" }} />
              {priceVal > 0 && <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "3px" }}>Mortgage: €{fmt(mortgageAmount)}</div>}
            </div>
          </div>

          {ltvWarning && (
            <div style={{ background: "#FEF2F2", border: "0.5px solid #FCA5A5", borderRadius: "8px", padding: "10px 14px", marginBottom: "14px", fontSize: "12px", color: "#B91C1C" }}>
              ⚠️ {buyerType === "ftb" ? "First-time buyers" : "Second-time buyers"} require a minimum {minDepositPct}% deposit (€{fmt(minDeposit)}) under Central Bank of Ireland rules. Current LTV: {fmtDec(ltvPct, 1)}%.
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Interest Rate (%)</label>
              <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "15px", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Term (years)</label>
              <select value={term} onChange={(e) => setTerm(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "14px", cursor: "pointer" }}>
                {[5, 10, 15, 20, 25, 30, 35].map((y) => <option key={y} value={y}>{y} years</option>)}
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Mortgage Type</label>
            <div style={{ display: "flex", gap: "8px" }}>
              {[{ val: "repayment", label: "Repayment" }, { val: "interest", label: "Interest Only" }].map(({ val, label }) => (
                <button key={val} onClick={() => setMortgageType(val)} style={{ padding: "9px 20px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: mortgageType === val ? "#4F46E5" : "white", color: mortgageType === val ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {mortgageAmount > 0 && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Monthly Repayment</div>
                  <div style={{ fontSize: "40px", fontWeight: "700", color: "#4F46E5" }}>€{fmt(monthlyPayment)}</div>
                  {mortgageType === "interest" && <div style={{ fontSize: "12px", color: "#F97316", marginTop: "4px" }}>Interest only — capital not repaid</div>}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div style={{ background: "white", borderRadius: "8px", padding: "12px" }}>
                    <div style={{ fontSize: "11px", color: "#9CA3AF" }}>LTV Ratio</div>
                    <div style={{ fontSize: "20px", fontWeight: "600", color: ltvWarning ? "#EF4444" : "#374151" }}>{fmtDec(ltvPct, 1)}%</div>
                  </div>
                  <div style={{ background: "white", borderRadius: "8px", padding: "12px" }}>
                    <div style={{ fontSize: "11px", color: "#9CA3AF" }}>Stamp Duty</div>
                    <div style={{ fontSize: "20px", fontWeight: "600", color: "#374151" }}>€{fmt(stampDuty)}</div>
                  </div>
                </div>
              </div>
            </div>

            {mortgageType === "repayment" && (
              <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
                {[
                  { label: "Mortgage amount", val: `€${fmt(mortgageAmount)}` },
                  { label: `Total repaid over ${termVal} years`, val: `€${fmt(totalRepaid)}` },
                  { label: "Total interest paid", val: `€${fmt(totalInterest)}`, color: "#EF4444" },
                  { label: "Stamp duty", val: `€${fmt(stampDuty)}`, color: "#F97316" },
                  { label: "Total cost of purchase", val: `€${fmt(totalCost)}`, bold: true, color: "#4F46E5" },
                ].map((r) => (
                  <div key={r.label} style={{ padding: "11px 20px", borderBottom: "0.5px solid #F3F4F6", display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                    <span style={{ color: "#374151" }}>{r.label}</span>
                    <span style={{ fontWeight: r.bold ? "700" : "500", color: r.color || "#1E1B4B" }}>{r.val}</span>
                  </div>
                ))}
              </div>
            )}

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ Illustrative only. Subject to Central Bank of Ireland LTV rules, lender income multiples (3.5× gross income), and credit assessment. Stamp duty rates as per Finance Act 2023.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
