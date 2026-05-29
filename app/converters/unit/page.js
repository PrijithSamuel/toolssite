"use client";

import { useState } from "react";
import Link from "next/link";

const categories = {
  Length: {
    units: ["Meter", "Kilometer", "Mile", "Foot", "Inch", "Centimeter", "Millimeter", "Yard"],
    toBase: { Meter: 1, Kilometer: 1000, Mile: 1609.34, Foot: 0.3048, Inch: 0.0254, Centimeter: 0.01, Millimeter: 0.001, Yard: 0.9144 },
  },
  Weight: {
    units: ["Kilogram", "Gram", "Pound", "Ounce", "Ton", "Milligram"],
    toBase: { Kilogram: 1, Gram: 0.001, Pound: 0.453592, Ounce: 0.0283495, Ton: 1000, Milligram: 0.000001 },
  },
  Temperature: {
    units: ["Celsius", "Fahrenheit", "Kelvin"],
    toBase: {},
  },
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
    if (category === "Temperature") {
      return convertTemp(val, from, to).toFixed(4).replace(/\.?0+$/, "");
    }
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

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">← Home</Link>
          <span className="text-gray-200">/</span>
          <Link href="/converters" className="text-gray-400 hover:text-gray-600 text-sm">Converters</Link>
          <span className="text-gray-200">/</span>
          <span className="text-sm font-medium text-gray-900">Unit Converter</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Unit Converter</h1>
          <p className="text-gray-500">Convert length, weight, temperature, speed and more. Free, no signup.</p>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap mb-8">
          {Object.keys(categories).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                category === cat
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="bg-green-50 border border-green-100 rounded-xl p-6 space-y-4">
          {/* From/To selectors */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">From</label>
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-200"
              >
                {categories[category].units.map((u) => (
                  <option key={u}>{u}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">To</label>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-200"
              >
                {categories[category].units.map((u) => (
                  <option key={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Input */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">Value</label>
            <input
              type="number"
              placeholder={`Enter value in ${from}`}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>

          {/* Result */}
          {result !== "" && (
            <div className="bg-white border border-green-200 rounded-xl p-5 text-center">
              <div className="text-xs text-gray-400 mb-1">{value} {from} =</div>
              <div className="text-4xl font-bold text-green-600">{result}</div>
              <div className="text-sm text-gray-500 mt-1">{to}</div>
            </div>
          )}
        </div>

        <div className="mt-8 bg-green-50 border border-green-100 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-green-900 mb-2">How to use</h2>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Select a category (Length, Weight, Temperature etc.)</li>
            <li>• Choose the units to convert from and to</li>
            <li>• Enter a value — result appears instantly</li>
          </ul>
        </div>
      </div>
    </main>
  );
}