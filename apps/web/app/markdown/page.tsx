import { MarkdownSlimmer } from "@/components/markdown-slimmer";
import { WhyUseMarkdownSlim } from "@/components/why-use-markdownslim";
import { AnimatedSection } from "@/components/animated-section";
import { Header } from "@/components/header";
import Link from "next/link";

export default function MarkdownPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-950 bg-classic-texture text-white pt-16">
        <div className="container mx-auto px-4 py-16 max-w-5xl">
          <AnimatedSection>
            <div className="flex flex-col items-center mb-12">
              <div className="mb-6 relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-gold-300/30 to-cyan-500/30 rounded-full blur"></div>
                <div className="bg-gradient-to-r from-gold-400 to-cyan-500 p-3 rounded-full relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-950"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14,2 14,8 20,8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10,9 9,9 8,9"></polyline>
                  </svg>
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-center mb-3 tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-300 to-cyan-400">
                  MarkdownSlim for LLM
                </span>
              </h1>
              <div className="h-px w-24 bg-gradient-to-r from-gold-300/50 to-cyan-500/50 mb-4"></div>
              <p className="text-center text-gray-400 text-lg italic">
                optimize your tokens, minimize your costs
              </p>
              <p className="text-center text-gray-300 text-base mt-4 max-w-2xl leading-relaxed">
                LLM 입력을 위한 마크다운을 최적화하여 토큰 사용량을 줄이고 API
                비용을 절감하세요. 의미는 보존하면서 불필요한 토큰을 최대
                40%까지 제거할 수 있습니다.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <MarkdownSlimmer />
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <WhyUseMarkdownSlim />
          </AnimatedSection>

          <AnimatedSection delay={0.6}>
            <div className="mt-20 text-center">
              <div className="bg-gray-900/50 p-8 rounded-lg border border-gray-800/50">
                <h3 className="text-2xl font-bold text-white mb-4">
                  HTML도 최적화하고 싶으신가요?
                </h3>
                <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                  LLM 입력을 위한 HTML 압축 도구로 불필요한 태그와 속성을
                  제거하세요.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-400 to-cyan-500 hover:from-gold-500 hover:to-cyan-600 text-gray-950 font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M13 4v16"></path>
                    <path d="M17 4v16"></path>
                    <path d="M19 4H9.5a4.5 4.5 0 0 0 0 9H13"></path>
                  </svg>
                  HtmlSlim 사용하기
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>
    </>
  );
}
