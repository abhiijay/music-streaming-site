
import { useState } from "react";
import { 
  PlayIcon, 
  PauseIcon, 
  SkipBackIcon, 
  SkipForwardIcon, 
  RepeatIcon, 
  ShuffleIcon, 
  VolumeIcon,
  ExpandIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

const NowPlaying = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const duration = 180; // 3 minutes in seconds
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-zinc-900 border-t border-zinc-800 flex items-center px-4 z-30">
      <div className="flex items-center flex-1 max-w-[240px]">
        <img
          src="/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png"
          alt="Album cover"
          className="h-12 w-12 mr-3 rounded-sm"
        />
        <div className="mr-4">
          <h4 className="text-sm font-medium text-white truncate">NOKIA</h4>
          <p className="text-xs text-zinc-400 truncate">Drake</p>
        </div>
      </div>
      
      <div className="flex flex-col items-center flex-1">
        <div className="flex items-center mb-2">
          <button className="text-zinc-400 hover:text-white mx-2">
            <ShuffleIcon size={18} />
          </button>
          <button className="text-zinc-400 hover:text-white mx-2">
            <SkipBackIcon size={18} />
          </button>
          <button
            onClick={togglePlayPause}
            className="bg-white text-black rounded-full p-1 mx-2 hover:bg-zinc-200"
          >
            {isPlaying ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
          </button>
          <button className="text-zinc-400 hover:text-white mx-2">
            <SkipForwardIcon size={18} />
          </button>
          <button className="text-zinc-400 hover:text-white mx-2">
            <RepeatIcon size={18} />
          </button>
        </div>
        
        <div className="flex items-center w-full max-w-xl">
          <span className="text-xs text-zinc-400 w-10 text-right">0:00</span>
          <div className="flex-1 mx-2 h-1 bg-zinc-700 rounded-full">
            <div className="h-full bg-white rounded-full" style={{ width: `${(currentTime / duration) * 100}%` }}></div>
          </div>
          <span className="text-xs text-zinc-400 w-10">3:00</span>
        </div>
      </div>
      
      <div className="flex items-center justify-end flex-1 max-w-[240px]">
        <button className="text-zinc-400 hover:text-white mx-2">
          <VolumeIcon size={18} />
        </button>
        <div className="w-20 h-1 bg-zinc-700 rounded-full mx-2">
          <div className="h-full bg-white rounded-full" style={{ width: '70%' }}></div>
        </div>
        <button className="text-zinc-400 hover:text-white ml-4">
          <ExpandIcon size={18} />
        </button>
      </div>
    </div>
  );
};

export default NowPlaying;
