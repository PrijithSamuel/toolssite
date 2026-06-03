"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const PROVINCES = [
  { code: "ON", name: "Ontario", gst: 0, hst: 0.13, pst: 0, label: "13% HST" },
  { code: "BC", name: "British Columbia", gst: 0.05, hst: 0, pst: 0.07, label: "5% GST + 7% PST = 12%" },
  { code: "AB", name: "Alberta", gst: 0.05, hst: 0, pst: 0, label: "5% GST only" },
  { code: "QC", name: "Quebec", gst: 0.05, hst: 0, pst: 0.09975, pstLabel: "QST", label: "5% GST + 9.975% QST = 14.975%" },
  { code: "NS", name: "Nova Scotia", gst: 0, hst: 0.15, pst: 0, label: "15% HST" },
  { code: "NB", name: "New Brunswick", gst: 0, hst: 0.15, pst: 0, label: "15% HST" },
  { code: "PE", name: "Prince Edward Island", gst: 0, hst: 0.15, pst: 0, label: "15% HST" },
  { code: "NL", name: "Newfoundland & Labrador", gst: 0, hst: 0.15, pst: 0, label: "15% HST" },
  { code: "MB", name: "Manitoba", gst: 0.05, hst: 0, pst: 0.07, label: "5% GST + 7% PST = 12%" },
  { code: "SK", name: "Saskatchewan", gst: 0.05, hst: 0, pst: 0.06, label: "5% GST + 6% PST = 11%" },
  { code: "YT", name: "Yukon", gst: 0.05, hst: 0, pst: 0, label: "5% GST only" },
  { code: "NT", name: "Northwest Territories", gst: 0.05, hst: 0, pst: 0, label: "5% GST only" },
  { code: "NU", name: "Nunavut", gst: 0.05, hst: 0, pst: 0, label: "5% GST only" },
];

const QUICK = [10, 50, 100, 500, 1000];

export default function CanadaGSTHST() {
  const [amount, setAmount] = useState("100");
  const [provinceCode, setProvinceCode] = useState("ON");
  const [mode, setMode] = useState("add");

  const val = parseFloat(amount) || 0;
  const prov = PROVINCES.find((p) => p.code === provinceCode);
  const totalRate = prov ? prov.hst || (prov.gst + prov.pst) : 0;

  const net = mode === "add" ? val : val / (1 + totalRate);
  const gross = mode === "add" ? val * (1 + totalRate) : val;

  const gstAmount = prov?.hst ? (mode === "add" ? val * prov.hst : (val - net)) : (mode === "add" ? val * prov.gst : net * prov.gst);
  const pstAmount = prov?.pst ? (mode === "add" ? val * prov.pst : net * prov.pst) : 0;
  const hstAmount = prov?.hst ? gstAmount : 0;
  const totalTax = hstAmount || (gstAmount + pstAmount);

  function fmt(n) { return n.toLocaleString("en-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "GST HST Calculator Canada" }]} />
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>GST HST Calculator Canada 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate GST, HST and PST for all Canadian provinces and territories.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
            <button onClick={() => setMode("add")} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "0.5px solid #C7D2FE", background: mode === "add" ? "#4F46E5" : "white", color: mode === "add" ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "600" }}>
              Add Tax (Pre-tax → Total)
            </button>
            <button onClick={() => setMode("remove")} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "0.5px solid #C7D2FE", background: mode === "remove" ? "#4F46E5" : "white", color: mode === "remove" ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "600" }}>
              Remove Tax (Total → Pre-tax)
            </button>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>
              {mode === "add" ? "Amount before tax ($)" : "Total amount including tax ($)"}
            </label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "20px", color: "#6B7280" }}>$</span>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="100" style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "13px 14px 13px 36px", outline: "none", background: "white", fontSize: "24px", fontWeight: "700", boxSizing: "border-box" }} />
            </div>
            <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
              {QUICK.map((q) => (
                <button key={q} onClick={() => setAmount(String(q))} style={{ padding: "5px 12px", borderRadius: "6px", border: "0.5px solid #C7D2FE", background: "white", color: "#374151", fontSize: "12px", cursor: "pointer" }}>
                  ${q}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "7px" }}>Province / Territory</label>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              {PROVINCES.map((p) => (
                <button key={p.code} onClick={() => setProvinceCode(p.code)} style={{ padding: "9px 14px", borderRadius: "8px", border: `0.5px solid ${provinceCode === p.code ? "#A5B4FC" : "#C7D2FE"}`, background: provinceCode === p.code ? "#EEF2FF" : "white", cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", fontWeight: "600", color: provinceCode === p.code ? "#4F46E5" : "#1E1B4B" }}>{p.name}</span>
                  <span style={{ fontSize: "12px", color: "#9CA3AF" }}>{p.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {val > 0 && prov && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr 1px 1fr" }}>
                {[
                  { label: "Pre-tax amount", value: `$${fmt(net)}`, color: "#374151" },
                  null,
                  { label: `Tax (${(totalRate * 100).toFixed(3).replace(/\.?0+$/, "")}%)`, value: `$${fmt(totalTax)}`, color: "#EF4444" },
                  null,
                  { label: "Total (incl. tax)", value: `$${fmt(gross)}`, color: "#4F46E5" },
                ].map((item, i) =>
                  item === null ? <div key={i} style={{ background: "#C7D2FE" }} /> : (
                    <div key={item.label} style={{ textAlign: "center", padding: "0 8px" }}>
                      <div style={{ fontSize: "11px", color: "#6B7280", fontWeight: "600", marginBottom: "6px", textTransform: "uppercase" }}>{item.label}</div>
                      <div style={{ fontSize: "24px", fontWeight: "700", color: item.color }}>{item.value}</div>
                    </div>
                  )
                )}
              </div>

              {prov.gst > 0 && prov.pst > 0 && (
                <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "0.5px solid #C7D2FE", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div style={{ background: "white", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
                    <div style={{ fontSize: "11px", color: "#9CA3AF" }}>GST (5%)</div>
                    <div style={{ fontSize: "18px", fontWeight: "700", color: "#EF4444" }}>${fmt(mode === "add" ? val * prov.gst : net * prov.gst)}</div>
                  </div>
                  <div style={{ background: "white", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
                    <div style={{ fontSize: "11px", color: "#9CA3AF" }}>{prov.pstLabel || "PST"} ({(prov.pst * 100).toFixed(3).replace(/\.?0+$/, "")}%)</div>
                    <div style={{ fontSize: "18px", fontWeight: "700", color: "#F97316" }}>${fmt(pstAmount)}</div>
                  </div>
                </div>
              )}
            </div>

            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px 20px" }}>
              <div style={{ fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "10px" }}>Quick comparison — same amount, all rates</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                {[{ label: "5% GST only", rate: 0.05 }, { label: "13% HST (ON)", rate: 0.13 }, { label: "15% HST (NS/NB)", rate: 0.15 }].map((r) => {
                  const t = mode === "add" ? val * r.rate : val - val / (1 + r.rate);
                  const g = mode === "add" ? val + t : val;
                  return (
                    <div key={r.label} style={{ background: "#F8F9FF", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
                      <div style={{ fontSize: "10px", color: "#9CA3AF" }}>{r.label}</div>
                      <div style={{ fontSize: "13px", fontWeight: "600", color: "#EF4444" }}>Tax: ${fmt(t)}</div>
                      <div style={{ fontSize: "12px", color: "#4F46E5" }}>Total: ${fmt(g)}</div>
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
