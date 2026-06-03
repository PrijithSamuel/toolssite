"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const UNITS = ["g", "kg", "ml", "L", "cups", "tbsp", "tsp", "pieces", "oz", "lbs"];

let nextId = 1;
function newIngredient() {
  return { id: nextId++, name: "", amount: "", unit: "g" };
}

function scaleAmount(amount, from, to) {
  const a = parseFloat(amount);
  if (!a || !from || !to) return "";
  const scaled = a * (to / from);
  if (scaled % 1 === 0) return String(scaled);
  return scaled.toFixed(3).replace(/\.?0+$/, "");
}

export default function RecipeConverter() {
  const [original, setOriginal] = useState("4");
  const [target, setTarget] = useState("2");
  const [ingredients, setIngredients] = useState([
    { id: nextId++, name: "Flour", amount: "200", unit: "g" },
    { id: nextId++, name: "Sugar", amount: "100", unit: "g" },
    { id: nextId++, name: "Milk", amount: "250", unit: "ml" },
    { id: nextId++, name: "Eggs", amount: "2", unit: "pieces" },
  ]);

  const origNum = parseFloat(original) || 0;
  const targNum = parseFloat(target) || 0;
  const factor = origNum > 0 && targNum > 0 ? targNum / origNum : 1;

  function addIngredient() {
    setIngredients([...ingredients, newIngredient()]);
  }

  function removeIngredient(id) {
    setIngredients(ingredients.filter((i) => i.id !== id));
  }

  function updateIngredient(id, field, value) {
    setIngredients(ingredients.map((i) => i.id === id ? { ...i, [field]: value } : i));
  }

  const inp = { border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "8px 10px", outline: "none", background: "white", fontSize: "13px", boxSizing: "border-box" };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Food Tools", href: "/food-tools" }, { label: "Recipe Converter" }]} />
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Recipe Converter</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Scale any recipe up or down for the number of servings you need.</p>
        </div>

        {/* Servings */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", whiteSpace: "nowrap" }}>Recipe serves</label>
              <input type="number" value={original} onChange={(e) => setOriginal(e.target.value)} min="0.5" step="0.5" style={{ ...inp, width: "72px", fontSize: "16px", textAlign: "center" }} />
              <span style={{ fontSize: "13px", color: "#6B7280" }}>people</span>
            </div>
            <span style={{ fontSize: "20px", color: "#D1D5DB" }}>→</span>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", whiteSpace: "nowrap" }}>I want to make for</label>
              <input type="number" value={target} onChange={(e) => setTarget(e.target.value)} min="0.5" step="0.5" style={{ ...inp, width: "72px", fontSize: "16px", textAlign: "center" }} />
              <span style={{ fontSize: "13px", color: "#6B7280" }}>people</span>
            </div>
            {factor !== 1 && origNum > 0 && targNum > 0 && (
              <div style={{ padding: "5px 12px", background: "#EEF2FF", borderRadius: "6px", fontSize: "13px", color: "#4F46E5", fontWeight: "500" }}>
                ×{factor.toFixed(3).replace(/\.?0+$/, "")}
              </div>
            )}
          </div>
        </div>

        {/* Ingredients */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
          <div style={{ padding: "14px 20px", borderBottom: "0.5px solid #E0E7FF", display: "grid", gridTemplateColumns: "1fr 90px 90px 90px 32px", gap: "8px", fontSize: "11px", fontWeight: "500", color: "#6B7280" }}>
            <span>Ingredient</span>
            <span style={{ textAlign: "center" }}>Original</span>
            <span style={{ textAlign: "center" }}>Unit</span>
            <span style={{ textAlign: "center", color: "#4F46E5" }}>Scaled</span>
            <span></span>
          </div>
          <div style={{ padding: "12px 20px", display: "flex", flexDirection: "column", gap: "8px" }}>
            {ingredients.map((ing) => {
              const scaled = scaleAmount(ing.amount, origNum, targNum);
              return (
                <div key={ing.id} style={{ display: "grid", gridTemplateColumns: "1fr 90px 90px 90px 32px", gap: "8px", alignItems: "center" }}>
                  <input value={ing.name} onChange={(e) => updateIngredient(ing.id, "name", e.target.value)} placeholder="e.g. Flour" style={{ ...inp, width: "100%" }} />
                  <input type="number" value={ing.amount} onChange={(e) => updateIngredient(ing.id, "amount", e.target.value)} placeholder="0" style={{ ...inp, width: "100%", textAlign: "center" }} min="0" />
                  <select value={ing.unit} onChange={(e) => updateIngredient(ing.id, "unit", e.target.value)} style={{ ...inp, width: "100%", cursor: "pointer" }}>
                    {UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
                  </select>
                  <div style={{ textAlign: "center", fontSize: "14px", fontWeight: "600", color: scaled ? "#4F46E5" : "#D1D5DB" }}>
                    {scaled || "—"}
                  </div>
                  <button onClick={() => removeIngredient(ing.id)} style={{ width: "28px", height: "28px", borderRadius: "6px", border: "0.5px solid #FCA5A5", background: "#FFF5F5", color: "#EF4444", cursor: "pointer", fontSize: "14px" }}>×</button>
                </div>
              );
            })}
            <button onClick={addIngredient} style={{ marginTop: "4px", padding: "8px", borderRadius: "8px", border: "0.5px dashed #A5B4FC", background: "white", color: "#4F46E5", fontSize: "13px", cursor: "pointer", width: "100%" }}>
              + Add Ingredient
            </button>
          </div>
        </div>

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "14px 16px", fontSize: "12px", color: "#6B7280" }}>
          💡 Scale factor: <strong style={{ color: "#4F46E5" }}>×{factor.toFixed(3).replace(/\.?0+$/, "")}</strong> — adjust original or target servings above to rescale all ingredients instantly.
        </div>
      </div>
      <Footer />
    </main>
  );
}
