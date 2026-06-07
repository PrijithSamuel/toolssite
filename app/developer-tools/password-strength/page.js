"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const COMMON_PATTERNS = ["123", "abc", "password", "qwerty", "111", "000", "letmein", "admin", "welcome", "login", "iloveyou", "monkey", "dragon"];

function analyze(pw) {
  const len = pw.length;
  const hasUpper = /[A-Z]/.test(pw);
  const hasLower = /[a-z]/.test(pw);
  const hasNum = /[0-9]/.test(pw);
  const hasSpecial = /[^A-Za-z0-9]/.test(pw);
  const has8 = len >= 8;
  const has12 = len >= 12;
  const hasPattern = COMMON_PATTERNS.some((p) => pw.toLowerCase().includes(p));

  let score = 0;
  if (has8) score++;
  if (has12) score++;
  if (hasUpper) score++;
  if (hasLower) score++;
  if (hasNum) score++;
  if (hasSpecial) score++;
  if (!hasPattern) score++;
  if (len >= 16) score++;

  // Entropy estimate: character pool size
  let pool = 0;
  if (hasLower) pool += 26;
  if (hasUpper) pool += 26;
  if (hasNum) pool += 10;
  if (hasSpecial) pool += 32;
  if (pool === 0) pool = 26;
  const entropy = len * Math.log2(pool);

  let timeToCrack = "";
  if (hasPattern || len < 6) timeToCrack = "Instantly";
  else if (entropy < 28) timeToCrack = "Instantly";
  else if (entropy < 36) timeToCrack = "Minutes";
  else if (entropy < 50) timeToCrack = "Hours to days";
  else if (entropy < 65) timeToCrack = "Years";
  else if (entropy < 80) timeToCrack = "Centuries";
  else timeToCrack = "Billions of years";

  let level, label, color, bg, border;
  if (score <= 2) { level = 0; label = "Very Weak"; color = "#EF4444"; bg = "#FFF5F5"; border = "#FCA5A5"; }
  else if (score <= 3) { level = 1; label = "Weak"; color = "#F97316"; bg = "#FFF7ED"; border = "#FED7AA"; }
  else if (score <= 4) { level = 2; label = "Fair"; color = "#EAB308"; bg = "#FEFCE8"; border = "#FDE68A"; }
  else if (score <= 6) { level = 3; label = "Strong"; color = "#3B82F6"; bg = "#EFF6FF"; border = "#BFDBFE"; }
  else { level = 4; label = "Very Strong"; color = "#10B981"; bg = "#ECFDF5"; border = "#6EE7B7"; }

  const tips = [];
  if (!has8) tips.push("Use at least 8 characters");
  else if (!has12) tips.push("Use at least 12 characters for better security");
  if (!hasUpper) tips.push("Add uppercase letters (A–Z)");
  if (!hasLower) tips.push("Add lowercase letters (a–z)");
  if (!hasNum) tips.push("Include numbers (0–9)");
  if (!hasSpecial) tips.push("Add special characters (!@#$%^&*)");
  if (hasPattern) tips.push("Avoid common patterns like '123', 'abc', 'password'");

  return {
    has8, has12, hasUpper, hasLower, hasNum, hasSpecial, hasPattern,
    level, label, color, bg, border, score, timeToCrack, entropy: Math.round(entropy), tips,
  };
}

const CHECKS = [
  { key: "has8", label: "At least 8 characters" },
  { key: "has12", label: "At least 12 characters" },
  { key: "hasUpper", label: "Uppercase letters (A–Z)" },
  { key: "hasLower", label: "Lowercase letters (a–z)" },
  { key: "hasNum", label: "Numbers (0–9)" },
  { key: "hasSpecial", label: "Special characters (!@#…)" },
  { key: "hasPattern", label: "No common patterns", invert: true },
];

const STRENGTH_COLORS = ["#EF4444", "#F97316", "#EAB308", "#3B82F6", "#10B981"];

export default function PasswordStrength() {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const result = password.length > 0 ? analyze(password) : null;

  const timeColors = {
    "Instantly": "#EF4444",
    "Minutes": "#F97316",
    "Hours to days": "#EAB308",
    "Years": "#3B82F6",
    "Centuries": "#10B981",
    "Billions of years": "#10B981",
  };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Developer Tools", href: "/developer-tools" }, { label: "Password Strength Checker" }]} />
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Password Strength Checker</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Analyse your password strength instantly — nothing is sent to a server.</p>
        </div>

        {/* Input */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "8px" }}>Enter password</label>
          <div style={{ position: "relative" }}>
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type your password here…"
              autoComplete="off"
              style={{ border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "12px 44px 12px 14px", outline: "none", background: "white", fontSize: "16px", width: "100%", boxSizing: "border-box", fontFamily: show ? "monospace" : "inherit" }}
            />
            <button onClick={() => setShow((v) => !v)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#9CA3AF" }}>
              {show ? "🙈" : "👁"}
            </button>
          </div>
          <div style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "6px" }}>
            🔒 Checked entirely in your browser — your password is never transmitted.
          </div>
        </div>

        {result && (
          <>
            {/* Strength bar */}
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px 24px", marginBottom: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "10px" }}>
                <span style={{ fontSize: "13px", fontWeight: "500", color: "#374151" }}>Strength</span>
                <span style={{ fontSize: "18px", fontWeight: "700", color: result.color }}>{result.label}</span>
              </div>
              {/* 5-segment bar */}
              <div style={{ display: "flex", gap: "4px", marginBottom: "10px" }}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} style={{ flex: 1, height: "8px", borderRadius: "4px", background: i <= result.level ? STRENGTH_COLORS[result.level] : "#E5E7EB", transition: "background 0.3s" }} />
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#9CA3AF" }}>
                <span>Very Weak</span><span>Weak</span><span>Fair</span><span>Strong</span><span>Very Strong</span>
              </div>
            </div>

            {/* Time to crack */}
            <div style={{ background: result.bg, border: `0.5px solid ${result.border}`, borderRadius: "12px", padding: "16px 20px", marginBottom: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "12px", fontWeight: "600", color: result.color, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "2px" }}>Estimated Time to Crack</div>
                <div style={{ fontSize: "11px", color: "#6B7280" }}>~{result.entropy} bits of entropy</div>
              </div>
              <div style={{ fontSize: "24px", fontWeight: "700", color: timeColors[result.timeToCrack] ?? result.color }}>
                {result.timeToCrack}
              </div>
            </div>

            {/* Checklist */}
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "14px" }}>
              <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "600", color: "#374151", background: "#F8F9FF" }}>
                Requirements
              </div>
              {CHECKS.map(({ key, label, invert }) => {
                const raw = result[key];
                const pass = invert ? !raw : raw;
                return (
                  <div key={key} style={{ padding: "11px 20px", borderBottom: "0.5px solid #F3F4F6", display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: pass ? "#DCFCE7" : "#FEE2E2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "13px" }}>
                      {pass ? "✓" : "✗"}
                    </div>
                    <span style={{ fontSize: "13px", color: pass ? "#374151" : "#9CA3AF" }}>{label}</span>
                  </div>
                );
              })}
            </div>

            {/* Tips */}
            {result.tips.length > 0 && (
              <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px 20px" }}>
                <div style={{ fontSize: "13px", fontWeight: "600", color: "#4F46E5", marginBottom: "10px" }}>💡 How to improve</div>
                <ul style={{ margin: 0, paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  {result.tips.map((tip) => (
                    <li key={tip} style={{ fontSize: "13px", color: "#374151", lineHeight: "1.5" }}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {result.tips.length === 0 && (
              <div style={{ background: "#ECFDF5", border: "0.5px solid #6EE7B7", borderRadius: "12px", padding: "14px 20px", fontSize: "13px", color: "#065F46", fontWeight: "500" }}>
                ✅ Excellent password! All security checks passed.
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
