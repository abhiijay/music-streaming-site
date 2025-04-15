import Layout from "@/components/layout";
import TrackItem from "@/components/track-item";
import PlaylistCard from "@/components/playlist-card";
import SectionHeader from "@/components/section-header";
import { mockSongs, Song } from "@/contexts/PlayerContext";

const Index = () => {
  const playlists = [
    {
      id: "top-hits",
      title: "TIDAL's Top Hits",
      imageUrl: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png",
      creator: "TIDAL",
      tracksCount: 100
    },
    {
      id: "pop-hits",
      title: "Pop Hits",
      imageUrl: "/lovable-uploads/81d39118-ff63-460e-993d-275178cd6c40.png",
      creator: "TIDAL",
      tracksCount: 48
    },
    {
      id: "rock-classics",
      title: "Rock Classics",
      imageUrl: "/lovable-uploads/00e244a7-d659-4312-befb-52b043a87ce6.png",
      creator: "TIDAL",
      tracksCount: 50
    },
    {
      id: "rnb-favorites",
      title: "Country Hits",
      imageUrl: "/lovable-uploads/a910c028-5947-4358-b83a-240ed8a516ca.png",
      creator: "TIDAL",
      tracksCount: 35
    },
    {
      id: "hip-hop-mix",
      title: "Rap Hits",
      imageUrl: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png",
      creator: "TIDAL",
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

  return (
    <Layout>
      <section className="mb-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">The Hits</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
        <SectionHeader title="New Tracks" seeAllLink="/new-tracks" showControls />
        <div className="bg-tidal-darkgray rounded-md overflow-hidden">
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
        <SectionHeader title="New Albums" seeAllLink="/new-albums" showControls />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
        <SectionHeader title="From our editors" seeAllLink="/editors-picks" showControls />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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

      <footer className="mt-24 border-t border-zinc-800 pt-10 pb-16 text-zinc-400">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-sm font-medium text-white mb-4">Get Started</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Download TIDAL</a></li>
              <li><a href="#" className="hover:text-white">Pricing & Plans</a></li>
              <li><a href="#" className="hover:text-white">Transfer Music</a></li>
              <li><a href="#" className="hover:text-white">Supported Devices</a></li>
              <li><a href="#" className="hover:text-white">Get Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-white mb-4">Discover TIDAL</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">For Music</a></li>
              <li><a href="#" className="hover:text-white">For Artists</a></li>
              <li><a href="#" className="hover:text-white">Culture</a></li>
              <li><a href="#" className="hover:text-white">Magazine</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-white mb-4">Account</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Sign up</a></li>
              <li><a href="#" className="hover:text-white">Redeem Voucher</a></li>
              <li><a href="#" className="hover:text-white">Redeem Giftcard</a></li>
              <li><a href="#" className="hover:text-white">Manage Account</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">What is TIDAL?</a></li>
              <li><a href="#" className="hover:text-white">Partners</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Press</a></li>
            </ul>
          </div>
        </div>
        <p className="mt-16 text-center text-xs">
          TIDAL is an artist-first, fan-centered music streaming platform that delivers over 110 million songs in HiFi sound quality to the global music community.
        </p>
      </footer>
    </Layout>
  );
};

export default Index;
