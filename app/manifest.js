export default function manifest() {
  return {
    name: "QuikToolkit — Free Online Tools",
    short_name: "QuikToolkit",
    description: "100+ free browser-based tools — PDF, calculators, converters, image tools and more.",
    start_url: "/",
    display: "standalone",
    background_color: "#F5F3FF",
    theme_color: "#4F46E5",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
