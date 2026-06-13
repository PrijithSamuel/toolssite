"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n) { return Math.round(n).toLocaleString("en-CA"); }

const ANNUAL_LIMITS = [
  { year: 2009, limit: 5000 }, { year: 2010, limit: 5000 }, { year: 2011, limit: 5000 }, { year: 2012, limit: 5000 },
  { year: 2013, limit: 5500 }, { year: 2014, limit: 5500 }, { year: 2015, limit: 10000 },
  { year: 2016, limit: 5500 }, { year: 2017, limit: 5500 }, { year: 2018, limit: 5500 },
  { year: 2019, limit: 6000 }, { year: 2020, limit: 6000 }, { year: 2021, limit: 6000 }, { year: 2022, limit: 6000 },
  { year: 2023, limit: 6500 }, { year: 2024, limit: 7000 }, { year: 2025, limit: 7000 },
];

const CURRENT_YEAR = 2025;

function compound(balance, annual, years, rate = 0.06) {
  let bal = balance;
  for (let y = 0; y < years; y++) bal = (bal + annual) * (1 + rate);
  return bal;
}

const introStyle = { background:"white", border:"0.5px solid #E0E7FF", borderRadius:"12px", padding:"20px", marginBottom:"20px", fontSize:"14px", color:"#4B5563", lineHeight:"1.85" };

export default function CanadaTFSA() {
  const [residentYear, setResidentYear] = useState("2009");
  const [totalContribs, setTotalContribs] = useState("50000");
  const [totalWithdrawals, setTotalWithdrawals] = useState("0");
  const [currentBalance, setCurrentBalance] = useState("60000");
  const [retireYears, setRetireYears] = useState("20");

  const startYear = Math.max(2009, parseInt(residentYear) || 2009);
  const eligibleLimits = ANNUAL_LIMITS.filter((l) => l.year >= startYear);
  const lifetimeRoom = eligibleLimits.reduce((sum, l) => sum + l.limit, 0);

  const pastContribs = parseFloat(totalContribs) || 0;
  const pastWithdrawals = parseFloat(totalWithdrawals) || 0;
  const currentBal = parseFloat(currentBalance) || 0;
  const years = parseInt(retireYears) || 20;

  const availableRoom = lifetimeRoom - pastContribs + pastWithdrawals;
  const overContributed = availableRoom < 0;
  const penalty = overContributed ? Math.abs(availableRoom) * 0.01 : 0;

  const annualLimit2025 = 7000;
  const projectedBalance = compound(currentBal, Math.min(annualLimit2025, Math.max(0, availableRoom)), years);

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "TFSA Calculator Canada" }]} />
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>TFSA Calculator Canada 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate your TFSA contribution room, check for over-contributions and project tax-free growth.</p>
        </div>

        <div style={introStyle}>
          The Tax-Free Savings Account (TFSA) is a uniquely Canadian savings vehicle that provides tax-free investment growth and tax-free withdrawals at any time for any purpose. Unlike the RRSP, TFSA contributions are not tax-deductible — you contribute after-tax dollars. The advantage is that all growth and withdrawals are completely tax-free. Every Canadian resident aged 18 or older accumulates TFSA contribution room each year. Withdrawals in any calendar year are added back to your contribution room the following January, allowing you to re-contribute withdrawn amounts without penalty. Over-contributing to a TFSA results in a 1% per month penalty tax on the excess amount.
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Year became Canadian resident (or turned 18)</label>
              <select value={residentYear} onChange={(e) => setResidentYear(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "14px", cursor: "pointer" }}>
                {Array.from({ length: CURRENT_YEAR - 2008 }, (_, i) => 2009 + i).map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Current TFSA Balance ($)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}>$</span>
                <input type="number" value={currentBalance} onChange={(e) => setCurrentBalance(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px 10px 24px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px", marginBottom: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Total Contributions Ever ($)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}>$</span>
                <input type="number" value={totalContribs} onChange={(e) => setTotalContribs(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px 10px 24px", outline: "none", background: "white", fontSize: "14px", boxSizing: "border-box" }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Total Withdrawals Ever ($)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}>$</span>
                <input type="number" value={totalWithdrawals} onChange={(e) => setTotalWithdrawals(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px 10px 24px", outline: "none", background: "white", fontSize: "14px", boxSizing: "border-box" }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Years until retirement</label>
              <input type="number" value={retireYears} onChange={(e) => setRetireYears(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
            </div>
          </div>
        </div>

        <div style={{ background: overContributed ? "#FEF2F2" : "#EEF2FF", border: `0.5px solid ${overContributed ? "#FCA5A5" : "#C7D2FE"}`, borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
            {[
              { label: "Lifetime Room (since " + startYear + ")", val: `$${fmt(lifetimeRoom)}`, color: "#374151" },
              { label: overContributed ? "⚠️ Over-contribution!" : "Available Room", val: `$${fmt(Math.abs(availableRoom))}`, color: overContributed ? "#EF4444" : "#4F46E5" },
              { label: "2025 Annual Limit", val: "$7,000", color: "#374151" },
            ].map((i) => (
              <div key={i.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "11px", color: "#6B7280", fontWeight: "600", marginBottom: "4px" }}>{i.label}</div>
                <div style={{ fontSize: "26px", fontWeight: "700", color: i.color }}>{i.val}</div>
              </div>
            ))}
          </div>

          {overContributed && (
            <div style={{ marginTop: "14px", paddingTop: "12px", borderTop: "0.5px solid #FCA5A5", fontSize: "12px", color: "#B91C1C" }}>
              ⚠️ Over-contribution of ${fmt(Math.abs(availableRoom))} — CRA charges a <strong>1% per month penalty</strong> on the excess. Estimated monthly penalty: <strong>${fmt(penalty)}</strong>. Withdraw the excess immediately to stop further penalties.
            </div>
          )}
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
          <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "600", color: "#374151" }}>
            TFSA Limits — Year by Year (from {startYear})
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", padding: "10px 20px", fontSize: "11px", fontWeight: "600", color: "#6B7280", background: "#F8F9FF", borderBottom: "0.5px solid #E0E7FF" }}>
            {["Year", "Limit", "Year", "Limit"].map((h, i) => <span key={i}>{h}</span>)}
          </div>
          {Array.from({ length: Math.ceil(eligibleLimits.length / 2) }, (_, i) => {
            const a = eligibleLimits[i * 2];
            const b = eligibleLimits[i * 2 + 1];
            return (
              <div key={a.year} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", padding: "8px 20px", borderBottom: "0.5px solid #F3F4F6", fontSize: "12px" }}>
                <span style={{ color: "#9CA3AF" }}>{a.year}</span>
                <span style={{ color: "#4F46E5", fontWeight: "500" }}>${fmt(a.limit)}</span>
                {b ? <><span style={{ color: "#9CA3AF" }}>{b.year}</span><span style={{ color: "#4F46E5", fontWeight: "500" }}>${fmt(b.limit)}</span></> : <><span /><span /></>}
              </div>
            );
          })}
          <div style={{ padding: "10px 20px", background: "#EEF2FF", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", fontSize: "13px" }}>
            <span style={{ fontWeight: "700", color: "#4F46E5", gridColumn: "1 / 3" }}>Total lifetime room</span>
            <span style={{ fontWeight: "700", color: "#4F46E5", gridColumn: "3 / 5" }}>${fmt(lifetimeRoom)}</span>
          </div>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px 20px", marginBottom: "16px" }}>
          <div style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "10px" }}>Tax-free Growth Projection ({years} years at 6%)</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {[
              { label: "Projected TFSA balance", val: `$${fmt(projectedBalance)}` },
              { label: "Monthly tax-free income (25yr)", val: `$${fmt(projectedBalance / (25 * 12))}` },
            ].map((i) => (
              <div key={i.label} style={{ background: "#EEF2FF", borderRadius: "8px", padding: "14px", textAlign: "center" }}>
                <div style={{ fontSize: "11px", color: "#9CA3AF" }}>{i.label}</div>
                <div style={{ fontSize: "22px", fontWeight: "700", color: "#4F46E5" }}>{i.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
          ⚠️ Withdrawals in a given year are added back to your room the following January 1. Verify your exact room with CRA My Account. Non-residents are subject to a 1% monthly tax on any TFSA contributions made while non-resident.
        </div>
      </div>
      <Footer />
    </main>
  );
}
