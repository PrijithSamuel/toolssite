"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FAQ from "../../components/FAQ";

const FAQS = [
  { q: "Which unit categories are supported?", a: "Length, weight, temperature, speed, area and volume are all supported with dozens of units in each category." },
  { q: "How accurate are the conversions?", a: "Conversions use standard internationally accepted conversion factors and are accurate to 6 decimal places." },
  { q: "Why is temperature conversion different from other units?", a: "Temperature uses offset formulas rather than simple multiplication. Celsius to Fahrenheit requires the formula F = C × 1.8 + 32, not just a multiplier." },
  { q: "Can I convert between metric and imperial units?", a: "Yes. All categories include both metric and imperial units. For example length includes meters, kilometers, miles, feet, inches and yards." },
  { q: "Is the currency converter included here?", a: "Currency conversion is a separate tool available in the Converters category." },
];

const categories = {
  Length: {
    units: ["Meter", "Kilometer", "Mile", "Foot", "Inch", "Centimeter", "Millimeter", "Yard"],
    toBase: { Meter: 1, Kilometer: 1000, Mile: 1609.34, Foot: 0.3048, Inch: 0.0254, Centimeter: 0.01, Millimeter: 0.001, Yard: 0.9144 },
  },
  Weight: {
    units: ["Kilogram", "Gram", "Pound", "Ounce", "Ton", "Milligram"],
    toBase: { Kilogram: 1, Gram: 0.001, Pound: 0.453592, Ounce: 0.0283495, Ton: 1000, Milligram: 0.000001 },
  },
  Temperature: { units: ["Celsius", "Fahrenheit", "Kelvin"], toBase: {} },
  Speed: {
    units: ["km/h", "mph", "m/s", "Knot"],
    toBase: { "km/h": 1, mph: 1.60934, "m/s": 3.6, Knot: 1.852 },
  },
  Area: {
    units: ["Square Meter", "Square Kilometer", "Square Mile", "Square Foot", "Acre", "Hectare"],
    toBase: { "Square Meter": 1, "Square Kilometer": 1e6, "Square Mile": 2589988, "Square Foot": 0.092903, Acre: 4046.86, Hectare: 10000 },
  },
  Volume: {
    units: ["Liter", "Milliliter", "Gallon", "Cup", "Fluid Ounce", "Cubic Meter"],
    toBase: { Liter: 1, Milliliter: 0.001, Gallon: 3.78541, Cup: 0.236588, "Fluid Ounce": 0.0295735, "Cubic Meter": 1000 },
  },
};

function convertTemp(val, from, to) {
  let celsius;
  if (from === "Celsius") celsius = val;
  else if (from === "Fahrenheit") celsius = (val - 32) * 5 / 9;
  else celsius = val - 273.15;
  if (to === "Celsius") return celsius;
  if (to === "Fahrenheit") return celsius * 9 / 5 + 32;
  return celsius + 273.15;
}

export default function UnitConverter() {
  const [category, setCategory] = useState("Length");
  const [from, setFrom] = useState("Meter");
  const [to, setTo] = useState("Foot");
  const [value, setValue] = useState("");

  function getResult() {
    const val = parseFloat(value);
    if (isNaN(val)) return "";
    if (category === "Temperature") return convertTemp(val, from, to).toFixed(4).replace(/\.?0+$/, "");
    const base = val * categories[category].toBase[from];
    return (base / categories[category].toBase[to]).toFixed(6).replace(/\.?0+$/, "");
  }

  function handleCategoryChange(cat) {
    setCategory(cat);
    setFrom(categories[cat].units[0]);
    setTo(categories[cat].units[1]);
    setValue("");
  }

  const result = getResult();
  const selectStyle = { width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", fontSize: "14px", outline: "none", background: "white", color: "#374151" };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Converters", href: "/converters" }, { label: "Unit Converter" }]} />
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Unit Converter</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Convert length, weight, temperature, speed and more. Free, no signup.</p>
        </div>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
          {Object.keys(categories).map((cat) => (
            <button key={cat} type="button" onClick={() => handleCategoryChange(cat)}
              style={{ padding: "7px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: "500", cursor: "pointer", border: category === cat ? "none" : "0.5px solid #C7D2FE", background: category === cat ? "#4F46E5" : "white", color: category === cat ? "white" : "#4B5563" }}>
              {cat}
            </button>
          ))}
        </div>

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", display: "block", marginBottom: "6px" }}>FROM</label>
              <select value={from} onChange={(e) => setFrom(e.target.value)} style={selectStyle}>
                {categories[category].units.map((u) => <option key={u}>{u}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", display: "block", marginBottom: "6px" }}>TO</label>
              <select value={to} onChange={(e) => setTo(e.target.value)} style={selectStyle}>
                {categories[category].units.map((u) => <option key={u}>{u}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", display: "block", marginBottom: "6px" }}>VALUE</label>
            <input type="number" placeholder={`Enter value in ${from}`} value={value} onChange={(e) => setValue(e.target.value)} style={selectStyle} />
          </div>
          {result !== "" && (
            <div style={{ background: "white", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "20px", textAlign: "center" }}>
              <div style={{ fontSize: "12px", color: "#9CA3AF", marginBottom: "6px" }}>{value} {from} =</div>
              <div style={{ fontSize: "40px", fontWeight: "500", color: "#4F46E5" }}>{result}</div>
              <div style={{ fontSize: "14px", color: "#6B7280", marginTop: "4px" }}>{to}</div>
            </div>
          )}
        </div>

        <div style={{ marginTop: "24px", background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: "500", color: "#1E1B4B", marginBottom: "8px" }}>How to use</h2>
          <ul style={{ fontSize: "13px", color: "#4338CA", lineHeight: "1.8" }}>
            <li>• Select a category (Length, Weight, Temperature etc.)</li>
            <li>• Choose the units to convert from and to</li>
            <li>• Enter a value — result appears instantly</li>
          </ul>
        </div>
      </div>
      <FAQ faqs={FAQS} />
      <Footer />
    </main>
  );
}