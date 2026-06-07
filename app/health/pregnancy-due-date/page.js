"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function diffDays(a, b) {
  return Math.round((b - a) / 86400000);
}

function formatDate(d) {
  return d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

function formatDateShort(d) {
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function toInputVal(d) {
  return d.toISOString().slice(0, 10);
}

const MILESTONES = [
  { week: 6, label: "Heartbeat detectable" },
  { week: 12, label: "End of first trimester" },
  { week: 20, label: "Anatomy scan" },
  { week: 24, label: "Viability milestone" },
  { week: 37, label: "Full term" },
  { week: 40, label: "Due date" },
];

function getTrimester(week) {
  if (week <= 12) return { num: 1, label: "First Trimester", color: "#3B82F6", bg: "#EFF6FF", border: "#BFDBFE" };
  if (week <= 26) return { num: 2, label: "Second Trimester", color: "#10B981", bg: "#ECFDF5", border: "#6EE7B7" };
  return { num: 3, label: "Third Trimester", color: "#8B5CF6", bg: "#F5F3FF", border: "#C4B5FD" };
}

const today = new Date();
today.setHours(0, 0, 0, 0);

const defaultLmp = toInputVal(addDays(today, -70));
const defaultDue = toInputVal(addDays(today, 100));

export default function PregnancyDueDate() {
  const [tab, setTab] = useState("lmp"); // lmp | due
  const [lmpVal, setLmpVal] = useState(defaultLmp);
  const [dueVal, setDueVal] = useState(defaultDue);

  // Compute from LMP
  const lmpDate = lmpVal ? new Date(lmpVal + "T00:00:00") : null;
  const dueFromLmp = lmpDate ? addDays(lmpDate, 280) : null;

  // Compute from due date
  const dueDate2 = dueVal ? new Date(dueVal + "T00:00:00") : null;
  const lmpFromDue = dueDate2 ? addDays(dueDate2, -280) : null;

  const lmp = tab === "lmp" ? lmpDate : lmpFromDue;
  const due = tab === "lmp" ? dueFromLmp : dueDate2;

  const daysSinceLmp = lmp ? diffDays(lmp, today) : 0;
  const currentWeek = lmp ? Math.max(0, Math.floor(daysSinceLmp / 7)) : 0;
  const currentDay = lmp ? daysSinceLmp % 7 : 0;
  const daysRemaining = due ? Math.max(0, diffDays(today, due)) : 0;
  const weeksRemaining = Math.floor(daysRemaining / 7);
  const daysRem = daysRemaining % 7;
  const trimester = currentWeek > 0 ? getTrimester(currentWeek) : null;
  const progressPct = Math.min(100, Math.max(0, (daysSinceLmp / 280) * 100));
  const isValid = lmp && due && daysSinceLmp >= 0 && daysSinceLmp <= 300;

  const btnActive = { padding: "9px 24px", borderRadius: "8px", border: "none", background: "#4F46E5", color: "white", fontSize: "14px", fontWeight: "500", cursor: "pointer" };
  const btnInactive = { padding: "9px 24px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: "white", color: "#4F46E5", fontSize: "14px", fontWeight: "500", cursor: "pointer" };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Health", href: "/health" }, { label: "Pregnancy Due Date" }]} />
      <div style={{ maxWidth: "660px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Pregnancy Due Date Calculator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Uses Naegele&apos;s rule (LMP + 280 days) — the standard medical method for estimating delivery date.</p>
        </div>

        {/* Tab toggle */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
          <button onClick={() => setTab("lmp")} style={tab === "lmp" ? btnActive : btnInactive}>From Last Period</button>
          <button onClick={() => setTab("due")} style={tab === "due" ? btnActive : btnInactive}>From Due Date</button>
        </div>

        {/* Input card */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          {tab === "lmp" ? (
            <>
              <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "8px" }}>
                First day of last menstrual period (LMP)
              </label>
              <input
                type="date"
                value={lmpVal}
                onChange={(e) => setLmpVal(e.target.value)}
                max={toInputVal(today)}
                style={{ border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "16px", width: "100%", boxSizing: "border-box" }}
              />
              {dueFromLmp && (
                <div style={{ marginTop: "12px", fontSize: "13px", color: "#6B7280" }}>
                  Estimated due date: <strong style={{ color: "#4F46E5" }}>{formatDateShort(dueFromLmp)}</strong>
                </div>
              )}
            </>
          ) : (
            <>
              <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "8px" }}>
                Enter your due date
              </label>
              <input
                type="date"
                value={dueVal}
                onChange={(e) => setDueVal(e.target.value)}
                style={{ border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "16px", width: "100%", boxSizing: "border-box" }}
              />
              {lmpFromDue && (
                <div style={{ marginTop: "12px", fontSize: "13px", color: "#6B7280" }}>
                  Estimated LMP: <strong style={{ color: "#4F46E5" }}>{formatDateShort(lmpFromDue)}</strong>
                </div>
              )}
            </>
          )}
        </div>

        {isValid && due && trimester && (
          <>
            {/* Due date hero */}
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "14px", textAlign: "center" }}>
              <div style={{ fontSize: "12px", fontWeight: "600", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>Estimated Due Date</div>
              <div style={{ fontSize: "26px", fontWeight: "700", color: "#4F46E5", marginBottom: "16px" }}>{formatDate(due)}</div>

              {/* Progress bar */}
              <div style={{ height: "10px", borderRadius: "5px", background: "#E5E7EB", overflow: "hidden", marginBottom: "8px" }}>
                <div style={{ height: "100%", width: `${progressPct}%`, background: trimester.color, borderRadius: "5px", transition: "width 0.4s" }} />
              </div>
              <div style={{ fontSize: "12px", color: "#9CA3AF" }}>{Math.round(progressPct)}% of pregnancy complete</div>
            </div>

            {/* Stats grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "14px" }}>
              <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px", textAlign: "center" }}>
                <div style={{ fontSize: "11px", color: "#6B7280", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "6px" }}>Current Week</div>
                <div style={{ fontSize: "32px", fontWeight: "700", color: "#4F46E5", lineHeight: 1 }}>{currentWeek}</div>
                <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "4px" }}>+ {currentDay} day{currentDay !== 1 ? "s" : ""}</div>
              </div>
              <div style={{ background: trimester.bg, border: `0.5px solid ${trimester.border}`, borderRadius: "12px", padding: "16px", textAlign: "center" }}>
                <div style={{ fontSize: "11px", color: trimester.color, fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "6px" }}>Trimester</div>
                <div style={{ fontSize: "32px", fontWeight: "700", color: trimester.color, lineHeight: 1 }}>{trimester.num}</div>
                <div style={{ fontSize: "11px", color: trimester.color, marginTop: "4px", opacity: 0.8 }}>{trimester.label}</div>
              </div>
              <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px", textAlign: "center" }}>
                <div style={{ fontSize: "11px", color: "#6B7280", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "6px" }}>Remaining</div>
                <div style={{ fontSize: "32px", fontWeight: "700", color: "#374151", lineHeight: 1 }}>{weeksRemaining}</div>
                <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "4px" }}>wks + {daysRem} day{daysRem !== 1 ? "s" : ""}</div>
              </div>
            </div>

            {/* Milestone timeline */}
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
              <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "600", color: "#374151", background: "#F8F9FF" }}>
                Milestone Timeline
              </div>
              <div style={{ padding: "8px 0" }}>
                {MILESTONES.map(({ week, label }) => {
                  const milestoneDate = addDays(lmp, week * 7);
                  const passed = currentWeek >= week;
                  const isCurrent = currentWeek < week && currentWeek >= week - 4;
                  return (
                    <div key={week} style={{ padding: "12px 20px", display: "flex", alignItems: "center", gap: "14px", borderBottom: "0.5px solid #F3F4F6" }}>
                      <div style={{
                        width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0,
                        background: passed ? "#4F46E5" : isCurrent ? "#EEF2FF" : "#F3F4F6",
                        border: isCurrent ? "2px solid #4F46E5" : "none",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "14px",
                      }}>
                        {passed ? <span style={{ color: "white" }}>✓</span> : <span style={{ fontSize: "11px", color: isCurrent ? "#4F46E5" : "#9CA3AF", fontWeight: "600" }}>{week}</span>}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "13px", fontWeight: "500", color: passed ? "#374151" : "#6B7280" }}>
                          Week {week} — {label}
                        </div>
                        <div style={{ fontSize: "12px", color: "#9CA3AF" }}>{formatDateShort(milestoneDate)}</div>
                      </div>
                      {isCurrent && <span style={{ fontSize: "11px", background: "#EEF2FF", color: "#4F46E5", borderRadius: "4px", padding: "2px 8px", fontWeight: "600" }}>Next</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Disclaimer */}
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "14px 18px", marginTop: "14px", fontSize: "12px", color: "#374151" }}>
              <strong style={{ color: "#4F46E5" }}>Note:</strong> This calculator provides an estimate only. Actual due dates may vary. Always consult your healthcare provider for medical advice.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
