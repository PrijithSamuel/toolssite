"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const frequencies = [
  { label: "Daily", value: 365 },
  { label: "Monthly", value: 12 },
  { label: "Quarterly", value: 4 },
  { label: "Yearly", value: 1 },
];

function fmt(n) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function CompoundInterest() {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("7");
  const [freq, setFreq] = useState(12);
  const [years, setYears] = useState("10");

  const P = parseFloat(principal) || 0;
  const r = parseFloat(rate) || 0;
  const t = parseInt(years) || 0;
  const n = freq;

  const finalAmount = t > 0 ? P * Math.pow(1 + r / 100 / n, n * t) : P;
  const interest = finalAmount - P;
  const growthPct = P > 0 ? ((finalAmount - P) / P) * 100 : 0;

  // Year-by-year data for chart
  const chartYears = Math.min(t, 30);
  const chartData = Array.from({ length: chartYears }, (_, i) => {
    const yr = i + 1;
    return P * Math.pow(1 + r / 100 / n, n * yr);
  });
  const maxVal = chartData[chartData.length - 1] || finalAmount || 1;

  const inp = { border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "15px", width: "100%", boxSizing: "border-box" };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "Compound Interest" }]} />
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Compound Interest Calculator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>See how your investment grows over time with compound interest.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>Principal ($)</label>
              <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="10,000" style={inp} />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>Annual Rate (%)</label>
              <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} step="0.1" placeholder="7" style={inp} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "8px" }}>Compound Frequency</label>
              <div style={{ display: "flex", gap: "6px" }}>
                {frequencies.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setFreq(f.value)}
                    style={{ flex: 1, padding: "8px 4px", borderRadius: "7px", border: "0.5px solid #C7D2FE", background: freq === f.value ? "#4F46E5" : "white", color: freq === f.value ? "white" : "#374151", fontSize: "11px", cursor: "pointer", fontWeight: "500" }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>Time Period (Years)</label>
              <input type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="10" min="1" max="50" style={inp} />
            </div>
          </div>
        </div>

        {P > 0 && t > 0 && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "500", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Final Amount</div>
                  <div style={{ fontSize: "32px", fontWeight: "500", color: "#4F46E5" }}>${fmt(finalAmount)}</div>
                </div>
                <div style={{ textAlign: "center", borderLeft: "1px solid #C7D2FE", borderRight: "1px solid #C7D2FE" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "500", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Interest Earned</div>
                  <div style={{ fontSize: "32px", fontWeight: "500", color: "#10B981" }}>${fmt(interest)}</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "500", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Total Growth</div>
                  <div style={{ fontSize: "32px", fontWeight: "500", color: "#4F46E5" }}>{growthPct.toFixed(1)}%</div>
                </div>
              </div>
            </div>

            {/* Growth Chart */}
            {chartData.length > 1 && (
              <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px" }}>
                <div style={{ fontSize: "13px", fontWeight: "500", color: "#1E1B4B", marginBottom: "16px" }}>Growth Over Time</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "140px" }}>
                  {chartData.map((val, idx) => {
                    const h = Math.round((val / maxVal) * 120);
                    const isLast = idx === chartData.length - 1;
                    return (
                      <div key={idx} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                        <div
                          title={`Year ${idx + 1}: $${fmt(val)}`}
                          style={{ width: "100%", height: `${h}px`, background: isLast ? "#4F46E5" : "#A5B4FC", borderRadius: "4px 4px 0 0", transition: "height 0.3s", minHeight: "4px" }}
                        />
                        {(idx === 0 || (idx + 1) % Math.ceil(chartData.length / 5) === 0 || isLast) && (
                          <div style={{ fontSize: "10px", color: "#9CA3AF" }}>Yr{idx + 1}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontSize: "12px", color: "#6B7280" }}>
                  <span>Start: <strong style={{ color: "#4F46E5" }}>${fmt(P)}</strong></span>
                  <span>End: <strong style={{ color: "#4F46E5" }}>${fmt(finalAmount)}</strong></span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
