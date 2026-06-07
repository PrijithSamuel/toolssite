import Link from "next/link";

export default function Footer() {
  return (
    <footer role="contentinfo" style={{ background: "#1E1B4B", padding: "40px 24px 20px", marginTop: "48px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "32px", marginBottom: "32px" }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <span style={{ fontSize: "20px" }}>🛠️</span>
              <span style={{ fontSize: "16px", fontWeight: "500", color: "white" }}>QuikToolkit</span>
            </div>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: "1.7", marginBottom: "16px" }}>
              Free online tools for everyone. PDF tools, calculators, converters, text tools, image tools and developer tools. No signup, no limits.
            </p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["🔒 Browser-based", "⚡ No signup", "💯 Always free"].map(badge => (
                <span key={badge} style={{ fontSize: "11px", padding: "3px 8px", background: "rgba(255,255,255,0.1)", borderRadius: "4px", color: "rgba(255,255,255,0.7)" }}>{badge}</span>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 style={{ fontSize: "13px", fontWeight: "500", color: "white", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Tools</h3>
            {[["PDF Tools", "/pdf"], ["Calculators", "/calculators"], ["Converters", "/converters"], ["Image Tools", "/image-tools"], ["Text Tools", "/text-tools"], ["Developer Tools", "/developer-tools"]].map(([label, href]) => (
              <Link key={href} href={href} aria-label={label} style={{ display: "block", fontSize: "13px", color: "rgba(255,255,255,0.6)", textDecoration: "none", marginBottom: "6px" }}>{label}</Link>
            ))}
          </div>

          {/* Finance */}
          <div>
            <h3 style={{ fontSize: "13px", fontWeight: "500", color: "white", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Finance</h3>
            {[["India Tax", "/finance/india-income-tax"], ["Germany Brutto-Netto", "/finance/brutto-netto"], ["Ireland Tax", "/finance/ireland-tax"], ["Netherlands Tax", "/finance/netherlands-tax"], ["Canada Tax", "/finance/canada-income-tax"], ["USA Paycheck", "/finance/usa-paycheck"]].map(([label, href]) => (
              <Link key={href} href={href} aria-label={label} style={{ display: "block", fontSize: "13px", color: "rgba(255,255,255,0.6)", textDecoration: "none", marginBottom: "6px" }}>{label}</Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <h3 style={{ fontSize: "13px", fontWeight: "500", color: "white", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Company</h3>
            {[["About Us", "/about"], ["Contact", "/contact"], ["Privacy Policy", "/privacy-policy"], ["Terms of Service", "/terms"]].map(([label, href]) => (
              <Link key={href} href={href} aria-label={label} style={{ display: "block", fontSize: "13px", color: "rgba(255,255,255,0.6)", textDecoration: "none", marginBottom: "6px" }}>{label}</Link>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.1)", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>{"© " + new Date().getFullYear() + " QuikToolkit. Free online tools for everyone."}</span>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>No data stored. No signup required. 100% browser-based.</span>
        </div>
      </div>
    </footer>
  );
}
