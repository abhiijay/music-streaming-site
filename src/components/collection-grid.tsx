
import React from "react";
import { cn } from "@/lib/utils";
import { PlayIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface CollectionItemProps {
  id: string;
  title: string;
  imageUrl: string;
  linkTo: string;
  description?: string;
  tracksCount?: number;
  creator?: string;
  isSmall?: boolean;
  onPlay?: () => void;
}

const CollectionItem = ({
  id,
  title,
  imageUrl,
  linkTo,
  description,
  tracksCount,
  creator,
  isSmall = false,
  onPlay
}: CollectionItemProps) => {
  return (
    <div className="group">
      <div className="bg-mq-navy/30 rounded-lg overflow-hidden p-4 hover-lift">
        <Link to={linkTo} className="block">
          <div className={cn(
            "overflow-hidden rounded-md mb-3 relative",
            isSmall ? "aspect-square" : "aspect-square"
          )}>
            <img 
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
              {onPlay && (
                <button 
                  className="bg-mq-orange text-white p-3 rounded-full transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-mq-red"
                  onClick={(e) => {
                    e.preventDefault();
                    onPlay();
                  }}
                >
                  <PlayIcon size={20} />
                </button>
              )}
            </div>
          </div>
        </Link>
        <h3 className="font-medium text-white group-hover:text-mq-yellow transition-all duration-200 truncate">
          <Link to={linkTo}>{title}</Link>
        </h3>
        {description && (
          <p className="text-zinc-400 text-sm truncate">{description}</p>
        )}
        {(tracksCount || creator) && (
          <p className="text-zinc-500 text-xs mt-1">
            {creator && <span>{creator}</span>}
            {creator && tracksCount && <span> • </span>}
            {tracksCount && <span>{tracksCount} tracks</span>}
          </p>
        )}
      </div>
    </div>
  );
};

interface CollectionGridProps {
  title: string;
  items: Array<{
    id: string;
    title: string;
    imageUrl: string;
    description?: string;
    tracksCount?: number;
    creator?: string;
  }>;
  type: "albums" | "playlists" | "artists";
  isLoading?: boolean;
}

const CollectionGrid = ({ title, items, type, isLoading = false }: CollectionGridProps) => {
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">{title}</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="bg-mq-navy/30 rounded-lg p-4">
              <div className="aspect-square bg-zinc-800 rounded-md animate-pulse mb-3" />
              <div className="h-4 bg-zinc-800 rounded-sm animate-pulse w-3/4 mb-2" />
              <div className="h-3 bg-zinc-800/60 rounded-sm animate-pulse w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">{title}</h1>
        <div className="bg-mq-navy/30 rounded-lg p-8 text-center">
          <p className="text-zinc-400">No items found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {items.map((item) => (
          <CollectionItem
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
            description={item.description}
            tracksCount={item.tracksCount}
            creator={item.creator}
            linkTo={`/${type === "artists" ? "artist" : type === "albums" ? "album" : "playlist"}/${item.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export { CollectionGrid, CollectionItem };
