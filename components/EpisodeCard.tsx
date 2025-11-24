'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface EpisodeCardProps {
  id: string;
  cover: string;
  coverImage?: string; // AI-generated cover, preferred over cover
  title: string;
  date?: string;
  duration?: number;
  onPlay?: () => void;
}

export default function EpisodeCard({
  id,
  cover,
  coverImage,
  title,
  date,
  duration,
  onPlay,
}: EpisodeCardProps) {
  // Prefer coverImage if available, fallback to cover
  const displayCover = coverImage || cover;
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} 分钟`;
  };

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: 'var(--glow)' }}
      className="group rounded-xl border border-[var(--border)] bg-card overflow-hidden transition-all duration-300"
    >
      <Link href={`/episodes/${id}`}>
        <div className="relative aspect-square">
          <Image
            src={displayCover}
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <span className="text-sm font-semibold">查看详情</span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold mb-2 line-clamp-2 min-h-[3rem]">
            {title}
          </h3>
          <div className="flex items-center justify-between text-xs text-muted">
            {date && <span>{date}</span>}
            {duration && <span>{formatDuration(duration)}</span>}
          </div>
        </div>
      </Link>

      {onPlay && (
        <div className="px-4 pb-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              onPlay();
            }}
            className="w-full py-2 rounded-lg border border-[var(--border)] hover:shadow-glow transition-all duration-200 flex items-center justify-center gap-2"
            aria-label={`播放 ${title}`}
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            <span className="text-sm">播放</span>
          </button>
        </div>
      )}
    </motion.div>
  );
}
