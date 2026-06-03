"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const SOURCE_TYPES = ["Book", "Website", "Journal Article", "YouTube Video"];
const FORMATS = ["APA", "MLA", "Chicago"];

function buildCitation(format, type, fields) {
  const f = fields;
  const italic = (t) => `*${t}*`;

  if (type === "Book") {
    const author = f.author || "Author, A.";
    const year = f.year || "n.d.";
    const title = f.title || "Title of Book";
    const publisher = f.publisher || "Publisher";

    if (format === "APA") return `${author} (${year}). ${italic(title)}. ${publisher}.`;
    if (format === "MLA") return `${author} ${italic(title)}. ${publisher}, ${year}.`;
    if (format === "Chicago") return `${author} ${italic(title)}. ${f.city ? f.city + ": " : ""}${publisher}, ${year}.`;
  }

  if (type === "Website") {
    const author = f.author || "";
    const year = f.year || "n.d.";
    const title = f.title || "Page Title";
    const site = f.site || "Website Name";
    const url = f.url || "https://example.com";

    if (format === "APA") return `${author ? author + " " : ""}(${year}). ${title}. ${italic(site)}. ${url}`;
    if (format === "MLA") return `${author ? author + ". " : ""}"${title}." ${italic(site)}, ${year}, ${url}.`;
    if (format === "Chicago") return `${author ? author + ". " : ""}"${title}." ${italic(site)}. ${year}. ${url}.`;
  }

  if (type === "Journal Article") {
    const author = f.author || "Author, A.";
    const year = f.year || "n.d.";
    const title = f.title || "Article Title";
    const journal = f.journal || "Journal Name";
    const volume = f.volume || "1";
    const issue = f.issue || "1";
    const pages = f.pages || "1–10";
    const doi = f.doi || "";

    if (format === "APA") return `${author} (${year}). ${title}. ${italic(journal)}, ${italic(volume)}(${issue}), ${pages}.${doi ? ` https://doi.org/${doi}` : ""}`;
    if (format === "MLA") return `${author} "${title}." ${italic(journal)}, vol. ${volume}, no. ${issue}, ${year}, pp. ${pages}.`;
    if (format === "Chicago") return `${author} "${title}." ${italic(journal)} ${volume}, no. ${issue} (${year}): ${pages}.`;
  }

  if (type === "YouTube Video") {
    const channel = f.channel || "Channel Name";
    const year = f.year || "n.d.";
    const title = f.title || "Video Title";
    const url = f.url || "https://youtube.com/watch?v=xxx";

    if (format === "APA") return `${channel}. (${year}). ${italic(title)} [Video]. YouTube. ${url}`;
    if (format === "MLA") return `"${title}." ${italic("YouTube")}, uploaded by ${channel}, ${year}, ${url}.`;
    if (format === "Chicago") return `${channel}. "${title}." YouTube Video. ${year}. ${url}.`;
  }

  return "";
}

const FIELD_CONFIGS = {
  Book: ["author", "year", "title", "publisher", "city"],
  Website: ["author", "year", "title", "site", "url"],
  "Journal Article": ["author", "year", "title", "journal", "volume", "issue", "pages", "doi"],
  "YouTube Video": ["channel", "year", "title", "url"],
};

const FIELD_LABELS = {
  author: "Author(s) (Last, First)",
  year: "Year Published",
  title: "Title",
  publisher: "Publisher",
  city: "City of Publication",
  site: "Website Name",
  url: "URL",
  journal: "Journal Name",
  volume: "Volume",
  issue: "Issue Number",
  pages: "Pages (e.g. 12–24)",
  doi: "DOI (optional)",
  channel: "Channel / Author Name",
};

export default function CitationGenerator() {
  const [format, setFormat] = useState("APA");
  const [type, setType] = useState("Book");
  const [fields, setFields] = useState({});
  const [copied, setCopied] = useState(false);

  const citation = buildCitation(format, type, fields);

  // Render markdown italics for display
  const displayCitation = citation.replace(/\*(.*?)\*/g, "<em>$1</em>");

  function copy() {
    const plain = citation.replace(/\*/g, "");
    navigator.clipboard.writeText(plain).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }

  const inp = { width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "9px 11px", outline: "none", background: "white", fontSize: "13px", boxSizing: "border-box" };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Student Tools", href: "/student-tools" }, { label: "Citation Generator" }]} />
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Citation Generator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Generate APA, MLA and Chicago citations for books, websites, journals and videos.</p>
        </div>

        {/* Format + Type selectors */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px 20px", marginBottom: "16px" }}>
          <div style={{ marginBottom: "12px" }}>
            <div style={{ fontSize: "12px", fontWeight: "500", color: "#374151", marginBottom: "7px" }}>Citation Format</div>
            <div style={{ display: "flex", gap: "8px" }}>
              {FORMATS.map((f) => (
                <button key={f} onClick={() => setFormat(f)} style={{ flex: 1, padding: "8px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: format === f ? "#4F46E5" : "white", color: format === f ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>{f}</button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "12px", fontWeight: "500", color: "#374151", marginBottom: "7px" }}>Source Type</div>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {SOURCE_TYPES.map((t) => (
                <button key={t} onClick={() => { setType(t); setFields({}); }} style={{ padding: "7px 14px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: type === t ? "#EEF2FF" : "white", color: type === t ? "#4F46E5" : "#374151", fontSize: "12px", cursor: "pointer", fontWeight: type === t ? "600" : "400" }}>{t}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Fields */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {FIELD_CONFIGS[type].map((field) => (
              <div key={field} style={["title", "author", "url"].includes(field) ? { gridColumn: "1 / -1" } : {}}>
                <label style={{ fontSize: "11px", fontWeight: "500", color: "#6B7280", display: "block", marginBottom: "4px" }}>{FIELD_LABELS[field]}</label>
                <input value={fields[field] || ""} onChange={(e) => setFields({ ...fields, [field]: e.target.value })} placeholder={FIELD_LABELS[field]} style={inp} />
              </div>
            ))}
          </div>
        </div>

        {/* Output */}
        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <div style={{ fontSize: "13px", fontWeight: "500", color: "#374151" }}>{format} Citation</div>
            <button onClick={copy} style={{ padding: "6px 14px", borderRadius: "7px", border: "none", background: copied ? "#10B981" : "#4F46E5", color: "white", fontSize: "12px", cursor: "pointer", fontWeight: "500" }}>
              {copied ? "Copied!" : "Copy Citation"}
            </button>
          </div>
          <div style={{ background: "white", borderRadius: "8px", padding: "14px 16px", fontSize: "14px", lineHeight: "1.7", color: "#374151", minHeight: "50px" }} dangerouslySetInnerHTML={{ __html: displayCitation || '<span style="color:#9CA3AF">Fill in the fields above to generate your citation</span>' }} />
          <div style={{ marginTop: "8px", fontSize: "11px", color: "#9CA3AF" }}>Note: Always verify citations against official style guides. This tool provides a general format.</div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
