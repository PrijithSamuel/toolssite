"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Approximate rates as of May 2024
const CURRENCIES = [
  { code: "EUR", name: "Euro", flag: "🇪🇺", rate: 1 },
  { code: "USD", name: "US Dollar", flag: "🇺🇸", rate: 1.083 },
  { code: "GBP", name: "British Pound", flag: "🇬🇧", rate: 0.855 },
  { code: "CHF", name: "Swiss Franc", flag: "🇨🇭", rate: 0.963 },
  { code: "DKK", name: "Danish Krone", flag: "🇩🇰", rate: 7.461 },
  { code: "NOK", name: "Norwegian Krone", flag: "🇳🇴", rate: 11.65 },
  { code: "SEK", name: "Swedish Krona", flag: "🇸🇪", rate: 11.32 },
  { code: "PLN", name: "Polish Złoty", flag: "🇵🇱", rate: 4.256 },
  { code: "CZK", name: "Czech Koruna", flag: "🇨🇿", rate: 25.10 },
  { code: "HUF", name: "Hungarian Forint", flag: "🇭🇺", rate: 393.0 },
];

function fmt(n, decimals = 2) {
  if (n >= 100) return n.toLocaleString("fr-FR", { maximumFractionDigits: 0 });
  return n.toLocaleString("fr-FR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export default function EuroConverter() {
  const [amount, setAmount] = useState("100");
  const [fromCurrency, setFromCurrency] = useState("EUR");

  const amountNum = parseFloat(amount) || 0;
  const fromRate = CURRENCIES.find((c) => c.code === fromCurrency)?.rate || 1;
  const amountInEUR = amountNum / fromRate;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Converters", href: "/converters" }, { label: "Euro Converter" }]} />
      <div style={{ maxWidth: "620px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Euro Converter</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Convert between EUR and major European currencies instantly.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
          <div style={{ display: "flex", gap: "10px" }}>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="100" style={{ flex: 1, border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "12px 14px", outline: "none", background: "white", fontSize: "20px", boxSizing: "border-box" }} />
            <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} style={{ border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "14px", cursor: "pointer" }}>
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
          {CURRENCIES.map((currency) => {
            const converted = amountInEUR * currency.rate;
            const isFrom = currency.code === fromCurrency;
            return (
              <div key={currency.code} style={{ background: isFrom ? "#EEF2FF" : "white", border: `0.5px solid ${isFrom ? "#A5B4FC" : "#E0E7FF"}`, borderRadius: "10px", padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "22px" }}>{currency.flag}</span>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: "500", color: isFrom ? "#4F46E5" : "#374151" }}>{currency.code}</div>
                    <div style={{ fontSize: "11px", color: "#9CA3AF" }}>{currency.name}</div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "20px", fontWeight: "500", color: isFrom ? "#4F46E5" : "#1E1B4B" }}>
                    {amountNum > 0 ? fmt(converted) : "—"}
                  </div>
                  <div style={{ fontSize: "10px", color: "#9CA3AF" }}>1 EUR = {fmt(currency.rate, 4)} {currency.code}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "12px 16px", fontSize: "11px", color: "#9CA3AF" }}>
          ⚠️ Rates are approximate and for reference only. Last updated: May 2024. For real-time rates, use a bank or financial service.
        </div>
      </div>
      <Footer />
    </main>
  );
}
