"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SchemaOrg from "../../components/SchemaOrg";
import HowToSchema from "../../components/HowToSchema";
import FAQ from "../../components/FAQ";

const FAQS = [
  { q: "What is EMI?", a: "EMI stands for Equated Monthly Installment. It is the fixed monthly payment you make to repay a loan including both principal and interest." },
  { q: "How is EMI calculated?", a: "EMI is calculated using the formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1) where P is principal, r is monthly interest rate and n is number of months." },
  { q: "Does a higher down payment reduce EMI?", a: "Yes. A higher down payment reduces the loan principal which directly reduces your monthly EMI and total interest paid." },
  { q: "What happens if I miss an EMI payment?", a: "Missing EMI payments results in late fees, penalty interest charges and negatively impacts your credit score. Always set up auto-payment." },
  { q: "Can I prepay my loan to reduce EMI?", a: "Yes. Making partial prepayments reduces the outstanding principal which can either reduce your EMI amount or shorten your loan tenure." },
];

const introStyle = { background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "24px", fontSize: "14px", color: "#4B5563", lineHeight: "1.8" };

const card = { background:"white", border:"0.5px solid #E0E7FF", borderRadius:"12px", padding:"20px", marginBottom:"16px" };
const wrap = { maxWidth:"600px", margin:"0 auto", padding:"0 24px" };
const h2s = { fontSize:"16px", fontWeight:"500", color:"#1E1B4B", marginBottom:"12px" };
const ps = { fontSize:"13px", color:"#4B5563", lineHeight:"1.8", marginBottom:"10px" };
const psL = { fontSize:"13px", color:"#4B5563", lineHeight:"1.8", margin:0 };

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
    <main id="main-content" className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <SchemaOrg name="EMI Calculator" description="Calculate loan EMI monthly payment free online" url="/calculators/emi" />
      <HowToSchema
        name="How to calculate loan EMI"
        description="Calculate your monthly loan EMI payment free using QuikToolkit EMI Calculator"
        steps={[
          { name: "Enter loan amount", text: "Type the total loan amount you wish to borrow in the Loan Amount field." },
          { name: "Enter interest rate", text: "Enter the annual interest rate offered by your bank or lender." },
          { name: "Enter loan tenure", text: "Set the loan tenure in years or months using the toggle." },
          { name: "View results", text: "Your monthly EMI, total interest, and total payment are calculated instantly." },
        ]}
      />
      <Header breadcrumbs={[{ label: "Calculators", href: "/calculators" }, { label: "EMI Calculator" }]} />
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>EMI Calculator — Loan Monthly Payment Calculator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate your loan EMI, total interest and payment breakdown instantly.</p>
        </div>

        <div style={introStyle}>
          An EMI (Equated Monthly Installment) is the fixed monthly amount you pay to repay a loan — covering both the principal borrowed and the interest charged. Before taking a home loan, car loan, or personal loan, calculating your EMI helps you understand the monthly commitment and the true total cost of borrowing. For example, a ₹10 lakh personal loan at 12% annual interest over 3 years costs ₹33,214 per month and ₹1,19,580 in total interest — 12% of the principal. This calculator uses the standard EMI formula and shows the full payment breakdown including principal, interest, and total repayment.
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
      <div style={wrap}>
        <div style={card}>
          <h2 style={h2s}>The EMI Formula Explained</h2>
          <p style={ps}>EMI stands for Equated Monthly Instalment — the fixed amount you pay every month to repay a loan. It covers both the interest charged on the outstanding balance and a portion of the principal. In the early months of a loan, a larger share of your EMI goes toward interest. As the principal reduces, more of each payment goes toward repaying the loan itself.</p>
          <div style={{ background:"#EEF2FF", border:"0.5px solid #C7D2FE", borderRadius:"8px", padding:"14px", marginBottom:"10px" }}>
            <p style={{ fontSize:"13px", color:"#4F46E5", fontWeight:"500", margin:"0 0 6px", fontFamily:"monospace" }}>EMI = P x r x (1 + r)n divided by ((1 + r)n minus 1)</p>
            <p style={{ fontSize:"12px", color:"#6B7280", margin:0 }}>P = Principal | r = Monthly interest rate (annual rate divided by 12 divided by 100) | n = Number of monthly instalments</p>
          </div>
          <p style={psL}>Example: A 10 lakh loan at 9% annual interest for 5 years gives a monthly EMI of 20,758 rupees. Total interest paid over the full tenure is 2,45,480 rupees — nearly 25% of the original loan amount.</p>
        </div>
        <div style={card}>
          <h2 style={h2s}>How to Reduce Your EMI</h2>
          <p style={ps}><strong>Make a larger down payment:</strong> Reducing the principal directly reduces the EMI. On a 50 lakh home loan, increasing your down payment by 5 lakh reduces the EMI by approximately 3,900 per month.</p>
          <p style={ps}><strong>Extend the loan tenure:</strong> A 20-year term gives a lower monthly EMI than a 15-year term for the same principal, though total interest paid will be higher.</p>
          <p style={psL}><strong>Negotiate the interest rate:</strong> Even a 0.25% reduction in interest rate on a 30 lakh home loan saves approximately 1,700 per month over a 20-year tenure.</p>
        </div>
      </div>
      <FAQ faqs={FAQS} />
      <Footer />
    </main>
  );
}