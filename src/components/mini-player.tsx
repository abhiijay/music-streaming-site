
import { PlayIcon, PauseIcon, SkipForwardIcon, SkipBackIcon } from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { extractDominantColor, withOpacity } from "@/utils/colorUtils";

const MiniPlayer = () => {
  const { currentSong, isPlaying, togglePlayPause, nextSong, previousSong } = usePlayer();
  const [dominantColor, setDominantColor] = useState<string | null>(null);
  
  // Extract dominant color from current song if available
  useEffect(() => {
    if (currentSong?.imageUrl) {
      extractDominantColor(currentSong.imageUrl)
        .then(color => {
          setDominantColor(color);
        })
        .catch(err => {
          console.error("Error extracting color:", err);
        });
    }
  }, [currentSong]);
  
  if (!currentSong) return null;
  
  // Dynamic background style based on dominant color
  const dynamicBgStyle = dominantColor ? {
    background: `${withOpacity(dominantColor, 0.85)}`,
    backdropFilter: "blur(10px)"
  } : {};
  
  return (
    <div 
      className="fixed top-16 right-4 max-w-xs w-full shadow-lg rounded-full z-30 animate-fade-in player-dynamic-bg glass"
      style={dominantColor ? dynamicBgStyle : {}}
    >
      <div className="flex items-center p-2">
        <div className="album-art-container mr-2">
          <img 
            src={currentSong.imageUrl}
            alt={currentSong.title}
            className="w-8 h-8 rounded-full object-cover album-art"
          />
        </div>
        
        <div className="flex-1 min-w-0 mr-3">
          <p className="text-xs font-bold truncate text-chord-text">
            {currentSong.title}
          </p>
          <p className="text-[10px] truncate text-chord-text/80">
            {currentSong.artist}
          </p>
        </div>
        
        <div className="flex items-center space-x-1">
          <button 
            className="p-1 transition-all duration-200 hover:scale-110 text-chord-text/70 hover:text-chord-text"
            onClick={previousSong}
          >
            <SkipBackIcon size={15} />
          </button>
          
          <button
            onClick={togglePlayPause}
            className="rounded-full p-1 transition-all duration-300 bg-chord-red text-chord-text hover:bg-chord-red/90 hover:shadow-[0_0_10px_rgba(194,1,20,0.5)]"
          >
            {isPlaying ? <PauseIcon size={15} /> : <PlayIcon size={15} />}
          </button>
          
          <button 
            className="p-1 transition-all duration-200 hover:scale-110 text-chord-text/70 hover:text-chord-text"
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
