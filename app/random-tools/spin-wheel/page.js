"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const COLORS = ["#4F46E5","#7C3AED","#DB2777","#DC2626","#D97706","#059669","#0284C7","#9333EA","#C026D3","#0891B2","#16A34A","#F59E0B"];
const SIZE = 320;

function drawWheel(canvas, angle, items) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, SIZE, SIZE);
  const cx = SIZE / 2, cy = SIZE / 2, r = cx - 16;
  const valid = items.filter((i) => i.trim());
  if (valid.length === 0) return;
  const n = valid.length;
  const seg = (2 * Math.PI) / n;

  for (let i = 0; i < n; i++) {
    const start = angle + i * seg;
    const end = start + seg;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, end);
    ctx.closePath();
    ctx.fillStyle = COLORS[i % COLORS.length];
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(start + seg / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "white";
    ctx.font = "600 13px sans-serif";
    const label = valid[i].length > 13 ? valid[i].slice(0, 12) + "…" : valid[i];
    ctx.fillText(label, r - 10, 5);
    ctx.restore();
  }

  // Center circle
  ctx.beginPath();
  ctx.arc(cx, cy, 18, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.strokeStyle = "#E0E7FF";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Pointer at top
  ctx.beginPath();
  ctx.moveTo(cx, 2);
  ctx.lineTo(cx - 14, 28);
  ctx.lineTo(cx + 14, 28);
  ctx.closePath();
  ctx.fillStyle = "#1E1B4B";
  ctx.fill();
}

export default function SpinWheel() {
  const canvasRef = useRef(null);
  const angleRef = useRef(0);
  const rafRef = useRef(null);
  const itemsRef = useRef([]);

  const [items, setItems] = useState(["Pizza 🍕", "Burger 🍔", "Sushi 🍣", "Tacos 🌮", "Pasta 🍝", "Salad 🥗"]);
  const [newItem, setNewItem] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => { itemsRef.current = items; }, [items]);

  useEffect(() => {
    if (canvasRef.current) drawWheel(canvasRef.current, angleRef.current, items);
  }, [items]);

  useEffect(() => {
    if (canvasRef.current) drawWheel(canvasRef.current, 0, items);
  }, []);

  useEffect(() => {
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  function spin() {
    const valid = itemsRef.current.filter((i) => i.trim());
    if (spinning || valid.length < 2) return;
    setResult(null);
    setSpinning(true);

    const startAngle = angleRef.current;
    const spinAmount = (5 + Math.random() * 5) * 2 * Math.PI;
    const startTime = performance.now();
    const duration = 4000;

    function animate(now) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      const currentAngle = startAngle + spinAmount * eased;
      angleRef.current = currentAngle;
      if (canvasRef.current) drawWheel(canvasRef.current, currentAngle, itemsRef.current);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        const currentItems = itemsRef.current.filter((i) => i.trim());
        const n = currentItems.length;
        const seg = (2 * Math.PI) / n;
        const norm = ((currentAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        const pointerInWheel = ((-Math.PI / 2 - norm) + 4 * Math.PI) % (2 * Math.PI);
        const winnerIdx = Math.floor(pointerInWheel / seg) % n;
        setResult(currentItems[winnerIdx]);
        setSpinning(false);
      }
    }
    rafRef.current = requestAnimationFrame(animate);
  }

  function addItem() {
    if (!newItem.trim() || items.length >= 12) return;
    setItems([...items, newItem.trim()]);
    setNewItem("");
    setResult(null);
  }

  function removeItem(idx) {
    if (items.length <= 2) return;
    setItems(items.filter((_, i) => i !== idx));
    setResult(null);
  }

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Random Tools", href: "/random-tools" }, { label: "Spin the Wheel" }]} />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Spin the Wheel</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Add your options, spin, and let chance decide!</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "24px", alignItems: "start" }}>
          {/* Wheel */}
          <div style={{ textAlign: "center" }}>
            <canvas ref={canvasRef} width={SIZE} height={SIZE} style={{ borderRadius: "50%", boxShadow: "0 4px 24px rgba(79,70,229,0.15)", display: "block" }} />
            <button
              onClick={spin}
              disabled={spinning || items.filter((i) => i.trim()).length < 2}
              style={{ marginTop: "16px", padding: "14px 48px", borderRadius: "10px", border: "none", background: spinning ? "#E5E7EB" : "#4F46E5", color: spinning ? "#9CA3AF" : "white", fontSize: "16px", cursor: spinning ? "default" : "pointer", fontWeight: "600" }}
            >
              {spinning ? "Spinning…" : "🎡 Spin!"}
            </button>
            {result && (
              <div style={{ marginTop: "16px", padding: "16px 24px", background: "#EEF2FF", border: "0.5px solid #A5B4FC", borderRadius: "12px" }}>
                <div style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", marginBottom: "4px" }}>RESULT</div>
                <div style={{ fontSize: "22px", fontWeight: "600", color: "#4F46E5" }}>🎉 {result}</div>
              </div>
            )}
          </div>

          {/* Items editor */}
          <div>
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "12px" }}>
              <div style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "12px" }}>
                Wheel Items <span style={{ color: "#9CA3AF", fontWeight: "400" }}>({items.length}/12)</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "12px" }}>
                {items.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "12px", height: "12px", borderRadius: "2px", background: COLORS[idx % COLORS.length], flexShrink: 0 }} />
                    <input
                      value={item}
                      onChange={(e) => { const next = [...items]; next[idx] = e.target.value; setItems(next); setResult(null); }}
                      style={{ flex: 1, border: "0.5px solid #C7D2FE", borderRadius: "7px", padding: "7px 10px", outline: "none", fontSize: "13px" }}
                    />
                    <button onClick={() => removeItem(idx)} disabled={items.length <= 2} style={{ width: "28px", height: "28px", borderRadius: "6px", border: "0.5px solid #FCA5A5", background: items.length > 2 ? "#FFF5F5" : "#F9FAFB", color: items.length > 2 ? "#EF4444" : "#D1D5DB", cursor: items.length > 2 ? "pointer" : "default", fontSize: "14px" }}>×</button>
                  </div>
                ))}
              </div>
              {items.length < 12 && (
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addItem()}
                    placeholder="Add new item…"
                    style={{ flex: 1, border: "0.5px solid #C7D2FE", borderRadius: "7px", padding: "8px 10px", outline: "none", fontSize: "13px" }}
                  />
                  <button onClick={addItem} style={{ padding: "8px 16px", borderRadius: "7px", border: "none", background: "#4F46E5", color: "white", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>Add</button>
                </div>
              )}
            </div>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "14px 16px", fontSize: "12px", color: "#6B7280" }}>
              Up to 12 items. Edit items directly in the list — the wheel updates in real time.
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
