'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

export interface Caption {
  start: number;
  end: number;
  zh?: string;
  en?: string;
}

interface TranscriptPanelProps {
  captions: Caption[];
  langMode: 'zh' | 'en' | 'dual';
  currentTime: number;
  onSeek: (sec: number) => void;
  onAutoScrollChange?: (enabled: boolean) => void;
  autoScrollEnabled?: boolean;
}

export default function TranscriptPanel({
  captions,
  langMode,
  currentTime,
  onSeek,
  onAutoScrollChange,
  autoScrollEnabled = false,
}: TranscriptPanelProps) {
  const [mode, setMode] = useState<'zh' | 'en' | 'dual'>(langMode);
  const [autoScroll, setAutoScroll] = useState(false);
  const activeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const justSeekedRef = useRef(false); // 标记是否刚完成跳转
  const prevAutoScrollEnabledRef = useRef(autoScrollEnabled);

  // 立即滚动到指定时间的字幕位置
  const scrollToCaption = useCallback((time: number) => {
    if (!containerRef.current) return;

    // 找到对应时间的字幕
    const targetCaption = captions.find(
      (c) => time >= c.start && time < c.end
    );

    if (!targetCaption) {
      console.log('⚠️ No caption found for time:', time);
      return;
    }

    const targetIndex = captions.indexOf(targetCaption);
    const container = containerRef.current;

    // 使用 requestAnimationFrame 确保 DOM 已更新
    requestAnimationFrame(() => {
      const captionElements = container.querySelectorAll('[data-caption-index]');
      const targetElement = captionElements[targetIndex] as HTMLElement;

      if (targetElement) {
        const containerRect = container.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();
        const relativeTop = targetRect.top - containerRect.top + container.scrollTop;
        const targetHeight = targetRect.height;
        const containerHeight = containerRect.height;
        const targetScrollTop = relativeTop - (containerHeight / 2) + (targetHeight / 2);

        console.log('🎯 Immediate scroll to:', {
          time,
          targetIndex,
          captionText: targetCaption.zh?.substring(0, 30),
          targetScrollTop,
          relativeTop,
          containerHeight
        });

        container.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth',
        });
      } else {
        console.log('⚠️ Target element not found for index:', targetIndex);
      }
    });
  }, [captions]);

  // Sync with parent's autoScroll state
  useEffect(() => {
    const prevAutoScrollEnabled = prevAutoScrollEnabledRef.current;
    prevAutoScrollEnabledRef.current = autoScrollEnabled;

    setAutoScroll(autoScrollEnabled);

    // 只在 autoScrollEnabled 从 false 变为 true 时立即滚动（即刚触发跳转时）
    if (autoScrollEnabled && !prevAutoScrollEnabled) {
      console.log('🚀 Triggered by seek, scrolling to:', currentTime);
      justSeekedRef.current = true;
      scrollToCaption(currentTime);

      // 500ms 后清除标记，允许正常的自动滚动
      setTimeout(() => {
        justSeekedRef.current = false;
      }, 500);
    }
  }, [autoScrollEnabled, currentTime, scrollToCaption]);

  useEffect(() => {
    // 如果刚完成跳转，跳过自动滚动避免干扰
    if (justSeekedRef.current) {
      console.log('⏸️ Skipping auto-scroll (just seeked)');
      return;
    }

    // 清除之前的滚动定时器
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // 使用 requestAnimationFrame 确保DOM已更新
    scrollTimeoutRef.current = setTimeout(() => {
      if (autoScroll && activeRef.current && containerRef.current) {
        const container = containerRef.current;
        const active = activeRef.current;

        // 使用 getBoundingClientRect 获取准确位置
        const containerRect = container.getBoundingClientRect();
        const activeRect = active.getBoundingClientRect();

        // 计算活动字幕相对于容器顶部的位置
        const relativeTop = activeRect.top - containerRect.top + container.scrollTop;
        const activeHeight = activeRect.height;
        const containerHeight = containerRect.height;

        // 将活动字幕滚动到容器中心
        const targetScrollTop = relativeTop - (containerHeight / 2) + (activeHeight / 2);

        console.log('📜 Auto-scroll:', {
          currentTime,
          relativeTop,
          targetScrollTop,
          containerHeight
        });

        container.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth',
        });
      }
    }, 50); // 50ms 防抖

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [currentTime, autoScroll]);

  const handleCaptionClick = (sec: number) => {
    console.log('🖱️ Caption clicked, seeking to:', sec);

    // 设置标记防止自动滚动干扰
    justSeekedRef.current = true;

    // 先滚动到目标位置
    scrollToCaption(sec);

    // 然后跳转音频
    onSeek(sec);

    // 临时启用自动滚动以便后续播放时继续跟随
    const newState = true;
    setAutoScroll(newState);
    onAutoScrollChange?.(newState);

    // 500ms 后清除跳转标记
    setTimeout(() => {
      justSeekedRef.current = false;
    }, 500);

    // 1.5秒后关闭自动滚动
    setTimeout(() => {
      setAutoScroll(false);
      onAutoScrollChange?.(false);
    }, 1500);
  };

  return (
    <div className="rounded-xl border border-[var(--border)] bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">字幕</h3>
        <div className="flex gap-3">
          <button
            onClick={() => {
              const newState = !autoScroll;
              setAutoScroll(newState);
              onAutoScrollChange?.(newState);
            }}
            className={`px-3 py-1 text-xs rounded transition-all ${
              autoScroll
                ? 'bg-[var(--accent-from)] text-black'
                : 'border border-[var(--border)] hover:bg-card/50'
            }`}
            title={autoScroll ? '关闭自动滚动' : '开启自动滚动'}
          >
            {autoScroll ? '🔒 自动滚动' : '🔓 手动浏览'}
          </button>
          <div className="flex gap-2">
            {(['zh', 'en', 'dual'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1 text-xs rounded transition-all ${
                  mode === m
                    ? 'bg-[var(--accent-from)] text-black'
                    : 'border border-[var(--border)] hover:bg-card/50'
                }`}
              >
                {m === 'zh' ? '中文' : m === 'en' ? '英文' : '对照'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div ref={containerRef} className="max-h-96 overflow-y-auto space-y-2">
        {captions.map((caption, index) => {
          const isActive =
            currentTime >= caption.start && currentTime < caption.end;

          return (
            <div
              key={index}
              ref={isActive ? activeRef : null}
              data-caption-index={index}
              onClick={() => handleCaptionClick(caption.start)}
              className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                isActive
                  ? 'bg-card/80 border-l-2 border-[var(--accent-from)]'
                  : 'hover:bg-card/50'
              }`}
            >
              {mode === 'zh' && caption.zh && (
                <p className="text-sm leading-relaxed">{caption.zh}</p>
              )}
              {mode === 'en' && caption.en && (
                <p className="text-sm leading-relaxed text-muted">
                  {caption.en}
                </p>
              )}
              {mode === 'dual' && (
                <>
                  {caption.zh && (
                    <p className="text-sm leading-relaxed mb-1">
                      {caption.zh}
                    </p>
                  )}
                  {caption.en && (
                    <p className="text-xs leading-relaxed text-muted">
                      {caption.en}
                    </p>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
