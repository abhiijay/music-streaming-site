
import { PlayIcon, PauseIcon, SkipForwardIcon, SkipBackIcon } from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { extractDominantColor, withOpacity } from "@/utils/colorUtils";

interface MiniPlayerProps {
  theme?: "dark" | "light";
}

const MiniPlayer = ({ theme = "dark" }: MiniPlayerProps) => {
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
    background: `${withOpacity(dominantColor, theme === "dark" ? 0.85 : 0.65)}`,
    backdropFilter: "blur(10px)"
  } : {};
  
  return (
    <div 
      className={cn(
        "fixed top-16 right-4 max-w-xs w-full shadow-lg rounded-full z-30 animate-fade-in player-dynamic-bg",
        theme === "dark" ? "glass text-white" : "bg-white/80 text-mq-navy shadow-md"
      )}
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
          <p className={cn(
            "text-xs font-medium truncate",
            theme === "dark" ? "text-white" : "text-mq-navy"
          )}>
            {currentSong.title}
          </p>
          <p className={cn(
            "text-[10px] truncate",
            theme === "dark" ? "text-zinc-300" : "text-mq-navy/70"
          )}>
            {currentSong.artist}
          </p>
        </div>
        
        <div className="flex items-center space-x-1">
          <button 
            className={cn(
              "p-1 transition-all duration-200 hover:scale-110",
              theme === "dark" ? "text-zinc-300 hover:text-mq-yellow" : "text-zinc-500 hover:text-mq-red"
            )}
            onClick={previousSong}
          >
            <SkipBackIcon size={15} />
          </button>
          
          <button
            onClick={togglePlayPause}
            className={cn(
              "rounded-full p-1 transition-all duration-300",
              theme === "dark" 
                ? "bg-mq-red text-white hover:bg-mq-red/90 hover:shadow-[0_0_10px_rgba(214,40,40,0.5)]" 
                : "bg-mq-red text-white hover:bg-mq-red/90 hover:scale-105"
            )}
          >
            {isPlaying ? <PauseIcon size={15} /> : <PlayIcon size={15} />}
          </button>
          
          <button 
            className={cn(
              "p-1 transition-all duration-200 hover:scale-110",
              theme === "dark" ? "text-zinc-300 hover:text-mq-yellow" : "text-zinc-500 hover:text-mq-red"
            )}
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
