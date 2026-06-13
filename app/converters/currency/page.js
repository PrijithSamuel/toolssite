"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FAQ from "../../components/FAQ";

const FAQS = [
  { q: "How current are the exchange rates?", a: "The rates shown are approximate reference rates and may differ from live bank or market rates. For financial transactions always use your bank or a live rate service." },
  { q: "Which currencies are supported?", a: "20 major world currencies including USD, EUR, GBP, INR, AUD, CAD, SGD, AED, JPY, CHF, CNY, MYR, NZD, HKD, SAR, KWD, QAR, THB, ZAR and MXN." },
  { q: "How do I swap the currencies?", a: "Click the swap button between the two currency dropdowns to instantly reverse the conversion direction." },
  { q: "Can I convert between any two currencies?", a: "Yes. Select any currency in the From dropdown and any currency in the To dropdown." },
  { q: "Why might the rate differ from my bank?", a: "Banks and exchange services add a margin to the mid-market rate. Our calculator shows the mid-market reference rate without any margin." },
];

const rates = {
  USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.12, AUD: 1.53,
  CAD: 1.36, SGD: 1.34, AED: 3.67, JPY: 149.50, CHF: 0.90,
  CNY: 7.24, MYR: 4.72, NZD: 1.63, HKD: 7.82, SAR: 3.75,
  KWD: 0.31, QAR: 3.64, THB: 35.12, ZAR: 18.63, MXN: 17.15,
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

const introStyle = { background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "24px", fontSize: "14px", color: "#4B5563", lineHeight: "1.8" };
const card = { background:"white", border:"0.5px solid #E0E7FF", borderRadius:"12px", padding:"18px", marginBottom:"16px" };
const wrap = { maxWidth:"600px", margin:"0 auto", padding:"0 24px 20px" };

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
  function swap() { setFrom(to); setTo(from); }
  const currencies = Object.keys(rates);
  const selectStyle = { width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", fontSize: "14px", outline: "none", background: "white", color: "#374151" };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Converters", href: "/converters" }, { label: "Currency Converter" }]} />
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Currency Converter</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Convert between 20 world currencies. Free, no signup required.</p>
        </div>

        <div style={introStyle}>
          Currency conversion is needed for international travel, online shopping from foreign retailers, freelance invoicing in different currencies, and investment tracking. This converter supports 20 major world currencies including US Dollar, Euro, British Pound, Indian Rupee, Australian Dollar, Canadian Dollar, Singapore Dollar, UAE Dirham, Japanese Yen, and Swiss Franc. The rates shown are approximate mid-market reference rates — real exchange rates from banks and currency exchange services include a margin on top of these rates. For financial transactions, always verify the current rate with your bank or payment provider before converting.
        </div>

        <div style={{ background:"#FFFBEB", border:"0.5px solid #FDE68A", borderRadius:"10px", padding:"12px 16px", marginBottom:"16px", fontSize:"13px", color:"#92400E" }}>
          These are approximate mid-market reference rates. Bank and exchange rates will differ. For financial transactions always confirm the current rate with your bank or payment provider.
        </div>

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", display: "block", marginBottom: "6px" }}>AMOUNT</label>
            <input type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} style={selectStyle} />
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", display: "block", marginBottom: "6px" }}>FROM</label>
              <select value={from} onChange={(e) => setFrom(e.target.value)} style={selectStyle}>
                {currencies.map((c) => <option key={c} value={c}>{flags[c]} {c} — {names[c]}</option>)}
              </select>
            </div>
            <button type="button" onClick={swap}
              style={{ padding: "10px 14px", border: "0.5px solid #C7D2FE", borderRadius: "8px", background: "white", cursor: "pointer", fontSize: "18px", marginBottom: "1px" }}>
              ⇄
            </button>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", display: "block", marginBottom: "6px" }}>TO</label>
              <select value={to} onChange={(e) => setTo(e.target.value)} style={selectStyle}>
                {currencies.map((c) => <option key={c} value={c}>{flags[c]} {c} — {names[c]}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: "white", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "20px", textAlign: "center" }}>
              <div style={{ fontSize: "12px", color: "#9CA3AF", marginBottom: "6px" }}>{amount} {names[from]} =</div>
              <div style={{ fontSize: "40px", fontWeight: "500", color: "#4F46E5" }}>{flags[to]} {result}</div>
              <div style={{ fontSize: "14px", color: "#6B7280", marginTop: "4px" }}>{names[to]}</div>
              <div style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "8px" }}>1 {from} = {convert(1, from, to)} {to}</div>
            </div>
          )}
        </div>

        <div style={{ marginTop: "12px", background: "#FEF9C3", border: "0.5px solid #FDE68A", borderRadius: "10px", padding: "12px 16px" }}>
          <p style={{ fontSize: "12px", color: "#713F12" }}>⚠️ Rates are approximate and for reference only. Check your bank for live rates.</p>
        </div>
      </div>
      <div style={wrap}>
        <div style={card}>
          <p style={{ fontSize:"13px", color:"#4B5563", lineHeight:"1.8", marginBottom:"10px" }}>An exchange rate tells you how much of one currency you receive in exchange for one unit of another. The mid-market rate is the midpoint between buy and sell prices that banks trade at with each other. When you exchange money at a bank or airport you will receive a worse rate because the service provider keeps a margin on top of the mid-market rate.</p>
          <p style={{ fontSize:"13px", color:"#4B5563", lineHeight:"1.8", margin:0 }}>Exchange rates fluctuate continuously based on international trade flows, interest rate decisions by central banks, inflation expectations, and investor sentiment. Major currency pairs such as EUR/USD and GBP/USD are among the most actively traded instruments in the world. For everyday purposes such as travel budgeting or international online shopping, the mid-market reference rate is a useful guide — always confirm the live rate with your bank before completing a financial transaction.</p>
        </div>
      </div>
      <FAQ faqs={FAQS} />
      <Footer />
    </main>
  );
}