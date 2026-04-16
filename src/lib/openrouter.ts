/**
 * OpenRouter API utilities for generating prompts using LLM
 */

interface AnalysisContext {
  repoName: string;
  description: string;
  language: string | null;
  topics: string[];
  fileStructure: string;
  readme: string;
  stats: {
    stars: number;
    forks: number;
    createdAt: string;
    updatedAt: string;
  };
}

const OPENROUTER_API_BASE = "https://openrouter.ai/api/v1";

export async function generateRepoPrompt(context: AnalysisContext): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured");
  }

  const systemPrompt = `You are an expert at reverse engineering codebases. Your task is to analyze repository information and generate a comprehensive, natural-sounding prompt that someone might have used to create this project with an AI coding assistant.

The prompt should:
1. Be specific and actionable
2. Capture the main purpose and functionality of the project
3. Reference the tech stack and key features
4. Sound natural and conversational (as if a human wrote it)
5. Include relevant constraints or requirements
6. Be detailed enough that an AI could reasonably recreate the project

Return ONLY the prompt text, without any explanation or preamble.`;

  const userMessage = `Analyze this GitHub repository and generate a synthetic prompt that was likely used to create it:

**Repository Name:** ${context.repoName}
**Description:** ${context.description || "No description provided"}
**Primary Language:** ${context.language || "Not specified"}
**Topics/Tags:** ${context.topics.join(", ") || "None"}

**File Structure:**
${context.fileStructure}

**Statistics:**
- Stars: ${context.stats.stars}
- Forks: ${context.stats.forks}
- Created: ${new Date(context.stats.createdAt).toLocaleDateString()}
- Last Updated: ${new Date(context.stats.updatedAt).toLocaleDateString()}

**README Content:**
${context.readme.substring(0, 2000)}${context.readme.length > 2000 ? "..." : ""}

Generate a natural prompt that could have created this repository:`;

  try {
    const response = await fetch(`${OPENROUTER_API_BASE}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://gitprompt.vercel.app",
        "X-Title": "GitPrompt - Repo Reverse Engineer",
      },
      body: JSON.stringify({
        model: "openrouter/auto",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `OpenRouter API error: ${error.error?.message || response.statusText}`
      );
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error("Unexpected response format from OpenRouter");
    }

    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error calling OpenRouter API:", error);
    throw error;
  }
}
