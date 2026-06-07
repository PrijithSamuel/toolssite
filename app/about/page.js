import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "About QuikToolkit — Free Online Tools for Everyone",
  description: "QuikToolkit is a free collection of 100+ online tools including PDF tools, calculators, converters, text tools, image tools and developer tools. No signup required.",
};

const categories = [
  { name: "PDF Tools", icon: "📄", slug: "pdf" },
  { name: "Calculators", icon: "🧮", slug: "calculators" },
  { name: "Finance", icon: "💰", slug: "finance" },
  { name: "Health", icon: "🏥", slug: "health" },
  { name: "Converters", icon: "🔄", slug: "converters" },
  { name: "Text Tools", icon: "✍️", slug: "text-tools" },
  { name: "Image Tools", icon: "🖼️", slug: "image-tools" },
  { name: "Developer Tools", icon: "⚙️", slug: "developer-tools" },
  { name: "SEO Tools", icon: "🔍", slug: "seo-tools" },
  { name: "Timer Tools", icon: "⏱️", slug: "timer-tools" },
  { name: "Random Tools", icon: "🎲", slug: "random-tools" },
  { name: "Math Tools", icon: "📐", slug: "math-tools" },
  { name: "Date Tools", icon: "📅", slug: "date-tools" },
  { name: "Food Tools", icon: "👨‍🍳", slug: "food-tools" },
  { name: "Student Tools", icon: "🎓", slug: "student-tools" },
  { name: "Engineering", icon: "🔧", slug: "engineering" },
  { name: "Games & Fun", icon: "🎮", slug: "games" },
];

const stats = [
  { num: "100+", label: "Free Tools" },
  { num: "168+", label: "Indexed pages" },
  { num: "0", label: "Signups Required" },
  { num: "100%", label: "Browser Based" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header />

      {/* Hero */}
      <div style={{ background: "#4F46E5", padding: "48px 24px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "600", color: "white", marginBottom: "12px", lineHeight: "1.25" }}>
            About QuikToolkit
          </h1>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)", lineHeight: "1.6" }}>
            Free Online Tools for Everyone
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 24px" }}>

        {/* What is QuikToolkit */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "14px", padding: "28px", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#1E1B4B", marginBottom: "12px" }}>What is QuikToolkit?</h2>
          <p style={{ fontSize: "15px", color: "#4B5563", lineHeight: "1.7" }}>
            QuikToolkit is a free collection of 100+ online tools including PDF tools, calculators, converters, text tools, image tools and developer tools. No signup required. No limits. Works entirely in your browser.
          </p>
        </div>

        {/* Our Mission */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "14px", padding: "28px", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#1E1B4B", marginBottom: "12px" }}>Our Mission</h2>
          <p style={{ fontSize: "15px", color: "#4B5563", lineHeight: "1.7" }}>
            We believe powerful tools should be free and accessible to everyone. Every tool on QuikToolkit works instantly in your browser — your files and data never leave your device.
          </p>
        </div>

        {/* How It Works */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "14px", padding: "28px", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#1E1B4B", marginBottom: "20px" }}>How It Works</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {[
              { step: "1", icon: "🔗", title: "Visit a Tool", desc: "Pick any tool from the homepage or category pages. No account, no download, no waiting." },
              { step: "2", icon: "⚡", title: "Use It Instantly", desc: "Everything runs directly in your browser. Paste text, upload a file, or enter numbers — results appear immediately." },
              { step: "3", icon: "✅", title: "Done", desc: "Copy, download, or share your result. Your data never leaves your device." },
            ].map(({ step, icon, title, desc }) => (
              <div key={step} style={{ background: "#F5F3FF", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", textAlign: "center" }}>
                <div style={{ fontSize: "28px", marginBottom: "8px" }}>{icon}</div>
                <div style={{ fontSize: "11px", fontWeight: "600", color: "#6366F1", marginBottom: "6px", letterSpacing: "0.05em" }}>STEP {step}</div>
                <div style={{ fontSize: "14px", fontWeight: "600", color: "#1E1B4B", marginBottom: "8px" }}>{title}</div>
                <p style={{ fontSize: "13px", color: "#6B7280", lineHeight: "1.6" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy First */}
        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "14px", padding: "28px", marginBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
            <span style={{ fontSize: "28px", flexShrink: 0 }}>🔒</span>
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#1E1B4B", marginBottom: "8px" }}>Privacy First</h2>
              <p style={{ fontSize: "15px", color: "#4B5563", lineHeight: "1.7" }}>
                All tools run client-side in your browser. We never upload, store or share your files or data.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "28px" }}>
          {stats.map(({ num, label }) => (
            <div key={label} style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px 12px", textAlign: "center" }}>
              <div style={{ fontSize: "26px", fontWeight: "700", color: "#4F46E5", marginBottom: "4px" }}>{num}</div>
              <div style={{ fontSize: "12px", color: "#6B7280", fontWeight: "500" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Categories */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "14px", padding: "28px", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#1E1B4B", marginBottom: "16px" }}>Tool Categories</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
            {categories.map(({ name, icon, slug }) => (
              <Link
                key={slug}
                href={`/${slug}`}
                style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 12px", borderRadius: "8px", background: "#F5F3FF", border: "0.5px solid #E0E7FF", textDecoration: "none", color: "#4338CA", fontSize: "13px", fontWeight: "500" }}
              >
                <span style={{ fontSize: "16px" }}>{icon}</span>
                {name}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "14px", padding: "28px", textAlign: "center" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#1E1B4B", marginBottom: "10px" }}>Get in Touch</h2>
          <p style={{ fontSize: "15px", color: "#4B5563", marginBottom: "18px", lineHeight: "1.6" }}>
            Have a suggestion or found a bug? We'd love to hear from you.
          </p>
          <Link
            href="/contact"
            style={{ display: "inline-block", background: "#4F46E5", color: "white", padding: "10px 28px", borderRadius: "8px", textDecoration: "none", fontSize: "14px", fontWeight: "500" }}
          >
            Contact Us
          </Link>
        </div>

      </div>

      <Footer />
    </main>
  );
}
