
import { Link } from "react-router-dom";
import { Play, Music } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePlayer } from "@/contexts/PlayerContext";

interface PlaylistCardProps {
  id: string;
  title: string;
  imageUrl: string;
  description?: string;
  creator?: string;
  tracksCount?: number;
  className?: string;
  type?: "playlist" | "album";
}

const PlaylistCard = ({
  id,
  title,
  imageUrl,
  description,
  creator = "Chord",
  tracksCount,
  className,
  type = "playlist"
}: PlaylistCardProps) => {
  const { currentSong, isPlaying, togglePlayPause } = usePlayer();
  const isCurrentlyPlaying = isPlaying && currentSong?.playlistId === id;
  
  return (
    <Link
      to={`/${type}/${id}`}
      className={cn(
        "group block relative transition-all duration-300",
        className
      )}
    >
      <div className="relative overflow-hidden rounded-lg aspect-square bg-secondary/30 border border-white/5 hover:border-chord-red/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <button
          className="absolute right-2 bottom-2 w-10 h-10 rounded-full bg-chord-red text-chord-text flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:scale-105"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            togglePlayPause();
          }}
        >
          {isCurrentlyPlaying ? (
            <div className="waveform-container h-5 px-1">
              <div className="waveform-bar h-3"></div>
              <div className="waveform-bar h-5"></div>
              <div className="waveform-bar h-2"></div>
              <div className="waveform-bar h-4"></div>
            </div>
          ) : (
            <Play size={18} className="ml-0.5" />
          )}
        </button>
      </div>
      
      <div className="mt-3">
        <h3 className="font-bold text-sm text-chord-text truncate">
          {title}
        </h3>
        <div className="flex items-center mt-1">
          {description ? (
            <p className="text-xs text-chord-text/70 truncate">
              {description}
            </p>
          ) : (
            <>
              <p className="text-xs text-chord-text/70">
                {creator}
              </p>
              {tracksCount && (
                <>
                  <span className="text-chord-text/30 mx-1">•</span>
                  <div className="flex items-center text-xs text-chord-text/70">
                    <Music size={10} className="mr-1" />
                    {tracksCount}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PlaylistCard;
