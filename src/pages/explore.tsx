
import Layout from "@/components/layout";
import PlaylistCard from "@/components/playlist-card";
import SectionHeader from "@/components/section-header";

const Explore = () => {
  // Placeholder data
  const categories = [
    {
      title: "Top Charts",
      playlists: [
        {
          id: "top-tracks",
          title: "Top Tracks Global",
          imageUrl: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png",
          tracksCount: 100
        },
        {
          id: "top-albums",
          title: "Top Albums",
          imageUrl: "/lovable-uploads/00e244a7-d659-4312-befb-52b043a87ce6.png",
          tracksCount: 100
        },
        {
          id: "trending",
          title: "Trending",
          imageUrl: "/lovable-uploads/81d39118-ff63-460e-993d-275178cd6c40.png",
          tracksCount: 50
        },
        {
          id: "viral",
          title: "Viral",
          imageUrl: "/lovable-uploads/a910c028-5947-4358-b83a-240ed8a516ca.png",
          tracksCount: 50
        }
      ]
    },
    {
      title: "By Genre",
      playlists: [
        {
          id: "pop",
          title: "Pop",
          imageUrl: "/lovable-uploads/81d39118-ff63-460e-993d-275178cd6c40.png",
          tracksCount: 100
        },
        {
          id: "hip-hop",
          title: "Hip Hop",
          imageUrl: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png",
          tracksCount: 100
        },
        {
          id: "rock",
          title: "Rock",
          imageUrl: "/lovable-uploads/00e244a7-d659-4312-befb-52b043a87ce6.png",
          tracksCount: 100
        },
        {
          id: "electronic",
          title: "Electronic",
          imageUrl: "/lovable-uploads/a910c028-5947-4358-b83a-240ed8a516ca.png",
          tracksCount: 100
        }
      ]
    },
    {
      title: "Moods",
      playlists: [
        {
          id: "party",
          title: "Party",
          imageUrl: "/lovable-uploads/a910c028-5947-4358-b83a-240ed8a516ca.png",
          tracksCount: 100
        },
        {
          id: "chill",
          title: "Chill",
          imageUrl: "/lovable-uploads/81d39118-ff63-460e-993d-275178cd6c40.png",
          tracksCount: 100
        },
        {
          id: "focus",
          title: "Focus",
          imageUrl: "/lovable-uploads/00e244a7-d659-4312-befb-52b043a87ce6.png",
          tracksCount: 100
        },
        {
          id: "workout",
          title: "Workout",
          imageUrl: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png",
          tracksCount: 100
        }
      ]
    }
  ];

  return (
    <Layout>
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-6">Explore</h1>
        <p className="text-zinc-400 max-w-xl">
          Discover new music through TIDAL's curated playlists, explore by genre,
          mood, or activity, and check out the latest top charts.
        </p>
      </div>

      {categories.map((category, index) => (
        <section key={index} className="mb-12">
          <SectionHeader title={category.title} seeAllLink={`/explore/${category.title.toLowerCase().replace(' ', '-')}`} />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {category.playlists.map((playlist) => (
              <PlaylistCard
                key={playlist.id}
                id={playlist.id}
                title={playlist.title}
                imageUrl={playlist.imageUrl}
                tracksCount={playlist.tracksCount}
              />
            ))}
          </div>
        </section>
      ))}
    </Layout>
  );
};

export default Explore;
