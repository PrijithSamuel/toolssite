import Link from "next/link";

export default function Footer() {
  return (
    <footer role="contentinfo" style={{ background: "#4F46E5", padding: "20px 24px", marginTop: "48px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>
          QuikToolkit — Free tools for everyone. No signup, no limits.
        </span>
        <div style={{ display: "flex", gap: "20px" }}>
          {[["About Us", "/about"], ["Privacy Policy", "/privacy-policy"], ["Terms", "/terms"], ["Contact", "/contact"]].map(([label, href]) => (
            <Link key={label} href={href} aria-label={label} style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}