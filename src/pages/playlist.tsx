
import { useParams } from "react-router-dom";
import Layout from "@/components/layout";
import { PlayIcon, ShuffleIcon, HeartIcon, ClockIcon, MoreHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import TrackItem from "@/components/track-item";

const Playlist = () => {
  const { id } = useParams<{ id: string }>();

  // Placeholder data
  const playlist = {
    id: id || "top-hits",
    title: "TIDAL's Top Hits",
    description: "The biggest hits, curated by TIDAL's music team.",
    creator: "TIDAL",
    imageUrl: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png",
    createdAt: "Updated Apr 2, 2024",
    tracksCount: 100
  };

  const tracks = Array(20).fill(null).map((_, i) => ({
    title: i === 0 ? "NOKIA" : `Track ${i + 1}`,
    artist: i === 0 ? "Drake" : `Artist ${i + 1}`,
    duration: "3:02",
    explicit: Math.random() > 0.5
  }));

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row mb-8">
        <div className="lg:w-[300px] flex-shrink-0 mb-6 lg:mb-0 lg:mr-8">
          <div className="aspect-square bg-tidal-gray rounded-md overflow-hidden">
            <img
              src={playlist.imageUrl}
              alt={playlist.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-white mb-2">{playlist.title}</h1>
          <p className="text-zinc-400 mb-4">{playlist.description}</p>
          <div className="flex items-center text-sm text-zinc-400 mb-6">
            <span>Created by {playlist.creator}</span>
            <span className="mx-2">•</span>
            <span>{playlist.tracksCount} tracks</span>
            <span className="mx-2">•</span>
            <span>{playlist.createdAt}</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button className="bg-white hover:bg-white/90 text-black font-medium px-8 rounded-full">
              <PlayIcon size={18} className="mr-2" />
              Play
            </Button>
            <Button variant="outline" className="border-zinc-600 hover:border-white bg-transparent text-white hover:bg-tidal-hover rounded-full">
              <ShuffleIcon size={18} className="mr-2" />
              Shuffle
            </Button>
            <Button variant="ghost" className="text-zinc-400 hover:text-white">
              <HeartIcon size={20} />
            </Button>
            <Button variant="ghost" className="text-zinc-400 hover:text-white">
              <MoreHorizontalIcon size={20} />
            </Button>
          </div>
        </div>
      </div>

      <div className="border-b border-zinc-800 pb-2 mb-2">
        <div className="grid grid-cols-[auto,1fr,auto] md:grid-cols-[auto,1fr,auto,auto] gap-4 px-4 text-xs uppercase text-zinc-500">
          <div className="w-6 text-center">#</div>
          <div>Title</div>
          <div className="hidden md:block">
            <HeartIcon size={14} />
          </div>
          <div className="flex items-center">
            <ClockIcon size={14} />
          </div>
        </div>
      </div>

      <div>
        {tracks.map((track, index) => (
          <TrackItem
            key={index}
            title={track.title}
            artist={track.artist}
            duration={track.duration}
            explicit={track.explicit}
            index={index + 1}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Playlist;
