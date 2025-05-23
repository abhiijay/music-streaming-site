
import { useState, useEffect } from "react";
import Layout from "@/components/layout";
import { CollectionGrid } from "@/components/collection-grid";
import { toast } from "sonner";
import { extractDominantColor } from "@/utils/colorUtils";

const ViewAllPlaylists = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [dominantColor, setDominantColor] = useState<string | null>(null);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const playlistsData = [
        {
          id: "top-hits",
          title: "MQ's Top Hits",
          imageUrl: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png",
          creator: "MQ",
          tracksCount: 100
        },
        {
          id: "pop-hits",
          title: "Pop Hits",
          imageUrl: "/lovable-uploads/81d39118-ff63-460e-993d-275178cd6c40.png",
          creator: "MQ",
          tracksCount: 48
        },
        {
          id: "rock-classics",
          title: "Rock Classics",
          imageUrl: "/lovable-uploads/00e244a7-d659-4312-befb-52b043a87ce6.png",
          creator: "MQ",
          tracksCount: 50
        },
        {
          id: "rnb-favorites",
          title: "Country Hits",
          imageUrl: "/lovable-uploads/a910c028-5947-4358-b83a-240ed8a516ca.png",
          creator: "MQ",
          tracksCount: 35
        },
        {
          id: "hip-hop-mix",
          title: "Rap Hits",
          imageUrl: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png",
          creator: "MQ",
          tracksCount: 30
        },
        // Add more playlists for the grid view
        {
          id: "indie-vibes",
          title: "Indie Vibes",
          imageUrl: "/lovable-uploads/00e244a7-d659-4312-befb-52b043a87ce6.png",
          creator: "MQ",
          tracksCount: 42
        },
        {
          id: "chill-beats",
          title: "Chill Beats",
          imageUrl: "/lovable-uploads/81d39118-ff63-460e-993d-275178cd6c40.png",
          creator: "MQ",
          tracksCount: 25
        },
        {
          id: "workout-mix",
          title: "Workout Mix",
          imageUrl: "/lovable-uploads/a910c028-5947-4358-b83a-240ed8a516ca.png",
          creator: "MQ",
          tracksCount: 38
        },
        {
          id: "classical-picks",
          title: "Classical Picks",
          imageUrl: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png",
          creator: "MQ",
          tracksCount: 20
        },
        {
          id: "jazz-collection",
          title: "Jazz Collection",
          imageUrl: "/lovable-uploads/00e244a7-d659-4312-befb-52b043a87ce6.png",
          creator: "MQ",
          tracksCount: 33
        }
      ];
      
      setPlaylists(playlistsData);
      setIsLoading(false);
      
      // Extract dominant color from the first playlist cover for page theming
      if (playlistsData.length > 0) {
        extractDominantColor(playlistsData[0].imageUrl)
          .then(color => {
            setDominantColor(color);
          })
          .catch(err => {
            console.error("Error extracting color:", err);
          });
      }
      
      toast.success("Playlists loaded successfully", {
        duration: 2000
      });
    }, 1000);
  }, []);

  return (
    <Layout pageColor={dominantColor || undefined}>
      <CollectionGrid 
        title="All Playlists" 
        items={playlists} 
        type="playlists"
        isLoading={isLoading}
      />
    </Layout>
  );
};

export default ViewAllPlaylists;
