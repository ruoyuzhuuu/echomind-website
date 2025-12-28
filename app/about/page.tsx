'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function AboutPage() {
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
            <h1 className="text-4xl font-bold mb-4 gradient-text">关于回声思维</h1>
            <p className="text-muted text-lg">在 AI 与声音的边界，捕捉思想的回声</p>
          </motion.div>

          {/* Project Introduction */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-4">项目愿景</h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                EchoMind（回声思维）致力于打破语言边界，将全球优质的英文播客内容带给中文听众。
              </p>
              <p>
                我们相信，知识不应该被语言所限制。通过 AI 技术的力量，我们将精选的英文播客翻译成中文，
                并使用先进的语音合成技术生成自然流畅的中文配音，让每一个中文听众都能轻松获取世界各地的前沿思想。
              </p>
              <p>
                从科技创新到人文思考，从行业洞察到生活智慧，我们精心挑选值得聆听的声音，
                用 AI 技术传递思想的回声。
              </p>
            </div>
          </motion.section>

          {/* Content Features */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-4">内容特色</h2>
            <div className="grid gap-4">
              <div className="rounded-xl border border-[var(--border)] bg-card p-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--accent-from)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  精选内容
                </h3>
                <p className="text-sm text-muted">
                  严格筛选全球优质英文播客，聚焦 AI、科技、创新、人文等领域的深度内容
                </p>
              </div>

              <div className="rounded-xl border border-[var(--border)] bg-card p-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--accent-from)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  AI 翻译 + 中文配音
                </h3>
                <p className="text-sm text-muted">
                  使用 GPT-4 进行高质量翻译，结合 MiniMax 语音合成技术生成自然流畅的中文配音
                </p>
              </div>

              <div className="rounded-xl border border-[var(--border)] bg-card p-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--accent-from)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  完整功能体验
                </h3>
                <p className="text-sm text-muted">
                  双语字幕、智能章节、精彩要点提取，让你高效获取知识
                </p>
              </div>
            </div>
          </motion.section>

          {/* Creator */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-4">创作者</h2>
            <div className="rounded-xl border border-[var(--border)] bg-card p-6">
              <p className="text-muted leading-relaxed mb-4">
                我叫 Lorraine，是一名 AI builder 新手，在积极探索 AI 如何能够让知识的传播更加自由和便捷。
              </p>
              <p className="text-muted leading-relaxed">
                创建 EchoMind 的初衷，是希望能够让更多人接触到优质的英文播客内容，
                打破语言的障碍，让思想的交流不再受限。
              </p>
            </div>
          </motion.section>

          {/* Tech Stack */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-4">技术栈</h2>
            <div className="rounded-xl border border-[var(--border)] bg-card p-6">
              <div className="flex flex-wrap gap-2">
                {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'GPT-4', 'MiniMax TTS', 'AssemblyAI', 'Cloudflare R2'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-card border border-[var(--border)] text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
