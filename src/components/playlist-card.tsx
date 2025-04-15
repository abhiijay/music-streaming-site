
import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePlayer } from "@/contexts/PlayerContext";

interface PlaylistCardProps {
  id: string;
  title: string;
  imageUrl: string;
  description?: string;
  tracksCount?: number;
  creator?: string;
  songs?: Array<{
    id: string;
    title: string;
    artist: string;
    duration: number;
    audioUrl: string;
    imageUrl: string;
    explicit?: boolean;
  }>;
}

const PlaylistCard = ({ 
  id, 
  title, 
  imageUrl, 
  description, 
  tracksCount,
  creator,
  songs
}: PlaylistCardProps) => {
  const navigate = useNavigate();
  const { playSong } = usePlayer();
  
  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (songs && songs.length > 0) {
      playSong(songs[0], songs);
    }
  };
  
  const handleClick = () => {
    navigate(`/playlist/${id}`);
  };
  
  return (
    <div 
      className="group relative bg-chord-hover/30 rounded-lg overflow-hidden transition-all duration-300 hover:bg-chord-hover cursor-pointer"
      onClick={handleClick}
    >
      <div className="aspect-square overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-chord-bg to-transparent p-3">
        <h3 className="text-chord-text font-bold line-clamp-1">{title}</h3>
        {description && (
          <p className="text-chord-text/70 text-sm line-clamp-1">{description}</p>
        )}
        {(creator || tracksCount) && (
          <div className="text-chord-text/70 text-xs mt-1">
            {creator && <span>{creator}</span>}
            {creator && tracksCount && <span className="mx-1">•</span>}
            {tracksCount && <span>{tracksCount} tracks</span>}
          </div>
        )}
      </div>
      <button 
        className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 bg-chord-red text-chord-text rounded-full p-2 shadow-lg transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 hover:scale-105 z-10"
        onClick={handlePlay}
        aria-label="Play"
      >
        <Play size={16} fill="currentColor" />
      </button>
    </div>
  );
};

export default PlaylistCard;
