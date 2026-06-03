"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n) { return Math.round(n).toLocaleString("en-LK"); }
function fmtDec(n, d = 1) { return n.toLocaleString("en-LK", { minimumFractionDigits: d, maximumFractionDigits: d }); }

const EPF_RATE = 0.08;
const EMPLOYER_EPF_RATE = 0.12;
const ETF_RATE = 0.03;
const EPF_INTEREST = 0.08;
const ETF_INTEREST = 0.04;

function projectBalance(monthlyContrib, years, annualRate) {
  const monthlyRate = annualRate / 12;
  const n = years * 12;
  if (monthlyRate === 0) return monthlyContrib * n;
  return monthlyContrib * ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate);
}

export default function SriLankaEPF() {
  const [currentAge, setCurrentAge] = useState("30");
  const [retirementAge, setRetirementAge] = useState("55");
  const [salary, setSalary] = useState("150000");
  const [incrementPct, setIncrementPct] = useState("10");

  const age = parseInt(currentAge) || 30;
  const retAge = parseInt(retirementAge) || 55;
  const sal = parseFloat(salary) || 0;
  const incr = (parseFloat(incrementPct) || 0) / 100;
  const yearsToRetire = Math.max(0, retAge - age);

  // Build year-by-year table
  const rows = [];
  let epfBalance = 0;
  let etfBalance = 0;
  let totalEmpContrib = 0;
  let totalEmployerContrib = 0;
  let totalEtf = 0;
  let currentSalary = sal;

  for (let y = 1; y <= yearsToRetire; y++) {
    const annualSalary = currentSalary * 12;
    const empAnnual = annualSalary * EPF_RATE;
    const emplrAnnual = annualSalary * EMPLOYER_EPF_RATE;
    const etfAnnual = annualSalary * ETF_RATE;

    epfBalance = (epfBalance + empAnnual + emplrAnnual) * (1 + EPF_INTEREST);
    etfBalance = (etfBalance + etfAnnual) * (1 + ETF_INTEREST);
    totalEmpContrib += empAnnual;
    totalEmployerContrib += emplrAnnual;
    totalEtf += etfAnnual;

    if (y <= 5 || y === Math.floor(yearsToRetire / 2) || y === yearsToRetire) {
      rows.push({ year: y, age: age + y, salary: currentSalary, epf: Math.round(epfBalance), etf: Math.round(etfBalance) });
    }

    currentSalary *= (1 + incr);
  }

  const totalContribs = totalEmpContrib + totalEmployerContrib + totalEtf;
  const totalFund = epfBalance + etfBalance;
  const totalInterest = totalFund - totalContribs;
  const monthlyPension = yearsToRetire > 0 ? totalFund / (20 * 12) : 0;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "EPF ETF Retirement Calculator" }]} />
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>EPF ETF Retirement Calculator Sri Lanka 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Project your EPF and ETF retirement savings with compound interest (8% EPF, 4% ETF).</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Current Age</label>
              <input type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Retirement Age</label>
              <input type="number" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Current Monthly Salary (Rs.)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "12px", color: "#6B7280", fontWeight: "600" }}>Rs.</span>
                <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px 10px 36px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Annual Salary Increment (%)</label>
              <div style={{ position: "relative" }}>
                <input type="number" value={incrementPct} onChange={(e) => setIncrementPct(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 36px 10px 12px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
                <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}>%</span>
              </div>
            </div>
          </div>
        </div>

        {sal > 0 && yearsToRetire > 0 && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "16px" }}>
                <div>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Total EPF at Retirement</div>
                  <div style={{ fontSize: "30px", fontWeight: "700", color: "#4F46E5" }}>Rs.{fmt(epfBalance)}</div>
                  <div style={{ fontSize: "11px", color: "#9CA3AF" }}>{yearsToRetire} years at 8% p.a.</div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Total ETF at Retirement</div>
                  <div style={{ fontSize: "30px", fontWeight: "700", color: "#6366F1" }}>Rs.{fmt(etfBalance)}</div>
                  <div style={{ fontSize: "11px", color: "#9CA3AF" }}>{yearsToRetire} years at 4% p.a.</div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                {[
                  { label: "Total Fund (EPF + ETF)", val: `Rs.${fmt(totalFund)}`, color: "#4F46E5" },
                  { label: "Interest earned", val: `Rs.${fmt(totalInterest)}`, color: "#10B981" },
                  { label: "Monthly pension (20yr)", val: `Rs.${fmt(monthlyPension)}`, color: "#374151" },
                ].map((i) => (
                  <div key={i.label} style={{ background: "white", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
                    <div style={{ fontSize: "10px", color: "#9CA3AF" }}>{i.label}</div>
                    <div style={{ fontSize: "14px", fontWeight: "700", color: i.color }}>{i.val}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
              <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "600", color: "#374151" }}>Total Contributions Breakdown</div>
              {[
                { label: "Employee EPF (8%)", val: totalEmpContrib, color: "#4F46E5" },
                { label: "Employer EPF (12%)", val: totalEmployerContrib, color: "#6366F1" },
                { label: "ETF (3%)", val: totalEtf, color: "#8B5CF6" },
                { label: "Total Contributions", val: totalContribs, bold: true, color: "#374151" },
                { label: "Interest Earned", val: totalInterest, color: "#10B981" },
                { label: "Total Fund Value", val: totalFund, bold: true, color: "#4F46E5" },
              ].map((r) => (
                <div key={r.label} style={{ padding: "10px 20px", borderBottom: "0.5px solid #F3F4F6", display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "#374151" }}>{r.label}</span>
                  <span style={{ fontWeight: r.bold ? "700" : "500", color: r.color }}>Rs.{fmt(r.val)}</span>
                </div>
              ))}
            </div>

            {rows.length > 0 && (
              <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
                <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "600", color: "#374151" }}>Growth Milestones</div>
                <div style={{ display: "grid", gridTemplateColumns: "60px 60px 1fr 1fr 1fr", padding: "8px 20px", fontSize: "11px", fontWeight: "600", color: "#6B7280", background: "#F8F9FF", borderBottom: "0.5px solid #E0E7FF" }}>
                  <span>Year</span><span>Age</span><span>Monthly Salary</span><span>EPF Balance</span><span>ETF Balance</span>
                </div>
                {rows.map((r) => (
                  <div key={r.year} style={{ display: "grid", gridTemplateColumns: "60px 60px 1fr 1fr 1fr", padding: "9px 20px", borderBottom: "0.5px solid #F3F4F6", fontSize: "12px" }}>
                    <span style={{ color: "#9CA3AF" }}>Yr {r.year}</span>
                    <span style={{ color: "#374151" }}>{r.age}</span>
                    <span style={{ color: "#374151" }}>Rs.{fmt(r.salary)}</span>
                    <span style={{ color: "#4F46E5", fontWeight: "500" }}>Rs.{fmt(r.epf)}</span>
                    <span style={{ color: "#6366F1", fontWeight: "500" }}>Rs.{fmt(r.etf)}</span>
                  </div>
                ))}
              </div>
            )}

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ Projection based on 8% EPF interest rate (historical rate — actual declared by EPF Board annually) and 4% ETF. Salary increment compounded annually. Actual fund value may differ.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
