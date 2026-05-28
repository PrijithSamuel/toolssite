"use client";

import { useState } from "react";
import Link from "next/link";

export default function PercentageCalculator() {
  const [mode, setMode] = useState("basic");

  const [basicVal, setBasicVal] = useState({ percent: "", number: "" });
  const [changeVal, setChangeVal] = useState({ from: "", to: "" });
  const [ofVal, setOfVal] = useState({ part: "", whole: "" });

  const basicResult = basicVal.percent && basicVal.number
    ? ((parseFloat(basicVal.percent) / 100) * parseFloat(basicVal.number)).toFixed(2)
    : null;

  const changeResult = changeVal.from && changeVal.to
    ? (((parseFloat(changeVal.to) - parseFloat(changeVal.from)) / parseFloat(changeVal.from)) * 100).toFixed(2)
    : null;

  const ofResult = ofVal.part && ofVal.whole
    ? ((parseFloat(ofVal.part) / parseFloat(ofVal.whole)) * 100).toFixed(2)
    : null;

  const modes = [
    { id: "basic", label: "% of a number" },
    { id: "change", label: "% change" },
    { id: "of", label: "What % is X of Y" },
  ];

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">← Home</Link>
          <span className="text-gray-200">/</span>
          <Link href="/calculators" className="text-gray-400 hover:text-gray-600 text-sm">Calculators</Link>
          <span className="text-gray-200">/</span>
          <span className="text-sm font-medium text-gray-900">Percentage</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Percentage Calculator</h1>
          <p className="text-gray-500">Calculate percentages instantly. Free, no signup required.</p>
        </div>

        {/* Mode tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {modes.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                mode === m.id
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Basic: X% of Y */}
        {mode === "basic" && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <p className="text-sm text-gray-600 mb-4">What is <strong>X%</strong> of <strong>Y</strong>?</p>
            <div className="flex items-center gap-3 flex-wrap mb-6">
              <input
                type="number"
                placeholder="X"
                value={basicVal.percent}
                onChange={(e) => setBasicVal(v => ({ ...v, percent: e.target.value }))}
                className="w-28 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <span className="text-gray-500 text-sm">% of</span>
              <input
                type="number"
                placeholder="Y"
                value={basicVal.number}
                onChange={(e) => setBasicVal(v => ({ ...v, number: e.target.value }))}
                className="w-28 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            {basicResult && (
              <div className="bg-white rounded-xl p-4 border border-blue-200 text-center">
                <div className="text-xs text-gray-400 mb-1">Result</div>
                <div className="text-4xl font-bold text-blue-600">{basicResult}</div>
                <div className="text-sm text-gray-500 mt-1">{basicVal.percent}% of {basicVal.number} = {basicResult}</div>
              </div>
            )}
          </div>
        )}

        {/* Change: from X to Y */}
        {mode === "change" && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <p className="text-sm text-gray-600 mb-4">Percentage <strong>increase or decrease</strong> from X to Y</p>
            <div className="flex items-center gap-3 flex-wrap mb-6">
              <input
                type="number"
                placeholder="From"
                value={changeVal.from}
                onChange={(e) => setChangeVal(v => ({ ...v, from: e.target.value }))}
                className="w-28 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <span className="text-gray-500 text-sm">→</span>
              <input
                type="number"
                placeholder="To"
                value={changeVal.to}
                onChange={(e) => setChangeVal(v => ({ ...v, to: e.target.value }))}
                className="w-28 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            {changeResult && (
              <div className="bg-white rounded-xl p-4 border border-blue-200 text-center">
                <div className="text-xs text-gray-400 mb-1">{parseFloat(changeResult) >= 0 ? "Increase" : "Decrease"}</div>
                <div className={`text-4xl font-bold ${parseFloat(changeResult) >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {changeResult}%
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {changeVal.from} → {changeVal.to} = {changeResult}% {parseFloat(changeResult) >= 0 ? "increase" : "decrease"}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Of: X is what % of Y */}
        {mode === "of" && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <p className="text-sm text-gray-600 mb-4">What percentage is <strong>X</strong> of <strong>Y</strong>?</p>
            <div className="flex items-center gap-3 flex-wrap mb-6">
              <input
                type="number"
                placeholder="X"
                value={ofVal.part}
                onChange={(e) => setOfVal(v => ({ ...v, part: e.target.value }))}
                className="w-28 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <span className="text-gray-500 text-sm">is what % of</span>
              <input
                type="number"
                placeholder="Y"
                value={ofVal.whole}
                onChange={(e) => setOfVal(v => ({ ...v, whole: e.target.value }))}
                className="w-28 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            {ofResult && (
              <div className="bg-white rounded-xl p-4 border border-blue-200 text-center">
                <div className="text-xs text-gray-400 mb-1">Result</div>
                <div className="text-4xl font-bold text-blue-600">{ofResult}%</div>
                <div className="text-sm text-gray-500 mt-1">{ofVal.part} is {ofResult}% of {ofVal.whole}</div>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-blue-900 mb-2">How to use</h2>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Choose the type of percentage calculation above</li>
            <li>• Enter your numbers and the result appears instantly</li>
            <li>• No button to click — results update as you type</li>
          </ul>
        </div>
      </div>
    </main>
  );
}