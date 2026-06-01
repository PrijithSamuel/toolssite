export const metadata = {
  title: "Terms of Service | QuikToolkit",
  description: "Terms of Service for QuikToolkit — Free Online Tools",
};

export default function Terms() {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <a href="/" className="text-gray-400 hover:text-gray-600 text-sm">← Home</a>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-gray-400 text-sm mb-8">Last updated: June 2025</p>

        <div className="prose text-gray-600 space-y-6">

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">1. Acceptance of Terms</h2>
            <p>By accessing and using QuikToolkit (quiktoolkit.com) you accept and agree to be bound by these Terms of Service. If you do not agree to these terms please do not use our website.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">2. Use of Services</h2>
            <p>QuikToolkit provides free online tools for personal and commercial use. You may use our tools for any lawful purpose. You agree not to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Use the tools for any illegal or unauthorized purpose</li>
              <li>Attempt to disrupt or damage the website</li>
              <li>Use automated scripts to scrape or overload the website</li>
              <li>Attempt to bypass any security features</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">3. Disclaimer of Warranties</h2>
            <p>QuikToolkit is provided "as is" without any warranties of any kind. We do not guarantee that the tools will be error-free, uninterrupted or produce accurate results at all times. Use the tools at your own risk.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">4. Limitation of Liability</h2>
            <p>QuikToolkit shall not be liable for any direct, indirect, incidental or consequential damages resulting from your use of the website or tools, including loss of data or files.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">5. Intellectual Property</h2>
            <p>All content, design and code on QuikToolkit is our intellectual property. You may not copy, reproduce or distribute any part of the website without our permission.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">6. Third Party Links</h2>
            <p>Our website may contain links to third party websites. We are not responsible for the content or privacy practices of those websites.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">7. Advertising</h2>
            <p>QuikToolkit displays advertisements served by Google AdSense and other advertising networks. We are not responsible for the content of these advertisements.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">8. Changes to Terms</h2>
            <p>We reserve the right to update these terms at any time. Continued use of the website after changes constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">9. Contact</h2>
            <p>For any questions regarding these terms please contact us at: <a href="mailto:contact@quiktoolkit.com" className="text-blue-500 hover:underline">contact@quiktoolkit.com</a></p>
          </section>

        </div>
      </div>
    </main>
  );
}