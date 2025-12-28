'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-[800px] px-4">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold mb-4 gradient-text">联系我们</h1>
            <p className="text-muted text-lg">欢迎与我们交流，分享你的想法和建议</p>
          </motion.div>

          {/* Contact Information */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <div className="rounded-xl border border-[var(--border)] bg-card p-8">
              <h2 className="text-2xl font-bold mb-6">联系方式</h2>

              {/* Email */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <svg className="w-6 h-6 text-[var(--accent-from)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <h3 className="font-semibold text-lg">邮箱</h3>
                </div>
                <a
                  href="mailto:contact@echomind.com"
                  className="text-[var(--accent-from)] hover:underline text-lg"
                >
                  contact@echomind.com
                </a>
                <p className="text-sm text-muted mt-2">
                  如有任何问题、建议或合作意向，欢迎发送邮件
                </p>
              </div>

              {/* Social Media - Optional, comment out if not needed */}
              {/*
              <div className="mb-6 pt-6 border-t border-[var(--border)]">
                <div className="flex items-center gap-3 mb-4">
                  <svg className="w-6 h-6 text-[var(--accent-from)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                  <h3 className="font-semibold text-lg">社交媒体</h3>
                </div>
                <div className="flex gap-4">
                  <a
                    href="https://twitter.com/echomind"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] hover:bg-card/50 transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    Twitter
                  </a>
                  <a
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] hover:bg-card/50 transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
              */}
            </div>
          </motion.section>

          {/* Feedback */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-4">反馈与建议</h2>
            <div className="space-y-4">
              <div className="rounded-xl border border-[var(--border)] bg-card p-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--accent-from)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                  </svg>
                  内容反馈
                </h3>
                <p className="text-sm text-muted">
                  对翻译质量、配音效果或内容选择有任何意见，欢迎随时告诉我们
                </p>
              </div>

              <div className="rounded-xl border border-[var(--border)] bg-card p-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--accent-from)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                  播客推荐
                </h3>
                <p className="text-sm text-muted">
                  如果你发现了优质的英文播客，欢迎推荐给我们
                </p>
              </div>

              <div className="rounded-xl border border-[var(--border)] bg-card p-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--accent-from)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                  </svg>
                  功能建议
                </h3>
                <p className="text-sm text-muted">
                  有任何功能改进建议或新功能需求，我们很乐意倾听
                </p>
              </div>
            </div>
          </motion.section>

          {/* Response Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl bg-card/50 border border-[var(--border)] p-6 text-center"
          >
            <p className="text-muted">
              我们会尽快回复您的邮件，通常在 1-3 个工作日内
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
