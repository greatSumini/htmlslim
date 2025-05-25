"use client";

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { MarkdownStats } from "./markdown-stats";
import { Copy, AlertCircle, FileText } from "lucide-react";
import { slimMarkdown, estimateTokenCount } from "@/lib/slim-markdown";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { EnhancedButton } from "./enhanced-button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function MarkdownSlimmer() {
  const [inputMarkdown, setInputMarkdown] = useState("");
  const [outputMarkdown, setOutputMarkdown] = useState("");
  const [stats, setStats] = useState<{
    originalSize: number;
    compressedSize: number;
    compressionRatio: number;
    removedElements: {
      extraWhitespace: number;
      emptyLines: number;
      comments: number;
      redundantFormatting: number;
    };
    estimatedTokenSavings: number;
    estimatedCostSavings: number;
  } | null>(null);
  const [error, setError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (error) {
      timeout = setTimeout(() => {
        setError(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [error]);

  const handleCompress = async () => {
    if (!inputMarkdown.trim()) {
      setError(true);
      return;
    }

    setIsProcessing(true);

    // 시뮬레이션을 위한 약간의 지연
    await new Promise((resolve) => setTimeout(resolve, 500));

    const result = slimMarkdown(inputMarkdown);
    setOutputMarkdown(result.markdown);
    setStats({
      originalSize: result.originalSize,
      compressedSize: result.compressedSize,
      compressionRatio: result.compressionRatio,
      removedElements: result.removedElements,
      estimatedTokenSavings: result.estimatedTokenSavings,
      estimatedCostSavings: result.estimatedCostSavings,
    });

    setIsProcessing(false);
  };

  const handleCopy = async () => {
    if (outputMarkdown) {
      await navigator.clipboard.writeText(outputMarkdown);
    }
  };

  const originalTokens = estimateTokenCount(inputMarkdown);
  const optimizedTokens = outputMarkdown
    ? estimateTokenCount(outputMarkdown)
    : 0;

  return (
    <div className="space-y-8 mb-20">
      <div className="space-y-3 bg-gray-900/70 p-6 rounded-lg border border-gray-800/50 shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <label
            htmlFor="input-markdown"
            className="text-sm font-medium text-gray-300 uppercase tracking-wider"
          >
            Input Markdown
          </label>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <motion.span
              key={inputMarkdown.length}
              initial={{ opacity: 0.5, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {inputMarkdown.length} characters
            </motion.span>
            <motion.span
              key={originalTokens}
              initial={{ opacity: 0.5, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-gold-400"
            >
              ~{originalTokens} tokens
            </motion.span>
          </div>
        </div>
        <Textarea
          id="input-markdown"
          placeholder="마크다운 텍스트를 여기에 붙여넣으세요...

예시:
# 제목

## 부제목

이것은   **굵은 텍스트**   입니다.

- 리스트 항목 1
- 리스트 항목 2

```javascript
console.log('Hello World');
```

> 인용문입니다.

<!-- 이것은 주석입니다 -->

[링크](https://example.com)"
          className={`min-h-[300px] bg-gray-900 border-gray-800 font-mono text-sm ${
            error ? "border-red-500 focus-visible:ring-red-500" : ""
          }`}
          value={inputMarkdown}
          onChange={(e) => setInputMarkdown(e.target.value)}
        />
      </div>

      <div className="flex flex-col items-center gap-4">
        <EnhancedButton
          onClick={handleCompress}
          error={error}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Processing...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <FileText size={18} />
              Compress Markdown
            </div>
          )}
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
              <Alert
                variant="destructive"
                className="bg-red-900/30 border-red-800 text-red-200"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  마크다운 내용을 입력해주세요.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {outputMarkdown && (
          <>
            <motion.div
              className="space-y-3 bg-gray-900/70 p-6 rounded-lg border border-gray-800/50 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="output-markdown"
                  className="text-sm font-medium text-gray-300 uppercase tracking-wider"
                >
                  Optimized Markdown
                </label>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <motion.span
                    key={outputMarkdown.length}
                    initial={{ opacity: 0.5, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {outputMarkdown.length} characters
                  </motion.span>
                  <motion.span
                    key={optimizedTokens}
                    initial={{ opacity: 0.5, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-cyan-400"
                  >
                    ~{optimizedTokens} tokens
                  </motion.span>
                </div>
              </div>
              <div className="relative">
                <Textarea
                  id="output-markdown"
                  className="min-h-[300px] bg-gray-900 border-gray-800 pr-12 font-mono text-sm"
                  value={outputMarkdown}
                  readOnly
                />
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    onClick={handleCopy}
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white hover:bg-gray-800"
                    title="클립보드에 복사"
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
                <MarkdownStats stats={stats} />
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
