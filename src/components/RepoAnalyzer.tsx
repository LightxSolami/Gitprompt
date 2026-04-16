/**
 * RepoAnalyzer component - Main UI for the GitHub repo reverse engineer
 */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "./Footer";

interface AnalysisResult {
  prompt: string;
  repoName: string;
  repoUrl: string;
  loading?: boolean;
  error?: string;
}

export default function RepoAnalyzer() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");

  const analyzeRepo = async (repoInput: string) => {
    if (!repoInput.trim()) {
      setError("Please enter a GitHub repository URL or owner/repo");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repository: repoInput.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to analyze repository");
      }

      const data = await response.json();
      setResult({
        prompt: data.prompt,
        repoName: data.repoName,
        repoUrl: data.repoUrl,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Navigate to the repo URL for shareable links
    const match = input.match(/([^/]+)\/([^/]+)$|github\.com\/([^/]+)\/([^/]+)/);
    if (match) {
      const owner = match[1] || match[3];
      const repo = match[2] || match[4];
      router.push(`/${owner}/${repo}`);
    } else {
      await analyzeRepo(input);
    }
  };

  const copyToClipboard = () => {
    if (result?.prompt) {
      navigator.clipboard.writeText(result.prompt);
      alert("Prompt copied to clipboard!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">GitPrompt</h1>
            <p className="text-xl text-slate-300">
              Reverse engineer GitHub repos into AI prompts
            </p>
            <p className="text-sm text-slate-400 mt-2">
              Discover the prompts that could have created your favorite open-source projects
            </p>
          </div>

          {/* Main Input Section */}
          <div className="bg-slate-800 rounded-lg shadow-2xl p-8 mb-8 border border-slate-700">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter repo URL (e.g., vercel/next.js or https://github.com/vercel/next.js)"
                className="flex-1 px-4 py-3 rounded-lg bg-slate-700 text-white placeholder-slate-400 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
              >
                {loading ? "Analyzing..." : "Analyze"}
              </button>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-200">
                {error}
              </div>
            )}
          </div>

          {/* Results Section */}
          {result && (
            <div className="bg-slate-800 rounded-lg shadow-2xl p-8 border border-slate-700">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Generated Prompt</h2>
                <a
                  href={result.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  Source: {result.repoName} →
                </a>
              </div>

              <div className="bg-slate-700 rounded-lg p-6 mb-6 border border-slate-600">
                <p className="text-slate-100 leading-relaxed whitespace-pre-wrap">
                  {result.prompt}
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={copyToClipboard}
                  className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Copy Prompt
                </button>
                <button
                  onClick={() => {
                    setInput("");
                    setResult(null);
                    setError("");
                  }}
                  className="flex-1 px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white font-semibold rounded-lg transition-colors"
                >
                  Analyze Another
                </button>
              </div>
            </div>
          )}

          {/* Info Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="font-semibold text-white mb-2">📝 How it works</h3>
              <p className="text-slate-300 text-sm">
                We fetch your repo&apos;s metadata, structure, and README, then use AI to generate a natural prompt.
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="font-semibold text-white mb-2">🔗 Shareable links</h3>
              <p className="text-slate-300 text-sm">
                Use URLs like <code className="bg-slate-700 px-2 py-1 rounded">/vercel/next.js</code> to share analyses.
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="font-semibold text-white mb-2">🚀 Open source</h3>
              <p className="text-slate-300 text-sm">
                Works with any public GitHub repository instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
