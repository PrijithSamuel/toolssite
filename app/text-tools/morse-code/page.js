"use client";
import { useState, useRef } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const MORSE = {
  A:".-", B:"-...", C:"-.-.", D:"-..", E:".", F:"..-.", G:"--.", H:"....",
  I:"..", J:".---", K:"-.-", L:".-..", M:"--", N:"-.", O:"---", P:".--.",
  Q:"--.-", R:".-.", S:"...", T:"-", U:"..-", V:"...-", W:".--", X:"-..-",
  Y:"-.--", Z:"--..", "0":"-----", "1":".----", "2":"..---", "3":"...--",
  "4":"....-", "5":".....", "6":"-...." ,"7":"--...", "8":"---..", "9":"----.",
  ".":".-.-.-", ",":"--..--", "?":"..--..", "!":"-.-.--", "/":"-..-.",
  "(":"-.--.",")":"-.--.-","-":"-....-","'":".----.",
};

const MORSE_REVERSE = Object.fromEntries(Object.entries(MORSE).map(([k, v]) => [v, k]));

function encode(text) {
  return text.toUpperCase().split("").map((c) => {
    if (c === " ") return "/";
    return MORSE[c] || "?";
  }).join(" ");
}

function decode(morse) {
  return morse.trim().split(" / ").map((word) =>
    word.split(" ").map((code) => MORSE_REVERSE[code] || "?").join("")
  ).join(" ");
}

const REFERENCE = [
  ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
  ["J", "K", "L", "M", "N", "O", "P", "Q", "R"],
  ["S", "T", "U", "V", "W", "X", "Y", "Z"],
  ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
];

export default function MorseCodePage() {
  const [mode, setMode] = useState("encode");
  const [input, setInput] = useState("Hello World");
  const [playing, setPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const stopRef = useRef(false);

  const output = mode === "encode" ? encode(input) : decode(input);

  async function playMorse() {
    if (playing) { stopRef.current = true; return; }
    stopRef.current = false;
    setPlaying(true);
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const morseStr = mode === "encode" ? output : encode(decode(input));

    for (const sym of morseStr.split("")) {
      if (stopRef.current) break;
      if (sym === "." || sym === "-") {
        const dur = sym === "." ? 0.1 : 0.3;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.value = 600;
        osc.start(); gain.gain.setValueAtTime(0.3, ctx.currentTime);
        await new Promise((r) => setTimeout(r, dur * 1000));
        gain.gain.setValueAtTime(0, ctx.currentTime); osc.stop();
        await new Promise((r) => setTimeout(r, 80));
      } else if (sym === " ") {
        await new Promise((r) => setTimeout(r, 200));
      } else if (sym === "/") {
        await new Promise((r) => setTimeout(r, 400));
      }
    }
    setPlaying(false);
  }

  function copy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Text Tools", href: "/text-tools" }, { label: "Morse Code" }]} />
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>Morse Code Encoder / Decoder</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Encode text to morse code or decode morse back to text — with audio playback.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "18px" }}>
            {[{ val: "encode", label: "Text → Morse" }, { val: "decode", label: "Morse → Text" }].map(({ val, label }) => (
              <button key={val} onClick={() => { setMode(val); setInput(""); }} style={{ flex: 1, padding: "10px", borderRadius: "10px", border: "0.5px solid #C7D2FE", background: mode === val ? "#4F46E5" : "white", color: mode === val ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "600" }}>
                {label}
              </button>
            ))}
          </div>

          <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>
            {mode === "encode" ? "Enter text" : "Enter morse (dots, dashes, spaces — use / for word gaps)"}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" ? "Hello World" : ".... . .-.. .-.. --- / .-- --- .-. .-.. -.."}
            rows={4}
            style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "14px", fontFamily: mode === "decode" ? "monospace" : "inherit", resize: "vertical", boxSizing: "border-box" }}
          />
        </div>

        {input.trim() && (
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", gap: "8px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "12px", fontWeight: "600", color: "#374151" }}>Output</span>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={playMorse} style={{ padding: "6px 16px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: playing ? "#EF4444" : "#4F46E5", color: "white", fontSize: "12px", cursor: "pointer", fontWeight: "500" }}>
                  {playing ? "⏹ Stop" : "▶ Play Audio"}
                </button>
                <button onClick={copy} style={{ padding: "6px 14px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: copied ? "#10B981" : "white", color: copied ? "white" : "#374151", fontSize: "12px", cursor: "pointer" }}>
                  {copied ? "Copied ✓" : "Copy"}
                </button>
              </div>
            </div>
            <div style={{ fontFamily: "monospace", fontSize: "15px", color: "#1E1B4B", background: "#F8F9FF", borderRadius: "8px", padding: "14px", wordBreak: "break-all", lineHeight: "2" }}>
              {output || "(empty)"}
            </div>
            <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "8px" }}>
              · = dot (short beep) &nbsp;|&nbsp; − = dash (long beep) &nbsp;|&nbsp; / = word separator
            </div>
          </div>
        )}

        {/* Reference table */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "600", color: "#374151" }}>Morse Code Reference</div>
          {REFERENCE.map((row, ri) => (
            <div key={ri} style={{ display: "grid", gridTemplateColumns: `repeat(${row.length}, 1fr)`, borderBottom: "0.5px solid #F3F4F6" }}>
              {row.map((ch) => (
                <div key={ch} style={{ padding: "8px 10px", textAlign: "center", borderRight: "0.5px solid #F3F4F6" }}>
                  <div style={{ fontSize: "13px", fontWeight: "700", color: "#4F46E5" }}>{ch}</div>
                  <div style={{ fontFamily: "monospace", fontSize: "11px", color: "#374151" }}>{MORSE[ch]}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
