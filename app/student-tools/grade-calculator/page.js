"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function letterGrade(pct) {
  if (pct >= 97) return { grade: "A+", color: "#059669" };
  if (pct >= 93) return { grade: "A", color: "#10B981" };
  if (pct >= 90) return { grade: "A−", color: "#10B981" };
  if (pct >= 87) return { grade: "B+", color: "#4F46E5" };
  if (pct >= 83) return { grade: "B", color: "#4F46E5" };
  if (pct >= 80) return { grade: "B−", color: "#6366F1" };
  if (pct >= 77) return { grade: "C+", color: "#F59E0B" };
  if (pct >= 73) return { grade: "C", color: "#F59E0B" };
  if (pct >= 70) return { grade: "C−", color: "#D97706" };
  if (pct >= 67) return { grade: "D+", color: "#EF4444" };
  if (pct >= 63) return { grade: "D", color: "#EF4444" };
  if (pct >= 60) return { grade: "D−", color: "#DC2626" };
  return { grade: "F", color: "#DC2626" };
}

let nextId = 1;
function newAssignment() { return { id: nextId++, name: "", score: "", maxScore: "100", weight: "" }; }

export default function GradeCalculator() {
  const [assignments, setAssignments] = useState([
    { id: nextId++, name: "Midterm Exam", score: "78", maxScore: "100", weight: "30" },
    { id: nextId++, name: "Assignment 1", score: "45", maxScore: "50", weight: "20" },
    { id: nextId++, name: "Assignment 2", score: "", maxScore: "50", weight: "20" },
    { id: nextId++, name: "Final Exam", score: "", maxScore: "100", weight: "30" },
  ]);
  const [target, setTarget] = useState("90");

  function updateA(id, field, val) { setAssignments(assignments.map((a) => a.id === id ? { ...a, [field]: val } : a)); }
  function removeA(id) { setAssignments(assignments.filter((a) => a.id !== id)); }

  const completed = assignments.filter((a) => a.score !== "" && a.maxScore && parseFloat(a.maxScore) > 0 && a.weight !== "");
  const pending = assignments.filter((a) => (a.score === "" || a.score === undefined) && a.weight !== "");

  const totalCompletedWeight = completed.reduce((s, a) => s + parseFloat(a.weight), 0);
  const weightedSum = completed.reduce((s, a) => {
    const pct = (parseFloat(a.score) / parseFloat(a.maxScore)) * 100;
    return s + pct * parseFloat(a.weight);
  }, 0);
  const currentGrade = totalCompletedWeight > 0 ? weightedSum / totalCompletedWeight : null;

  // What score needed on remaining to reach target
  const pendingWeight = pending.reduce((s, a) => s + parseFloat(a.weight), 0);
  const targetNum = parseFloat(target) || 0;
  let neededScore = null;
  if (pendingWeight > 0 && targetNum > 0) {
    const totalWeight = totalCompletedWeight + pendingWeight;
    neededScore = ((targetNum * totalWeight) - weightedSum) / pendingWeight;
  }

  const grade = currentGrade !== null ? letterGrade(currentGrade) : null;
  const inp = { border: "0.5px solid #C7D2FE", borderRadius: "7px", padding: "7px 9px", outline: "none", background: "white", fontSize: "13px", boxSizing: "border-box", width: "100%" };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Student Tools", href: "/student-tools" }, { label: "Grade Calculator" }]} />
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Grade Calculator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate your weighted grade and see what score you need on remaining assignments.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
          <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", display: "grid", gridTemplateColumns: "2fr 80px 80px 70px 32px", gap: "8px", fontSize: "11px", fontWeight: "500", color: "#6B7280" }}>
            <span>Assignment Name</span>
            <span style={{ textAlign: "center" }}>Score</span>
            <span style={{ textAlign: "center" }}>Max Score</span>
            <span style={{ textAlign: "center" }}>Weight %</span>
            <span></span>
          </div>
          <div style={{ padding: "12px 20px", display: "flex", flexDirection: "column", gap: "7px" }}>
            {assignments.map((a) => {
              const pct = a.score !== "" && a.maxScore ? ((parseFloat(a.score) / parseFloat(a.maxScore)) * 100).toFixed(1) : null;
              const g = pct !== null ? letterGrade(parseFloat(pct)) : null;
              return (
                <div key={a.id} style={{ display: "grid", gridTemplateColumns: "2fr 80px 80px 70px 32px", gap: "8px", alignItems: "center" }}>
                  <input value={a.name} onChange={(e) => updateA(a.id, "name", e.target.value)} placeholder="e.g. Midterm" style={inp} />
                  <div style={{ position: "relative" }}>
                    <input type="number" value={a.score} onChange={(e) => updateA(a.id, "score", e.target.value)} placeholder="—" min="0" style={{ ...inp, textAlign: "center" }} />
                    {g && <span style={{ position: "absolute", right: "-28px", top: "50%", transform: "translateY(-50%)", fontSize: "10px", fontWeight: "600", color: g.color }}>{g.grade}</span>}
                  </div>
                  <input type="number" value={a.maxScore} onChange={(e) => updateA(a.id, "maxScore", e.target.value)} min="1" style={{ ...inp, textAlign: "center" }} />
                  <input type="number" value={a.weight} onChange={(e) => updateA(a.id, "weight", e.target.value)} placeholder="%" min="0" max="100" style={{ ...inp, textAlign: "center" }} />
                  <button onClick={() => removeA(a.id)} style={{ width: "28px", height: "28px", border: "0.5px solid #FCA5A5", borderRadius: "6px", background: "#FFF5F5", color: "#EF4444", cursor: "pointer", fontSize: "14px" }}>×</button>
                </div>
              );
            })}
            <button onClick={() => setAssignments([...assignments, newAssignment()])} style={{ marginTop: "4px", padding: "8px", borderRadius: "7px", border: "0.5px dashed #A5B4FC", background: "white", color: "#4F46E5", fontSize: "13px", cursor: "pointer" }}>
              + Add Assignment
            </button>
          </div>
        </div>

        {grade && (
          <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "20px 24px", marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Current Grade</div>
                <div style={{ fontSize: "48px", fontWeight: "300", color: "#4F46E5" }}>{currentGrade.toFixed(1)}%</div>
                <div style={{ fontSize: "13px", color: "#6B7280" }}>Based on {completed.length} completed assignment{completed.length !== 1 ? "s" : ""} ({totalCompletedWeight}% of total)</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "52px", fontWeight: "700", color: grade.color }}>{grade.grade}</div>
              </div>
            </div>
          </div>
        )}

        {pendingWeight > 0 && (
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <div style={{ fontSize: "13px", color: "#374151" }}>To achieve</div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <input type="number" value={target} onChange={(e) => setTarget(e.target.value)} min="0" max="100" style={{ width: "70px", border: "0.5px solid #C7D2FE", borderRadius: "7px", padding: "7px 8px", outline: "none", fontSize: "16px", textAlign: "center" }} />
                <span style={{ fontSize: "13px", color: "#374151" }}>%</span>
              </div>
              <div style={{ fontSize: "13px", color: "#374151" }}>overall, you need</div>
              <div style={{ fontSize: "20px", fontWeight: "600", color: neededScore !== null && neededScore <= 100 ? "#4F46E5" : "#EF4444" }}>
                {neededScore !== null ? (neededScore > 100 ? ">100%" : neededScore < 0 ? "Already achieved!" : `${neededScore.toFixed(1)}%`) : "—"}
              </div>
              <div style={{ fontSize: "13px", color: "#6B7280" }}>on remaining ({pendingWeight}% weight)</div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
