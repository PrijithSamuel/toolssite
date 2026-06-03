import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Free Date & Time Tools — Date Difference, Days Until, Unix Timestamp",
  description: "Free online date tools — calculate date differences, days until an event, Unix timestamp converter. No signup required.",
};

const tools = [
  { name: "Date Difference Calculator", description: "Find the exact difference between two dates in days, weeks, months", href: "/date-tools/date-difference", icon: "📅" },
  { name: "Days Until", description: "Count down days until any event — holidays, birthdays and more", href: "/date-tools/days-until", icon: "🗓️" },
  { name: "Unix Timestamp Converter", description: "Convert between Unix timestamps and human-readable dates", href: "/date-tools/unix-timestamp", icon: "🕐" },
];

export default function DateTools() {
  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Date Tools" }]} />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Date & Time Tools</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Free online date and time tools — no signup required.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", textDecoration: "none", display: "flex", alignItems: "flex-start", gap: "14px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>{tool.icon}</div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "500", color: "#1E1B4B", marginBottom: "4px" }}>{tool.name}</div>
                <div style={{ fontSize: "13px", color: "#6B7280" }}>{tool.description}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
