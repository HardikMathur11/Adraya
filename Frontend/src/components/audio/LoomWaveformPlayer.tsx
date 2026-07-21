import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export const LoomWaveformPlayer: React.FC<{ audioUrl?: string; weaverName: string }> = ({
  audioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  weaverName,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: '#8A7A68',
      progressColor: '#C9A227',
      cursorColor: '#6B1E28',
      barWidth: 3,
      barGap: 2,
      barRadius: 2,
      height: 48,
      url: audioUrl,
    });

    ws.on('play', () => setIsPlaying(true));
    ws.on('pause', () => setIsPlaying(false));

    wavesurferRef.current = ws;

    return () => {
      ws.destroy();
    };
  }, [audioUrl]);

  const togglePlay = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
    }
  };

  const toggleMute = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.setMuted(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="bg-[#3F0F17] text-[#F7F1E6] border-2 border-[#C9A227] rounded-[6px] p-6 shadow-2xl space-y-4">
      <div className="flex items-center justify-between border-b border-[#C9A227]/30 pb-3">
        <div>
          <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#E8D8A8]">
            Audio Sonification Provenance
          </span>
          <h4 className="font-display font-bold text-base text-[#F7F1E6]">
            Listen to the Loom — {weaverName}'s Atelier
          </h4>
        </div>
        <span className="text-[10px] font-mono text-[#E8D8A8] bg-[#6B1E28] px-2 py-0.5 rounded border border-[#C9A227]/30">
          30s Pit Loom Rhythm
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-[#C9A227] text-[#3F0F17] flex items-center justify-center hover:bg-[#E8D8A8] transition-colors cursor-pointer shadow-md"
          aria-label={isPlaying ? 'Pause loom audio' : 'Play loom audio'}
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
        </button>

        <div className="flex-1" ref={containerRef} />

        <button onClick={toggleMute} className="p-2 text-[#E8D8A8] hover:text-[#C9A227] cursor-pointer">
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      <p className="font-editorial text-xs italic text-[#F7F1E6]/80 text-center">
        Captured live on {weaverName}'s pit loom. Listen to the distinct rhythmic click of wooden shuttles.
      </p>
    </div>
  );
};
