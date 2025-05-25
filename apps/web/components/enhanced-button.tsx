"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SparkleEffect } from "./sparkle";
import { Button } from "@/components/ui/button";

interface EnhancedButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  error?: boolean;
  disabled?: boolean;
}

export function EnhancedButton({
  onClick,
  children,
  className = "",
  error = false,
  disabled = false,
}: EnhancedButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (error) {
      setShake(true);
      const timeout = setTimeout(() => {
        setShake(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setShowSparkles(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowSparkles(false);
  };

  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      animate={shake ? { x: [-10, 10, -10, 10, -5, 5, -2, 2, 0] } : {}}
      transition={shake ? { duration: 0.5 } : {}}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow effect */}
      <motion.div
        className={`absolute inset-0 rounded-lg blur-lg ${
          error ? "bg-red-500/50" : "bg-gradient-to-r from-gold-300 to-cyan-400"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: error ? 0.6 : isHovered ? 0.6 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Sparkles */}
      {showSparkles && !error && <SparkleEffect />}

      {/* Button */}
      <motion.div
        animate={{
          y: isPressed ? 2 : 0,
        }}
      >
        <Button
          onClick={() => {
            if (!disabled) {
              setIsPressed(true);
              setTimeout(() => setIsPressed(false), 150);
              onClick();
            }
          }}
          disabled={disabled}
          className={`relative ${
            disabled
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : error
                ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-2 border-t-red-400/30 border-l-red-400/30 border-b-red-800/30 border-r-red-800/30"
                : "bg-gradient-to-r from-gold-400 to-cyan-600 hover:from-gold-500 hover:to-cyan-700 border-2 border-t-gold-200/30 border-l-gold-200/30 border-b-cyan-700/30 border-r-cyan-700/30"
          } 
          text-gray-950 font-bold text-lg px-12 py-7 rounded-md shadow-lg z-10 ${className}`}
        >
          {children}
        </Button>
      </motion.div>
    </motion.div>
  );
}
