import { HtmlSlimmer } from "@/components/html-slimmer"
import { WhyUseHtmlSlim } from "@/components/why-use-htmlslim"
import { AnimatedSection } from "@/components/animated-section"
import { Header } from "@/components/header"

export default function Home() {
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
                    <path d="M13 4v16"></path>
                    <path d="M17 4v16"></path>
                    <path d="M19 4H9.5a4.5 4.5 0 0 0 0 9H13"></path>
                  </svg>
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-center mb-3 tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-300 to-cyan-400">
                  HtmlSlim
                </span>
              </h1>
              <div className="h-px w-24 bg-gradient-to-r from-gold-300/50 to-cyan-500/50 mb-4"></div>
              <p className="text-center text-gray-400 text-lg italic">light html, save your token</p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <HtmlSlimmer />
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <WhyUseHtmlSlim />
          </AnimatedSection>
        </div>
      </main>
    </>
  )
}
