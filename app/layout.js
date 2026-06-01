import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  verification: {
    google: "JN0BZX3kmEEjMBhPNDdMjhDRGYsE_VZCxfnlepr3sRs",
  },
  title: {
    default: "QuikToolkit — Free Online Tools, No Signup Required",
    template: "%s | QuikToolkit",
  },
  description: "Free online tools — PDF converter, calculators, image tools, unit converter and more. No signup, no limits, works in your browser.",
  keywords: ["free online tools", "PDF converter", "image compressor", "unit converter", "calculator", "no signup"],
  authors: [{ name: "QuikToolkit" }],
  creator: "QuikToolkit",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.quiktoolkit.com",
    siteName: "QuikToolkit",
    title: "QuikToolkit — Free Online Tools, No Signup Required",
    description: "Free online tools — PDF converter, calculators, image tools and more. No signup, no limits.",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuikToolkit — Free Online Tools",
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
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1175862395898705"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}