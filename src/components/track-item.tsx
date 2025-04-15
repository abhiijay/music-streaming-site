
import { Play, Heart, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { usePlayer, Song } from "@/contexts/PlayerContext";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TrackItemProps {
  title: string;
  artist: string;
  duration: string;
  explicit?: boolean;
  imageUrl?: string;
  audioUrl?: string; 
  index?: number;
  showIndex?: boolean;
  showImage?: boolean;
  showHeart?: boolean;
  id?: string;
  songs?: Song[];
}

const TrackItem = ({
  title,
  artist,
  duration,
  explicit = false,
  imageUrl,
  audioUrl = "",
  index,
  showIndex = true,
  showImage = false,
  showHeart = true,
  id = "",
  songs = [],
}: TrackItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { playSong, currentSong, isPlaying, togglePlayPause } = usePlayer();
  
  const isCurrentSong = currentSong?.title === title && currentSong?.artist === artist;
  
  const handlePlay = () => {
    if (isCurrentSong) {
      // If this is the current song, just toggle play/pause
      togglePlayPause();
    } else {
      // Otherwise, play this song
      if (!audioUrl) return; // Don't play if no audio URL
      
      const song: Song = {
        id: id || String(Math.random()),
        title,
        artist,
        duration,
        explicit,
        imageUrl: imageUrl || "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png",
        audioUrl
      };
      
      // If we have a songs array, play in context of that list, otherwise just play this song
      playSong(song, songs.length > 0 ? songs : [song]);
    }
  };

  const [isHeartActive, setIsHeartActive] = useState(false);
  
  const toggleHeart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsHeartActive(!isHeartActive);
  };

  return (
    <div
      className={cn(
        "group grid grid-cols-[auto,1fr,auto] md:grid-cols-[auto,1fr,auto,auto] gap-4 px-4 py-2 rounded-md transition-colors duration-200",
        isCurrentSong ? "bg-tidal-hover/60" : "hover:bg-tidal-hover",
        "relative overflow-hidden"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handlePlay}
    >
      {/* Hover background animation */}
      <div className={cn(
        "absolute inset-0 bg-tidal-hover/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300",
        isCurrentSong && "bg-tidal-hover/30"
      )}></div>
      
      {showIndex && index && (
        <div className="flex items-center justify-center w-6 text-sm text-zinc-400 z-10">
          {isHovered || isCurrentSong ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    className={cn(
                      "text-white hover:text-tidal-blue transition-all duration-200 transform hover:scale-110",
                      isCurrentSong && isPlaying ? "text-tidal-blue animate-pulse" : ""
                    )}
                    onClick={handlePlay}
                  >
                    {isCurrentSong && isPlaying ? (
                      <Pause size={15} className="transform hover:scale-110 transition-transform" />
                    ) : (
                      <Play size={15} fill="currentColor" className="transform hover:scale-110 transition-transform" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {isCurrentSong && isPlaying ? "Pause" : "Play"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <span>{index}</span>
          )}
        </div>
      )}
      
      {showImage && imageUrl && (
        <div className="w-10 h-10 mr-3 flex-shrink-0 rounded-sm overflow-hidden z-10">
          <img 
            src={imageUrl} 
            className={cn(
              "w-full h-full object-cover transition-transform duration-300",
              isHovered ? "scale-110" : ""
            )} 
            alt={title} 
          />
        </div>
      )}
      
      <div className="flex flex-col min-w-0 z-10">
        <div className="flex items-center">
          <span className={cn(
            "text-sm font-medium truncate transition-colors duration-200",
            isCurrentSong ? "text-tidal-blue" : "text-white"
          )}>
            {title}
          </span>
          {explicit && (
            <span className="ml-2 px-1 text-[10px] bg-zinc-600 text-white rounded">E</span>
          )}
        </div>
        <span className="text-xs text-zinc-400 truncate hover:text-zinc-300 transition-colors duration-200">{artist}</span>
      </div>
      
      {showHeart && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                className={cn(
                  "text-zinc-400 hover:text-white hidden md:flex z-10 transition-all duration-200",
                  isHovered ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                  isHeartActive ? "text-tidal-blue" : ""
                )}
                onClick={toggleHeart}
              >
                <Heart size={16} className={cn(
                  "transition-transform duration-200",
                  isHeartActive ? "fill-tidal-blue text-tidal-blue scale-110" : "",
                  "hover:scale-125"
                )} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              {isHeartActive ? "Remove from favorites" : "Add to favorites"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      
      <span className="text-xs text-zinc-400 z-10 transition-colors duration-200 group-hover:text-zinc-300">{duration}</span>
    </div>
  );
};

export default TrackItem;
