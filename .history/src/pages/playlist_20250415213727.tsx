
import { useParams } from "react-router-dom";
import Layout from "@/components/layout";
import { PlayIcon, ShuffleIcon, HeartIcon, ClockIcon, MoreHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import TrackItem from "@/components/track-item";
import { mockSongs, Song, usePlayer } from "@/contexts/PlayerContext";

const Playlist = () => {
  const { id } = useParams<{ id: string }>();
  const { playSong } = usePlayer();

  // Placeholder data with more realistic track counts based on id
  const playlistData: Record<string, any> = {
    "top-hits": {
      title: "TIDAL's Top Hits",
      description: "The biggest hits, curated by TIDAL's music team.",
      creator: "TIDAL",
      imageUrl: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png",
      tracksCount: 100
    },
    "pop-hits": {
      title: "Pop Hits",
      description: "The latest and greatest in pop music.",
      creator: "TIDAL",
      imageUrl: "/lovable-uploads/81d39118-ff63-460e-993d-275178cd6c40.png",
      tracksCount: 48
    },
    "rock-classics": {
      title: "Rock Classics",
      description: "Timeless rock anthems that never get old.",
      creator: "TIDAL",
      imageUrl: "/lovable-uploads/00e244a7-d659-4312-befb-52b043a87ce6.png",
      tracksCount: 50
    },
    "rnb-favorites": {
      title: "R&B Favorites",
      description: "Smooth R&B hits for any occasion.",
      creator: "TIDAL",
      imageUrl: "/lovable-uploads/a910c028-5947-4358-b83a-240ed8a516ca.png",
      tracksCount: 35
    },
    "hip-hop-mix": {
      title: "Hip Hop Mix",
      description: "The best hip hop tracks all in one place.",
      creator: "TIDAL",
      imageUrl: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png",
      tracksCount: 30
    }
  };

  const playlist = playlistData[id || ""] || {
    id: id || "unknown",
    title: "Playlist",
    description: "A collection of tracks.",
    creator: "User",
    imageUrl: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png",
    createdAt: "Updated Apr 2, 2024",
    tracksCount: 20
  };

  // Generate playlist tracks (would normally come from backend)
  const tracks: Song[] = mockSongs.map((song) => ({
    ...song,
    id: `playlist-${id}-song-${song.id}`,
  }));

  const handlePlayPlaylist = () => {
    if (tracks.length > 0) {
      playSong(tracks[0], tracks);
    }
  };

  const handleShufflePlaylist = () => {
    if (tracks.length > 0) {
      // Get a random song from the playlist
      const randomIndex = Math.floor(Math.random() * tracks.length);
      playSong(tracks[randomIndex], tracks);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row mb-8">
        <div className="lg:w-[300px] flex-shrink-0 mb-6 lg:mb-0 lg:mr-8">
          <div className="aspect-square bg-chord-gray rounded-md overflow-hidden">
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
            <span>{playlist.createdAt || "Updated recently"}</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              className="bg-white hover:bg-white/90 text-black font-medium px-8 rounded-full"
              onClick={handlePlayPlaylist}
            >
              <PlayIcon size={18} className="mr-2" />
              Play
            </Button>
            <Button 
              variant="outline" 
              className="border-zinc-600 hover:border-white bg-transparent text-white hover:bg-chord-hover rounded-full"
              onClick={handleShufflePlaylist}
            >
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
            key={track.id}
            id={track.id}
            title={track.title}
            artist={track.artist}
            duration={track.duration}
            explicit={track.explicit}
            index={index + 1}
            audioUrl={track.audioUrl}
            imageUrl={track.imageUrl}
            songs={tracks}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Playlist;
