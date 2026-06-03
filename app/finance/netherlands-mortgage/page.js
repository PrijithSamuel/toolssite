"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n) { return Math.round(n).toLocaleString("nl-NL"); }
function fmtDec(n, d = 2) { return n.toLocaleString("nl-NL", { minimumFractionDigits: d, maximumFractionDigits: d }); }

function calcMonthly(principal, annualRate, years) {
  if (annualRate === 0) return principal / (years * 12);
  const r = annualRate / 100 / 12;
  const n = years * 12;
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

const NHG_LIMIT = 435000;
const HYPOTHEEKRENTEAFTREK_RATE = 0.3697;

export default function NetherlandsMortgage() {
  const [price, setPrice] = useState("350000");
  const [deposit, setDeposit] = useState("35000");
  const [rate, setRate] = useState("4.0");
  const [term, setTerm] = useState("30");
  const [buyerType, setBuyerType] = useState("owner");

  const priceVal = parseFloat(price) || 0;
  const depositVal = parseFloat(deposit) || 0;
  const rateVal = parseFloat(rate) || 0;
  const termVal = parseInt(term) || 30;

  const mortgageAmount = Math.max(0, priceVal - depositVal);
  const depositPct = priceVal > 0 ? (depositVal / priceVal) * 100 : 0;
  const ltvPct = priceVal > 0 ? (mortgageAmount / priceVal) * 100 : 0;

  const overdrachtsbelasting = priceVal * (buyerType === "owner" ? 0.02 : 0.104);
  const nhgEligible = mortgageAmount <= NHG_LIMIT && buyerType === "owner";

  const monthlyPayment = mortgageAmount > 0 ? calcMonthly(mortgageAmount, rateVal, termVal) : 0;
  const totalRepaid = monthlyPayment * termVal * 12;
  const totalInterest = totalRepaid - mortgageAmount;

  const monthlyInterest = mortgageAmount * (rateVal / 100) / 12;
  const monthlyTaxRelief = monthlyInterest * HYPOTHEEKRENTEAFTREK_RATE;
  const monthlyAfterRelief = monthlyPayment - monthlyTaxRelief;

  const totalCost = priceVal + overdrachtsbelasting;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "Hypotheek Calculator" }]} />
      <div style={{ maxWidth: "740px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>Hypotheek Calculator Nederland 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Bereken je maandlast, hypotheekrenteaftrek en overdrachtsbelasting.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ marginBottom: "14px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Koper type</label>
            <div style={{ display: "flex", gap: "8px" }}>
              {[
                { val: "owner", label: "Eigenaar-bewoner (2% overdracht)" },
                { val: "investor", label: "Belegger / verhuur (10,4% overdracht)" },
              ].map(({ val, label }) => (
                <button key={val} onClick={() => setBuyerType(val)} style={{ flex: 1, padding: "9px 10px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: buyerType === val ? "#4F46E5" : "white", color: buyerType === val ? "white" : "#374151", fontSize: "12px", cursor: "pointer", fontWeight: "500" }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Koopsom (€)</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "15px", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>
                Eigen inbreng (€) {priceVal > 0 && <span style={{ color: "#6366F1", fontWeight: "400" }}>— {fmtDec(depositPct, 1)}%</span>}
              </label>
              <input type="number" value={deposit} onChange={(e) => setDeposit(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "15px", boxSizing: "border-box" }} />
              {priceVal > 0 && <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "3px" }}>Hypotheekbedrag: €{fmt(mortgageAmount)}</div>}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Rente (%)</label>
              <input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "15px", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Looptijd (jaren)</label>
              <select value={term} onChange={(e) => setTerm(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "14px", cursor: "pointer" }}>
                {[10, 15, 20, 25, 30].map((y) => <option key={y} value={y}>{y} jaar</option>)}
              </select>
            </div>
          </div>
        </div>

        {mortgageAmount > 0 && (
          <>
            {/* NHG badge */}
            {nhgEligible && (
              <div style={{ background: "#ECFDF5", border: "0.5px solid #6EE7B7", borderRadius: "10px", padding: "12px 16px", marginBottom: "16px", display: "flex", gap: "10px", alignItems: "center" }}>
                <span style={{ fontSize: "20px" }}>🛡️</span>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: "700", color: "#065F46" }}>NHG eligible — Nationale Hypotheek Garantie</div>
                  <div style={{ fontSize: "12px", color: "#065F46" }}>Mortgage ≤ €{fmt(NHG_LIMIT)} — you may qualify for NHG guarantee and a lower interest rate.</div>
                </div>
              </div>
            )}

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "16px" }}>
                <div>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Bruto maandlast</div>
                  <div style={{ fontSize: "40px", fontWeight: "700", color: "#374151" }}>€{fmt(monthlyPayment)}</div>
                  <div style={{ fontSize: "12px", color: "#9CA3AF" }}>before tax deduction</div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "#4F46E5", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Netto maandlast (na aftrek)</div>
                  <div style={{ fontSize: "40px", fontWeight: "700", color: "#4F46E5" }}>€{fmt(monthlyAfterRelief)}</div>
                  <div style={{ fontSize: "12px", color: "#9CA3AF" }}>after hypotheekrenteaftrek (36,97%)</div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                {[
                  { label: "LTV", val: `${fmtDec(ltvPct, 1)}%` },
                  { label: "Maandelijkse renteaftrek", val: `€${fmt(monthlyTaxRelief)}` },
                  { label: "Overdrachtsbelasting", val: `€${fmt(overdrachtsbelasting)}` },
                ].map((i) => (
                  <div key={i.label} style={{ background: "white", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
                    <div style={{ fontSize: "11px", color: "#9CA3AF" }}>{i.label}</div>
                    <div style={{ fontSize: "17px", fontWeight: "700", color: "#374151" }}>{i.val}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
              {[
                { label: "Hypotheekbedrag", val: `€${fmt(mortgageAmount)}` },
                { label: `Totaal terugbetaald (${termVal} jaar)`, val: `€${fmt(totalRepaid)}` },
                { label: "Totale rente betaald", val: `€${fmt(totalInterest)}`, color: "#EF4444" },
                { label: `Overdrachtsbelasting (${buyerType === "owner" ? "2%" : "10,4%"})`, val: `€${fmt(overdrachtsbelasting)}`, color: "#F97316" },
                { label: "Totale aankoopkosten", val: `€${fmt(totalCost)}`, bold: true, color: "#4F46E5" },
              ].map((r) => (
                <div key={r.label} style={{ padding: "11px 20px", borderBottom: "0.5px solid #F3F4F6", display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "#374151" }}>{r.label}</span>
                  <span style={{ fontWeight: r.bold ? "700" : "500", color: r.color || "#1E1B4B" }}>{r.val}</span>
                </div>
              ))}
            </div>

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ Indicatief. Hypotheekrenteaftrek is beperkt tot het tarief van de eerste schijf (36,97% in 2025). Consult een onafhankelijk hypotheekadviseur voor een persoonlijk advies.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
