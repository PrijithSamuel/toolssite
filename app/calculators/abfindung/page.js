"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata = undefined;

function fmt(n) { return Math.round(n).toLocaleString("de-DE"); }

// German income tax (EST) simplified for Abfindung calculation
function est(zvE) {
  if (zvE <= 11604) return 0;
  if (zvE <= 17005) { const y = (zvE - 11604) / 10000; return (974.07 * y + 1400) * y; }
  if (zvE <= 66760) { const z = (zvE - 17005) / 10000; return (206.43 * z + 2397) * z + 938.24; }
  if (zvE <= 277825) return 0.42 * zvE - 10602.13;
  return 0.45 * zvE - 18936.88;
}

// Fünftelregelung: tax on severance = 5 × (tax on income + 1/5 abfindung − tax on income)
function calcAbfindungTax(grossAnnual, abfindung) {
  const baseIncome = Math.max(0, grossAnnual - 1266); // basic deduction
  const taxBase = Math.round(est(baseIncome));
  const taxWith = Math.round(est(baseIncome + abfindung / 5));
  const taxOnAbfindung = Math.max(0, (taxWith - taxBase) * 5);
  return { taxOnAbfindung, effectiveRate: abfindung > 0 ? (taxOnAbfindung / abfindung) * 100 : 0 };
}

export default function Abfindung() {
  const [monthlyGross, setMonthlyGross] = useState("4000");
  const [years, setYears] = useState("5");
  const [ageInput, setAgeInput] = useState("35");
  const [multiplier, setMultiplier] = useState("0.5");

  const gross = parseFloat(monthlyGross) || 0;
  const yrs = parseFloat(years) || 0;
  const age = parseFloat(ageInput) || 0;

  // Standard formula: multiplier × monthly gross × years
  const abfindung = Math.round(parseFloat(multiplier) * gross * yrs);
  const annualGross = gross * 12;

  const { taxOnAbfindung, effectiveRate } = abfindung > 0 ? calcAbfindungTax(annualGross, abfindung) : { taxOnAbfindung: 0, effectiveRate: 0 };
  const netAbfindung = abfindung - taxOnAbfindung;

  // Age-based multipliers (§ 1a KSchG)
  const ageMultipliers = [
    { condition: "Standard", multi: 0.5 },
    { condition: "Age ≥ 50 and ≥ 15 years service", multi: 0.6 },
    { condition: "Age ≥ 55 and ≥ 20 years service", multi: 0.75 },
  ];

  const canHigher = (age >= 50 && yrs >= 15) || (age >= 55 && yrs >= 20);
  const suggestedMulti = age >= 55 && yrs >= 20 ? 0.75 : age >= 50 && yrs >= 15 ? 0.6 : 0.5;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Calculators", href: "/calculators" }, { label: "Abfindungsrechner" }]} />
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>Abfindungsrechner</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Estimate your severance pay (Abfindung) including the Fünftelregelung tax benefit.</p>
        </div>

        {/* Input card */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Monthly Gross Salary (€)</label>
              <div style={{ position: "relative" }}>
                <input type="number" value={monthlyGross} onChange={(e) => setMonthlyGross(e.target.value)} placeholder="4000" style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 36px 10px 12px", outline: "none", background: "white", fontSize: "16px", fontWeight: "500", boxSizing: "border-box" }} />
                <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}>€</span>
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Years of Employment</label>
              <input type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="5" style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "16px", fontWeight: "500", boxSizing: "border-box" }} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Your Age</label>
              <input type="number" value={ageInput} onChange={(e) => setAgeInput(e.target.value)} placeholder="35" style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "16px", fontWeight: "500", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Multiplier (Faktor)</label>
              <select value={multiplier} onChange={(e) => setMultiplier(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "14px", cursor: "pointer" }}>
                <option value="0.5">0.5 — Standard (§ 1a KSchG)</option>
                <option value="0.6">0.6 — Age ≥ 50 + 15 yrs</option>
                <option value="0.75">0.75 — Age ≥ 55 + 20 yrs</option>
                <option value="1.0">1.0 — Negotiated (1 month/year)</option>
                <option value="1.5">1.5 — Negotiated (generous)</option>
              </select>
            </div>
          </div>

          {canHigher && (
            <div style={{ background: "#ECFDF5", border: "0.5px solid #6EE7B7", borderRadius: "8px", padding: "10px 14px", fontSize: "12px", color: "#065F46" }}>
              ✓ Based on your age and years, you may qualify for the higher <strong>{suggestedMulti}× multiplier</strong> under § 1a KSchG.
            </div>
          )}
        </div>

        {/* Results */}
        {gross > 0 && yrs > 0 && (
          <>
            {/* Summary */}
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Gross Abfindung</div>
                  <div style={{ fontSize: "30px", fontWeight: "700", color: "#374151" }}>{fmt(abfindung)} €</div>
                  <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "2px" }}>{fmt(multiplier)} × {fmt(gross)} × {yrs} yrs</div>
                </div>
                <div style={{ textAlign: "center", borderLeft: "1px solid #C7D2FE", borderRight: "1px solid #C7D2FE" }}>
                  <div style={{ fontSize: "11px", color: "#EF4444", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Tax (Fünftelreg.)</div>
                  <div style={{ fontSize: "30px", fontWeight: "700", color: "#EF4444" }}>−{fmt(taxOnAbfindung)} €</div>
                  <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "2px" }}>eff. rate: {effectiveRate.toFixed(1)}%</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#10B981", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Net Abfindung</div>
                  <div style={{ fontSize: "30px", fontWeight: "700", color: "#4F46E5" }}>{fmt(netAbfindung)} €</div>
                  <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "2px" }}>{(netAbfindung / abfindung * 100).toFixed(1)}% of gross</div>
                </div>
              </div>
            </div>

            {/* Multiplier table */}
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
              <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "600", color: "#374151" }}>
                Abfindung at Different Multipliers (your data)
              </div>
              {[0.5, 0.75, 1.0, 1.5].map((m) => {
                const a = Math.round(m * gross * yrs);
                const { taxOnAbfindung: t } = calcAbfindungTax(annualGross, a);
                return (
                  <div key={m} style={{ padding: "10px 20px", borderBottom: "0.5px solid #F3F4F6", display: "grid", gridTemplateColumns: "100px 1fr 1fr 1fr", gap: "8px", fontSize: "13px", background: parseFloat(multiplier) === m ? "#F5F3FF" : "white" }}>
                    <span style={{ fontWeight: "600", color: "#4F46E5" }}>× {m}</span>
                    <span style={{ color: "#374151" }}>{fmt(a)} € gross</span>
                    <span style={{ color: "#EF4444" }}>−{fmt(t)} € tax</span>
                    <span style={{ color: "#10B981", fontWeight: "600" }}>{fmt(a - t)} € net</span>
                  </div>
                );
              })}
            </div>

            {/* How Fünftelregelung works */}
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px 20px", marginBottom: "16px" }}>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>How Fünftelregelung works</div>
              <div style={{ fontSize: "12px", color: "#6B7280", lineHeight: "1.7" }}>
                Instead of taxing the full severance in one year, the tax authority calculates: <strong>5 × (income tax on annual salary + 1/5 of Abfindung) − income tax on annual salary alone</strong>. This prevents you from jumping to the top tax bracket in a single year.
              </div>
            </div>

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ Approximation only. Actual Abfindung depends on negotiation, company policy and Kündigungsschutzgesetz. Consult an Arbeitsrechtler or Steuerberater for binding figures. Social security contributions (Sozialabgaben) are generally not levied on Abfindung.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
