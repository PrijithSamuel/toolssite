"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const words = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate", "velit", "esse", "cillum", "eu", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"];

function generateWords(count) {
  let result = [];
  for (let i = 0; i < count; i++) result.push(words[Math.floor(Math.random() * words.length)]);
  return result.join(" ");
}

function generateSentence() {
  const len = Math.floor(Math.random() * 10) + 8;
  const sentence = generateWords(len);
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
}

function generateParagraph() {
  const count = Math.floor(Math.random() * 4) + 4;
  return Array.from({ length: count }, generateSentence).join(" ");
}

export default function LoremIpsum() {
  const [type, setType] = useState("paragraphs");
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  function generate() {
    let result = "";
    if (type === "words") result = generateWords(count);
    else if (type === "sentences") result = Array.from({ length: count }, generateSentence).join(" ");
    else result = Array.from({ length: count }, generateParagraph).join("\n\n");
    setOutput(result);
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Text Tools", href: "/text-tools" }, { label: "Lorem Ipsum Generator" }]} />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Lorem Ipsum Generator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Generate placeholder text instantly. Free, no signup required.</p>
        </div>

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", display: "block", marginBottom: "6px" }}>TYPE</label>
              <select value={type} onChange={(e) => setType(e.target.value)}
                style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", fontSize: "14px", outline: "none", background: "white", color: "#374151" }}>
                <option value="paragraphs">Paragraphs</option>
                <option value="sentences">Sentences</option>
                <option value="words">Words</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", display: "block", marginBottom: "6px" }}>COUNT</label>
              <input type="number" min="1" max="20" value={count} onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", fontSize: "14px", outline: "none", background: "white", color: "#374151" }} />
            </div>
          </div>
          <button type="button" onClick={generate}
            style={{ width: "100%", background: "#4F46E5", color: "white", border: "none", padding: "12px", borderRadius: "10px", fontSize: "14px", fontWeight: "500", cursor: "pointer" }}>
            Generate
          </button>
        </div>

        {output && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500" }}>Generated Text</span>
              <button type="button" onClick={handleCopy}
                style={{ fontSize: "12px", color: "#6B7280", background: "#EEF2FF", border: "0.5px solid #C7D2FE", padding: "4px 12px", borderRadius: "6px", cursor: "pointer" }}>
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <textarea readOnly value={output}
              style={{ width: "100%", height: "280px", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px", fontSize: "14px", lineHeight: "1.7", resize: "none", outline: "none", background: "white", color: "#374151", fontFamily: "inherit" }} />
          </div>
        )}

        <div style={{ marginTop: "24px", background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: "500", color: "#1E1B4B", marginBottom: "8px" }}>How to use</h2>
          <ul style={{ fontSize: "13px", color: "#4338CA", lineHeight: "1.8" }}>
            <li>• Choose type — paragraphs, sentences or words</li>
            <li>• Set the count and click Generate</li>
            <li>• Copy the generated text to use anywhere</li>
          </ul>
        </div>
      </div>
      <Footer />
    </main>
  );
}