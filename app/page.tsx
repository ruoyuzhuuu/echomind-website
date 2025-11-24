'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GradientRing from '@/components/GradientRing';
import HeroCard from '@/components/HeroCard';
import HighlightCard from '@/components/HighlightCard';
import EpisodeCard from '@/components/EpisodeCard';
import homeData from '@/data/home.json';

export default function HomePage() {
  const router = useRouter();

  const handlePlay = (id: string) => {
    router.push(`/episodes/${id}`);
  };

  const handleHighlightClick = (epId: string, startAt: number) => {
    router.push(`/episodes/${epId}?start=${startAt}`);
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <GradientRing />
        <div className="relative z-10 mx-auto max-w-[1200px] px-4">
          {/* Slogan */}
          {homeData.brand.slogan && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-center text-lg text-muted mb-8"
            >
              {homeData.brand.slogan}
            </motion.p>
          )}

          <HeroCard
            cover={homeData.latest.coverImage || homeData.latest.cover}
            title={homeData.latest.titleCn}
            subtitle={homeData.latest.summary}
            onPlay={() => handlePlay(homeData.latest.id)}
            onDetail={() => handlePlay(homeData.latest.id)}
          />
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16">
        <div className="mx-auto max-w-[1200px] px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-8 text-center"
          >
            精彩看点
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {homeData.highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <HighlightCard
                  title={highlight.title}
                  summary={highlight.summary}
                  startAtSec={highlight.startAtSec}
                  onPlay={(startAt) => handleHighlightClick(highlight.epId, startAt)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Episodes Section */}
      <section className="py-16">
        <div className="mx-auto max-w-[1200px] px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-8 text-center"
          >
            最近节目
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeData.episodes.slice(0, 6).map((episode, index) => (
              <motion.div
                key={episode.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <EpisodeCard
                  id={episode.id}
                  cover={episode.cover}
                  coverImage={episode.coverImage}
                  title={episode.titleCn}
                  date={episode.date}
                  duration={episode.duration}
                  onPlay={() => handlePlay(episode.id)}
                />
              </motion.div>
            ))}
          </div>

          {/* More Episodes Button */}
          {homeData.episodes.length > 6 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <button
                onClick={() => router.push('/episodes')}
                className="px-8 py-3 rounded-xl bg-card border border-[var(--border)] hover:shadow-glow transition-all duration-200 font-medium"
              >
                更多播客
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
