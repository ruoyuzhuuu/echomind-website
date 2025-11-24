'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EpisodeHeader from '@/components/EpisodeHeader';
import AudioPlayer from '@/components/AudioPlayer';
import TranscriptPanel from '@/components/TranscriptPanel';
import ChaptersNav from '@/components/ChaptersNav';
import GuestCard from '@/components/GuestCard';
import SummaryBlock from '@/components/SummaryBlock';
import KeyPointCard from '@/components/KeyPointCard';
import ResourceItem from '@/components/ResourceItem';
import { motion } from 'framer-motion';
import { enrichKeyPointsWithDurations } from '@/utils/clipDuration';

export default function EpisodePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [currentTime, setCurrentTime] = useState(0);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(false);

  // Dynamically load episode data based on ID
  const episodeId = params.id as string;
  let episodeData;
  try {
    episodeData = require(`@/data/episodes/${episodeId}.json`);
  } catch (error) {
    console.error(`Failed to load episode data for ${episodeId}:`, error);
    // Fallback to Huberman episode if not found
    episodeData = require('@/data/episodes/huberman-immune-system.json');
  }

  // Calculate durations for key points
  const enrichedKeyPoints = useMemo(
    () => episodeData.keyPoints ? enrichKeyPointsWithDurations(episodeData.keyPoints, episodeData.captions) : [],
    [episodeData]
  );

  const handleSeek = (sec: number) => {
    if (audioElement) {
      audioElement.currentTime = sec;
      // Auto-play after seeking
      audioElement.play().catch((error) => {
        console.log('Auto-play prevented:', error);
      });
    }
  };

  const handleSeekStart = () => {
    setAutoScrollEnabled(true);
    // 1.5秒后自动关闭，避免持续干扰
    setTimeout(() => {
      setAutoScrollEnabled(false);
    }, 1500);
  };

  const handleScrollToPlayer = () => {
    // Scroll to the player section
    const playerElement = document.getElementById('audio-player-section');
    if (playerElement) {
      playerElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Enable auto-scroll for transcript
      handleSeekStart();
    }
  };

  // Handle URL start parameter for highlight navigation
  useEffect(() => {
    const startParam = searchParams.get('start');
    if (startParam && audioElement) {
      const startTime = parseFloat(startParam);
      if (!isNaN(startTime)) {
        // Wait a bit for the page to settle
        setTimeout(() => {
          handleSeek(startTime);
          handleScrollToPlayer();
        }, 500);
      }
    }
  }, [audioElement, searchParams]);

  return (
    <>
      <Head>
        <title>{episodeData.titleCn} - EchoMind 回声思维</title>
        <meta name="description" content={episodeData.summary?.zh || episodeData.titleEn} />
        <meta property="og:title" content={episodeData.titleCn} />
        <meta property="og:description" content={episodeData.summary?.zh || episodeData.titleEn} />
        <meta property="og:image" content={episodeData.cover} />
        <meta property="og:type" content="article" />
      </Head>
      <div className="min-h-screen">
        <Header />

      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-[1200px] px-4">
          {/* Episode Header */}
          <EpisodeHeader
            titleCn={episodeData.titleCn}
            titleEn={episodeData.titleEn}
            originalUrl={episodeData.originalUrl}
            date={episodeData.date}
            duration={episodeData.duration}
            tags={episodeData.tags}
            cover={episodeData.cover}
            coverImage={episodeData.coverImage}
          />

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Player & Transcript */}
            <div id="audio-player-section" className="lg:col-span-2 space-y-6">
              <AudioPlayer
                src={episodeData.audioUrl}
                chapters={episodeData.chapters}
                onTimeUpdate={setCurrentTime}
                onAudioRef={setAudioElement}
                onSeekStart={handleSeekStart}
              />

              <TranscriptPanel
                captions={episodeData.captions}
                langMode="zh"
                currentTime={currentTime}
                onSeek={handleSeek}
                autoScrollEnabled={autoScrollEnabled}
                onAutoScrollChange={setAutoScrollEnabled}
              />
            </div>

            {/* Right Column - Chapters & Info */}
            <div className="space-y-6">
              <ChaptersNav
                chapters={episodeData.chapters}
                onJump={handleSeek}
                onSeekStart={handleSeekStart}
              />

              {episodeData.guest && (
                <GuestCard
                  name={episodeData.guest.name}
                  title={episodeData.guest.title}
                  bio={episodeData.guest.bio}
                />
              )}

              {episodeData.guests && episodeData.guests.length > 0 && (
                <div className="rounded-xl border border-[var(--border)] bg-card p-6">
                  <h3 className="text-lg font-semibold mb-4">本期嘉宾</h3>
                  <div className="space-y-4">
                    {episodeData.guests.map((guest: any, index: number) => (
                      <div key={index} className={index > 0 ? 'pt-4 border-t border-[var(--border)]' : ''}>
                        <div className="flex items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-lg">{guest.name}</h4>
                              {guest.twitter && (
                                <a
                                  href={guest.twitter}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-muted hover:text-[var(--primary)] transition-colors"
                                  aria-label={`${guest.name} on Twitter`}
                                >
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                  </svg>
                                </a>
                              )}
                            </div>
                            {guest.role && <p className="text-sm text-muted mb-2">{guest.role}</p>}
                            {guest.bio && <p className="text-sm text-muted leading-relaxed">{guest.bio}</p>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Summary */}
          {episodeData.summary && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <SummaryBlock
                zh={episodeData.summary.zh}
                en={episodeData.summary.en}
              />
            </motion.div>
          )}

          {/* Key Points */}
          {enrichedKeyPoints.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <h3 className="text-2xl font-bold mb-6">精彩要点</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {enrichedKeyPoints.map((point, index) => (
                  <KeyPointCard
                    key={index}
                    title={point.title}
                    summary={point.summary}
                    highlights={point.highlights}
                    startAt={point.startAt}
                    duration={point.duration}
                    audioElement={audioElement}
                    onJump={handleSeek}
                    onScrollToPlayer={handleScrollToPlayer}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Highlights - Hidden temporarily as it's redundant with Key Points */}
          {/* {episodeData.highlights && episodeData.highlights.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <h3 className="text-2xl font-bold mb-6">高光片段</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {episodeData.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    onClick={() => handleSeek(highlight.startAt)}
                    className="rounded-xl border border-[var(--border)] bg-card p-5 cursor-pointer hover:shadow-glow transition-all duration-200"
                  >
                    <div className="text-xs text-muted mb-2">{highlight.time}</div>
                    <h4 className="font-semibold mb-2">{highlight.title}</h4>
                    <p className="text-sm text-muted line-clamp-2">{highlight.zh}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )} */}

          {/* Resources */}
          {episodeData.resources && episodeData.resources.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <h3 className="text-2xl font-bold mb-6">延伸阅读</h3>
              <div className="space-y-3">
                {episodeData.resources.map((resource: any, index: number) => (
                  <ResourceItem
                    key={index}
                    title={resource.title}
                    url={resource.url}
                    source={resource.source}
                    kind={resource.kind as any}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
      </div>
    </>
  );
}
