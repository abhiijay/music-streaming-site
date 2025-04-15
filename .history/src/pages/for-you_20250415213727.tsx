
import Layout from "@/components/layout";
import PlaylistCard from "@/components/playlist-card";
import TrackItem from "@/components/track-item";
import SectionHeader from "@/components/section-header";
import { mockSongs } from "@/contexts/PlayerContext";

const ForYou = () => {
  // Placeholder recommended data
  const dailyMixes = [
    {
      id: "daily-mix-1",
      title: "Daily Mix 1",
      imageUrl: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png",
      description: "Drake, Quavo, Lil Baby",
    },
    {
      id: "daily-mix-2",
      title: "Daily Mix 2",
      imageUrl: "/lovable-uploads/81d39118-ff63-460e-993d-275178cd6c40.png",
      description: "Cynthia Erivo, Jelly Roll",
    },
    {
      id: "daily-mix-3",
      title: "Daily Mix 3",
      imageUrl: "/lovable-uploads/a910c028-5947-4358-b83a-240ed8a516ca.png",
      description: "Shaboozey, Myles Smith",
    },
    {
      id: "daily-mix-4",
      title: "Daily Mix 4",
      imageUrl: "/lovable-uploads/00e244a7-d659-4312-befb-52b043a87ce6.png",
      description: "Based on your listening history",
    }
  ];

  const recentlyPlayed = [
    {
      id: "recent-1",
      title: "Recently Played",
      imageUrl: "/lovable-uploads/00e244a7-d659-4312-befb-52b043a87ce6.png",
      description: "Your recent favorites",
    },
    {
      id: "recent-2",
      title: "On Repeat",
      imageUrl: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png",
      description: "Songs you can't stop playing",
    },
    {
      id: "recent-3",
      title: "Time Capsule",
      imageUrl: "/lovable-uploads/a910c028-5947-4358-b83a-240ed8a516ca.png",
      description: "Your past favorites",
    },
    {
      id: "recent-4",
      title: "Repeat Rewind",
      imageUrl: "/lovable-uploads/81d39118-ff63-460e-993d-275178cd6c40.png",
      description: "Your most played tracks",
    }
  ];

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">For You</h1>
        <p className="text-zinc-400">
          Personalized mixes and recommendations based on your listening history.
        </p>
      </div>

      <section className="mb-12">
        <SectionHeader title="Your Daily Mixes" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {dailyMixes.map((mix) => (
            <PlaylistCard
              key={mix.id}
              id={mix.id}
              title={mix.title}
              imageUrl={mix.imageUrl}
              description={mix.description}
            />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <SectionHeader title="Recently Played" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {recentlyPlayed.map((item) => (
            <PlaylistCard
              key={item.id}
              id={item.id}
              title={item.title}
              imageUrl={item.imageUrl}
              description={item.description}
            />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <SectionHeader title="Recommended Tracks" />
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
      </section>

      <section className="mb-12">
        <SectionHeader title="Based On Your Listening" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {dailyMixes.slice(0, 5).reverse().map((mix) => (
            <PlaylistCard
              key={`alt-${mix.id}`}
              id={`alt-${mix.id}`}
              title={`TIDAL ${mix.title}`}
              imageUrl={mix.imageUrl}
              description="Curated for you"
            />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default ForYou;
