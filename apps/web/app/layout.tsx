import type React from "react"
import type { Metadata } from "next"
import { Inter, Lora } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
})

export const metadata: Metadata = {
  title: "HtmlSlim - Light HTML, Save Your Token",
  description: "Optimize HTML for LLMs by removing unnecessary tags and attributes to save tokens and prevent errors",
  keywords: ["HTML", "optimization", "LLM", "token saving", "AI", "HTML cleaner", "HTML optimizer"],
  authors: [{ name: "HtmlSlim Team" }],
  creator: "HtmlSlim",
  publisher: "HtmlSlim",
  metadataBase: new URL("https://htmlslim.com"),
  openGraph: {
    type: "website",
    url: "https://htmlslim.com",
    title: "HtmlSlim - Light HTML, Save Your Token",
    description: "Optimize HTML for LLMs by removing unnecessary tags and attributes to save tokens and prevent errors",
    siteName: "HtmlSlim",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HtmlSlim - Light HTML, Save Your Token",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HtmlSlim - Light HTML, Save Your Token",
    description: "Optimize HTML for LLMs by removing unnecessary tags and attributes to save tokens and prevent errors",
    images: ["/og-image.png"],
    creator: "@htmlslim",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${lora.variable} ${inter.variable} font-serif`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
