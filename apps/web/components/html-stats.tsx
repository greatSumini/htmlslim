"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface HtmlStatsProps {
  stats: {
    originalSize: number
    slimmedSize: number
    removedElements: Record<string, number>
  }
}

export function HtmlStats({ stats }: HtmlStatsProps) {
  const savedPercentage = Math.round(((stats.originalSize - stats.slimmedSize) / stats.originalSize) * 100)
  const [progressValue, setProgressValue] = useState(0)

  useEffect(() => {
    // Animate the progress bar
    const timer = setTimeout(() => {
      setProgressValue(savedPercentage)
    }, 100)

    return () => clearTimeout(timer)
  }, [savedPercentage])

  const totalRemoved = Object.values(stats.removedElements).reduce((acc, count) => acc + count, 0)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <Card className="bg-gray-900/70 border-gray-800/50 p-8 rounded-lg shadow-lg">
      <div className="flex items-center mb-6">
        <div className="h-8 w-1 bg-gradient-to-b from-gold-300 to-cyan-500 mr-3 rounded-full"></div>
        <h3 className="text-2xl font-semibold">Optimization Results</h3>
      </div>

      <div className="mb-8">
        <div className="flex justify-between mb-3">
          <span className="text-gray-400">Size reduction</span>
          <motion.span
            className="font-medium text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {savedPercentage}%
          </motion.span>
        </div>
        <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-gold-300 to-cyan-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressValue}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          ></motion.div>
        </div>
        <div className="flex justify-between text-sm mt-3 text-gray-400">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            Original: {stats.originalSize} chars
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            Slimmed: {stats.slimmedSize} chars
          </motion.span>
        </div>
      </div>

      <div>
        <div className="flex items-center mb-4">
          <h4 className="text-lg font-medium">
            Removed Elements (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.9 }}>
              {totalRemoved}
            </motion.span>
            )
          </h4>
        </div>
        <motion.div className="grid grid-cols-2 gap-4" variants={container} initial="hidden" animate="show">
          {Object.entries(stats.removedElements).map(([element, count]) => (
            <motion.div
              key={element}
              className="flex justify-between bg-gray-800/50 p-3 rounded-md border border-gray-700/30"
              variants={item}
            >
              <span className="text-gold-300">&lt;{element}&gt;</span>
              <span className="font-medium">{count}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Card>
  )
}
