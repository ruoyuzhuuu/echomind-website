import React from 'react';
import Logo from './Logo';

export default function Footer() {
  const socialLinks = [
    { name: '小宇宙', url: '#', icon: '🎙️' },
    { name: 'Apple Podcasts', url: '#', icon: '🎵' },
    { name: 'Spotify', url: '#', icon: '🎧' },
  ];

  return (
    <footer className="border-t border-[var(--border)] mt-24">
      <div className="mx-auto max-w-[1200px] px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <Logo className="mb-3" />
            <p className="text-sm text-muted max-w-md">
              在 AI 与声音的边界，捕捉思想的回声
            </p>
          </div>

          <div className="flex gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                className="text-2xl hover:scale-110 transition-transform duration-200"
                aria-label={link.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[var(--border)] text-center text-xs text-muted">
          © {new Date().getFullYear()} 回声思维 EchoMind. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
