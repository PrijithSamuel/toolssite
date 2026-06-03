"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n) { return Math.round(n).toLocaleString("en-IN"); }
function fmtDec(n, d = 2) { return n.toLocaleString("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d }); }

function calcEMI(P, annualRate, months) {
  const r = annualRate / 100 / 12;
  if (r === 0) return P / months;
  return P * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
}

const BANK_RATES = [
  { name: "SBI Home Loan", rate: 8.5 },
  { name: "HDFC Bank", rate: 8.75 },
  { name: "ICICI Bank", rate: 8.75 },
  { name: "Axis Bank", rate: 8.75 },
  { name: "Kotak Mahindra", rate: 8.7 },
];

export default function IndiaHomeLoan() {
  const [loanAmount, setLoanAmount] = useState("5000000");
  const [rateInput, setRateInput] = useState("8.75");
  const [tenureYears, setTenureYears] = useState("20");
  const [processingFee, setProcessingFee] = useState("10000");
  const [extraEMI, setExtraEMI] = useState("0");

  const P = parseFloat(loanAmount) || 0;
  const r = parseFloat(rateInput) || 0;
  const years = parseInt(tenureYears) || 20;
  const months = years * 12;
  const fee = parseFloat(processingFee) || 0;
  const extra = parseFloat(extraEMI) || 0;

  const emi = P > 0 ? calcEMI(P, r, months) : 0;
  const totalPaid = emi * months;
  const totalInterest = totalPaid - P;
  const totalCost = totalPaid + fee;

  // Year-wise amortization
  const yearAmort = [];
  let balance = P;
  for (let y = 1; y <= Math.min(years, 30); y++) {
    let yearPrincipal = 0, yearInterest = 0;
    for (let m = 0; m < 12; m++) {
      const interestM = balance * r / 100 / 12;
      const principalM = emi - interestM;
      yearInterest += interestM;
      yearPrincipal += principalM;
      balance = Math.max(0, balance - principalM);
    }
    yearAmort.push({ year: y, principal: Math.round(yearPrincipal), interest: Math.round(yearInterest), balance: Math.round(balance) });
  }

  // Prepayment savings
  let prepBalance = P, savedMonths = 0;
  if (extra > 0) {
    for (let m = 0; m < months * 2; m++) {
      const intM = prepBalance * r / 100 / 12;
      const principalM = (emi + extra) - intM;
      prepBalance = Math.max(0, prepBalance - principalM);
      if (prepBalance <= 0) { savedMonths = months - m - 1; break; }
    }
  }

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "Home Loan EMI Calculator India" }]} />
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>Home Loan EMI Calculator India 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate home loan EMI, total interest, and prepayment savings with amortisation schedule.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Loan Amount (₹)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}>₹</span>
                <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "11px 12px 11px 26px", outline: "none", background: "white", fontSize: "17px", fontWeight: "600", boxSizing: "border-box" }} />
              </div>
              {P > 0 && <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "3px" }}>= ₹{fmtDec(P / 100000, 0)} Lakh</div>}
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Interest Rate (% p.a.)</label>
              <div style={{ position: "relative" }}>
                <input type="number" step="0.05" value={rateInput} onChange={(e) => setRateInput(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "11px 30px 11px 12px", outline: "none", background: "white", fontSize: "17px", fontWeight: "600", boxSizing: "border-box" }} />
                <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}>%</span>
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Loan Tenure (years)</label>
              <select value={tenureYears} onChange={(e) => setTenureYears(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "14px", cursor: "pointer" }}>
                {[5, 10, 15, 20, 25, 30].map((y) => <option key={y} value={y}>{y} years</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Processing Fee (₹)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}>₹</span>
                <input type="number" value={processingFee} onChange={(e) => setProcessingFee(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px 10px 26px", outline: "none", background: "white", fontSize: "14px", boxSizing: "border-box" }} />
              </div>
            </div>
          </div>
          <div>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Extra Monthly Payment for Prepayment (₹) <span style={{ color: "#9CA3AF", fontWeight: "400" }}>optional</span></label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}>₹</span>
              <input type="number" value={extraEMI} onChange={(e) => setExtraEMI(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px 10px 26px", outline: "none", background: "white", fontSize: "14px", boxSizing: "border-box" }} />
            </div>
          </div>
        </div>

        {emi > 0 && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                {[
                  { label: "Monthly EMI", val: `₹${fmt(emi)}`, color: "#4F46E5" },
                  { label: "Total Interest", val: `₹${fmt(totalInterest)}`, color: "#EF4444" },
                  { label: "Total Amount Payable", val: `₹${fmt(totalCost)}`, color: "#374151" },
                ].map((i) => (
                  <div key={i.label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>{i.label}</div>
                    <div style={{ fontSize: "26px", fontWeight: "700", color: i.color }}>{i.val}</div>
                  </div>
                ))}
              </div>
              {extra > 0 && savedMonths > 0 && (
                <div style={{ marginTop: "14px", paddingTop: "12px", borderTop: "0.5px solid #C7D2FE", background: "#ECFDF5", borderRadius: "8px", padding: "12px 16px", textAlign: "center" }}>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#065F46" }}>
                    💰 Paying extra ₹{fmt(extra)}/month saves {savedMonths} months — loan closes {Math.round(savedMonths / 12)} years {savedMonths % 12} months early!
                  </div>
                  <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "4px" }}>Interest saved: ≈₹{fmt(savedMonths * emi - extra * savedMonths)}</div>
                </div>
              )}
            </div>

            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
              <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "600", color: "#374151" }}>Year-wise Amortisation Schedule</div>
              <div style={{ display: "grid", gridTemplateColumns: "50px 1fr 1fr 1fr", padding: "8px 20px", fontSize: "11px", fontWeight: "600", color: "#6B7280", background: "#F8F9FF", borderBottom: "0.5px solid #E0E7FF" }}>
                <span>Year</span><span style={{ textAlign: "right" }}>Principal</span><span style={{ textAlign: "right" }}>Interest</span><span style={{ textAlign: "right" }}>Balance</span>
              </div>
              {yearAmort.slice(0, 15).map((r) => (
                <div key={r.year} style={{ display: "grid", gridTemplateColumns: "50px 1fr 1fr 1fr", padding: "8px 20px", borderBottom: "0.5px solid #F3F4F6", fontSize: "12px" }}>
                  <span style={{ color: "#9CA3AF" }}>Yr {r.year}</span>
                  <span style={{ textAlign: "right", color: "#4F46E5" }}>₹{fmt(r.principal)}</span>
                  <span style={{ textAlign: "right", color: "#EF4444" }}>₹{fmt(r.interest)}</span>
                  <span style={{ textAlign: "right", color: "#374151" }}>₹{fmt(r.balance)}</span>
                </div>
              ))}
            </div>

            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
              <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "600", color: "#374151" }}>Current Home Loan Rates (2025)</div>
              {BANK_RATES.map((b) => {
                const bEmi = calcEMI(P, b.rate, months);
                return (
                  <div key={b.name} onClick={() => setRateInput(String(b.rate))} style={{ padding: "9px 20px", borderBottom: "0.5px solid #F3F4F6", display: "grid", gridTemplateColumns: "1fr 80px 120px", fontSize: "13px", cursor: "pointer", background: Math.abs(b.rate - parseFloat(rateInput)) < 0.01 ? "#F5F3FF" : "white" }}>
                    <span style={{ color: "#374151" }}>{b.name}</span>
                    <span style={{ color: "#4F46E5", fontWeight: "600" }}>{b.rate}%</span>
                    <span style={{ textAlign: "right", color: "#374151" }}>EMI ₹{fmt(bEmi)}</span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
