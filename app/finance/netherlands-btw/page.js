"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const RATES = [
  {
    rate: 21,
    label: "21% — Hoog tarief (Standard)",
    desc: "Most goods and services, electronics, clothing, alcohol",
    examples: ["Electronics", "Clothing", "Alcohol", "Cars", "Services"],
  },
  {
    rate: 9,
    label: "9% — Laag tarief (Reduced)",
    desc: "Food, non-alcoholic drinks, medicines, books, art, hotels",
    examples: ["Groceries", "Medicines", "Books", "Hotels", "Hairdressing"],
  },
  {
    rate: 0,
    label: "0% — Nultarief (Zero-rated)",
    desc: "Exports, international transport, certain financial services",
    examples: ["Export goods", "International shipping", "Newspapers (digital)"],
  },
];

const QUICK = [10, 50, 100, 500, 1000];

export default function NetherlandsBTW() {
  const [amount, setAmount] = useState("100");
  const [selectedRate, setSelectedRate] = useState(21);
  const [mode, setMode] = useState("add");

  const val = parseFloat(amount) || 0;
  const rate = selectedRate / 100;

  const net = mode === "add" ? val : val / (1 + rate);
  const btwAmount = mode === "add" ? val * rate : val - net;
  const gross = mode === "add" ? val + btwAmount : val;

  function fmt(n) {
    return n.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "BTW Calculator Nederland" }]} />
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>BTW Calculator Nederland 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Dutch VAT calculator — bereken BTW bedrag, excl. en incl. BTW prijs.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
            <button onClick={() => setMode("add")} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "0.5px solid #C7D2FE", background: mode === "add" ? "#4F46E5" : "white", color: mode === "add" ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "600" }}>
              Excl. BTW → Incl. BTW (BTW toevoegen)
            </button>
            <button onClick={() => setMode("remove")} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "0.5px solid #C7D2FE", background: mode === "remove" ? "#4F46E5" : "white", color: mode === "remove" ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "600" }}>
              Incl. BTW → Excl. BTW (BTW berekenen)
            </button>
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>
              {mode === "add" ? "Bedrag excl. BTW" : "Bedrag incl. BTW"}
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
              {QUICK.map((q) => (
                <button key={q} onClick={() => setAmount(String(q))} style={{ padding: "5px 12px", borderRadius: "6px", border: "0.5px solid #C7D2FE", background: "white", color: "#374151", fontSize: "12px", cursor: "pointer" }}>
                  €{q.toLocaleString("nl-NL")}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "8px" }}>BTW-tarief</label>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {RATES.map(({ rate, label, desc, examples }) => (
                <button key={rate} onClick={() => setSelectedRate(rate)} style={{ padding: "12px 14px", borderRadius: "8px", border: `0.5px solid ${selectedRate === rate ? "#A5B4FC" : "#C7D2FE"}`, background: selectedRate === rate ? "#EEF2FF" : "white", cursor: "pointer", textAlign: "left" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: "600", color: selectedRate === rate ? "#4F46E5" : "#1E1B4B" }}>{label}</div>
                      <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "2px" }}>{desc}</div>
                      <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginTop: "5px" }}>
                        {examples.map((e) => (
                          <span key={e} style={{ fontSize: "10px", background: selectedRate === rate ? "#C7D2FE" : "#F3F4F6", color: "#374151", padding: "2px 7px", borderRadius: "4px" }}>{e}</span>
                        ))}
                      </div>
                    </div>
                    {selectedRate === rate && <span style={{ color: "#4F46E5", fontSize: "16px", flexShrink: 0 }}>✓</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {val > 0 && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr 1px 1fr" }}>
                {[
                  { label: "Excl. BTW", value: `€${fmt(net)}`, color: "#374151", sub: "Netto bedrag" },
                  null,
                  { label: `BTW (${selectedRate}%)`, value: `€${fmt(btwAmount)}`, color: "#EF4444", sub: "BTW bedrag" },
                  null,
                  { label: "Incl. BTW", value: `€${fmt(gross)}`, color: "#4F46E5", sub: "Bruto bedrag" },
                ].map((item, i) =>
                  item === null ? (
                    <div key={i} style={{ background: "#C7D2FE", width: "1px" }} />
                  ) : (
                    <div key={item.label} style={{ textAlign: "center", padding: "0 8px" }}>
                      <div style={{ fontSize: "11px", color: "#6B7280", fontWeight: "600", marginBottom: "6px", textTransform: "uppercase" }}>{item.label}</div>
                      <div style={{ fontSize: "26px", fontWeight: "700", color: item.color }}>{item.value}</div>
                      <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "2px" }}>{item.sub}</div>
                    </div>
                  )
                )}
              </div>
              {selectedRate > 0 && (
                <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "0.5px solid #C7D2FE", fontSize: "12px", color: "#6B7280", textAlign: "center" }}>
                  {mode === "add"
                    ? `€${fmt(net)} × ${selectedRate}% = €${fmt(btwAmount)} BTW → Incl. BTW: €${fmt(gross)}`
                    : `€${fmt(gross)} ÷ 1,${selectedRate === 9 ? "09" : "21"} = €${fmt(net)} (excl.) → BTW: €${fmt(btwAmount)}`}
                </div>
              )}
            </div>

            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px 20px" }}>
              <div style={{ fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "10px" }}>Snel omrekenen — zelfde bedrag bij alle tarieven</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                {[21, 9, 0].map((r) => {
                  const n = mode === "add" ? val : val / (1 + r / 100);
                  const btw = mode === "add" ? val * (r / 100) : val - n;
                  const g = mode === "add" ? val + btw : val;
                  return (
                    <div key={r} style={{ background: selectedRate === r ? "#EEF2FF" : "#F8F9FF", borderRadius: "8px", padding: "10px", textAlign: "center", border: selectedRate === r ? "0.5px solid #A5B4FC" : "none" }}>
                      <div style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "4px" }}>{r}% BTW</div>
                      <div style={{ fontSize: "13px", fontWeight: "600", color: "#EF4444" }}>BTW: €{fmt(btw)}</div>
                      <div style={{ fontSize: "12px", color: "#4F46E5" }}>Incl.: €{fmt(g)}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
