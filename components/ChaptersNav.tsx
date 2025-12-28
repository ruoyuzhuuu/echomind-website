'use client';

import React, { useState } from 'react';
import type { Chapter } from './AudioPlayer';

interface ChaptersNavProps {
  chapters: Chapter[];
  onJump: (sec: number) => void;
  onSeekStart?: () => void;
}

export default function ChaptersNav({ chapters, onJump, onSeekStart }: ChaptersNavProps) {
  const [expandedChapters, setExpandedChapters] = useState<Set<number>>(new Set());

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleExpand = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedChapters(newExpanded);
  };

  return (
    <div className="rounded-xl border border-[var(--border)] bg-card p-6">
      <h3 className="text-lg font-semibold mb-4">章节目录</h3>
      <div className="space-y-2">
        {chapters.map((chapter, index) => (
          <div key={index} className="rounded-lg border border-[var(--border)] hover:shadow-glow transition-all duration-200">
            <div className="flex items-center">
              <button
                onClick={() => {
                  onSeekStart?.();
                  onJump(chapter.start);
                }}
                className="flex-1 text-left p-3 flex items-center gap-3 group"
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
              {chapter.summary && (
                <button
                  onClick={(e) => toggleExpand(index, e)}
                  className="p-3 hover:text-[var(--accent-from)] transition-colors"
                  aria-label={expandedChapters.has(index) ? '收起详情' : '展开详情'}
                >
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      expandedChapters.has(index) ? 'rotate-180' : ''
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 10l5 5 5-5z" />
                  </svg>
                </button>
              )}
            </div>
            {chapter.summary && expandedChapters.has(index) && (
              <div className="px-3 pb-3 pt-0">
                <p className="text-sm text-muted leading-relaxed pl-8 border-l-2 border-[var(--border)]">
                  {chapter.summary}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
