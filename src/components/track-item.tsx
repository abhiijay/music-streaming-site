
import { Play, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface TrackItemProps {
  title: string;
  artist: string;
  duration: string;
  explicit?: boolean;
  imageUrl?: string;
  index?: number;
  showIndex?: boolean;
  showImage?: boolean;
  showHeart?: boolean;
}

const TrackItem = ({
  title,
  artist,
  duration,
  explicit = false,
  imageUrl,
  index,
  showIndex = true,
  showImage = false,
  showHeart = true,
}: TrackItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group grid grid-cols-[auto,1fr,auto] md:grid-cols-[auto,1fr,auto,auto] gap-4 px-4 py-2 rounded-md hover:bg-tidal-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showIndex && index && (
        <div className="flex items-center justify-center w-6 text-sm text-zinc-400">
          {isHovered ? (
            <button className="text-white hover:text-tidal-blue">
              <Play size={15} fill="currentColor" />
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
          <span className="text-sm font-medium text-white truncate">{title}</span>
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
