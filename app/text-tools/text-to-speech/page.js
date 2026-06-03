"use client";
import { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function TextToSpeech() {
  const [text, setText] = useState("Welcome to QuikToolkit! This is the text-to-speech tool. Type or paste any text here and click Play to hear it read aloud.");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [speed, setSpeed] = useState(1.0);
  const [status, setStatus] = useState("idle");
  const [supported, setSupported] = useState(true);
  const utteranceRef = useRef(null);

  useEffect(() => {
    if (!("speechSynthesis" in window)) { setSupported(false); return; }
    function loadVoices() {
      const v = window.speechSynthesis.getVoices();
      if (v.length > 0) {
        setVoices(v);
        const eng = v.find((v) => v.lang.startsWith("en")) || v[0];
        setSelectedVoice(eng?.name || "");
      }
    }
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.cancel();
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  function play() {
    if (!text.trim()) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    const voice = voices.find((v) => v.name === selectedVoice);
    if (voice) utter.voice = voice;
    utter.rate = speed;
    utter.onstart = () => setStatus("playing");
    utter.onpause = () => setStatus("paused");
    utter.onresume = () => setStatus("playing");
    utter.onend = () => setStatus("idle");
    utter.onerror = () => setStatus("idle");
    utteranceRef.current = utter;
    window.speechSynthesis.speak(utter);
  }

  function pause() {
    if (status === "paused") {
      window.speechSynthesis.resume();
      setStatus("playing");
    } else {
      window.speechSynthesis.pause();
      setStatus("paused");
    }
  }

  function stop() {
    window.speechSynthesis.cancel();
    setStatus("idle");
  }

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const estSecs = Math.round((wordCount / (200 * speed)) * 60);

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Text Tools", href: "/text-tools" }, { label: "Text to Speech" }]} />
      <div style={{ maxWidth: "620px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Text to Speech</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Convert any text to speech using your browser&apos;s built-in voice engine. Works in Chrome and Edge.</p>
        </div>

        {!supported && (
          <div style={{ background: "#FFF5F5", border: "0.5px solid #FCA5A5", borderRadius: "12px", padding: "16px", marginBottom: "16px", fontSize: "13px", color: "#EF4444" }}>
            ⚠️ Your browser does not support the Web Speech API. Please use Chrome or Edge.
          </div>
        )}

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
          <div style={{ padding: "12px 16px", borderBottom: "0.5px solid #E0E7FF", display: "flex", justifyContent: "space-between", background: "#F8F9FF", fontSize: "13px", fontWeight: "500", color: "#374151" }}>
            <span>Text to read</span>
            <span style={{ fontWeight: "400", color: "#9CA3AF" }}>{wordCount} words · ~{estSecs}s at {speed}x</span>
          </div>
          <textarea
            value={text}
            onChange={(e) => { setText(e.target.value); stop(); }}
            rows={8}
            placeholder="Type or paste text here..."
            style={{ width: "100%", border: "none", padding: "16px", outline: "none", fontSize: "14px", lineHeight: "1.7", resize: "none", boxSizing: "border-box" }}
          />
        </div>

        {/* Controls */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "5px" }}>Voice</label>
            <select value={selectedVoice} onChange={(e) => setSelectedVoice(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "13px", cursor: "pointer" }}>
              {voices.length === 0 && <option value="">Loading voices…</option>}
              {voices.map((v) => (
                <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151" }}>Speed</label>
              <span style={{ fontSize: "12px", fontWeight: "600", color: "#4F46E5" }}>{speed.toFixed(1)}×</span>
            </div>
            <input type="range" min="0.5" max="2" step="0.1" value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} style={{ width: "100%", accentColor: "#4F46E5" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#9CA3AF" }}>
              <span>0.5× (slow)</span>
              <span>1× (normal)</span>
              <span>2× (fast)</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            {status === "idle" ? (
              <button onClick={play} disabled={!supported || !text.trim()} style={{ flex: 2, padding: "14px", borderRadius: "10px", border: "none", background: supported && text.trim() ? "#4F46E5" : "#E5E7EB", color: "white", fontSize: "16px", cursor: supported && text.trim() ? "pointer" : "default", fontWeight: "600" }}>
                ▶ Play
              </button>
            ) : (
              <button onClick={pause} style={{ flex: 2, padding: "14px", borderRadius: "10px", border: "none", background: "#F59E0B", color: "white", fontSize: "16px", cursor: "pointer", fontWeight: "600" }}>
                {status === "paused" ? "▶ Resume" : "⏸ Pause"}
              </button>
            )}
            <button onClick={stop} disabled={status === "idle"} style={{ flex: 1, padding: "14px", borderRadius: "10px", border: "0.5px solid #E0E7FF", background: "white", color: status !== "idle" ? "#374151" : "#D1D5DB", fontSize: "14px", cursor: status !== "idle" ? "pointer" : "default", fontWeight: "500" }}>
              ⏹ Stop
            </button>
          </div>

          {status !== "idle" && (
            <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#6366F1" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: status === "playing" ? "#10B981" : "#F59E0B", animation: status === "playing" ? "pulse 1.5s infinite" : "none" }} />
              {status === "playing" ? "Speaking…" : "Paused"}
            </div>
          )}
        </div>

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "14px 16px", fontSize: "12px", color: "#6B7280" }}>
          Uses your browser&apos;s built-in Web Speech API. No data is sent to any server. Available voices depend on your operating system and browser language settings.
        </div>
      </div>
      <Footer />
    </main>
  );
}
