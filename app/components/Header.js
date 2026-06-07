"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "PDF", href: "/pdf" },
  { label: "Calculators", href: "/calculators" },
  { label: "Finance", href: "/finance" },
  { label: "Converters", href: "/converters" },
  { label: "Text Tools", href: "/text-tools" },
  { label: "Engineering", href: "/engineering" },
  { label: "Games", href: "/games" },
  { label: "More ▾", href: "/search" },
];

export default function Header({ breadcrumbs = [] }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav role="navigation" aria-label="Main navigation" style={{ background: "#4F46E5" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", height: "56px" }}>
          <Link href="/" aria-label="QuikToolkit home page" style={{ display: "flex", alignItems: "center", gap: "7px", marginRight: "16px", textDecoration: "none", flexShrink: 0 }}>
            <div style={{ width: "28px", height: "28px", background: "rgba(255,255,255,0.2)", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span aria-hidden="true" style={{ fontSize: "16px" }}>🛠️</span>
            </div>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "white" }}>QuikToolkit</span>
          </Link>

          <div className="nav-links-row" style={{ display: "flex", flex: 1, overflow: "hidden" }}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link-item" style={{ padding: "0 14px", height: "56px", display: "flex", alignItems: "center", fontSize: "11.5px", color: "rgba(255,255,255,0.95)", textDecoration: "none", whiteSpace: "nowrap" }}>
                {link.label}
              </Link>
            ))}
          </div>

          <Link href="/search" aria-label="Search all tools on QuikToolkit" style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(255,255,255,0.15)",
            border: "0.5px solid rgba(255,255,255,0.3)",
            borderRadius: "20px",
            padding: "7px 16px",
            textDecoration: "none",
            marginLeft: "auto",
            flexShrink: 0,
          }}>
            <span aria-hidden="true" style={{ fontSize: "14px" }}>🔍</span>
            <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.9)", fontWeight: "500" }}>Search</span>
          </Link>

          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{ background: "none", border: "none", color: "white", cursor: "pointer", padding: "8px", marginLeft: "8px", fontSize: "20px", display: "none" }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-menu" style={{ background: "#3730A3", padding: "8px 0" }}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                style={{ padding: "12px 24px", fontSize: "14px", color: "rgba(255,255,255,0.95)", textDecoration: "none", display: "block" }}>
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {breadcrumbs.length > 0 && (
        <div style={{ background: "#EEF2FF", borderBottom: "0.5px solid #C7D2FE", padding: "8px 24px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", gap: "6px" }}>
            <Link href="/" style={{ fontSize: "12px", color: "#6366F1", textDecoration: "none" }}>Home</Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "12px", color: "#A5B4FC" }}>/</span>
                {crumb.href ? (
                  <Link href={crumb.href} style={{ fontSize: "12px", color: "#6366F1", textDecoration: "none" }}>{crumb.label}</Link>
                ) : (
                  <span style={{ fontSize: "12px", color: "#1E1B4B", fontWeight: "500" }}>{crumb.label}</span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
