"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const RATES = [
  { rate: 23, label: "23% — Standard Rate", desc: "Most goods & services, electronics, clothing" },
  { rate: 13.5, label: "13.5% — Reduced Rate", desc: "Building services, fuel, electricity, vet fees" },
  { rate: 9, label: "9% — Second Reduced", desc: "Tourism, hospitality, newspapers, hairdressing" },
  { rate: 4.8, label: "4.8% — Livestock", desc: "Livestock and greyhounds" },
  { rate: 0, label: "0% — Zero Rated", desc: "Food, medicine, children's clothing, books" },
];

const QUICK_AMOUNTS = [100, 500, 1000, 5000];

export default function IrelandVAT() {
  const [amount, setAmount] = useState("100");
  const [selectedRate, setSelectedRate] = useState(23);
  const [mode, setMode] = useState("add");

  const val = parseFloat(amount) || 0;
  const rate = selectedRate / 100;

  const net = mode === "add" ? val : val / (1 + rate);
  const vatAmount = mode === "add" ? val * rate : val - net;
  const gross = mode === "add" ? val + vatAmount : val;

  function fmt(n) {
    return n.toLocaleString("en-IE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "Irish VAT Calculator" }]} />
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>Irish VAT Calculator 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate Irish VAT — add or remove VAT using all current Revenue Ireland rates.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          {/* Mode toggle */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
            <button onClick={() => setMode("add")} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "0.5px solid #C7D2FE", background: mode === "add" ? "#4F46E5" : "white", color: mode === "add" ? "white" : "#374151", fontSize: "14px", cursor: "pointer", fontWeight: "600" }}>
              Add VAT (Ex VAT → Inc VAT)
            </button>
            <button onClick={() => setMode("remove")} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "0.5px solid #C7D2FE", background: mode === "remove" ? "#4F46E5" : "white", color: mode === "remove" ? "white" : "#374151", fontSize: "14px", cursor: "pointer", fontWeight: "600" }}>
              Remove VAT (Inc VAT → Ex VAT)
            </button>
          </div>

          {/* Amount input */}
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>
              {mode === "add" ? "Net Amount (ex VAT)" : "Gross Amount (inc VAT)"}
            </label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "20px", color: "#6B7280" }}>€</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100"
                style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "13px 14px 13px 38px", outline: "none", background: "white", fontSize: "24px", fontWeight: "600", boxSizing: "border-box" }}
              />
            </div>
            <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
              {QUICK_AMOUNTS.map((q) => (
                <button key={q} onClick={() => setAmount(String(q))} style={{ padding: "5px 12px", borderRadius: "6px", border: "0.5px solid #C7D2FE", background: "white", color: "#374151", fontSize: "12px", cursor: "pointer" }}>
                  €{q.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Rate selection */}
          <div>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "8px" }}>VAT Rate</label>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {RATES.map(({ rate, label, desc }) => (
                <button key={rate} onClick={() => setSelectedRate(rate)} style={{ padding: "10px 14px", borderRadius: "8px", border: `0.5px solid ${selectedRate === rate ? "#A5B4FC" : "#C7D2FE"}`, background: selectedRate === rate ? "#EEF2FF" : "white", cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontSize: "13px", fontWeight: "600", color: selectedRate === rate ? "#4F46E5" : "#1E1B4B" }}>{label}</span>
                    <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "1px" }}>{desc}</div>
                  </div>
                  {selectedRate === rate && <span style={{ fontSize: "16px", color: "#4F46E5" }}>✓</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {val > 0 && (
          <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 0.5px 1fr 0.5px 1fr", gap: "0" }}>
              {[
                { label: "Net (Ex VAT)", value: `€${fmt(net)}`, color: "#374151", sub: "Before VAT" },
                { label: "VAT Amount", value: `€${fmt(vatAmount)}`, color: "#EF4444", sub: `@ ${selectedRate}%` },
                { label: "Gross (Inc VAT)", value: `€${fmt(gross)}`, color: "#4F46E5", sub: "Total to pay" },
              ].map((item, i) => (
                <div key={item.label} style={{ textAlign: "center", padding: "0 12px", borderRight: i < 2 ? "1px solid #C7D2FE" : "none" }}>
                  <div style={{ fontSize: "11px", color: "#6B7280", fontWeight: "600", marginBottom: "6px", textTransform: "uppercase" }}>{item.label}</div>
                  <div style={{ fontSize: "28px", fontWeight: "700", color: item.color }}>{item.value}</div>
                  <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "2px" }}>{item.sub}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "0.5px solid #C7D2FE", fontSize: "12px", color: "#6B7280", textAlign: "center" }}>
              Formula: {mode === "add"
                ? `€${fmt(net)} × ${selectedRate}% = €${fmt(vatAmount)} VAT → Gross €${fmt(gross)}`
                : `€${fmt(gross)} ÷ (1 + ${selectedRate / 100}) = €${fmt(net)} net → VAT €${fmt(vatAmount)}`}
            </div>
          </div>
        )}

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
          VAT rates based on Revenue Ireland 2025. Always verify the correct rate for your specific goods or services with Revenue.ie.
        </div>
      </div>
      <Footer />
    </main>
  );
}
