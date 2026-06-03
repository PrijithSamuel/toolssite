"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function calcMonthly(principal, annualRate, months) {
  if (!principal || !months) return 0;
  if (annualRate === 0) return principal / months;
  const r = annualRate / 100 / 12;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

function buildYearlySummary(principal, annualRate, termYears) {
  const r = annualRate / 100 / 12;
  const n = termYears * 12;
  const monthly = calcMonthly(principal, annualRate, n);
  let balance = principal;
  const years = [];
  for (let yr = 1; yr <= termYears; yr++) {
    let yearPrincipal = 0, yearInterest = 0;
    for (let m = 0; m < 12; m++) {
      const interest = balance * r;
      const prinPaid = monthly - interest;
      yearInterest += interest;
      yearPrincipal += prinPaid;
      balance = Math.max(0, balance - prinPaid);
    }
    years.push({ year: yr, principal: yearPrincipal, interest: yearInterest, balance });
  }
  return years;
}

function fmt(n) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function LoanCalculator() {
  const [amount, setAmount] = useState("100000");
  const [rate, setRate] = useState("6.5");
  const [term, setTerm] = useState("20");

  const principal = parseFloat(amount) || 0;
  const annualRate = parseFloat(rate) || 0;
  const termYears = parseInt(term) || 0;
  const months = termYears * 12;

  const monthly = calcMonthly(principal, annualRate, months);
  const totalPayment = monthly * months;
  const totalInterest = totalPayment - principal;
  const interestPct = principal > 0 ? (totalInterest / totalPayment) * 100 : 0;

  const hasResult = principal > 0 && termYears > 0;
  const yearlySummary = hasResult ? buildYearlySummary(principal, annualRate, termYears) : [];

  const inp = { width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "15px", boxSizing: "border-box" };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "Loan Calculator" }]} />
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Loan Calculator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate your monthly payment, total interest and full amortization schedule.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>Loan Amount ($)</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="100,000" style={inp} />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>Annual Interest Rate (%)</label>
              <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="6.5" step="0.1" style={inp} />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>Loan Term (Years)</label>
              <input type="number" value={term} onChange={(e) => setTerm(e.target.value)} placeholder="20" style={inp} />
            </div>
          </div>
        </div>

        {hasResult && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "20px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "500", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Monthly Payment</div>
                  <div style={{ fontSize: "36px", fontWeight: "500", color: "#4F46E5" }}>${fmt(monthly)}</div>
                </div>
                <div style={{ textAlign: "center", borderLeft: "1px solid #C7D2FE", borderRight: "1px solid #C7D2FE" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "500", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Total Payment</div>
                  <div style={{ fontSize: "36px", fontWeight: "500", color: "#1E1B4B" }}>${fmt(totalPayment)}</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "500", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Total Interest</div>
                  <div style={{ fontSize: "36px", fontWeight: "500", color: "#EF4444" }}>${fmt(totalInterest)}</div>
                </div>
              </div>

              {/* Interest vs Principal bar */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#6B7280", marginBottom: "6px" }}>
                  <span>Principal <strong style={{ color: "#4F46E5" }}>{(100 - interestPct).toFixed(1)}%</strong></span>
                  <span>Interest <strong style={{ color: "#EF4444" }}>{interestPct.toFixed(1)}%</strong></span>
                </div>
                <div style={{ height: "10px", borderRadius: "6px", background: "#E0E7FF", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${100 - interestPct}%`, background: "#4F46E5", borderRadius: "6px 0 0 6px" }} />
                </div>
              </div>
            </div>

            {/* Amortization Table */}
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
              <div style={{ padding: "14px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "500", color: "#1E1B4B" }}>
                Yearly Amortization Summary
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                  <thead>
                    <tr style={{ background: "#F8F9FF" }}>
                      {["Year", "Principal Paid", "Interest Paid", "Remaining Balance"].map((h) => (
                        <th key={h} style={{ padding: "10px 16px", textAlign: "right", fontWeight: "500", color: "#6B7280", fontSize: "12px" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {yearlySummary.map((row) => (
                      <tr key={row.year} style={{ borderTop: "0.5px solid #F3F4F6" }}>
                        <td style={{ padding: "10px 16px", textAlign: "right", color: "#4F46E5", fontWeight: "500" }}>Yr {row.year}</td>
                        <td style={{ padding: "10px 16px", textAlign: "right", color: "#1E1B4B" }}>${fmt(row.principal)}</td>
                        <td style={{ padding: "10px 16px", textAlign: "right", color: "#EF4444" }}>${fmt(row.interest)}</td>
                        <td style={{ padding: "10px 16px", textAlign: "right", color: "#374151" }}>${fmt(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
