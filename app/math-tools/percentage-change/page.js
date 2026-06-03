"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const TABS = [
  { id: "of", label: "% of a Number", desc: "What is X% of Y?" },
  { id: "is", label: "% a Number Is", desc: "X is what % of Y?" },
  { id: "change", label: "% Change", desc: "% increase or decrease from X to Y" },
];

export default function PercentageChange() {
  const [tab, setTab] = useState("of");
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const aNum = parseFloat(a) || 0;
  const bNum = parseFloat(b) || 0;

  let result = null;
  let explanation = "";

  if (tab === "of" && a && b) {
    result = (aNum / 100) * bNum;
    explanation = `${aNum}% of ${bNum} = ${result.toFixed(4).replace(/\.?0+$/, "")}`;
  } else if (tab === "is" && a && b) {
    if (bNum !== 0) {
      result = (aNum / bNum) * 100;
      explanation = `${aNum} is ${result.toFixed(4).replace(/\.?0+$/, "")}% of ${bNum}`;
    }
  } else if (tab === "change" && a && b) {
    if (aNum !== 0) {
      result = ((bNum - aNum) / Math.abs(aNum)) * 100;
      const dir = result >= 0 ? "increase" : "decrease";
      explanation = `${aNum} → ${bNum} is a ${Math.abs(result).toFixed(2)}% ${dir}`;
    }
  }

  const inp = { border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "12px 14px", outline: "none", background: "white", fontSize: "18px", width: "100%", boxSizing: "border-box" };

  const labels = {
    of: [["Percentage (%)", "e.g. 15"], ["Number", "e.g. 200"]],
    is: [["Number (X)", "e.g. 45"], ["Total (Y)", "e.g. 300"]],
    change: [["Original Value (X)", "e.g. 80"], ["New Value (Y)", "e.g. 100"]],
  };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Math Tools", href: "/math-tools" }, { label: "Percentage Change" }]} />
      <div style={{ maxWidth: "540px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Percentage Calculator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Three types of percentage calculations in one tool.</p>
        </div>

        <div style={{ display: "flex", gap: "6px", marginBottom: "16px" }}>
          {TABS.map((t) => (
            <button key={t.id} onClick={() => { setTab(t.id); setA(""); setB(""); }} style={{ flex: 1, padding: "9px 6px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: tab === t.id ? "#4F46E5" : "white", color: tab === t.id ? "white" : "#374151", fontSize: "11px", cursor: "pointer", fontWeight: "500", textAlign: "center", lineHeight: "1.3" }}>
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ fontSize: "13px", color: "#6366F1", fontWeight: "500", marginBottom: "16px" }}>
            {TABS.find((t) => t.id === tab)?.desc}
          </div>

          {tab === "of" && (
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: "100px" }}>
                <label style={{ fontSize: "11px", color: "#9CA3AF", display: "block", marginBottom: "4px" }}>Percentage</label>
                <input type="number" value={a} onChange={(e) => setA(e.target.value)} placeholder="15" style={inp} />
              </div>
              <div style={{ fontSize: "16px", color: "#9CA3AF", flexShrink: 0 }}>% of</div>
              <div style={{ flex: 1, minWidth: "100px" }}>
                <label style={{ fontSize: "11px", color: "#9CA3AF", display: "block", marginBottom: "4px" }}>Number</label>
                <input type="number" value={b} onChange={(e) => setB(e.target.value)} placeholder="200" style={inp} />
              </div>
            </div>
          )}

          {tab === "is" && (
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: "100px" }}>
                <label style={{ fontSize: "11px", color: "#9CA3AF", display: "block", marginBottom: "4px" }}>X</label>
                <input type="number" value={a} onChange={(e) => setA(e.target.value)} placeholder="45" style={inp} />
              </div>
              <div style={{ fontSize: "16px", color: "#9CA3AF", flexShrink: 0 }}>is what % of</div>
              <div style={{ flex: 1, minWidth: "100px" }}>
                <label style={{ fontSize: "11px", color: "#9CA3AF", display: "block", marginBottom: "4px" }}>Y</label>
                <input type="number" value={b} onChange={(e) => setB(e.target.value)} placeholder="300" style={inp} />
              </div>
            </div>
          )}

          {tab === "change" && (
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: "100px" }}>
                <label style={{ fontSize: "11px", color: "#9CA3AF", display: "block", marginBottom: "4px" }}>Original (X)</label>
                <input type="number" value={a} onChange={(e) => setA(e.target.value)} placeholder="80" style={inp} />
              </div>
              <div style={{ fontSize: "20px", color: "#9CA3AF", flexShrink: 0 }}>→</div>
              <div style={{ flex: 1, minWidth: "100px" }}>
                <label style={{ fontSize: "11px", color: "#9CA3AF", display: "block", marginBottom: "4px" }}>New (Y)</label>
                <input type="number" value={b} onChange={(e) => setB(e.target.value)} placeholder="100" style={inp} />
              </div>
            </div>
          )}
        </div>

        {result !== null && (
          <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "28px", textAlign: "center" }}>
            <div style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Result</div>
            <div style={{ fontSize: "56px", fontWeight: "300", color: tab === "change" && result < 0 ? "#EF4444" : "#4F46E5", lineHeight: "1" }}>
              {tab === "change" ? `${result >= 0 ? "+" : ""}${result.toFixed(2)}%` : result.toFixed(4).replace(/\.?0+$/, "")}
            </div>
            {tab === "change" && (
              <div style={{ marginTop: "8px", fontSize: "14px", fontWeight: "500", color: result >= 0 ? "#10B981" : "#EF4444" }}>
                {result >= 0 ? "▲ Increase" : "▼ Decrease"}
              </div>
            )}
            <div style={{ marginTop: "8px", fontSize: "13px", color: "#6B7280" }}>{explanation}</div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
