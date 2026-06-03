"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n) { return Math.round(n).toLocaleString("en-IN"); }

const PPF_RATE = 0.071;
const MIN_INVEST = 500;
const MAX_INVEST = 150000;

export default function IndiaPPF() {
  const [annualInvest, setAnnualInvest] = useState("150000");
  const [period, setPeriod] = useState("15");
  const [taxSlab, setTaxSlab] = useState(30);
  const [showTable, setShowTable] = useState(false);

  const invest = Math.min(MAX_INVEST, Math.max(MIN_INVEST, parseFloat(annualInvest) || 0));
  const yrs = Math.max(15, Math.min(50, parseInt(period) || 15));

  // PPF interest calculated on minimum balance between 5th and end of month, but simplified annually
  let balance = 0;
  let totalInvested = 0;
  const yearRows = [];
  for (let y = 1; y <= yrs; y++) {
    balance = (balance + invest) * (1 + PPF_RATE);
    totalInvested += invest;
    yearRows.push({ year: y, invested: Math.round(totalInvested), balance: Math.round(balance), interest: Math.round(balance - totalInvested) });
  }
  const maturity = Math.round(balance);
  const totalInterest = maturity - Math.round(totalInvested);
  const taxBenefit80C = Math.min(invest, 150000) * (taxSlab / 100);

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "PPF Calculator India" }]} />
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>PPF Calculator India 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Public Provident Fund — 7.1% p.a., EEE tax status, ₹500 to ₹1.5 Lakh annually.</p>
        </div>

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", marginBottom: "16px", fontSize: "12px", color: "#374151" }}>
          🛡️ <strong>EEE Status:</strong> Investment (80C deduction) + Interest + Maturity amount — ALL three are tax free.
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Annual Investment (₹) — max ₹1.5L</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}>₹</span>
                <input type="number" value={annualInvest} onChange={(e) => setAnnualInvest(e.target.value)} min={500} max={150000} style={{ width: "100%", border: `0.5px solid ${parseFloat(annualInvest) > 150000 ? "#FCA5A5" : "#C7D2FE"}`, borderRadius: "8px", padding: "11px 12px 11px 26px", outline: "none", background: "white", fontSize: "18px", fontWeight: "600", boxSizing: "border-box" }} />
              </div>
              {parseFloat(annualInvest) > 150000 && <div style={{ fontSize: "11px", color: "#EF4444", marginTop: "3px" }}>Capped at ₹1,50,000</div>}
              <div style={{ display: "flex", gap: "4px", marginTop: "5px" }}>
                {[500, 50000, 100000, 150000].map((v) => <button key={v} onClick={() => setAnnualInvest(String(v))} style={{ padding: "3px 8px", borderRadius: "5px", border: "0.5px solid #C7D2FE", background: annualInvest === String(v) ? "#4F46E5" : "white", color: annualInvest === String(v) ? "white" : "#374151", fontSize: "10px", cursor: "pointer" }}>₹{v >= 100000 ? `${v / 100000}L` : v >= 1000 ? `${v / 1000}K` : v}</button>)}
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Period (years) — min 15</label>
              <input type="number" value={period} onChange={(e) => setPeriod(e.target.value)} min={15} max={50} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "11px 12px", outline: "none", background: "white", fontSize: "18px", fontWeight: "600", boxSizing: "border-box" }} />
              <div style={{ display: "flex", gap: "4px", marginTop: "5px" }}>
                {[15, 20, 25, 30].map((y) => <button key={y} onClick={() => setPeriod(String(y))} style={{ padding: "3px 8px", borderRadius: "5px", border: "0.5px solid #C7D2FE", background: period === String(y) ? "#4F46E5" : "white", color: period === String(y) ? "white" : "#374151", fontSize: "11px", cursor: "pointer" }}>{y}yr{y > 15 ? `(+${(Math.ceil((y - 15) / 5))}×ext)` : ""}</button>)}
              </div>
            </div>
          </div>
          <div>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Your Tax Slab (for 80C savings)</label>
            <div style={{ display: "flex", gap: "8px" }}>
              {[10, 20, 30].map((s) => <button key={s} onClick={() => setTaxSlab(s)} style={{ flex: 1, padding: "9px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: taxSlab === s ? "#4F46E5" : "white", color: taxSlab === s ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "600" }}>{s}%</button>)}
            </div>
          </div>
        </div>

        {invest > 0 && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "14px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Maturity Amount</div>
                  <div style={{ fontSize: "30px", fontWeight: "700", color: "#4F46E5" }}>₹{fmt(maturity)}</div>
                </div>
                <div style={{ textAlign: "center", borderLeft: "1px solid #C7D2FE", borderRight: "1px solid #C7D2FE" }}>
                  <div style={{ fontSize: "11px", color: "#374151", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Total Invested</div>
                  <div style={{ fontSize: "24px", fontWeight: "600", color: "#374151" }}>₹{fmt(Math.round(totalInvested))}</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#10B981", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Interest Earned</div>
                  <div style={{ fontSize: "30px", fontWeight: "700", color: "#10B981" }}>₹{fmt(totalInterest)}</div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div style={{ background: "white", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#9CA3AF" }}>Annual 80C tax saving</div>
                  <div style={{ fontSize: "18px", fontWeight: "700", color: "#4F46E5" }}>₹{fmt(taxBenefit80C)}</div>
                </div>
                <div style={{ background: "white", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#9CA3AF" }}>PPF interest rate</div>
                  <div style={{ fontSize: "18px", fontWeight: "700", color: "#374151" }}>7.1% p.a.</div>
                </div>
              </div>
            </div>

            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
              <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "13px", fontWeight: "600", color: "#374151" }}>Year-wise Balance</span>
                <button onClick={() => setShowTable(!showTable)} style={{ fontSize: "12px", color: "#4F46E5", background: "none", border: "none", cursor: "pointer" }}>{showTable ? "Hide ▲" : "Show ▼"}</button>
              </div>
              {showTable && yearRows.slice(0, 20).map((r) => (
                <div key={r.year} style={{ display: "grid", gridTemplateColumns: "50px 1fr 1fr 1fr", padding: "8px 20px", borderBottom: "0.5px solid #F3F4F6", fontSize: "12px" }}>
                  <span style={{ color: "#9CA3AF" }}>Yr {r.year}</span>
                  <span style={{ color: "#374151" }}>₹{fmt(r.invested)}</span>
                  <span style={{ color: "#10B981" }}>₹{fmt(r.interest)}</span>
                  <span style={{ color: "#4F46E5", fontWeight: "500" }}>₹{fmt(r.balance)}</span>
                </div>
              ))}
            </div>

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ PPF rate of 7.1% is the current Q1 FY2025-26 rate set by Ministry of Finance. Rates are revised quarterly. PPF has a 15-year lock-in; partial withdrawals from Year 7. Extension in 5-year blocks is allowed after maturity.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
