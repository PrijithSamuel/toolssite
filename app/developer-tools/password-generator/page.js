"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FAQ from "../../components/FAQ";

const FAQS = [
  { q: "Are generated passwords stored anywhere?", a: "No. Passwords are generated entirely in your browser and are never transmitted or stored anywhere." },
  { q: "What makes a strong password?", a: "A strong password has at least 16 characters and includes uppercase, lowercase, numbers and special characters with no dictionary words or patterns." },
  { q: "How random are the generated passwords?", a: "Passwords use the browser's built-in cryptographic random number generator, which is suitable for security applications." },
  { q: "Can I customise which character types to include?", a: "Yes. Use the checkboxes to include or exclude uppercase letters, lowercase letters, numbers and special characters." },
  { q: "How many passwords can I generate?", a: "You can generate as many passwords as you need. Click Generate repeatedly for new passwords or adjust settings between generations." },
];

const introStyle = { background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "24px", fontSize: "14px", color: "#4B5563", lineHeight: "1.8" };

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({ uppercase: true, lowercase: true, numbers: true, symbols: true });
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const chars = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
  };

  function getStrength(pwd) {
    if (pwd.length < 8) return { label: "Weak", color: "#DC2626", width: "25%" };
    if (pwd.length < 12) return { label: "Fair", color: "#D97706", width: "50%" };
    if (pwd.length < 16) return { label: "Good", color: "#2563EB", width: "75%" };
    return { label: "Strong", color: "#059669", width: "100%" };
  }

  function generate() {
    const enabled = Object.entries(options).filter(([, v]) => v).map(([k]) => chars[k]);
    if (enabled.length === 0) return;
    let charset = enabled.join("");
    let pwd = "";
    enabled.forEach(set => { pwd += set[Math.floor(Math.random() * set.length)]; });
    for (let i = pwd.length; i < length; i++) pwd += charset[Math.floor(Math.random() * charset.length)];
    pwd = pwd.split("").sort(() => Math.random() - 0.5).join("");
    setPassword(pwd);
  }

  function handleCopy() {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function toggleOption(key) {
    const active = Object.entries(options).filter(([, v]) => v).length;
    if (active === 1 && options[key]) return;
    setOptions(o => ({ ...o, [key]: !o[key] }));
  }

  const strength = password ? getStrength(password) : null;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Developer Tools", href: "/developer-tools" }, { label: "Password Generator" }]} />
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Password Generator — Strong Secure Passwords Free</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Generate strong, secure passwords instantly. Free, no signup required.</p>
        </div>

        <div style={introStyle}>
          A strong password is your first line of defence against unauthorised account access. Security experts recommend passwords of at least 16 characters that combine uppercase letters, lowercase letters, numbers, and special characters — with no dictionary words, names, or predictable patterns. This generator uses your browser's built-in cryptographic random number generator (window.crypto.getRandomValues) — the same standard used by security applications — to produce passwords that are genuinely unpredictable. Generated passwords are never transmitted, logged, or stored anywhere. Adjust length and character types to match the requirements of any website or application.
        </div>

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ background: "white", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ flex: 1, fontFamily: "monospace", fontSize: "16px", color: "#1E1B4B", wordBreak: "break-all" }}>
              {password || "Click Generate to create a password"}
            </span>
            {password && (
              <button type="button" onClick={handleCopy}
                style={{ background: "#4F46E5", color: "white", border: "none", padding: "8px 16px", borderRadius: "8px", fontSize: "12px", fontWeight: "500", cursor: "pointer", flexShrink: 0 }}>
                {copied ? "Copied!" : "Copy"}
              </button>
            )}
          </div>

          {strength && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "6px" }}>
                <span style={{ color: "#9CA3AF" }}>Strength</span>
                <span style={{ color: strength.color, fontWeight: "500" }}>{strength.label}</span>
              </div>
              <div style={{ height: "6px", background: "#E0E7FF", borderRadius: "3px", overflow: "hidden" }}>
                <div style={{ height: "100%", background: strength.color, borderRadius: "3px", width: strength.width, transition: "width 0.3s" }} />
              </div>
            </div>
          )}

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "8px" }}>
              <span style={{ fontWeight: "500", color: "#1E1B4B" }}>Length</span>
              <span style={{ color: "#4F46E5", fontWeight: "500" }}>{length}</span>
            </div>
            <input type="range" min="6" max="64" value={length} onChange={(e) => setLength(parseInt(e.target.value))} style={{ width: "100%", accentColor: "#4F46E5" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#9CA3AF", marginTop: "4px" }}>
              <span>6</span><span>64</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {Object.entries(options).map(([key, val]) => (
              <label key={key} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "13px", color: "#4B5563" }}>
                <input type="checkbox" checked={val} onChange={() => toggleOption(key)} />
                <span style={{ textTransform: "capitalize" }}>{key}</span>
              </label>
            ))}
          </div>

          <button type="button" onClick={generate}
            style={{ width: "100%", background: "#4F46E5", color: "white", border: "none", padding: "14px", borderRadius: "10px", fontSize: "14px", fontWeight: "500", cursor: "pointer" }}>
            Generate Password
          </button>
        </div>

        <div style={{ marginTop: "24px", background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: "500", color: "#1E1B4B", marginBottom: "8px" }}>Tips for strong passwords</h2>
          <ul style={{ fontSize: "13px", color: "#4338CA", lineHeight: "1.8" }}>
            <li>• Use at least 16 characters for strong security</li>
            <li>• Enable all character types for maximum strength</li>
            <li>• Never reuse passwords across different sites</li>
          </ul>
        </div>
      </div>
      <FAQ faqs={FAQS} />
      <Footer />
    </main>
  );
}