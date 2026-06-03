"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n) { return Math.round(n).toLocaleString("en-CA"); }
function fmtDec(n, d = 0) { return n.toLocaleString("en-CA", { minimumFractionDigits: d, maximumFractionDigits: d }); }

const MAX_PENSIONABLE = 71300;
const BASIC_EXEMPTION = 3500;
const CPP_RATE = 0.0595;
const MAX_ANNUAL_BENEFIT_65 = 17400;

function calcCPP(avgEarnings, yearsContrib) {
  const cappedEarnings = Math.min(avgEarnings, MAX_PENSIONABLE);
  const pensionableEarnings = Math.max(0, cappedEarnings - BASIC_EXEMPTION);
  const contributionFactor = Math.min(1, yearsContrib / 39);
  const estimatedMonthly = (MAX_ANNUAL_BENEFIT_65 / 12) * contributionFactor * (pensionableEarnings / (MAX_PENSIONABLE - BASIC_EXEMPTION));
  return Math.min(MAX_ANNUAL_BENEFIT_65 / 12, estimatedMonthly);
}

export default function CanadaCPP() {
  const [age, setAge] = useState("50");
  const [yearsContrib, setYearsContrib] = useState("20");
  const [avgEarnings, setAvgEarnings] = useState("65000");
  const [retireAge, setRetireAge] = useState("65");

  const ageVal = parseInt(age) || 50;
  const yrs = Math.min(39, parseInt(yearsContrib) || 0);
  const earnings = parseFloat(avgEarnings) || 0;
  const retire = parseInt(retireAge) || 65;

  const monthlyAt65 = calcCPP(earnings, yrs);

  const monthsEarly = Math.max(0, (65 - retire) * 12);
  const monthsLate = Math.max(0, (retire - 65) * 12);
  const reductionPct = monthsEarly * 0.006;
  const increasePct = monthsLate * 0.007;

  const monthlyAtRetire = retire < 65
    ? monthlyAt65 * (1 - reductionPct)
    : monthlyAt65 * (1 + increasePct);

  const annualAt65 = monthlyAt65 * 12;
  const annualAtRetire = monthlyAtRetire * 12;

  // Break-even age: at what age does delaying start paying off vs taking early?
  const earlyStart = retire < 65 ? retire : 65;
  const lateStart = retire > 65 ? retire : 65;
  const earlyMonthly = retire < 65 ? monthlyAtRetire : monthlyAt65;
  const lateMonthly = retire > 65 ? monthlyAtRetire : monthlyAt65;
  let breakEvenAge = null;
  if (earlyMonthly < lateMonthly) {
    const monthsDiff = (lateStart - earlyStart) * 12;
    const monthlyGain = lateMonthly - earlyMonthly;
    const monthsToBreakEven = (lateMonthly * monthsDiff) / monthlyGain;
    breakEvenAge = lateStart + monthsToBreakEven / 12;
  }

  const annualContrib = Math.min(earnings - BASIC_EXEMPTION, MAX_PENSIONABLE - BASIC_EXEMPTION) * CPP_RATE;
  const totalContribs = annualContrib * yrs;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "CPP Calculator Canada" }]} />
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>CPP Calculator Canada 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Estimate your Canada Pension Plan retirement benefit — compare early, standard and delayed CPP.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Current Age</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Years of CPP Contributions</label>
              <input type="number" value={yearsContrib} onChange={(e) => setYearsContrib(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
              <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "3px" }}>Max 39 years for full CPP</div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Average Annual Earnings ($)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}>$</span>
                <input type="number" value={avgEarnings} onChange={(e) => setAvgEarnings(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px 10px 24px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
              </div>
              <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "3px" }}>CPP max pensionable: $71,300</div>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Planned Retirement Age (60–70)</label>
              <select value={retireAge} onChange={(e) => setRetireAge(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "14px", cursor: "pointer" }}>
                {Array.from({ length: 11 }, (_, i) => 60 + i).map((a) => (
                  <option key={a} value={a}>{a}{a === 65 ? " (standard)" : ""}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {earnings > 0 && yrs > 0 && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                {[
                  { label: "CPP at age 65 (standard)", monthly: monthlyAt65, color: "#374151" },
                  { label: retire < 65 ? `CPP at age ${retire} (reduced ${(reductionPct * 100).toFixed(0)}%)` : `CPP at age ${retire} (increased ${(increasePct * 100).toFixed(0)}%)`, monthly: monthlyAtRetire, color: retire < 65 ? "#EF4444" : "#10B981" },
                  { label: "Annual at retirement age", monthly: annualAtRetire / 12, isAnnual: true, color: "#4F46E5" },
                ].map((i) => (
                  <div key={i.label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "10px", color: "#6B7280", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>{i.label}</div>
                    {i.isAnnual
                      ? <div style={{ fontSize: "22px", fontWeight: "700", color: i.color }}>${fmt(annualAtRetire)}/yr</div>
                      : <><div style={{ fontSize: "28px", fontWeight: "700", color: i.color }}>${fmt(i.monthly)}</div><div style={{ fontSize: "11px", color: "#9CA3AF" }}>per month</div></>
                    }
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
              <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "600", color: "#374151" }}>Early vs Standard vs Late CPP</div>
              {[
                { age: 60, adj: -0.36, label: "Age 60 (−36% reduction)" },
                { age: 62, adj: -0.216, label: "Age 62 (−21.6% reduction)" },
                { age: 64, adj: -0.072, label: "Age 64 (−7.2% reduction)" },
                { age: 65, adj: 0, label: "Age 65 — standard" },
                { age: 67, adj: 0.168, label: "Age 67 (+16.8% increase)" },
                { age: 70, adj: 0.42, label: "Age 70 (+42% maximum)" },
              ].map((r) => {
                const m = monthlyAt65 * (1 + r.adj);
                const isSelected = r.age === retire;
                return (
                  <div key={r.age} style={{ padding: "10px 20px", borderBottom: "0.5px solid #F3F4F6", display: "grid", gridTemplateColumns: "1fr 110px 110px", fontSize: "13px", background: isSelected ? "#F5F3FF" : "white" }}>
                    <span style={{ color: isSelected ? "#4F46E5" : "#374151", fontWeight: isSelected ? "600" : "400" }}>{isSelected ? "▶ " : ""}{r.label}</span>
                    <span style={{ textAlign: "right", color: r.adj < 0 ? "#EF4444" : r.adj > 0 ? "#10B981" : "#374151", fontWeight: "600" }}>${fmt(m)}/mo</span>
                    <span style={{ textAlign: "right", color: "#9CA3AF" }}>${fmt(m * 12)}/yr</span>
                  </div>
                );
              })}
            </div>

            {breakEvenAge && retire !== 65 && (
              <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px 20px", marginBottom: "16px" }}>
                <div style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>Break-even Age</div>
                <div style={{ fontSize: "13px", color: "#374151" }}>
                  {retire < 65
                    ? `Taking CPP at ${retire} vs waiting until 65: you break even at age <strong>${fmtDec(breakEvenAge, 1)}</strong>. If you live past ${fmtDec(breakEvenAge, 1)}, waiting until 65 pays more in total.`
                    : `Delaying CPP to ${retire} vs taking at 65: you break even at age <strong>${fmtDec(breakEvenAge, 1)}</strong>. If you live past ${fmtDec(breakEvenAge, 1)}, delaying pays more in total.`}
                </div>
              </div>
            )}

            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px 20px", marginBottom: "16px" }}>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "10px" }}>Your CPP Contribution Summary</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                {[
                  { label: "Annual contribution", val: `$${fmt(annualContrib)}` },
                  { label: "Total contributed over career", val: `$${fmt(totalContribs)}` },
                  { label: "2025 max benefit (age 65)", val: "$1,450/mo" },
                ].map((i) => (
                  <div key={i.label} style={{ background: "#F8F9FF", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
                    <div style={{ fontSize: "11px", color: "#9CA3AF" }}>{i.label}</div>
                    <div style={{ fontSize: "15px", fontWeight: "700", color: "#374151" }}>{i.val}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ CPP estimates are approximate. Actual benefit depends on your full contribution history as recorded by Service Canada. Check your Statement of Contributions at My Service Canada Account (MSCA). CPP is also subject to income tax in retirement.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
