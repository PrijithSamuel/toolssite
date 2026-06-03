"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n) { return Math.round(n).toLocaleString("en-SG"); }
function fmtDec(n, d = 2) { return n.toLocaleString("en-SG", { minimumFractionDigits: d, maximumFractionDigits: d }); }

function calcEMI(P, annualRate, months) {
  const r = annualRate / 100 / 12;
  if (r === 0 || P <= 0) return P / months;
  return P * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
}

const HDB_RATE = 2.6;
const HDB_LTV = 0.80;
const BANK_LTV = 0.75;
const HDB_MAX_TENURE = 25;
const BANK_MAX_TENURE = 30;
const MSR_LIMIT = 0.30;
const TDSR_LIMIT = 0.55;

export default function SingaporeHDBLoan() {
  const [flatPrice, setFlatPrice] = useState("450000");
  const [monthlyIncome, setMonthlyIncome] = useState("6000");
  const [cpfOA, setCpfOA] = useState("50000");
  const [cashSavings, setCashSavings] = useState("30000");
  const [loanType, setLoanType] = useState("hdb");
  const [bankRate, setBankRate] = useState("3.7");
  const [bankTenure, setBankTenure] = useState("25");

  const price = parseFloat(flatPrice) || 0;
  const income = parseFloat(monthlyIncome) || 0;
  const cpf = parseFloat(cpfOA) || 0;
  const cash = parseFloat(cashSavings) || 0;
  const bRate = parseFloat(bankRate) || 3.7;
  const bTenure = parseInt(bankTenure) || 25;

  const isHDB = loanType === "hdb";
  const ltv = isHDB ? HDB_LTV : BANK_LTV;
  const rate = isHDB ? HDB_RATE : bRate;
  const tenure = isHDB ? HDB_MAX_TENURE : bTenure;
  const maxLoan = Math.round(price * ltv);
  const minDownpayment = price - maxLoan;
  const months = tenure * 12;

  const emi = maxLoan > 0 ? calcEMI(maxLoan, rate, months) : 0;
  const totalPaid = emi * months;
  const totalInterest = totalPaid - maxLoan;

  const msrPct = income > 0 ? (emi / income) * 100 : 0;
  const tdsrPct = income > 0 ? (emi / income) * 100 : 0;
  const msrPass = msrPct <= MSR_LIMIT * 100;
  const tdsrPass = tdsrPct <= TDSR_LIMIT * 100;

  const cpfUsable = Math.min(cpf, minDownpayment);
  const cashRequired = Math.max(0, minDownpayment - cpfUsable);
  const totalFundsNeeded = price - maxLoan;

  // HDB comparison
  const hdbEmi = price > 0 ? calcEMI(price * HDB_LTV, HDB_RATE, HDB_MAX_TENURE * 12) : 0;
  const bankEmi = price > 0 ? calcEMI(price * BANK_LTV, bRate, bTenure * 12) : 0;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "HDB Loan Calculator Singapore" }]} />
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>HDB Loan Calculator Singapore 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>HDB vs bank loan — monthly installment, CPF usage, MSR and TDSR checks.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Flat Purchase Price (S$)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "#6B7280", fontWeight: "600" }}>S$</span>
                <input type="number" value={flatPrice} onChange={(e) => setFlatPrice(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px 10px 34px", outline: "none", background: "white", fontSize: "16px", fontWeight: "600", boxSizing: "border-box" }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Monthly Household Income (S$)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "#6B7280", fontWeight: "600" }}>S$</span>
                <input type="number" value={monthlyIncome} onChange={(e) => setMonthlyIncome(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px 10px 34px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>CPF OA Balance (S$)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "#6B7280", fontWeight: "600" }}>S$</span>
                <input type="number" value={cpfOA} onChange={(e) => setCpfOA(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px 10px 34px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Cash Savings (S$)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "#6B7280", fontWeight: "600" }}>S$</span>
                <input type="number" value={cashSavings} onChange={(e) => setCashSavings(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px 10px 34px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "14px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Loan Type</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => setLoanType("hdb")} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: loanType === "hdb" ? "#4F46E5" : "white", color: loanType === "hdb" ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>
                HDB Loan (2.6%, 80% LTV, 25yr)
              </button>
              <button onClick={() => setLoanType("bank")} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: loanType === "bank" ? "#4F46E5" : "white", color: loanType === "bank" ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>
                Bank Loan (75% LTV, 30yr max)
              </button>
            </div>
          </div>

          {loanType === "bank" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Bank Interest Rate (% p.a.)</label>
                <div style={{ position: "relative" }}>
                  <input type="number" step="0.05" value={bankRate} onChange={(e) => setBankRate(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 30px 10px 12px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
                  <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}>%</span>
                </div>
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Loan Tenure (years, max 30)</label>
                <select value={bankTenure} onChange={(e) => setBankTenure(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "14px", cursor: "pointer" }}>
                  {[10, 15, 20, 25, 30].map((y) => <option key={y} value={y}>{y} years</option>)}
                </select>
              </div>
            </div>
          )}
        </div>

        {price > 0 && income > 0 && (
          <>
            {/* MSR / TDSR */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "16px" }}>
              {[
                { label: "MSR (Mortgage Servicing Ratio)", pct: msrPct, limit: 30, pass: msrPass, note: "Max 30% of gross income" },
                { label: "TDSR (Total Debt Servicing Ratio)", pct: tdsrPct, limit: 55, pass: tdsrPass, note: "Max 55% of gross income" },
              ].map((r) => (
                <div key={r.label} style={{ background: r.pass ? "#ECFDF5" : "#FEF2F2", border: `0.5px solid ${r.pass ? "#6EE7B7" : "#FCA5A5"}`, borderRadius: "10px", padding: "14px 16px" }}>
                  <div style={{ fontSize: "12px", fontWeight: "600", color: r.pass ? "#065F46" : "#B91C1C" }}>
                    {r.pass ? "✓" : "✗"} {r.label}
                  </div>
                  <div style={{ fontSize: "22px", fontWeight: "700", color: r.pass ? "#10B981" : "#EF4444", marginTop: "4px" }}>
                    {fmtDec(r.pct)}%
                  </div>
                  <div style={{ fontSize: "11px", color: "#6B7280", marginTop: "2px" }}>{r.note}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                {[
                  { label: "Monthly Installment", val: `S$${fmt(emi)}`, color: "#4F46E5" },
                  { label: `Max Loan (${(ltv * 100).toFixed(0)}% LTV)`, val: `S$${fmt(maxLoan)}`, color: "#374151" },
                  { label: "Total Interest Paid", val: `S$${fmt(totalInterest)}`, color: "#EF4444" },
                ].map((i) => (
                  <div key={i.label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "10px", color: "#6B7280", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>{i.label}</div>
                    <div style={{ fontSize: "24px", fontWeight: "700", color: i.color }}>{i.val}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: "0.5px solid #C7D2FE", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                {[
                  { label: `Downpayment (${((1 - ltv) * 100).toFixed(0)}%)`, val: `S$${fmt(minDownpayment)}` },
                  { label: "CPF OA used", val: `S$${fmt(cpfUsable)}` },
                  { label: "Cash required", val: `S$${fmt(cashRequired)}` },
                ].map((i) => (
                  <div key={i.label} style={{ background: "white", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
                    <div style={{ fontSize: "10px", color: "#9CA3AF" }}>{i.label}</div>
                    <div style={{ fontSize: "15px", fontWeight: "700", color: cashRequired > cash && i.label.includes("Cash") ? "#EF4444" : "#374151" }}>{i.val}</div>
                  </div>
                ))}
              </div>
              {cashRequired > cash && (
                <div style={{ marginTop: "10px", fontSize: "12px", color: "#B91C1C", background: "#FEF2F2", borderRadius: "8px", padding: "8px 12px" }}>
                  ⚠️ Cash shortfall: S${fmt(cashRequired - cash)}. You need more cash savings or a lower-priced flat.
                </div>
              )}
            </div>

            {/* HDB vs Bank comparison */}
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
              <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "600", color: "#374151" }}>HDB Loan vs Bank Loan Comparison</div>
              {[
                { label: "Interest rate", hdb: "2.6% p.a.", bank: `${bRate}% p.a.` },
                { label: "Max LTV", hdb: "80%", bank: "75%" },
                { label: "Max tenure", hdb: "25 years", bank: "30 years" },
                { label: "Monthly installment", hdb: `S$${fmt(hdbEmi)}`, bank: `S$${fmt(bankEmi)}` },
                { label: "Total interest", hdb: `S$${fmt(hdbEmi * 25 * 12 - price * HDB_LTV)}`, bank: `S$${fmt(bankEmi * bTenure * 12 - price * BANK_LTV)}` },
                { label: "Downpayment required", hdb: `S$${fmt(price * 0.20)}`, bank: `S$${fmt(price * 0.25)}` },
                { label: "Rate flexibility", hdb: "Fixed (CPF OA + 0.1%)", bank: "Variable / fixed packages" },
              ].map((r) => (
                <div key={r.label} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "9px 20px", borderBottom: "0.5px solid #F3F4F6", fontSize: "12px" }}>
                  <span style={{ color: "#6B7280" }}>{r.label}</span>
                  <span style={{ color: loanType === "hdb" ? "#4F46E5" : "#374151", fontWeight: loanType === "hdb" ? "600" : "400", textAlign: "center" }}>{r.hdb}</span>
                  <span style={{ color: loanType === "bank" ? "#4F46E5" : "#374151", fontWeight: loanType === "bank" ? "600" : "400", textAlign: "center" }}>{r.bank}</span>
                </div>
              ))}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "8px 20px", fontSize: "11px", color: "#9CA3AF", background: "#F8F9FF" }}>
                <span></span><span style={{ textAlign: "center", fontWeight: "600" }}>HDB Loan</span><span style={{ textAlign: "center", fontWeight: "600" }}>Bank Loan</span>
              </div>
            </div>

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ HDB loan eligibility requires at least one Singapore Citizen applicant and gross monthly household income ≤ S$14,000. Bank loan rates are variable; 3.7% used as illustrative estimate. MSR applies to HDB flats; TDSR applies to all properties. Consult HDB or a mortgage broker for personalized advice.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
