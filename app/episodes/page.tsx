'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import homeData from '@/data/home.json';

export default function EpisodesListPage() {
  const router = useRouter();

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-32 pb-24">
        <div className="mx-auto max-w-[900px] px-4">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl font-bold mb-3 gradient-text">全部播客</h1>
            <p className="text-muted text-lg">探索我们的播客内容库</p>
          </motion.div>

          {/* Episodes List */}
          <div className="space-y-6">
            {homeData.episodes.map((episode, index) => (
              <motion.article
                key={episode.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => router.push(`/episodes/${episode.id}`)}
                className="group cursor-pointer"
              >
                <div className="flex gap-6 p-6 rounded-2xl border border-[var(--border)] bg-card hover:shadow-glow transition-all duration-300">
                  {/* Cover Image */}
                  <div className="flex-shrink-0 w-32 h-32 relative rounded-xl overflow-hidden border border-[var(--border)]">
                    <Image
                      src={episode.coverImage || episode.cover}
                      alt={episode.titleCn}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Episode Info */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold mb-2 group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                      {episode.titleCn}
                    </h2>
                    <p className="text-sm text-muted mb-3 line-clamp-1">
                      {episode.titleEn}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted">
                      <span>{formatDate(episode.date)}</span>
                      <span>•</span>
                      <span>{formatDuration(episode.duration)}</span>
                    </div>
                  </div>

                  {/* Play Icon */}
                  <div className="flex-shrink-0 self-center">
                    <div className="w-12 h-12 rounded-full border-2 border-[var(--primary)] flex items-center justify-center group-hover:bg-[var(--primary)] group-hover:scale-110 transition-all duration-300">
                      <svg
                        className="w-5 h-5 ml-0.5 group-hover:text-white transition-colors"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
