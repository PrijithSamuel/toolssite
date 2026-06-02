"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function LineCounter() {
  const [text, setText] = useState("");

  const lines = text.split("\n");
  const totalLines = lines.length;
  const emptyLines = lines.filter(l => l.trim() === "").length;
  const nonEmptyLines = totalLines - emptyLines;
  const longestLine = Math.max(...lines.map(l => l.length));
  const avgLength = nonEmptyLines > 0 ? Math.round(lines.filter(l => l.trim()).reduce((a, l) => a + l.length, 0) / nonEmptyLines) : 0;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Text Tools", href: "/text-tools" }, { label: "Line Counter" }]} />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Line Counter</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Count lines, empty lines and get line statistics instantly. Free, no signup required.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px", marginBottom: "16px" }}>
          {[
            ["Total Lines", totalLines],
            ["Non-empty", nonEmptyLines],
            ["Empty Lines", emptyLines],
            ["Longest", longestLine + " chars"],
            ["Avg Length", avgLength + " chars"],
          ].map(([label, value]) => (
            <div key={label} style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "10px", padding: "14px 8px", textAlign: "center" }}>
              <div style={{ fontSize: "20px", fontWeight: "500", color: "#4F46E5" }}>{value}</div>
              <div style={{ fontSize: "10px", color: "#9CA3AF", marginTop: "4px" }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ position: "relative" }}>
          <textarea value={text} onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here to count lines..."
            style={{ width: "100%", height: "320px", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px", fontSize: "14px", lineHeight: "1.6", resize: "none", outline: "none", background: "white", color: "#374151", fontFamily: "monospace" }} />
          {text && (
            <button type="button" onClick={() => setText("")}
              style={{ position: "absolute", top: "12px", right: "12px", fontSize: "12px", color: "#6B7280", background: "white", border: "0.5px solid #E0E7FF", padding: "4px 12px", borderRadius: "6px", cursor: "pointer" }}>
              Clear
            </button>
          )}
        </div>

        {text && (
          <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "4px", maxHeight: "200px", overflowY: "auto", background: "white", border: "0.5px solid #E0E7FF", borderRadius: "10px", padding: "12px" }}>
            {lines.map((line, i) => (
              <div key={i} style={{ display: "flex", gap: "12px", fontSize: "13px", fontFamily: "monospace" }}>
                <span style={{ color: "#A5B4FC", minWidth: "32px", textAlign: "right", flexShrink: 0 }}>{i + 1}</span>
                <span style={{ color: line.trim() === "" ? "#D1D5DB" : "#374151" }}>{line || "(empty)"}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: "24px", background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: "500", color: "#1E1B4B", marginBottom: "8px" }}>How to use</h2>
          <ul style={{ fontSize: "13px", color: "#4338CA", lineHeight: "1.8" }}>
            <li>• Paste any text or code in the box above</li>
            <li>• Line stats update instantly</li>
            <li>• Each line is shown with its line number below</li>
          </ul>
        </div>
      </div>
      <Footer />
    </main>
  );
}