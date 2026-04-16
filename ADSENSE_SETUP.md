# Google AdSense & Analytics Setup Guide

This guide helps you set up your GitPrompt application for Google AdSense monetization and Google Analytics tracking.

## Prerequisites

- A live website deployed to a public URL (e.g., Vercel)
- A Google Account
- Google Search Console access

## Step 1: Google Search Console Setup

1. Go to https://search.google.com/search-console
2. Add your property (gitprompt.vercel.app or your domain)
3. Verify ownership by uploading the verification file or adding DNS record
4. Submit your sitemap at `/sitemap.xml`

### Verification
- Google will automatically discover `/robots.txt` and `/sitemap.xml`
- Your Privacy Policy and Terms of Service are already available at `/privacy` and `/terms`

## Step 2: Google Analytics Setup (Recommended for AdSense Approval)

1. Go to https://analytics.google.com/
2. Create a new property for GitPrompt
3. Get your Measurement ID (format: G-XXXXXXXXXX)
4. Update `src/app/layout.tsx`:
   - Replace `G-MEASUREMENT_ID` with your actual ID
   - Uncomment the Google Analytics script tags

**Layout.tsx changes:**
```typescript
{/* Uncomment and replace G-MEASUREMENT_ID */}
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_ID"></script>
<script dangerouslySetInnerHTML={{...}} />
```

## Step 3: Deploy to Production

```bash
npm run build
# Deploy to Vercel or your hosting provider
```

Make sure the site is fully operational with:
- ✅ HTTPS enabled
- ✅ Fast loading times
- ✅ Mobile responsive (already built-in with Tailwind)
- ✅ Clear navigation and footer with Privacy/Terms links
- ✅ Original, substantial content

## Step 4: Apply for Google AdSense

1. Let your site run for 7-14 days with Google Analytics tracking
2. Go to https://www.google.com/adsense/start/
3. Click "Sign up now"
4. Enter your site URL (https://gitprompt.vercel.app)
5. Follow the steps to add AdSense code

### What Google Checks:
- ✅ Valid Privacy Policy (`/privacy`)
- ✅ Terms of Service (`/terms`)
- ✅ Original content (repo analysis)
- ✅ No copyright infringement
- ✅ Clear site structure and navigation
- ✅ Sufficient traffic/usage
- ✅ No policy violations

## Step 5: Add AdSense Publisher ID

Once approved by Google AdSense:

1. Get your Publisher ID (format: `ca-pub-xxxxxxxxxxxxxxxx`)
2. Update `src/app/layout.tsx`:
   ```typescript
   <meta name="google-adsense-account" content="ca-pub-YOUR_ID" />
   ```

3. Install Google AdSense script package:
   ```bash
   npm install @next/third-parties
   ```

4. Add AdSense component to `src/components/AdSense.tsx`:
   ```typescript
   export default function AdSense() {
     return (
       <GoogleAdSense pubKey="ca-pub-YOUR_ID" />
     );
   }
   ```

5. Import and use in pages/components where ads should appear

## Monetization Strategies

### Display Ads
- Add responsive display ads in the footer or sidebar
- Best placement: Below the generated prompt results

### Integration
```typescript
// In RepoAnalyzer.tsx or any component
import AdSense from "./AdSense";

// Add ads after results
{result && <AdSense />}
```

## Important Notes

- ⚠️ Don't click your own ads
- ⚠️ Don't place ads in misleading locations
- ⚠️ Ensure ads are clearly distinguishable from content
- ⚠️ Wait for Google approval before adding ad code
- ✅ Google typically approves within 2-5 days

## Monitoring

After approval, track performance in:
- Google AdSense: https://www.google.com/adsense/ (Revenue, CTR, CPM)
- Google Analytics: https://analytics.google.com/ (Traffic patterns, user behavior)
- Search Console: https://search.google.com/search-console/ (Indexing, keywords)

## Support

- AdSense Help: https://support.google.com/adsense
- Analytics Help: https://support.google.com/analytics
- Search Console Help: https://support.google.com/webmasters

## Checklist Before Launch

- [ ] Privacy Policy live and accessible
- [ ] Terms of Service live and accessible
- [ ] robots.txt configured
- [ ] sitemap.xml submitted
- [ ] Google Search Console verified
- [ ] Google Analytics tracking enabled
- [ ] Site deployed with HTTPS
- [ ] Mobile responsive design working
- [ ] 7-14 days of data collection
- [ ] Applied for Google AdSense
- [ ] AdSense code added after approval

Good luck with monetization! 🚀
