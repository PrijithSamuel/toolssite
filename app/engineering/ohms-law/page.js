"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const UNITS = {
  voltage:    [{ label: "mV", factor: 1e-3 }, { label: "V", factor: 1 }, { label: "kV", factor: 1e3 }],
  current:    [{ label: "mA", factor: 1e-3 }, { label: "A", factor: 1 }],
  resistance: [{ label: "Ω",  factor: 1 }, { label: "kΩ", factor: 1e3 }, { label: "MΩ", factor: 1e6 }],
  power:      [{ label: "mW", factor: 1e-3 }, { label: "W", factor: 1 }, { label: "kW", factor: 1e3 }],
};

const CALC_TARGETS = [
  { id: "voltage",    label: "Voltage (V)",     icon: "⚡" },
  { id: "current",    label: "Current (I)",      icon: "🔄" },
  { id: "resistance", label: "Resistance (R)",   icon: "♾️" },
  { id: "power",      label: "Power (P)",        icon: "💡" },
];

// Inputs needed per target (the two values used to calculate)
const INPUTS_FOR = {
  voltage:    ["current", "resistance"],
  current:    ["voltage", "resistance"],
  resistance: ["voltage", "current"],
  power:      ["voltage", "current"],
};

function defaultUnit(qty) {
  const idx = { voltage: 1, current: 1, resistance: 0, power: 1 };
  return UNITS[qty][idx[qty]].label;
}

function toSI(val, qty, unitLabel) {
  const u = UNITS[qty].find((u) => u.label === unitLabel);
  return val * (u?.factor ?? 1);
}

function bestUnit(siVal, qty) {
  const units = [...UNITS[qty]].reverse();
  for (const u of units) {
    if (Math.abs(siVal) >= u.factor * 0.9) return u;
  }
  return UNITS[qty][0];
}

function fmt(n) {
  if (n === 0) return "0";
  const abs = Math.abs(n);
  if (abs >= 1000) return n.toLocaleString("en-US", { maximumFractionDigits: 3 });
  if (abs < 0.001) return n.toExponential(3);
  return parseFloat(n.toPrecision(4)).toString();
}

function calculate(target, vals) {
  const { voltage: V, current: I, resistance: R } = vals;
  if (target === "voltage")    return V !== null ? V : (I !== null && R !== null ? I * R : null);
  if (target === "current")    return I !== null ? I : (V !== null && R !== null ? V / R : null);
  if (target === "resistance") return R !== null ? R : (V !== null && I !== null ? V / I : null);
  if (target === "power") {
    if (V !== null && I !== null) return V * I;
    if (I !== null && R !== null) return I * I * R;
    if (V !== null && R !== null) return (V * V) / R;
    return null;
  }
  return null;
}

export default function OhmsLaw() {
  const [target, setTarget] = useState("voltage");
  const [inputVals, setInputVals] = useState({ voltage: "", current: "", resistance: "", power: "" });
  const [inputUnits, setInputUnits] = useState({ voltage: "V", current: "A", resistance: "Ω", power: "W" });

  const inputs = INPUTS_FOR[target];

  function setVal(qty, v) { setInputVals((p) => ({ ...p, [qty]: v })); }
  function setUnit(qty, u) { setInputUnits((p) => ({ ...p, [qty]: u })); }

  const siVals = {
    voltage:    inputVals.voltage    !== "" ? toSI(parseFloat(inputVals.voltage),    "voltage",    inputUnits.voltage)    : null,
    current:    inputVals.current    !== "" ? toSI(parseFloat(inputVals.current),    "current",    inputUnits.current)    : null,
    resistance: inputVals.resistance !== "" ? toSI(parseFloat(inputVals.resistance), "resistance", inputUnits.resistance) : null,
    power:      inputVals.power      !== "" ? toSI(parseFloat(inputVals.power),      "power",      inputUnits.power)      : null,
  };

  const rawResult = calculate(target, siVals);
  const resultUnit = rawResult !== null ? bestUnit(rawResult, target) : null;
  const displayResult = rawResult !== null && resultUnit ? fmt(rawResult / resultUnit.factor) : null;

  const inp = { border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "15px", flex: 1, boxSizing: "border-box" };
  const selStyle = { border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 8px", outline: "none", background: "white", fontSize: "14px", cursor: "pointer" };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Engineering", href: "/engineering" }, { label: "Ohm's Law Calculator" }]} />
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Ohm&apos;s Law Calculator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate Voltage, Current, Resistance or Power — enter any two known values.</p>
        </div>

        {/* Target selector */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
          <div style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "12px" }}>Calculate</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
            {CALC_TARGETS.map(({ id, label, icon }) => (
              <button key={id} onClick={() => setTarget(id)} style={{ padding: "12px 16px", borderRadius: "8px", border: `0.5px solid ${target === id ? "#A5B4FC" : "#C7D2FE"}`, background: target === id ? "#EEF2FF" : "white", color: target === id ? "#4F46E5" : "#374151", fontSize: "14px", fontWeight: target === id ? "600" : "400", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>{icon}</span><span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
          <div style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "14px" }}>Known values</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {inputs.map((qty) => (
              <div key={qty}>
                <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px", textTransform: "capitalize" }}>
                  {qty} ({CALC_TARGETS.find((t) => t.id === qty)?.label})
                </label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input type="number" value={inputVals[qty]} onChange={(e) => setVal(qty, e.target.value)} placeholder="0" style={inp} />
                  <select value={inputUnits[qty]} onChange={(e) => setUnit(qty, e.target.value)} style={selStyle}>
                    {UNITS[qty].map((u) => <option key={u.label} value={u.label}>{u.label}</option>)}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Result */}
        {displayResult !== null && (
          <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px", textAlign: "center" }}>
            <div style={{ fontSize: "12px", fontWeight: "600", color: "#6366F1", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>
              {CALC_TARGETS.find((t) => t.id === target)?.label}
            </div>
            <div style={{ fontSize: "56px", fontWeight: "700", color: "#4F46E5", lineHeight: 1 }}>
              {displayResult}
              <span style={{ fontSize: "24px", marginLeft: "6px" }}>{resultUnit?.label}</span>
            </div>
          </div>
        )}

        {/* Formulas reference */}
        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "20px" }}>
          <div style={{ fontSize: "13px", fontWeight: "600", color: "#4F46E5", marginBottom: "12px" }}>Formulas Reference</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {[
              { formula: "V = I × R", desc: "Ohm's Law" },
              { formula: "P = V × I", desc: "Power (basic)" },
              { formula: "P = I² × R", desc: "Power (from I, R)" },
              { formula: "P = V² / R", desc: "Power (from V, R)" },
              { formula: "I = V / R", desc: "Current" },
              { formula: "R = V / I", desc: "Resistance" },
            ].map(({ formula, desc }) => (
              <div key={formula} style={{ background: "white", borderRadius: "8px", padding: "10px 14px" }}>
                <div style={{ fontFamily: "monospace", fontSize: "14px", color: "#4F46E5", fontWeight: "600" }}>{formula}</div>
                <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "2px" }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
