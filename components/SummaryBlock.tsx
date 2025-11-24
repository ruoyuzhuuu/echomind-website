import React from 'react';

interface SummaryBlockProps {
  zh: string;
  en?: string;
}

export default function SummaryBlock({ zh, en }: SummaryBlockProps) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-card p-6">
      <h3 className="text-lg font-semibold mb-4">本期摘要</h3>
      <div className="space-y-4">
        <p className="text-sm leading-relaxed">{zh}</p>
        {en && <p className="text-sm text-muted leading-relaxed">{en}</p>}
      </div>
    </div>
  );
}
