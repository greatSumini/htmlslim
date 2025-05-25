"use client";

import { motion } from "framer-motion";
import { FileText, Zap, DollarSign, Trash2 } from "lucide-react";
import type { MarkdownSlimResult } from "@/lib/slim-markdown";

interface MarkdownStatsProps {
  stats: {
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
  };
}

export function MarkdownStats({ stats }: MarkdownStatsProps) {
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 4,
    }).format(amount);
  };

  const totalRemoved = Object.values(stats.removedElements).reduce(
    (sum, count) => sum + count,
    0
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="bg-gray-900/70 p-6 rounded-lg border border-gray-800/50 shadow-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-lg font-semibold text-gray-200 mb-6 flex items-center gap-2">
        <FileText size={20} className="text-cyan-400" />
        Compression Statistics
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400 uppercase tracking-wider">
              Original Size
            </span>
            <FileText size={16} className="text-gray-500" />
          </div>
          <div className="text-2xl font-bold text-white">
            {formatBytes(stats.originalSize)}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {stats.originalSize.toLocaleString()} characters
          </div>
        </motion.div>

        <motion.div
          className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400 uppercase tracking-wider">
              Optimized Size
            </span>
            <Zap size={16} className="text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-cyan-400">
            {formatBytes(stats.compressedSize)}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {stats.compressedSize.toLocaleString()} characters
          </div>
        </motion.div>

        <motion.div
          className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400 uppercase tracking-wider">
              Token Savings
            </span>
            <Zap size={16} className="text-gold-400" />
          </div>
          <div className="text-2xl font-bold text-gold-400">
            {stats.estimatedTokenSavings.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {stats.compressionRatio.toFixed(1)}% reduction
          </div>
        </motion.div>

        <motion.div
          className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400 uppercase tracking-wider">
              Cost Savings
            </span>
            <DollarSign size={16} className="text-green-400" />
          </div>
          <div className="text-2xl font-bold text-green-400">
            {formatCurrency(stats.estimatedCostSavings)}
          </div>
          <div className="text-xs text-gray-500 mt-1">per request (GPT-4)</div>
        </motion.div>
      </div>

      {totalRemoved > 0 && (
        <motion.div
          className="mt-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700/30"
          variants={itemVariants}
        >
          <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
            <Trash2 size={16} className="text-red-400" />
            Removed Elements
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            {stats.removedElements.extraWhitespace > 0 && (
              <div className="text-center">
                <div className="text-lg font-semibold text-red-400">
                  {stats.removedElements.extraWhitespace}
                </div>
                <div className="text-gray-500">Extra Spaces</div>
              </div>
            )}
            {stats.removedElements.emptyLines > 0 && (
              <div className="text-center">
                <div className="text-lg font-semibold text-red-400">
                  {stats.removedElements.emptyLines}
                </div>
                <div className="text-gray-500">Empty Lines</div>
              </div>
            )}
            {stats.removedElements.comments > 0 && (
              <div className="text-center">
                <div className="text-lg font-semibold text-red-400">
                  {stats.removedElements.comments}
                </div>
                <div className="text-gray-500">Comments</div>
              </div>
            )}
            {stats.removedElements.redundantFormatting > 0 && (
              <div className="text-center">
                <div className="text-lg font-semibold text-red-400">
                  {stats.removedElements.redundantFormatting}
                </div>
                <div className="text-gray-500">Redundant Format</div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      <motion.div
        className="mt-4 text-center text-xs text-gray-500"
        variants={itemVariants}
      >
        Token estimation based on average character-to-token ratios. Actual
        results may vary by model.
      </motion.div>
    </motion.div>
  );
}
