"use client"

import { Card } from "@/components/ui/card"
import { Scissors, Zap, Bot, Shield } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function WhyUseHtmlSlim() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <div className="mt-24">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Use HtmlSlim?</h2>
        <div className="h-1 w-32 bg-gradient-to-r from-gold-300/50 to-cyan-500/50 mx-auto mb-8"></div>

        <motion.div
          className="max-w-3xl mx-auto px-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <p className="text-lg text-gray-400 leading-relaxed mb-2">
            HtmlSlim is a specialized tool designed to <span className="font-medium text-gray-300">optimize HTML</span>{" "}
            for language models.
          </p>
          <p className="text-lg text-gray-400 leading-relaxed mb-2">
            By removing unnecessary tags and attributes, we help you{" "}
            <span className="font-medium text-gray-300">save tokens</span> and improve AI comprehension.
          </p>
          <p className="text-lg text-gray-400 leading-relaxed">
            Perfect for developers working with <span className="font-medium text-gray-300">LLMs</span> who need
            cleaner, more efficient HTML.
          </p>
        </motion.div>
      </div>

      <motion.div
        ref={ref}
        className="grid grid-cols-1 gap-10 mt-12"
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        <motion.div variants={item}>
          <Card className="bg-gray-900/70 border-gray-800/50 p-8 h-full rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <motion.div
                className="bg-gradient-to-br from-gold-300/20 to-gold-400/20 p-5 rounded-lg"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(194, 160, 92, 0.3)" }}
              >
                <Scissors className="h-8 w-8 text-gold-300" />
              </motion.div>
              <div>
                <h3 className="font-semibold text-2xl mb-4 text-gold-200">Reduce Token Usage</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  LLMs process text by tokens. By removing unnecessary HTML elements, you can significantly reduce the
                  number of tokens used, saving costs. This is especially important when working with large HTML
                  documents or when making multiple API calls.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="bg-gray-900/70 border-gray-800/50 p-8 h-full rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <motion.div
                className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 p-5 rounded-lg"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(8, 145, 178, 0.3)" }}
              >
                <Zap className="h-8 w-8 text-cyan-400" />
              </motion.div>
              <div>
                <h3 className="font-semibold text-2xl mb-4 text-cyan-300">Improve Performance</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Slimmer HTML means faster processing times for LLMs, resulting in quicker responses and better overall
                  performance. By removing scripts, styles, and other non-essential elements, you can focus the model on
                  the content that matters.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="bg-gray-900/70 border-gray-800/50 p-8 h-full rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <motion.div
                className="bg-gradient-to-br from-gold-300/20 to-gold-400/20 p-5 rounded-lg"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(194, 160, 92, 0.3)" }}
              >
                <Bot className="h-8 w-8 text-gold-300" />
              </motion.div>
              <div>
                <h3 className="font-semibold text-2xl mb-4 text-gold-200">Better AI Understanding</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  By focusing on the essential content structure, LLMs can better understand and process the HTML
                  without getting distracted by irrelevant tags. This leads to more accurate responses and better
                  comprehension of the document's structure and content.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="bg-gray-900/70 border-gray-800/50 p-8 h-full rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <motion.div
                className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 p-5 rounded-lg"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(8, 145, 178, 0.3)" }}
              >
                <Shield className="h-8 w-8 text-cyan-400" />
              </motion.div>
              <div>
                <h3 className="font-semibold text-2xl mb-4 text-cyan-300">Prevent Errors</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Complex HTML with scripts and styles can cause LLMs to misinterpret content or generate incorrect
                  responses. Slimming removes these potential error sources, resulting in more reliable and consistent
                  outputs from your AI models.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
