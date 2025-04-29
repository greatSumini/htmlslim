"use client";

import type React from "react";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface SparkleProps {
  color?: string;
  size?: number;
  style?: React.CSSProperties;
}

const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

const generateSparkle = (color: string) => {
  return {
    id: String(random(10000, 99999)),
    createdAt: Date.now(),
    color,
    size: random(10, 20),
    style: {
      top: random(-10, 80) + "%",
      left: random(-10, 110) + "%",
      zIndex: 100,
    },
  };
};

const Sparkle = ({
  color = "#FFC700",
  size = 20,
  style = {},
}: SparkleProps) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      className="absolute pointer-events-none"
      initial={{ scale: 0, rotate: 0, opacity: 0 }}
      animate={{
        scale: [0, 1, 0.8, 1],
        rotate: [0, 0, 180, 180],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
      }}
    >
      <path
        d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
        fill={color}
      />
    </motion.svg>
  );
};

export function SparkleEffect() {
  const [sparkles, setSparkles] = useState<Array<any>>([]);

  useEffect(() => {
    const colors = ["#FFC700", "#FF6B6B", "#60D394", "#4EA8DE", "#845EC2"];
    const newSparkles = Array.from({ length: 8 }).map(() =>
      generateSparkle(colors[random(0, colors.length)])
    );
    setSparkles(newSparkles);

    const timeout = setTimeout(() => {
      setSparkles([]);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {sparkles.map((sparkle) => (
        <Sparkle
          key={sparkle.id}
          color={sparkle.color}
          size={sparkle.size}
          style={sparkle.style}
        />
      ))}
    </>
  );
}
