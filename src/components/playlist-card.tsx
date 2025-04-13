
import { useState } from "react";
import { cn } from "@/lib/utils";
import { PlayIcon, PauseIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { usePlayer } from "@/contexts/PlayerContext";

interface PlaylistCardProps {
  id: string;
  title: string;
  imageUrl: string;
  description?: string;
  tracksCount?: number;
  creator?: string;
  variant?: "default" | "small" | "large";
}

const PlaylistCard = ({
  id,
  title,
  imageUrl,
  description,
  tracksCount,
  creator = "TIDAL",
  variant = "default"
}: PlaylistCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { currentSong, isPlaying, playSong, togglePlayPause } = usePlayer();
  
  // Check if this playlist's first track is currently playing
  const isCurrentPlaylist = currentSong?.id.includes(id);
  
  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isCurrentPlaylist && isPlaying) {
      togglePlayPause();
    } else {
      // In a real app, we would fetch the playlist tracks here
      // For now, we'll use our mockSongs with modified ids
      const playlistSongs = Array(tracksCount || 5).fill(null).map((_, index) => ({
        id: `${id}-track-${index + 1}`,
        title: `Track ${index + 1}`,
        artist: creator,
        duration: `${Math.floor(Math.random() * 4) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        explicit: Math.random() > 0.7,
        imageUrl,
        audioUrl: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3"
      }));
      
      if (playlistSongs.length > 0) {
        playSong(playlistSongs[0], playlistSongs);
      }
    }
  };

  return (
    <Link
      to={`/playlist/${id}`}
      className={cn(
        "block group",
        variant === "small" ? "w-full" : "w-full"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative track-card mb-3 card-hover">
        <div className={cn(
          "relative bg-tidal-gray rounded-md overflow-hidden shadow-lg",
          variant === "small" ? "w-full aspect-square" : "w-full aspect-square"
        )}>
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
          />
          <div className={cn(
            "absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-all duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            <button 
              className={cn(
                "bg-white rounded-full p-3 transition-all duration-300 transform",
                isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75",
                "hover:bg-tidal-blue hover:text-white btn-hover-glow"
              )}
              onClick={handlePlay}
            >
              {isCurrentPlaylist && isPlaying ? (
                <PauseIcon className="h-5 w-5 text-black" />
              ) : (
                <PlayIcon className="h-5 w-5 text-black" />
              )}
            </button>
          </div>
        </div>
        <div className="mt-3 transition-transform duration-300 group-hover:translate-x-1">
          <h3 className="text-sm font-medium text-white truncate group-hover:text-tidal-blue transition-colors duration-200">{title}</h3>
          {description && (
            <p className="text-xs text-zinc-400 truncate mt-1 group-hover:text-zinc-300 transition-colors duration-200">{description}</p>
          )}
          <div className="flex items-center mt-1 text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors duration-200">
            <span>Created by {creator}</span>
            {tracksCount && (
              <>
                <span className="mx-1">•</span>
                <span>{tracksCount} tracks</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlaylistCard;
