"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const RATES = [
  { rate: 19, label: "19% — Regelsteuersatz", desc: "Standard rate — most goods and services" },
  { rate: 7, label: "7% — Ermäßigter Steuersatz", desc: "Reduced — food, books, public transport" },
  { rate: 0, label: "0% — Umsatzsteuerfrei", desc: "Exempt — medical, education, insurance" },
];

const QUICK = [10, 50, 100, 500, 1000, 5000];

function fmt(n) {
  return Number(n).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function Mehrwertsteuer() {
  const [mode, setMode] = useState("add"); // add = Netto→Brutto, remove = Brutto→Netto
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState(19);

  const val = parseFloat(amount) || 0;
  const r = rate / 100;

  let netto, mwst, brutto;
  if (mode === "add") {
    netto = val;
    mwst = val * r;
    brutto = val + mwst;
  } else {
    brutto = val;
    netto = val / (1 + r);
    mwst = brutto - netto;
  }

  const formula = mode === "add"
    ? `${fmt(val)} × ${1 + r} = ${fmt(brutto)} (Brutto = Netto × (1 + MwSt.))`
    : `${fmt(val)} ÷ ${1 + r} = ${fmt(netto)} (Netto = Brutto ÷ (1 + MwSt.))`;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "Mehrwertsteuer-Rechner" }]} />
      <div style={{ maxWidth: "580px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>Mehrwertsteuer-Rechner</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>MwSt. berechnen 2025 — German VAT calculator, add or remove VAT instantly.</p>
        </div>

        {/* Mode toggle */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "20px" }}>
          <button onClick={() => setMode("add")} style={{ padding: "14px", borderRadius: "10px", border: `2px solid ${mode === "add" ? "#4F46E5" : "#E0E7FF"}`, background: mode === "add" ? "#4F46E5" : "white", color: mode === "add" ? "white" : "#374151", fontSize: "15px", cursor: "pointer", fontWeight: "600" }}>
            + Netto → Brutto<br /><span style={{ fontSize: "11px", fontWeight: "400", opacity: 0.8 }}>MwSt. hinzufügen</span>
          </button>
          <button onClick={() => setMode("remove")} style={{ padding: "14px", borderRadius: "10px", border: `2px solid ${mode === "remove" ? "#4F46E5" : "#E0E7FF"}`, background: mode === "remove" ? "#4F46E5" : "white", color: mode === "remove" ? "white" : "#374151", fontSize: "15px", cursor: "pointer", fontWeight: "600" }}>
            − Brutto → Netto<br /><span style={{ fontSize: "11px", fontWeight: "400", opacity: 0.8 }}>MwSt. herausrechnen</span>
          </button>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          {/* Amount input */}
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>
              {mode === "add" ? "Netto-Betrag (€)" : "Brutto-Betrag (€)"}
            </label>
            <div style={{ position: "relative" }}>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0,00" style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "12px 44px 12px 14px", outline: "none", background: "white", fontSize: "22px", fontWeight: "500", boxSizing: "border-box" }} />
              <span style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "20px", color: "#6B7280" }}>€</span>
            </div>
            {/* Quick amounts */}
            <div style={{ display: "flex", gap: "6px", marginTop: "8px", flexWrap: "wrap" }}>
              {QUICK.map((q) => (
                <button key={q} onClick={() => setAmount(String(q))} style={{ padding: "5px 12px", borderRadius: "6px", border: "0.5px solid #C7D2FE", background: amount === String(q) ? "#4F46E5" : "white", color: amount === String(q) ? "white" : "#374151", fontSize: "12px", cursor: "pointer", fontWeight: "500" }}>
                  {q.toLocaleString("de-DE")} €
                </button>
              ))}
            </div>
          </div>

          {/* Rate selection */}
          <div>
            <label style={{ fontSize: "13px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "8px" }}>MwSt.-Satz</label>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {RATES.map(({ rate: r, label, desc }) => (
                <button key={r} onClick={() => setRate(r)} style={{ padding: "10px 14px", borderRadius: "8px", border: `0.5px solid ${rate === r ? "#A5B4FC" : "#C7D2FE"}`, background: rate === r ? "#EEF2FF" : "white", textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontSize: "14px", fontWeight: "700", color: rate === r ? "#4F46E5" : "#374151" }}>{label}</span>
                    <span style={{ fontSize: "11px", color: "#9CA3AF", marginLeft: "8px" }}>{desc}</span>
                  </div>
                  {rate === r && <span style={{ color: "#4F46E5", fontWeight: "700" }}>✓</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        {val > 0 && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "12px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "6px", textTransform: "uppercase" }}>Netto</div>
                  <div style={{ fontSize: "28px", fontWeight: "600", color: mode === "remove" ? "#4F46E5" : "#1E1B4B" }}>{fmt(netto)} €</div>
                  <div style={{ fontSize: "11px", color: "#9CA3AF" }}>excl. MwSt.</div>
                </div>
                <div style={{ textAlign: "center", borderLeft: "1px solid #C7D2FE", borderRight: "1px solid #C7D2FE" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "6px", textTransform: "uppercase" }}>MwSt. ({rate}%)</div>
                  <div style={{ fontSize: "28px", fontWeight: "600", color: "#F59E0B" }}>{fmt(mwst)} €</div>
                  <div style={{ fontSize: "11px", color: "#9CA3AF" }}>tax amount</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "6px", textTransform: "uppercase" }}>Brutto</div>
                  <div style={{ fontSize: "28px", fontWeight: "600", color: mode === "add" ? "#4F46E5" : "#1E1B4B" }}>{fmt(brutto)} €</div>
                  <div style={{ fontSize: "11px", color: "#9CA3AF" }}>incl. MwSt.</div>
                </div>
              </div>
            </div>
            {rate > 0 && (
              <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "8px", padding: "10px 14px", fontSize: "12px", color: "#6B7280", fontFamily: "monospace" }}>
                Formel: {formula}
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
