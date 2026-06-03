"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const VAT_RATES = [
  { rate: 20, label: "20% — Taux normal", desc: "Most goods and services" },
  { rate: 10, label: "10% — Taux intermédiaire", desc: "Restaurants, housing repairs, transport" },
  { rate: 5.5, label: "5.5% — Taux réduit", desc: "Food, books, energy, subscriptions" },
  { rate: 2.1, label: "2.1% — Taux super-réduit", desc: "Medication, press" },
];

function fmt(n) {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function VATCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState(20);
  const [mode, setMode] = useState("add");

  const val = parseFloat(amount) || 0;
  const r = rate / 100;

  let ht, tva, ttc;
  if (mode === "add") {
    ht = val;
    tva = val * r;
    ttc = val + tva;
  } else {
    ttc = val;
    ht = val / (1 + r);
    tva = ttc - ht;
  }

  const inp = { border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "TVA Calculator" }]} />
      <div style={{ maxWidth: "580px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>TVA / VAT Calculator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate French VAT (TVA) — add or remove tax from any amount.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          {/* Mode toggle */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
            <button onClick={() => setMode("add")} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: mode === "add" ? "#4F46E5" : "white", color: mode === "add" ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>
              + Add VAT to HT price
            </button>
            <button onClick={() => setMode("remove")} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: mode === "remove" ? "#4F46E5" : "white", color: mode === "remove" ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>
              − Remove VAT from TTC price
            </button>
          </div>

          {/* Amount input */}
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "5px" }}>
              {mode === "add" ? "Amount HT (excluding VAT) €" : "Amount TTC (including VAT) €"}
            </label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" style={{ ...inp, width: "100%" }} />
          </div>

          {/* VAT rate selection */}
          <div>
            <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "8px" }}>TVA Rate</label>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {VAT_RATES.map(({ rate: r, label, desc }) => (
                <button key={r} onClick={() => setRate(r)} style={{ padding: "10px 14px", borderRadius: "8px", border: `0.5px solid ${rate === r ? "#A5B4FC" : "#C7D2FE"}`, background: rate === r ? "#EEF2FF" : "white", textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontSize: "13px", fontWeight: "600", color: rate === r ? "#4F46E5" : "#374151" }}>{label}</span>
                    <span style={{ fontSize: "11px", color: "#9CA3AF", marginLeft: "8px" }}>{desc}</span>
                  </div>
                  {rate === r && <span style={{ color: "#4F46E5" }}>✓</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {val > 0 && (
          <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "500", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>HT</div>
                <div style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B" }}>{fmt(ht)} €</div>
                <div style={{ fontSize: "11px", color: "#9CA3AF" }}>excl. VAT</div>
              </div>
              <div style={{ textAlign: "center", borderLeft: "1px solid #C7D2FE", borderRight: "1px solid #C7D2FE" }}>
                <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "500", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>TVA ({rate}%)</div>
                <div style={{ fontSize: "28px", fontWeight: "500", color: "#F59E0B" }}>{fmt(tva)} €</div>
                <div style={{ fontSize: "11px", color: "#9CA3AF" }}>tax amount</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "500", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>TTC</div>
                <div style={{ fontSize: "28px", fontWeight: "500", color: "#4F46E5" }}>{fmt(ttc)} €</div>
                <div style={{ fontSize: "11px", color: "#9CA3AF" }}>incl. VAT</div>
              </div>
            </div>
            <div style={{ textAlign: "center", fontSize: "12px", color: "#6B7280" }}>
              {fmt(ht)} € HT + {fmt(tva)} € TVA = <strong style={{ color: "#4F46E5" }}>{fmt(ttc)} € TTC</strong>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
