
import Layout from "@/components/layout";
import TrackItem from "@/components/track-item";
import PlaylistCard from "@/components/playlist-card";
import SectionHeader from "@/components/section-header";
import { mockSongs } from "@/contexts/PlayerContext";
import { Radio, Disc, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const trendingPlaylists = [
    {
      id: "trending-1",
      title: "Hot Right Now",
      imageUrl: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png",
      creator: "Chord",
      tracksCount: 50
    },
    {
      id: "trending-2",
      title: "Viral Hits",
      imageUrl: "/lovable-uploads/81d39118-ff63-460e-993d-275178cd6c40.png",
      creator: "Chord",
      tracksCount: 40
    },
    {
      id: "trending-3",
      title: "Charts: Top 50",
      imageUrl: "/lovable-uploads/00e244a7-d659-4312-befb-52b043a87ce6.png",
      creator: "Chord",
      tracksCount: 50
    }
  ];

  const newReleases = [
    {
      id: "new-1",
      title: "Latest Hits",
      imageUrl: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png",
      creator: "Chord",
      tracksCount: 30
    },
    {
      id: "new-2",
      title: "Fresh Finds",
      imageUrl: "/lovable-uploads/a910c028-5947-4358-b83a-240ed8a516ca.png",
      creator: "Chord",
      tracksCount: 25
    },
    {
      id: "new-3",
      title: "New This Week",
      imageUrl: "/lovable-uploads/81d39118-ff63-460e-993d-275178cd6c40.png",
      creator: "Chord",
      tracksCount: 20
    }
  ];

  const stations = [
    {
      id: "station-1",
      title: "Hip-Hop Radio",
      imageUrl: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png",
      creator: "Chord",
      tracksCount: 100
    },
    {
      id: "station-2",
      title: "Rock Radio",
      imageUrl: "/lovable-uploads/00e244a7-d659-4312-befb-52b043a87ce6.png",
      creator: "Chord",
      tracksCount: 100
    },
    {
      id: "station-3",
      title: "Pop Radio",
      imageUrl: "/lovable-uploads/81d39118-ff63-460e-993d-275178cd6c40.png",
      creator: "Chord",
      tracksCount: 100
    }
  ];

  return (
    <Layout>
      {/* Category buttons */}
      <section className="mb-12 mt-4">
        <div className="flex justify-center gap-6">
          <Button
            variant="ghost"
            className="bg-chord-bg border border-white/5 hover:bg-chord-hover hover:border-chord-accent/30 px-6 py-5"
            onClick={() => window.location.href = '/trending'}
          >
            <TrendingUp size={18} className="mr-2 text-chord-accent" />
            <span className="font-bold">Trending</span>
          </Button>
          <Button
            variant="ghost"
            className="bg-chord-bg border border-white/5 hover:bg-chord-hover hover:border-chord-accent/30 px-6 py-5"
            onClick={() => window.location.href = '/new-releases'}
          >
            <Disc size={18} className="mr-2 text-chord-accent" />
            <span className="font-bold">New Releases</span>
          </Button>
          <Button
            variant="ghost"
            className="bg-chord-bg border border-white/5 hover:bg-chord-hover hover:border-chord-accent/30 px-6 py-5"
            onClick={() => window.location.href = '/stations'}
          >
            <Radio size={18} className="mr-2 text-chord-accent" />
            <span className="font-bold">Stations</span>
          </Button>
        </div>
      </section>

      {/* Trending Section */}
      <section className="mb-12">
        <SectionHeader title="Trending" seeAllLink="/trending" />
        <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {trendingPlaylists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              {...playlist}
            />
          ))}
        </div>
      </section>

      {/* New Releases Section */}
      <section className="mb-12">
        <SectionHeader title="New Releases" seeAllLink="/new-releases" showControls />
        <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {newReleases.map((release) => (
            <PlaylistCard
              key={release.id}
              {...release}
            />
          ))}
        </div>
      </section>

      {/* Stations Section */}
      <section className="mb-12">
        <SectionHeader title="Stations" seeAllLink="/stations" showControls />
        <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {stations.map((station) => (
            <PlaylistCard
              key={station.id}
              {...station}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
