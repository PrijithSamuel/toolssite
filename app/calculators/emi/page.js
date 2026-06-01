"use client";

import { useState } from "react";
import Link from "next/link";

export const metadata = {
  title: "EMI Calculator — Calculate Loan EMI Online Free",
  description: "Calculate your loan EMI, total interest and payment breakdown instantly. Free EMI calculator, no signup required.",
};

export default function EMICalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [tenureType, setTenureType] = useState("years");

  function calcEMI() {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 12 / 100;
    const n = tenureType === "years" ? parseFloat(tenure) * 12 : parseFloat(tenure);
    if (!p || !r || !n) return null;
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;
    return {
      emi: emi.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      months: n,
    };
  }

  const result = calcEMI();

  function fmt(num) {
    return parseFloat(num).toLocaleString("en-IN", { maximumFractionDigits: 2 });
  }

  const interestPercent = result
    ? ((parseFloat(result.totalInterest) / parseFloat(result.totalPayment)) * 100).toFixed(1)
    : 0;
  const principalPercent = result ? (100 - parseFloat(interestPercent)).toFixed(1) : 0;

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">← Home</Link>
          <span className="text-gray-200">/</span>
          <Link href="/calculators" className="text-gray-400 hover:text-gray-600 text-sm">Calculators</Link>
          <span className="text-gray-200">/</span>
          <span className="text-sm font-medium text-gray-900">EMI Calculator</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">EMI Calculator</h1>
          <p className="text-gray-500">Calculate your loan EMI, total interest and payment breakdown instantly.</p>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6 space-y-4">

          {/* Principal */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount (₹)</label>
            <input
              type="number"
              placeholder="e.g. 1000000"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
            />
          </div>

          {/* Interest rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Annual Interest Rate (%)</label>
            <input
              type="number"
              placeholder="e.g. 8.5"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
            />
          </div>

          {/* Tenure */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Loan Tenure</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder={tenureType === "years" ? "e.g. 20" : "e.g. 240"}
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
              />
              <div className="flex rounded-lg border border-gray-200 overflow-hidden">
                {["years", "months"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTenureType(t)}
                    className={`px-3 py-2 text-sm font-medium transition-colors capitalize ${
                      tenureType === t
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {result && (
          <div className="space-y-4">
            {/* EMI result */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <div className="text-xs text-gray-400 mb-1">Monthly EMI</div>
              <div className="text-4xl font-bold text-green-600">₹{fmt(result.emi)}</div>
              <div className="text-sm text-gray-500 mt-1">for {result.months} months</div>
            </div>

            {/* Breakdown */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                <div className="text-xs text-gray-400 mb-1">Principal Amount</div>
                <div className="text-xl font-bold text-gray-900">₹{fmt(principal)}</div>
                <div className="text-xs text-gray-400 mt-1">{principalPercent}% of total</div>
              </div>
              <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center">
                <div className="text-xs text-gray-400 mb-1">Total Interest</div>
                <div className="text-xl font-bold text-red-600">₹{fmt(result.totalInterest)}</div>
                <div className="text-xs text-gray-400 mt-1">{interestPercent}% of total</div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
              <div className="text-xs text-gray-400 mb-1">Total Payment</div>
              <div className="text-2xl font-bold text-blue-600">₹{fmt(result.totalPayment)}</div>
            </div>

            {/* Visual bar */}
            <div>
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Principal {principalPercent}%</span>
                <span>Interest {interestPercent}%</span>
              </div>
              <div className="h-4 rounded-full overflow-hidden bg-red-200">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${principalPercent}%` }}
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-blue-900 mb-2">How to use</h2>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Enter your loan amount, interest rate and tenure</li>
            <li>• Monthly EMI and full breakdown appear instantly</li>
            <li>• Switch between years and months for tenure</li>
          </ul>
        </div>
      </div>
    </main>
  );
}