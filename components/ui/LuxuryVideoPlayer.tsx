'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RefreshCw, Radio } from 'lucide-react';
import { GoldLabel } from './GoldLabel';

interface LuxuryVideoPlayerProps {
  src?: string;
  poster?: string;
  title?: string;
  subtitle?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
  isLiveStreamTag?: boolean;
}

export const LuxuryVideoPlayer: React.FC<LuxuryVideoPlayerProps> = ({
  src = '/loom-artisan-video.mp4',
  poster,
  title = 'Real-Time Artisan Loom Weaving Stream',
  subtitle = 'Live feed directly from Master Weaver pit loom courtyard',
  autoPlay = true,
  loop = true,
  muted = true,
  className = '',
  isLiveStreamTag = true,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (videoRef.current && autoPlay) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [autoPlay]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(isNaN(pct) ? 0 : pct);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div
      className={`relative rounded-[var(--radius-card)] overflow-hidden border-2 border-[var(--color-gold)] bg-[var(--color-wine)] shadow-2xl group ${className}`}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop={loop}
        muted={isMuted}
        playsInline
        onTimeUpdate={handleTimeUpdate}
        className="w-full h-full object-cover"
      />

      {/* Top Header Tag Overlay */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        {isLiveStreamTag ? (
          <div className="flex items-center gap-2 px-3 py-1 bg-[var(--color-wine)]/90 text-[var(--color-gold-light)] rounded border border-[var(--color-gold)]/40 backdrop-blur-xs shadow-md">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest">
              LIVE LOOM BROADCAST
            </span>
          </div>
        ) : (
          <GoldLabel>{title}</GoldLabel>
        )}

        <span className="text-[10px] font-mono uppercase text-[var(--color-gold-light)] bg-black/50 px-2 py-1 rounded backdrop-blur-xs">
          4K HD • 60 FPS
        </span>
      </div>

      {/* Center Big Play Button Overlay on Hover/Pause */}
      <div
        onClick={togglePlay}
        className={`absolute inset-0 z-10 flex items-center justify-center bg-black/30 transition-opacity duration-300 cursor-pointer ${
          isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'
        }`}
      >
        <div className="w-16 h-16 rounded-full border-2 border-[var(--color-gold)] bg-[var(--color-wine)]/90 text-[var(--color-gold)] flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform">
          {isPlaying ? (
            <Pause className="w-7 h-7 fill-current" />
          ) : (
            <Play className="w-7 h-7 fill-current ml-1" />
          )}
        </div>
      </div>

      {/* Bottom Control Bar Overlay */}
      <div className="absolute bottom-0 inset-x-0 z-20 p-4 bg-gradient-to-t from-[var(--color-wine)] via-[var(--color-wine)]/80 to-transparent flex flex-col gap-2 opacity-95">
        
        {/* Progress Bar */}
        <div className="w-full h-1 bg-[var(--color-ivory)]/30 rounded-full overflow-hidden cursor-pointer">
          <div
            className="h-full bg-[var(--color-gold)] transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-[var(--color-ivory)] pt-1">
          <div>
            <h4 className="font-display font-semibold text-xs text-[var(--color-ivory)]">
              {title}
            </h4>
            <p className="text-[10px] text-[var(--color-gold-light)]/80 font-editorial italic">
              {subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleMute}
              className="p-1.5 text-[var(--color-gold-light)] hover:text-[var(--color-gold)] transition-colors"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={handleFullscreen}
              className="p-1.5 text-[var(--color-gold-light)] hover:text-[var(--color-gold)] transition-colors"
              aria-label="Full screen video"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
