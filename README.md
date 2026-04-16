# GitPrompt - GitHub Repo Reverse Engineer

Reverse engineer GitHub repositories into AI prompts! 🚀

This tool lets you paste in any public GitHub repository URL and generates a synthetic prompt that someone might have used to create it with an AI coding assistant.

## Features

- 🔗 **Clean, simple interface** - Just paste a repo URL or use shorthand (`owner/repo`)
- 🌐 **Shareable links** - Use URLs like `/vercel/next.js` to share analyses
- 🤖 **AI-powered** - Uses OpenRouter LLM to generate natural prompts
- 📊 **Comprehensive analysis** - Fetches repo metadata, file structure, and README
- 🎨 **Modern UI** - Built with Next.js, React, and Tailwind CSS

## Setup

### Prerequisites

- Node.js 18+
- GitHub API token (optional, but recommended)
- OpenRouter API key

### Environment Configuration

1. Copy the environment template:
```bash
cp .env.example .env.local
```

2. Configure your API keys in `.env.local`:

**GitHub Token (optional but recommended):**
- Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
- Create a new "Personal access token (classic)"
- Grant `public_repo` scope
- Paste the token in `GITHUB_TOKEN`

**OpenRouter API Key (required):**
- Sign up at [OpenRouter.ai](https://openrouter.ai)
- Get your API key from [OpenRouter Keys](https://openrouter.ai/keys)
- Paste the key in `OPENROUTER_API_KEY`

### Installation & Running

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Manual Input
1. Go to the homepage
2. Paste a GitHub URL (e.g., `https://github.com/vercel/next.js`) or shorthand (e.g., `vercel/next.js`)
3. Click "Analyze"
4. Copy the generated prompt

### Shareable Links
You can create shareable URLs directly:
- `/vercel/next.js`
- `/facebook/react`
- `/torvalds/linux`

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── analyze/        # POST endpoint for repo analysis
│   │       └── route.ts
│   ├── [owner]/[repo]/     # Dynamic routes for shareable links
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx            # Homepage
│   └── globals.css
├── components/
│   └── RepoAnalyzer.tsx    # Main UI component
└── lib/
    ├── github.ts           # GitHub API utilities
    └── openrouter.ts       # OpenRouter LLM integration
```

## Technologies

- **Frontend**: Next.js 14+, React, TypeScript
- **Styling**: Tailwind CSS
- **APIs**: GitHub REST API, OpenRouter API
- **Runtime**: Node.js with Edge Runtime support

## How It Works

1. **Repository Fetching**: Uses GitHub API to get:
   - Repository metadata (name, description, language, stats)
   - File structure and organization
   - README content

2. **AI Analysis**: Sends all collected data to OpenRouter (using auto model selection)

3. **Prompt Generation**: LLM generates a natural-sounding prompt that could have created the repository

## Future Enhancements

- [ ] Caching of analyses
- [ ] Analytics dashboard
- [ ] Custom LLM model selection
- [ ] Batch analysis for multiple repos
- [ ] Export options (JSON, markdown)
- [ ] Integration with popular LLM playgrounds

## License

MIT

## Contributing

Feel free to submit issues and enhancement requests!


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
