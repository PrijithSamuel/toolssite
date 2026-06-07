"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ACTIVITIES = [
  { name: "Running (8 km/h)", met: 8.3, icon: "🏃" },
  { name: "Walking (5 km/h)", met: 3.5, icon: "🚶" },
  { name: "Cycling (moderate)", met: 6.8, icon: "🚴" },
  { name: "Cycling (fast)", met: 10.0, icon: "🚴" },
  { name: "Swimming", met: 6.0, icon: "🏊" },
  { name: "Jump Rope", met: 11.8, icon: "⚡" },
  { name: "Yoga", met: 2.5, icon: "🧘" },
  { name: "Weight Lifting", met: 3.5, icon: "🏋️" },
  { name: "HIIT", met: 8.0, icon: "💪" },
  { name: "Soccer", met: 7.0, icon: "⚽" },
  { name: "Basketball", met: 6.5, icon: "🏀" },
  { name: "Dancing", met: 4.8, icon: "💃" },
  { name: "Hiking", met: 5.3, icon: "🥾" },
  { name: "Rowing", met: 7.0, icon: "🚣" },
  { name: "Skiing", met: 6.8, icon: "⛷️" },
];

const FOOD_EQUIVALENTS = [
  { name: "Apple", cal: 95, icon: "🍎" },
  { name: "Banana", cal: 105, icon: "🍌" },
  { name: "Pizza slice", cal: 285, icon: "🍕" },
  { name: "Burger", cal: 500, icon: "🍔" },
];

export default function CaloriesBurned() {
  const [activityIdx, setActivityIdx] = useState(0);
  const [duration, setDuration] = useState("30");
  const [weight, setWeight] = useState("70");

  const met = ACTIVITIES[activityIdx].met;
  const dur = parseFloat(duration) || 0;
  const wt = parseFloat(weight) || 0;
  const calories = wt > 0 && dur > 0 ? Math.round(met * wt * (dur / 60)) : 0;

  const inp = { border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "15px", boxSizing: "border-box" };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Health", href: "/health" }, { label: "Calories Burned" }]} />
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Calories Burned Calculator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Estimate calories burned using MET values — the standard metabolic equivalent method.</p>
        </div>

        {/* Inputs */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          {/* Activity selector */}
          <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "10px" }}>Activity</label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "20px" }}>
            {ACTIVITIES.map((act, i) => (
              <button
                key={act.name}
                onClick={() => setActivityIdx(i)}
                style={{
                  padding: "8px 10px",
                  borderRadius: "8px",
                  border: `0.5px solid ${activityIdx === i ? "#A5B4FC" : "#C7D2FE"}`,
                  background: activityIdx === i ? "#EEF2FF" : "white",
                  color: activityIdx === i ? "#4F46E5" : "#374151",
                  fontSize: "12px",
                  fontWeight: activityIdx === i ? "600" : "400",
                  cursor: "pointer",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <span>{act.icon}</span>
                <span style={{ lineHeight: "1.3" }}>{act.name}</span>
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "5px" }}>Duration (minutes)</label>
              <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="30" min="1" style={{ ...inp, width: "100%" }} />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "5px" }}>Body weight (kg)</label>
              <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="70" min="1" style={{ ...inp, width: "100%" }} />
            </div>
          </div>
        </div>

        {calories > 0 && (
          <>
            {/* Big calorie result */}
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "28px 24px", marginBottom: "16px", textAlign: "center" }}>
              <div style={{ fontSize: "13px", fontWeight: "500", color: "#6366F1", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Calories Burned</div>
              <div style={{ fontSize: "72px", fontWeight: "700", color: "#4F46E5", lineHeight: 1 }}>
                {calories.toLocaleString()}
              </div>
              <div style={{ fontSize: "14px", color: "#6B7280", marginTop: "8px" }}>
                {ACTIVITIES[activityIdx].icon} {ACTIVITIES[activityIdx].name} · {dur} min · {wt} kg
              </div>
              <div style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "4px" }}>
                MET {met} × {wt} kg × ({dur} / 60) = {calories} kcal
              </div>
            </div>

            {/* Food equivalents */}
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px" }}>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "14px" }}>That burns off…</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
                {FOOD_EQUIVALENTS.map(({ name, cal, icon }) => {
                  const portions = calories / cal;
                  const portionStr = portions >= 10
                    ? `${Math.round(portions)}×`
                    : portions >= 1
                    ? `${Math.round(portions * 10) / 10}×`
                    : `${Math.round(portions * 100)}%`;
                  return (
                    <div key={name} style={{ background: "#F8F9FF", borderRadius: "10px", padding: "14px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{ fontSize: "28px" }}>{icon}</span>
                      <div>
                        <div style={{ fontSize: "20px", fontWeight: "700", color: "#4F46E5" }}>{portionStr}</div>
                        <div style={{ fontSize: "12px", color: "#6B7280" }}>{name}</div>
                        <div style={{ fontSize: "11px", color: "#9CA3AF" }}>{cal} kcal each</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* Info */}
        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px 20px", marginTop: "16px", fontSize: "13px", color: "#374151" }}>
          <strong style={{ color: "#4F46E5" }}>Formula:</strong> Calories = MET × weight (kg) × duration (hours) &nbsp;·&nbsp; MET = metabolic equivalent of task, measured relative to resting metabolic rate.
        </div>
      </div>
      <Footer />
    </main>
  );
}
