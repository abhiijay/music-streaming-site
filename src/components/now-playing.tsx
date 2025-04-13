
import { useState, useEffect } from "react";
import { 
  PlayIcon, 
  PauseIcon, 
  SkipBackIcon, 
  SkipForwardIcon, 
  RepeatIcon, 
  ShuffleIcon, 
  Volume2Icon,
  VolumeXIcon,
  Volume1Icon,
  Maximize2Icon
} from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

const NowPlaying = () => {
  const { 
    currentSong, 
    isPlaying, 
    volume, 
    currentTime, 
    duration,
    repeatMode,
    shuffleMode,
    togglePlayPause, 
    nextSong, 
    previousSong, 
    seek,
    setVolume,
    toggleRepeat,
    toggleShuffle
  } = usePlayer();
  
  const [showFullscreen, setShowFullscreen] = useState(false);
  
  // Format time in MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Get the appropriate volume icon based on volume level
  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeXIcon size={18} />;
    if (volume < 0.5) return <Volume1Icon size={18} />;
    return <Volume2Icon size={18} />;
  };

  // Handle volume toggle mute/unmute
  const [previousVolume, setPreviousVolume] = useState(volume);
  
  const toggleMute = () => {
    if (volume > 0) {
      setPreviousVolume(volume);
      setVolume(0);
    } else {
      setVolume(previousVolume);
    }
  };

  // Calculate progress percentage
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  
  // Toggle fullscreen player
  const toggleFullscreen = () => {
    setShowFullscreen(!showFullscreen);
  };
  
  // If no song is playing, show a simplified player
  if (!currentSong) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-zinc-900 border-t border-zinc-800 flex items-center px-4 z-30">
        <div className="w-full text-center text-zinc-500">
          No track selected
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Normal player */}
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-zinc-900 border-t border-zinc-800 flex items-center px-4 z-30">
        <div className="flex items-center flex-1 max-w-[240px]">
          <Link to={`/album/${currentSong.id}`}>
            <img
              src={currentSong.imageUrl}
              alt="Album cover"
              className="h-12 w-12 mr-3 rounded-sm hover:opacity-80 transition-opacity"
            />
          </Link>
          <div className="mr-4">
            <h4 className="text-sm font-medium text-white truncate">{currentSong.title}</h4>
            <p className="text-xs text-zinc-400 truncate">{currentSong.artist}</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center flex-1">
          <div className="flex items-center mb-2">
            <button 
              className={cn(
                "text-zinc-400 hover:text-white mx-2",
                shuffleMode && "text-tidal-blue"
              )}
              onClick={toggleShuffle}
            >
              <ShuffleIcon size={18} />
            </button>
            <button 
              className="text-zinc-400 hover:text-white mx-2"
              onClick={previousSong}
            >
              <SkipBackIcon size={18} />
            </button>
            <button
              onClick={togglePlayPause}
              className="bg-white text-black rounded-full p-1 mx-2 hover:bg-zinc-200"
            >
              {isPlaying ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
            </button>
            <button 
              className="text-zinc-400 hover:text-white mx-2"
              onClick={nextSong}
            >
              <SkipForwardIcon size={18} />
            </button>
            <button 
              className={cn(
                "text-zinc-400 hover:text-white mx-2",
                repeatMode !== "off" && "text-tidal-blue"
              )}
              onClick={toggleRepeat}
            >
              <RepeatIcon size={18} />
              {repeatMode === "one" && <span className="absolute text-[10px] ml-[6px] mt-[2px]">1</span>}
            </button>
          </div>
          
          <div className="flex items-center w-full max-w-xl">
            <span className="text-xs text-zinc-400 w-10 text-right mr-2">
              {formatTime(currentTime)}
            </span>
            <div 
              className="flex-1 h-1 bg-zinc-700 rounded-full cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                seek(pos * duration);
              }}
            >
              <div 
                className="h-full bg-white rounded-full" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <span className="text-xs text-zinc-400 w-10 ml-2">
              {formatTime(duration)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-end flex-1 max-w-[240px]">
          <button 
            className="text-zinc-400 hover:text-white mx-2"
            onClick={toggleMute}
          >
            {getVolumeIcon()}
          </button>
          <div className="w-20">
            <Slider
              value={[volume * 100]}
              min={0}
              max={100}
              step={1}
              onValueChange={(value) => setVolume(value[0] / 100)}
              className="h-1"
            />
          </div>
          <button 
            className="text-zinc-400 hover:text-white ml-4"
            onClick={toggleFullscreen}
          >
            <Maximize2Icon size={18} />
          </button>
        </div>
      </div>
      
      {/* Fullscreen player */}
      {showFullscreen && (
        <div className="fixed inset-0 bg-zinc-900/95 z-50 flex flex-col justify-center items-center p-6">
          <button 
            className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            onClick={toggleFullscreen}
          >
            <Maximize2Icon size={24} />
          </button>
          
          <div className="max-w-2xl w-full flex flex-col items-center">
            <div className="w-full max-w-md aspect-square mb-8">
              <img 
                src={currentSong.imageUrl}
                alt={currentSong.title}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            
            <div className="w-full text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">{currentSong.title}</h2>
              <p className="text-lg text-zinc-400">{currentSong.artist}</p>
            </div>
            
            <div className="w-full mb-6">
              <div className="flex items-center justify-between w-full mb-2">
                <span className="text-sm text-zinc-400">{formatTime(currentTime)}</span>
                <span className="text-sm text-zinc-400">{formatTime(duration)}</span>
              </div>
              
              <div 
                className="w-full h-1.5 bg-zinc-700 rounded-full cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = (e.clientX - rect.left) / rect.width;
                  seek(pos * duration);
                }}
              >
                <div 
                  className="h-full bg-white rounded-full" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-8">
              <button 
                className={cn(
                  "text-zinc-400 hover:text-white",
                  shuffleMode && "text-tidal-blue"
                )}
                onClick={toggleShuffle}
              >
                <ShuffleIcon size={24} />
              </button>
              <button 
                className="text-zinc-400 hover:text-white"
                onClick={previousSong}
              >
                <SkipBackIcon size={24} />
              </button>
              <button
                onClick={togglePlayPause}
                className="bg-white text-black rounded-full p-3 hover:bg-zinc-200"
              >
                {isPlaying ? <PauseIcon size={30} /> : <PlayIcon size={30} />}
              </button>
              <button 
                className="text-zinc-400 hover:text-white"
                onClick={nextSong}
              >
                <SkipForwardIcon size={24} />
              </button>
              <button 
                className={cn(
                  "text-zinc-400 hover:text-white",
                  repeatMode !== "off" && "text-tidal-blue"
                )}
                onClick={toggleRepeat}
              >
                <RepeatIcon size={24} />
                {repeatMode === "one" && <span className="absolute text-xs ml-[10px] mt-[4px]">1</span>}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NowPlaying;
