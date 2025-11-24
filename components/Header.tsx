'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { motion } from 'framer-motion';

interface HeaderProps {
  onSearch?: () => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-[1200px] px-4 py-4 flex items-center justify-between">
        <Link href="/" aria-label="回到首页">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm hover:gradient-text transition-all duration-200 relative group"
          >
            节目
            <span className="absolute bottom-0 left-0 w-0 h-0.5 gradient-bg group-hover:w-full transition-all duration-200" />
          </Link>
          <Link
            href="/about"
            className="text-sm hover:gradient-text transition-all duration-200 relative group"
          >
            关于
            <span className="absolute bottom-0 left-0 w-0 h-0.5 gradient-bg group-hover:w-full transition-all duration-200" />
          </Link>
          <Link
            href="/contact"
            className="text-sm hover:gradient-text transition-all duration-200 relative group"
          >
            联系
            <span className="absolute bottom-0 left-0 w-0 h-0.5 gradient-bg group-hover:w-full transition-all duration-200" />
          </Link>
          {onSearch && (
            <button
              onClick={onSearch}
              className="text-sm hover:text-[var(--accent-from)] transition-colors"
              aria-label="搜索"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          )}
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden" aria-label="菜单">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
