import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Free Student Tools — Grade Calculator, Study Timer, Citation Generator",
  description: "Free online student tools — grade calculator, study timer, citation generator. No signup required.",
};

const tools = [
  { name: "Grade Calculator", description: "Calculate weighted GPA and grades from assignments and exams", href: "/student-tools/grade-calculator", icon: "📊" },
  { name: "Study Timer", description: "Custom Pomodoro timer with session log and daily study tracking", href: "/student-tools/study-timer", icon: "⏱️" },
  { name: "Citation Generator", description: "Generate APA, MLA and Chicago citations for books, websites and more", href: "/student-tools/citation-generator", icon: "📚" },
];

export default function StudentTools() {
  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Student Tools" }]} />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Student Tools</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Free online tools for students — no signup required.</p>
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
