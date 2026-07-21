'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, Music } from 'lucide-react';
import WaveSurfer from 'wavesurfer.js';

interface LoomWaveformPlayerProps {
  audioUrl?: string;
  title?: string;
}

export const LoomWaveformPlayer: React.FC<LoomWaveformPlayerProps> = ({
  audioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  title = 'The Rhythm of Sualkuchi Pit Loom',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize WaveSurfer canvas instance
    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: 'rgba(201, 162, 39, 0.4)', // Muted gold
      progressColor: '#C9A227', // Bright gold
      cursorColor: '#6B1E28', // Oxblood
      barWidth: 2,
      barGap: 3,
      barRadius: 2,
      height: 48,
      normalize: true,
      url: audioUrl,
    });

    ws.on('ready', () => {
      setIsReady(true);
    });

    ws.on('play', () => setIsPlaying(true));
    ws.on('pause', () => setIsPlaying(false));
    ws.on('finish', () => setIsPlaying(false));

    wavesurfer.current = ws;

    return () => {
      ws.destroy();
    };
  }, [audioUrl]);

  const togglePlay = () => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
    }
  };

  return (
    <div className="bg-[var(--color-wine)] text-[var(--color-ivory)] border border-[var(--color-gold)]/40 rounded-[var(--radius-card)] p-6 shadow-fabric">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-[var(--color-gold)] bg-[var(--color-oxblood)] flex items-center justify-center text-[var(--color-gold)]">
            <Music className="w-5 h-5 stroke-[1.25]" />
          </div>
          <div>
            <h4 className="font-display font-semibold text-sm text-[var(--color-gold-light)] uppercase tracking-wider">
              Listen to the Loom
            </h4>
            <p className="text-xs text-[var(--color-ivory)]/75 font-editorial italic">
              {title}
            </p>
          </div>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          disabled={!isReady}
          className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-light)] text-[var(--color-wine)] rounded border border-[var(--color-gold-light)] hover:brightness-105 transition-all disabled:opacity-50 shrink-0 self-start sm:self-auto cursor-pointer"
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4 fill-current" />
              <span>Pause Loom Audio</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>{isReady ? 'Play Loom Rhythm' : 'Loading Waveform...'}</span>
            </>
          )}
        </button>
      </div>

      {/* Wavesurfer Canvas Mount */}
      <div className="relative pt-2">
        <div ref={containerRef} className="w-full" />
      </div>

      <div className="flex items-center justify-between text-[10px] text-[var(--color-gold-light)]/70 uppercase tracking-widest mt-2">
        <span>30s Authentic Acoustic Field Recording</span>
        <span className="flex items-center gap-1">
          <Volume2 className="w-3 h-3 text-[var(--color-gold)]" />
          Natural Village Loom Ambient Sound
        </span>
      </div>
    </div>
  );
};
