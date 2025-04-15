
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Layout from "@/components/layout";
import PlaylistCard from "@/components/playlist-card";
import TrackItem from "@/components/track-item";
import { mockSongs } from "@/contexts/PlayerContext";

const Collection = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.pathname.includes('favorites') ? 'favorites' : 'playlists'
  );
  
  // Mock playlist data
  const playlists = [
    {
      id: "playlist-1",
      title: "My Favorites",
      imageUrl: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png",
      description: "Your favorite tracks",
      tracksCount: 25
    },
    {
      id: "playlist-2",
      title: "Workout Mix",
      imageUrl: "/lovable-uploads/00e244a7-d659-4312-befb-52b043a87ce6.png",
      description: "Get energized",
      tracksCount: 18
    },
    {
      id: "playlist-3",
      title: "Chill Vibes",
      imageUrl: "/lovable-uploads/81d39118-ff63-460e-993d-275178cd6c40.png",
      description: "Relax and unwind",
      tracksCount: 20
    },
    {
      id: "playlist-4",
      title: "Driving Playlist",
      imageUrl: "/lovable-uploads/a910c028-5947-4358-b83a-240ed8a516ca.png",
      description: "For the road",
      tracksCount: 15
    },
    {
      id: "top-hits",
      title: "TIDAL's Top Hits",
      imageUrl: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png",
      description: "The biggest hits right now",
      tracksCount: 100
    }
  ];

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">My Collection</h1>
        
        <div className="flex border-b border-zinc-800 mb-8">
          <Link
            to="/collection/playlists"
            onClick={() => setActiveTab('playlists')}
            className={`pb-2 px-4 text-sm font-medium ${
              activeTab === 'playlists' 
                ? 'text-white border-b-2 border-white' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Playlists
          </Link>
          <Link
            to="/collection/favorites"
            onClick={() => setActiveTab('favorites')}
            className={`pb-2 px-4 text-sm font-medium ${
              activeTab === 'favorites' 
                ? 'text-white border-b-2 border-white' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Favorites
          </Link>
        </div>
        
        {activeTab === 'playlists' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {playlists.map(playlist => (
              <PlaylistCard
                key={playlist.id}
                id={playlist.id}
                title={playlist.title}
                imageUrl={playlist.imageUrl}
                description={playlist.description}
                tracksCount={playlist.tracksCount}
              />
            ))}
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">Favorite Tracks</h2>
            <div className="bg-chord-darkgray rounded-md overflow-hidden">
              {mockSongs.map((track, index) => (
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
                  songs={mockSongs}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Collection;
