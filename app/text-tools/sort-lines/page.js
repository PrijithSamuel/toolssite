"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function SortLines() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [sortType, setSortType] = useState("az");
  const [removeDupes, setRemoveDupes] = useState(false);
  const [trimLines, setTrimLines] = useState(true);

  function getResult() {
    if (!text.trim()) return "";
    let lines = text.split("\n");
    if (trimLines) lines = lines.map(l => l.trim());
    if (removeDupes) lines = [...new Set(lines)];
    switch (sortType) {
      case "az": lines = lines.sort((a, b) => a.localeCompare(b)); break;
      case "za": lines = lines.sort((a, b) => b.localeCompare(a)); break;
      case "shortest": lines = lines.sort((a, b) => a.length - b.length); break;
      case "longest": lines = lines.sort((a, b) => b.length - a.length); break;
      case "reverse": lines = lines.reverse(); break;
      case "random": lines = lines.sort(() => Math.random() - 0.5); break;
    }
    return lines.join("\n");
  }

  const result = getResult();

  function handleCopy() {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const sortOptions = [
    { id: "az", label: "A → Z" },
    { id: "za", label: "Z → A" },
    { id: "shortest", label: "Shortest first" },
    { id: "longest", label: "Longest first" },
    { id: "reverse", label: "Reverse order" },
    { id: "random", label: "Random shuffle" },
  ];

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Text Tools", href: "/text-tools" }, { label: "Sort Lines" }]} />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Sort Lines</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Sort lines of text alphabetically, by length or randomly. Free, no signup required.</p>
        </div>

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "14px" }}>
            {sortOptions.map((opt) => (
              <button key={opt.id} type="button" onClick={() => setSortType(opt.id)}
                style={{ padding: "7px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: "500", cursor: "pointer", border: "none", background: sortType === opt.id ? "#4F46E5" : "white", color: sortType === opt.id ? "white" : "#4B5563" }}>
                {opt.label}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            {[["removeDupes", "Remove duplicates", removeDupes, setRemoveDupes], ["trimLines", "Trim whitespace", trimLines, setTrimLines]].map(([id, label, val, setVal]) => (
              <label key={id} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#4B5563", cursor: "pointer" }}>
                <input type="checkbox" checked={val} onChange={(e) => setVal(e.target.checked)} />
                {label}
              </label>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <label style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", display: "block", marginBottom: "6px" }}>INPUT</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)}
              placeholder={"banana\napple\ncherry\ndate"}
              style={{ width: "100%", height: "280px", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "14px", fontSize: "13px", fontFamily: "monospace", lineHeight: "1.6", resize: "none", outline: "none", background: "white", color: "#374151" }} />
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <label style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500" }}>OUTPUT</label>
              {result && (
                <button type="button" onClick={handleCopy}
                  style={{ fontSize: "12px", color: "#6B7280", background: "#EEF2FF", border: "0.5px solid #C7D2FE", padding: "3px 10px", borderRadius: "6px", cursor: "pointer" }}>
                  {copied ? "Copied!" : "Copy"}
                </button>
              )}
            </div>
            <textarea readOnly value={result}
              placeholder="Sorted lines will appear here..."
              style={{ width: "100%", height: "280px", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "14px", fontSize: "13px", fontFamily: "monospace", lineHeight: "1.6", resize: "none", outline: "none", background: "#F9FAFB", color: "#374151" }} />
          </div>
        </div>

        <div style={{ marginTop: "24px", background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: "500", color: "#1E1B4B", marginBottom: "8px" }}>How to use</h2>
          <ul style={{ fontSize: "13px", color: "#4338CA", lineHeight: "1.8" }}>
            <li>• Paste your lines of text on the left</li>
            <li>• Choose a sort method from the buttons above</li>
            <li>• Result appears instantly on the right</li>
          </ul>
        </div>
      </div>
      <Footer />
    </main>
  );
}