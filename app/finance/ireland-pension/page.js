"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n) { return Math.round(n).toLocaleString("en-IE"); }
function fmtDec(n, d = 2) { return n.toLocaleString("en-IE", { minimumFractionDigits: d, maximumFractionDigits: d }); }

const AGE_LIMITS = [
  { maxAge: 29, limit: 15 },
  { maxAge: 39, limit: 20 },
  { maxAge: 49, limit: 25 },
  { maxAge: 54, limit: 30 },
  { maxAge: 59, limit: 35 },
  { maxAge: Infinity, limit: 40 },
];

function getAgeLimit(age) {
  return AGE_LIMITS.find((a) => age <= a.maxAge)?.limit ?? 40;
}

function getMarginalRate(salary, married) {
  const band = married ? 51000 : 42000;
  return salary > band ? 40 : 20;
}

function compoundGrowth(annualContrib, years, rate = 0.05) {
  let pot = 0;
  for (let i = 0; i < years; i++) {
    pot = (pot + annualContrib) * (1 + rate);
  }
  return pot;
}

export default function IrelandPension() {
  const [ageInput, setAgeInput] = useState("35");
  const [salaryInput, setSalaryInput] = useState("60000");
  const [contribPct, setContribPct] = useState("5");
  const [employerPct, setEmployerPct] = useState("5");
  const [married, setMarried] = useState(false);

  const age = parseInt(ageInput) || 35;
  const salary = parseFloat(salaryInput) || 0;
  const contrib = parseFloat(contribPct) || 0;
  const empContrib = parseFloat(employerPct) || 0;

  const cappedSalary = Math.min(salary, 115000);
  const ageLimit = getAgeLimit(age);
  const marginalRate = getMarginalRate(salary, married);

  const annualContrib = cappedSalary * (contrib / 100);
  const cappedContrib = Math.min(annualContrib, cappedSalary * (ageLimit / 100));
  const isCapped = annualContrib > cappedContrib;
  const taxRelief = cappedContrib * (marginalRate / 100);
  const netCostEmployee = cappedContrib - taxRelief;
  const annualEmployerContrib = cappedSalary * (empContrib / 100);
  const totalAnnualContrib = cappedContrib + annualEmployerContrib;

  const yearsTo65 = Math.max(0, 65 - age);
  const projectedPot = yearsTo65 > 0 ? compoundGrowth(totalAnnualContrib, yearsTo65) : totalAnnualContrib;
  const projectedMonthly = projectedPot / (25 * 12); // rough 25-yr drawdown

  const monthlyContrib = cappedContrib / 12;
  const monthlyNetCost = netCostEmployee / 12;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "Irish Pension Calculator" }]} />
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>Irish Pension Calculator 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate pension tax relief, net cost, and projected pot at retirement.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Your Age</label>
              <input type="number" value={ageInput} onChange={(e) => setAgeInput(e.target.value)} placeholder="35" style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Gross Annual Salary (€)</label>
              <input type="number" value={salaryInput} onChange={(e) => setSalaryInput(e.target.value)} placeholder="60000" style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
              {salary > 115000 && <div style={{ fontSize: "11px", color: "#F97316", marginTop: "3px" }}>Relief capped at €115,000 earnings</div>}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Your Contribution (%)</label>
              <div style={{ position: "relative" }}>
                <input type="number" step="0.5" value={contribPct} onChange={(e) => setContribPct(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 36px 10px 12px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
                <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}>%</span>
              </div>
              {salary > 0 && <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "3px" }}>= €{fmt(monthlyContrib)}/mo | Max relief: {ageLimit}%</div>}
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Employer Contribution (%) <span style={{ color: "#9CA3AF", fontWeight: "400" }}>optional</span></label>
              <div style={{ position: "relative" }}>
                <input type="number" step="0.5" value={employerPct} onChange={(e) => setEmployerPct(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 36px 10px 12px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
                <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}>%</span>
              </div>
            </div>
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Tax Assessment</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => setMarried(false)} style={{ padding: "8px 20px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: !married ? "#4F46E5" : "white", color: !married ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>Single</button>
              <button onClick={() => setMarried(true)} style={{ padding: "8px 20px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: married ? "#4F46E5" : "white", color: married ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>Married (one earner)</button>
            </div>
          </div>
        </div>

        {salary > 0 && contrib > 0 && (
          <>
            {/* Tax relief summary */}
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Annual Contribution</div>
                  <div style={{ fontSize: "30px", fontWeight: "700", color: "#374151" }}>€{fmt(cappedContrib)}</div>
                  {isCapped && <div style={{ fontSize: "11px", color: "#F97316" }}>Capped at {ageLimit}% limit</div>}
                </div>
                <div style={{ textAlign: "center", borderLeft: "1px solid #C7D2FE", borderRight: "1px solid #C7D2FE" }}>
                  <div style={{ fontSize: "11px", color: "#10B981", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Tax Relief ({marginalRate}%)</div>
                  <div style={{ fontSize: "30px", fontWeight: "700", color: "#10B981" }}>€{fmt(taxRelief)}</div>
                  <div style={{ fontSize: "11px", color: "#6B7280" }}>saved in tax</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#4F46E5", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Net Cost to You</div>
                  <div style={{ fontSize: "30px", fontWeight: "700", color: "#4F46E5" }}>€{fmt(netCostEmployee)}</div>
                  <div style={{ fontSize: "11px", color: "#6B7280" }}>= €{fmt(monthlyNetCost)}/mo</div>
                </div>
              </div>

              <div style={{ background: "white", borderRadius: "8px", padding: "12px 16px", fontSize: "12px", color: "#374151" }}>
                For every <strong>€1</strong> you put into your pension, it only costs you <strong>€{fmtDec(1 - marginalRate / 100, 2)}</strong> after tax relief at the {marginalRate}% marginal rate.
              </div>
            </div>

            {/* Age-based limits */}
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
              <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "600", color: "#374151" }}>Age-Based Relief Limits (Revenue Ireland)</div>
              {[
                { label: "Under 30", limit: 15 },
                { label: "30 – 39", limit: 20 },
                { label: "40 – 49", limit: 25 },
                { label: "50 – 54", limit: 30 },
                { label: "55 – 59", limit: 35 },
                { label: "60 and over", limit: 40 },
              ].map(({ label, limit }) => {
                const isCurrentBand = limit === ageLimit;
                return (
                  <div key={label} style={{ padding: "9px 20px", borderBottom: "0.5px solid #F3F4F6", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", background: isCurrentBand ? "#F5F3FF" : "white" }}>
                    <span style={{ color: isCurrentBand ? "#4F46E5" : "#374151", fontWeight: isCurrentBand ? "600" : "400" }}>
                      {isCurrentBand && "▶ "}{label}
                    </span>
                    <span style={{ fontWeight: "600", color: isCurrentBand ? "#4F46E5" : "#374151" }}>{limit}% of net relevant earnings</span>
                  </div>
                );
              })}
              <div style={{ padding: "9px 20px", fontSize: "12px", color: "#9CA3AF", background: "#F8F9FF" }}>
                Earnings cap: €115,000 | Maximum annual contribution eligible for relief: €{fmt(115000 * ageLimit / 100)}
              </div>
            </div>

            {/* Projection */}
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px 24px", marginBottom: "16px" }}>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "14px" }}>Projected Pension Pot at Age 65 (5% growth)</div>
              {yearsTo65 > 0 ? (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                    {[
                      { label: "Years to 65", val: yearsTo65 },
                      { label: "Total annual into pension", val: `€${fmt(totalAnnualContrib)}` },
                      { label: "Projected pot", val: `€${fmt(projectedPot)}` },
                    ].map((i) => (
                      <div key={i.label} style={{ background: "#F8F9FF", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
                        <div style={{ fontSize: "11px", color: "#9CA3AF" }}>{i.label}</div>
                        <div style={{ fontSize: "18px", fontWeight: "700", color: "#4F46E5" }}>{i.val}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: "12px", color: "#6B7280", background: "#EEF2FF", borderRadius: "8px", padding: "10px 14px" }}>
                    Estimated monthly income in retirement: <strong>€{fmt(projectedMonthly)}</strong> over 25 years (rough drawdown estimate at 5% p.a. growth, before charges).
                  </div>
                </>
              ) : (
                <div style={{ fontSize: "13px", color: "#9CA3AF" }}>Already at or past 65 — projection not applicable.</div>
              )}
            </div>

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ Projection uses 5% annual growth before charges and is illustrative only. Actual returns depend on fund performance, charges and investment choices. Consult a QFA (Qualified Financial Adviser) regulated by the Central Bank of Ireland.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
