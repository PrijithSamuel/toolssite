"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const CYCLE_MIN = 90;
const FALL_ASLEEP_MIN = 14;
const NUM_OPTIONS = 6;

function pad(n) {
  return String(n).padStart(2, "0");
}

function formatTime(date) {
  const h = date.getHours();
  const m = date.getMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${pad(h12)}:${pad(m)} ${ampm}`;
}

function addMinutes(date, mins) {
  return new Date(date.getTime() + mins * 60000);
}

function subMinutes(date, mins) {
  return new Date(date.getTime() - mins * 60000);
}

function buildWakeOptions(wakeTimeStr) {
  const [h, m] = wakeTimeStr.split(":").map(Number);
  const base = new Date();
  base.setHours(h, m, 0, 0);
  const options = [];
  for (let cycles = NUM_OPTIONS; cycles >= 1; cycles--) {
    const totalSleep = cycles * CYCLE_MIN;
    const bedtime = subMinutes(base, totalSleep + FALL_ASLEEP_MIN);
    options.push({ bedtime, cycles, totalSleep });
  }
  return options;
}

function buildSleepOptions(nowDate) {
  const options = [];
  for (let cycles = 1; cycles <= NUM_OPTIONS; cycles++) {
    const totalSleep = cycles * CYCLE_MIN;
    const wake = addMinutes(nowDate, totalSleep + FALL_ASLEEP_MIN);
    options.push({ wake, cycles, totalSleep });
  }
  return options;
}

function hoursLabel(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

export default function SleepCalculator() {
  const [mode, setMode] = useState("wakeup");
  const [wakeTime, setWakeTime] = useState("07:00");

  const now = new Date();
  const options = mode === "wakeup" ? buildWakeOptions(wakeTime) : buildSleepOptions(now);

  const btnActive = { padding: "9px 22px", borderRadius: "8px", border: "none", background: "#4F46E5", color: "white", fontSize: "14px", fontWeight: "500", cursor: "pointer" };
  const btnInactive = { padding: "9px 22px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: "white", color: "#4F46E5", fontSize: "14px", fontWeight: "500", cursor: "pointer" };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Health", href: "/health" }, { label: "Sleep Calculator" }]} />
      <div style={{ maxWidth: "620px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Sleep Calculator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Wake up feeling refreshed by timing your sleep to complete full 90-minute cycles.</p>
        </div>

        {/* Mode toggle */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
          <button onClick={() => setMode("wakeup")} style={mode === "wakeup" ? btnActive : btnInactive}>Wake up at…</button>
          <button onClick={() => setMode("now")} style={mode === "now" ? btnActive : btnInactive}>Going to sleep now</button>
        </div>

        {/* Input card */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "20px" }}>
          {mode === "wakeup" ? (
            <>
              <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "8px" }}>I want to wake up at</label>
              <input
                type="time"
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
                style={{ border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "22px", width: "100%", boxSizing: "border-box" }}
              />
              <div style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "8px" }}>These bedtimes let you wake naturally between sleep cycles.</div>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "8px 0" }}>
              <div style={{ fontSize: "13px", color: "#6B7280", marginBottom: "6px" }}>Current time</div>
              <div style={{ fontSize: "32px", fontWeight: "600", color: "#4F46E5" }}>{formatTime(now)}</div>
              <div style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "6px" }}>Includes ~14 min to fall asleep. Wake at one of these times.</div>
            </div>
          )}
        </div>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
          {options.map(({ bedtime, wake, cycles, totalSleep }, i) => {
            const isBest = cycles === 5 || cycles === 6;
            const displayTime = mode === "wakeup" ? formatTime(bedtime) : formatTime(wake);
            const cyclesLeft = mode === "wakeup" ? options.length - 1 - i : i;
            const actualCycles = options[cyclesLeft] ? options[cyclesLeft].cycles : cycles;
            const thisActualCycles = cycles;

            return (
              <div key={cycles} style={{
                background: isBest ? "#EEF2FF" : "white",
                border: `0.5px solid ${isBest ? "#C7D2FE" : "#E0E7FF"}`,
                borderRadius: "12px",
                padding: "16px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ fontSize: "28px", fontWeight: "700", color: isBest ? "#4F46E5" : "#374151" }}>
                    {displayTime}
                  </div>
                  {isBest && <span style={{ fontSize: "18px" }}>⭐</span>}
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "13px", fontWeight: "500", color: isBest ? "#4F46E5" : "#374151" }}>
                    {thisActualCycles} cycle{thisActualCycles !== 1 ? "s" : ""}
                  </div>
                  <div style={{ fontSize: "12px", color: "#9CA3AF" }}>{hoursLabel(totalSleep)}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info box */}
        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "20px" }}>
          <div style={{ fontSize: "13px", fontWeight: "600", color: "#4F46E5", marginBottom: "10px" }}>How it works</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {[
              { icon: "🔄", text: "Each sleep cycle lasts ~90 minutes" },
              { icon: "😴", text: "Average person takes ~14 minutes to fall asleep" },
              { icon: "⭐", text: "5–6 cycles (7.5–9 hours) is ideal for most adults" },
              { icon: "💡", text: "Waking mid-cycle causes grogginess — time it right!" },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: "flex", gap: "8px", fontSize: "13px", color: "#374151" }}>
                <span>{icon}</span><span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
