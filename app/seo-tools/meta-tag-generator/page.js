"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function MetaTagGenerator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [author, setAuthor] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [copied, setCopied] = useState(false);

  const titleLen = title.length;
  const descLen = description.length;

  const generated = [
    `<!-- Primary Meta Tags -->`,
    title ? `<title>${title}</title>` : null,
    title ? `<meta name="title" content="${title}">` : null,
    description ? `<meta name="description" content="${description}">` : null,
    keywords ? `<meta name="keywords" content="${keywords}">` : null,
    author ? `<meta name="author" content="${author}">` : null,
    `<meta name="viewport" content="width=device-width, initial-scale=1.0">`,
    ``,
    `<!-- Open Graph / Facebook -->`,
    `<meta property="og:type" content="website">`,
    title ? `<meta property="og:title" content="${title}">` : null,
    description ? `<meta property="og:description" content="${description}">` : null,
    ogImage ? `<meta property="og:image" content="${ogImage}">` : null,
    ``,
    `<!-- Twitter -->`,
    `<meta property="twitter:card" content="summary_large_image">`,
    title ? `<meta property="twitter:title" content="${title}">` : null,
    description ? `<meta property="twitter:description" content="${description}">` : null,
    ogImage ? `<meta property="twitter:image" content="${ogImage}">` : null,
  ].filter((l) => l !== null).join("\n");

  function copyTags() {
    navigator.clipboard.writeText(generated).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  const inp = { width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "13px", boxSizing: "border-box" };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "SEO Tools", href: "/seo-tools" }, { label: "Meta Tag Generator" }]} />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Meta Tag Generator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Generate complete SEO meta tags, Open Graph and Twitter Card tags for any page.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                    <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151" }}>Page Title</label>
                    <span style={{ fontSize: "11px", color: titleLen > 60 ? "#EF4444" : titleLen > 50 ? "#F59E0B" : "#10B981" }}>{titleLen}/60</span>
                  </div>
                  <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Your page title — aim for 50–60 chars" style={inp} />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                    <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151" }}>Meta Description</label>
                    <span style={{ fontSize: "11px", color: descLen > 160 ? "#EF4444" : descLen > 140 ? "#F59E0B" : "#10B981" }}>{descLen}/160</span>
                  </div>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your page in 140–160 characters..." rows={3} style={{ ...inp, resize: "none" }} />
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "5px" }}>Keywords</label>
                  <input value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="keyword1, keyword2, keyword3" style={inp} />
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "5px" }}>Author</label>
                  <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author name" style={inp} />
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "5px" }}>OG Image URL</label>
                  <input value={ogImage} onChange={(e) => setOgImage(e.target.value)} placeholder="https://example.com/og-image.jpg" style={inp} />
                </div>
              </div>
            </div>

            {/* SEO Tips */}
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px", marginTop: "12px" }}>
              <div style={{ fontSize: "12px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>SEO Tips</div>
              <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "12px", color: "#6B7280", lineHeight: "1.8" }}>
                <li>Title: 50–60 characters for best display in search</li>
                <li>Description: 140–160 characters; include your main keyword</li>
                <li>OG Image: 1200×630px recommended for social previews</li>
                <li>Keywords: not heavily weighted by Google, but useful for Bing</li>
              </ul>
            </div>
          </div>

          <div>
            <div style={{ background: "#1E293B", borderRadius: "12px", overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: "0.5px solid #334155", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "12px", color: "#94A3B8", fontFamily: "monospace" }}>Generated HTML</span>
                <button
                  onClick={copyTags}
                  style={{ padding: "5px 14px", borderRadius: "6px", border: "none", background: copied ? "#10B981" : "#4F46E5", color: "white", fontSize: "12px", cursor: "pointer", fontWeight: "500" }}
                >
                  {copied ? "Copied!" : "Copy All"}
                </button>
              </div>
              <pre style={{ margin: 0, padding: "16px", fontSize: "12px", color: "#E2E8F0", fontFamily: "monospace", lineHeight: "1.6", overflowX: "auto", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
                {generated || "// Fill in the fields on the left\n// to generate your meta tags"}
              </pre>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
