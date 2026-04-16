import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700 mt-12">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h3 className="text-white font-semibold mb-3">About</h3>
            <p className="text-slate-400 text-sm">
              GitPrompt reverse-engineers GitHub repositories into AI prompts using machine learning.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="text-blue-400 hover:text-blue-300">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-blue-400 hover:text-blue-300">Terms of Service</Link></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">GitHub</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Contact</h3>
            <p className="text-slate-400 text-sm mb-2">
              Follow us on X for updates and support:
            </p>
            <a href="https://x.com/TrakorAI" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
              @TrakorAI →
            </a>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-6 text-center text-slate-400 text-sm">
          <p>&copy; 2026 GitPrompt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
