"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const gradePoints = {
  "A+": 4.0, "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D+": 1.3, "D": 1.0, "D-": 0.7,
  "F": 0.0,
};

const gradeOptions = Object.keys(gradePoints);

function calcGPA(courses) {
  const valid = courses.filter((c) => c.grade && c.credits > 0);
  if (valid.length === 0) return null;
  const totalCredits = valid.reduce((s, c) => s + parseFloat(c.credits), 0);
  const totalPoints = valid.reduce((s, c) => s + gradePoints[c.grade] * parseFloat(c.credits), 0);
  return totalCredits > 0 ? { gpa: totalPoints / totalCredits, totalCredits } : null;
}

let nextId = 1;

export default function GPACalculator() {
  const [courses, setCourses] = useState([
    { id: nextId++, name: "", grade: "A", credits: "3" },
    { id: nextId++, name: "", grade: "B+", credits: "3" },
  ]);

  function addCourse() {
    setCourses([...courses, { id: nextId++, name: "", grade: "A", credits: "3" }]);
  }

  function removeCourse(id) {
    setCourses(courses.filter((c) => c.id !== id));
  }

  function updateCourse(id, field, value) {
    setCourses(courses.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  }

  const result = calcGPA(courses);
  const gpa = result?.gpa ?? null;
  const totalCredits = result?.totalCredits ?? 0;

  function getHonorStatus(g) {
    if (g === null) return null;
    if (g >= 3.9) return { label: "Summa Cum Laude", color: "#7C3AED", bg: "#EDE9FE" };
    if (g >= 3.7) return { label: "Magna Cum Laude", color: "#4F46E5", bg: "#EEF2FF" };
    if (g >= 3.5) return { label: "Cum Laude / Honor Roll", color: "#0D9488", bg: "#CCFBF1" };
    if (g >= 3.0) return { label: "Good Standing", color: "#16A34A", bg: "#DCFCE7" };
    if (g >= 2.0) return { label: "Satisfactory", color: "#CA8A04", bg: "#FEF9C3" };
    return { label: "Below Average", color: "#DC2626", bg: "#FEE2E2" };
  }

  const honor = getHonorStatus(gpa);

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Calculators", href: "/calculators" }, { label: "GPA Calculator" }]} />
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>GPA Calculator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Add your courses, grades, and credit hours to calculate your GPA.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 100px 90px 40px", gap: "8px", marginBottom: "8px" }}>
            <div style={{ fontSize: "12px", fontWeight: "500", color: "#6B7280" }}>Course Name</div>
            <div style={{ fontSize: "12px", fontWeight: "500", color: "#6B7280" }}>Grade</div>
            <div style={{ fontSize: "12px", fontWeight: "500", color: "#6B7280" }}>Credits</div>
            <div></div>
          </div>

          {courses.map((course) => (
            <div key={course.id} style={{ display: "grid", gridTemplateColumns: "1fr 100px 90px 40px", gap: "8px", marginBottom: "8px", alignItems: "center" }}>
              <input
                type="text"
                value={course.name}
                onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                placeholder="e.g. Math 101"
                style={{ border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "8px 10px", outline: "none", background: "white", fontSize: "13px", boxSizing: "border-box" }}
              />
              <select
                value={course.grade}
                onChange={(e) => updateCourse(course.id, "grade", e.target.value)}
                style={{ border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "8px 6px", outline: "none", background: "white", fontSize: "13px", cursor: "pointer" }}
              >
                {gradeOptions.map((g) => (
                  <option key={g} value={g}>{g} ({gradePoints[g].toFixed(1)})</option>
                ))}
              </select>
              <input
                type="number"
                value={course.credits}
                onChange={(e) => updateCourse(course.id, "credits", e.target.value)}
                min="0.5"
                max="6"
                step="0.5"
                style={{ border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "8px 10px", outline: "none", background: "white", fontSize: "13px", boxSizing: "border-box" }}
              />
              <button
                onClick={() => removeCourse(course.id)}
                disabled={courses.length <= 1}
                style={{ width: "32px", height: "32px", borderRadius: "8px", border: "0.5px solid #FCA5A5", background: courses.length <= 1 ? "#F9FAFB" : "#FFF5F5", color: courses.length <= 1 ? "#D1D5DB" : "#EF4444", fontSize: "16px", cursor: courses.length <= 1 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >×</button>
            </div>
          ))}

          <button
            onClick={addCourse}
            style={{ marginTop: "8px", padding: "8px 16px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: "white", color: "#4F46E5", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}
          >
            + Add Course
          </button>
        </div>

        {result && (
          <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "16px" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "500", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Your GPA</div>
                <div style={{ fontSize: "48px", fontWeight: "500", color: "#4F46E5" }}>{gpa.toFixed(2)}</div>
                <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>out of 4.00</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "500", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Total Credits</div>
                <div style={{ fontSize: "48px", fontWeight: "500", color: "#4F46E5" }}>{totalCredits}</div>
                <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>credit hours</div>
              </div>
            </div>
            {honor && (
              <div style={{ textAlign: "center", padding: "10px 16px", borderRadius: "8px", background: honor.bg, color: honor.color, fontSize: "14px", fontWeight: "500" }}>
                {honor.label}
              </div>
            )}
          </div>
        )}

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px" }}>
          <div style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>Grade Point Scale</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {Object.entries(gradePoints).map(([g, p]) => (
              <span key={g} style={{ fontSize: "11px", padding: "3px 8px", borderRadius: "5px", background: "white", border: "0.5px solid #C7D2FE", color: "#374151" }}>
                {g} = {p.toFixed(1)}
              </span>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
