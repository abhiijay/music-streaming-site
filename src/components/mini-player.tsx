
import { PlayIcon, PauseIcon, SkipForwardIcon, SkipBackIcon } from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";
import { cn } from "@/lib/utils";

const MiniPlayer = () => {
  const { currentSong, isPlaying, togglePlayPause, nextSong, previousSong } = usePlayer();
  
  if (!currentSong) return null;
  
  return (
    <div className="fixed top-16 right-4 max-w-xs w-full glass shadow-lg rounded-full z-30 animate-fade-in">
      <div className="flex items-center p-2">
        <img 
          src={currentSong.imageUrl}
          alt={currentSong.title}
          className="w-8 h-8 rounded-full object-cover mr-2"
        />
        
        <div className="flex-1 min-w-0 mr-3">
          <p className="text-xs font-medium text-white truncate">{currentSong.title}</p>
          <p className="text-[10px] text-zinc-400 truncate">{currentSong.artist}</p>
        </div>
        
        <div className="flex items-center space-x-1">
          <button 
            className="text-zinc-400 hover:text-white p-1 transition-colors duration-200"
            onClick={previousSong}
          >
            <SkipBackIcon size={15} />
          </button>
          
          <button
            onClick={togglePlayPause}
            className={cn(
              "bg-white text-black rounded-full p-1 transition-all duration-300",
              isPlaying ? "hover:bg-zinc-200" : "hover:bg-zinc-200 hover:scale-105"
            )}
          >
            {isPlaying ? <PauseIcon size={15} /> : <PlayIcon size={15} />}
          </button>
          
          <button 
            className="text-zinc-400 hover:text-white p-1 transition-colors duration-200"
            onClick={nextSong}
          >
            <SkipForwardIcon size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;
