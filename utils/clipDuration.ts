/**
 * Calculate intelligent clip duration for key points
 * Based on captions, finds sentences that make sense for 15-300s clips
 */

interface Caption {
  start: number;
  end: number;
  zh: string;
  en: string;
  speaker?: number;
}

const MIN_DURATION = 15; // seconds
const MAX_DURATION = 300; // seconds
const SENTENCE_ENDINGS = ['。', '？', '！', '?', '!']; // Chinese and English sentence endings

/**
 * Calculate duration for a key point by finding natural break points in captions
 * @param startAt - Start time in seconds
 * @param captions - All episode captions
 * @returns Duration in seconds
 */
export function calculateClipDuration(
  startAt: number,
  captions: Caption[]
): number {
  // Find the caption that contains or is closest to startAt
  const startIndex = captions.findIndex(
    (cap) => cap.start <= startAt && cap.end >= startAt
  );

  if (startIndex === -1) {
    // If exact match not found, find closest caption after startAt
    const closestIndex = captions.findIndex((cap) => cap.start >= startAt);
    if (closestIndex === -1) return MIN_DURATION; // Fallback
    return calculateFromIndex(closestIndex, captions, startAt);
  }

  return calculateFromIndex(startIndex, captions, startAt);
}

function calculateFromIndex(
  startIndex: number,
  captions: Caption[],
  startTime: number
): number {
  let currentIndex = startIndex;
  let accumulatedDuration = 0;
  let lastGoodBreakDuration = MIN_DURATION;

  while (currentIndex < captions.length) {
    const caption = captions[currentIndex];
    const segmentEnd = caption.end;
    accumulatedDuration = segmentEnd - startTime;

    // If we've exceeded max duration, return the last good break point
    if (accumulatedDuration > MAX_DURATION) {
      return Math.min(lastGoodBreakDuration, MAX_DURATION);
    }

    // Check if this caption ends with a sentence-ending punctuation
    const zhText = caption.zh.trim();
    const endsWithPunctuation = SENTENCE_ENDINGS.some((ending) =>
      zhText.endsWith(ending)
    );

    // If we found a good break point and we're past minimum duration
    if (endsWithPunctuation && accumulatedDuration >= MIN_DURATION) {
      lastGoodBreakDuration = accumulatedDuration;

      // If we're in the sweet spot (30-120s), return this duration
      if (accumulatedDuration >= 30 && accumulatedDuration <= 120) {
        return Math.round(accumulatedDuration);
      }
    }

    currentIndex++;
  }

  // If we ran out of captions, return what we have
  return Math.max(
    MIN_DURATION,
    Math.min(lastGoodBreakDuration, MAX_DURATION)
  );
}

/**
 * Pre-calculate durations for all key points
 * @param keyPoints - Array of key points with startAt
 * @param captions - All episode captions
 * @returns Key points with calculated durations
 */
export function enrichKeyPointsWithDurations(
  keyPoints: Array<{
    title: string;
    summary?: string;
    highlights?: string[];
    startAt: number
  }>,
  captions: Caption[]
): Array<{
  title: string;
  summary?: string;
  highlights?: string[];
  startAt: number;
  duration: number;
}> {
  return keyPoints.map((point) => ({
    ...point,
    duration: calculateClipDuration(point.startAt, captions),
  }));
}
