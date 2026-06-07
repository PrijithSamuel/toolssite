"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Volume units in ml
const VOLUME_UNITS = [
  { id: "ml",       label: "Millilitres (ml)",     ml: 1 },
  { id: "l",        label: "Litres (L)",            ml: 1000 },
  { id: "tsp",      label: "Teaspoon (tsp)",        ml: 5 },
  { id: "tbsp",     label: "Tablespoon (tbsp)",     ml: 15 },
  { id: "cup",      label: "Cup (US)",              ml: 240 },
  { id: "floz",     label: "Fl oz (US)",            ml: 29.5735 },
  { id: "pint",     label: "Pint (US)",             ml: 473.176 },
  { id: "quart",    label: "Quart (US)",            ml: 946.353 },
  { id: "gallon",   label: "Gallon (US)",           ml: 3785.41 },
];

// Weight units in grams
const WEIGHT_UNITS = [
  { id: "g",   label: "Grams (g)",      g: 1 },
  { id: "kg",  label: "Kilograms (kg)", g: 1000 },
  { id: "oz",  label: "Ounces (oz)",    g: 28.3495 },
  { id: "lb",  label: "Pounds (lb)",    g: 453.592 },
];

const OVEN_TEMPS = [
  { desc: "Very Low",  c: 120, f: 250, gas: "½" },
  { desc: "Low",       c: 150, f: 300, gas: "2" },
  { desc: "Moderate",  c: 180, f: 350, gas: "4" },
  { desc: "Hot",       c: 200, f: 400, gas: "6" },
  { desc: "Very Hot",  c: 230, f: 450, gas: "8" },
];

const QUICK_REF = [
  { label: "1 cup",         value: "240 ml" },
  { label: "1 tbsp",        value: "15 ml" },
  { label: "1 tsp",         value: "5 ml" },
  { label: "1 oz",          value: "28.35 g" },
  { label: "1 lb",          value: "453.6 g" },
  { label: "1 stick butter",value: "113 g" },
];

function fmt(n) {
  if (isNaN(n) || !isFinite(n)) return "—";
  if (Math.abs(n) < 0.001) return "0";
  if (Math.abs(n) >= 1000) return n.toFixed(1);
  if (Math.abs(n) >= 10)   return n.toFixed(2);
  return n.toFixed(3);
}

const TABS = [
  { id: "volume", label: "Volume" },
  { id: "weight", label: "Weight" },
  { id: "temp",   label: "Temperature" },
];

export default function CookingUnits() {
  const [tab, setTab] = useState("volume");

  // Volume state
  const [volFrom, setVolFrom] = useState("cup");
  const [volTo, setVolTo]     = useState("ml");
  const [volAmt, setVolAmt]   = useState("1");

  // Weight state
  const [wtFrom, setWtFrom]   = useState("oz");
  const [wtTo, setWtTo]       = useState("g");
  const [wtAmt, setWtAmt]     = useState("1");

  // Temperature state
  const [tempDir, setTempDir] = useState("c2f"); // "c2f" | "f2c"
  const [tempVal, setTempVal] = useState("180");

  // Computed
  const volResult = (() => {
    const from = VOLUME_UNITS.find((u) => u.id === volFrom);
    const to   = VOLUME_UNITS.find((u) => u.id === volTo);
    const n    = parseFloat(volAmt);
    if (!from || !to || isNaN(n)) return "—";
    return fmt((n * from.ml) / to.ml);
  })();

  const wtResult = (() => {
    const from = WEIGHT_UNITS.find((u) => u.id === wtFrom);
    const to   = WEIGHT_UNITS.find((u) => u.id === wtTo);
    const n    = parseFloat(wtAmt);
    if (!from || !to || isNaN(n)) return "—";
    return fmt((n * from.g) / to.g);
  })();

  const tempResult = (() => {
    const n = parseFloat(tempVal);
    if (isNaN(n)) return "—";
    if (tempDir === "c2f") return fmt(n * 1.8 + 32);
    return fmt((n - 32) / 1.8);
  })();

  const selectStyle = { border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "14px", color: "#1E1B4B", cursor: "pointer" };
  const inputStyle  = { border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "15px", width: "100%", boxSizing: "border-box" };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Converters", href: "/converters" }, { label: "Cooking Units" }]} />
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1E1B4B", marginBottom: "6px" }}>🍳 Cooking Measurement Converter</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Convert cups, tablespoons, ounces, Celsius, Fahrenheit and more — for baking and cooking recipes.</p>
        </div>

        {/* Tab bar */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "20px" }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{ padding: "9px 22px", borderRadius: "10px", border: tab === t.id ? "none" : "0.5px solid #C7D2FE", background: tab === t.id ? "#4F46E5" : "white", color: tab === t.id ? "white" : "#374151", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Volume tab */}
        {tab === "volume" && (
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "12px", alignItems: "end", marginBottom: "20px" }}>
              <div>
                <label style={{ fontSize: "12px", color: "#6B7280", fontWeight: "600", display: "block", marginBottom: "6px" }}>Amount</label>
                <input type="number" value={volAmt} onChange={(e) => setVolAmt(e.target.value)} min="0" step="any" style={inputStyle} />
              </div>
              <div style={{ textAlign: "center", paddingBottom: "10px", fontSize: "20px", color: "#C7D2FE" }}>→</div>
              <div>
                <label style={{ fontSize: "12px", color: "#6B7280", fontWeight: "600", display: "block", marginBottom: "6px" }}>Result</label>
                <div style={{ border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", background: "#F8F9FF", fontSize: "18px", fontWeight: "700", color: "#4F46E5", minHeight: "42px" }}>
                  {volResult}
                </div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ fontSize: "12px", color: "#6B7280", fontWeight: "600", display: "block", marginBottom: "6px" }}>From</label>
                <select value={volFrom} onChange={(e) => setVolFrom(e.target.value)} style={{ ...selectStyle, width: "100%" }}>
                  {VOLUME_UNITS.map((u) => <option key={u.id} value={u.id}>{u.label}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: "12px", color: "#6B7280", fontWeight: "600", display: "block", marginBottom: "6px" }}>To</label>
                <select value={volTo} onChange={(e) => setVolTo(e.target.value)} style={{ ...selectStyle, width: "100%" }}>
                  {VOLUME_UNITS.map((u) => <option key={u.id} value={u.id}>{u.label}</option>)}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Weight tab */}
        {tab === "weight" && (
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "12px", alignItems: "end", marginBottom: "20px" }}>
              <div>
                <label style={{ fontSize: "12px", color: "#6B7280", fontWeight: "600", display: "block", marginBottom: "6px" }}>Amount</label>
                <input type="number" value={wtAmt} onChange={(e) => setWtAmt(e.target.value)} min="0" step="any" style={inputStyle} />
              </div>
              <div style={{ textAlign: "center", paddingBottom: "10px", fontSize: "20px", color: "#C7D2FE" }}>→</div>
              <div>
                <label style={{ fontSize: "12px", color: "#6B7280", fontWeight: "600", display: "block", marginBottom: "6px" }}>Result</label>
                <div style={{ border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", background: "#F8F9FF", fontSize: "18px", fontWeight: "700", color: "#4F46E5", minHeight: "42px" }}>
                  {wtResult}
                </div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ fontSize: "12px", color: "#6B7280", fontWeight: "600", display: "block", marginBottom: "6px" }}>From</label>
                <select value={wtFrom} onChange={(e) => setWtFrom(e.target.value)} style={{ ...selectStyle, width: "100%" }}>
                  {WEIGHT_UNITS.map((u) => <option key={u.id} value={u.id}>{u.label}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: "12px", color: "#6B7280", fontWeight: "600", display: "block", marginBottom: "6px" }}>To</label>
                <select value={wtTo} onChange={(e) => setWtTo(e.target.value)} style={{ ...selectStyle, width: "100%" }}>
                  {WEIGHT_UNITS.map((u) => <option key={u.id} value={u.id}>{u.label}</option>)}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Temperature tab */}
        {tab === "temp" && (
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
            <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
              <button
                onClick={() => setTempDir("c2f")}
                style={{ padding: "8px 18px", borderRadius: "8px", border: tempDir === "c2f" ? "none" : "0.5px solid #C7D2FE", background: tempDir === "c2f" ? "#4F46E5" : "white", color: tempDir === "c2f" ? "white" : "#374151", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
              >
                °C → °F
              </button>
              <button
                onClick={() => setTempDir("f2c")}
                style={{ padding: "8px 18px", borderRadius: "8px", border: tempDir === "f2c" ? "none" : "0.5px solid #C7D2FE", background: tempDir === "f2c" ? "#4F46E5" : "white", color: tempDir === "f2c" ? "white" : "#374151", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
              >
                °F → °C
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "16px", alignItems: "center" }}>
              <div>
                <label style={{ fontSize: "12px", color: "#6B7280", fontWeight: "600", display: "block", marginBottom: "6px" }}>
                  {tempDir === "c2f" ? "Celsius (°C)" : "Fahrenheit (°F)"}
                </label>
                <input type="number" value={tempVal} onChange={(e) => setTempVal(e.target.value)} step="any" style={inputStyle} />
              </div>
              <div style={{ textAlign: "center", fontSize: "22px", color: "#C7D2FE", marginTop: "20px" }}>→</div>
              <div>
                <label style={{ fontSize: "12px", color: "#6B7280", fontWeight: "600", display: "block", marginBottom: "6px" }}>
                  {tempDir === "c2f" ? "Fahrenheit (°F)" : "Celsius (°C)"}
                </label>
                <div style={{ border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", background: "#F8F9FF", fontSize: "22px", fontWeight: "700", color: "#4F46E5" }}>
                  {tempResult}°
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick reference card */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
          <div style={{ padding: "10px 16px", background: "#F8F9FF", borderBottom: "0.5px solid #E0E7FF", fontSize: "12px", fontWeight: "600", color: "#374151" }}>Quick Reference</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
            {QUICK_REF.map(({ label, value }, i) => (
              <div key={label} style={{ padding: "12px 16px", borderRight: i % 3 !== 2 ? "0.5px solid #F3F4F6" : "none", borderBottom: i < 3 ? "0.5px solid #F3F4F6" : "none" }}>
                <div style={{ fontSize: "12px", color: "#9CA3AF", marginBottom: "2px" }}>{label}</div>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "#4F46E5" }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Oven temperature guide */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ padding: "10px 16px", background: "#F8F9FF", borderBottom: "0.5px solid #E0E7FF", fontSize: "12px", fontWeight: "600", color: "#374151" }}>Oven Temperature Guide</div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F8F9FF" }}>
                {["Setting", "Celsius", "Fahrenheit", "Gas Mark"].map((h) => (
                  <th key={h} style={{ padding: "10px 14px", fontSize: "11px", fontWeight: "700", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "center", borderBottom: "0.5px solid #E0E7FF" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {OVEN_TEMPS.map((row, i) => (
                <tr key={row.desc} style={{ background: i % 2 === 0 ? "white" : "#FAFBFF", borderBottom: i < OVEN_TEMPS.length - 1 ? "0.5px solid #F3F4F6" : "none" }}>
                  <td style={{ padding: "11px 14px", fontSize: "13px", fontWeight: "600", color: "#374151", textAlign: "center" }}>{row.desc}</td>
                  <td style={{ padding: "11px 14px", fontSize: "14px", fontWeight: "700", color: "#4F46E5", textAlign: "center" }}>{row.c}°C</td>
                  <td style={{ padding: "11px 14px", fontSize: "14px", fontWeight: "700", color: "#DC2626", textAlign: "center" }}>{row.f}°F</td>
                  <td style={{ padding: "11px 14px", fontSize: "14px", color: "#374151", textAlign: "center" }}>Gas {row.gas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </main>
  );
}
