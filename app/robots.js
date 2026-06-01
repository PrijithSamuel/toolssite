export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://toolssite-kappa.vercel.app/sitemap.xml",
  };
}