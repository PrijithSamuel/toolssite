import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Free Random Tools — Random Number, Coin Flip, Name Picker, Spin Wheel",
  description: "Free online random tools — random number generator, coin flip, name picker, spin the wheel. No signup required.",
};

const tools = [
  { name: "Random Number Generator", description: "Generate random numbers with custom min/max and dice roller", href: "/random-tools/random-number", icon: "🎲" },
  { name: "Coin Flip", description: "Flip a coin and track heads/tails statistics", href: "/random-tools/coin-flip", icon: "🪙" },
  { name: "Random Name Picker", description: "Pick a random winner from a list of names with animation", href: "/random-tools/random-name-picker", icon: "🎯" },
  { name: "Spin the Wheel", description: "Create a custom spin wheel and spin for a random result", href: "/random-tools/spin-wheel", icon: "🎡" },
];

export default function RandomTools() {
  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Random Tools" }]} />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Random Tools</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Free online random tools — no signup required.</p>
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
