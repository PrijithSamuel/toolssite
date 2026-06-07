"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SchemaOrg from "../../components/SchemaOrg";
import FAQ from "../../components/FAQ";

const FAQS = [
  { q: "What is EMI?", a: "EMI stands for Equated Monthly Installment. It is the fixed monthly payment you make to repay a loan including both principal and interest." },
  { q: "How is EMI calculated?", a: "EMI is calculated using the formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1) where P is principal, r is monthly interest rate and n is number of months." },
  { q: "Does a higher down payment reduce EMI?", a: "Yes. A higher down payment reduces the loan principal which directly reduces your monthly EMI and total interest paid." },
  { q: "What happens if I miss an EMI payment?", a: "Missing EMI payments results in late fees, penalty interest charges and negatively impacts your credit score. Always set up auto-payment." },
  { q: "Can I prepay my loan to reduce EMI?", a: "Yes. Making partial prepayments reduces the outstanding principal which can either reduce your EMI amount or shorten your loan tenure." },
];

export default function EMICalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [tenureType, setTenureType] = useState("years");

  function calcEMI() {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 12 / 100;
    const n = tenureType === "years" ? parseFloat(tenure) * 12 : parseFloat(tenure);
    if (!p || !r || !n) return null;
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;
    return { emi: emi.toFixed(2), totalPayment: totalPayment.toFixed(2), totalInterest: totalInterest.toFixed(2), months: n };
  }

  const result = calcEMI();
  function fmt(num) { return parseFloat(num).toLocaleString("en-IN", { maximumFractionDigits: 2 }); }
  const interestPercent = result ? ((parseFloat(result.totalInterest) / parseFloat(result.totalPayment)) * 100).toFixed(1) : 0;
  const principalPercent = result ? (100 - parseFloat(interestPercent)).toFixed(1) : 0;
  const inputStyle = { width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", fontSize: "14px", outline: "none", background: "white", color: "#374151" };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <SchemaOrg name="EMI Calculator" description="Calculate loan EMI monthly payment free online" url="/calculators/emi" />
      <Header breadcrumbs={[{ label: "Calculators", href: "/calculators" }, { label: "EMI Calculator" }]} />
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>EMI Calculator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate your loan EMI, total interest and payment breakdown instantly.</p>
        </div>

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", display: "block", marginBottom: "6px" }}>Loan Amount (₹)</label>
            <input type="number" placeholder="e.g. 1000000" value={principal} onChange={(e) => setPrincipal(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", display: "block", marginBottom: "6px" }}>Annual Interest Rate (%)</label>
            <input type="number" placeholder="e.g. 8.5" value={rate} onChange={(e) => setRate(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", display: "block", marginBottom: "6px" }}>Loan Tenure</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <input type="number" placeholder={tenureType === "years" ? "e.g. 20" : "e.g. 240"} value={tenure} onChange={(e) => setTenure(e.target.value)} style={{ ...inputStyle, flex: 1 }} />
              <div style={{ display: "flex", border: "0.5px solid #C7D2FE", borderRadius: "8px", overflow: "hidden" }}>
                {["years", "months"].map((t) => (
                  <button key={t} type="button" onClick={() => setTenureType(t)}
                    style={{ padding: "10px 14px", fontSize: "13px", cursor: "pointer", border: "none", background: tenureType === t ? "#4F46E5" : "white", color: tenureType === t ? "white" : "#4B5563", textTransform: "capitalize" }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {result && (
          <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ background: "#D1FAE5", border: "0.5px solid #A7F3D0", borderRadius: "12px", padding: "20px", textAlign: "center" }}>
              <div style={{ fontSize: "12px", color: "#6B7280", marginBottom: "4px" }}>Monthly EMI</div>
              <div style={{ fontSize: "40px", fontWeight: "500", color: "#059669" }}>₹{fmt(result.emi)}</div>
              <div style={{ fontSize: "13px", color: "#065F46", marginTop: "4px" }}>for {result.months} months</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "10px", padding: "16px", textAlign: "center" }}>
                <div style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "4px" }}>Principal</div>
                <div style={{ fontSize: "20px", fontWeight: "500", color: "#1E1B4B" }}>₹{fmt(principal)}</div>
                <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "2px" }}>{principalPercent}% of total</div>
              </div>
              <div style={{ background: "#FEE2E2", border: "0.5px solid #FECACA", borderRadius: "10px", padding: "16px", textAlign: "center" }}>
                <div style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "4px" }}>Total Interest</div>
                <div style={{ fontSize: "20px", fontWeight: "500", color: "#DC2626" }}>₹{fmt(result.totalInterest)}</div>
                <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "2px" }}>{interestPercent}% of total</div>
              </div>
            </div>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "16px", textAlign: "center" }}>
              <div style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "4px" }}>Total Payment</div>
              <div style={{ fontSize: "24px", fontWeight: "500", color: "#4F46E5" }}>₹{fmt(result.totalPayment)}</div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#9CA3AF", marginBottom: "4px" }}>
                <span>Principal {principalPercent}%</span>
                <span>Interest {interestPercent}%</span>
              </div>
              <div style={{ height: "8px", borderRadius: "4px", background: "#FEE2E2", overflow: "hidden" }}>
                <div style={{ height: "100%", background: "#4F46E5", borderRadius: "4px", width: `${principalPercent}%` }} />
              </div>
            </div>
          </div>
        )}
      </div>
      <FAQ faqs={FAQS} />
      <Footer />
    </main>
  );
}