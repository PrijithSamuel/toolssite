import Link from "next/link";

const navLinks = [
  { label: "PDF", href: "/pdf" },
  { label: "Calculators", href: "/calculators" },
  { label: "Converters", href: "/converters" },
  { label: "Image Tools", href: "/image-tools" },
  { label: "Text Tools", href: "/text-tools" },
  { label: "Developer", href: "/developer-tools" },
];

export default function Header({ breadcrumbs = [] }) {
  return (
    <>
      {/* Main nav */}
      <nav style={{ background: "#4F46E5" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", height: "56px" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", marginRight: "32px", textDecoration: "none" }}>
            <div style={{ width: "30px", height: "30px", background: "rgba(255,255,255,0.2)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>🛠️</div>
            <span style={{ fontSize: "16px", fontWeight: "500", color: "white" }}>QuikToolkit</span>
          </Link>
          <div style={{ display: "flex", flex: 1 }}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} style={{ padding: "0 12px", height: "56px", display: "flex", alignItems: "center", fontSize: "13px", color: "rgba(255,255,255,0.85)", textDecoration: "none", whiteSpace: "nowrap" }}>
                {link.label}
              </Link>
            ))}
          </div>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.15)", border: "0.5px solid rgba(255,255,255,0.3)", borderRadius: "20px", padding: "5px 14px", textDecoration: "none" }}>
            <span style={{ fontSize: "13px" }}>🏠</span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.85)" }}>Home</span>
          </Link>
        </div>
      </nav>

      {/* Breadcrumb */}
      {breadcrumbs.length > 0 && (
        <div style={{ background: "#EEF2FF", borderBottom: "0.5px solid #C7D2FE", padding: "8px 24px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", gap: "6px" }}>
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