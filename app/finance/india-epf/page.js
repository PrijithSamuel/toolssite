"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n) { return Math.round(n).toLocaleString("en-IN"); }

const EPF_RATE = 0.0825;

export default function IndiaEPF() {
  const [basic, setBasic] = useState("30000");
  const [age, setAge] = useState("28");
  const [retireAge, setRetireAge] = useState("58");
  const [increment, setIncrement] = useState("10");
  const [showTable, setShowTable] = useState(false);

  const basicVal = parseFloat(basic) || 0;
  const currentAge = parseInt(age) || 28;
  const retire = parseInt(retireAge) || 58;
  const incr = (parseFloat(increment) || 0) / 100;
  const yearsLeft = Math.max(0, retire - currentAge);

  let balance = 0;
  let totalEmpContrib = 0;
  let totalEmprContrib = 0;
  let totalInterest = 0;
  let currentBasic = basicVal;
  const yearRows = [];

  for (let y = 1; y <= yearsLeft; y++) {
    const annualBasic = currentBasic * 12;
    const empAnnual = annualBasic * 0.12;
    const emprEPF = annualBasic * 0.0367;
    const eps = annualBasic * 0.0833;
    const interestEarned = balance * EPF_RATE;
    balance = balance + empAnnual + emprEPF + interestEarned;
    totalEmpContrib += empAnnual;
    totalEmprContrib += emprEPF;
    totalInterest += interestEarned;
    if (y <= 5 || y === Math.floor(yearsLeft / 2) || y === yearsLeft) {
      yearRows.push({ year: y, age: currentAge + y, basic: Math.round(currentBasic), balance: Math.round(balance) });
    }
    currentBasic *= (1 + incr);
  }

  const totalCorpus = Math.round(balance);
  const empContrib = Math.round(basicVal * 0.12);
  const emprContrib = Math.round(basicVal * 0.0367);
  const epsContrib = Math.round(basicVal * 0.0833);

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "EPF Calculator India" }]} />
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>EPF Calculator India 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Employee Provident Fund — 8.25% interest, 12% employee + 12% employer (3.67% EPF + 8.33% EPS).</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Basic Salary + DA (monthly ₹)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}>₹</span>
                <input type="number" value={basic} onChange={(e) => setBasic(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px 10px 26px", outline: "none", background: "white", fontSize: "16px", fontWeight: "500", boxSizing: "border-box" }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Annual Salary Increment (%)</label>
              <div style={{ position: "relative" }}>
                <input type="number" value={increment} onChange={(e) => setIncrement(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 30px 10px 12px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
                <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}>%</span>
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Current Age</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Retirement Age (default 58)</label>
              <input type="number" value={retireAge} onChange={(e) => setRetireAge(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
            </div>
          </div>
        </div>

        {basicVal > 0 && (
          <>
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px 20px", marginBottom: "16px" }}>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "10px" }}>Monthly Contribution Breakdown</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
                {[
                  { label: "Employee EPF (12%)", val: empContrib, color: "#4F46E5" },
                  { label: "Employer EPF (3.67%)", val: emprContrib, color: "#6366F1" },
                  { label: "EPS Pension (8.33%)", val: epsContrib, color: "#8B5CF6" },
                  { label: "Total Monthly", val: empContrib + emprContrib + epsContrib, color: "#374151" },
                ].map((i) => (
                  <div key={i.label} style={{ background: "#F8F9FF", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
                    <div style={{ fontSize: "10px", color: "#9CA3AF" }}>{i.label}</div>
                    <div style={{ fontSize: "15px", fontWeight: "700", color: i.color }}>₹{fmt(i.val)}</div>
                  </div>
                ))}
              </div>
            </div>

            {yearsLeft > 0 && (
              <>
                <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>EPF Corpus at {retire}</div>
                      <div style={{ fontSize: "28px", fontWeight: "700", color: "#4F46E5" }}>₹{fmt(totalCorpus)}</div>
                    </div>
                    <div style={{ textAlign: "center", borderLeft: "1px solid #C7D2FE", borderRight: "1px solid #C7D2FE" }}>
                      <div style={{ fontSize: "11px", color: "#374151", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Total Interest (8.25%)</div>
                      <div style={{ fontSize: "28px", fontWeight: "700", color: "#10B981" }}>₹{fmt(totalInterest)}</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "11px", color: "#374151", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Years to Retire</div>
                      <div style={{ fontSize: "28px", fontWeight: "700", color: "#374151" }}>{yearsLeft}</div>
                    </div>
                  </div>
                </div>

                <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
                  <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "13px", fontWeight: "600", color: "#374151" }}>Growth Milestones</span>
                    <button onClick={() => setShowTable(!showTable)} style={{ fontSize: "12px", color: "#4F46E5", background: "none", border: "none", cursor: "pointer" }}>{showTable ? "Hide ▲" : "Show ▼"}</button>
                  </div>
                  {showTable && yearRows.map((r) => (
                    <div key={r.year} style={{ display: "grid", gridTemplateColumns: "50px 50px 1fr 1fr", padding: "8px 20px", borderBottom: "0.5px solid #F3F4F6", fontSize: "12px" }}>
                      <span style={{ color: "#9CA3AF" }}>Yr {r.year}</span>
                      <span style={{ color: "#9CA3AF" }}>Age {r.age}</span>
                      <span style={{ color: "#374151" }}>Basic ₹{fmt(r.basic)}</span>
                      <span style={{ color: "#4F46E5", fontWeight: "600" }}>₹{fmt(r.balance)}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ EPF interest rate of 8.25% is for FY 2023-24 (declared by EPFO). Employer contribution of 8.33% goes to EPS (pension) and is not part of your EPF corpus. EPS provides a monthly pension; corpus shown is EPF only. EPFO figures may differ slightly.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
