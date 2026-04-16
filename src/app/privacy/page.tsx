export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        
        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 text-slate-100 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              GitPrompt ("we," "our," or "us") operates the GitPrompt website. This page informs you of our policies 
              regarding the collection, use, and disclosure of personal data when you use our service and the choices 
              you have associated with that data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">2. Information Collection and Use</h2>
            <p className="mb-2">We collect several different types of information for various purposes to provide and improve our service to you:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>GitHub Repository Data:</strong> When you analyze a repository, we fetch publicly available information from GitHub's API</li>
              <li><strong>Usage Data:</strong> We automatically collect certain information about your device when you use our service (browser type, IP address, pages visited)</li>
              <li><strong>Cookies:</strong> We may use cookies and similar tracking technologies to track activity on our service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">3. Use of Data</h2>
            <p>GitPrompt uses the collected data for various purposes:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To allow you to participate in interactive features of our service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information to improve our service</li>
              <li>To monitor the usage of our service</li>
              <li>To detect, prevent and address technical and security issues</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">4. Security of Data</h2>
            <p>
              The security of your data is important to us, but remember that no method of transmission over the 
              Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable 
              means to protect your personal data, we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">5. GitHub API Usage</h2>
            <p>
              GitPrompt uses the GitHub API to fetch publicly available repository information. Your GitHub account 
              information is not stored or accessed without your explicit consent. All data fetched is only used to 
              analyze the repository and generate prompts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">6. Third-Party Services</h2>
            <p>
              Our service uses third-party services:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>GitHub API:</strong> For repository data</li>
              <li><strong>OpenRouter API:</strong> For AI-powered prompt generation</li>
              <li><strong>Google Analytics:</strong> For usage analytics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">7. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
              Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us through our website.
            </p>
          </section>

          <div className="mt-8 pt-6 border-t border-slate-600 text-sm text-slate-400">
            Last updated: April 2026
          </div>
        </div>
      </div>
    </div>
  );
}
