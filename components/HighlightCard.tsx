'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

interface HighlightCardProps {
  title: string;
  summary: string;
  startAtSec: number;
  onPlay: (sec: number) => void;
}

export default function HighlightCard({
  title,
  summary,
  startAtSec,
  onPlay,
}: HighlightCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: 'var(--glow)' }}
      className="relative rounded-xl border border-[var(--border)] bg-card/60 backdrop-blur p-6 pb-16 transition-all duration-300"
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted line-clamp-3">{summary}</p>

      <button
        onClick={() => onPlay(startAtSec)}
        className="absolute bottom-6 right-6 w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center hover:shadow-glow hover:bg-card transition-all duration-200"
        aria-label={`播放 ${title}`}
      >
        <svg
          className="w-4 h-4 ml-0.5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
    </motion.div>
  );
}
