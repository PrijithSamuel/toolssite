"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SchemaOrg from "../../components/SchemaOrg";
import FAQ from "../../components/FAQ";

const FAQS = [
  { q: "Does the word counter work offline?", a: "Yes. The word counter works entirely in your browser with no internet connection needed after the page loads." },
  { q: "Is there a word limit?", a: "No limit. You can paste or type any amount of text." },
  { q: "How is reading time calculated?", a: "Reading time is calculated based on an average reading speed of 200 words per minute which is typical for most adults." },
  { q: "Does it count words in all languages?", a: "The counter works best with English and space-separated languages. It counts any sequence of characters separated by spaces as a word." },
  { q: "Are my text contents saved?", a: "No. Everything stays in your browser. No text is stored or sent anywhere." },
];

export default function WordCounter() {
  const [text, setText] = useState("");

  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const sentences = text.trim() === "" ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const paragraphs = text.trim() === "" ? 0 : text.split(/\n+/).filter(p => p.trim().length > 0).length;
  const readingTime = Math.ceil(words / 200);

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <SchemaOrg name="Word Counter" description="Count words characters sentences free online" url="/text-tools/word-counter" />
      <Header breadcrumbs={[{ label: "Text Tools", href: "/text-tools" }, { label: "Word Counter" }]} />

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 24px" }}>

        {/* Title */}
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Word Counter</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Count words, characters, sentences and paragraphs instantly. Free, no signup required.</p>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "10px", marginBottom: "20px" }}>
          {[
            { label: "Words", value: words },
            { label: "Characters", value: characters },
            { label: "No Spaces", value: charactersNoSpaces },
            { label: "Sentences", value: sentences },
            { label: "Paragraphs", value: paragraphs },
            { label: "Read Time", value: readingTime + " min" },
          ].map((stat) => (
            <div key={stat.label} style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "10px", padding: "14px 8px", textAlign: "center" }}>
              <div style={{ fontSize: "22px", fontWeight: "500", color: "#4F46E5" }}>{stat.value}</div>
              <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "4px" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Textarea */}
        <div style={{ position: "relative" }}>
          <textarea
            style={{ width: "100%", height: "280px", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px", fontSize: "14px", color: "#374151", lineHeight: "1.6", resize: "none", outline: "none", background: "white", fontFamily: "inherit" }}
            placeholder="Start typing or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {text && (
            <button
              type="button"
              aria-label="Clear text"
              onClick={() => setText("")}
              style={{ position: "absolute", top: "12px", right: "12px", fontSize: "12px", color: "#6B7280", background: "white", border: "0.5px solid #E0E7FF", padding: "4px 12px", borderRadius: "6px", cursor: "pointer" }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Tips */}
        <div style={{ marginTop: "24px", background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: "500", color: "#1E1B4B", marginBottom: "8px" }}>How to use</h2>
          <ul style={{ fontSize: "13px", color: "#4338CA", lineHeight: "1.8" }}>
            <li>• Type or paste any text in the box above</li>
            <li>• Stats update instantly as you type</li>
            <li>• Reading time is based on 200 words per minute</li>
          </ul>
        </div>

      </div>

      <FAQ faqs={FAQS} />
      <Footer />
    </main>
  );
}