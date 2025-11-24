import React from 'react';
import Image from 'next/image';

interface EpisodeHeaderProps {
  titleCn: string;
  titleEn?: string;
  originalUrl?: string; // Link to original English podcast
  date: string;
  duration: number;
  tags?: string[];
  cover?: string;
  coverImage?: string; // AI-generated cover, preferred over cover
}

export default function EpisodeHeader({
  titleCn,
  titleEn,
  originalUrl,
  date,
  duration,
  tags = [],
  cover,
  coverImage,
}: EpisodeHeaderProps) {
  // Prefer coverImage if available, fallback to cover
  const displayCover = coverImage || cover;
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} 分钟`;
  };

  return (
    <div className="mb-12">
      {displayCover && (
        <div className="relative w-full aspect-video md:aspect-[2/1] mb-8 rounded-xl overflow-hidden border border-[var(--border)]">
          <Image
            src={displayCover}
            alt={titleCn}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text">
          {titleCn}
        </h1>
        {titleEn && (
          <h2 className="text-xl md:text-2xl text-muted font-medium">
            {originalUrl ? (
              <a
                href={originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors duration-200 inline-flex items-center gap-2 group"
              >
                {titleEn}
                <svg
                  className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            ) : (
              titleEn
            )}
          </h2>
        )}

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
          <span>{date}</span>
          <span>•</span>
          <span>{formatDuration(duration)}</span>
          {tags.length > 0 && (
            <>
              <span>•</span>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
