import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TrustBadges from "../components/TrustBadges";

export const metadata = {
  title: "Free PDF Tools Online — Merge Split Compress PDF",
  description: "Free online PDF tools — merge PDF files, split PDF, compress PDF size and extract text. No signup required, no watermark, works in your browser instantly.",
};

const tools = [
  { name: "Merge PDF", description: "Combine multiple PDF files into one", href: "/pdf/merge", icon: "📎" },
  { name: "Split PDF", description: "Split a PDF into separate pages or extract specific pages", href: "/pdf/split", icon: "✂️" },
  { name: "Compress PDF", description: "Reduce PDF file size without losing quality", href: "/pdf/compress", icon: "🗜️" },
  { name: "PDF to Text", description: "Extract text content from any PDF file", href: "/pdf/pdf-to-text", icon: "📝" },
];

const sectionStyle = { background:"white", border:"0.5px solid #E0E7FF", borderRadius:"12px", padding:"24px", marginBottom:"28px" };
const h2Style = { fontSize:"18px", fontWeight:"500", color:"#1E1B4B", marginBottom:"14px" };
const pStyle = { fontSize:"14px", color:"#4B5563", lineHeight:"1.85", marginBottom:"12px" };
const pLast = { fontSize:"14px", color:"#4B5563", lineHeight:"1.85", margin:0 };

export default function PDFTools() {
  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "PDF Tools" }]} />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>PDF Tools</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Free online PDF tools — no signup, no watermark, no limits.</p>
        </div>
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "24px" }}>
          <p style={{ fontSize: "14px", color: "#4B5563", lineHeight: "1.8" }}>
            PDF tools are among the most frequently needed online utilities. Whether you need to merge multiple PDF documents into a single file, split a large PDF into individual pages, reduce a PDF file size before emailing, or extract readable text from a PDF — QuikToolkit provides all these tools completely free with no file uploads to any server. All PDF processing happens directly in your browser using JavaScript, meaning your documents stay private on your device at all times. No watermarks are added to any output files.
          </p>
        </div>
        <TrustBadges />
        <div style={sectionStyle}>
          <h2 style={h2Style}>Free PDF Tools — No Upload, No Signup Required</h2>
          <p style={pStyle}>PDF (Portable Document Format) is the global standard for sharing documents that must look identical on every device, operating system, and printer. Created by Adobe in 1993, it is now maintained as an open standard by ISO. PDF files preserve fonts, images, layouts, and formatting precisely — making them essential for contracts, invoices, academic submissions, official government documents, and any file that must be presented consistently to its reader.</p>
          <p style={pStyle}>Most free PDF tools available online require you to upload your documents to a remote server. This creates a significant privacy risk — your contracts, bank statements, payslips, and personal documents are transmitted to and temporarily stored on computers you have no control over. QuikToolkit's PDF tools work entirely differently: all processing happens in your browser using the pdf-lib JavaScript library. Your documents never leave your device at any point.</p>
          <p style={pLast}>The four tools in this category cover the most common PDF tasks: merging multiple PDFs into one file, splitting a PDF into individual pages, reducing PDF file size without quality loss, and extracting readable text from PDF documents. Each tool is free with no file size limits, no watermarks added, and no account required.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} className="tool-card" style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", textDecoration: "none", display: "flex", alignItems: "flex-start", gap: "14px" }}>
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