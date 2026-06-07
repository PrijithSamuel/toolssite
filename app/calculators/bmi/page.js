"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SchemaOrg from "../../components/SchemaOrg";
import FAQ from "../../components/FAQ";

const FAQS = [
  { q: "What is BMI?", a: "BMI or Body Mass Index is a measure of body fat based on height and weight. It is calculated by dividing weight in kg by height in meters squared." },
  { q: "What is a healthy BMI range?", a: "A BMI between 18.5 and 24.9 is considered normal weight. Below 18.5 is underweight, 25-29.9 is overweight and 30 or above is obese." },
  { q: "Is BMI accurate for everyone?", a: "BMI is a general screening tool and does not account for muscle mass, age, gender or body composition. Athletes may have high BMI despite low body fat." },
  { q: "How often should I check my BMI?", a: "Checking BMI once or twice a year is sufficient for most people unless you are actively working on weight management." },
  { q: "Does BMI differ for children?", a: "Yes. BMI for children uses age and sex specific percentiles rather than fixed ranges used for adults." },
];

export default function BMICalculator() {
  const [unit, setUnit] = useState("metric");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");

  function calcBMI() {
    if (unit === "metric") {
      const h = parseFloat(height) / 100;
      const w = parseFloat(weight);
      if (!h || !w) return null;
      return (w / (h * h)).toFixed(1);
    } else {
      const totalInches = parseFloat(heightFt) * 12 + parseFloat(heightIn || 0);
      const w = parseFloat(weight);
      if (!totalInches || !w) return null;
      return ((w / (totalInches * totalInches)) * 703).toFixed(1);
    }
  }

  const bmi = calcBMI();

  function getCategory(bmi) {
    if (!bmi) return null;
    const b = parseFloat(bmi);
    if (b < 18.5) return { label: "Underweight", color: "#2563EB", bg: "#DBEAFE" };
    if (b < 25) return { label: "Normal weight", color: "#059669", bg: "#D1FAE5" };
    if (b < 30) return { label: "Overweight", color: "#D97706", bg: "#FEF3C7" };
    return { label: "Obese", color: "#DC2626", bg: "#FEE2E2" };
  }

  const category = getCategory(bmi);
  const inputStyle = { width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", fontSize: "14px", outline: "none", background: "white", color: "#374151" };

  return (
    <main id="main-content" className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <SchemaOrg name="BMI Calculator" description="Calculate Body Mass Index free online tool" url="/calculators/bmi" />
      <Header breadcrumbs={[{ label: "Calculators", href: "/calculators" }, { label: "BMI Calculator" }]} />
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>BMI Calculator — Body Mass Index Calculator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate your Body Mass Index instantly. Free, no signup required.</p>
        </div>

        <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
          {["metric", "imperial"].map((u) => (
            <button key={u} type="button" onClick={() => { setUnit(u); setHeight(""); setWeight(""); setHeightFt(""); setHeightIn(""); }}
              style={{ padding: "8px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: "500", cursor: "pointer", border: unit === u ? "none" : "0.5px solid #C7D2FE", background: unit === u ? "#4F46E5" : "white", color: unit === u ? "white" : "#4B5563", textTransform: "capitalize" }}>
              {u} {u === "metric" ? "(cm, kg)" : "(ft, lbs)"}
            </button>
          ))}
        </div>

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", display: "block", marginBottom: "6px" }}>
                Height {unit === "metric" ? "(cm)" : ""}
              </label>
              {unit === "metric" ? (
                <input type="number" placeholder="e.g. 175" value={height} onChange={(e) => setHeight(e.target.value)} style={inputStyle} />
              ) : (
                <div style={{ display: "flex", gap: "6px" }}>
                  <input type="number" placeholder="ft" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} style={{ ...inputStyle, width: "50%" }} />
                  <input type="number" placeholder="in" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} style={{ ...inputStyle, width: "50%" }} />
                </div>
              )}
            </div>
            <div>
              <label style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", display: "block", marginBottom: "6px" }}>
                Weight ({unit === "metric" ? "kg" : "lbs"})
              </label>
              <input type="number" placeholder={unit === "metric" ? "e.g. 70" : "e.g. 154"} value={weight} onChange={(e) => setWeight(e.target.value)} style={inputStyle} />
            </div>
          </div>

          {bmi && category && (
            <div style={{ background: category.bg, borderRadius: "12px", padding: "20px", textAlign: "center" }}>
              <div style={{ fontSize: "12px", color: "#9CA3AF", marginBottom: "4px" }}>Your BMI</div>
              <div style={{ fontSize: "48px", fontWeight: "500", color: category.color, marginBottom: "4px" }}>{bmi}</div>
              <div style={{ fontSize: "16px", fontWeight: "500", color: category.color }}>{category.label}</div>
            </div>
          )}
        </div>

        <div style={{ marginTop: "12px", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ background: "#EEF2FF", padding: "10px 16px", fontSize: "11px", fontWeight: "500", color: "#6366F1", letterSpacing: "0.05em" }}>BMI RANGES</div>
          {[["Below 18.5", "Underweight", "#2563EB"], ["18.5 – 24.9", "Normal weight", "#059669"], ["25.0 – 29.9", "Overweight", "#D97706"], ["30.0+", "Obese", "#DC2626"]].map(([range, label, color]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 16px", borderTop: "0.5px solid #E0E7FF", background: "white" }}>
              <span style={{ fontSize: "13px", color: "#6B7280" }}>{range}</span>
              <span style={{ fontSize: "13px", fontWeight: "500", color }}>{label}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "16px", background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px" }}>
          <p style={{ fontSize: "13px", color: "#4338CA" }}>BMI is a general indicator and does not account for muscle mass, age, or other health factors. Consult a doctor for a full health assessment.</p>
        </div>
      </div>
      <FAQ faqs={FAQS} />
      <Footer />
    </main>
  );
}