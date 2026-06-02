"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function TipCalculator() {
  const [bill, setBill] = useState("");
  const [tipPct, setTipPct] = useState(15);
  const [people, setPeople] = useState(1);

  const billNum = parseFloat(bill) || 0;
  const tipAmount = (billNum * tipPct) / 100;
  const total = billNum + tipAmount;
  const perPerson = people > 0 ? total / people : 0;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Calculators", href: "/calculators" }, { label: "Tip Calculator" }]} />
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Tip Calculator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate tip and split the bill between multiple people.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>Bill Amount ($)</label>
            <input
              type="number"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              placeholder="0.00"
              min="0"
              style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "8px" }}>Tip Percentage</label>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "14px" }}>
              {[10, 15, 18, 20, 25].map((pct) => (
                <button
                  key={pct}
                  onClick={() => setTipPct(pct)}
                  style={{ padding: "7px 16px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: tipPct === pct ? "#4F46E5" : "white", color: tipPct === pct ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}
                >
                  {pct}%
                </button>
              ))}
            </div>
            <input
              type="range"
              min="0"
              max="30"
              value={tipPct}
              onChange={(e) => setTipPct(parseInt(e.target.value))}
              style={{ width: "100%", accentColor: "#4F46E5" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#6B7280", marginTop: "4px" }}>
              <span>0%</span>
              <span style={{ fontWeight: "600", color: "#4F46E5" }}>{tipPct}%</span>
              <span>30%</span>
            </div>
          </div>

          <div>
            <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "8px" }}>Number of People</label>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <button
                onClick={() => setPeople(Math.max(1, people - 1))}
                style={{ width: "36px", height: "36px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: "white", fontSize: "20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#374151" }}
              >−</button>
              <span style={{ fontSize: "20px", fontWeight: "500", color: "#1E1B4B", minWidth: "40px", textAlign: "center" }}>{people}</span>
              <button
                onClick={() => setPeople(people + 1)}
                style={{ width: "36px", height: "36px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: "white", fontSize: "20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#374151" }}
              >+</button>
            </div>
          </div>
        </div>

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "500", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Tip Amount</div>
              <div style={{ fontSize: "36px", fontWeight: "500", color: "#4F46E5" }}>${tipAmount.toFixed(2)}</div>
            </div>
            <div style={{ textAlign: "center", borderLeft: "1px solid #C7D2FE", borderRight: "1px solid #C7D2FE" }}>
              <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "500", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Per Person</div>
              <div style={{ fontSize: "36px", fontWeight: "500", color: "#4F46E5" }}>${perPerson.toFixed(2)}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "500", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Total Amount</div>
              <div style={{ fontSize: "36px", fontWeight: "500", color: "#4F46E5" }}>${total.toFixed(2)}</div>
            </div>
          </div>
        </div>

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px", marginTop: "16px" }}>
          <div style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>How to use</div>
          <ul style={{ fontSize: "13px", color: "#6B7280", paddingLeft: "16px", margin: 0 }}>
            <li style={{ marginBottom: "4px" }}>Enter the total bill amount</li>
            <li style={{ marginBottom: "4px" }}>Select a quick tip % or drag the slider</li>
            <li>Set the number of people to split the bill</li>
          </ul>
        </div>
      </div>
      <Footer />
    </main>
  );
}
