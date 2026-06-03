"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const GST_RATES = [
  { rate: 0, label: "0% — Exempt", examples: ["Fresh food", "Education", "Healthcare"] },
  { rate: 5, label: "5% — Essential", examples: ["Packaged food", "Medicines", "Economy travel"] },
  { rate: 12, label: "12% — Standard", examples: ["Clothing", "Mobile phones", "Processed food"] },
  { rate: 18, label: "18% — Standard", examples: ["Electronics", "AC", "Financial services", "Restaurants"] },
  { rate: 28, label: "28% — Luxury", examples: ["Cars", "Luxury items", "Tobacco", "Pan masala"] },
];

const QUICK = [100, 500, 1000, 5000, 10000];

function fmt(n) { return Math.round(n).toLocaleString("en-IN"); }
function fmtDec(n) { return n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

export default function IndiaGST() {
  const [amount, setAmount] = useState("1000");
  const [gstRate, setGstRate] = useState(18);
  const [mode, setMode] = useState("add");
  const [txType, setTxType] = useState("intra");

  const val = parseFloat(amount) || 0;
  const rate = gstRate / 100;
  const net = mode === "add" ? val : val / (1 + rate);
  const gstAmount = mode === "add" ? val * rate : val - net;
  const gross = mode === "add" ? val + gstAmount : val;
  const halfGst = gstAmount / 2;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "GST Calculator India" }]} />
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>GST Calculator India 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate CGST + SGST (intra-state) or IGST (inter-state) — add or remove GST instantly.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "18px" }}>
            <button onClick={() => setMode("add")} style={{ flex: 1, padding: "11px", borderRadius: "10px", border: "0.5px solid #C7D2FE", background: mode === "add" ? "#4F46E5" : "white", color: mode === "add" ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "600" }}>
              Add GST (Excl. → Incl.)
            </button>
            <button onClick={() => setMode("remove")} style={{ flex: 1, padding: "11px", borderRadius: "10px", border: "0.5px solid #C7D2FE", background: mode === "remove" ? "#4F46E5" : "white", color: mode === "remove" ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "600" }}>
              Remove GST (Incl. → Excl.)
            </button>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>
              {mode === "add" ? "Amount (excl. GST) ₹" : "Amount (incl. GST) ₹"}
            </label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "18px", color: "#6B7280" }}>₹</span>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="1000" style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "13px 14px 13px 36px", outline: "none", background: "white", fontSize: "24px", fontWeight: "700", boxSizing: "border-box" }} />
            </div>
            <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
              {QUICK.map((q) => (
                <button key={q} onClick={() => setAmount(String(q))} style={{ padding: "5px 10px", borderRadius: "6px", border: "0.5px solid #C7D2FE", background: "white", color: "#374151", fontSize: "12px", cursor: "pointer" }}>
                  ₹{fmt(q)}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "8px" }}>GST Rate</label>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              {GST_RATES.map(({ rate, label, examples }) => (
                <button key={rate} onClick={() => setGstRate(rate)} style={{ padding: "10px 14px", borderRadius: "8px", border: `0.5px solid ${gstRate === rate ? "#A5B4FC" : "#C7D2FE"}`, background: gstRate === rate ? "#EEF2FF" : "white", cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontSize: "13px", fontWeight: "600", color: gstRate === rate ? "#4F46E5" : "#1E1B4B" }}>{label}</span>
                    <div style={{ display: "flex", gap: "4px", marginTop: "3px", flexWrap: "wrap" }}>
                      {examples.map((e) => <span key={e} style={{ fontSize: "10px", background: gstRate === rate ? "#C7D2FE" : "#F3F4F6", color: "#374151", padding: "1px 6px", borderRadius: "4px" }}>{e}</span>)}
                    </div>
                  </div>
                  {gstRate === rate && <span style={{ color: "#4F46E5" }}>✓</span>}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Transaction Type</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => setTxType("intra")} style={{ flex: 1, padding: "9px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: txType === "intra" ? "#4F46E5" : "white", color: txType === "intra" ? "white" : "#374151", fontSize: "12px", cursor: "pointer", fontWeight: "500" }}>
                Intra-state (CGST + SGST)
              </button>
              <button onClick={() => setTxType("inter")} style={{ flex: 1, padding: "9px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: txType === "inter" ? "#4F46E5" : "white", color: txType === "inter" ? "white" : "#374151", fontSize: "12px", cursor: "pointer", fontWeight: "500" }}>
                Inter-state (IGST)
              </button>
            </div>
          </div>
        </div>

        {val > 0 && gstRate > 0 && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr 1px 1fr" }}>
                {[
                  { label: "Base Amount", value: `₹${fmtDec(net)}`, color: "#374151", sub: "Excl. GST" },
                  null,
                  { label: `GST (${gstRate}%)`, value: `₹${fmtDec(gstAmount)}`, color: "#EF4444", sub: "Tax amount" },
                  null,
                  { label: "Total Amount", value: `₹${fmtDec(gross)}`, color: "#4F46E5", sub: "Incl. GST" },
                ].map((item, i) =>
                  item === null ? <div key={i} style={{ background: "#C7D2FE" }} /> : (
                    <div key={item.label} style={{ textAlign: "center", padding: "0 8px" }}>
                      <div style={{ fontSize: "11px", color: "#6B7280", fontWeight: "600", marginBottom: "6px" }}>{item.label}</div>
                      <div style={{ fontSize: "22px", fontWeight: "700", color: item.color }}>{item.value}</div>
                      <div style={{ fontSize: "11px", color: "#9CA3AF" }}>{item.sub}</div>
                    </div>
                  )
                )}
              </div>

              {gstRate > 0 && (
                <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "0.5px solid #C7D2FE" }}>
                  {txType === "intra" ? (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      {[
                        { label: `CGST @ ${gstRate / 2}%`, val: halfGst, note: "Central GST" },
                        { label: `SGST @ ${gstRate / 2}%`, val: halfGst, note: "State GST" },
                      ].map((r) => (
                        <div key={r.label} style={{ background: "white", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
                          <div style={{ fontSize: "11px", color: "#9CA3AF" }}>{r.label}</div>
                          <div style={{ fontSize: "20px", fontWeight: "700", color: "#EF4444" }}>₹{fmtDec(r.val)}</div>
                          <div style={{ fontSize: "10px", color: "#9CA3AF" }}>{r.note}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ background: "white", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
                      <div style={{ fontSize: "11px", color: "#9CA3AF" }}>IGST @ {gstRate}% (Integrated GST — inter-state)</div>
                      <div style={{ fontSize: "24px", fontWeight: "700", color: "#EF4444" }}>₹{fmtDec(gstAmount)}</div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "14px 20px" }}>
              <div style={{ fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "10px" }}>Quick reference — same ₹{fmt(val)} at all rates</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "6px" }}>
                {[0, 5, 12, 18, 28].map((r) => {
                  const t = mode === "add" ? val * (r / 100) : val - val / (1 + r / 100);
                  const g = mode === "add" ? val + t : val;
                  return (
                    <div key={r} onClick={() => setGstRate(r)} style={{ background: gstRate === r ? "#EEF2FF" : "#F8F9FF", borderRadius: "8px", padding: "8px 6px", textAlign: "center", cursor: "pointer", border: gstRate === r ? "0.5px solid #A5B4FC" : "none" }}>
                      <div style={{ fontSize: "11px", color: "#9CA3AF" }}>{r}%</div>
                      <div style={{ fontSize: "12px", fontWeight: "600", color: "#EF4444" }}>₹{fmt(t)}</div>
                      <div style={{ fontSize: "11px", color: "#4F46E5" }}>₹{fmt(g)}</div>
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
