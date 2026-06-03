"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const GRADE_LABELS = [
  { from: 1.0, to: 1.4, label: "Sehr gut", en: "Excellent", color: "#059669", bg: "#ECFDF5" },
  { from: 1.5, to: 2.4, label: "Gut", en: "Good", color: "#10B981", bg: "#D1FAE5" },
  { from: 2.5, to: 3.4, label: "Befriedigend", en: "Satisfactory", color: "#F59E0B", bg: "#FEF9C3" },
  { from: 3.5, to: 4.4, label: "Ausreichend", en: "Sufficient", color: "#F97316", bg: "#FFF7ED" },
  { from: 4.5, to: 5.4, label: "Mangelhaft", en: "Poor", color: "#EF4444", bg: "#FEE2E2" },
  { from: 5.5, to: 6.0, label: "Ungenügend", en: "Insufficient", color: "#DC2626", bg: "#FEE2E2" },
];

function getLabel(avg) {
  return GRADE_LABELS.find((l) => avg >= l.from && avg <= l.to) || GRADE_LABELS[GRADE_LABELS.length - 1];
}

let nextId = 1;
function newSubject() { return { id: nextId++, name: "", grade: "2.0", weight: "1" }; }

export default function GermanGradeCalculator() {
  const [subjects, setSubjects] = useState([
    { id: nextId++, name: "Mathematik", grade: "2.0", weight: "2" },
    { id: nextId++, name: "Deutsch", grade: "1.7", weight: "2" },
    { id: nextId++, name: "Englisch", grade: "2.3", weight: "1" },
    { id: nextId++, name: "Sport", grade: "1.0", weight: "1" },
  ]);

  // Bavarian formula inputs
  const [maxGrade, setMaxGrade] = useState("20");
  const [minPass, setMinPass] = useState("10");
  const [yourGrade, setYourGrade] = useState("16");

  function update(id, field, val) { setSubjects(subjects.map((s) => s.id === id ? { ...s, [field]: val } : s)); }
  function remove(id) { if (subjects.length > 1) setSubjects(subjects.filter((s) => s.id !== id)); }

  const valid = subjects.filter((s) => s.grade && s.weight && parseFloat(s.weight) > 0 && parseFloat(s.grade) >= 1 && parseFloat(s.grade) <= 6);
  const totalWeight = valid.reduce((s, x) => s + parseFloat(x.weight), 0);
  const weightedSum = valid.reduce((s, x) => s + parseFloat(x.grade) * parseFloat(x.weight), 0);
  const avg = totalWeight > 0 ? weightedSum / totalWeight : null;
  const lbl = avg !== null ? getLabel(avg) : null;

  // Bavarian formula
  const mx = parseFloat(maxGrade), mp = parseFloat(minPass), yg = parseFloat(yourGrade);
  const bavResult = (mx && mp && yg && mx > mp) ? Math.max(1, Math.min(6, 1 + 3 * (mx - yg) / (mx - mp))) : null;
  const bavLbl = bavResult !== null ? getLabel(bavResult) : null;

  const inp = { border: "0.5px solid #C7D2FE", borderRadius: "7px", padding: "7px 9px", outline: "none", background: "white", fontSize: "13px", boxSizing: "border-box", width: "100%" };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "Notendurchschnitt Rechner" }]} />
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>Notendurchschnitt Rechner</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>German grade average calculator — compute your Notendurchschnitt and convert international grades.</p>
        </div>

        {/* Grade scale reference */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "16px", flexWrap: "wrap" }}>
          {GRADE_LABELS.map((l) => (
            <div key={l.label} style={{ padding: "4px 10px", borderRadius: "6px", background: l.bg, border: `0.5px solid ${l.color}30`, fontSize: "11px", color: l.color, fontWeight: "600" }}>
              {l.label === "Sehr gut" ? "1.0–1.4" : l.label === "Gut" ? "1.5–2.4" : l.label === "Befriedigend" ? "2.5–3.4" : l.label === "Ausreichend" ? "3.5–4.4" : l.label === "Mangelhaft" ? "4.5–5.4" : "5.5–6.0"} — {l.label}
            </div>
          ))}
        </div>

        {/* Subject table */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
          <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", display: "grid", gridTemplateColumns: "1fr 90px 80px 36px", gap: "8px", fontSize: "11px", fontWeight: "600", color: "#6B7280" }}>
            <span>Subject / Fach</span>
            <span style={{ textAlign: "center" }}>Grade (1–6)</span>
            <span style={{ textAlign: "center" }}>Weight</span>
            <span></span>
          </div>
          <div style={{ padding: "12px 20px", display: "flex", flexDirection: "column", gap: "7px" }}>
            {subjects.map((s) => {
              const g = parseFloat(s.grade);
              const grLbl = !isNaN(g) && g >= 1 && g <= 6 ? getLabel(g) : null;
              return (
                <div key={s.id} style={{ display: "grid", gridTemplateColumns: "1fr 90px 80px 36px", gap: "8px", alignItems: "center" }}>
                  <input value={s.name} onChange={(e) => update(s.id, "name", e.target.value)} placeholder="e.g. Mathematik" style={inp} />
                  <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                    <input type="number" value={s.grade} onChange={(e) => update(s.id, "grade", e.target.value)} min="1" max="6" step="0.1" style={{ ...inp, textAlign: "center" }} />
                    {grLbl && <span style={{ fontSize: "10px", color: grLbl.color, fontWeight: "700", flexShrink: 0 }}>{grLbl.label.slice(0, 4)}</span>}
                  </div>
                  <input type="number" value={s.weight} onChange={(e) => update(s.id, "weight", e.target.value)} min="0.5" max="10" step="0.5" style={{ ...inp, textAlign: "center" }} />
                  <button onClick={() => remove(s.id)} disabled={subjects.length <= 1} style={{ width: "28px", height: "28px", border: "0.5px solid #FCA5A5", borderRadius: "6px", background: subjects.length > 1 ? "#FFF5F5" : "#F9FAFB", color: subjects.length > 1 ? "#EF4444" : "#D1D5DB", cursor: subjects.length > 1 ? "pointer" : "default", fontSize: "14px" }}>×</button>
                </div>
              );
            })}
            <button onClick={() => setSubjects([...subjects, newSubject()])} style={{ marginTop: "4px", padding: "8px", borderRadius: "7px", border: "0.5px dashed #A5B4FC", background: "white", color: "#4F46E5", fontSize: "13px", cursor: "pointer" }}>
              + Fach hinzufügen
            </button>
          </div>
        </div>

        {/* Result */}
        {lbl && avg !== null && (
          <div style={{ background: lbl.bg, border: `0.5px solid ${lbl.color}50`, borderRadius: "12px", padding: "20px 24px", marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "12px", fontWeight: "600", color: lbl.color, marginBottom: "4px", textTransform: "uppercase" }}>Notendurchschnitt</div>
              <div style={{ fontSize: "52px", fontWeight: "700", color: lbl.color, lineHeight: "1" }}>{avg.toFixed(2)}</div>
              <div style={{ fontSize: "14px", color: lbl.color, marginTop: "4px" }}>({lbl.en})</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "28px", fontWeight: "700", color: lbl.color }}>{lbl.label}</div>
              <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "4px" }}>{totalWeight} Gewichtungspunkte</div>
            </div>
          </div>
        )}

        {/* Bavarian Formula */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px 24px" }}>
          <div style={{ fontSize: "14px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>Modifizierte Bayerische Formel</div>
          <p style={{ fontSize: "12px", color: "#6B7280", marginBottom: "14px" }}>Convert international grades to German grades: <em>1 + 3 × (Max − Your) ÷ (Max − MinPass)</em></p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "14px" }}>
            {[["Max. grade in home country", maxGrade, setMaxGrade], ["Min. passing grade", minPass, setMinPass], ["Your grade", yourGrade, setYourGrade]].map(([label, val, setVal]) => (
              <div key={label}>
                <label style={{ fontSize: "11px", color: "#6B7280", display: "block", marginBottom: "4px" }}>{label}</label>
                <input type="number" value={val} onChange={(e) => setVal(e.target.value)} style={inp} />
              </div>
            ))}
          </div>
          {bavResult !== null && bavLbl && (
            <div style={{ padding: "12px 16px", background: bavLbl.bg, borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "13px", color: "#374151" }}>German equivalent:</span>
              <div style={{ display: "flex", gap: "10px", alignItems: "baseline" }}>
                <span style={{ fontSize: "28px", fontWeight: "700", color: bavLbl.color }}>{bavResult.toFixed(1)}</span>
                <span style={{ fontSize: "14px", fontWeight: "600", color: bavLbl.color }}>{bavLbl.label}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
