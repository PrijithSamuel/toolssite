"use client";
import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("cookie_consent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div role="dialog" aria-label="Cookie consent" style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 9999,
      background: "#1E1B4B", padding: "16px 24px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      gap: "16px", flexWrap: "wrap",
      boxShadow: "0 -2px 12px rgba(0,0,0,0.15)"
    }}>
      <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)", margin: 0, maxWidth: "680px", lineHeight: "1.6" }}>
        We use cookies for advertising (Google AdSense) and anonymous analytics (Vercel Analytics). By clicking Accept you consent to our use of cookies.{" "}
        <a href="/privacy-policy" style={{ color: "#A5B4FC", textDecoration: "underline" }}>Privacy Policy</a>
      </p>
      <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
        <button onClick={decline} style={{
          background: "transparent", border: "0.5px solid rgba(255,255,255,0.4)",
          color: "rgba(255,255,255,0.75)", borderRadius: "8px",
          padding: "8px 18px", fontSize: "13px", cursor: "pointer"
        }}>
          Decline
        </button>
        <button onClick={accept} style={{
          background: "#4F46E5", border: "none",
          color: "white", borderRadius: "8px",
          padding: "8px 18px", fontSize: "13px", cursor: "pointer", fontWeight: "500"
        }}>
          Accept
        </button>
      </div>
    </div>
  );
}
