"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const GST_RATE = 0.09;
const QUICK = [10, 50, 100, 500, 1000, 5000];

export default function SingaporeGST() {
  const [amount, setAmount] = useState("100");
  const [mode, setMode] = useState("add");

  const val = parseFloat(amount) || 0;
  const net = mode === "add" ? val : val / (1 + GST_RATE);
  const gstAmount = mode === "add" ? val * GST_RATE : val - net;
  const gross = mode === "add" ? val + gstAmount : val;

  function fmt(n) { return n.toLocaleString("en-SG", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function fmtInt(n) { return Math.round(n).toLocaleString("en-SG"); }

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "GST Calculator Singapore" }]} />
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>GST Calculator Singapore 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Singapore GST at 9% — add or remove GST instantly. Rate increased from 8% in January 2024.</p>
        </div>

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", marginBottom: "16px", fontSize: "12px", color: "#374151" }}>
          🇸🇬 <strong>Singapore GST is 9%</strong> (increased from 8% on 1 Jan 2024, from 7% on 1 Jan 2023). GST-registered businesses must charge GST if annual turnover exceeds S$1 million.
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
            <button onClick={() => setMode("add")} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "0.5px solid #C7D2FE", background: mode === "add" ? "#4F46E5" : "white", color: mode === "add" ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "600" }}>
              Add GST (Before → After GST)
            </button>
            <button onClick={() => setMode("remove")} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "0.5px solid #C7D2FE", background: mode === "remove" ? "#4F46E5" : "white", color: mode === "remove" ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "600" }}>
              Remove GST (After → Before GST)
            </button>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>
              {mode === "add" ? "Amount before GST (S$)" : "Amount including GST (S$)"}
            </label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "16px", color: "#6B7280", fontWeight: "600" }}>S$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100"
                style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "14px 14px 14px 44px", outline: "none", background: "white", fontSize: "28px", fontWeight: "700", boxSizing: "border-box" }}
              />
            </div>
            <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
              {QUICK.map((q) => (
                <button key={q} onClick={() => setAmount(String(q))} style={{ padding: "5px 10px", borderRadius: "6px", border: "0.5px solid #C7D2FE", background: "white", color: "#374151", fontSize: "11px", cursor: "pointer" }}>
                  S${fmtInt(q)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {val > 0 && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "28px 24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr 1px 1fr" }}>
                {[
                  { label: "Before GST", value: `S$${fmt(net)}`, color: "#374151", sub: "Excl. GST" },
                  null,
                  { label: "GST (9%)", value: `S$${fmt(gstAmount)}`, color: "#EF4444", sub: "Tax amount" },
                  null,
                  { label: "After GST", value: `S$${fmt(gross)}`, color: "#4F46E5", sub: "Total payable" },
                ].map((item, i) =>
                  item === null ? <div key={i} style={{ background: "#C7D2FE" }} /> : (
                    <div key={item.label} style={{ textAlign: "center", padding: "0 10px" }}>
                      <div style={{ fontSize: "11px", color: "#6B7280", fontWeight: "600", marginBottom: "8px", textTransform: "uppercase" }}>{item.label}</div>
                      <div style={{ fontSize: "28px", fontWeight: "700", color: item.color }}>{item.value}</div>
                      <div style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "4px" }}>{item.sub}</div>
                    </div>
                  )
                )}
              </div>
              <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "0.5px solid #C7D2FE", fontSize: "12px", color: "#6B7280", textAlign: "center" }}>
                {mode === "add"
                  ? `S$${fmt(net)} × 9% = S$${fmt(gstAmount)} GST → Total: S$${fmt(gross)}`
                  : `S$${fmt(gross)} ÷ 1.09 = S$${fmt(net)} (before GST) → GST: S$${fmt(gstAmount)}`}
              </div>
            </div>

            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px 20px", marginBottom: "16px" }}>
              <div style={{ fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "10px" }}>Quick reference — same S${fmtInt(val)} at historic GST rates</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                {[{ rate: 7, label: "7% (pre-2023)" }, { rate: 8, label: "8% (2023)" }, { rate: 9, label: "9% (2024–)" }].map((r) => {
                  const n = mode === "add" ? val : val / (1 + r.rate / 100);
                  const t = mode === "add" ? val * r.rate / 100 : val - n;
                  const g = mode === "add" ? val + t : val;
                  return (
                    <div key={r.rate} style={{ background: r.rate === 9 ? "#EEF2FF" : "#F8F9FF", borderRadius: "8px", padding: "12px", textAlign: "center", border: r.rate === 9 ? "0.5px solid #A5B4FC" : "none" }}>
                      <div style={{ fontSize: "11px", color: "#9CA3AF" }}>{r.label}</div>
                      <div style={{ fontSize: "14px", fontWeight: "700", color: "#EF4444" }}>GST: S${fmt(t)}</div>
                      <div style={{ fontSize: "12px", color: "#4F46E5" }}>Total: S${fmt(g)}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              💡 <strong>Tourist GST Refund:</strong> Overseas visitors can claim GST refund on purchases S$100 and above (per receipt) at participating retailers via the Electronic Tourist Refund Scheme (eTRS) at Changi Airport.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
