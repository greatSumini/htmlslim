import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MarkdownSlim for LLM - Optimize Your Tokens, Minimize Your Costs",
  description:
    "LLM 입력을 위한 마크다운을 최적화하여 토큰 사용량을 줄이고 API 비용을 절감하세요. 의미는 보존하면서 불필요한 토큰을 최대 40%까지 제거할 수 있습니다.",
  keywords: [
    "Markdown",
    "optimization",
    "LLM",
    "token saving",
    "AI",
    "GPT",
    "Claude",
    "markdown compressor",
    "token efficiency",
  ],
  authors: [{ name: "HtmlSlim Team" }],
  creator: "HtmlSlim",
  publisher: "HtmlSlim",
  metadataBase: new URL("https://htmlslim.com"),
  openGraph: {
    type: "website",
    url: "https://htmlslim.com/markdown",
    title: "MarkdownSlim for LLM - Optimize Your Tokens, Minimize Your Costs",
    description:
      "LLM 입력을 위한 마크다운을 최적화하여 토큰 사용량을 줄이고 API 비용을 절감하세요.",
    siteName: "HtmlSlim",
    images: [
      {
        url: "/og-image-markdown.png",
        width: 1200,
        height: 630,
        alt: "MarkdownSlim for LLM - Optimize Your Tokens, Minimize Your Costs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MarkdownSlim for LLM - Optimize Your Tokens, Minimize Your Costs",
    description:
      "LLM 입력을 위한 마크다운을 최적화하여 토큰 사용량을 줄이고 API 비용을 절감하세요.",
    images: ["/og-image-markdown.png"],
    creator: "@htmlslim",
  },
};

export default function MarkdownLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
