"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const QUICK = [1000, 5000, 10000, 50000, 100000];
const VAT_RATE = 0.18;
const SSCL_RATE = 0.025;

export default function SriLankaVAT() {
  const [amount, setAmount] = useState("10000");
  const [mode, setMode] = useState("add");
  const [includeSscl, setIncludeSscl] = useState(false);

  const val = parseFloat(amount) || 0;

  const net = mode === "add" ? val : val / (1 + VAT_RATE);
  const vatAmount = mode === "add" ? val * VAT_RATE : val - net;
  const gross = mode === "add" ? val + vatAmount : val;

  const ssclBase = mode === "add" ? val : net;
  const ssclAmount = includeSscl ? ssclBase * SSCL_RATE : 0;
  const totalWithSscl = gross + ssclAmount;

  function fmt(n) {
    return n.toLocaleString("en-LK", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  function fmtInt(n) {
    return Math.round(n).toLocaleString("en-LK");
  }

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "VAT Calculator Sri Lanka" }]} />
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>VAT Calculator Sri Lanka 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate VAT at 18% (increased from 15% in 2024) — add or remove VAT in LKR.</p>
        </div>

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", marginBottom: "16px", fontSize: "12px", color: "#374151" }}>
          <strong>2025 Sri Lanka VAT:</strong> Standard rate is <strong>18%</strong> (increased from 15% in January 2024). Exports and essential food items are zero-rated.
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
            <button onClick={() => setMode("add")} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "0.5px solid #C7D2FE", background: mode === "add" ? "#4F46E5" : "white", color: mode === "add" ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "600" }}>
              Add VAT (Excl. → Incl.)
            </button>
            <button onClick={() => setMode("remove")} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "0.5px solid #C7D2FE", background: mode === "remove" ? "#4F46E5" : "white", color: mode === "remove" ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "600" }}>
              Remove VAT (Incl. → Excl.)
            </button>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>
              {mode === "add" ? "Amount excluding VAT (Rs.)" : "Amount including VAT (Rs.)"}
            </label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "14px", color: "#6B7280", fontWeight: "600" }}>Rs.</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="10000"
                style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "13px 12px 13px 48px", outline: "none", background: "white", fontSize: "26px", fontWeight: "700", boxSizing: "border-box" }}
              />
            </div>
            <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
              {QUICK.map((q) => (
                <button key={q} onClick={() => setAmount(String(q))} style={{ padding: "5px 10px", borderRadius: "6px", border: "0.5px solid #C7D2FE", background: "white", color: "#374151", fontSize: "11px", cursor: "pointer" }}>
                  Rs.{fmtInt(q)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Also calculate SSCL (Social Security Contribution Levy 2.5%)?</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => setIncludeSscl(true)} style={{ flex: 1, padding: "8px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: includeSscl ? "#4F46E5" : "white", color: includeSscl ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>Yes</button>
              <button onClick={() => setIncludeSscl(false)} style={{ flex: 1, padding: "8px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: !includeSscl ? "#4F46E5" : "white", color: !includeSscl ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>No — VAT only</button>
            </div>
          </div>
        </div>

        {val > 0 && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr 1px 1fr", gap: "0" }}>
                {[
                  { label: "Excl. VAT", value: `Rs.${fmt(net)}`, color: "#374151", sub: "Before VAT" },
                  null,
                  { label: "VAT (18%)", value: `Rs.${fmt(vatAmount)}`, color: "#EF4444", sub: "VAT amount" },
                  null,
                  { label: "Incl. VAT", value: `Rs.${fmt(gross)}`, color: "#4F46E5", sub: "Total payable" },
                ].map((item, i) =>
                  item === null ? (
                    <div key={i} style={{ background: "#C7D2FE", width: "1px" }} />
                  ) : (
                    <div key={item.label} style={{ textAlign: "center", padding: "0 8px" }}>
                      <div style={{ fontSize: "11px", color: "#6B7280", fontWeight: "600", marginBottom: "6px", textTransform: "uppercase" }}>{item.label}</div>
                      <div style={{ fontSize: "22px", fontWeight: "700", color: item.color }}>{item.value}</div>
                      <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "2px" }}>{item.sub}</div>
                    </div>
                  )
                )}
              </div>

              {includeSscl && (
                <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "0.5px solid #C7D2FE" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <div style={{ background: "white", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
                      <div style={{ fontSize: "11px", color: "#9CA3AF" }}>SSCL (2.5%)</div>
                      <div style={{ fontSize: "20px", fontWeight: "700", color: "#F97316" }}>Rs.{fmt(ssclAmount)}</div>
                    </div>
                    <div style={{ background: "white", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
                      <div style={{ fontSize: "11px", color: "#9CA3AF" }}>Total (VAT + SSCL)</div>
                      <div style={{ fontSize: "20px", fontWeight: "700", color: "#4F46E5" }}>Rs.{fmt(totalWithSscl)}</div>
                    </div>
                  </div>
                </div>
              )}

              <div style={{ marginTop: "14px", fontSize: "12px", color: "#6B7280", textAlign: "center", paddingTop: "12px", borderTop: "0.5px solid #C7D2FE" }}>
                {mode === "add"
                  ? `Rs.${fmt(net)} × 18% = Rs.${fmt(vatAmount)} VAT → Total: Rs.${fmt(gross)}`
                  : `Rs.${fmt(gross)} ÷ 1.18 = Rs.${fmt(net)} (excl.) → VAT: Rs.${fmt(vatAmount)}`}
              </div>
            </div>

            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px 20px", marginBottom: "16px" }}>
              <div style={{ fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "10px" }}>VAT Quick Reference</div>
              {[
                { label: "Standard rate", rate: "18%", desc: "Most goods and services" },
                { label: "Zero-rated (0%)", rate: "0%", desc: "Exports, essential food items, healthcare" },
                { label: "SSCL", rate: "2.5%", desc: "Social Security Contribution Levy — on most supplies" },
                { label: "VAT registration threshold", rate: "Rs.80M+", desc: "Annual turnover above Rs.80 million" },
              ].map((r) => (
                <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "0.5px solid #F3F4F6", fontSize: "12px" }}>
                  <div>
                    <span style={{ color: "#374151", fontWeight: "500" }}>{r.label}</span>
                    <span style={{ color: "#9CA3AF", marginLeft: "8px" }}>{r.desc}</span>
                  </div>
                  <span style={{ color: "#4F46E5", fontWeight: "700" }}>{r.rate}</span>
                </div>
              ))}
            </div>

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ VAT at 18% effective from January 2024 per the Value Added Tax (Amendment) Act. SSCL at 2.5% applies on most supplies. Verify applicability with a tax consultant or Inland Revenue Department (IRD).
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
