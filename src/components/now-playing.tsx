
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
  ChevronDownIcon,
  XIcon,
  TrashIcon,
  AlbumIcon,
  MicIcon,
  PlusCircleIcon
} from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { toast } from "sonner";

interface NowPlayingProps {
  theme?: "dark" | "light";
}

const NowPlaying = ({ theme = "dark" }: NowPlayingProps) => {
  const { 
    currentSong, 
    isPlaying, 
    volume, 
    currentTime, 
    duration,
    repeatMode,
    shuffleMode,
    queue,
    playingSongs,
    togglePlayPause, 
    nextSong, 
    previousSong, 
    seek,
    setVolume,
    toggleRepeat,
    toggleShuffle,
    playSong,
    setQueue
  } = usePlayer();
  
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);
  
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
    if (showQueue) setShowQueue(false);
  };
  
  // Handle progress bar click for seeking
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    seek(pos * duration);
  };

  // Toggle song like status
  const toggleLike = () => {
    setLiked(!liked);
    if (!liked) {
      showLikeAnimation();
      toast.success("Added to favorites");
    } else {
      toast.info("Removed from favorites");
    }
  };

  // Handle queue reordering
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(queue);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setQueue(items);
    toast("Queue updated", {
      description: "Song order has been changed",
      icon: <ListMusic size={16} />
    });
  };

  // Remove song from queue
  const removeFromQueue = (songId: string) => {
    const updatedQueue = queue.filter(song => song.id !== songId);
    setQueue(updatedQueue);
    toast("Song removed from queue", {
      icon: <TrashIcon size={16} />
    });
  };

  // Add to playlist animation
  const addToPlaylist = () => {
    toast.success("Added to playlist", {
      description: "Song added to your playlist",
      icon: <PlusCircleIcon size={16} />
    });
  };

  // Heart animation
  const showLikeAnimation = () => {
    const heartContainer = document.createElement('div');
    heartContainer.className = 'fixed z-50 pointer-events-none';
    heartContainer.style.left = `${Math.random() * 20 + 40}%`;
    heartContainer.style.bottom = '120px';
    
    const heart = document.createElement('div');
    heart.innerHTML = `<svg class="text-tidal-blue fill-current" width="24" height="24" viewBox="0 0 24 24">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>`;
    heart.className = 'animate-float opacity-0';
    
    heartContainer.appendChild(heart);
    document.body.appendChild(heartContainer);
    
    setTimeout(() => {
      document.body.removeChild(heartContainer);
    }, 2000);
  };
  
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
      
      // Esc to close fullscreen
      if (e.code === 'Escape' && showFullscreen) {
        setShowFullscreen(false);
      }

      // Q to toggle queue
      if (e.code === 'KeyQ' && e.altKey) {
        setShowQueue(!showQueue);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [togglePlayPause, nextSong, previousSong, showFullscreen, showQueue]);
  
  // Create waveform visualization
  const Waveform = ({ isActive = true }: { isActive?: boolean }) => {
    return (
      <div className="waveform-container">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "waveform-bar",
              theme === "dark" ? "bg-tidal-blue" : "bg-tidal-purple"
            )}
            style={{
              height: isActive && isPlaying ? `${15 + Math.random() * 15}px` : '5px',
              animationPlayState: isPlaying && isActive ? 'running' : 'paused'
            }}
          />
        ))}
      </div>
    );
  };

  // Toggle queue view
  const toggleQueue = () => {
    setShowQueue(!showQueue);
  };
  
  // If no song is playing, show a simplified player
  if (!currentSong) {
    return (
      <div className={cn(
        "fixed bottom-0 left-0 right-0 h-20 border-t flex items-center px-4 z-30 transition-all duration-500",
        theme === "dark" ? "glass-bar border-zinc-800/50" : "bg-white/80 backdrop-blur-md border-zinc-200"
      )}>
        <div className={cn(
          "w-full text-center", 
          theme === "dark" ? "text-zinc-500" : "text-zinc-600"
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
        "fixed bottom-0 left-0 right-0 h-20 border-t flex items-center px-4 z-30 transition-all duration-500",
        theme === "dark" ? "glass-bar border-zinc-800/50" : "bg-white/90 backdrop-blur-md border-zinc-200 text-tidal-black"
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
              theme === "dark" ? "text-white hover:text-tidal-blue" : "text-tidal-black hover:text-tidal-blue"
            )}>
              <Link to={`/album/${currentSong.id}`}>{currentSong.title}</Link>
            </h4>
            <p className={cn(
              "text-xs truncate transition-colors duration-200",
              theme === "dark" ? "text-zinc-400 hover:text-zinc-300" : "text-zinc-600 hover:text-zinc-800"
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
                      shuffleMode 
                        ? "text-tidal-blue" 
                        : theme === "dark" ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-tidal-black"
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
                      theme === "dark" ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-tidal-black"
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
                      "rounded-full p-1 mx-2 transition-all duration-300",
                      theme === "dark"
                        ? "bg-white text-black hover:bg-zinc-200"
                        : "bg-tidal-blue text-white hover:bg-tidal-blue/90",
                      isPlaying ? "animate-glow-pulse" : "hover:scale-105"
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
                      theme === "dark" ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-tidal-black"
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
                      repeatMode !== "off" ? "text-tidal-blue" : theme === "dark" ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-tidal-black"
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
              theme === "dark" ? "text-zinc-400" : "text-zinc-600"
            )}>
              {formatTime(currentTime)}
            </span>
            <div 
              ref={progressBarRef}
              className={cn(
                "flex-1 h-1 rounded-full cursor-pointer group relative",
                theme === "dark" ? "bg-zinc-700" : "bg-zinc-300"
              )}
              onClick={handleProgressBarClick}
            >
              <div 
                className={cn(
                  "h-full rounded-full relative",
                  theme === "dark" ? "bg-tidal-blue" : "bg-tidal-purple"
                )}
                style={{ width: `${progressPercentage}%` }}
              >
                <div className={cn(
                  "absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm",
                  theme === "dark" ? "bg-white" : "bg-tidal-blue"
                )}></div>
              </div>
            </div>
            <span className={cn(
              "text-xs w-10 ml-2",
              theme === "dark" ? "text-zinc-400" : "text-zinc-600"
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
                    liked 
                      ? "text-tidal-blue" 
                      : theme === "dark" ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-tidal-black"
                  )}
                  onClick={toggleLike}
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
                    theme === "dark" ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-tidal-black",
                    showQueue && "text-tidal-blue"
                  )}
                  onClick={toggleQueue}
                >
                  <ListMusic size={18} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                {showQueue ? "Hide queue" : "Show queue"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  className={cn(
                    "mx-2 transition-all duration-200 hover:scale-110",
                    theme === "dark" ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-tidal-black"
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
                    theme === "dark" ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-tidal-black"
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
      
      {/* Queue panel */}
      {showQueue && (
        <div 
          className={cn(
            "fixed bottom-20 right-0 w-full md:w-[400px] md:h-[calc(100vh-80px)] max-h-[70vh] z-40 border-l border-t animate-slide-in-right overflow-hidden",
            theme === "dark" ? "bg-tidal-darkgray/95 backdrop-blur-md border-zinc-800/50" : "bg-white/90 backdrop-blur-md border-zinc-200"
          )}
        >
          <div className={cn(
            "flex items-center justify-between p-4 border-b",
            theme === "dark" ? "border-zinc-800" : "border-zinc-200"
          )}>
            <h3 className={cn(
              "font-medium flex items-center",
              theme === "dark" ? "text-white" : "text-tidal-black"
            )}>
              <ListMusic size={18} className="mr-2" />
              Queue
            </h3>
            <button 
              className={cn(
                "p-1 rounded-full transition-all duration-200 hover:scale-110",
                theme === "dark" ? "text-zinc-400 hover:text-white hover:bg-tidal-gray/50" : "text-zinc-600 hover:text-tidal-black hover:bg-zinc-100"
              )}
              onClick={() => setShowQueue(false)}
            >
              <XIcon size={18} />
            </button>
          </div>
          
          <div className="h-full overflow-y-auto pb-20 scrollbar-thin">
            {/* Now Playing */}
            <div className="p-4">
              <p className={cn(
                "text-xs uppercase mb-2 font-medium",
                theme === "dark" ? "text-zinc-500" : "text-zinc-600"
              )}>
                Now Playing
              </p>
              <div className={cn(
                "flex items-center p-2 rounded-md",
                theme === "dark" ? "bg-tidal-gray/50" : "bg-zinc-100"
              )}>
                <img src={currentSong.imageUrl} alt={currentSong.title} className="h-10 w-10 rounded mr-3" />
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "text-sm font-medium truncate",
                    theme === "dark" ? "text-white" : "text-tidal-black"
                  )}>
                    {currentSong.title}
                  </p>
                  <p className={cn(
                    "text-xs truncate",
                    theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                  )}>
                    {currentSong.artist}
                  </p>
                </div>
                <div className="ml-2">
                  <Waveform />
                </div>
              </div>
            </div>
            
            {/* Up Next */}
            <div className="p-4">
              <p className={cn(
                "text-xs uppercase mb-2 font-medium",
                theme === "dark" ? "text-zinc-500" : "text-zinc-600"
              )}>
                Up Next
              </p>
              
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="queue">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-1"
                    >
                      {queue.map((song, index) => (
                        <Draggable key={song.id} draggableId={song.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={cn(
                                "flex items-center p-2 rounded-md animate-fade-in transition-colors duration-200",
                                snapshot.isDragging && "opacity-70",
                                theme === "dark" 
                                  ? "hover:bg-tidal-gray/70" 
                                  : "hover:bg-zinc-100",
                                currentSong?.id === song.id && (
                                  theme === "dark" 
                                    ? "bg-tidal-gray/50" 
                                    : "bg-zinc-100"
                                )
                              )}
                              onClick={() => playSong(song)}
                            >
                              <div className="flex items-center justify-center h-10 w-10 relative group mr-3">
                                <img src={song.imageUrl} alt={song.title} className="h-10 w-10 rounded" />
                                <div className={cn(
                                  "absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded",
                                  currentSong?.id === song.id && "opacity-100 bg-black/60"
                                )}>
                                  {currentSong?.id === song.id && isPlaying ? (
                                    <PauseIcon size={18} className="text-white" />
                                  ) : (
                                    <PlayIcon size={18} className="text-white" />
                                  )}
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={cn(
                                  "text-sm font-medium truncate",
                                  theme === "dark" ? "text-white" : "text-tidal-black"
                                )}>
                                  {song.title}
                                </p>
                                <p className={cn(
                                  "text-xs truncate",
                                  theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                                )}>
                                  {song.artist}
                                </p>
                              </div>
                              <button 
                                className={cn(
                                  "p-1 opacity-0 group-hover:opacity-100 hover:bg-tidal-gray rounded-full transition-all duration-200",
                                  theme === "dark" ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-tidal-black"
                                )}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeFromQueue(song.id);
                                }}
                              >
                                <TrashIcon size={16} />
                              </button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      
                      {queue.length === 0 && (
                        <div className={cn(
                          "p-4 text-center rounded-md",
                          theme === "dark" ? "bg-tidal-gray/30" : "bg-zinc-100"
                        )}>
                          <p className={theme === "dark" ? "text-zinc-400" : "text-zinc-600"}>
                            No songs in the queue
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>
        </div>
      )}
      
      {/* Fullscreen player with animation */}
      {showFullscreen && (
        <div className={cn(
          "fixed inset-0 z-50 flex flex-col justify-center items-center p-6 animate-fade-in",
          theme === "dark"
            ? "bg-gradient-to-br from-tidal-black via-black to-tidal-darkgray/90"
            : "bg-gradient-to-br from-white via-zinc-100 to-zinc-200/90"
        )}>
          <div className="absolute top-4 right-4 flex space-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    className={cn(
                      "p-2 rounded-full transition-all duration-200 hover:scale-110",
                      theme === "dark" 
                        ? "text-zinc-400 hover:text-white hover:bg-white/10" 
                        : "text-zinc-600 hover:text-tidal-black hover:bg-zinc-200/70"
                    )}
                    onClick={toggleLike}
                  >
                    <HeartIcon 
                      size={20} 
                      className={cn(
                        "transition-transform duration-200",
                        liked && "text-tidal-blue fill-tidal-blue"
                      )} 
                    />
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
                      "p-2 rounded-full transition-all duration-200 hover:scale-110",
                      theme === "dark" 
                        ? "text-zinc-400 hover:text-white hover:bg-white/10" 
                        : "text-zinc-600 hover:text-tidal-black hover:bg-zinc-200/70",
                      showQueue && "text-tidal-blue"
                    )}
                    onClick={toggleQueue}
                  >
                    <ListMusic size={20} className="transition-transform duration-200 hover:scale-110" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {showQueue ? "Hide queue" : "View queue"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button 
                        className={cn(
                          "p-2 rounded-full transition-all duration-200 hover:scale-110",
                          theme === "dark" 
                            ? "text-zinc-400 hover:text-white hover:bg-white/10" 
                            : "text-zinc-600 hover:text-tidal-black hover:bg-zinc-200/70"
                        )}
                      >
                        <MoreHorizontalIcon size={20} className="transition-transform duration-200 hover:scale-110" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className={cn(
                      "min-w-[200px]",
                      theme === "dark" ? "bg-tidal-darkgray border-zinc-700" : "bg-white border-zinc-200"
                    )}>
                      <DropdownMenuItem 
                        className={cn(
                          "cursor-pointer flex items-center",
                          theme === "dark" ? "hover:bg-tidal-gray focus:bg-tidal-gray" : "hover:bg-zinc-100 focus:bg-zinc-100"
                        )}
                        onClick={addToPlaylist}
                      >
                        <PlusCircleIcon size={16} className="mr-2" />
                        <span>Add to playlist</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className={cn(
                          "cursor-pointer flex items-center",
                          theme === "dark" ? "hover:bg-tidal-gray focus:bg-tidal-gray" : "hover:bg-zinc-100 focus:bg-zinc-100"
                        )}
                      >
                        <AlbumIcon size={16} className="mr-2" />
                        <span>Go to album</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className={cn(
                          "cursor-pointer flex items-center",
                          theme === "dark" ? "hover:bg-tidal-gray focus:bg-tidal-gray" : "hover:bg-zinc-100 focus:bg-zinc-100"
                        )}
                      >
                        <MicIcon size={16} className="mr-2" />
                        <span>Go to artist</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className={theme === "dark" ? "bg-zinc-800" : "bg-zinc-200"} />
                      <DropdownMenuItem 
                        className={cn(
                          "cursor-pointer flex items-center",
                          theme === "dark" ? "hover:bg-tidal-gray focus:bg-tidal-gray" : "hover:bg-zinc-100 focus:bg-zinc-100"
                        )}
                        onClick={toggleLike}
                      >
                        <HeartIcon size={16} className={cn("mr-2", liked && "fill-tidal-blue text-tidal-blue")} />
                        <span>{liked ? 'Unlike' : 'Like'}</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TooltipTrigger>
                <TooltipContent>More options</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    className={cn(
                      "p-2 rounded-full transition-all duration-200 hover:scale-110",
                      theme === "dark" 
                        ? "text-zinc-400 hover:text-white hover:bg-white/10" 
                        : "text-zinc-600 hover:text-tidal-black hover:bg-zinc-200/70"
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
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br from-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"
              )}></div>
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
                theme === "dark" ? "text-white" : "text-tidal-black"
              )}>
                {currentSong.title}
              </h2>
              <p className={cn(
                "text-xl mb-1 transition-colors",
                theme === "dark" ? "text-zinc-300 hover:text-tidal-blue" : "text-zinc-800 hover:text-tidal-blue"
              )}>
                <Link to={`/artist/${currentSong.artist.replace(/\s+/g, '-').toLowerCase()}`}>
                  {currentSong.artist}
                </Link>
              </p>
              {currentSong.explicit && (
                <span className={cn(
                  "inline-block px-2 py-0.5 text-xs rounded",
                  theme === "dark" ? "bg-zinc-700 text-zinc-300" : "bg-zinc-200 text-zinc-700"
                )}>
                  EXPLICIT
                </span>
              )}
            </div>
            
            <div className="w-full mb-10">
              <div className="flex items-center justify-between w-full mb-2">
                <span className={cn(
                  "text-sm",
                  theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                )}>
                  {formatTime(currentTime)}
                </span>
                <span className={cn(
                  "text-sm",
                  theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                )}>
                  {formatTime(duration)}
                </span>
              </div>
              
              <div 
                className={cn(
                  "w-full h-2 rounded-full cursor-pointer group relative",
                  theme === "dark" ? "bg-zinc-700" : "bg-zinc-300"
                )}
                onClick={handleProgressBarClick}
              >
                <div 
                  className={cn(
                    "h-full rounded-full transition-all duration-100 relative",
                    theme === "dark" ? "bg-tidal-blue" : "bg-tidal-purple"
                  )}
                  style={{ width: `${progressPercentage}%` }}
                >
                  <div className={cn(
                    "absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity",
                    theme === "dark" ? "bg-white" : "bg-tidal-blue"
                  )}></div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-10">
              <button 
                className={cn(
                  "p-2 transition-all duration-200",
                  shuffleMode 
                    ? "text-tidal-blue" 
                    : theme === "dark" ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-tidal-black"
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
                  theme === "dark" ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-tidal-black"
                )}
                onClick={previousSong}
              >
                <SkipBackIcon size={24} className="transition-transform hover:scale-110" />
              </button>
              
              <button
                onClick={togglePlayPause}
                className={cn(
                  "rounded-full p-4 transition-all duration-300",
                  theme === "dark"
                    ? "bg-white text-black hover:bg-zinc-200"
                    : "bg-tidal-blue text-white hover:bg-tidal-blue/90",
                  isPlaying ? "animate-glow-pulse" : "hover:scale-105"
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
                  theme === "dark" ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-tidal-black"
                )}
                onClick={nextSong}
              >
                <SkipForwardIcon size={24} className="transition-transform hover:scale-110" />
              </button>
              
              <button 
                className={cn(
                  "p-2 transition-all duration-200",
                  repeatMode !== "off" 
                    ? "text-tidal-blue" 
                    : theme === "dark" ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-tidal-black"
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
                  theme === "dark" ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-tidal-black"
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
