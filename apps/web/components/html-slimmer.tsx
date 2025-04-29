"use client"

import { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { HtmlStats } from "./html-stats"
import { Copy, AlertCircle } from "lucide-react"
import { slimHtml } from "@/lib/slim-html"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { EnhancedButton } from "./enhanced-button"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function HtmlSlimmer() {
  const [inputHtml, setInputHtml] = useState("")
  const [outputHtml, setOutputHtml] = useState("")
  const [stats, setStats] = useState<{
    originalSize: number
    slimmedSize: number
    removedElements: Record<string, number>
  } | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (error) {
      timeout = setTimeout(() => {
        setError(false)
      }, 3000)
    }
    return () => clearTimeout(timeout)
  }, [error])

  const handleSlim = () => {
    if (!inputHtml.trim()) {
      setError(true)
      return
    }

    const result = slimHtml(inputHtml)
    setOutputHtml(result.html)
    setStats({
      originalSize: inputHtml.length,
      slimmedSize: result.html.length,
      removedElements: result.removedElements,
    })
  }

  const handleCopy = () => {
    if (outputHtml) {
      navigator.clipboard.writeText(outputHtml)
    }
  }

  return (
    <div className="space-y-8 mb-20">
      <div className="space-y-3 bg-gray-900/70 p-6 rounded-lg border border-gray-800/50 shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="input-html" className="text-sm font-medium text-gray-300 uppercase tracking-wider">
            Input HTML
          </label>
          <motion.span
            className="text-sm text-gray-400"
            key={inputHtml.length}
            initial={{ opacity: 0.5, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {inputHtml.length} characters
          </motion.span>
        </div>
        <Textarea
          id="input-html"
          placeholder="Paste your HTML here..."
          className={`min-h-[200px] bg-gray-900 border-gray-800 font-sans ${
            error ? "border-red-500 focus-visible:ring-red-500" : ""
          }`}
          value={inputHtml}
          onChange={(e) => setInputHtml(e.target.value)}
        />
      </div>

      <div className="flex flex-col items-center gap-4">
        <EnhancedButton onClick={handleSlim} error={error}>
          Slim HTML
        </EnhancedButton>

        <AnimatePresence>
          {error && (
            <motion.div
              className="w-full max-w-md"
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Alert variant="destructive" className="bg-red-900/30 border-red-800 text-red-200">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>Please enter HTML content to slim.</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {outputHtml && (
          <>
            <motion.div
              className="space-y-3 bg-gray-900/70 p-6 rounded-lg border border-gray-800/50 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="output-html" className="text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Slimmed HTML
                </label>
                <motion.span
                  className="text-sm text-gray-400"
                  key={outputHtml.length}
                  initial={{ opacity: 0.5, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {outputHtml.length} characters
                </motion.span>
              </div>
              <div className="relative">
                <Textarea
                  id="output-html"
                  className="min-h-[200px] bg-gray-900 border-gray-800 pr-12 font-sans"
                  value={outputHtml}
                  readOnly
                />
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    onClick={handleCopy}
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white hover:bg-gray-800"
                    title="Copy to clipboard"
                  >
                    <Copy size={18} />
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {stats && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <HtmlStats stats={stats} />
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
