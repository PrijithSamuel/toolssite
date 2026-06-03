"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n) { return Math.round(n).toLocaleString("en-SG"); }
function fmtDec(n, d = 1) { return n.toLocaleString("en-SG", { minimumFractionDigits: d, maximumFractionDigits: d }); }

const CPF_OW_CEILING = 7400;

const AGE_RATES = [
  { label: "55 & below", maxAge: 55, emp: 0.20, empr: 0.17 },
  { label: "55–60", maxAge: 60, emp: 0.16, empr: 0.15 },
  { label: "60–65", maxAge: 65, emp: 0.105, empr: 0.115 },
  { label: "65–70", maxAge: 70, emp: 0.07, empr: 0.09 },
  { label: "Above 70", maxAge: Infinity, emp: 0.05, empr: 0.075 },
];

const ALLOC = [
  { maxAge: 35, oa: 0.23, sa: 0.06, ma: 0.08 },
  { maxAge: 45, oa: 0.21, sa: 0.07, ma: 0.09 },
  { maxAge: 50, oa: 0.19, sa: 0.08, ma: 0.10 },
  { maxAge: 55, oa: 0.15, sa: 0.115, ma: 0.105 },
  { maxAge: 60, oa: 0.12, sa: 0.035, ma: 0.105 },
  { maxAge: 65, oa: 0.035, sa: 0.025, ma: 0.105 },
  { maxAge: 70, oa: 0.01, sa: 0.01, ma: 0.095 },
  { maxAge: Infinity, oa: 0.01, sa: 0.01, ma: 0.075 },
];

function getAgeGroup(age) {
  return AGE_RATES.find((r) => age <= r.maxAge) || AGE_RATES[AGE_RATES.length - 1];
}

function getAlloc(age) {
  return ALLOC.find((a) => age <= a.maxAge) || ALLOC[ALLOC.length - 1];
}

export default function SingaporeCPF() {
  const [salary, setSalary] = useState("5000");
  const [age, setAge] = useState("30");
  const [residency, setResidency] = useState("sc");

  const salaryVal = parseFloat(salary) || 0;
  const ageVal = parseInt(age) || 30;
  const cappedSalary = Math.min(salaryVal, CPF_OW_CEILING);

  const ageGroup = getAgeGroup(ageVal);
  let empRate = ageGroup.emp;
  let emprRate = ageGroup.empr;

  // PR Year 1/2 reduced rates
  if (residency === "pr1") { empRate = Math.min(empRate, 0.05); emprRate = Math.min(emprRate, 0.04); }
  if (residency === "pr2") { empRate = Math.min(empRate, 0.15); emprRate = Math.min(emprRate, 0.09); }

  const empCPF = Math.round(cappedSalary * empRate);
  const emprCPF = Math.round(cappedSalary * emprRate);
  const totalCPF = empCPF + emprCPF;
  const takeHome = salaryVal - empCPF;

  const alloc = getAlloc(ageVal);
  const totalRate = empRate + emprRate;
  const oaContrib = totalRate > 0 ? Math.round(totalCPF * (alloc.oa / totalRate)) : 0;
  const saContrib = totalRate > 0 ? Math.round(totalCPF * (alloc.sa / totalRate)) : 0;
  const maContrib = totalCPF - oaContrib - saContrib;

  const annualEmp = empCPF * 12;
  const annualEmpr = emprCPF * 12;
  const annualTotal = totalCPF * 12;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "CPF Calculator Singapore" }]} />
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>CPF Calculator Singapore 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate CPF contributions, OA/SA/MA allocation and take-home pay for all age groups.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Monthly Salary (S$) — OW ceiling S$7,400</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "#6B7280", fontWeight: "600" }}>S$</span>
                <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "12px 12px 12px 36px", outline: "none", background: "white", fontSize: "20px", fontWeight: "600", boxSizing: "border-box" }} />
              </div>
              {salaryVal > CPF_OW_CEILING && <div style={{ fontSize: "11px", color: "#F97316", marginTop: "3px" }}>OW ceiling: S${fmt(CPF_OW_CEILING)} applies for CPF calculation</div>}
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Age</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "12px", outline: "none", background: "white", fontSize: "20px", fontWeight: "600", boxSizing: "border-box" }} />
              <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "3px" }}>Age group: {ageGroup.label}</div>
            </div>
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Residency Status</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px" }}>
              {[
                { val: "sc", label: "Singapore Citizen" },
                { val: "pr3", label: "PR (3rd year+)" },
                { val: "pr2", label: "PR (2nd year)" },
                { val: "pr1", label: "PR (1st year)" },
              ].map(({ val, label }) => (
                <button key={val} onClick={() => setResidency(val)} style={{ padding: "8px 6px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: residency === val ? "#4F46E5" : "white", color: residency === val ? "white" : "#374151", fontSize: "11px", cursor: "pointer", fontWeight: "500" }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {salaryVal > 0 && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Take-Home Pay</div>
                  <div style={{ fontSize: "34px", fontWeight: "700", color: "#4F46E5" }}>S${fmt(takeHome)}</div>
                  <div style={{ fontSize: "11px", color: "#9CA3AF" }}>monthly</div>
                </div>
                <div style={{ textAlign: "center", borderLeft: "1px solid #C7D2FE", borderRight: "1px solid #C7D2FE" }}>
                  <div style={{ fontSize: "11px", color: "#EF4444", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Employee CPF ({(empRate * 100).toFixed(1)}%)</div>
                  <div style={{ fontSize: "34px", fontWeight: "700", color: "#EF4444" }}>S${fmt(empCPF)}</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#10B981", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Employer CPF ({(emprRate * 100).toFixed(1)}%)</div>
                  <div style={{ fontSize: "34px", fontWeight: "700", color: "#10B981" }}>S${fmt(emprCPF)}</div>
                </div>
              </div>

              {/* CPF Account allocation */}
              <div style={{ background: "white", borderRadius: "10px", padding: "14px 18px" }}>
                <div style={{ fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "10px" }}>Monthly CPF Allocation (Total: S${fmt(totalCPF)})</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                  {[
                    { label: "Ordinary Account (OA)", val: oaContrib, pct: alloc.oa, color: "#4F46E5", note: "For housing, education" },
                    { label: "Special Account (SA)", val: saContrib, pct: alloc.sa, color: "#10B981", note: "For retirement at 4% p.a." },
                    { label: "MediSave (MA)", val: maContrib, pct: alloc.ma, color: "#F97316", note: "For medical expenses" },
                  ].map((a) => (
                    <div key={a.label} style={{ textAlign: "center", background: "#F8F9FF", borderRadius: "8px", padding: "10px" }}>
                      <div style={{ fontSize: "10px", color: "#9CA3AF", marginBottom: "4px" }}>{a.label}</div>
                      <div style={{ fontSize: "20px", fontWeight: "700", color: a.color }}>S${fmt(a.val)}</div>
                      <div style={{ fontSize: "10px", color: "#9CA3AF" }}>{(a.pct * 100).toFixed(1)}% of OW</div>
                      <div style={{ fontSize: "9px", color: "#C7D2FE", marginTop: "2px" }}>{a.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Rate table by age */}
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
              <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "600", color: "#374151" }}>CPF Contribution Rates by Age (2025)</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px 80px", padding: "8px 20px", fontSize: "11px", fontWeight: "600", color: "#6B7280", background: "#F8F9FF", borderBottom: "0.5px solid #E0E7FF" }}>
                <span>Age Group</span><span style={{ textAlign: "center" }}>Employee</span><span style={{ textAlign: "center" }}>Employer</span><span style={{ textAlign: "center" }}>Total</span>
              </div>
              {AGE_RATES.map((r) => {
                const isActive = ageGroup.label === r.label;
                return (
                  <div key={r.label} style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px 80px", padding: "9px 20px", borderBottom: "0.5px solid #F3F4F6", fontSize: "13px", background: isActive ? "#F5F3FF" : "white" }}>
                    <span style={{ color: isActive ? "#4F46E5" : "#374151", fontWeight: isActive ? "600" : "400" }}>{isActive ? "▶ " : ""}{r.label}</span>
                    <span style={{ textAlign: "center", color: "#EF4444" }}>{(r.emp * 100).toFixed(1)}%</span>
                    <span style={{ textAlign: "center", color: "#10B981" }}>{(r.empr * 100).toFixed(1)}%</span>
                    <span style={{ textAlign: "center", fontWeight: "600", color: "#374151" }}>{((r.emp + r.empr) * 100).toFixed(1)}%</span>
                  </div>
                );
              })}
            </div>

            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "14px 20px", marginBottom: "16px" }}>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "10px" }}>Annual Summary</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                {[
                  { label: "Employee CPF / year", val: `S$${fmt(annualEmp)}` },
                  { label: "Employer CPF / year", val: `S$${fmt(annualEmpr)}` },
                  { label: "Total CPF / year", val: `S$${fmt(annualTotal)}` },
                ].map((i) => (
                  <div key={i.label} style={{ background: "#F8F9FF", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
                    <div style={{ fontSize: "11px", color: "#9CA3AF" }}>{i.label}</div>
                    <div style={{ fontSize: "16px", fontWeight: "700", color: "#374151" }}>{i.val}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ OW ceiling is S$7,400/month in 2025 (increasing to S$8,000 from Jan 2026). CPF interest: OA 2.5% p.a., SA/RA 4% p.a., MA 4% p.a. (with extra 1% on first S$60,000). PR 1st/2nd year rates are graduated. Source: CPF Board cpf.gov.sg.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
