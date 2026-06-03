"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function calcDiff(d1str, d2str) {
  const a = new Date(d1str + "T00:00:00");
  const b = new Date(d2str + "T00:00:00");
  const diff = Math.abs(b - a);
  const days = Math.floor(diff / 86400000);
  const weeks = Math.floor(days / 7);
  const hours = days * 24;
  const minutes = hours * 60;
  const seconds = minutes * 60;

  const [start, end] = a <= b ? [a, b] : [b, a];
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  if (months < 0) { years--; months += 12; }

  return {
    days, weeks, hours, minutes, seconds, years, months: years * 12 + months,
    startDay: DAYS[a.getDay()],
    endDay: DAYS[b.getDay()],
    isSame: days === 0,
  };
}

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function DateDifference() {
  const [d1, setD1] = useState(today());
  const [d2, setD2] = useState(today());

  const result = d1 && d2 ? calcDiff(d1, d2) : null;

  const inp = { width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "15px", boxSizing: "border-box" };

  function StatBox({ value, label, color = "#4F46E5" }) {
    return (
      <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "10px", padding: "14px", textAlign: "center" }}>
        <div style={{ fontSize: "28px", fontWeight: "500", color }}>{value.toLocaleString()}</div>
        <div style={{ fontSize: "11px", color: "#6B7280", marginTop: "2px" }}>{label}</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Date Tools", href: "/date-tools" }, { label: "Date Difference" }]} />
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Date Difference Calculator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Find the exact difference between any two dates.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "12px", alignItems: "end" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "5px" }}>Start Date</label>
              <input type="date" value={d1} onChange={(e) => setD1(e.target.value)} style={inp} />
              {d1 && <div style={{ fontSize: "11px", color: "#6366F1", marginTop: "3px" }}>{DAYS[new Date(d1 + "T00:00:00").getDay()]}</div>}
            </div>
            <button onClick={() => { const tmp = d1; setD1(d2); setD2(tmp); }} style={{ padding: "10px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: "white", fontSize: "18px", cursor: "pointer", marginBottom: d1 ? "14px" : "0" }}>⇄</button>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "5px" }}>End Date</label>
              <input type="date" value={d2} onChange={(e) => setD2(e.target.value)} style={inp} />
              {d2 && <div style={{ fontSize: "11px", color: "#6366F1", marginTop: "3px" }}>{DAYS[new Date(d2 + "T00:00:00").getDay()]}</div>}
            </div>
          </div>
        </div>

        {result && !result.isSame && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "20px", marginBottom: "16px", textAlign: "center" }}>
              <div style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Total Difference</div>
              <div style={{ fontSize: "48px", fontWeight: "300", color: "#4F46E5" }}>{result.days.toLocaleString()}</div>
              <div style={{ fontSize: "16px", color: "#6B7280" }}>days</div>
              <div style={{ fontSize: "13px", color: "#6B7280", marginTop: "6px" }}>
                {result.years > 0 ? `${result.years} year${result.years !== 1 ? "s" : ""}, ` : ""}
                {result.months % 12 > 0 ? `${result.months % 12} month${result.months % 12 !== 1 ? "s" : ""}, ` : ""}
                {result.days % 7 > 0 ? `${result.days % 7} day${result.days % 7 !== 1 ? "s" : ""}` : ""}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
              <StatBox value={result.weeks} label="Weeks" />
              <StatBox value={result.hours} label="Hours" color="#10B981" />
              <StatBox value={result.minutes} label="Minutes" color="#F59E0B" />
            </div>
          </>
        )}

        {result && result.isSame && (
          <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "20px", textAlign: "center", fontSize: "16px", color: "#4F46E5", fontWeight: "500" }}>
            Same date! 📅
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
