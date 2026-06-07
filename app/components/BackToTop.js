"use client";
import { useState, useEffect } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() { setVisible(window.scrollY > 400); }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      style={{
        position: "fixed", bottom: "80px", right: "20px",
        width: "40px", height: "40px", borderRadius: "50%",
        background: "#4F46E5", color: "white", border: "none",
        cursor: "pointer", fontSize: "18px", zIndex: 1000,
        boxShadow: "0 2px 8px rgba(79,70,229,0.4)",
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
      ↑
    </button>
  );
}
