"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n) { return Math.round(n).toLocaleString("en-LK"); }
function fmtDec(n, d = 2) { return n.toLocaleString("en-LK", { minimumFractionDigits: d, maximumFractionDigits: d }); }

const BANK_RATES = [
  { name: "Bank of Ceylon (BOC)", rate: 11.0 },
  { name: "People's Bank", rate: 11.0 },
  { name: "Commercial Bank", rate: 10.5 },
  { name: "Hatton National Bank (HNB)", rate: 10.5 },
  { name: "Sampath Bank", rate: 10.5 },
  { name: "Seylan Bank", rate: 10.25 },
  { name: "Nations Trust Bank (NTB)", rate: 10.0 },
];

const WHT_RATE = 0.05;

export default function SriLankaFD() {
  const [principal, setPrincipal] = useState("500000");
  const [rate, setRate] = useState("11");
  const [periodVal, setPeriodVal] = useState("12");
  const [periodUnit, setPeriodUnit] = useState("months");
  const [paymentType, setPaymentType] = useState("maturity");

  const P = parseFloat(principal) || 0;
  const r = parseFloat(rate) || 0;
  const months = periodUnit === "years" ? (parseFloat(periodVal) || 0) * 12 : (parseFloat(periodVal) || 0);
  const years = months / 12;

  let grossInterest = 0;
  let maturityValue = 0;
  let effectiveAnnualRate = 0;

  if (paymentType === "maturity") {
    // Simple interest for FD (standard in Sri Lanka)
    grossInterest = P * (r / 100) * years;
    maturityValue = P + grossInterest;
    effectiveAnnualRate = years > 0 ? (grossInterest / P / years) * 100 : 0;
  } else if (paymentType === "monthly") {
    const monthlyRate = r / 100 / 12;
    grossInterest = P * monthlyRate * months;
    maturityValue = P + 0; // capital returned at end, interest paid monthly
    effectiveAnnualRate = r;
  } else {
    // quarterly
    const quarterlyRate = r / 100 / 4;
    const quarters = Math.floor(months / 3);
    grossInterest = P * quarterlyRate * quarters;
    maturityValue = P + 0;
    effectiveAnnualRate = r;
  }

  const wht = grossInterest * WHT_RATE;
  const netInterest = grossInterest - wht;
  const netMaturity = paymentType === "maturity" ? P + netInterest : P;
  const monthlyInterest = paymentType === "monthly" ? netInterest / months : 0;
  const quarterlyInterest = paymentType === "quarterly" ? netInterest / Math.max(1, Math.floor(months / 3)) : 0;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "Fixed Deposit Calculator Sri Lanka" }]} />
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>Fixed Deposit Calculator Sri Lanka 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate FD interest, withholding tax (5%) and net maturity value in LKR.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Principal Amount (Rs.)</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "#6B7280", fontWeight: "600" }}>Rs.</span>
              <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="500000" style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "12px 12px 12px 44px", outline: "none", background: "white", fontSize: "20px", fontWeight: "600", boxSizing: "border-box" }} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Interest Rate (% p.a.)</label>
              <div style={{ position: "relative" }}>
                <input type="number" step="0.25" value={rate} onChange={(e) => setRate(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 30px 10px 12px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
                <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}>%</span>
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Period</label>
              <div style={{ display: "flex", gap: "6px" }}>
                <input type="number" value={periodVal} onChange={(e) => setPeriodVal(e.target.value)} style={{ flex: 1, border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
                <select value={periodUnit} onChange={(e) => setPeriodUnit(e.target.value)} style={{ border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 8px", outline: "none", background: "white", fontSize: "13px", cursor: "pointer" }}>
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Interest Payment Frequency</label>
            <div style={{ display: "flex", gap: "8px" }}>
              {[{ val: "maturity", label: "At Maturity" }, { val: "monthly", label: "Monthly" }, { val: "quarterly", label: "Quarterly" }].map(({ val, label }) => (
                <button key={val} onClick={() => setPaymentType(val)} style={{ flex: 1, padding: "9px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: paymentType === val ? "#4F46E5" : "white", color: paymentType === val ? "white" : "#374151", fontSize: "12px", cursor: "pointer", fontWeight: "500" }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {P > 0 && r > 0 && months > 0 && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Gross Interest</div>
                  <div style={{ fontSize: "28px", fontWeight: "700", color: "#374151" }}>Rs.{fmt(grossInterest)}</div>
                </div>
                <div style={{ textAlign: "center", borderLeft: "1px solid #C7D2FE", borderRight: "1px solid #C7D2FE" }}>
                  <div style={{ fontSize: "11px", color: "#EF4444", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>WHT (5%)</div>
                  <div style={{ fontSize: "28px", fontWeight: "700", color: "#EF4444" }}>− Rs.{fmt(wht)}</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#10B981", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Net Interest</div>
                  <div style={{ fontSize: "28px", fontWeight: "700", color: "#10B981" }}>Rs.{fmt(netInterest)}</div>
                </div>
              </div>

              <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "0.5px solid #C7D2FE" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  {paymentType === "maturity" ? (
                    <>
                      <div style={{ background: "white", borderRadius: "8px", padding: "14px", textAlign: "center" }}>
                        <div style={{ fontSize: "11px", color: "#9CA3AF" }}>Maturity Value (gross)</div>
                        <div style={{ fontSize: "20px", fontWeight: "700", color: "#374151" }}>Rs.{fmt(P + grossInterest)}</div>
                      </div>
                      <div style={{ background: "white", borderRadius: "8px", padding: "14px", textAlign: "center" }}>
                        <div style={{ fontSize: "11px", color: "#9CA3AF" }}>Maturity Value (after WHT)</div>
                        <div style={{ fontSize: "20px", fontWeight: "700", color: "#4F46E5" }}>Rs.{fmt(netMaturity)}</div>
                      </div>
                    </>
                  ) : paymentType === "monthly" ? (
                    <>
                      <div style={{ background: "white", borderRadius: "8px", padding: "14px", textAlign: "center" }}>
                        <div style={{ fontSize: "11px", color: "#9CA3AF" }}>Monthly interest (net)</div>
                        <div style={{ fontSize: "20px", fontWeight: "700", color: "#4F46E5" }}>Rs.{fmt(monthlyInterest)}</div>
                      </div>
                      <div style={{ background: "white", borderRadius: "8px", padding: "14px", textAlign: "center" }}>
                        <div style={{ fontSize: "11px", color: "#9CA3AF" }}>Capital returned at end</div>
                        <div style={{ fontSize: "20px", fontWeight: "700", color: "#374151" }}>Rs.{fmt(P)}</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ background: "white", borderRadius: "8px", padding: "14px", textAlign: "center" }}>
                        <div style={{ fontSize: "11px", color: "#9CA3AF" }}>Quarterly interest (net)</div>
                        <div style={{ fontSize: "20px", fontWeight: "700", color: "#4F46E5" }}>Rs.{fmt(quarterlyInterest)}</div>
                      </div>
                      <div style={{ background: "white", borderRadius: "8px", padding: "14px", textAlign: "center" }}>
                        <div style={{ fontSize: "11px", color: "#9CA3AF" }}>Capital returned at end</div>
                        <div style={{ fontSize: "20px", fontWeight: "700", color: "#374151" }}>Rs.{fmt(P)}</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Bank comparison table */}
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
              <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "600", color: "#374151" }}>
                Bank FD Rate Comparison — Rs.{fmt(P)} for {periodVal} {periodUnit}
              </div>
              <div style={{ padding: "8px 20px", display: "grid", gridTemplateColumns: "1fr 80px 120px 120px", fontSize: "11px", fontWeight: "600", color: "#6B7280", background: "#F8F9FF", borderBottom: "0.5px solid #E0E7FF" }}>
                <span>Bank</span><span style={{ textAlign: "center" }}>Rate</span><span style={{ textAlign: "right" }}>Gross Interest</span><span style={{ textAlign: "right" }}>Net (after WHT)</span>
              </div>
              {BANK_RATES.map((b) => {
                const gi = P * (b.rate / 100) * years;
                const ni = gi * (1 - WHT_RATE);
                const isSelected = Math.abs(b.rate - parseFloat(rate)) < 0.01;
                return (
                  <div key={b.name} onClick={() => setRate(String(b.rate))} style={{ padding: "9px 20px", borderBottom: "0.5px solid #F3F4F6", display: "grid", gridTemplateColumns: "1fr 80px 120px 120px", fontSize: "12px", cursor: "pointer", background: isSelected ? "#F5F3FF" : "white" }}>
                    <span style={{ color: isSelected ? "#4F46E5" : "#374151", fontWeight: isSelected ? "600" : "400" }}>{b.name}</span>
                    <span style={{ textAlign: "center", color: "#374151", fontWeight: "500" }}>{b.rate}%</span>
                    <span style={{ textAlign: "right", color: "#6B7280" }}>Rs.{fmt(gi)}</span>
                    <span style={{ textAlign: "right", color: "#10B981", fontWeight: "500" }}>Rs.{fmt(ni)}</span>
                  </div>
                );
              })}
              <div style={{ padding: "8px 16px", fontSize: "11px", color: "#9CA3AF", background: "#F8F9FF" }}>Click any bank to use that rate. Rates are indicative — verify with bank before investing.</div>
            </div>

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ Withholding tax (WHT) of 5% is deducted at source on interest income. FD rates shown are approximate and change frequently. Confirm current rates directly with each bank.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
