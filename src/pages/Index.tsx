
import Layout from "@/components/layout";
import TrackItem from "@/components/track-item";
import PlaylistCard from "@/components/playlist-card";
import SectionHeader from "@/components/section-header";
import { mockSongs, Song } from "@/contexts/PlayerContext";
import { Button } from "@/components/ui/button";
import { ChevronRight, Disc, Headphones, Radio, TrendingUp } from "lucide-react";

const Index = () => {
  const playlists = [
    {
      id: "top-hits",
      title: "Chord's Top Hits",
      imageUrl: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png",
      creator: "Chord",
      tracksCount: 100
    },
    {
      id: "pop-hits",
      title: "Pop Hits",
      imageUrl: "/lovable-uploads/81d39118-ff63-460e-993d-275178cd6c40.png",
      creator: "Chord",
      tracksCount: 48
    },
    {
      id: "rock-classics",
      title: "Rock Classics",
      imageUrl: "/lovable-uploads/00e244a7-d659-4312-befb-52b043a87ce6.png",
      creator: "Chord",
      tracksCount: 50
    },
    {
      id: "rnb-favorites",
      title: "Country Hits",
      imageUrl: "/lovable-uploads/a910c028-5947-4358-b83a-240ed8a516ca.png",
      creator: "Chord",
      tracksCount: 35
    },
    {
      id: "hip-hop-mix",
      title: "Rap Hits",
      imageUrl: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png",
      creator: "Chord",
      tracksCount: 30
    }
  ];

  const newTracks: Song[] = mockSongs;

  const newAlbums = [
    {
      id: "1",
      title: "People's Instinctive...",
      imageUrl: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png",
      description: "A Tribe Called Quest",
      tracksCount: 14
    },
    {
      id: "2",
      title: "SABLE TABLE",
      imageUrl: "/lovable-uploads/00e244a7-d659-4312-befb-52b043a87ce6.png",
      description: "Bon Iver",
      tracksCount: 10
    },
    {
      id: "3",
      title: "Album of the Year...",
      imageUrl: "/lovable-uploads/81d39118-ff63-460e-993d-275178cd6c40.png",
      description: "Boesey Collins",
      tracksCount: 8
    },
    {
      id: "4",
      title: "...And What Was Left?",
      imageUrl: "/lovable-uploads/a910c028-5947-4358-b83a-240ed8a516ca.png",
      description: "Muscadine Bloodline",
      tracksCount: 12
    }
  ];

  // Categories for quick navigation
  const categories = [
    { name: "Trending", icon: <TrendingUp size={18} className="mr-2 text-chord-red" />, path: "/trending" },
    { name: "New Releases", icon: <Disc size={18} className="mr-2 text-chord-red" />, path: "/new-releases" },
    { name: "Stations", icon: <Radio size={18} className="mr-2 text-chord-red" />, path: "/stations" },
    { name: "Podcasts", icon: <Headphones size={18} className="mr-2 text-chord-red" />, path: "/podcasts" },
  ];

  return (
    <Layout>
      {/* Categories section */}
      <section className="mb-12">
        <div className="flex items-center justify-center gap-4 mt-2">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant="ghost"
              className="bg-chord-bg border border-white/5 hover:bg-chord-hover hover:border-chord-red/30 px-6 py-5"
              onClick={() => window.location.href = category.path}
            >
              <div className="flex items-center">
                {category.icon}
                <span className="font-bold">{category.name}</span>
              </div>
            </Button>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <SectionHeader title="The Hits" seeAllLink="/playlists" />
        <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              id={playlist.id}
              title={playlist.title}
              imageUrl={playlist.imageUrl}
              tracksCount={playlist.tracksCount}
              creator={playlist.creator}
            />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <SectionHeader title="New Tracks" seeAllLink="/playlists/new-tracks" showControls />
        <div className="bg-chord-hover/30 rounded-lg overflow-hidden border border-white/5">
          {newTracks.map((track, index) => (
            <TrackItem
              key={track.id}
              id={track.id}
              title={track.title}
              artist={track.artist}
              duration={track.duration}
              explicit={track.explicit}
              index={index + 1}
              showImage={false}
              audioUrl={track.audioUrl}
              imageUrl={track.imageUrl}
              songs={newTracks}
            />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <SectionHeader title="New Albums" seeAllLink="/albums" showControls />
        <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {newAlbums.map((album) => (
            <PlaylistCard
              key={album.id}
              id={album.id}
              title={album.title}
              imageUrl={album.imageUrl}
              description={album.description}
              tracksCount={album.tracksCount}
            />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <SectionHeader title="From our editors" seeAllLink="/playlists/editors-picks" showControls />
        <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {playlists.slice(0, 5).map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              id={playlist.id}
              title={playlist.title}
              imageUrl={playlist.imageUrl}
              tracksCount={playlist.tracksCount}
              creator={playlist.creator}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
