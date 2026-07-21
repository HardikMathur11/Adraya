import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Radio } from 'lucide-react';

export const LuxuryVideoPlayer: React.FC<{
  src?: string;
  title?: string;
  isLiveStreamTag?: boolean;
}> = ({
  src = '/assets/loom-artisan-video.mp4',
  title = 'Pit Loom Live Feed',
  isLiveStreamTag = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative rounded-[6px] overflow-hidden border-2 border-[#C9A227] bg-[#0A0808] shadow-2xl group">
      {/* Black shade video overlay container */}
      <div className="relative w-full h-[380px] bg-black">
        <video
          ref={videoRef}
          src={src}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60 pointer-events-none" />
      </div>

      {/* Live Broadcast Header Badge */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        {isLiveStreamTag ? (
          <div className="flex items-center gap-2 px-3 py-1 bg-black/90 text-[#E8D8A8] rounded border border-[#C9A227]/40 shadow-md">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest">LIVE LOOM BROADCAST</span>
          </div>
        ) : (
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#E8D8A8] bg-black/90 px-2.5 py-0.5 rounded border border-[#C9A227]/30">
            {title}
          </span>
        )}

        <span className="text-[10px] font-mono uppercase text-[#E8D8A8] bg-black/80 px-2 py-1 rounded border border-[#C9A227]/30">
          4K HD • 60 FPS
        </span>
      </div>

      {/* Control Buttons */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
        <button
          onClick={togglePlay}
          className="p-2 bg-black/85 text-[#F7F1E6] rounded-full border border-[#C9A227]/40 hover:text-[#C9A227] hover:bg-black cursor-pointer shadow-lg"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button
          onClick={toggleMute}
          className="p-2 bg-black/85 text-[#F7F1E6] rounded-full border border-[#C9A227]/40 hover:text-[#C9A227] hover:bg-black cursor-pointer shadow-lg"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
