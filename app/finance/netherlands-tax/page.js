"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n) { return Math.round(n).toLocaleString("nl-NL"); }
function fmtDec(n, d = 2) { return n.toLocaleString("nl-NL", { minimumFractionDigits: d, maximumFractionDigits: d }); }

function calcAHK(income) {
  if (income <= 24813) return 3362;
  if (income >= 75518) return 0;
  return Math.max(0, 3362 - (income - 24813) * (3362 / (75518 - 24813)));
}

function calcArbeidskorting(income) {
  if (income <= 0) return 0;
  // Phase in to max €5,052 at €43,000
  let ak = Math.min(income, 43000) * (5052 / 43000);
  // Phase out above €43,000 to 0 at €120,000
  if (income > 43000) ak = Math.max(0, 5052 - (income - 43000) * (5052 / (120000 - 43000)));
  return Math.max(0, ak);
}

function calcBox1Tax(taxableIncome) {
  let tax = 0;
  if (taxableIncome <= 75518) {
    tax = taxableIncome * 0.3582;
  } else {
    tax = 75518 * 0.3582 + (taxableIncome - 75518) * 0.495;
  }
  return Math.max(0, tax);
}

function calcAll(gross, use30) {
  const taxableGross = use30 ? gross * 0.70 : gross;
  const grossTax = calcBox1Tax(taxableGross);
  const ahk = calcAHK(taxableGross);
  const ak = calcArbeidskorting(taxableGross);
  const totalCredits = ahk + ak;
  const netTax = Math.max(0, grossTax - totalCredits);
  const netAnnual = gross - netTax;
  const effectiveRate = gross > 0 ? (netTax / gross) * 100 : 0;
  return { taxableGross, grossTax, ahk, ak, totalCredits, netTax, netAnnual, netMonthly: netAnnual / 12, effectiveRate };
}

export default function NetherlandsTax() {
  const [salaryInput, setSalaryInput] = useState("60000");
  const [use30, setUse30] = useState(false);

  const salary = parseFloat(salaryInput) || 0;
  const res = salary > 0 ? calcAll(salary, use30) : null;
  const resWithout = salary > 0 && use30 ? calcAll(salary, false) : null;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "Dutch Income Tax" }]} />
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>Dutch Income Tax Calculator 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Bruto netto berekenen — Box 1 tax, heffingskortingen and 30% ruling for the Netherlands.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Bruto jaarsalaris (Gross Annual Salary)</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "20px", color: "#6B7280" }}>€</span>
              <input
                type="number"
                value={salaryInput}
                onChange={(e) => setSalaryInput(e.target.value)}
                placeholder="60000"
                style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "13px 14px 13px 38px", outline: "none", background: "white", fontSize: "24px", fontWeight: "600", boxSizing: "border-box" }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>30% Ruling (30%-regeling)?</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => setUse30(false)} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: !use30 ? "#4F46E5" : "white", color: !use30 ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>No — Standard rates</button>
              <button onClick={() => setUse30(true)} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: use30 ? "#4F46E5" : "white", color: use30 ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>Yes — 30% tax-free</button>
            </div>
            {use30 && salary < 46107 && (
              <div style={{ marginTop: "8px", background: "#FEF2F2", border: "0.5px solid #FCA5A5", borderRadius: "8px", padding: "9px 14px", fontSize: "12px", color: "#B91C1C" }}>
                ⚠️ 30% ruling minimum salary is €46,107 (2025). Below this threshold you may not qualify.
              </div>
            )}
          </div>
        </div>

        {res && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Netto / Maand</div>
                  <div style={{ fontSize: "34px", fontWeight: "700", color: "#4F46E5" }}>€{fmt(res.netMonthly)}</div>
                </div>
                <div style={{ textAlign: "center", borderLeft: "1px solid #C7D2FE", borderRight: "1px solid #C7D2FE" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Netto / Jaar</div>
                  <div style={{ fontSize: "24px", fontWeight: "600", color: "#4F46E5" }}>€{fmt(res.netAnnual)}</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Effectief tarief</div>
                  <div style={{ fontSize: "34px", fontWeight: "700", color: "#EF4444" }}>{fmtDec(res.effectiveRate, 1)}%</div>
                </div>
              </div>
              <div style={{ height: "10px", background: "#E0E7FF", borderRadius: "5px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${100 - res.effectiveRate}%`, background: "linear-gradient(90deg, #4F46E5, #818CF8)", borderRadius: "5px", transition: "width 0.4s" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#6B7280", marginTop: "4px" }}>
                <span>Netto: €{fmt(res.netAnnual)}</span>
                <span>Belasting: €{fmt(res.netTax)} ({fmtDec(res.effectiveRate, 1)}%)</span>
              </div>
            </div>

            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
              <div style={{ padding: "10px 20px", borderBottom: "0.5px solid #E0E7FF", display: "grid", gridTemplateColumns: "1fr 130px", fontSize: "11px", fontWeight: "600", color: "#6B7280", background: "#F8F9FF" }}>
                <span>Omschrijving</span><span style={{ textAlign: "right" }}>Bedrag / jaar</span>
              </div>
              {[
                { label: "Bruto salaris", val: salary, color: "#1E1B4B", bold: true },
                { label: use30 ? "Belastbaar loon (70% — 30%-regeling)" : "Belastbaar loon (Box 1)", val: res.taxableGross, color: "#374151" },
                { label: `Box 1 belasting (${salary <= 75518 ? "35,82%" : "35,82% / 49,50%"})`, val: -res.grossTax, color: "#EF4444" },
                { label: "Algemene heffingskorting", val: res.ahk, color: "#10B981" },
                { label: "Arbeidskorting", val: res.ak, color: "#10B981" },
                { label: "Netto te betalen belasting", val: -res.netTax, color: "#EF4444", bold: true },
                { label: "Netto salaris (jaar)", val: res.netAnnual, color: "#4F46E5", bold: true },
              ].map((r) => (
                <div key={r.label} style={{ padding: "10px 20px", borderBottom: "0.5px solid #F3F4F6", display: "grid", gridTemplateColumns: "1fr 130px", fontSize: "13px" }}>
                  <span style={{ color: "#374151" }}>{r.label}</span>
                  <span style={{ textAlign: "right", fontWeight: r.bold ? "700" : "500", color: r.color }}>
                    {r.val < 0 ? `−€${fmt(Math.abs(r.val))}` : `€${fmt(r.val)}`}
                  </span>
                </div>
              ))}
            </div>

            {use30 && resWithout && (
              <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "18px 20px", marginBottom: "16px" }}>
                <div style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "12px" }}>30%-regeling voordeel (annual saving)</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                  {[
                    { label: "Without 30% ruling", val: `€${fmt(resWithout.netAnnual)}/yr`, sub: `€${fmt(resWithout.netMonthly)}/mo` },
                    { label: "With 30% ruling", val: `€${fmt(res.netAnnual)}/yr`, sub: `€${fmt(res.netMonthly)}/mo` },
                    { label: "Annual saving", val: `€${fmt(res.netAnnual - resWithout.netAnnual)}`, sub: `€${fmt((res.netAnnual - resWithout.netAnnual) / 12)}/mo`, highlight: true },
                  ].map((i) => (
                    <div key={i.label} style={{ background: i.highlight ? "#EEF2FF" : "#F8F9FF", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
                      <div style={{ fontSize: "11px", color: "#9CA3AF" }}>{i.label}</div>
                      <div style={{ fontSize: "16px", fontWeight: "700", color: i.highlight ? "#4F46E5" : "#374151" }}>{i.val}</div>
                      <div style={{ fontSize: "11px", color: "#6B7280" }}>{i.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ Approximation using 2025 Belastingdienst rates. Does not include employer social premiums (ZVW), pension contributions, or other personal deductions. Consult a belastingadviseur or mijnbelastingdienst.nl for exact figures.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
