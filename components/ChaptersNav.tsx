'use client';

import React from 'react';
import type { Chapter } from './AudioPlayer';

interface ChaptersNavProps {
  chapters: Chapter[];
  onJump: (sec: number) => void;
  onSeekStart?: () => void;
}

export default function ChaptersNav({ chapters, onJump, onSeekStart }: ChaptersNavProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="rounded-xl border border-[var(--border)] bg-card p-6">
      <h3 className="text-lg font-semibold mb-4">章节目录</h3>
      <div className="space-y-2">
        {chapters.map((chapter, index) => (
          <button
            key={index}
            onClick={() => {
              onSeekStart?.();
              onJump(chapter.start);
            }}
            className="w-full text-left p-3 rounded-lg hover:bg-card/50 hover:shadow-glow transition-all duration-200 flex items-center gap-3 group"
          >
            <span className="text-sm text-muted group-hover:gradient-text font-mono">
              {formatTime(chapter.start)}
            </span>
            <span className="text-sm flex-1">{chapter.title}</span>
            <svg
              className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
