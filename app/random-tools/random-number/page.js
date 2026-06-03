"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const DICE_FACES = ["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

export default function RandomNumber() {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [result, setResult] = useState(null);
  const [batch, setBatch] = useState([]);
  const [batchCount, setBatchCount] = useState(10);
  const [dice, setDice] = useState([]);
  const [numDice, setNumDice] = useState(2);

  const minN = parseInt(min) || 0;
  const maxN = parseInt(max) || 100;
  const valid = maxN >= minN;

  function getRandom(lo, hi) { return Math.floor(Math.random() * (hi - lo + 1)) + lo; }

  function generate() {
    if (!valid) return;
    setResult(getRandom(minN, maxN));
    setBatch([]);
    setDice([]);
  }

  function generateBatch() {
    if (!valid) return;
    setResult(null);
    setDice([]);
    setBatch(Array.from({ length: batchCount }, () => getRandom(minN, maxN)));
  }

  function rollDice() {
    setResult(null);
    setBatch([]);
    setDice(Array.from({ length: numDice }, () => getRandom(1, 6)));
  }

  const inp = { border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "15px", width: "100%", boxSizing: "border-box" };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Random Tools", href: "/random-tools" }, { label: "Random Number Generator" }]} />
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Random Number Generator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Generate random numbers with custom range, batches, or roll dice.</p>
        </div>

        {/* Range inputs */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "5px" }}>Minimum</label>
              <input type="number" value={min} onChange={(e) => setMin(e.target.value)} style={inp} />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "5px" }}>Maximum</label>
              <input type="number" value={max} onChange={(e) => setMax(e.target.value)} style={inp} />
            </div>
          </div>
          {!valid && <div style={{ fontSize: "12px", color: "#EF4444", marginBottom: "12px" }}>Max must be ≥ Min</div>}
          <button onClick={generate} disabled={!valid} style={{ width: "100%", padding: "14px", borderRadius: "10px", border: "none", background: valid ? "#4F46E5" : "#E5E7EB", color: valid ? "white" : "#9CA3AF", fontSize: "15px", cursor: valid ? "pointer" : "default", fontWeight: "600" }}>
            Generate Random Number
          </button>
        </div>

        {/* Single result */}
        {result !== null && (
          <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "28px", textAlign: "center", marginBottom: "16px" }}>
            <div style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Your Number</div>
            <div style={{ fontSize: "80px", fontWeight: "300", color: "#4F46E5", lineHeight: "1" }}>{result}</div>
            <div style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "6px" }}>between {minN} and {maxN}</div>
          </div>
        )}

        {/* Batch */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
          <div style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "10px" }}>Generate Multiple Numbers</div>
          <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
            {[5, 10, 20, 50].map((n) => (
              <button key={n} onClick={() => setBatchCount(n)} style={{ padding: "6px 14px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: batchCount === n ? "#4F46E5" : "white", color: batchCount === n ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>{n}</button>
            ))}
          </div>
          <button onClick={generateBatch} disabled={!valid} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: "white", color: "#4F46E5", fontSize: "13px", cursor: valid ? "pointer" : "default", fontWeight: "500" }}>
            Generate {batchCount} Numbers
          </button>
          {batch.length > 0 && (
            <div style={{ marginTop: "12px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {batch.map((n, i) => (
                <span key={i} style={{ padding: "5px 12px", background: "#EEF2FF", borderRadius: "6px", fontSize: "14px", fontWeight: "500", color: "#4F46E5" }}>{n}</span>
              ))}
            </div>
          )}
        </div>

        {/* Dice roller */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px" }}>
          <div style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "10px" }}>Dice Roller 🎲</div>
          <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <button key={n} onClick={() => setNumDice(n)} style={{ width: "36px", height: "36px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: numDice === n ? "#4F46E5" : "white", color: numDice === n ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "600" }}>{n}</button>
            ))}
          </div>
          <button onClick={rollDice} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "none", background: "#4F46E5", color: "white", fontSize: "14px", cursor: "pointer", fontWeight: "600" }}>
            Roll {numDice} {numDice === 1 ? "Die" : "Dice"}
          </button>
          {dice.length > 0 && (
            <div style={{ marginTop: "14px" }}>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "8px" }}>
                {dice.map((d, i) => (
                  <span key={i} style={{ fontSize: "48px" }}>{DICE_FACES[d]}</span>
                ))}
              </div>
              <div style={{ textAlign: "center", fontSize: "13px", color: "#6B7280" }}>
                Total: <strong style={{ color: "#4F46E5", fontSize: "16px" }}>{dice.reduce((a, b) => a + b, 0)}</strong>
                <span style={{ marginLeft: "8px" }}>({dice.join(" + ")})</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
