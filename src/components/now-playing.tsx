
import { useState, useEffect, useRef } from "react";
import { usePlayer } from "@/contexts/PlayerContext";
import { cn } from "@/lib/utils";
import { 
  Play, Pause, SkipBack, SkipForward, 
  Repeat, Repeat1, Shuffle, Volume2, VolumeX, 
  Heart, Share, MoreHorizontal, ListMusic 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { extractDominantColor, withOpacity } from "@/utils/colorUtils";

// Helper function to format time
const formatTime = (time: number): string => {
  if (isNaN(time)) return "0:00";
  
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

interface NowPlayingProps {
  dominantColor?: string;
}

const NowPlaying = ({ dominantColor }: NowPlayingProps) => {
  const { 
    currentSong, 
    isPlaying, 
    togglePlayPause, 
    nextSong, 
    previousSong,
  } = usePlayer();
  
  // Add these state variables since they're not available in the PlayerContext
  const [loopMode, setLoopMode] = useState<"none" | "all" | "one">("none");
  const [shuffleMode, setShuffleMode] = useState(false);
  
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [lastVolume, setLastVolume] = useState(0.8);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  
  // Add toggle functions
  const toggleLoopMode = () => {
    setLoopMode(current => {
      if (current === "none") return "all";
      if (current === "all") return "one";
      return "none";
    });
  };
  
  const toggleShuffleMode = () => {
    setShuffleMode(current => !current);
  };
  
  // Update audio source when song changes
  useEffect(() => {
    if (currentSong?.audioUrl) {
      const audio = audioRef.current;
      if (audio) {
        audio.src = currentSong.audioUrl;
        audio.load();
        if (isPlaying) audio.play();
      }
      setImageLoaded(false);
    }
  }, [currentSong, isPlaying]);
  
  // Control playback based on isPlaying state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isPlaying) {
      audio.play().catch(err => {
        console.error("Error playing audio:", err);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);
  
  // Update time
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };
    
    const updateDuration = () => {
      setDuration(audio.duration);
    };
    
    const handleEnd = () => {
      if (loopMode === "one") {
        audio.currentTime = 0;
        audio.play();
      } else {
        nextSong();
      }
    };
    
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnd);
    
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnd);
    };
  }, [loopMode, nextSong]);
  
  // Update volume
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);
  
  // Handle seeking on the progress bar
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = progressRef.current;
    if (!progressBar || !audioRef.current || !currentSong) return;
    
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  // Handle volume change
  const handleVolumeChange = (newVol: number[]) => {
    setVolume(newVol[0]);
    if (isMuted) setIsMuted(false);
  };
  
  // Toggle mute
  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setVolume(lastVolume);
    } else {
      setLastVolume(volume);
      setIsMuted(true);
    }
  };
  
  // Handle like
  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  // Dynamic background style with the dominant color
  const bgStyle = dominantColor ? {
    background: `linear-gradient(to bottom, ${withOpacity(dominantColor, 0.8)} 0%, ${withOpacity('#0C120C', 0.98)} 100%)`,
    backdropFilter: "blur(20px)",
  } : {
    background: "#0C120C",
    backdropFilter: "blur(20px)",
  };
  
  if (!currentSong) return null;

  return (
    <div 
      className="fixed bottom-0 w-full border-t border-white/5 z-20 transition-all duration-500 pb-0"
      style={bgStyle}
    >
      <div className="mx-auto transition-all duration-300">
        <div className="flex items-center px-4 py-3">
          {/* Song Info */}
          <div className="flex items-center w-1/4">
            <div className="mr-3 relative group">
              <img
                src={currentSong.imageUrl}
                alt={currentSong.title}
                className={cn(
                  "w-12 h-12 rounded-md object-cover transition-all duration-500",
                  !imageLoaded && "animate-pulse bg-chord-red/30"
                )}
                onLoad={() => setImageLoaded(true)}
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-md transition-opacity duration-300">
                <button 
                  className="text-chord-text hover:scale-110 transition-transform duration-300"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>
              </div>
            </div>
            
            <div className="min-w-0">
              <h4 className="text-sm font-bold truncate text-chord-text mb-1">
                {currentSong.title}
              </h4>
              <Link 
                to={`/artist/${currentSong.artist || "unknown"}`} 
                className="text-xs text-chord-text/70 hover:text-chord-red transition-colors duration-200 truncate block"
              >
                {currentSong.artist}
              </Link>
            </div>
            
            <button 
              className={cn(
                "ml-3 p-1.5 rounded-full transition-all duration-200",
                isLiked ? "text-chord-red" : "text-chord-text/60 hover:text-chord-text"
              )}
              onClick={toggleLike}
            >
              <Heart size={16} fill={isLiked ? "#C20114" : "none"} />
            </button>
          </div>
          
          {/* Playback Controls */}
          <div className="flex flex-col items-center w-2/4">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      className={cn(
                        "p-1.5 rounded-full transition-all duration-200",
                        shuffleMode ? "text-chord-red" : "text-chord-text/60 hover:text-chord-text"
                      )}
                      onClick={toggleShuffleMode}
                    >
                      <Shuffle size={16} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {shuffleMode ? "Shuffle: On" : "Shuffle: Off"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <button 
                className="p-1.5 rounded-full text-chord-text/80 hover:text-chord-text transition-all duration-200"
                onClick={previousSong}
              >
                <SkipBack size={18} />
              </button>
              
              <button
                onClick={togglePlayPause}
                className="bg-chord-red text-chord-text w-8 h-8 rounded-full flex items-center justify-center hover:bg-chord-red/90 transition-all duration-200 hover:shadow-[0_0_15px_rgba(194,1,20,0.5)]"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
              </button>
              
              <button 
                className="p-1.5 rounded-full text-chord-text/80 hover:text-chord-text transition-all duration-200"
                onClick={nextSong}
              >
                <SkipForward size={18} />
              </button>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      className={cn(
                        "p-1.5 rounded-full transition-all duration-200",
                        loopMode !== "none" ? "text-chord-red" : "text-chord-text/60 hover:text-chord-text"
                      )}
                      onClick={toggleLoopMode}
                    >
                      {loopMode === "one" ? <Repeat1 size={16} /> : <Repeat size={16} />}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {loopMode === "none" && "Repeat: Off"}
                    {loopMode === "all" && "Repeat: All"}
                    {loopMode === "one" && "Repeat: One"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full flex items-center space-x-2 px-2">
              <span className="text-xs text-chord-text/70 font-mono w-10 text-right font-bold">
                {formatTime(currentTime)}
              </span>
              
              <div 
                className="flex-1 h-1.5 bg-chord-text/20 rounded-full relative cursor-pointer"
                onClick={handleProgressClick}
                ref={progressRef}
              >
                <div 
                  className="absolute left-0 top-0 h-full bg-chord-red rounded-full"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              
              <span className="text-xs text-chord-text/70 font-mono w-10 font-bold">
                {formatTime(duration)}
              </span>
            </div>
          </div>
          
          {/* Volume & Extra Controls */}
          <div className="flex items-center justify-end w-1/4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    className="mr-2 p-1.5 rounded-full text-chord-text/70 hover:text-chord-text transition-all duration-200"
                    onClick={toggleMute}
                  >
                    {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {isMuted ? "Unmute" : "Mute"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <div className="w-24">
              <Slider
                value={[isMuted ? 0 : volume]}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                className="cursor-pointer"
              />
            </div>
            
            <div className="flex items-center ml-4 space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="p-1.5 rounded-full text-chord-text/70 hover:text-chord-text transition-all duration-200">
                      <Share size={16} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Share
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="p-1.5 rounded-full text-chord-text/70 hover:text-chord-text transition-all duration-200">
                      <ListMusic size={16} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Queue
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="p-1.5 rounded-full text-chord-text/70 hover:text-chord-text transition-all duration-200">
                      <MoreHorizontal size={16} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    More Options
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hidden audio element */}
      <audio ref={audioRef} />
    </div>
  );
};

export default NowPlaying;
