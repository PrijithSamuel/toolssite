import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "ToolsKit — Free Online Tools, No Signup Required",
    template: "%s | ToolsKit",
  },
  description: "Free online tools — PDF converter, calculators, image tools, unit converter and more. No signup, no limits, works in your browser.",
  keywords: ["free online tools", "PDF converter", "image compressor", "unit converter", "calculator", "no signup"],
  authors: [{ name: "ToolsKit" }],
  creator: "ToolsKit",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://toolssite-kappa.vercel.app",
    siteName: "ToolsKit",
    title: "ToolsKit — Free Online Tools, No Signup Required",
    description: "Free online tools — PDF converter, calculators, image tools and more. No signup, no limits.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolsKit — Free Online Tools",
    description: "Free online tools — PDF converter, calculators, image tools and more.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}