"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function inlineFormat(text) {
  let s = escapeHtml(text);
  s = s.replace(/`([^`]+)`/g, '<code style="background:#EEF2FF;color:#4F46E5;padding:2px 6px;border-radius:4px;font-size:0.88em;font-family:monospace">$1</code>');
  s = s.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  s = s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/__(.+?)__/g, "<strong>$1</strong>");
  s = s.replace(/\*(.+?)\*/g, "<em>$1</em>");
  s = s.replace(/_(.+?)_/g, "<em>$1</em>");
  s = s.replace(/~~(.+?)~~/g, "<del>$1</del>");
  s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%">');
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#4F46E5;text-decoration:underline" target="_blank" rel="noopener">$1</a>');
  return s;
}

function parseMarkdown(md) {
  const lines = md.split("\n");
  let html = "";
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      let code = "";
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        code += escapeHtml(lines[i]) + "\n";
        i++;
      }
      html += `<pre style="background:#1E293B;color:#E2E8F0;padding:16px;border-radius:8px;overflow-x:auto;margin-bottom:14px;font-size:13px;font-family:monospace;line-height:1.5"><code>${code.trimEnd()}</code></pre>`;
      i++;
      continue;
    }

    // Headers
    if (/^#{1,6} /.test(line)) {
      const level = line.match(/^(#+)/)[1].length;
      const text = line.slice(level + 1);
      const sizes = ["32px", "26px", "20px", "17px", "15px", "14px"];
      const margins = ["28px 0 12px", "22px 0 10px", "18px 0 8px", "14px 0 6px", "12px 0 4px", "10px 0 4px"];
      html += `<h${level} style="font-size:${sizes[level - 1]};font-weight:600;color:#1E1B4B;margin:${margins[level - 1]};line-height:1.3">${inlineFormat(text)}</h${level}>`;
      i++;
      continue;
    }

    // Horizontal rule
    if (/^(\-\-\-|\*\*\*|___)$/.test(line.trim())) {
      html += `<hr style="border:none;border-top:1px solid #E0E7FF;margin:16px 0">`;
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      let bq = "";
      while (i < lines.length && lines[i].startsWith("> ")) {
        bq += `<p style="margin:0 0 4px">${inlineFormat(lines[i].slice(2))}</p>`;
        i++;
      }
      html += `<blockquote style="border-left:3px solid #4F46E5;padding:10px 14px;margin:0 0 14px;background:#F8F9FF;border-radius:0 8px 8px 0;color:#374151">${bq}</blockquote>`;
      continue;
    }

    // Unordered list
    if (/^[\*\-] /.test(line)) {
      let items = "";
      while (i < lines.length && /^[\*\-] /.test(lines[i])) {
        items += `<li style="margin-bottom:4px">${inlineFormat(lines[i].slice(2))}</li>`;
        i++;
      }
      html += `<ul style="padding-left:22px;margin-bottom:14px;line-height:1.6">${items}</ul>`;
      continue;
    }

    // Ordered list
    if (/^\d+\. /.test(line)) {
      let items = "";
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items += `<li style="margin-bottom:4px">${inlineFormat(lines[i].replace(/^\d+\. /, ""))}</li>`;
        i++;
      }
      html += `<ol style="padding-left:22px;margin-bottom:14px;line-height:1.6">${items}</ol>`;
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      html += "<br>";
      i++;
      continue;
    }

    // Paragraph
    html += `<p style="margin-bottom:8px;line-height:1.7;color:#374151">${inlineFormat(line)}</p>`;
    i++;
  }

  return html || '<p style="color:#9CA3AF;font-style:italic">Nothing to preview yet.</p>';
}

const defaultMd = `# Hello, Markdown!

Write **bold**, *italic*, or \`inline code\` text.

## Lists
- Item one
- Item two
- Item three

## Code Block
\`\`\`js
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

> Blockquote text goes here.

[Link to Google](https://google.com)`;

export default function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState(defaultMd);

  const previewHtml = parseMarkdown(markdown);

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Developer Tools", href: "/developer-tools" }, { label: "Markdown Previewer" }]} />
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Markdown Previewer</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Type Markdown on the left and see a live preview on the right.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", alignItems: "start" }}>
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "0.5px solid #E0E7FF", background: "#F8F9FF", fontSize: "12px", fontWeight: "500", color: "#6B7280", display: "flex", alignItems: "center", gap: "6px" }}>
              <span>✏️</span> Markdown Input
            </div>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              rows={28}
              style={{ width: "100%", border: "none", padding: "16px", outline: "none", background: "white", fontSize: "13px", fontFamily: "monospace", lineHeight: "1.6", resize: "none", boxSizing: "border-box", color: "#1E1B4B" }}
            />
          </div>

          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "0.5px solid #E0E7FF", background: "#F8F9FF", fontSize: "12px", fontWeight: "500", color: "#6B7280", display: "flex", alignItems: "center", gap: "6px" }}>
              <span>👁</span> Preview
            </div>
            <div
              style={{ padding: "16px", minHeight: "500px", fontSize: "14px", lineHeight: "1.6", color: "#374151", overflowY: "auto" }}
              dangerouslySetInnerHTML={{ __html: previewHtml }}
            />
          </div>
        </div>

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px", marginTop: "16px" }}>
          <div style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px" }}>Supported Markdown</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {["# Headers (H1–H6)", "**Bold**", "*Italic*", "`Code`", "```Code blocks```", "- Unordered lists", "1. Ordered lists", "> Blockquotes", "[Links](url)", "---  Horizontal rule", "~~Strikethrough~~"].map((tag) => (
              <span key={tag} style={{ fontSize: "11px", padding: "3px 8px", borderRadius: "5px", background: "white", border: "0.5px solid #C7D2FE", color: "#374151", fontFamily: "monospace" }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
