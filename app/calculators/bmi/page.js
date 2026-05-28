"use client";

import { useState } from "react";
import Link from "next/link";

export default function BMICalculator() {
  const [unit, setUnit] = useState("metric");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");

  function calcBMI() {
    if (unit === "metric") {
      const h = parseFloat(height) / 100;
      const w = parseFloat(weight);
      if (!h || !w) return null;
      return (w / (h * h)).toFixed(1);
    } else {
      const totalInches = parseFloat(heightFt) * 12 + parseFloat(heightIn || 0);
      const w = parseFloat(weight);
      if (!totalInches || !w) return null;
      return ((w / (totalInches * totalInches)) * 703).toFixed(1);
    }
  }

  const bmi = calcBMI();

  function getCategory(bmi) {
    if (!bmi) return null;
    const b = parseFloat(bmi);
    if (b < 18.5) return { label: "Underweight", color: "text-blue-600", bg: "bg-blue-50 border-blue-200" };
    if (b < 25) return { label: "Normal weight", color: "text-green-600", bg: "bg-green-50 border-green-200" };
    if (b < 30) return { label: "Overweight", color: "text-yellow-600", bg: "bg-yellow-50 border-yellow-200" };
    return { label: "Obese", color: "text-red-600", bg: "bg-red-50 border-red-200" };
  }

  const category = getCategory(bmi);

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">← Home</Link>
          <span className="text-gray-200">/</span>
          <Link href="/calculators" className="text-gray-400 hover:text-gray-600 text-sm">Calculators</Link>
          <span className="text-gray-200">/</span>
          <span className="text-sm font-medium text-gray-900">BMI Calculator</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">BMI Calculator</h1>
          <p className="text-gray-500">Calculate your Body Mass Index instantly. Free, no signup required.</p>
        </div>

        {/* Unit toggle */}
        <div className="flex gap-2 mb-8">
          {["metric", "imperial"].map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => { setUnit(u); setHeight(""); setWeight(""); setHeightFt(""); setHeightIn(""); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors capitalize ${
                unit === u
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {u} {u === "metric" ? "(cm, kg)" : "(ft, lbs)"}
            </button>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {unit === "metric" ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                <input
                  type="number"
                  placeholder="e.g. 175"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="ft"
                    value={heightFt}
                    onChange={(e) => setHeightFt(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  <input
                    type="number"
                    placeholder="in"
                    value={heightIn}
                    onChange={(e) => setHeightIn(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight ({unit === "metric" ? "kg" : "lbs"})
              </label>
              <input
                type="number"
                placeholder={unit === "metric" ? "e.g. 70" : "e.g. 154"}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          {bmi && category && (
            <div className={`rounded-xl p-5 border text-center ${category.bg}`}>
              <div className="text-xs text-gray-400 mb-1">Your BMI</div>
              <div className={`text-5xl font-bold mb-2 ${category.color}`}>{bmi}</div>
              <div className={`text-lg font-semibold ${category.color}`}>{category.label}</div>
            </div>
          )}
        </div>

        {/* BMI ranges table */}
        <div className="border border-gray-100 rounded-xl overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">BMI Ranges</div>
          {[
            { range: "Below 18.5", label: "Underweight", color: "text-blue-600" },
            { range: "18.5 – 24.9", label: "Normal weight", color: "text-green-600" },
            { range: "25.0 – 29.9", label: "Overweight", color: "text-yellow-600" },
            { range: "30.0 and above", label: "Obese", color: "text-red-600" },
          ].map((row) => (
            <div key={row.label} className="flex justify-between px-4 py-3 border-t border-gray-100 text-sm">
              <span className="text-gray-600">{row.range}</span>
              <span className={`font-medium ${row.color}`}>{row.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-blue-900 mb-2">Note</h2>
          <p className="text-sm text-blue-700">BMI is a general indicator and does not account for muscle mass, age, or other health factors. Consult a doctor for a full health assessment.</p>
        </div>
      </div>
    </main>
  );
}