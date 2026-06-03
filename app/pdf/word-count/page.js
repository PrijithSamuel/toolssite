"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function analyze(text) {
  if (!text.trim()) return null;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length;
  const pages = Math.ceil(words / 250);
  const readingMins = Math.max(1, Math.ceil(words / 200));
  const readingSecs = Math.round((words / 200) * 60) % 60;
  return { words, chars, charsNoSpaces, sentences, paragraphs, pages, readingMins, readingSecs };
}

export default function WordCount() {
  const [text, setText] = useState("");

  const stats = analyze(text);

  const StatCard = ({ value, label, color = "#4F46E5" }) => (
    <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "10px", padding: "14px 16px", textAlign: "center" }}>
      <div style={{ fontSize: "28px", fontWeight: "500", color }}>{typeof value === "number" ? value.toLocaleString() : value}</div>
      <div style={{ fontSize: "11px", color: "#6B7280", marginTop: "2px" }}>{label}</div>
    </div>
  );

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "PDF Tools", href: "/pdf" }, { label: "Word Count" }]} />
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Word Count & Text Analyzer</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Paste your text or copy from a PDF to count words, characters and estimate reading time.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
          <div style={{ padding: "12px 16px", borderBottom: "0.5px solid #E0E7FF", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#F8F9FF" }}>
            <span style={{ fontSize: "13px", fontWeight: "500", color: "#374151" }}>Paste your text here</span>
            {text && <button onClick={() => setText("")} style={{ fontSize: "12px", color: "#6B7280", background: "none", border: "none", cursor: "pointer" }}>Clear</button>}
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste the content of your document, PDF, or essay here..."
            rows={12}
            style={{ width: "100%", border: "none", padding: "16px", outline: "none", fontSize: "14px", lineHeight: "1.7", resize: "none", boxSizing: "border-box", background: "white" }}
          />
        </div>

        {stats ? (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "16px" }}>
              <StatCard value={stats.words} label="Words" />
              <StatCard value={stats.chars} label="Characters" color="#10B981" />
              <StatCard value={stats.charsNoSpaces} label="Chars (no spaces)" color="#F59E0B" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "16px" }}>
              <StatCard value={stats.sentences} label="Sentences" color="#8B5CF6" />
              <StatCard value={stats.paragraphs} label="Paragraphs" color="#06B6D4" />
              <StatCard value={stats.pages} label="Est. Pages" color="#EC4899" />
            </div>

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "13px", fontWeight: "500", color: "#374151" }}>Estimated Reading Time</div>
                <div style={{ fontSize: "12px", color: "#6B7280" }}>Based on 200 words per minute</div>
              </div>
              <div style={{ fontSize: "24px", fontWeight: "500", color: "#4F46E5" }}>
                {stats.readingMins} min{stats.readingMins !== 1 ? "s" : ""} {stats.readingSecs > 0 ? `${stats.readingSecs}s` : ""}
              </div>
            </div>
          </>
        ) : (
          <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", textAlign: "center", color: "#6B7280", fontSize: "14px" }}>
            Paste text above to see detailed statistics
          </div>
        )}

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "14px 16px", marginTop: "16px", fontSize: "12px", color: "#6B7280" }}>
          💡 <strong style={{ color: "#374151" }}>Tip:</strong> To analyze a PDF, open it in your browser or PDF reader, select all text (Ctrl+A), copy (Ctrl+C), and paste it here.
        </div>
      </div>
      <Footer />
    </main>
  );
}
