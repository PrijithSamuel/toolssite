"use client";

import { useState } from "react";
import Link from "next/link";

const rates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.12,
  AUD: 1.53,
  CAD: 1.36,
  SGD: 1.34,
  AED: 3.67,
  JPY: 149.50,
  CHF: 0.90,
  CNY: 7.24,
  MYR: 4.72,
  NZD: 1.63,
  HKD: 7.82,
  SAR: 3.75,
  KWD: 0.31,
  QAR: 3.64,
  THB: 35.12,
  ZAR: 18.63,
  MXN: 17.15,
};

const flags = {
  USD: "🇺🇸", EUR: "🇪🇺", GBP: "🇬🇧", INR: "🇮🇳", AUD: "🇦🇺",
  CAD: "🇨🇦", SGD: "🇸🇬", AED: "🇦🇪", JPY: "🇯🇵", CHF: "🇨🇭",
  CNY: "🇨🇳", MYR: "🇲🇾", NZD: "🇳🇿", HKD: "🇭🇰", SAR: "🇸🇦",
  KWD: "🇰🇼", QAR: "🇶🇦", THB: "🇹🇭", ZAR: "🇿🇦", MXN: "🇲🇽",
};

const names = {
  USD: "US Dollar", EUR: "Euro", GBP: "British Pound", INR: "Indian Rupee",
  AUD: "Australian Dollar", CAD: "Canadian Dollar", SGD: "Singapore Dollar",
  AED: "UAE Dirham", JPY: "Japanese Yen", CHF: "Swiss Franc",
  CNY: "Chinese Yuan", MYR: "Malaysian Ringgit", NZD: "New Zealand Dollar",
  HKD: "Hong Kong Dollar", SAR: "Saudi Riyal", KWD: "Kuwaiti Dinar",
  QAR: "Qatari Riyal", THB: "Thai Baht", ZAR: "South African Rand",
  MXN: "Mexican Peso",
};

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");

  function convert(val, f, t) {
    const v = parseFloat(val);
    if (isNaN(v)) return "";
    return ((v / rates[f]) * rates[t]).toFixed(2);
  }

  const result = convert(amount, from, to);

  function swap() {
    setFrom(to);
    setTo(from);
  }

  const currencies = Object.keys(rates);

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">← Home</Link>
          <span className="text-gray-200">/</span>
          <Link href="/converters" className="text-gray-400 hover:text-gray-600 text-sm">Converters</Link>
          <span className="text-gray-200">/</span>
          <span className="text-sm font-medium text-gray-900">Currency Converter</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Currency Converter</h1>
          <p className="text-gray-500">Convert between 20 world currencies. Free, no signup required.</p>
        </div>

        <div className="bg-green-50 border border-green-100 rounded-xl p-6 space-y-4">
          {/* Amount */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>

          {/* From / Swap / To */}
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">From</label>
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-200"
              >
                {currencies.map((c) => (
                  <option key={c} value={c}>{flags[c]} {c} — {names[c]}</option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={swap}
              className="mb-0.5 px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-500 hover:bg-gray-50 text-lg"
            >
              ⇄
            </button>
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">To</label>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-200"
              >
                {currencies.map((c) => (
                  <option key={c} value={c}>{flags[c]} {c} — {names[c]}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Result */}
          {result && (
            <div className="bg-white border border-green-200 rounded-xl p-5 text-center">
              <div className="text-xs text-gray-400 mb-1">
                {amount} {names[from]} =
              </div>
              <div className="text-4xl font-bold text-green-600">
                {flags[to]} {result}
              </div>
              <div className="text-sm text-gray-500 mt-1">{names[to]}</div>
              <div className="text-xs text-gray-400 mt-3">
                1 {from} = {convert(1, from, to)} {to}
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 bg-yellow-50 border border-yellow-100 rounded-xl p-4">
          <p className="text-xs text-yellow-700">⚠️ Rates are approximate and for reference only. For live rates check your bank or a financial service.</p>
        </div>

        <div className="mt-6 bg-green-50 border border-green-100 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-green-900 mb-2">How to use</h2>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Enter an amount and select currencies</li>
            <li>• Result updates instantly as you type</li>
            <li>• Use ⇄ to swap currencies quickly</li>
          </ul>
        </div>
      </div>
    </main>
  );
}