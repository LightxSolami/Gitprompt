import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitPrompt - Reverse Engineer GitHub Repos into AI Prompts",
  description: "Discover the AI prompts that could have created your favorite open-source projects. Analyze any GitHub repository and generate natural language prompts.",
  metadataBase: new URL("https://gitprompt.vercel.app"),
  openGraph: {
    title: "GitPrompt",
    description: "Reverse engineer GitHub repos into AI prompts",
    url: "https://gitprompt.vercel.app",
    siteName: "GitPrompt",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GitPrompt",
    description: "Reverse engineer GitHub repos into AI prompts",
  },
  verification: {
    // Add Google Search Console verification code here
    // google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Google Ads meta tag - Add your AdSense Publisher ID */}
        <meta name="google-adsense-account" content="ca-pub-xxxxxxxxxxxxxxxx" />
        
        {/* Google Analytics - Add your GA tracking ID */}
        {/* Replace MEASUREMENT_ID with your actual Google Analytics ID */}
        {/* Uncomment once you have a GA4 property set up */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-MEASUREMENT_ID"></script> */}
        {/* <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MEASUREMENT_ID');
          `
        }} /> */}
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
