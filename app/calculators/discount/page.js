"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function DiscountCalculator() {
  const [price, setPrice] = useState("");
  const [discountStr, setDiscountStr] = useState("");

  const priceNum = parseFloat(price) || 0;
  const discountNum = parseFloat(discountStr) || 0;
  const discountAmount = (priceNum * discountNum) / 100;
  const finalPrice = Math.max(0, priceNum - discountAmount);

  function setQuickDiscount(pct) {
    setDiscountStr(String(pct));
  }

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Calculators", href: "/calculators" }, { label: "Discount Calculator" }]} />
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Discount Calculator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Find out how much you save with any discount percentage.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>Original Price ($)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              min="0"
              style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }}
            />
          </div>

          <div>
            <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "8px" }}>Discount Percentage</label>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
              {[10, 20, 25, 30, 50, 70].map((pct) => (
                <button
                  key={pct}
                  onClick={() => setQuickDiscount(pct)}
                  style={{ padding: "7px 14px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: discountStr === String(pct) ? "#4F46E5" : "white", color: discountStr === String(pct) ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}
                >
                  {pct}%
                </button>
              ))}
            </div>
            <input
              type="number"
              value={discountStr}
              onChange={(e) => setDiscountStr(e.target.value)}
              placeholder="Enter custom %"
              min="0"
              max="100"
              style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "14px", boxSizing: "border-box" }}
            />
          </div>
        </div>

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "500", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Discount Amount</div>
              <div style={{ fontSize: "36px", fontWeight: "500", color: "#EF4444" }}>${discountAmount.toFixed(2)}</div>
            </div>
            <div style={{ textAlign: "center", borderLeft: "1px solid #C7D2FE", borderRight: "1px solid #C7D2FE" }}>
              <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "500", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Final Price</div>
              <div style={{ fontSize: "36px", fontWeight: "500", color: "#4F46E5" }}>${finalPrice.toFixed(2)}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "500", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Money Saved</div>
              <div style={{ fontSize: "36px", fontWeight: "500", color: "#10B981" }}>${discountAmount.toFixed(2)}</div>
            </div>
          </div>
          {priceNum > 0 && discountNum > 0 && (
            <div style={{ textAlign: "center", marginTop: "16px", fontSize: "13px", color: "#6B7280" }}>
              You save <strong style={{ color: "#10B981" }}>{discountNum}%</strong> off the original price of <strong style={{ color: "#374151" }}>${priceNum.toFixed(2)}</strong>
            </div>
          )}
        </div>

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px", marginTop: "16px" }}>
          <div style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>How to use</div>
          <ul style={{ fontSize: "13px", color: "#6B7280", paddingLeft: "16px", margin: 0 }}>
            <li style={{ marginBottom: "4px" }}>Enter the original price of the item</li>
            <li style={{ marginBottom: "4px" }}>Click a quick discount button or type a custom percentage</li>
            <li>See the final price and how much you save instantly</li>
          </ul>
        </div>
      </div>
      <Footer />
    </main>
  );
}
