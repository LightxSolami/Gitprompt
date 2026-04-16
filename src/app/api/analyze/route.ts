/**
 * API endpoint for analyzing GitHub repositories
 */
import { NextRequest, NextResponse } from "next/server";
import { getRepoMetadata, getReadme, getFileTree, parseGitHubUrl } from "@/lib/github";
import { generateRepoPrompt } from "@/lib/openrouter";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { repository } = body;

    if (!repository) {
      return NextResponse.json(
        { error: "Repository URL or owner/repo is required" },
        { status: 400 }
      );
    }

    // Parse the repository input
    const parsed = parseGitHubUrl(repository);
    if (!parsed) {
      return NextResponse.json(
        { error: "Invalid GitHub repository URL or format. Use: owner/repo or https://github.com/owner/repo" },
        { status: 400 }
      );
    }

    const { owner, repo } = parsed;

    // Fetch repository metadata
    const metadata = await getRepoMetadata(owner, repo);

    // Fetch README
    const readme = await getReadme(owner, repo);

    // Fetch file tree
    const fileTree = await getFileTree(owner, repo);

    // Format file tree for context
    const fileStructure = formatFileTree(fileTree);

    // Generate prompt using OpenRouter
    const prompt = await generateRepoPrompt({
      repoName: metadata.full_name,
      description: metadata.description || "",
      language: metadata.language,
      topics: metadata.topics,
      fileStructure,
      readme,
      stats: {
        stars: metadata.stars,
        forks: metadata.forks,
        createdAt: metadata.created_at,
        updatedAt: metadata.updated_at,
      },
    });

    return NextResponse.json({
      prompt,
      repoName: metadata.full_name,
      repoUrl: metadata.url,
    });
  } catch (error) {
    console.error("Error analyzing repository:", error);

    let errorMessage = "Failed to analyze repository";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

function formatFileTree(tree: Array<{ name: string; type: string; path: string; children?: Array<unknown> }>, prefix = ""): string {
  let result = "";

  tree.forEach((item, index) => {
    const isLastItem = index === tree.length - 1;
    const connector = isLastItem ? "└── " : "├── ";
    const continuation = isLastItem ? "    " : "│   ";

    result += prefix + connector + item.name + "\n";

    // Limit recursion to prevent huge outputs
    if (prefix.length < 12 && item.type === "dir" && item.children?.length) {
      result += formatFileTree(item.children as Array<{ name: string; type: string; path: string; children?: Array<unknown> }>, prefix + continuation);
    }
  });

  return result;
}
