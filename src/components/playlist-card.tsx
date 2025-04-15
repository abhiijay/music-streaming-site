
import { useState } from "react";
import { cn } from "@/lib/utils";
import { PlayIcon } from "lucide-react";
import { Link } from "react-router-dom";

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
      <div className="relative track-card mb-3">
        <div className={cn(
          "relative bg-tidal-gray rounded-md overflow-hidden",
          variant === "small" ? "w-full aspect-square" : "w-full aspect-square"
        )}>
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          <div className={cn(
            "absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
          )}>
            <button 
              className={cn(
                "play-button bg-white rounded-full p-3 opacity-0 transform translate-y-4 transition-all duration-200",
                isHovered ? "opacity-100 translate-y-0" : ""
              )}
            >
              <PlayIcon className="h-5 w-5 text-black" />
            </button>
          </div>
        </div>
        <div className="mt-2">
          <h3 className="text-sm font-medium text-white truncate">{title}</h3>
          {description && (
            <p className="text-xs text-zinc-400 truncate mt-1">{description}</p>
          )}
          <div className="flex items-center mt-1 text-xs text-zinc-400">
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
