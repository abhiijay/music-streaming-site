
import { useParams } from "react-router-dom";
import Layout from "@/components/layout";
import { PlayIcon, ShuffleIcon, HeartIcon, ClockIcon, MoreHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import TrackItem from "@/components/track-item";
import { mockSongs, Song, usePlayer } from "@/contexts/PlayerContext";

const Album = () => {
  const { id } = useParams<{ id: string }>();
  const { playSong } = usePlayer();

  // Get album data based on the song id
  const song = mockSongs.find(song => song.id === id);
  
  // Placeholder data
  const album = {
    id: id || "album-1",
    title: song?.title || "Unknown Album",
    artist: song?.artist || "Unknown Artist",
    releaseYear: "2024",
    imageUrl: song?.imageUrl || "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png",
    description: "Album by " + (song?.artist || "Unknown Artist"),
    tracksCount: 12
  };

  // Create album tracks based on the mock song
  const tracks: Song[] = mockSongs.map((mockSong, i) => ({
    ...mockSong,
    id: `album-${id}-track-${i + 1}`,
  }));

  const handlePlayAlbum = () => {
    if (tracks.length > 0) {
      playSong(tracks[0], tracks);
    }
  };

  const handleShuffleAlbum = () => {
    if (tracks.length > 0) {
      // Get a random song from the album
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
              src={album.imageUrl}
              alt={album.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-zinc-400 mb-1">Album</span>
          <h1 className="text-3xl font-bold text-white mb-2">{album.title}</h1>
          <p className="text-zinc-400 mb-4">{album.description}</p>
          <div className="flex items-center text-sm text-zinc-400 mb-6">
            <span>By {album.artist}</span>
            <span className="mx-2">•</span>
            <span>{album.releaseYear}</span>
            <span className="mx-2">•</span>
            <span>{album.tracksCount} tracks</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              className="bg-white hover:bg-white/90 text-black font-medium px-8 rounded-full"
              onClick={handlePlayAlbum}
            >
              <PlayIcon size={18} className="mr-2" />
              Play
            </Button>
            <Button 
              variant="outline" 
              className="border-zinc-600 hover:border-white bg-transparent text-white hover:bg-chord-hover rounded-full"
              onClick={handleShuffleAlbum}
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
            explicit={Math.random() > 0.5}
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

export default Album;
