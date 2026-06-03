"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n) { return Math.round(n).toLocaleString("en-LK"); }

const APIT_BANDS = [
  { from: 0, to: 100000, rate: 0 },
  { from: 100000, to: 166667, rate: 0.06 },
  { from: 166667, to: 250000, rate: 0.12 },
  { from: 250000, to: 333333, rate: 0.18 },
  { from: 333333, to: 416667, rate: 0.24 },
  { from: 416667, to: 500000, rate: 0.30 },
  { from: 500000, to: Infinity, rate: 0.36 },
];

function calcAPIT(taxableMonthly) {
  let tax = 0;
  for (const b of APIT_BANDS) {
    if (taxableMonthly <= b.from) break;
    const chunk = Math.min(taxableMonthly, b.to) - b.from;
    tax += chunk * b.rate;
  }
  return Math.max(0, tax);
}

export default function SriLankaSalary() {
  const [basic, setBasic] = useState("150000");
  const [allowances, setAllowances] = useState("0");

  const basicVal = parseFloat(basic) || 0;
  const allowVal = parseFloat(allowances) || 0;
  const gross = basicVal + allowVal;

  const empEPF = gross * 0.08;
  const taxableIncome = gross - empEPF;
  const apit = calcAPIT(taxableIncome);
  const netSalary = gross - empEPF - apit;

  const empEPFEmployer = gross * 0.12;
  const etf = gross * 0.03;
  const totalEmployerCost = gross + empEPFEmployer + etf;

  const effectiveRate = gross > 0 ? ((empEPF + apit) / gross * 100) : 0;

  const apitBand = APIT_BANDS.find((b) => taxableIncome > b.from && taxableIncome <= b.to) || APIT_BANDS[0];

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "Sri Lanka Salary Calculator" }]} />
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>Sri Lanka Salary Calculator 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate EPF, ETF and APIT deductions — net take-home salary in LKR.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Basic Salary (Rs.)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "#6B7280", fontWeight: "600" }}>Rs.</span>
                <input type="number" value={basic} onChange={(e) => setBasic(e.target.value)} placeholder="150000" style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "12px 12px 12px 44px", outline: "none", background: "white", fontSize: "18px", fontWeight: "500", boxSizing: "border-box" }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Other Allowances (Rs.) <span style={{ color: "#9CA3AF", fontWeight: "400" }}>optional</span></label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "#6B7280", fontWeight: "600" }}>Rs.</span>
                <input type="number" value={allowances} onChange={(e) => setAllowances(e.target.value)} placeholder="0" style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "12px 12px 12px 44px", outline: "none", background: "white", fontSize: "18px", fontWeight: "500", boxSizing: "border-box" }} />
              </div>
            </div>
          </div>
        </div>

        {gross > 0 && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "14px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Net Take-Home</div>
                  <div style={{ fontSize: "30px", fontWeight: "700", color: "#4F46E5" }}>Rs.{fmt(netSalary)}</div>
                  <div style={{ fontSize: "11px", color: "#9CA3AF" }}>per month</div>
                </div>
                <div style={{ textAlign: "center", borderLeft: "1px solid #C7D2FE", borderRight: "1px solid #C7D2FE" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Annual Net</div>
                  <div style={{ fontSize: "22px", fontWeight: "600", color: "#4F46E5" }}>Rs.{fmt(netSalary * 12)}</div>
                  <div style={{ fontSize: "11px", color: "#9CA3AF" }}>per year</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#EF4444", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Effective Rate</div>
                  <div style={{ fontSize: "30px", fontWeight: "700", color: "#EF4444" }}>{effectiveRate.toFixed(1)}%</div>
                  <div style={{ fontSize: "11px", color: "#9CA3AF" }}>total deductions</div>
                </div>
              </div>
              <div style={{ height: "8px", background: "#E0E7FF", borderRadius: "5px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${100 - effectiveRate}%`, background: "linear-gradient(90deg, #4F46E5, #818CF8)", borderRadius: "5px" }} />
              </div>
            </div>

            {/* Employee deductions */}
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
              <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "700", color: "#374151", background: "#F8F9FF" }}>Employee Deductions</div>
              {[
                { label: "Gross Salary (Bruto)", val: gross, color: "#1E1B4B", bold: true },
                { label: "Employee EPF (8% of gross)", val: -empEPF, color: "#6366F1" },
                { label: `APIT (${(apitBand.rate * 100).toFixed(0)}% band — taxable Rs.${fmt(taxableIncome)})`, val: -apit, color: "#EF4444" },
                { label: "✓ Net Take-Home", val: netSalary, color: "#4F46E5", bold: true },
              ].map((r) => (
                <div key={r.label} style={{ padding: "11px 20px", borderBottom: "0.5px solid #F3F4F6", display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "#374151" }}>{r.label}</span>
                  <span style={{ fontWeight: r.bold ? "700" : "500", color: r.color }}>
                    {r.val < 0 ? `− Rs.${fmt(Math.abs(r.val))}` : `Rs.${fmt(r.val)}`}
                  </span>
                </div>
              ))}
            </div>

            {/* Employer costs */}
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
              <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "700", color: "#374151", background: "#F8F9FF" }}>Employer Cost Summary</div>
              {[
                { label: "Gross Salary", val: gross, color: "#1E1B4B" },
                { label: "Employer EPF (12% of gross)", val: empEPFEmployer, color: "#8B5CF6" },
                { label: "ETF (3% of gross)", val: etf, color: "#6366F1" },
                { label: "Total Employer Cost", val: totalEmployerCost, color: "#4F46E5", bold: true },
              ].map((r) => (
                <div key={r.label} style={{ padding: "11px 20px", borderBottom: "0.5px solid #F3F4F6", display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "#374151" }}>{r.label}</span>
                  <span style={{ fontWeight: r.bold ? "700" : "500", color: r.color }}>Rs.{fmt(r.val)}</span>
                </div>
              ))}
            </div>

            {/* Annual summary */}
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px 20px", marginBottom: "16px" }}>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "10px" }}>Annual Summary</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
                {[
                  { label: "Gross / year", val: `Rs.${fmt(gross * 12)}` },
                  { label: "EPF savings", val: `Rs.${fmt((empEPF + empEPFEmployer) * 12)}` },
                  { label: "ETF savings", val: `Rs.${fmt(etf * 12)}` },
                  { label: "Net / year", val: `Rs.${fmt(netSalary * 12)}` },
                ].map((i) => (
                  <div key={i.label} style={{ background: "#F8F9FF", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
                    <div style={{ fontSize: "10px", color: "#9CA3AF" }}>{i.label}</div>
                    <div style={{ fontSize: "13px", fontWeight: "600", color: "#374151" }}>{i.val}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ Calculated using 2025 APIT rates and EPF/ETF rates. APIT is deducted at source by the employer and remitted to IRD. EPF/ETF contributions are remitted to the Employees&apos; Provident Fund and Trust Fund respectively.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
