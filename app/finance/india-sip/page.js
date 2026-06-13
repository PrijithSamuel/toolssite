"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n) { return Math.round(n).toLocaleString("en-IN"); }
function fmtDec(n, d = 1) { return n.toLocaleString("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d }); }

function calcSIP(monthly, annualRate, years, stepUp = 0) {
  const r = annualRate / 100 / 12;
  let balance = 0;
  let totalInvested = 0;
  let currentMonthly = monthly;
  const yearRows = [];

  for (let y = 1; y <= years; y++) {
    if (y > 1 && stepUp > 0) currentMonthly *= (1 + stepUp / 100);
    for (let m = 0; m < 12; m++) {
      balance = (balance + currentMonthly) * (1 + r);
      totalInvested += currentMonthly;
    }
    yearRows.push({ year: y, invested: Math.round(totalInvested), balance: Math.round(balance) });
  }
  return { maturity: balance, totalInvested, returns: balance - totalInvested, yearRows };
}

const introStyle = { background:"white", border:"0.5px solid #E0E7FF", borderRadius:"12px", padding:"20px", marginBottom:"20px", fontSize:"14px", color:"#4B5563", lineHeight:"1.85" };

export default function IndiaSIP() {
  const [monthly, setMonthly] = useState("10000");
  const [returnRate, setReturnRate] = useState("12");
  const [years, setYears] = useState("15");
  const [stepUp, setStepUp] = useState("0");
  const [showTable, setShowTable] = useState(false);

  const res = (parseFloat(monthly) > 0 && parseFloat(returnRate) > 0 && parseInt(years) > 0)
    ? calcSIP(parseFloat(monthly), parseFloat(returnRate), parseInt(years), parseFloat(stepUp) || 0)
    : null;

  const wealthGainPct = res ? (res.returns / res.totalInvested * 100) : 0;
  const investedBarPct = res ? Math.min(100, (res.totalInvested / res.maturity) * 100) : 0;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "SIP Calculator India" }]} />
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>SIP Calculator India 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Mutual fund SIP returns calculator with step-up SIP and year-wise growth projection.</p>
        </div>

        <div style={introStyle}>
          A Systematic Investment Plan (SIP) is a method of investing a fixed amount in a mutual fund at regular intervals — typically monthly. It is the most popular investment vehicle for retail investors in India, with over 89 million active SIP accounts as of 2025. The core principle behind SIP investing is rupee cost averaging: by investing the same amount each month regardless of market conditions, you automatically buy more units when prices are low and fewer when prices are high, reducing the average cost per unit over time. This calculator uses the compound interest formula with monthly compounding to project the future value of your SIP investment. The expected return rate input is based on historical average returns — Indian large-cap equity funds have delivered approximately 12% CAGR over long periods, though past performance does not guarantee future results.
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Monthly SIP Amount (₹)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}>₹</span>
                <input type="number" value={monthly} onChange={(e) => setMonthly(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "11px 12px 11px 28px", outline: "none", background: "white", fontSize: "18px", fontWeight: "600", boxSizing: "border-box" }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Expected Annual Return (%)</label>
              <div style={{ position: "relative" }}>
                <input type="number" step="0.5" value={returnRate} onChange={(e) => setReturnRate(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "11px 30px 11px 12px", outline: "none", background: "white", fontSize: "18px", fontWeight: "600", boxSizing: "border-box" }} />
                <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}>%</span>
              </div>
              <div style={{ display: "flex", gap: "4px", marginTop: "5px" }}>
                {[8, 10, 12, 15].map((r) => <button key={r} onClick={() => setReturnRate(String(r))} style={{ padding: "3px 8px", borderRadius: "5px", border: "0.5px solid #C7D2FE", background: returnRate === String(r) ? "#4F46E5" : "white", color: returnRate === String(r) ? "white" : "#374151", fontSize: "11px", cursor: "pointer" }}>{r}%</button>)}
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Investment Period (years)</label>
              <input type="number" value={years} onChange={(e) => setYears(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "11px 12px", outline: "none", background: "white", fontSize: "18px", fontWeight: "600", boxSizing: "border-box" }} />
              <div style={{ display: "flex", gap: "4px", marginTop: "5px" }}>
                {[5, 10, 15, 20, 30].map((y) => <button key={y} onClick={() => setYears(String(y))} style={{ padding: "3px 8px", borderRadius: "5px", border: "0.5px solid #C7D2FE", background: years === String(y) ? "#4F46E5" : "white", color: years === String(y) ? "white" : "#374151", fontSize: "11px", cursor: "pointer" }}>{y}yr</button>)}
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Step-up SIP — Annual increase (%) <span style={{ color: "#9CA3AF", fontWeight: "400" }}>optional</span></label>
              <div style={{ position: "relative" }}>
                <input type="number" step="1" value={stepUp} onChange={(e) => setStepUp(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "11px 30px 11px 12px", outline: "none", background: "white", fontSize: "18px", fontWeight: "600", boxSizing: "border-box" }} />
                <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}>%</span>
              </div>
            </div>
          </div>
        </div>

        {res && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                {[
                  { label: "Maturity Value", val: `₹${fmt(res.maturity)}`, color: "#4F46E5" },
                  { label: "Total Invested", val: `₹${fmt(res.totalInvested)}`, color: "#374151" },
                  { label: "Wealth Gain", val: `₹${fmt(res.returns)}`, color: "#10B981" },
                ].map((i) => (
                  <div key={i.label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>{i.label}</div>
                    <div style={{ fontSize: "24px", fontWeight: "700", color: i.color }}>{i.val}</div>
                  </div>
                ))}
              </div>

              {/* Visual bar */}
              <div style={{ marginBottom: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#6B7280", marginBottom: "4px" }}>
                  <span>Invested ({fmtDec(investedBarPct)}%)</span>
                  <span>Returns ({fmtDec(100 - investedBarPct)}%)</span>
                </div>
                <div style={{ height: "24px", background: "#E0E7FF", borderRadius: "6px", overflow: "hidden", display: "flex" }}>
                  <div style={{ height: "100%", width: `${investedBarPct}%`, background: "#6366F1", borderRadius: "6px 0 0 6px", transition: "width 0.5s", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {investedBarPct > 20 && <span style={{ fontSize: "10px", color: "white", fontWeight: "600" }}>₹{fmt(res.totalInvested)}</span>}
                  </div>
                  <div style={{ height: "100%", flex: 1, background: "#10B981", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {(100 - investedBarPct) > 20 && <span style={{ fontSize: "10px", color: "white", fontWeight: "600" }}>₹{fmt(res.returns)}</span>}
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "12px" }}>
                <div style={{ background: "white", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#9CA3AF" }}>Wealth gain ratio</div>
                  <div style={{ fontSize: "18px", fontWeight: "700", color: "#10B981" }}>{fmtDec(wealthGainPct)}%</div>
                </div>
                <div style={{ background: "white", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#9CA3AF" }}>₹1 Lakh invested becomes</div>
                  <div style={{ fontSize: "18px", fontWeight: "700", color: "#4F46E5" }}>₹{fmtDec(res.maturity / res.totalInvested * 100000 / 100000, 1)}L</div>
                </div>
              </div>
            </div>

            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
              <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "13px", fontWeight: "600", color: "#374151" }}>Year-wise Growth</span>
                <button onClick={() => setShowTable(!showTable)} style={{ fontSize: "12px", color: "#4F46E5", background: "none", border: "none", cursor: "pointer" }}>{showTable ? "Hide ▲" : "Show ▼"}</button>
              </div>
              {showTable && (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 1fr 1fr", padding: "8px 20px", fontSize: "11px", fontWeight: "600", color: "#6B7280", background: "#F8F9FF", borderBottom: "0.5px solid #E0E7FF" }}>
                    <span>Year</span><span>Invested</span><span>Returns</span><span>Balance</span>
                  </div>
                  {res.yearRows.map((r) => (
                    <div key={r.year} style={{ display: "grid", gridTemplateColumns: "60px 1fr 1fr 1fr", padding: "8px 20px", borderBottom: "0.5px solid #F3F4F6", fontSize: "12px" }}>
                      <span style={{ color: "#9CA3AF" }}>Yr {r.year}</span>
                      <span style={{ color: "#374151" }}>₹{fmt(r.invested)}</span>
                      <span style={{ color: "#10B981" }}>₹{fmt(r.balance - r.invested)}</span>
                      <span style={{ color: "#4F46E5", fontWeight: "500" }}>₹{fmt(r.balance)}</span>
                    </div>
                  ))}
                </>
              )}
            </div>

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ Returns are estimated based on assumed rate of {returnRate}% p.a. Mutual fund investments are subject to market risks. Past performance is not indicative of future returns. Consult your financial advisor before investing.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
