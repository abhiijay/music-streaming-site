import { useState, useEffect, useRef } from "react";
import { 
  PlayIcon, 
  PauseIcon, 
  SkipBackIcon, 
  SkipForwardIcon, 
  RepeatIcon, 
  ShuffleIcon, 
  Volume2Icon,
  VolumeXIcon,
  Volume1Icon,
  Maximize2Icon,
  MinimizeIcon,
  HeartIcon,
  MoreHorizontalIcon,
  ListMusic,
  ListIcon
} from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NowPlayingProps {
  toggleQueue?: () => void;
  isQueueOpen?: boolean;
  theme: "dark" | "light";
}

const NowPlaying = ({ toggleQueue, isQueueOpen, theme = "dark" }: NowPlayingProps) => {
  const { 
    currentSong, 
    isPlaying, 
    volume, 
    currentTime, 
    duration,
    repeatMode,
    shuffleMode,
    togglePlayPause, 
    nextSong, 
    previousSong, 
    seek,
    setVolume,
    toggleRepeat,
    toggleShuffle
  } = usePlayer();
  
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  
  // Format time in MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Get the appropriate volume icon based on volume level
  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeXIcon size={18} />;
    if (volume < 0.5) return <Volume1Icon size={18} />;
    return <Volume2Icon size={18} />;
  };

  // Handle volume toggle mute/unmute
  const [previousVolume, setPreviousVolume] = useState(volume);
  
  const toggleMute = () => {
    if (volume > 0) {
      setPreviousVolume(volume);
      setVolume(0);
    } else {
      setVolume(previousVolume);
    }
  };

  // Calculate progress percentage
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  
  // Toggle fullscreen player
  const toggleFullscreen = () => {
    setShowFullscreen(!showFullscreen);
    if (showOptions) setShowOptions(false);
  };
  
  // Handle progress bar click for seeking
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    seek(pos * duration);
  };

  // Close options dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Space bar to toggle play/pause
      if (e.code === 'Space' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        togglePlayPause();
      }
      
      // Right arrow to skip forward
      if (e.code === 'ArrowRight' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        nextSong();
      }
      
      // Left arrow to previous
      if (e.code === 'ArrowLeft' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        previousSong();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [togglePlayPause, nextSong, previousSong]);
  
  // Create waveform visualization
  const Waveform = () => {
    return (
      <div className="audio-visualizer">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={cn("audio-bar", theme === "dark" ? "bg-tidal-blue" : "bg-tidal-blue")}
            style={{
              height: isPlaying ? `${15 + Math.random() * 15}px` : '5px',
              animationDuration: `${0.8 + Math.random() * 0.5}s`,
              animationDelay: `${index * 0.2}s`
            }}
          />
        ))}
      </div>
    );
  };
  
  // If no song is playing, show a simplified player
  if (!currentSong) {
    return (
      <div className={cn(
        "fixed bottom-0 left-0 right-0 h-20 border-t flex items-center px-4 z-30",
        theme === "dark" 
          ? "glass-bar border-zinc-800/50" 
          : "bg-white/80 backdrop-blur-md border-slate-200/50"
      )}>
        <div className={cn(
          "w-full text-center",
          theme === "dark" ? "text-zinc-500" : "text-slate-500"
        )}>
          No track selected
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Normal player */}
      <div className={cn(
        "fixed bottom-0 left-0 right-0 h-20 border-t flex items-center px-4 z-30 transition-all duration-300",
        theme === "dark" 
          ? "glass-bar border-zinc-800/50" 
          : "bg-white/80 backdrop-blur-md border-slate-200/50"
      )}>
        <div className="flex items-center flex-1 max-w-[240px]">
          <Link to={`/album/${currentSong.id}`} className="group overflow-hidden">
            <img
              src={currentSong.imageUrl}
              alt="Album cover"
              className="h-12 w-12 mr-3 rounded-sm transition-all duration-300 group-hover:scale-105 group-hover:opacity-80"
            />
          </Link>
          <div className="mr-4">
            <h4 className={cn(
              "text-sm font-medium truncate transition-colors duration-200",
              theme === "dark" 
                ? "text-white hover:text-tidal-blue" 
                : "text-slate-900 hover:text-tidal-blue"
            )}>
              <Link to={`/album/${currentSong.id}`}>{currentSong.title}</Link>
            </h4>
            <p className={cn(
              "text-xs truncate transition-colors duration-200",
              theme === "dark" 
                ? "text-zinc-400 hover:text-zinc-300" 
                : "text-slate-500 hover:text-slate-700"
            )}>
              <Link to={`/artist/${currentSong.artist.replace(/\s+/g, '-').toLowerCase()}`}>{currentSong.artist}</Link>
            </p>
          </div>
        </div>
        
        <div className="flex flex-col items-center flex-1">
          <div className="flex items-center mb-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    className={cn(
                      "mx-2 transition-all duration-200 hover:scale-110",
                      shuffleMode ? "text-tidal-blue" : theme === "dark" ? "text-zinc-400 hover:text-white" : "text-slate-500 hover:text-slate-900"
                    )}
                    onClick={toggleShuffle}
                  >
                    <ShuffleIcon size={18} className={cn(
                      shuffleMode && "animate-pulse"
                    )} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {shuffleMode ? "Disable shuffle" : "Enable shuffle"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    className={cn(
                      "mx-2 transition-all duration-200 hover:scale-110",
                      theme === "dark" ? "text-zinc-400 hover:text-white" : "text-slate-500 hover:text-slate-900"
                    )}
                    onClick={previousSong}
                  >
                    <SkipBackIcon size={18} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Previous track</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={togglePlayPause}
                    className={cn(
                      "bg-white text-black rounded-full p-1 mx-2 transition-all duration-300",
                      isPlaying ? "hover:bg-zinc-200 animate-glow-pulse" : "hover:bg-zinc-200 hover:scale-105"
                    )}
                  >
                    {isPlaying ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {isPlaying ? "Pause" : "Play"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    className={cn(
                      "mx-2 transition-all duration-200 hover:scale-110",
                      theme === "dark" ? "text-zinc-400 hover:text-white" : "text-slate-500 hover:text-slate-900"
                    )}
                    onClick={nextSong}
                  >
                    <SkipForwardIcon size={18} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Next track</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    className={cn(
                      "mx-2 transition-all duration-200 hover:scale-110",
                      repeatMode !== "off" ? "text-tidal-blue" : theme === "dark" ? "text-zinc-400 hover:text-white" : "text-slate-500 hover:text-slate-900"
                    )}
                    onClick={toggleRepeat}
                  >
                    <RepeatIcon size={18} />
                    {repeatMode === "one" && <span className="absolute text-[10px] ml-[6px] mt-[2px]">1</span>}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {repeatMode === "off" && "Enable repeat"}
                  {repeatMode === "all" && "Repeat one"}
                  {repeatMode === "one" && "Disable repeat"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="flex items-center w-full max-w-xl">
            <span className={cn(
              "text-xs w-10 text-right mr-2",
              theme === "dark" ? "text-zinc-400" : "text-slate-500"
            )}>
              {formatTime(currentTime)}
            </span>
            <div 
              ref={progressBarRef}
              className={cn(
                "flex-1 h-1 rounded-full cursor-pointer group relative",
                theme === "dark" ? "bg-zinc-700" : "bg-slate-300"
              )}
              onClick={handleProgressBarClick}
            >
              <div 
                className="h-full bg-tidal-blue rounded-full relative"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"></div>
              </div>
            </div>
            <span className={cn(
              "text-xs w-10 ml-2",
              theme === "dark" ? "text-zinc-400" : "text-slate-500"
            )}>
              {formatTime(duration)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-end flex-1 max-w-[240px]">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className={cn(
                    "mx-2 transition-all duration-200 hover:scale-110",
                    liked ? "text-tidal-blue" : theme === "dark" ? "text-zinc-400 hover:text-white" : "text-slate-500 hover:text-slate-900"
                  )}
                  onClick={() => setLiked(!liked)}
                >
                  <HeartIcon size={18} className={cn(liked && "fill-tidal-blue")} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                {liked ? "Remove from favorites" : "Add to favorites"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  className={cn(
                    "mx-2 transition-all duration-200 hover:scale-110",
                    theme === "dark" ? "text-zinc-400 hover:text-white" : "text-slate-500 hover:text-slate-900",
                    isQueueOpen && "text-tidal-blue"
                  )}
                  onClick={toggleQueue}
                >
                  <ListIcon size={18} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                {isQueueOpen ? "Hide queue" : "Show queue"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  className={cn(
                    "mx-2 transition-all duration-200 hover:scale-110",
                    theme === "dark" ? "text-zinc-400 hover:text-white" : "text-slate-500 hover:text-slate-900"
                  )}
                  onClick={toggleMute}
                >
                  {getVolumeIcon()}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                {volume === 0 ? "Unmute" : "Mute"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <div className="w-20">
            <Slider
              value={[volume * 100]}
              min={0}
              max={100}
              step={1}
              onValueChange={(value) => setVolume(value[0] / 100)}
              className="h-1"
            />
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  className={cn(
                    "ml-4 transition-all duration-200 hover:scale-110",
                    theme === "dark" ? "text-zinc-400 hover:text-white" : "text-slate-500 hover:text-slate-900"
                  )}
                  onClick={toggleFullscreen}
                >
                  <Maximize2Icon size={18} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                Full screen player
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {/* Fullscreen player with animation */}
      {showFullscreen && (
        <div className={cn(
          "fixed inset-0 flex flex-col justify-center items-center p-6 z-50 animate-fade-in",
          theme === "dark" 
            ? "bg-gradient-to-br from-tidal-black via-black to-tidal-darkgray/90" 
            : "bg-gradient-to-br from-slate-100 via-white to-slate-200/90"
        )}>
          <div className="absolute top-4 right-4 flex space-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    className={cn(
                      "p-2 rounded-full transition-all duration-200",
                      theme === "dark" 
                        ? "text-zinc-400 hover:text-white hover:bg-white/10" 
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/70"
                    )}
                    onClick={() => setLiked(!liked)}
                  >
                    <HeartIcon size={20} className={cn(
                      "transition-transform duration-200 hover:scale-110",
                      liked && "text-tidal-blue fill-tidal-blue"
                    )} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {liked ? "Remove from favorites" : "Add to favorites"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    className={cn(
                      "p-2 rounded-full transition-all duration-200",
                      theme === "dark" 
                        ? "text-zinc-400 hover:text-white hover:bg-white/10" 
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/70",
                      isQueueOpen && "text-tidal-blue"
                    )}
                    onClick={toggleQueue}
                  >
                    <ListMusic size={20} className="transition-transform duration-200 hover:scale-110" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>View queue</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="relative">
                    <button 
                      className={cn(
                        "p-2 rounded-full transition-all duration-200",
                        theme === "dark" 
                          ? "text-zinc-400 hover:text-white hover:bg-white/10" 
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/70"
                      )}
                      onClick={() => setShowOptions(!showOptions)}
                    >
                      <MoreHorizontalIcon size={20} className="transition-transform duration-200 hover:scale-110" />
                    </button>
                    
                    {/* More options menu */}
                    {showOptions && (
                      <div 
                        ref={optionsRef}
                        className={cn(
                          "absolute right-0 mt-2 rounded-md overflow-hidden shadow-lg z-10 min-w-40 animate-fade-in animate-scale-in",
                          theme === "dark" ? "bg-tidal-darkgray" : "bg-white"
                        )}
                      >
                        <div className="py-1">
                          <Link 
                            to={`/album/${currentSong.id}`}
                            className={cn(
                              "block px-4 py-2 text-sm",
                              theme === "dark" 
                                ? "hover:bg-tidal-hover text-white" 
                                : "hover:bg-slate-100 text-slate-900"
                            )}
                            onClick={() => setShowOptions(false)}
                          >
                            Go to album
                          </Link>
                          <Link 
                            to={`/artist/${currentSong.artist.replace(/\s+/g, '-').toLowerCase()}`}
                            className={cn(
                              "block px-4 py-2 text-sm",
                              theme === "dark" 
                                ? "hover:bg-tidal-hover text-white" 
                                : "hover:bg-slate-100 text-slate-900"
                            )}
                            onClick={() => setShowOptions(false)}
                          >
                            Go to artist
                          </Link>
                          <button
                            className={cn(
                              "block w-full text-left px-4 py-2 text-sm",
                              theme === "dark" 
                                ? "hover:bg-tidal-hover text-white" 
                                : "hover:bg-slate-100 text-slate-900"
                            )}
                            onClick={() => {
                              setLiked(!liked);
                              setShowOptions(false);
                            }}
                          >
                            {liked ? "Remove from favorites" : "Add to favorites"}
                          </button>
                          <button
                            className={cn(
                              "block w-full text-left px-4 py-2 text-sm",
                              theme === "dark" 
                                ? "hover:bg-tidal-hover text-white" 
                                : "hover:bg-slate-100 text-slate-900"
                            )}
                            onClick={() => setShowOptions(false)}
                          >
                            Add to playlist
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>More options</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    className={cn(
                      "p-2 rounded-full transition-all duration-200",
                      theme === "dark" 
                        ? "text-zinc-400 hover:text-white hover:bg-white/10" 
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/70"
                    )}
                    onClick={toggleFullscreen}
                  >
                    <MinimizeIcon size={20} className="transition-transform duration-200 hover:scale-110" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Exit full screen</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="max-w-3xl w-full flex flex-col items-center animate-scale-in">
            <div className="relative w-full max-w-md aspect-square mb-8 group">
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img 
                src={currentSong.imageUrl}
                alt={currentSong.title}
                className="w-full h-full object-cover rounded-md shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
              />
              
              {/* Waveform visualization when playing */}
              {isPlaying && (
                <div className="absolute bottom-4 left-4 z-20">
                  <Waveform />
                </div>
              )}
            </div>
            
            <div className="w-full text-center mb-8">
              <h2 className={cn(
                "text-3xl font-bold mb-3",
                theme === "dark" ? "text-white" : "text-slate-900"
              )}>
                {currentSong.title}
              </h2>
              <p className={cn(
                "text-xl mb-1 transition-colors",
                theme === "dark" ? "text-zinc-300 hover:text-tidal-blue" : "text-slate-700 hover:text-tidal-blue"
              )}>
                <Link to={`/artist/${currentSong.artist.replace(/\s+/g, '-').toLowerCase()}`}>
                  {currentSong.artist}
                </Link>
              </p>
              {currentSong.explicit && (
                <span className={cn(
                  "inline-block px-2 py-0.5 text-xs rounded",
                  theme === "dark" ? "bg-zinc-700 text-zinc-300" : "bg-slate-300 text-slate-700"
                )}>
                  EXPLICIT
                </span>
              )}
            </div>
            
            <div className="w-full mb-10">
              <div className="flex items-center justify-between w-full mb-2">
                <span className={cn(
                  "text-sm",
                  theme === "dark" ? "text-zinc-400" : "text-slate-500"
                )}>
                  {formatTime(currentTime)}
                </span>
                <span className={cn(
                  "text-sm",
                  theme === "dark" ? "text-zinc-400" : "text-slate-500"
                )}>
                  {formatTime(duration)}
                </span>
              </div>
              
              <div 
                className={cn(
                  "w-full h-2 rounded-full cursor-pointer group relative",
                  theme === "dark" ? "bg-zinc-700" : "bg-slate-300"
                )}
                onClick={handleProgressBarClick}
              >
                <div 
                  className="h-full bg-tidal-blue rounded-full transition-all duration-100 relative"
                  style={{ width: `${progressPercentage}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            </div>
            
            {/* Rest of the fullscreen player controls */}
            <div className="flex items-center justify-center space-x-10">
              <button 
                className={cn(
                  "p-2 transition-all duration-200",
                  shuffleMode ? "text-tidal-blue" : theme === "dark" ? "text-zinc-400 hover:text-white" : "text-slate-500 hover:text-slate-900"
                )}
                onClick={toggleShuffle}
              >
                <ShuffleIcon size={24} className={cn(
                  "transition-transform hover:scale-110",
                  shuffleMode && "animate-pulse"
                )} />
              </button>
              
              <button 
                className={cn(
                  "p-2 transition-all duration-200",
                  theme === "dark" ? "text-zinc-400 hover:text-white" : "text-slate-500 hover:text-slate-900"
                )}
                onClick={previousSong}
              >
                <SkipBackIcon size={24} className="transition-transform hover:scale-110" />
              </button>
              
              <button
                onClick={togglePlayPause}
                className={cn(
                  "bg-white text-black rounded-full p-4 transition-all duration-300",
                  isPlaying ? "hover:bg-zinc-200 animate-glow-pulse" : "hover:bg-zinc-200 hover:scale-105"
                )}
              >
                {isPlaying ? 
                  <PauseIcon size={30} className="transition-transform hover:scale-105" /> : 
                  <PlayIcon size={30} className="transition-transform hover:scale-105" />
                }
              </button>
              
              <button 
                className={cn(
                  "p-2 transition-all duration-200",
                  theme === "dark" ? "text-zinc-400 hover:text-white" : "text-slate-500 hover:text-slate-900"
                )}
                onClick={nextSong}
              >
                <SkipForwardIcon size={24} className="transition-transform hover:scale-110" />
              </button>
              
              <button 
                className={cn(
                  "p-2 transition-all duration-200",
                  repeatMode !== "off" ? "text-tidal-blue" : theme === "dark" ? "text-zinc-400 hover:text-white" : "text-slate-500 hover:text-slate-900"
                )}
                onClick={toggleRepeat}
              >
                <div className="relative">
                  <RepeatIcon size={24} className="transition-transform hover:scale-110" />
                  {repeatMode === "one" && <span className="absolute text-xs ml-[10px] mt-[4px]">1</span>}
                </div>
              </button>
            </div>
            
            <div className="flex items-center mt-8">
              <button 
                className={cn(
                  "mx-2",
                  theme === "dark" ? "text-zinc-400 hover:text-white" : "text-slate-500 hover:text-slate-900"
                )}
                onClick={toggleMute}
              >
                {getVolumeIcon()}
              </button>
              <Slider
                value={[volume * 100]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => setVolume(value[0] / 100)}
                className="w-32 h-1"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NowPlaying;
