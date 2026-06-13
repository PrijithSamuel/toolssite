"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FAQ from "../../components/FAQ";

const FAQS = [
  { q: "How do I calculate what percentage one number is of another?", a: "Use the second calculator on this page: enter both numbers and it shows what percentage the first number is of the second." },
  { q: "How do I calculate a percentage increase?", a: "Use the third calculator: enter the original value and the new value to see the percentage increase or decrease." },
  { q: "What is 20% of 50?", a: "20% of 50 is 10. Use the first calculator: enter 20 as the percentage and 50 as the number." },
  { q: "How do I calculate a discount?", a: "Enter the original price and the discount percentage in the first calculator to find the discount amount." },
  { q: "What is the formula for percentage change?", a: "Percentage change = ((New Value - Original Value) / Original Value) × 100. A positive result means an increase, negative means a decrease." },
];

const introStyle = { background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "24px", fontSize: "14px", color: "#4B5563", lineHeight: "1.8" };

const card = { background:"white", border:"0.5px solid #E0E7FF", borderRadius:"12px", padding:"20px", marginBottom:"16px" };
const wrap = { maxWidth:"600px", margin:"0 auto", padding:"0 24px" };
const h2s = { fontSize:"16px", fontWeight:"500", color:"#1E1B4B", marginBottom:"12px" };
const ps = { fontSize:"13px", color:"#4B5563", lineHeight:"1.8", marginBottom:"10px" };
const psL = { fontSize:"13px", color:"#4B5563", lineHeight:"1.8", margin:0 };

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
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Percentage Calculator — Calculate % Instantly</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate percentages instantly. Free, no signup required.</p>
        </div>

        <div style={introStyle}>
          Percentage calculations come up constantly in everyday life — calculating a restaurant tip, working out how much you save in a sale, understanding whether your salary increase beats inflation, or checking your exam score as a percentage. This tool offers three different percentage calculations in one place: finding a percentage of a number (what is 15% of 240?), expressing one number as a percentage of another (30 is what percent of 240?), and calculating percentage change between two values (how much did the price increase from 200 to 240?). Each calculator updates instantly as you type.
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
      <div style={wrap}>
        <div style={card}>
          <h2 style={h2s}>Three Types of Percentage Calculation</h2>
          <p style={ps}><strong>Type 1 — Finding a percentage of a number:</strong> Used for calculating discounts, tips, commission, and tax. A 20% discount on a 5,000 item saves 1,000.</p>
          <p style={ps}><strong>Type 2 — Expressing one number as a percentage of another:</strong> Used in academic scoring and performance metrics. Scoring 68 out of 80 on an exam represents 85%.</p>
          <p style={psL}><strong>Type 3 — Percentage change between two values:</strong> Used in finance and data analysis. A price increase from 200 to 240 is a 20% increase. A drop from 500 to 375 is a 25% decrease.</p>
        </div>
      </div>
      <FAQ faqs={FAQS} />
      <Footer />
    </main>
  );
}