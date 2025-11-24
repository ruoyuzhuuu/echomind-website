'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface KeyPointCardProps {
  title: string;
  summary?: string;
  highlights?: string[]; // Array of 2-3 highlight points
  startAt?: number;
  duration?: number;
  audioElement?: HTMLAudioElement | null;
  onJump?: (sec: number) => void;
  onScrollToPlayer?: () => void; // Callback to scroll to player
}

export default function KeyPointCard({
  title,
  summary,
  highlights,
  startAt,
  duration,
  audioElement,
  onJump,
  onScrollToPlayer,
}: KeyPointCardProps) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleClick = () => {
    if (startAt === undefined) return;

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Scroll to player first
    onScrollToPlayer?.();

    // Jump to start position
    onJump?.(startAt);

    // If duration is provided and audio element exists, set auto-stop
    if (duration && audioElement) {
      // Wait a bit for audio to start playing
      setTimeout(() => {
        if (audioElement) {
          audioElement.play().catch(console.error);

          // Set timeout to pause after duration
          timeoutRef.current = setTimeout(() => {
            if (audioElement) {
              audioElement.pause();
            }
          }, duration * 1000);
        }
      }, 100);
    }
  };

  // Use highlights if available, otherwise fallback to summary
  const displayContent = highlights || (summary ? [summary] : []);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="rounded-xl border border-[var(--border)] bg-card p-5 cursor-pointer transition-all duration-200 hover:shadow-glow"
      onClick={handleClick}
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent-from)] to-[var(--accent-to)] flex items-center justify-center flex-shrink-0 mt-1">
          <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold mb-2">{title}</h4>
          {displayContent.length > 0 && (
            <ul className="space-y-1.5">
              {displayContent.map((point, index) => (
                <li key={index} className="text-sm text-muted flex items-start gap-2">
                  <span className="text-[var(--accent-from)] mt-1.5">•</span>
                  <span className="flex-1">{point}</span>
                </li>
              ))}
            </ul>
          )}
          {duration && (
            <p className="text-xs text-muted mt-3 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/>
              </svg>
              片段时长：{Math.floor(duration / 60)}分{Math.round(duration % 60)}秒
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
