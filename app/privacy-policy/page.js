export const metadata = {
  title: "Privacy Policy | QuikToolkit",
  description: "Privacy Policy for QuikToolkit — Free Online Tools",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <a href="/" className="text-gray-400 hover:text-gray-600 text-sm">← Home</a>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-8">Last updated: June 2025</p>

        <div className="prose text-gray-600 space-y-6">

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">1. Introduction</h2>
            <p>Welcome to QuikToolkit ("we", "our", or "us"). We operate the website quiktoolkit.com. This Privacy Policy explains how we collect, use and protect your information when you use our website.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">2. Information We Collect</h2>
            <p>QuikToolkit is designed to work entirely in your browser. We do not collect, store or transmit any files or data you process using our tools. All processing happens locally on your device.</p>
            <p className="mt-2">We may collect anonymous usage data through third-party analytics services (such as Google Analytics) including:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Pages visited and time spent</li>
              <li>Browser type and operating system</li>
              <li>Country of origin</li>
              <li>Referring website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">3. Cookies</h2>
            <p>We use cookies for analytics and advertising purposes. Third-party advertising partners, including Google AdSense, may use cookies to serve relevant ads based on your browsing history. You can opt out of personalised ads by visiting <a href="https://www.google.com/settings/ads" className="text-blue-500 hover:underline">Google Ads Settings</a>.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">4. Third Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Google AdSense</strong> — for displaying advertisements</li>
              <li><strong>Google Analytics</strong> — for anonymous usage statistics</li>
              <li><strong>Vercel</strong> — for website hosting</li>
            </ul>
            <p className="mt-2">These services have their own privacy policies which govern their use of your data.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">5. Data Security</h2>
            <p>All files you upload to our tools are processed entirely in your browser and are never sent to our servers. We do not store any of your files or personal documents.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">6. Children's Privacy</h2>
            <p>Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">7. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify users by updating the date at the top of this page.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">8. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy please contact us at: <a href="mailto:contact@quiktoolkit.com" className="text-blue-500 hover:underline">contact@quiktoolkit.com</a></p>
          </section>

        </div>
      </div>
    </main>
  );
}