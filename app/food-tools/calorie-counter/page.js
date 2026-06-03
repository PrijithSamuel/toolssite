"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const FOODS = [
  { name: "Pain / Bread", cal: 265 }, { name: "Fromage / Cheese", cal: 350 },
  { name: "Riz cuit / Rice (cooked)", cal: 130 }, { name: "Poulet / Chicken", cal: 165 },
  { name: "Bœuf / Beef", cal: 250 }, { name: "Saumon / Salmon", cal: 208 },
  { name: "Œuf / Egg (whole)", cal: 155 }, { name: "Lait / Milk", cal: 61 },
  { name: "Beurre / Butter", cal: 717 }, { name: "Yaourt / Yogurt (plain)", cal: 59 },
  { name: "Pomme de terre / Potato", cal: 77 }, { name: "Tomate / Tomato", cal: 18 },
  { name: "Carotte / Carrot", cal: 41 }, { name: "Pâtes cuites / Pasta (cooked)", cal: 131 },
  { name: "Pomme / Apple", cal: 52 }, { name: "Banane / Banana", cal: 89 },
  { name: "Orange", cal: 47 }, { name: "Salade verte / Lettuce", cal: 15 },
  { name: "Haricots verts / Green beans", cal: 31 }, { name: "Noix / Walnuts", cal: 654 },
  { name: "Chocolat noir / Dark chocolate", cal: 598 }, { name: "Sucre / Sugar", cal: 387 },
  { name: "Farine / Flour", cal: 364 }, { name: "Huile d'olive / Olive oil", cal: 884 },
  { name: "Biscuit / Cookie", cal: 480 }, { name: "Pizza (moyenne)", cal: 266 },
  { name: "Coca-Cola", cal: 42 }, { name: "Jus d'orange / OJ", cal: 44 },
  { name: "Vin blanc / White wine", cal: 82 }, { name: "Café noir / Black coffee", cal: 2 },
];

let nextId = 1;

export default function CalorieCounter() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [customName, setCustomName] = useState("");
  const [customCal, setCustomCal] = useState("");
  const [serving, setServing] = useState("100");

  const filtered = search.length >= 2 ? FOODS.filter((f) => f.name.toLowerCase().includes(search.toLowerCase())) : [];

  function addFood(food, grams) {
    const g = parseFloat(grams) || 100;
    const cal = Math.round((food.cal * g) / 100);
    setItems([...items, { id: nextId++, name: food.name, grams: g, cal, per100: food.cal }]);
    setSearch(""); setServing("100");
  }

  function addCustom() {
    const cal = parseFloat(customCal) || 0;
    const g = parseFloat(serving) || 100;
    if (!customName.trim() || cal <= 0) return;
    const totalCal = Math.round((cal * g) / 100);
    setItems([...items, { id: nextId++, name: customName.trim(), grams: g, cal: totalCal, per100: cal }]);
    setCustomName(""); setCustomCal(""); setServing("100");
  }

  function removeItem(id) { setItems(items.filter((i) => i.id !== id)); }

  const totalCal = items.reduce((s, i) => s + i.cal, 0);

  const progressColor = totalCal < 1500 ? "#10B981" : totalCal < 2000 ? "#F59E0B" : "#EF4444";
  const progressPct = Math.min((totalCal / 2500) * 100, 100);

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Food Tools", href: "/food-tools" }, { label: "Calorie Counter" }]} />
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Calorie Counter</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Track your daily calorie intake with 30 pre-loaded foods.</p>
        </div>

        {/* Total */}
        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
            <span style={{ fontSize: "13px", fontWeight: "500", color: "#374151" }}>Daily Total</span>
            <span style={{ fontSize: "12px", color: "#9CA3AF" }}>Goal: ~2000 kcal/day</span>
          </div>
          <div style={{ fontSize: "48px", fontWeight: "300", color: progressColor, lineHeight: "1" }}>{totalCal.toLocaleString()}</div>
          <div style={{ fontSize: "14px", color: "#6B7280", marginBottom: "10px" }}>kcal</div>
          <div style={{ height: "8px", background: "#E0E7FF", borderRadius: "4px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progressPct}%`, background: progressColor, borderRadius: "4px", transition: "width 0.4s" }} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
          {/* Search foods */}
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px" }}>
            <div style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "10px" }}>Search Food Database</div>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Type food name (e.g. pain)..." style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "8px 10px", outline: "none", background: "white", fontSize: "13px", boxSizing: "border-box", marginBottom: "8px" }} />
            {filtered.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "4px", maxHeight: "200px", overflowY: "auto" }}>
                {filtered.map((food) => (
                  <button key={food.name} onClick={() => addFood(food, serving)} style={{ display: "flex", justifyContent: "space-between", padding: "7px 10px", border: "0.5px solid #E0E7FF", borderRadius: "7px", background: "white", cursor: "pointer", fontSize: "12px", textAlign: "left" }}>
                    <span style={{ color: "#374151" }}>{food.name}</span>
                    <span style={{ color: "#4F46E5", fontWeight: "500" }}>{food.cal} kcal/100g</span>
                  </button>
                ))}
              </div>
            )}
            <div style={{ marginTop: "8px" }}>
              <label style={{ fontSize: "11px", color: "#9CA3AF", display: "block", marginBottom: "3px" }}>Serving size (g)</label>
              <input type="number" value={serving} onChange={(e) => setServing(e.target.value)} placeholder="100" style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "7px", padding: "6px 8px", outline: "none", fontSize: "13px", boxSizing: "border-box" }} />
            </div>
          </div>

          {/* Add custom */}
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px" }}>
            <div style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "10px" }}>Add Custom Food</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <input value={customName} onChange={(e) => setCustomName(e.target.value)} placeholder="Food name" style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "7px", padding: "8px 10px", outline: "none", fontSize: "13px", boxSizing: "border-box" }} />
              <input type="number" value={customCal} onChange={(e) => setCustomCal(e.target.value)} placeholder="Calories per 100g" style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "7px", padding: "8px 10px", outline: "none", fontSize: "13px", boxSizing: "border-box" }} />
              <input type="number" value={serving} onChange={(e) => setServing(e.target.value)} placeholder="Serving (g)" style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "7px", padding: "8px 10px", outline: "none", fontSize: "13px", boxSizing: "border-box" }} />
              <button onClick={addCustom} style={{ padding: "10px", borderRadius: "8px", border: "none", background: "#4F46E5", color: "white", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>
                + Add Food
              </button>
            </div>
          </div>
        </div>

        {/* Food log */}
        {items.length > 0 && (
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "13px", fontWeight: "500", color: "#374151" }}>Food Log ({items.length} items)</span>
              <button onClick={() => setItems([])} style={{ fontSize: "12px", color: "#EF4444", background: "none", border: "none", cursor: "pointer" }}>Clear all</button>
            </div>
            {items.map((item) => (
              <div key={item.id} style={{ padding: "10px 20px", borderBottom: "0.5px solid #F3F4F6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: "500", color: "#374151" }}>{item.name}</div>
                  <div style={{ fontSize: "11px", color: "#9CA3AF" }}>{item.grams}g · {item.per100} kcal/100g</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "16px", fontWeight: "600", color: "#4F46E5" }}>{item.cal} kcal</span>
                  <button onClick={() => removeItem(item.id)} style={{ border: "none", background: "none", color: "#D1D5DB", cursor: "pointer", fontSize: "16px" }}>×</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
