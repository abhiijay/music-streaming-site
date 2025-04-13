import { Play, Heart, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { usePlayer, Song } from "@/contexts/PlayerContext";

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

  return (
    <div
      className="group grid grid-cols-[auto,1fr,auto] md:grid-cols-[auto,1fr,auto,auto] gap-4 px-4 py-2 rounded-md hover:bg-tidal-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showIndex && index && (
        <div className="flex items-center justify-center w-6 text-sm text-zinc-400">
          {isHovered || isCurrentSong ? (
            <button 
              className={cn(
                "text-white hover:text-tidal-blue",
                isCurrentSong && isPlaying ? "text-tidal-blue" : ""
              )}
              onClick={handlePlay}
            >
              {isCurrentSong && isPlaying ? (
                <Pause size={15} />
              ) : (
                <Play size={15} fill="currentColor" />
              )}
            </button>
          ) : (
            <span>{index}</span>
          )}
        </div>
      )}
      
      {showImage && imageUrl && (
        <div className="w-10 h-10 mr-3 flex-shrink-0">
          <img src={imageUrl} className="w-full h-full object-cover rounded-sm" alt={title} />
        </div>
      )}
      
      <div className="flex flex-col min-w-0">
        <div className="flex items-center">
          <span className={cn(
            "text-sm font-medium truncate",
            isCurrentSong ? "text-tidal-blue" : "text-white"
          )}>
            {title}
          </span>
          {explicit && (
            <span className="ml-2 px-1 text-[10px] bg-zinc-600 text-white rounded">E</span>
          )}
        </div>
        <span className="text-xs text-zinc-400 truncate">{artist}</span>
      </div>
      
      {showHeart && (
        <button className={cn(
          "text-zinc-400 hover:text-white hidden md:flex",
          isHovered ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}>
          <Heart size={16} />
        </button>
      )}
      
      <span className="text-xs text-zinc-400">{duration}</span>
    </div>
  );
};

export default TrackItem;
