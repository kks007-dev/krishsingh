'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Header from '@/components/header';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Film,
  FolderOpen,
  Volume2,
  VolumeX,
  Clock,
  Music2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type PlayMode = 'preview' | 'full';

const PREVIEW_DURATION = 9000;


const mainVideos = [
  {
    src: '/videos/robotics.mp4',
    title: 'Robotics Build',
    description: 'Engineering precision robotics systems and autonomous mechanisms for competition.',
    category: 'Engineering',
    accent: 'hsl(220 90% 60%)',
    previewStartTime: 0,
  },
  {
    src: '/videos/mit-makerspace.mp4',
    title: 'MIT MakerSpace Innovation',
    description: "Building and creating at a world-class MakerSpace facility.",
    category: 'Making',
    accent: 'hsl(260 100% 60%)',
    previewStartTime: 10,
  },
  {
    src: '/videos/passion-projects.mp4',
    title: 'Passion Projects',
    description: 'Hands-on creation driven by curiosity, exploration, and passion.',
    category: 'Making',
    accent: 'hsl(260 100% 60%)',
    previewStartTime: 5,
  },
];

const danceVideos = [
  {
    src: '/videos/mit-dance-showcase.mp4',
    title: 'Dance Showcase',
    description: "Performing at an annual dance showcase — movement as expression.",
    category: 'Performance',
    accent: 'hsl(330 80% 60%)',
  },
  {
    src: '/videos/styles-of-dance.mp4',
    title: 'Styles of Dance',
    description: 'Exploring diverse dance styles and the art of physical storytelling.',
    category: 'Performance',
    accent: 'hsl(330 80% 60%)',
  },
];

const categoryColor: Record<string, string> = {
  Engineering: 'border-blue-400/50 text-blue-400 bg-blue-400/10',
  Making: 'border-purple-400/50 text-purple-400 bg-purple-400/10',
  Performance: 'border-pink-400/50 text-pink-400 bg-pink-400/10',
};

// ─────────────────────────────────────────────
// Shared player chrome – used by both carousels
// ─────────────────────────────────────────────
type VideoItem = {
  src: string;
  title: string;
  description: string;
  category: string;
  accent: string;
  previewStartTime?: number;
};

function VideoPlayer({
  videos,
  activeIndex,
  progress,
  isPlaying,
  isMuted,
  videoLoaded,
  videoRef,
  onPrev,
  onNext,
  onGoTo,
  onTogglePlay,
  onToggleMute,
  showPlayMode,
  playMode,
  onPlayModeChange,
}: {
  videos: VideoItem[];
  activeIndex: number;
  progress: number;
  isPlaying: boolean;
  isMuted: boolean;
  videoLoaded: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (i: number) => void;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  showPlayMode?: boolean;
  playMode?: PlayMode;
  onPlayModeChange?: (m: PlayMode) => void;
}) {
  const activeVideo = videos[activeIndex];

  return (
    <div>
      {/* Mode toggle row */}
      {showPlayMode && onPlayModeChange && (
        <div className="flex items-center justify-end mb-3">
          <div className="flex items-center gap-1 glass-card px-1 py-1 rounded-xl border border-white/10">
            <button
              onClick={() => onPlayModeChange('preview')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200',
                playMode === 'preview'
                  ? 'bg-accent/20 text-accent border border-accent/30'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Clock className="w-3 h-3" />
              9s Preview
            </button>
            <button
              onClick={() => onPlayModeChange('full')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200',
                playMode === 'full'
                  ? 'bg-accent/20 text-accent border border-accent/30'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Film className="w-3 h-3" />
              Full Play
            </button>
          </div>
        </div>
      )}

      {/* Main player */}
      <div
        className="relative glass-card overflow-hidden mb-3"
        style={{
          boxShadow: `0 0 0 1px ${activeVideo.accent}30, 0 0 60px ${activeVideo.accent}20, 0 25px 60px rgba(0,0,0,0.6)`,
          transition: 'box-shadow 0.6s ease',
        }}
      >
        {/* Scanline */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)',
          }}
        />

        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 z-30 h-0.5 bg-white/10">
          <div
            className="h-full"
            style={{
              width: `${progress * 100}%`,
              backgroundColor: activeVideo.accent,
              transition: 'width 0.05s linear',
            }}
          />
        </div>

        {/* Video */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full aspect-video bg-black"
          >
            {!videoLoaded && (
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-7 h-7 rounded-full border-2 border-accent border-t-transparent animate-spin" />
              </div>
            )}
            <video
              ref={videoRef}
              key={activeVideo.src}
              className="w-full h-full object-cover"
              src={activeVideo.src}
              muted={isMuted}
              playsInline
              preload="auto"
            />
          </motion.div>
        </AnimatePresence>

        {/* Caption overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 z-20 px-5 py-4 sm:px-7 sm:py-5"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
          }}
        >
          <div className="flex items-end justify-between gap-4">
            <div className="flex-1 min-w-0">
              <Badge
                variant="outline"
                className={cn(
                  'mb-2 text-xs font-mono',
                  categoryColor[activeVideo.category] ?? 'border-white/30 text-white/70'
                )}
              >
                {activeVideo.category}
              </Badge>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="font-headline text-xl sm:text-2xl font-bold text-white leading-tight">
                    {activeVideo.title}
                  </h2>
                  <p className="text-white/65 text-xs sm:text-sm mt-1 line-clamp-1 hidden sm:block">
                    {activeVideo.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-white/40 text-xs font-mono tabular-nums">
                {activeIndex + 1}/{videos.length}
              </span>
              <button
                onClick={onToggleMute}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center transition-all"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5 text-white" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-white" />
                )}
              </button>
              <button
                onClick={onTogglePlay}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center transition-all"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5 text-white" />
                ) : (
                  <Play className="w-3.5 h-3.5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={onPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 border border-white/10 flex items-center justify-center transition-all hover:scale-110"
          aria-label="Previous video"
        >
          <ChevronLeft className="w-4 h-4 text-white" />
        </button>
        <button
          onClick={onNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 border border-white/10 flex items-center justify-center transition-all hover:scale-110"
          aria-label="Next video"
        >
          <ChevronRight className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {videos.map((video, i) => (
          <button
            key={i}
            onClick={() => onGoTo(i)}
            className={cn(
              'relative flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200',
              videos.length === 2
                ? 'w-[calc(50%-4px)]'
                : 'w-[calc(33.333%-6px)] min-w-[90px]',
              'aspect-video',
              i === activeIndex
                ? 'opacity-100'
                : 'border-white/10 opacity-50 hover:opacity-80 hover:border-white/25'
            )}
            style={
              i === activeIndex
                ? { borderColor: video.accent, boxShadow: `0 0 16px ${video.accent}40` }
                : {}
            }
            aria-label={`Play ${video.title}`}
          >
            <video
              className="w-full h-full object-cover"
              src={video.src}
              muted
              preload="metadata"
            />
            <div
              className={cn(
                'absolute inset-0 transition-opacity',
                i === activeIndex ? 'bg-black/10' : 'bg-black/40'
              )}
            />
            {i === activeIndex && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20">
                <div
                  className="h-full"
                  style={{
                    width: `${progress * 100}%`,
                    backgroundColor: video.accent,
                    transition: 'width 0.05s linear',
                  }}
                />
              </div>
            )}
            <div className="absolute bottom-1 left-1 right-1">
              <p className="text-white text-[8px] sm:text-[9px] font-medium leading-tight px-0.5 truncate drop-shadow">
                {video.title}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main carousel (preview vs full-play toggle)
// ─────────────────────────────────────────────
function MainCarousel({ playMode, onPlayModeChange }: { playMode: PlayMode; onPlayModeChange: (m: PlayMode) => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Ref-based play intent: avoids stale closure when isPlaying doesn't
  // change between auto-advances (video ends while isPlaying is already true)
  const playIntentRef = useRef(true);

  const goTo = useCallback((index: number) => {
    playIntentRef.current = true;
    setActiveIndex(index);
    setIsPlaying(true);
    setProgress(0);
    setVideoLoaded(false);
  }, []);

  const next = useCallback(() => goTo((activeIndex + 1) % mainVideos.length), [activeIndex, goTo]);
  const prev = useCallback(() => goTo((activeIndex - 1 + mainVideos.length) % mainVideos.length), [activeIndex, goTo]);

  // Preview mode: 9-second countdown
  useEffect(() => {
    if (playMode !== 'preview') return;
    setProgress(0);
    if (!isPlaying) return;
    const start = Date.now();
    const id = setInterval(() => {
      const p = (Date.now() - start) / PREVIEW_DURATION;
      if (p >= 1) { clearInterval(id); next(); }
      else setProgress(p);
    }, 50);
    return () => clearInterval(id);
  }, [activeIndex, isPlaying, playMode, next]);

  // Full-play mode: real-time progress + advance on end
  useEffect(() => {
    if (playMode !== 'full') return;
    const vid = videoRef.current;
    if (!vid) return;
    const onTime = () => { if (vid.duration) setProgress(vid.currentTime / vid.duration); };
    const onEnd = () => next();
    vid.addEventListener('timeupdate', onTime);
    vid.addEventListener('ended', onEnd);
    return () => { vid.removeEventListener('timeupdate', onTime); vid.removeEventListener('ended', onEnd); };
  }, [activeIndex, playMode, next]);

  // Reset progress on mode switch
  useEffect(() => { setProgress(0); }, [playMode]);

  // Video loading — runs on activeIndex/playMode change.
  // Calls vid.play() immediately after vid.load() so the browser queues
  // and fulfills the request once buffered — avoids event-listener timing
  // issues with preloaded/cached videos where loadeddata can be unreliable.
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    setVideoLoaded(false);

    const video = mainVideos[activeIndex];
    const seekTo = playMode === 'preview' ? (video.previewStartTime ?? 0) : 0;
    vid.loop = playMode === 'preview';
    vid.muted = isMuted;
    vid.load();

    if (seekTo > 0) {
      // Need metadata before we can seek, then play
      const onMeta = () => {
        vid.currentTime = seekTo;
        setVideoLoaded(true);
        if (playIntentRef.current) vid.play().catch(() => {});
      };
      vid.addEventListener('loadedmetadata', onMeta, { once: true });
      return () => vid.removeEventListener('loadedmetadata', onMeta);
    }

    // No seek needed — call play() immediately; browser fulfills once buffered
    if (playIntentRef.current) vid.play().catch(() => {});
    const onData = () => setVideoLoaded(true);
    vid.addEventListener('loadeddata', onData, { once: true });
    return () => vid.removeEventListener('loadeddata', onData);
  }, [activeIndex, playMode]);

  // Play/pause from user toggle
  useEffect(() => {
    playIntentRef.current = isPlaying;
    const vid = videoRef.current;
    if (!vid) return;
    if (isPlaying) vid.play().catch(() => {});
    else vid.pause();
  }, [isPlaying]);

  useEffect(() => { if (videoRef.current) videoRef.current.muted = isMuted; }, [isMuted]);

  return (
    <VideoPlayer
      videos={mainVideos}
      activeIndex={activeIndex}
      progress={progress}
      isPlaying={isPlaying}
      isMuted={isMuted}
      videoLoaded={videoLoaded}
      videoRef={videoRef}
      onPrev={prev}
      onNext={next}
      onGoTo={goTo}
      onTogglePlay={() => setIsPlaying(p => !p)}
      onToggleMute={() => setIsMuted(m => !m)}
      showPlayMode
      playMode={playMode}
      onPlayModeChange={onPlayModeChange}
    />
  );
}

// ─────────────────────────────────────────────
// Dance carousel — on-demand only
// ─────────────────────────────────────────────
function DanceCarousel() {
  const [hasStarted, setHasStarted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
    setProgress(0);
    setVideoLoaded(false);
    if (hasStarted) setIsPlaying(true);
  }, [hasStarted]);

  const next = useCallback(() => goTo((activeIndex + 1) % danceVideos.length), [activeIndex, goTo]);
  const prev = useCallback(() => goTo((activeIndex - 1 + danceVideos.length) % danceVideos.length), [activeIndex, goTo]);

  // Real video progress
  useEffect(() => {
    if (!hasStarted) return;
    const vid = videoRef.current;
    if (!vid) return;
    const onTime = () => { if (vid.duration) setProgress(vid.currentTime / vid.duration); };
    vid.addEventListener('timeupdate', onTime);
    return () => vid.removeEventListener('timeupdate', onTime);
  }, [activeIndex, hasStarted]);

  // Video loading
  useEffect(() => {
    if (!hasStarted) return;
    const vid = videoRef.current;
    if (!vid) return;
    vid.loop = true;
    vid.load();
    vid.muted = isMuted;
    const onLoaded = () => { setVideoLoaded(true); vid.play().catch(() => { }); };
    vid.addEventListener('loadeddata', onLoaded);
    return () => vid.removeEventListener('loadeddata', onLoaded);
  }, [activeIndex, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    const vid = videoRef.current;
    if (!vid) return;
    if (isPlaying) vid.play().catch(() => { });
    else vid.pause();
  }, [isPlaying, hasStarted]);

  useEffect(() => { if (videoRef.current) videoRef.current.muted = isMuted; }, [isMuted]);

  const handleStart = () => {
    setHasStarted(true);
    setIsPlaying(true);
  };

  const activeVideo = danceVideos[activeIndex];

  return (
    <section className="px-4 pb-20">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Music2 className="w-6 h-6 text-pink-400" />
              <h2 className="font-headline text-4xl font-bold" style={{ textShadow: '0 0 8px hsl(330 80% 60% / 0.5), 0 0 20px hsl(330 80% 60% / 0.3)' }}>
                On Stage
              </h2>
            </div>
            <p className="text-muted-foreground text-sm max-w-sm">
              Dance performances — press play to watch.
            </p>
          </div>

          {/* Player shell */}
          {!hasStarted ? (
            /* ── Pre-play state ── */
            <div
              className="relative glass-card overflow-hidden"
              style={{ boxShadow: '0 0 0 1px hsl(330 80% 60% / 0.2), 0 0 60px hsl(330 80% 60% / 0.1)' }}
            >
              <div className="aspect-video bg-black/60 flex flex-col items-center justify-center gap-6 relative">
                {/* Subtle thumbnail from first dance video */}
                <video
                  className="absolute inset-0 w-full h-full object-cover opacity-20"
                  src={danceVideos[0].src}
                  muted
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

                {/* Play button */}
                <button
                  onClick={handleStart}
                  className="relative z-10 flex flex-col items-center gap-3 group"
                  aria-label="Play dance videos"
                >
                  <div
                    className="w-20 h-20 rounded-full border-2 border-pink-400/60 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-pink-400"
                    style={{ background: 'radial-gradient(circle, hsl(330 80% 60% / 0.25) 0%, transparent 70%)' }}
                  >
                    <Play className="w-8 h-8 text-pink-300 ml-1" fill="currentColor" />
                  </div>
                  <span className="text-sm font-medium text-pink-300/80 font-mono tracking-wider uppercase">
                    Play Performances
                  </span>
                </button>

                {/* Track list preview */}
                <div className="relative z-10 flex gap-3">
                  {danceVideos.map((v, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                      <Music2 className="w-3 h-3 text-pink-400/70" />
                      <span className="text-white/60 text-xs">{v.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <VideoPlayer
              videos={danceVideos}
              activeIndex={activeIndex}
              progress={progress}
              isPlaying={isPlaying}
              isMuted={isMuted}
              videoLoaded={videoLoaded}
              videoRef={videoRef}
              onPrev={prev}
              onNext={next}
              onGoTo={goTo}
              onTogglePlay={() => setIsPlaying(p => !p)}
              onToggleMute={() => setIsMuted(m => !m)}
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────
export default function InActionPage() {
  const [playMode, setPlayMode] = useState<PlayMode>('preview');

  return (
    <div className="flex flex-col min-h-dvh">
      {/* Preload all main videos for instant switching */}
      <div className="hidden" aria-hidden>
        {mainVideos.map(v => (
          <video key={v.src} src={v.src} preload="auto" muted playsInline />
        ))}
      </div>

      <Header />
      <main className="flex-1">

        {/* ── Hero ── */}
        <section className="pt-14 pb-8 px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="container max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-5">
              <Film className="w-7 h-7 text-accent" />
              <Badge
                variant="outline"
                className="border-accent/40 text-accent bg-accent/10 tracking-wider text-xs px-3 py-1 font-mono uppercase"
              >
                Live Reel
              </Badge>
            </div>
            <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-glow">
              In Action
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Projects, performances, and passion — captured in motion.
            </p>
          </motion.div>
        </section>

        {/* ── Main Carousel ── */}
        <section className="px-4 pb-12">
          <div className="container max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <MainCarousel playMode={playMode} onPlayModeChange={setPlayMode} />
            </motion.div>
          </div>
        </section>

        {/* ── Google Drive Archive ── */}
        <section className="px-4 pb-12">
          <div className="container max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              viewport={{ once: true, margin: '-60px' }}
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <FolderOpen className="w-6 h-6 text-secondary" />
                  <h2 className="font-headline text-4xl font-bold text-glow">The Archive</h2>
                </div>
                <p className="text-muted-foreground text-sm max-w-sm">
                  Photos, PDFs, and portfolio materials — coming soon.
                </p>
              </div>

              <div
                className="glass-card overflow-hidden"
                style={{ boxShadow: '0 0 40px hsl(260 100% 60% / 0.1), 0 25px 50px rgba(0,0,0,0.5)' }}
              >
                {/* Browser chrome bar */}
                <div className="flex items-center px-4 py-3 border-b border-white/10 bg-black/20">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 rounded-md px-3 py-1 ml-3">
                    <span className="text-muted-foreground text-xs font-mono">
                      portfolio / archive
                    </span>
                  </div>
                </div>

                {/* Coming soon body */}
                <div className="flex flex-col items-center justify-center gap-4 bg-black/20" style={{ height: '520px' }}>
                  <div className="w-16 h-16 rounded-2xl border border-secondary/30 flex items-center justify-center bg-secondary/5">
                    <FolderOpen className="w-7 h-7 text-secondary/60" />
                  </div>
                  <div className="text-center">
                    <p className="font-headline text-2xl font-bold text-glow mb-1">Coming Soon</p>
                    <p className="text-muted-foreground text-sm">Portfolio PDFs, photography, and project documentation.</p>
                  </div>
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map(i => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-secondary/40"
                        style={{ animation: `pulse 1.5s ease-in-out ${i * 0.3}s infinite` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="px-5 py-3 border-t border-white/10 bg-black/10">
                  <p className="text-muted-foreground text-xs">
                    Includes portfolio PDFs, photography, and project documentation.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Dance Section ── */}
        <DanceCarousel />

      </main>
    </div>
  );
}
