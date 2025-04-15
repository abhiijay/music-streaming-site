
import { PlayIcon, PauseIcon, MoreHorizontal, Heart } from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface TrackItemProps {
  id: string;
  title: string;
  artist: string;
  duration: string;
  index?: number;
  explicit?: boolean;
  showImage?: boolean;
  imageUrl?: string;
  audioUrl?: string;
  songs?: any[];
}

const TrackItem = ({
  id,
  title,
  artist,
  duration,
  index,
  explicit = false,
  showImage = true,
  imageUrl,
  audioUrl,
  songs = []
}: TrackItemProps) => {
  const { currentSong, isPlaying, playSong } = usePlayer();
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  const isCurrentSong = currentSong?.id === id;
  const isCurrentlyPlaying = isCurrentSong && isPlaying;
  
  const handlePlayClick = () => {
    playSong({
      id,
      title,
      artist,
      duration,
      audioUrl: audioUrl || "",
      imageUrl: imageUrl || "",
      explicit
    }, songs);
  };
  
  return (
    <div 
      className={cn(
        "group px-4 py-3 flex items-center hover:bg-white/5 transition-colors duration-200 border-b border-white/5 last:border-none",
        isCurrentSong && "bg-white/10"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Track number or play button */}
      <div className="w-10 flex items-center justify-center">
        {(isHovered || isCurrentlyPlaying) ? (
          <button 
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-full",
              isCurrentlyPlaying ? "text-chord-red" : "text-chord-text hover:text-chord-red"
            )}
            onClick={handlePlayClick}
          >
            {isCurrentlyPlaying ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
          </button>
        ) : (
          <span className="text-sm text-chord-text/50 w-8 text-center">{index}</span>
        )}
      </div>
      
      {/* Track image (optional) */}
      {showImage && imageUrl && (
        <div className="mr-3">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-10 h-10 rounded object-cover"
          />
        </div>
      )}
      
      {/* Track info */}
      <div className="flex-1 min-w-0 mr-4">
        <h3 className={cn(
          "text-sm font-bold truncate",
          isCurrentSong ? "text-chord-red" : "text-chord-text"
        )}>
          {title}
          {explicit && (
            <span className="ml-2 px-1 py-0.5 text-[0.6rem] bg-chord-text/20 text-chord-text/70 rounded">
              E
            </span>
          )}
        </h3>
        <p className="text-xs text-chord-text/70 truncate">
          {artist}
        </p>
      </div>
      
      {/* Actions (only visible on hover) */}
      <div className={cn(
        "flex items-center space-x-3 mr-4",
        isHovered ? "opacity-100" : "opacity-0"
      )}>
        <button 
          className={cn(
            "text-chord-text/70 hover:text-chord-text transition-colors duration-200",
            isLiked && "text-chord-red"
          )}
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart size={16} fill={isLiked ? "#C20114" : "none"} />
        </button>
        <button className="text-chord-text/70 hover:text-chord-text transition-colors duration-200">
          <MoreHorizontal size={16} />
        </button>
      </div>
      
      {/* Duration */}
      <div className="text-sm text-chord-text/50 font-mono">
        {duration}
      </div>
    </div>
  );
};

export default TrackItem;
