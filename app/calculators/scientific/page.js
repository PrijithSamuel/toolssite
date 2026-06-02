"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function evaluate(expr, dispExpr) {
  if (!expr.trim()) return "";
  try {
    let processed = expr
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/−/g, "-")
      .replace(/sin\(/g, "Math.sin(")
      .replace(/cos\(/g, "Math.cos(")
      .replace(/tan\(/g, "Math.tan(")
      .replace(/log\(/g, "Math.log10(")
      .replace(/sqrt\(/g, "Math.sqrt(")
      .replace(/\^/g, "**");

    // Safety check: after stripping known Math references, only allow safe chars
    const stripped = processed.replace(/Math\.(sin|cos|tan|log10|sqrt|PI|E)\b/g, "0");
    if (/[a-zA-Z_$]/.test(stripped)) return "Error";

    // eslint-disable-next-line no-new-func
    const result = Function("Math", `"use strict"; return (${processed})`)(Math);
    if (!isFinite(result) || isNaN(result)) return "Error";
    const rounded = parseFloat(result.toPrecision(12));
    return rounded.toString();
  } catch {
    return "Error";
  }
}

const btnGroups = [
  [
    { label: "sin", expr: "sin(", type: "fn" },
    { label: "cos", expr: "cos(", type: "fn" },
    { label: "tan", expr: "tan(", type: "fn" },
    { label: "log", expr: "log(", type: "fn" },
  ],
  [
    { label: "√", expr: "sqrt(", type: "fn" },
    { label: "xʸ", expr: "^", type: "op" },
    { label: "π", expr: "Math.PI", display: "π", type: "const" },
    { label: "e", expr: "Math.E", display: "e", type: "const" },
  ],
  [
    { label: "C", type: "clear" },
    { label: "(", expr: "(", type: "op" },
    { label: ")", expr: ")", type: "op" },
    { label: "÷", expr: "÷", type: "op" },
  ],
  [
    { label: "7", expr: "7", type: "num" },
    { label: "8", expr: "8", type: "num" },
    { label: "9", expr: "9", type: "num" },
    { label: "×", expr: "×", type: "op" },
  ],
  [
    { label: "4", expr: "4", type: "num" },
    { label: "5", expr: "5", type: "num" },
    { label: "6", expr: "6", type: "num" },
    { label: "−", expr: "−", type: "op" },
  ],
  [
    { label: "1", expr: "1", type: "num" },
    { label: "2", expr: "2", type: "num" },
    { label: "3", expr: "3", type: "num" },
    { label: "+", expr: "+", type: "op" },
  ],
  [
    { label: "⌫", type: "backspace" },
    { label: "0", expr: "0", type: "num" },
    { label: ".", expr: ".", type: "num" },
    { label: "=", type: "equals" },
  ],
];

function btnStyle(type) {
  const base = { width: "100%", height: "52px", borderRadius: "8px", border: "none", fontSize: "15px", cursor: "pointer", fontWeight: "500", fontFamily: "inherit", transition: "opacity 0.1s" };
  if (type === "equals") return { ...base, background: "#4F46E5", color: "white", fontSize: "18px" };
  if (type === "clear") return { ...base, background: "#EF4444", color: "white" };
  if (type === "op") return { ...base, background: "#374151", color: "white" };
  if (type === "fn") return { ...base, background: "#1E293B", color: "#A5F3FC", fontSize: "13px" };
  if (type === "const") return { ...base, background: "#1E293B", color: "#FDE68A" };
  if (type === "backspace") return { ...base, background: "#4B5563", color: "white" };
  return { ...base, background: "#2D3748", color: "white" };
}

export default function ScientificCalculator() {
  const [expr, setExpr] = useState("");
  const [disp, setDisp] = useState("");
  const [lastResult, setLastResult] = useState("");
  const [justCalc, setJustCalc] = useState(false);

  function press(btn) {
    if (btn.type === "clear") {
      setExpr("");
      setDisp("");
      setLastResult("");
      setJustCalc(false);
      return;
    }
    if (btn.type === "backspace") {
      if (justCalc) { setExpr(""); setDisp(""); setJustCalc(false); return; }
      // Remove last token
      const ops = ["+", "−", "×", "÷", "^", "(", ")"];
      let newDisp = disp;
      let newExpr = expr;
      // check if last disp char was from a multi-char token
      const multiTokens = [
        { d: "π", e: "Math.PI" },
        { d: "e", e: "Math.E" },
        { d: "sin(", e: "sin(" },
        { d: "cos(", e: "cos(" },
        { d: "tan(", e: "tan(" },
        { d: "log(", e: "log(" },
        { d: "√(", e: "sqrt(" },
      ];
      let found = false;
      for (const t of multiTokens) {
        if (newDisp.endsWith(t.d)) {
          newDisp = newDisp.slice(0, -t.d.length);
          newExpr = newExpr.slice(0, -t.e.length);
          found = true;
          break;
        }
      }
      if (!found) {
        newDisp = newDisp.slice(0, -1);
        newExpr = newExpr.slice(0, -1);
      }
      setDisp(newDisp);
      setExpr(newExpr);
      return;
    }
    if (btn.type === "equals") {
      const res = evaluate(expr);
      if (res !== "") {
        setLastResult(res);
        setDisp(res);
        setExpr(res.replace(/−/g, "-"));
        setJustCalc(true);
      }
      return;
    }

    if (justCalc) {
      // If result is there and user types op, continue; if num, start fresh
      if (btn.type === "num") {
        setExpr(btn.expr);
        setDisp(btn.label);
        setJustCalc(false);
        return;
      }
      setJustCalc(false);
    }

    const displayChar = btn.display || (btn.type === "fn" ? btn.label + "(" : btn.label);
    setExpr((e) => e + btn.expr);
    setDisp((d) => d + displayChar);
  }

  const preview = expr && !justCalc ? evaluate(expr) : "";

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Calculators", href: "/calculators" }, { label: "Scientific Calculator" }]} />
      <div style={{ maxWidth: "380px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Scientific Calculator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Trig, log, sqrt, power and more.</p>
        </div>

        <div style={{ background: "#111827", borderRadius: "16px", padding: "20px", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
          {/* Display */}
          <div style={{ background: "#0F172A", borderRadius: "12px", padding: "16px 18px", marginBottom: "16px", minHeight: "80px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <div style={{ fontSize: "13px", color: "#6B7280", minHeight: "18px", textAlign: "right", fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {preview && preview !== "Error" && preview !== disp ? `= ${preview}` : ""}
            </div>
            <div style={{ fontSize: "26px", fontWeight: "400", color: disp ? "white" : "#4B5563", textAlign: "right", fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: "4px" }}>
              {disp || "0"}
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {btnGroups.map((row, ri) => (
              <div key={ri} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
                {row.map((btn) => (
                  <button key={btn.label} onClick={() => press(btn)} style={btnStyle(btn.type)}>
                    {btn.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
