"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function TextReverser() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState("");

  const reversed = text.split("").reverse().join("");
  const reversedWords = text.split(" ").reverse().join(" ");
  const reversedLines = text.split("\n").reverse().join("\n");

  function handleCopy(val, label) {
    navigator.clipboard.writeText(val);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  }

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Text Tools", href: "/text-tools" }, { label: "Text Reverser" }]} />

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Text Reverser</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Reverse characters, words or lines instantly. Free, no signup required.</p>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <textarea
            style={{ width: "100%", height: "140px", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px", fontSize: "14px", color: "#374151", lineHeight: "1.6", resize: "none", outline: "none", background: "white", fontFamily: "inherit" }}
            placeholder="Type or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {text && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { label: "Reversed Characters", value: reversed },
              { label: "Reversed Words", value: reversedWords },
              { label: "Reversed Lines", value: reversedLines },
            ].map((item) => (
              <div key={item.label} style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "14px 16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ fontSize: "12px", fontWeight: "500", color: "#6366F1" }}>{item.label}</span>
                  <button type="button" onClick={() => handleCopy(item.value, item.label)}
                    style={{ fontSize: "12px", color: "#6B7280", background: "#EEF2FF", border: "0.5px solid #C7D2FE", padding: "3px 10px", borderRadius: "6px", cursor: "pointer" }}>
                    {copied === item.label ? "Copied!" : "Copy"}
                  </button>
                </div>
                <p style={{ fontSize: "13px", color: "#374151", wordBreak: "break-all", margin: 0 }}>{item.value}</p>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: "24px", background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: "500", color: "#1E1B4B", marginBottom: "8px" }}>How to use</h2>
          <ul style={{ fontSize: "13px", color: "#4338CA", lineHeight: "1.8" }}>
            <li>• Type or paste your text in the box above</li>
            <li>• Results appear instantly in 3 formats</li>
            <li>• Click Copy next to any result</li>
          </ul>
        </div>
      </div>
      <Footer />
    </main>
  );
}