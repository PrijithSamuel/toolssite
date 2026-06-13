import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Free Online Games — Reaction Time Typing Speed Memory",
  description: "Free online games — reaction time test, typing speed test WPM, rock paper scissors, memory card game. No signup, play instantly in your browser.",
};

const tools = [
  { name: "Reaction Time Test", description: "Click the green box as fast as you can — test your reflexes across 5 attempts", href: "/games/reaction-time", icon: "⚡" },
  { name: "Typing Speed Test", description: "How many words per minute can you type? 60-second timed typing challenge", href: "/games/typing-speed", icon: "⌨️" },
  { name: "Rock Paper Scissors", description: "Play against the computer with score tracking and Best of 5 mode", href: "/games/rock-paper-scissors", icon: "🪨" },
  { name: "Memory Game", description: "Match all 8 emoji pairs. Get 3 stars by finishing in under 15 moves", href: "/games/memory-game", icon: "🧠" },
];

const sectionStyle = { background:"white", border:"0.5px solid #E0E7FF", borderRadius:"12px", padding:"24px", marginBottom:"28px" };
const h2Style = { fontSize:"18px", fontWeight:"500", color:"#1E1B4B", marginBottom:"14px" };
const pStyle = { fontSize:"14px", color:"#4B5563", lineHeight:"1.85", marginBottom:"12px" };
const pLast = { fontSize:"14px", color:"#4B5563", lineHeight:"1.85", margin:0 };

export default function Games() {
  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Games & Fun" }]} />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Games & Fun</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Free browser games — no signup, no download required.</p>
        </div>
        <div style={sectionStyle}>
          <h2 style={h2Style}>Free Online Games — Reaction Time, Typing Speed, Memory and More</h2>
          <p style={pStyle}>The games and interactive tools in this section serve a genuine purpose beyond entertainment. The reaction time test measures your visual response time in milliseconds using precise browser timing via performance.now() — the same high-resolution timer used in scientific research. Average human reaction time to a visual stimulus is 200-250 milliseconds. Factors including caffeine, fatigue, age, and screen brightness all measurably affect reaction speed.</p>
          <p style={pStyle}>The typing speed test measures words per minute and accuracy with a 60-second timed assessment. The average typing speed for adults is 40 WPM. Touch typists who do not look at the keyboard typically achieve 50-80 WPM. Professional transcriptionists often exceed 100 WPM. Regular practice with timed typing tests is one of the most effective ways to improve typing speed.</p>
          <p style={pLast}>The memory card game exercises working memory and pattern recognition — cognitive skills with practical benefits beyond the game itself. Working memory capacity is positively correlated with reading comprehension, problem-solving ability, and resistance to distraction. All games run entirely in your browser with no data collected, no scores stored, and no account required.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", textDecoration: "none", display: "flex", alignItems: "flex-start", gap: "14px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>
                {tool.icon}
              </div>
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
