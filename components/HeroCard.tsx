'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import Image from 'next/image';

interface HeroCardProps {
  cover: string;
  title: string;
  subtitle?: string;
  onPlay: () => void;
  onDetail?: () => void;
}

export default function HeroCard({
  cover,
  title,
  subtitle,
  onPlay,
  onDetail,
}: HeroCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto"
    >
      <div className="w-60 h-60 relative rounded-xl overflow-hidden flex-shrink-0 border border-[var(--border)]">
        <Image
          src={cover}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="flex-1 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 gradient-text">
          {title}
        </h2>
        {subtitle && (
          <p className="text-muted mb-6 text-lg leading-relaxed line-clamp-2">
            {subtitle}
          </p>
        )}
        <div className="flex gap-4 justify-center md:justify-start">
          <Button variant="primary" onClick={onPlay}>
            立即收听
          </Button>
          {onDetail && (
            <Button variant="ghost" onClick={onDetail}>
              查看详情
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
