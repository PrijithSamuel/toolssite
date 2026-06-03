"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const BRACKETS_2024 = [
  { min: 0, max: 11497, rate: 0, label: "0%" },
  { min: 11497, max: 29315, rate: 0.11, label: "11%" },
  { min: 29315, max: 83823, rate: 0.30, label: "30%" },
  { min: 83823, max: 180294, rate: 0.41, label: "41%" },
  { min: 180294, max: Infinity, rate: 0.45, label: "45%" },
];

const PARTS = [
  { value: 1, label: "1 part — Célibataire / Single" },
  { value: 1.5, label: "1.5 parts — Parent isolé / Single parent" },
  { value: 2, label: "2 parts — Couple sans enfant / No children" },
  { value: 2.5, label: "2.5 parts — Couple + 1 enfant" },
  { value: 3, label: "3 parts — Couple + 2 enfants" },
  { value: 3.5, label: "3.5 parts — Couple + 3 enfants" },
  { value: 4, label: "4 parts — Couple + 4 enfants" },
];

function calcTax(income, parts) {
  const quotient = income / parts;
  let taxOnQuotient = 0;
  for (const b of BRACKETS_2024) {
    if (quotient <= b.min) break;
    const taxable = Math.min(quotient, b.max) - b.min;
    taxOnQuotient += taxable * b.rate;
  }
  return Math.max(0, taxOnQuotient * parts);
}

function fmt(n) {
  return Math.round(n).toLocaleString("fr-FR");
}

export default function FrenchTaxCalculator() {
  const [income, setIncome] = useState("50000");
  const [parts, setParts] = useState(1);

  const inc = parseFloat(income) || 0;
  const tax = calcTax(inc, parts);
  const netIncome = inc - tax;
  const effectiveRate = inc > 0 ? (tax / inc) * 100 : 0;
  const quotient = inc / parts;

  const appliedBrackets = BRACKETS_2024.filter((b) => quotient > b.min);

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "French Tax Calculator" }]} />
      <div style={{ maxWidth: "620px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Impôt sur le Revenu 2024</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Estimate your French income tax (Impôt sur le revenu) based on 2024 brackets.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>Revenu annuel brut (€)</label>
            <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} placeholder="50 000" style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "12px 14px", outline: "none", background: "white", fontSize: "18px", boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "8px" }}>Situation familiale (parts fiscales)</label>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              {PARTS.map((p) => (
                <button key={p.value} onClick={() => setParts(p.value)} style={{ padding: "9px 14px", borderRadius: "8px", border: `0.5px solid ${parts === p.value ? "#A5B4FC" : "#C7D2FE"}`, background: parts === p.value ? "#EEF2FF" : "white", textAlign: "left", cursor: "pointer", fontSize: "13px", color: parts === p.value ? "#4F46E5" : "#374151", fontWeight: parts === p.value ? "500" : "400" }}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {inc > 0 && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "500", marginBottom: "4px", textTransform: "uppercase" }}>Impôt estimé</div>
                  <div style={{ fontSize: "28px", fontWeight: "500", color: "#EF4444" }}>{fmt(tax)} €</div>
                </div>
                <div style={{ textAlign: "center", borderLeft: "1px solid #C7D2FE", borderRight: "1px solid #C7D2FE" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "500", marginBottom: "4px", textTransform: "uppercase" }}>Taux effectif</div>
                  <div style={{ fontSize: "28px", fontWeight: "500", color: "#4F46E5" }}>{effectiveRate.toFixed(1)}%</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "500", marginBottom: "4px", textTransform: "uppercase" }}>Net après impôt</div>
                  <div style={{ fontSize: "28px", fontWeight: "500", color: "#10B981" }}>{fmt(netIncome)} €</div>
                </div>
              </div>
            </div>

            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "18px 20px" }}>
              <div style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "12px" }}>
                Barème appliqué — Quotient familial: {fmt(quotient)} €
              </div>
              {appliedBrackets.map((b, i) => {
                const taxable = Math.min(quotient, b.max) - b.min;
                const bracketTax = taxable * b.rate * parts;
                return (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "0.5px solid #F3F4F6", fontSize: "12px" }}>
                    <span style={{ color: "#374151" }}>
                      {b.label} sur {fmt(b.min)}€ → {b.max === Infinity ? "+" : fmt(b.max) + "€"}
                    </span>
                    <span style={{ color: b.rate > 0 ? "#EF4444" : "#9CA3AF", fontWeight: b.rate > 0 ? "500" : "400" }}>
                      {b.rate > 0 ? `− ${fmt(bracketTax)} €` : "0 €"}
                    </span>
                  </div>
                );
              })}
              <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "10px" }}>
                * Estimation basée sur le barème 2024. Ne tient pas compte des déductions, crédits d'impôt, ou cotisations sociales.
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
