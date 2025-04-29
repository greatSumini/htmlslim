"use client"

import Link from "next/link"
import { Github } from "lucide-react"
import { motion } from "framer-motion"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800/50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-gold-400 to-cyan-500 p-1.5 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
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
          <span className="font-semibold text-lg">HtmlSlim</span>
        </Link>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="https://github.com/greatSumini/htmlslim-web"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded-md transition-colors"
          >
            <Github size={18} />
            <span>GitHub</span>
          </Link>
        </motion.div>
      </div>
    </header>
  )
}
