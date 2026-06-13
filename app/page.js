import Link from "next/link";
import HeroSearch from "./components/HeroSearch";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "QuikToolkit — Free Online Tools, No Signup Required",
  description: "Free online tools — PDF converter, calculators, image tools, unit converter and more. No signup, no limits, works in your browser.",
};

const categories = [
  {
    name: "PDF Tools",
    icon: "📄",
    iconBg: "#FEE2E2",
    count: 4,
    slug: "pdf",
    tools: ["PDF to Text", "Compress PDF", "Merge PDF", "Split PDF"],
  },
  {
    name: "Calculators",
    icon: "🧮",
    iconBg: "#DBEAFE",
    count: 8,
    slug: "calculators",
    tools: ["Tip Calculator", "Discount Calculator", "GPA Calculator", "Scientific"],
  },
  {
    name: "Finance",
    icon: "💰",
    iconBg: "#D1FAE5",
    count: 55,
    slug: "finance",
    tools: ["Loan Calculator", "Compound Interest", "Salary Calculator", "Invoice"],
  },
  {
    name: "Health",
    icon: "🏥",
    iconBg: "#FCE7F3",
    count: 8,
    slug: "health",
    tools: ["Calorie Calculator", "Water Intake", "Ideal Weight"],
  },
  {
    name: "Converters",
    icon: "🔄",
    iconBg: "#CCFBF1",
    count: 8,
    slug: "converters",
    tools: ["Unit Converter", "Time Zone", "Number Base", "Color Converter"],
  },
  {
    name: "Text Tools",
    icon: "✍️",
    iconBg: "#FEF9C3",
    count: 17,
    slug: "text-tools",
    tools: ["Word Counter", "Text Compare", "Lorem Ipsum", "Sort Lines"],
  },
  {
    name: "Image Tools",
    icon: "🖼️",
    iconBg: "#EDE9FE",
    count: 5,
    slug: "image-tools",
    tools: ["Compress Image", "Resize Image", "Image to PDF", "Convert Format"],
  },
  {
    name: "Developer Tools",
    icon: "⚙️",
    iconBg: "#F1F5F9",
    count: 13,
    slug: "developer-tools",
    tools: ["UUID Generator", "Hash Generator", "Base64 Encoder", "Markdown"],
  },
  {
    name: "SEO Tools",
    icon: "🔍",
    iconBg: "#FEF3C7",
    count: 2,
    slug: "seo-tools",
    tools: ["Meta Tag Generator", "Word Density"],
  },
  {
    name: "Timer Tools",
    icon: "⏱️",
    iconBg: "#FEE2E2",
    count: 3,
    slug: "timer-tools",
    tools: ["Stopwatch", "Countdown Timer", "Pomodoro"],
  },
  {
    name: "Random Tools",
    icon: "🎲",
    iconBg: "#EDE9FE",
    count: 4,
    slug: "random-tools",
    tools: ["Random Number", "Coin Flip", "Name Picker", "Spin Wheel"],
  },
  {
    name: "Math Tools",
    icon: "📐",
    iconBg: "#DBEAFE",
    count: 10,
    slug: "math-tools",
    tools: ["Fraction Calc", "% Change", "Prime Checker"],
  },
  {
    name: "Date Tools",
    icon: "📅",
    iconBg: "#D1FAE5",
    count: 3,
    slug: "date-tools",
    tools: ["Date Difference", "Days Until", "Unix Timestamp"],
  },
  {
    name: "Food Tools",
    icon: "👨‍🍳",
    iconBg: "#FEF9C3",
    count: 3,
    slug: "food-tools",
    tools: ["Recipe Converter", "Cooking Converter", "Calorie Counter"],
  },
  {
    name: "Student Tools",
    icon: "🎓",
    iconBg: "#DBEAFE",
    count: 3,
    slug: "student-tools",
    tools: ["Grade Calculator", "Study Timer", "Citation Generator"],
  },
  {
    name: "Engineering",
    icon: "🔧",
    iconBg: "#F0FDF4",
    count: 4,
    slug: "engineering",
    tools: ["Ohm's Law", "Resistor Color", "Aspect Ratio", "PPI Calc"],
  },
  {
    name: "Games & Fun",
    icon: "🎮",
    iconBg: "#EDE9FE",
    count: 4,
    slug: "games",
    tools: ["Reaction Time", "Typing Speed", "Rock Paper Scissors", "Memory Game"],
  },
];

const popularTools = [
  { name: "Merge PDF", desc: "Combine PDFs into one", icon: "📄", iconBg: "#FEE2E2", href: "/pdf/merge", badge: "Hot" },
  { name: "EMI Calculator", desc: "Calculate loan EMI", icon: "🧮", iconBg: "#DBEAFE", href: "/calculators/emi", badge: "Popular" },
  { name: "Image Compressor", desc: "Reduce image size", icon: "🖼️", iconBg: "#D1FAE5", href: "/image-tools/compress", badge: "Hot" },
  { name: "Word Counter", desc: "Count words instantly", icon: "✍️", iconBg: "#FEF9C3", href: "/text-tools/word-counter", badge: "Popular" },
  { name: "Password Generator", desc: "Strong secure passwords", icon: "🔑", iconBg: "#EDE9FE", href: "/developer-tools/password-generator", badge: "New" },
  { name: "Unit Converter", desc: "Convert any unit", icon: "🔄", iconBg: "#D1FAE5", href: "/converters/unit", badge: "Popular" },
  { name: "QR Code Generator", desc: "Generate QR codes free", icon: "📱", iconBg: "#F1F5F9", href: "/developer-tools/qr-code", badge: "New" },
  { name: "BMI Calculator", desc: "Check your BMI", icon: "⚖️", iconBg: "#DBEAFE", href: "/calculators/bmi", badge: "Popular" },
];

export default function Home() {
  return (
    <main id="main-content" role="main" className="min-h-screen" style={{ background: "#F5F3FF" }}>

      <Header />

      {/* Hero */}
      <div style={{ background: "#4F46E5", padding: "48px 24px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.15)", border: "0.5px solid rgba(255,255,255,0.3)", borderRadius: "20px", padding: "4px 14px", fontSize: "12px", color: "white", fontWeight: "500", marginBottom: "16px" }}>
            ✓ 100+ Free Tools — No Signup Required
          </div>
          <h1 style={{ fontSize: "34px", fontWeight: "500", color: "white", marginBottom: "10px", lineHeight: "1.25" }}>
            QuikToolkit — Free Online Tools for Everyone
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)", marginBottom: "24px" }}>
            100+ browser-based utilities — PDF tools, calculators, converters, and more. No account needed. Works on any device.
          </p>

          <HeroSearch />

          {/* Stats */}
          <div style={{ display: "flex", justifyContent: "center", gap: "36px", marginBottom: "20px" }}>
            {[["100+", "Free tools"], ["0", "Signups needed"], ["100%", "Browser based"], ["17", "Categories"]].map(([num, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "20px", fontWeight: "500", color: "white" }}>{num}</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.65)", marginTop: "2px" }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Trust indicators */}
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap" }}>
            {[
              { icon: "🔒", text: "Files never leave your device" },
              { icon: "⚡", text: "Works in your browser" },
              { icon: "💯", text: "Always free, no signup" },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: "rgba(255,255,255,0.15)", border: "0.5px solid rgba(255,255,255,0.3)", borderRadius: "20px", padding: "4px 12px", fontSize: "12px", color: "rgba(255,255,255,0.9)", fontWeight: "500" }}>
                <span aria-hidden="true">{icon}</span><span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 24px" }}>

        {/* Popular tools */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: "500", color: "#1E1B4B" }}>Most Popular Free Online Tools</h2>
          <Link href="/search" style={{ fontSize: "13px", color: "#4F46E5", textDecoration: "none", fontWeight: "500" }}>See all →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "10px", marginBottom: "36px" }}>
          {popularTools.map((tool) => (
            <Link key={tool.href} href={tool.href} className="tool-card" style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px", textAlign: "center", textDecoration: "none", display: "block" }}>
              <div aria-hidden="true" style={{ width: "44px", height: "44px", borderRadius: "10px", background: tool.iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", margin: "0 auto 10px" }}>
                {tool.icon}
              </div>
              <div style={{ fontSize: "12px", fontWeight: "500", color: "#1E1B4B", marginBottom: "4px" }}>{tool.name}</div>
              <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "8px" }}>{tool.desc}</div>
              <span style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "4px", background: "#EEF2FF", color: "#4F46E5", fontWeight: "500" }}>{tool.badge}</span>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "16px", marginBottom: "8px" }}>
          <Link href="/search" style={{ fontSize: "14px", color: "#4F46E5", textDecoration: "none", fontWeight: "500" }}>
            View all 100+ free tools →
          </Link>
        </div>

      </div>

      {/* Why Millions Use QuikToolkit */}
      <section style={{ maxWidth:"1100px", margin:"0 auto", padding:"0 24px 48px" }}>
        <h2 style={{ fontSize:"20px", fontWeight:"500", color:"#1E1B4B", marginBottom:"8px", textAlign:"center" }}>
          Why Millions Use QuikToolkit
        </h2>
        <p style={{ fontSize:"14px", color:"#6B7280", textAlign:"center", maxWidth:"600px", margin:"0 auto 28px" }}>
          Free browser-based tools trusted by users in India, Germany, Ireland, Netherlands, Canada, Singapore, USA, Sri Lanka and Ukraine
        </p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))", gap:"20px" }}>
          {[
            { icon:"🔒", title:"Your Files Stay Private", body:"Every tool runs entirely in your browser. When you compress a PDF, resize an image, or convert files, nothing is uploaded to any server. Your documents and photos never leave your device — making QuikToolkit one of the safest free tool platforms available." },
            { icon:"⚡", title:"Instant Access, No Signup", body:"Creating accounts and waiting for uploads wastes time. QuikToolkit gives you immediate access to every tool — no email required, no verification step, no subscription. Open any tool and start working in seconds from any device." },
            { icon:"🌍", title:"Built for Every Country", body:"Specialised financial calculators serve users across 9 countries. From India's income tax old vs new regime comparison to Germany's Brutto-Netto salary calculator covering all 6 Steuerklassen — each tool uses accurate, locally relevant rates and rules." },
            { icon:"📱", title:"Works on Any Device", body:"All tools are fully responsive and optimised for mobile, tablet, and desktop. Whether calculating EMI on a phone during your commute or merging PDFs on a work laptop, QuikToolkit adapts automatically with no app download required." },
            { icon:"🆓", title:"Always Free, No Limits", body:"There are no daily usage limits, no file size paywalls, and no premium tiers. Every tool is free for unlimited use. QuikToolkit is supported by non-intrusive advertising so users never hit a paywall mid-task." },
            { icon:"🔄", title:"Regularly Updated", body:"Financial calculators are updated annually when governments announce new tax rates. India's income tax calculator reflects Budget 2025 changes, and all country-specific tools are refreshed each year to provide accurate, current results." }
          ].map((item, i) => (
            <div key={i} style={{ background:"white", border:"0.5px solid #E0E7FF", borderRadius:"12px", padding:"20px" }} className="cat-card">
              <div style={{ fontSize:"28px", marginBottom:"10px" }} aria-hidden="true">{item.icon}</div>
              <h3 style={{ fontSize:"15px", fontWeight:"500", color:"#1E1B4B", marginBottom:"8px" }}>{item.title}</h3>
              <p style={{ fontSize:"13px", color:"#4B5563", lineHeight:"1.8", margin:0 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recently Added Tools */}
      <section style={{ maxWidth:"1100px", margin:"0 auto", padding:"0 24px 40px" }}>
        <h2 style={{ fontSize:"20px", fontWeight:"500", color:"#1E1B4B", marginBottom:"20px" }}>
          Recently Added Tools
        </h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:"12px" }}>
          {[
            { icon:"🇩🇪", name:"Brutto-Netto-Rechner", desc:"German salary after all deductions — all 6 Steuerklassen supported", href:"/finance/brutto-netto", badge:"Germany" },
            { icon:"🇮🇳", name:"India Income Tax 2025-26", desc:"Old vs New regime comparison with Budget 2025 rates", href:"/finance/india-income-tax", badge:"India" },
            { icon:"🇸🇬", name:"Singapore CPF Calculator", desc:"CPF contributions across OA, SA and MA accounts by age group", href:"/finance/singapore-cpf", badge:"Singapore" },
            { icon:"⚡", name:"Reaction Time Test", desc:"Test how fast your reflexes are — measured in milliseconds", href:"/games/reaction-time", badge:"New" },
            { icon:"⌨️", name:"Typing Speed Test", desc:"Measure your WPM and accuracy with a 60-second timed test", href:"/games/typing-speed", badge:"New" },
            { icon:"🔐", name:"Password Strength Checker", desc:"Check how strong your password is and get improvement tips", href:"/developer-tools/password-strength", badge:"New" },
          ].map((item, i) => (
            <a key={i} href={item.href} style={{ background:"white", border:"0.5px solid #E0E7FF", borderRadius:"12px", padding:"16px", textDecoration:"none", display:"block" }} className="tool-card">
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"8px" }}>
                <span style={{ fontSize:"22px" }} aria-hidden="true">{item.icon}</span>
                <span style={{ fontSize:"10px", background:"#EEF2FF", color:"#4F46E5", padding:"2px 8px", borderRadius:"10px", fontWeight:"500" }}>{item.badge}</span>
              </div>
              <div style={{ fontSize:"13px", fontWeight:"500", color:"#1E1B4B", marginBottom:"4px" }}>{item.name}</div>
              <div style={{ fontSize:"12px", color:"#6B7280", lineHeight:"1.6" }}>{item.desc}</div>
            </a>
          ))}
        </div>
      </section>

      {/* Browse Categories */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: "500", color: "#1E1B4B" }}>Browse All Tool Categories — PDF, Calculators, Converters &amp; More</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/${cat.slug}`} className="cat-card" style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "18px", textDecoration: "none", display: "block" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <div aria-hidden="true" style={{ width: "36px", height: "36px", borderRadius: "8px", background: cat.iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>
                  {cat.icon}
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "500", color: "#1E1B4B" }}>{cat.name}</div>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "500" }}>{cat.count} tools</div>
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {cat.tools.map((tool) => (
                  <span key={tool} style={{ fontSize: "11px", padding: "3px 8px", borderRadius: "5px", color: "#4338CA", background: "#EEF2FF", border: "0.5px solid #C7D2FE" }}>
                    {tool}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Guides & Tips */}
      <section style={{ background:"white", borderTop:"0.5px solid #E0E7FF", padding:"48px 24px" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <h2 style={{ fontSize:"20px", fontWeight:"500", color:"#1E1B4B", marginBottom:"8px", textAlign:"center" }}>Quick Guides &amp; Tips</h2>
          <p style={{ fontSize:"14px", color:"#6B7280", textAlign:"center", marginBottom:"32px" }}>Answers to the most common questions about our tools</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(320px, 1fr))", gap:"28px" }}>
            {[
              { title:"How to Merge PDF Files Free", body:"Visit PDF Tools then Merge PDF. Upload your files, use the arrows to reorder them, then click Merge PDFs. Your combined file downloads instantly with no watermark. Files never leave your browser." },
              { title:"How to Calculate Home Loan EMI", body:"Open our EMI Calculator. Enter the loan amount, your bank's current interest rate, and the tenure in years. The calculator instantly shows your monthly payment, total interest, and full repayment breakdown." },
              { title:"How to Check Your BMI", body:"Go to Health Tools then BMI Calculator. Enter your height and weight in either metric or imperial units. Your BMI and health category display immediately with an explanation of what the number means." },
              { title:"How to Compress Images for WhatsApp", body:"Use Image Tools then Image Compressor. Upload your JPG or PNG photo, set quality to around 75-80%, and click Compress. Most photos reduce by 50-60% with no visible quality difference." },
              { title:"How to Calculate Indian Income Tax 2025-26", body:"Go to Finance then India Income Tax Calculator. Enter your annual CTC, select your 80C investments and other deductions. The tool compares Old Regime vs New Regime and recommends which one saves more tax." },
              { title:"How to Generate a Secure Password", body:"Visit Developer Tools then Password Generator. Set length to 16 or more characters, enable all character types. Click Generate to get a cryptographically random password that cannot be predicted by any algorithm." }
            ].map((item, i) => (
              <div key={i} style={{ borderLeft:"3px solid #4F46E5", paddingLeft:"16px" }}>
                <h3 style={{ fontSize:"14px", fontWeight:"500", color:"#1E1B4B", marginBottom:"8px" }}>{item.title}</h3>
                <p style={{ fontSize:"13px", color:"#4B5563", lineHeight:"1.8", margin:0 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

    </main>
  );
}
