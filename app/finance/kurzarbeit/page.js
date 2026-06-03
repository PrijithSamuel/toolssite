"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Simplified net salary calculation
function calcNet(annualGross) {
  function est(zvE) {
    if (zvE <= 11604) return 0;
    if (zvE <= 17005) { const y = (zvE - 11604) / 10000; return (974.07 * y + 1400) * y; }
    if (zvE <= 66760) { const z = (zvE - 17005) / 10000; return (206.43 * z + 2397) * z + 938.24; }
    if (zvE <= 277825) return 0.42 * zvE - 10602.13;
    return 0.45 * zvE - 18936.88;
  }
  const lst = Math.round(est(Math.max(0, annualGross - 1266)));
  const soli = lst > 18130 ? Math.round(lst * 0.055) : 0;
  const rv = Math.round(Math.min(annualGross, 90600) * 0.093);
  const av = Math.round(Math.min(annualGross, 90600) * 0.013);
  const kv = Math.round(Math.min(annualGross, 62100) * 0.0815);
  const pv = Math.round(Math.min(annualGross, 62100) * 0.017);
  return Math.max(0, annualGross - lst - soli - rv - av - kv - pv);
}

function fmt(n) { return Math.round(n).toLocaleString("de-DE"); }

export default function Kurzarbeit() {
  const [grossM, setGrossM] = useState("3500");
  const [reduction, setReduction] = useState("50");
  const [hasChildren, setHasChildren] = useState(false);

  const gross = parseFloat(grossM) || 0;
  const red = Math.min(100, Math.max(0, parseFloat(reduction) || 0)) / 100;

  const normalNet = calcNet(gross * 12) / 12;
  const reducedGross = gross * (1 - red);
  const reducedNet = calcNet(reducedGross * 12) / 12;
  const netDiff = normalNet - reducedNet;
  const kugRate = hasChildren ? 0.67 : 0.60;
  const kug = netDiff * kugRate;
  const totalIncome = reducedNet + kug;
  const incomeLoss = normalNet - totalIncome;

  const inp = { border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "15px", width: "100%", boxSizing: "border-box" };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "Kurzarbeitergeld-Rechner" }]} />
      <div style={{ maxWidth: "620px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>Kurzarbeitergeld-Rechner</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate your Kurzarbeitergeld (short-time work allowance) and compare with normal income.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Bruttogehalt (Monthly Gross) €</label>
            <input type="number" value={grossM} onChange={(e) => setGrossM(e.target.value)} placeholder="3500" style={inp} />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#374151" }}>Arbeitsausfallzeit (Hour reduction)</label>
              <span style={{ fontSize: "14px", fontWeight: "700", color: "#4F46E5" }}>{reduction}%</span>
            </div>
            <input type="range" min="0" max="100" step="5" value={reduction} onChange={(e) => setReduction(e.target.value)} style={{ width: "100%", accentColor: "#4F46E5" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#9CA3AF" }}>
              <span>0% (no reduction)</span>
              <span>50% (typical)</span>
              <span>100% (zero hours)</span>
            </div>
          </div>

          <div>
            <label style={{ fontSize: "13px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "8px" }}>Children (Kinder)?</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => setHasChildren(true)} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: hasChildren ? "#4F46E5" : "white", color: hasChildren ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>Ja — 67% KUG rate</button>
              <button onClick={() => setHasChildren(false)} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: !hasChildren ? "#4F46E5" : "white", color: !hasChildren ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>Nein — 60% KUG rate</button>
            </div>
          </div>
        </div>

        {gross > 0 && red > 0 && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
              <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "18px" }}>
                <div style={{ fontSize: "12px", color: "#6B7280", fontWeight: "600", marginBottom: "10px", textTransform: "uppercase" }}>Normal (Full Hours)</div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "6px" }}>
                  <span style={{ color: "#6B7280" }}>Bruttogehalt</span>
                  <span style={{ fontWeight: "500" }}>{fmt(gross)} €</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", paddingTop: "6px", borderTop: "0.5px solid #E0E7FF" }}>
                  <span style={{ fontWeight: "600", color: "#4F46E5" }}>Nettolohn</span>
                  <span style={{ fontWeight: "700", color: "#4F46E5" }}>{fmt(normalNet)} €</span>
                </div>
              </div>
              <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "18px" }}>
                <div style={{ fontSize: "12px", color: "#6366F1", fontWeight: "600", marginBottom: "10px", textTransform: "uppercase" }}>During Kurzarbeit ({reduction}% reduction)</div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "4px" }}>
                  <span style={{ color: "#6B7280" }}>Netto ({100 - parseFloat(reduction)}% Stunden)</span>
                  <span style={{ fontWeight: "500" }}>{fmt(reducedNet)} €</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "6px" }}>
                  <span style={{ color: "#6B7280" }}>Kurzarbeitergeld ({(kugRate * 100).toFixed(0)}%)</span>
                  <span style={{ fontWeight: "500", color: "#10B981" }}>+{fmt(kug)} €</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", fontWeight: "700", color: "#4F46E5", paddingTop: "6px", borderTop: "0.5px solid #C7D2FE" }}>
                  <span>Gesamt</span>
                  <span>{fmt(totalIncome)} €</span>
                </div>
              </div>
            </div>

            <div style={{ background: incomeLoss > 0 ? "#FFF5F5" : "#ECFDF5", border: `0.5px solid ${incomeLoss > 0 ? "#FCA5A5" : "#6EE7B7"}`, borderRadius: "12px", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "13px", color: "#374151" }}>Einkommensverlust (Income loss vs normal)</span>
              <span style={{ fontSize: "20px", fontWeight: "700", color: incomeLoss > 0 ? "#EF4444" : "#10B981" }}>
                {incomeLoss > 0 ? "−" : "+"}{fmt(Math.abs(incomeLoss))} €/mo
              </span>
            </div>
          </>
        )}

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", marginTop: "14px", fontSize: "11px", color: "#6B7280" }}>
          ⚠️ Approximate values based on 2024 German tax law (Steuerklasse 1). Actual Kurzarbeitergeld amount is determined by the Bundesagentur für Arbeit. Consult your employer's HR department for exact figures.
        </div>
      </div>
      <Footer />
    </main>
  );
}
