"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function PercentageCalculator() {
  const [mode, setMode] = useState("basic");
  const [basicVal, setBasicVal] = useState({ percent: "", number: "" });
  const [changeVal, setChangeVal] = useState({ from: "", to: "" });
  const [ofVal, setOfVal] = useState({ part: "", whole: "" });

  const basicResult = basicVal.percent && basicVal.number
    ? ((parseFloat(basicVal.percent) / 100) * parseFloat(basicVal.number)).toFixed(2) : null;
  const changeResult = changeVal.from && changeVal.to
    ? (((parseFloat(changeVal.to) - parseFloat(changeVal.from)) / parseFloat(changeVal.from)) * 100).toFixed(2) : null;
  const ofResult = ofVal.part && ofVal.whole
    ? ((parseFloat(ofVal.part) / parseFloat(ofVal.whole)) * 100).toFixed(2) : null;

  const modes = [
    { id: "basic", label: "% of a number" },
    { id: "change", label: "% change" },
    { id: "of", label: "What % is X of Y" },
  ];

  const inputStyle = { border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", fontSize: "14px", outline: "none", background: "white", width: "110px", color: "#374151" };
  const resultBox = (value, label) => value && (
    <div style={{ background: "white", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "20px", textAlign: "center", marginTop: "16px" }}>
      <div style={{ fontSize: "12px", color: "#9CA3AF", marginBottom: "6px" }}>Result</div>
      <div style={{ fontSize: "40px", fontWeight: "500", color: "#4F46E5" }}>{value}</div>
      <div style={{ fontSize: "13px", color: "#6B7280", marginTop: "4px" }}>{label}</div>
    </div>
  );

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Calculators", href: "/calculators" }, { label: "Percentage Calculator" }]} />
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Percentage Calculator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate percentages instantly. Free, no signup required.</p>
        </div>

        <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
          {modes.map((m) => (
            <button key={m.id} type="button" onClick={() => setMode(m.id)}
              style={{ padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: "500", cursor: "pointer", border: mode === m.id ? "none" : "0.5px solid #C7D2FE", background: mode === m.id ? "#4F46E5" : "white", color: mode === m.id ? "white" : "#4B5563" }}>
              {m.label}
            </button>
          ))}
        </div>

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px" }}>
          {mode === "basic" && (
            <>
              <p style={{ fontSize: "14px", color: "#4338CA", marginBottom: "16px" }}>What is <strong>X%</strong> of <strong>Y</strong>?</p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                <input type="number" placeholder="X" value={basicVal.percent} onChange={(e) => setBasicVal(v => ({ ...v, percent: e.target.value }))} style={inputStyle} />
                <span style={{ fontSize: "14px", color: "#6366F1" }}>% of</span>
                <input type="number" placeholder="Y" value={basicVal.number} onChange={(e) => setBasicVal(v => ({ ...v, number: e.target.value }))} style={inputStyle} />
              </div>
              {resultBox(basicResult, `${basicVal.percent}% of ${basicVal.number} = ${basicResult}`)}
            </>
          )}
          {mode === "change" && (
            <>
              <p style={{ fontSize: "14px", color: "#4338CA", marginBottom: "16px" }}>Percentage <strong>increase or decrease</strong> from X to Y</p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                <input type="number" placeholder="From" value={changeVal.from} onChange={(e) => setChangeVal(v => ({ ...v, from: e.target.value }))} style={inputStyle} />
                <span style={{ fontSize: "14px", color: "#6366F1" }}>→</span>
                <input type="number" placeholder="To" value={changeVal.to} onChange={(e) => setChangeVal(v => ({ ...v, to: e.target.value }))} style={inputStyle} />
              </div>
              {changeResult && (
                <div style={{ background: "white", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "20px", textAlign: "center", marginTop: "16px" }}>
                  <div style={{ fontSize: "12px", color: "#9CA3AF", marginBottom: "6px" }}>{parseFloat(changeResult) >= 0 ? "Increase" : "Decrease"}</div>
                  <div style={{ fontSize: "40px", fontWeight: "500", color: parseFloat(changeResult) >= 0 ? "#059669" : "#DC2626" }}>{changeResult}%</div>
                </div>
              )}
            </>
          )}
          {mode === "of" && (
            <>
              <p style={{ fontSize: "14px", color: "#4338CA", marginBottom: "16px" }}>What percentage is <strong>X</strong> of <strong>Y</strong>?</p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                <input type="number" placeholder="X" value={ofVal.part} onChange={(e) => setOfVal(v => ({ ...v, part: e.target.value }))} style={inputStyle} />
                <span style={{ fontSize: "14px", color: "#6366F1" }}>is what % of</span>
                <input type="number" placeholder="Y" value={ofVal.whole} onChange={(e) => setOfVal(v => ({ ...v, whole: e.target.value }))} style={inputStyle} />
              </div>
              {resultBox(ofResult ? ofResult + "%" : null, `${ofVal.part} is ${ofResult}% of ${ofVal.whole}`)}
            </>
          )}
        </div>

        <div style={{ marginTop: "24px", background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: "500", color: "#1E1B4B", marginBottom: "8px" }}>How to use</h2>
          <ul style={{ fontSize: "13px", color: "#4338CA", lineHeight: "1.8" }}>
            <li>• Choose the type of percentage calculation above</li>
            <li>• Enter your numbers and the result appears instantly</li>
          </ul>
        </div>
      </div>
      <Footer />
    </main>
  );
}