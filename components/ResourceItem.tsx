import React from 'react';

interface ResourceItemProps {
  title: string;
  url: string;
  source?: string;
  kind?: 'paper' | 'article' | 'tool' | 'site';
}

export default function ResourceItem({ title, url, source, kind }: ResourceItemProps) {
  const kindIcons = {
    paper: '📄',
    article: '📝',
    tool: '🔧',
    site: '🌐',
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-4 rounded-lg border border-[var(--border)] hover:bg-card/50 hover:shadow-glow transition-all duration-200 group"
    >
      <span className="text-2xl">{kind ? kindIcons[kind] : '🔗'}</span>
      <div className="flex-1">
        <h4 className="font-medium group-hover:gradient-text transition-all">
          {title}
        </h4>
        {source && <p className="text-xs text-muted mt-1">{source}</p>}
      </div>
      <svg
        className="w-5 h-5 text-muted group-hover:text-[var(--accent-from)] transition-colors"
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
  );
}
