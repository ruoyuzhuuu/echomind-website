'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function GradientRing() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <motion.svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        width="800"
        height="800"
        viewBox="0 0 800 800"
        fill="none"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <defs>
          <linearGradient id="gradient-ring" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent-from)" />
            <stop offset="100%" stopColor="var(--accent-to)" />
          </linearGradient>
        </defs>
        <circle
          cx="400"
          cy="400"
          r="300"
          stroke="url(#gradient-ring)"
          strokeWidth="2"
          fill="none"
        />
        <circle
          cx="400"
          cy="400"
          r="200"
          stroke="url(#gradient-ring)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        <circle
          cx="400"
          cy="400"
          r="100"
          stroke="url(#gradient-ring)"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
        />
      </motion.svg>
    </div>
  );
}
