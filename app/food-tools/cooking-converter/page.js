"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const weightUnits = {
  g: 1,
  kg: 1000,
  oz: 28.3495,
  lbs: 453.592,
};

const volumeUnits = {
  ml: 1,
  L: 1000,
  "fl oz": 29.5735,
  cups: 236.588,
  tbsp: 14.787,
  tsp: 4.929,
};

const ovenTemps = [
  { gas: "¼", c: 110, f: 225, desc: "Very cool" },
  { gas: "½", c: 130, f: 265, desc: "Very cool" },
  { gas: "1", c: 140, f: 275, desc: "Cool" },
  { gas: "2", c: 150, f: 300, desc: "Cool" },
  { gas: "3", c: 160, f: 325, desc: "Warm" },
  { gas: "4", c: 180, f: 350, desc: "Moderate" },
  { gas: "5", c: 190, f: 375, desc: "Moderately hot" },
  { gas: "6", c: 200, f: 400, desc: "Hot" },
  { gas: "7", c: 220, f: 425, desc: "Hot" },
  { gas: "8", c: 230, f: 450, desc: "Very hot" },
  { gas: "9", c: 240, f: 475, desc: "Very hot" },
];

function convert(value, fromUnit, unitMap) {
  const v = parseFloat(value);
  if (isNaN(v)) return {};
  const inBase = v * unitMap[fromUnit];
  const result = {};
  for (const [unit, factor] of Object.entries(unitMap)) {
    const converted = inBase / factor;
    result[unit] = converted % 1 === 0 ? String(converted) : converted.toFixed(4).replace(/\.?0+$/, "");
  }
  return result;
}

function fmt(n) {
  if (!n && n !== 0) return "—";
  const num = parseFloat(n);
  return isNaN(num) ? "—" : (num % 1 === 0 ? String(num) : num.toFixed(3).replace(/\.?0+$/, ""));
}

export default function CookingConverter() {
  const [tab, setTab] = useState("weight");
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("g");
  const [tempC, setTempC] = useState("");
  const [tempF, setTempF] = useState("");

  const unitMap = tab === "weight" ? weightUnits : volumeUnits;
  const results = value ? convert(value, fromUnit, unitMap) : {};

  function handleTempC(v) {
    setTempC(v);
    const f = parseFloat(v);
    setTempF(isNaN(f) ? "" : ((f * 9) / 5 + 32).toFixed(1).replace(/\.0$/, ""));
  }

  function handleTempF(v) {
    setTempF(v);
    const f = parseFloat(v);
    setTempC(isNaN(f) ? "" : (((f - 32) * 5) / 9).toFixed(1).replace(/\.0$/, ""));
  }

  const tabBtn = (t, label) => (
    <button onClick={() => { setTab(t); setValue(""); setFromUnit(t === "weight" ? "g" : "ml"); }} style={{ flex: 1, padding: "9px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: tab === t ? "#4F46E5" : "white", color: tab === t ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>{label}</button>
  );

  const inp = { border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "15px", boxSizing: "border-box" };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Food Tools", href: "/food-tools" }, { label: "Cooking Converter" }]} />
      <div style={{ maxWidth: "620px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Cooking Converter</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Convert cooking weights, volumes and oven temperatures.</p>
        </div>

        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          {tabBtn("weight", "⚖️ Weight")}
          {tabBtn("volume", "🥛 Volume")}
          {tabBtn("temp", "🌡️ Temperature")}
        </div>

        {(tab === "weight" || tab === "volume") && (
          <>
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
              <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
                <input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter value" style={{ ...inp, flex: 1 }} />
                <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} style={{ ...inp, cursor: "pointer" }}>
                  {Object.keys(unitMap).map((u) => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
                {Object.keys(unitMap).map((unit) => (
                  <div key={unit} style={{ padding: "12px 14px", background: unit === fromUnit ? "#EEF2FF" : "#F8F9FF", borderRadius: "8px", border: `0.5px solid ${unit === fromUnit ? "#A5B4FC" : "#E0E7FF"}` }}>
                    <div style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "2px" }}>{unit}</div>
                    <div style={{ fontSize: "20px", fontWeight: "500", color: unit === fromUnit ? "#4F46E5" : "#1E1B4B" }}>
                      {results[unit] || "—"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Common measurements reference */}
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "14px 16px" }}>
              <div style={{ fontSize: "12px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>
                {tab === "weight" ? "Quick Reference" : "Volume Quick Reference"}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", fontSize: "11px", color: "#6B7280" }}>
                {tab === "weight"
                  ? ["1 kg = 1000 g", "1 lb = 453.6 g", "1 oz = 28.3 g", "100 g = 3.5 oz"].map((r) => (
                      <span key={r} style={{ padding: "3px 8px", background: "white", borderRadius: "5px", border: "0.5px solid #C7D2FE" }}>{r}</span>
                    ))
                  : ["1 cup = 237 ml", "1 tbsp = 15 ml", "1 tsp = 5 ml", "1 L = 33.8 fl oz"].map((r) => (
                      <span key={r} style={{ padding: "3px 8px", background: "white", borderRadius: "5px", border: "0.5px solid #C7D2FE" }}>{r}</span>
                    ))}
              </div>
            </div>
          </>
        )}

        {tab === "temp" && (
          <>
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "12px", alignItems: "center" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "5px" }}>Celsius (°C)</label>
                  <input type="number" value={tempC} onChange={(e) => handleTempC(e.target.value)} placeholder="180" style={{ ...inp, width: "100%" }} />
                </div>
                <div style={{ fontSize: "20px", color: "#D1D5DB" }}>⇄</div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "5px" }}>Fahrenheit (°F)</label>
                  <input type="number" value={tempF} onChange={(e) => handleTempF(e.target.value)} placeholder="350" style={{ ...inp, width: "100%" }} />
                </div>
              </div>
            </div>

            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "500", color: "#374151" }}>Oven Temperature Guide</div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
                  <thead>
                    <tr style={{ background: "#F8F9FF" }}>
                      {["Gas Mark", "°C", "°F", "Description"].map((h) => (
                        <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontWeight: "500", color: "#6B7280" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ovenTemps.map((row) => (
                      <tr key={row.gas} style={{ borderTop: "0.5px solid #F3F4F6" }}>
                        <td style={{ padding: "8px 12px", color: "#4F46E5", fontWeight: "500" }}>{row.gas}</td>
                        <td style={{ padding: "8px 12px", color: "#374151" }}>{row.c}°C</td>
                        <td style={{ padding: "8px 12px", color: "#374151" }}>{row.f}°F</td>
                        <td style={{ padding: "8px 12px", color: "#6B7280" }}>{row.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
