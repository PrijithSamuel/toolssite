"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function getNextOccurrence(month, day) {
  const now = new Date();
  let year = now.getFullYear();
  const target = new Date(year, month - 1, day);
  if (target <= now) target.setFullYear(year + 1);
  return target.toISOString().slice(0, 10);
}

const PRESETS = [
  { label: "🎆 New Year", fn: () => `${new Date().getFullYear() + 1}-01-01` },
  { label: "🎄 Christmas", fn: () => getNextOccurrence(12, 25) },
  { label: "🎃 Halloween", fn: () => getNextOccurrence(10, 31) },
  { label: "💝 Valentine's", fn: () => getNextOccurrence(2, 14) },
  { label: "☘️ St. Patrick's", fn: () => getNextOccurrence(3, 17) },
  { label: "🦃 Thanksgiving", fn: () => { const y = new Date().getMonth() < 10 ? new Date().getFullYear() : new Date().getFullYear() + 1; const d = new Date(y, 10, 1); d.setDate(22 + (4 - d.getDay() + 7) % 7); return d.toISOString().slice(0, 10); } },
];

function calcDaysUntil(targetStr) {
  const now = new Date(); now.setHours(0, 0, 0, 0);
  const target = new Date(targetStr + "T00:00:00");
  const diff = target - now;
  if (diff < 0) return { days: Math.abs(Math.ceil(diff / 86400000)), past: true };
  const days = Math.ceil(diff / 86400000);
  const weeks = Math.floor(days / 7);
  let months = (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth());
  if (target.getDate() < now.getDate()) months--;
  const years = Math.floor(months / 12);
  const remMonths = months % 12;
  const dayOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][target.getDay()];
  return { days, weeks, months: Math.max(0, months), years, remMonths, dayOfWeek, past: false };
}

function todayStr() {
  const d = new Date(); d.setDate(d.getDate() + 30);
  return d.toISOString().slice(0, 10);
}

export default function DaysUntil() {
  const [target, setTarget] = useState(todayStr());

  const result = target ? calcDaysUntil(target) : null;
  const targetDate = target ? new Date(target + "T00:00:00") : null;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Date Tools", href: "/date-tools" }, { label: "Days Until" }]} />
      <div style={{ maxWidth: "540px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Days Until</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Count down to any date or upcoming event.</p>
        </div>

        {/* Quick presets */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
          {PRESETS.map((p) => (
            <button key={p.label} onClick={() => setTarget(p.fn())} style={{ padding: "7px 12px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: "white", color: "#374151", fontSize: "12px", cursor: "pointer", fontWeight: "500" }}>
              {p.label}
            </button>
          ))}
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
          <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>Target Date</label>
          <input type="date" value={target} onChange={(e) => setTarget(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "15px", boxSizing: "border-box" }} />
          {targetDate && <div style={{ fontSize: "12px", color: "#6366F1", marginTop: "4px" }}>
            {["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][targetDate.getDay()]}, {targetDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </div>}
        </div>

        {result && (
          <div style={{ background: result.past ? "#FFF5F5" : "#EEF2FF", border: `0.5px solid ${result.past ? "#FCA5A5" : "#C7D2FE"}`, borderRadius: "12px", padding: "28px", textAlign: "center", marginBottom: "16px" }}>
            {result.past ? (
              <>
                <div style={{ fontSize: "13px", color: "#EF4444", marginBottom: "4px" }}>This date has already passed</div>
                <div style={{ fontSize: "48px", fontWeight: "300", color: "#EF4444" }}>{result.days}</div>
                <div style={{ fontSize: "15px", color: "#EF4444" }}>days ago</div>
              </>
            ) : result.days === 0 ? (
              <div style={{ fontSize: "24px", fontWeight: "600", color: "#4F46E5" }}>🎉 Today!</div>
            ) : (
              <>
                <div style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Days Until</div>
                <div style={{ fontSize: "72px", fontWeight: "200", color: "#4F46E5", lineHeight: "1" }}>{result.days}</div>
                <div style={{ fontSize: "16px", color: "#6B7280", marginTop: "4px" }}>days</div>

                <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginTop: "16px", paddingTop: "16px", borderTop: "0.5px solid #C7D2FE" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "20px", fontWeight: "500", color: "#4F46E5" }}>{result.weeks}</div>
                    <div style={{ fontSize: "11px", color: "#9CA3AF" }}>Weeks</div>
                  </div>
                  {result.months > 0 && (
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "20px", fontWeight: "500", color: "#4F46E5" }}>{result.months}</div>
                      <div style={{ fontSize: "11px", color: "#9CA3AF" }}>Months</div>
                    </div>
                  )}
                  {result.years > 0 && (
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "20px", fontWeight: "500", color: "#4F46E5" }}>{result.years}</div>
                      <div style={{ fontSize: "11px", color: "#9CA3AF" }}>Years</div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
