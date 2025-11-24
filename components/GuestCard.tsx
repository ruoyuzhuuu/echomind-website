import React from 'react';
import Image from 'next/image';

interface GuestCardProps {
  avatar?: string;
  name: string;
  title?: string;
  bio?: string;
  twitter?: string;
  showHeading?: boolean;
}

export default function GuestCard({ avatar, name, title, bio, twitter, showHeading = true }: GuestCardProps) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-card p-6">
      {showHeading && <h3 className="text-lg font-semibold mb-4">本期嘉宾</h3>}
      <div className="flex items-start gap-4">
        {avatar && (
          <div className="w-16 h-16 relative rounded-full overflow-hidden flex-shrink-0 border border-[var(--border)]">
            <Image src={avatar} alt={name} fill className="object-cover" />
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-lg">{name}</h4>
            {twitter && (
              <a
                href={twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-[var(--primary)] transition-colors"
                aria-label={`${name} on Twitter`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            )}
          </div>
          {title && <p className="text-sm text-muted mb-2">{title}</p>}
          {bio && <p className="text-sm text-muted leading-relaxed">{bio}</p>}
        </div>
      </div>
    </div>
  );
}
