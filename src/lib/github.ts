/**
 * GitHub API utilities for fetching repository information
 */

interface GitHubRepo {
  name: string;
  full_name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  forks: number;
  created_at: string;
  updated_at: string;
  homepage: string | null;
  topics: string[];
}

interface FileTree {
  name: string;
  type: "file" | "dir";
  path: string;
  children?: FileTree[];
}

const GITHUB_API_BASE = "https://api.github.com";

// Add authentication header if token is available
function getHeaders() {
  const token = process.env.GITHUB_TOKEN;
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `token ${token}` }),
  };
}

export async function getRepoMetadata(owner: string, repo: string): Promise<GitHubRepo> {
  const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}`, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch repository metadata: ${response.statusText}`);
  }

  const data = await response.json();

  return {
    name: data.name,
    full_name: data.full_name,
    description: data.description,
    url: data.html_url,
    language: data.language,
    stars: data.stargazers_count,
    forks: data.forks_count,
    created_at: data.created_at,
    updated_at: data.updated_at,
    homepage: data.homepage,
    topics: data.topics || [],
  };
}

export async function getReadme(owner: string, repo: string): Promise<string> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/readme`,
      {
        headers: getHeaders(),
      }
    );

    if (!response.ok) {
      return "";
    }

    const data = await response.json();

    // The API returns the content base64 encoded
    if (data.content) {
      return Buffer.from(data.content, "base64").toString("utf-8");
    }

    return "";
  } catch (error) {
    console.error("Error fetching README:", error);
    return "";
  }
}

export async function getFileTree(
  owner: string,
  repo: string,
  path: string = ""
): Promise<FileTree[]> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents${path ? `/${path}` : ""}`,
      {
        headers: getHeaders(),
      }
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      return [];
    }

    // Filter out common non-essential directories and files
    const filteredItems = data
      .filter((item) => {
        const name = item.name.toLowerCase();
        return !["node_modules", ".git", "dist", "build", ".next", ".env"].includes(
          name
        );
      })
      .map((item) => ({
        name: item.name,
        type: item.type as "file" | "dir",
        path: item.path,
      }));

    return filteredItems;
  } catch (error) {
    console.error("Error fetching file tree:", error);
    return [];
  }
}

/**
 * Parse GitHub URL (either full URL or shorthand owner/repo)
 */
export function parseGitHubUrl(input: string): { owner: string; repo: string } | null {
  // Handle shorthand: owner/repo
  if (!input.includes("://") && input.includes("/")) {
    const parts = input.split("/").filter(Boolean);
    if (parts.length >= 2) {
      return {
        owner: parts[0],
        repo: parts[1].replace(".git", ""),
      };
    }
  }

  // Handle full URL
  try {
    const url = new URL(input);
    if (!url.hostname.includes("github.com")) {
      return null;
    }

    const pathname = url.pathname.split("/").filter(Boolean);
    if (pathname.length >= 2) {
      return {
        owner: pathname[0],
        repo: pathname[1].replace(".git", ""),
      };
    }
  } catch {
    return null;
  }

  return null;
}
